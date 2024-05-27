import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from './_entity/otp.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity/user.entity';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OtpEntity)
        private otpRepository: Repository<OtpEntity>
    ) {}

    async findAll(): Promise<OtpEntity[]> {
        return await this.otpRepository.find();
    }

    async findFirst(
        email: string,
        otp: string,
        username: string
    ): Promise<OtpEntity> {
        console.log({ email, otp, username });
        return await this.otpRepository.findOneBy({ email, otp, username });
    }

    async create(otp: OtpEntity): Promise<{ otp: string }> {
        return await this.otpRepository.save(otp);
    }
}
