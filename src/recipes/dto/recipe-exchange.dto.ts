import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class RecipeExchangeDto {
    @IsInt()
    @IsNotEmpty()
    exchange_group_id: number;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    quantity: number;
}
