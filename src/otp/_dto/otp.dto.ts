import { IsEmail, IsNumber, IsString } from 'class-validator';

export class OtpDto {
    @IsEmail()
    email: string;

    @IsNumber()
    otp: string;

    @IsString()
    expiry: Date;
}
