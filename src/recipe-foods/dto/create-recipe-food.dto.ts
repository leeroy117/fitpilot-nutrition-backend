import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRecipeFoodDto {
    @IsInt()
    @IsOptional()
    recipe_id?: number;

    @IsInt()
    @IsOptional()
    food_id?: number;

    @IsInt()
    @IsOptional()
    serving_unit_id?: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
