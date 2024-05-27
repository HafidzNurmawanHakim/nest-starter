import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT) || 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            },
            defaults: {
                from: `"MIT Assist" <${process.env.EMAIL_USER}>`
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new EjsAdapter(),
                options: {
                    strict: false
                }
            }
        })
    ],
    controllers: [EmailController],
    providers: [EmailService]
})
export class EmailModule {}
