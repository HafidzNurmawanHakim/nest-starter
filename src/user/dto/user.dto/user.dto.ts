import { Exclude } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class UserDto {
    @IsString()
    id: string;

    @IsString()
    @MaxLength(255)
    username: string;

    @MaxLength(255)
    fullName: string;

    @MaxLength(255)
    email: string;

    @IsString()
    role: string;

    @IsString()
    @MaxLength(12)
    password: string;

    @IsString()
    refreshToken: string | null;
}
