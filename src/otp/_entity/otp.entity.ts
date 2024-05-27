import { Column, Entity, Timestamp } from 'typeorm';

@Entity()
export class OtpEntity {
    @Column({ primary: true })
    email: string;

    @Column()
    otp: string;

    @Column()
    username: string;

    @Column({ type: 'timestamp' })
    expiry: Date;
}
