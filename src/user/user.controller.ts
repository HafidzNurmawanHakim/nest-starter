import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto/user.dto';

@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    
    

}