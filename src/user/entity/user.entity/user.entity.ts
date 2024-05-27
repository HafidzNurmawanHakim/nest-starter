import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    fullName: string | null;

    @Column()
    email: string;

    @Column({ default: 'wibu' })
    userRole: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ default: () => 'false' })
    isVerified: 'true' | 'false';

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    created_at: Date;

    @Column({ default: null })
    refreshToken: string | null;
}
