import { ExecutionContext } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class RefreshJwtGuard extends AuthGuard('jwt-refresh') {
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any
    ): TUser {
        if (info instanceof TokenExpiredError) {
            // do stuff when token is expired
            console.log('token expired');
        }
        return user;
    }
}
