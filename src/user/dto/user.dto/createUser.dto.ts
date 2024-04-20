import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    username: string;

    @MaxLength(255)
    fullName: string;

    @MaxLength(255)
    email: string;

    @IsString()
    @MaxLength(12)
    password: string;
}
