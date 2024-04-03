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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ouno',
      password: 'supersu',
      entities: ['**/entity/*.entity.ts'],
      database: 'crm_db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: 60}
    })
  ],
  controllers: [AppController, UserController, AuthController ],
  providers: [AppService, UserService, AuthService, JwtService, JwtStrategy],
})
export class AppModule {}
