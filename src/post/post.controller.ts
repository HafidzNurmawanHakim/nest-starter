import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './_dto/post.dto';
import { CreatePostDto } from './_dto/createPost.dto';
import { PageOptionsDto } from 'src/paginate/pageOptions';
import { PaginationDto } from 'src/paginate/pagination.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    async getAllPost(
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PaginationDto<PostDto>> {
        return await this.postService.findAll(pageOptionsDto);
    }
    @Post('/new')
    async createPost(@Body() body: CreatePostDto): Promise<{ id: string }> {
        console.log({ body });
        return await this.postService.create(body);
    }
}
