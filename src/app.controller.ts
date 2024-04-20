import { Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileValidator } from './custom-file-validator/custom-file-validator';
import { diskStorage } from 'multer';
import { editFileName } from './utils/helper';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: editFileName
    })
  }))
  public async uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({fileType: /(jpg|jpeg|png|gif)/}),
        new MaxFileSizeValidator({maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES}),
      ]
    })
  ) file) {
    console.log({file})
    return 'file upload succesfull!'
  }
}
