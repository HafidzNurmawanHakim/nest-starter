import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto/user.dto';
import { hashPassword } from 'src/utils/chiper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

     async getUser(query: Object): Promise<UserEntity> {
        return await this.userRepository.findOne(query)
     }
   
}
