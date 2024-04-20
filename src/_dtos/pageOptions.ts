import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

enum Order {ASC = "ASC", DESC = "DESC"}

export class PageOptionsDto {
    // @ApiPropertyOptional({enum: Order, default: Order.ASC}) //Use this for swagger use
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC

    // @ApiPropertyOptional({minimum: 1, default: 1}) // Use this for swagger use
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1


    // @ApiPropertyOptional({
    //     minimum: 1,
    //     maximum: 25,
    //     default: 10,
    //   })  //Use this for swagger use
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(25)
    @IsOptional()
    readonly limit?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.limit
    }
}