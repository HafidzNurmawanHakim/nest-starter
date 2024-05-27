import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './_entity/post.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/paginate/pageOptions';
import { PaginationDto } from 'src/paginate/pagination.dto';
import { PaginationMetaDto } from 'src/paginate/paginationMeta.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ) {}

    async findAll(
        pageOptions: PageOptionsDto
    ): Promise<PaginationDto<PostEntity>> {
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postItem', 'postItem');
        queryBuilder.skip(pageOptions.skip).take(pageOptions.limit);
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new PaginationMetaDto({
            itemCount,
            pageOptionsDto: pageOptions
        });

        return new PaginationDto(entities, pageMetaDto);
    }

    async create(body: Partial<PostEntity>): Promise<{ id: string }> {
        return await this.postRepository.save(body);
    }
}
