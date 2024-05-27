import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import * as speakeasy from 'speakeasy';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}
    @Get('secret-key')
    async getSecret() {
        const secret = speakeasy.generateSecret({ length: 20 });
        return secret;
    }
}
