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
                host: 'host',
                port: Number('port'),
                secure: true,
                auth: {
                    user: 'your email',
                    pass: 'pass'
                }
            },
            defaults: {
                from: '"Subject" <your email>'
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
