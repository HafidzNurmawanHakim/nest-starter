import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    username: string

    @Column()
    fullName: string | null

    @Column()
    email: string

    @Column()
    password: string

    @Column({type: 'timestamp', default: () => 'NOW()'})
    created_at: Date
}
