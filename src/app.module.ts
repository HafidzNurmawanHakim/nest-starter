import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entity/user.entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostEntity, PostItemEntity } from './post/_entity/post.entity';
import { MulterModule } from '@nestjs/platform-express';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypedEventEmitterModule } from './event-emitter/event.emitter.module';
import { ConfigModule } from '@nestjs/config';
import { Otp } from './otp/otp';
import { OtpService } from './otp/otp.service';
import { OtpEntity } from './otp/_entity/otp.entity';
import { RefreshTokenStrategy } from './auth/refresh.jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            entities: ['**/entity/*.entity.ts'],
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([
            UserEntity,
            PostEntity,
            PostItemEntity,
            OtpEntity
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '5s' }
        }),
        MulterModule.register({
            dest: './uploads'
        }),
        EmailModule,
        EventEmitterModule.forRoot(),
        TypedEventEmitterModule
    ],
    controllers: [
        AppController,
        UserController,
        AuthController,
        PostController
    ],
    providers: [
        AppService,
        UserService,
        AuthService,
        JwtStrategy,
        RefreshTokenStrategy,
        PostService,
        Otp,
        OtpService
    ]
})
export class AppModule {}
