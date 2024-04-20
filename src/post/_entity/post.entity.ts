import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    desc: string;

    @CreateDateColumn()
    // @CreateDateColumn({
    //     type: 'timestamp',
    //     default: () => 'CURRENT_TIMESTAMP(6)'
    // })
    created_at: Date;

    @UpdateDateColumn()
    // @UpdateDateColumn({
    //     type: 'timestamp',
    //     default: () => 'CURRENT_TIMESTAMP(6)',
    //     onUpdate: 'CURRENT_TIMESTAMP(6)'
    // })
    updated_at: Date;

    @OneToMany(() => PostItemEntity, (postItem) => postItem.post, {
        cascade: true
    })
    postItem: PostItemEntity[];
}

@Entity()
export class PostItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    itemTitle: string;

    @Column({ type: 'text' })
    itemDesc: string;

    @ManyToOne(() => PostEntity, (post) => post.postItem)
    post: PostEntity[];

    @Column('uuid')
    postId: string;
}
