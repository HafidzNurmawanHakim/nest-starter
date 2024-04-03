import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}
    @Post('/signup')
    signUp(@Body() body: CreateUserDto): Promise<CreateUserDto> {
        return this.authService.signUp(body)
    }

    @Post('/signin')
    signIn(@Body() body): Promise<{token: string}> {
        return this.authService.signIn(body.username, body.password)
    }
}
