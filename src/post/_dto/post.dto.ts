import { IsArray, IsString } from 'class-validator';
import { PostItemEntity } from '../_entity/post.entity';

export class PostDto {
    @IsString()
    id: string;

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

export class PostItemDto {
    @IsString()
    id: string;

    @IsString()
    itemTitle: string;

    @IsString()
    itemDesc: string;
}
