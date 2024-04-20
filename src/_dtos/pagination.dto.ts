import { IsArray } from "class-validator";
import { PaginationMetaDto } from "./paginationMeta.dto";

export class PaginationDto<T> {
    @IsArray()
    // @ApiProperty()  //Use This For Swagger use
    readonly data: T[]

    // @ApiProperty({type: () => PageMetaDto})
    readonly meta: PaginationMetaDto;

    constructor (data: T[], meta: PaginationMetaDto) {
        this.data = data
        this.meta = meta
    }

}