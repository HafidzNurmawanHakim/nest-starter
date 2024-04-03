import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/chiper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entity/user.entity/user.entity';
import { UserDto } from 'src/user/dto/user.dto/user.dto';
import { CreateUserDto } from 'src/user/dto/user.dto/createUser.dto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private jwtService: JwtService) {}

    async signUp(body: CreateUserDto) : Promise<UserEntity> {
        const {password, username, email} = body
        const user = await this.userRepository.findOne({where: {username, email}})

        if (user) throw new ConflictException('Username already exists')
        
        const hashedPass = await hashPassword(password) 
        const data = {...body, password:  hashedPass}

        return await this.userRepository.save(data)
    }

    async signIn (username: string, password: string): Promise<any>  {
        const user = await this.userRepository.findOne({where: {username}})

        if (!user) throw new UnauthorizedException('Invalid Username or Password')

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) throw new UnauthorizedException('Invalid Username or Password')

        const token = this.jwtService.sign({id: user.id}, {secret: 'secret'})
        return {
            token
        }
    }
}
