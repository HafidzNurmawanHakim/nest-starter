import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entity/user.entity/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'username',
            password: 'pass',
            entities: ['**/entity/*.entity.ts'],
            database: 'database',
            synchronize: true,
            logging: true,
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([UserEntity, PostEntity, PostItemEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your secret',
            signOptions: { expiresIn: '900s' }
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
    providers: [AppService, UserService, AuthService, JwtStrategy, PostService]
})
export class AppModule {}
