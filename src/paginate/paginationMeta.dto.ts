import { PageMetaDtoParameters } from 'src/paginate/interfaces/page-meta-param.interface';

export class PaginationMetaDto {
    // @ApiProperty() //Use this for swagger use
    readonly page: number;

    // @ApiProperty() //Use this for swagger use
    readonly limit: number;

    // @ApiProperty() //Use this for swagger use
    readonly itemCount: number;

    // @ApiProperty() //Use this for swagger use
    readonly pageCount: number;

    // @ApiProperty() //Use this for swagger use
    readonly hasPreviousPage: boolean;

    // @ApiProperty() //Use this for swagger use
    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.limit = pageOptionsDto.limit;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
