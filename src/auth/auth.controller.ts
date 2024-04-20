import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto/createUser.dto';
import { UserDto } from 'src/user/dto/user.dto/user.dto';
import { TypedEventEmitter } from 'src/event-emitter/event-emitter';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly eventEmitter: TypedEventEmitter
    ) {}
    @Post('/signup')
    signUp(@Body() body: CreateUserDto): Promise<CreateUserDto> {
        this.eventEmitter.emit('user.verify-email', {
            name: 'Hafidz',
            email: body.email,
            otp: '231238' // generate a random OTP
        });

        return this.authService.signUp(body);
    }

    @Post('/signin')
    @UseInterceptors(ClassSerializerInterceptor)
    signIn(@Body() body): Promise<{ token: string; user: UserDto }> {
        return this.authService.signIn(body.username, body.password);
    }
}
