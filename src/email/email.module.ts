import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.hostinger.com',
                port: Number('465'),
                secure: true,
                auth: {
                    user: 'hafidz.nurmawan@mediatamaindoteknologi.co.id',
                    pass: 'Em@il123'
                }
            },
            defaults: {
                from: '"MIT Assist" <hafidz.nurmawan@mediatamaindoteknologi.co.id>'
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
