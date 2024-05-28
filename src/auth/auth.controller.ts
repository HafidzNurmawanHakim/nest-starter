import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto/createUser.dto';
import { UserDto } from 'src/user/dto/user.dto/user.dto';
import { RefreshJwtGuard } from './refresh-jwt.guard';
import { JwtAuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(@Body() body: CreateUserDto): Promise<CreateUserDto> {
        return this.authService.signUp(body);
    }

    @Post('/signin')
    @HttpCode(200)
    @UseInterceptors(ClassSerializerInterceptor)
    signIn(@Body() body): Promise<{ token: string; user: UserDto }> {
        return this.authService.signIn(body.username, body.password);
    }

    @Post('/otp/verify')
    veirifyOtp(
        @Body() body: { email: string; otp: string; username: string }
    ): Promise<any> {
        return this.authService.verifyOtp(body.email, body.otp, body.username);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('/refresh-token')
    refreshJwt(@Request() req): Promise<any> {
        console.log({ req });
        return this.authService.refreshToken(req);
    }
}
