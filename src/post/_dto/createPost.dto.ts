import { IsArray, IsString } from 'class-validator';
import { PostItemEntity } from '../_entity/post.entity';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    desc: string;

    @IsArray()
    postItem: PostItemEntity[];

    @IsString()
    created_at: Date;

    @IsString()
    updated_at: Date;
}

export class CreatePostItemDto {
    @IsString()
    itemTitle: string;

    @IsString()
    itemDesc: string;
}
