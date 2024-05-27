import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/event-emitter/interfaces/EventPayloads';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async welcomeEmail(data) {
        const { email, name } = data;

        const subject = `Welcome to Company: ${name}`;

        await this.mailerService.sendMail({
            to: email,
            subject,
            template: './welcome',
            context: {
                name
            }
        });
    }

    @OnEvent('user.verify-email')
    async verifyEmail(data: EventPayloads['user.verify-email']) {
        const { name, email, otp } = data;

        const subject = `Company: OTP To Verify Email`;

        console.log({ data });

        await this.mailerService.sendMail({
            to: email,
            subject,
            template: './verify-email',
            context: {
                otp,
                name
            }
        });
    }
}
