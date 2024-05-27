import {
    Body,
    Controller,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Put('/update')
    @UseInterceptors(FileInterceptor('file'))
    update(@UploadedFile() file: Express.Multer.File, @Body() body): string {
        console.log({ file, body });
        return 'done';
    }
}
