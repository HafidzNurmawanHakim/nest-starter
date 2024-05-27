import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/chiper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entity/user.entity/user.entity';
import { CreateUserDto } from 'src/user/dto/user.dto/createUser.dto';
import { TypedEventEmitter } from 'src/event-emitter/event-emitter';
import { OtpService } from 'src/otp/otp.service';
import { generateOTP } from 'src/utils/generator';
import { getExpiry, isTokenExpired } from 'src/utils/dateTimeUtlity';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/user/dto/user.dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private readonly eventEmitter: TypedEventEmitter,
        private otpService: OtpService,
        private configService: ConfigService
    ) {}

    async signUp(body: CreateUserDto): Promise<UserEntity> {
        const { password, username, email } = body;
        const isEmailExist = await this.userRepository.findOne({
            where: { email }
        });
        const isUsernameExist = await this.userRepository.findOne({
            where: { username }
        });

        if (isEmailExist || isUsernameExist)
            throw new ConflictException('Username already exists');

        const hashedPass = await hashPassword(password);
        const data = { ...body, password: hashedPass };

        let _otp = generateOTP(6);
        let updateTime: number = Date.now();
        let createDto = {
            otp: _otp,
            email: email,
            username: username,
            expiry: getExpiry()
        };

        let savedOtp = await this.otpService.create(createDto);

        this.eventEmitter.emit('user.verify-email', {
            name: username,
            email: body.email,
            otp: savedOtp.otp // generate a random OTP
        });

        return await this.userRepository.save(data);
    }

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user)
            throw new UnauthorizedException('Invalid Username or Password');

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch)
            throw new UnauthorizedException('Invalid Username or Password');

        const token = await this.getTokens(user.id, user.username);
        const hashedRefreshToken = await hashPassword(token.refreshToken);
        await this.userRepository.update(
            { id: user.id },
            {
                refreshToken: hashedRefreshToken
            }
        );
        return {
            ...token,
            user
        };
    }

    async validateToken(token: string) {
        const isTokenValid = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        });
        console.log({ isTokenValid });
        return this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        });
    }

    async verifyOtp(email: string, otp: string, username: string) {
        const otpRecord = await this.otpService.findFirst(email, otp, username);

        if (!otpRecord)
            throw new HttpException('Invalid OTP', HttpStatus.NOT_FOUND);

        const isExpired = isTokenExpired(otpRecord.expiry);

        if (!isExpired)
            throw new HttpException('OTP Expired!', HttpStatus.GONE);

        const user = await this.userRepository.findOneBy({ email });
        const editUser = this.userRepository.merge(user, {
            isVerified: 'true'
        });
        return await this.userRepository.save(editUser);
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1m'
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '7d'
                }
            )
        ]);

        return {
            accessToken,
            refreshToken
        };
    }

    async refreshToken(req) {
        const refreshToken = req
            .get('Authorization')
            .replace('Bearer', '')
            .trim();
        try {
            const decoded = this.jwtService.decode(refreshToken);

            if (!decoded) {
                throw new Error();
            }
            const user = await this.userRepository.findOneBy({
                username: decoded.username
            });
            if (!user) {
                throw new HttpException(
                    'User with this id does not exist',
                    HttpStatus.NOT_FOUND
                );
            }
            const isRefreshTokenMatching = await bcrypt.compare(
                refreshToken,
                user.refreshToken
            );
            if (!isRefreshTokenMatching) {
                throw new UnauthorizedException('Invalid token');
            }
            return await this.getTokens(user.id, user.username);
        } catch (err) {
            console.log({ err });
            throw new UnauthorizedException('Invalid token');
        }
    }
}
