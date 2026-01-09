import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFoodNutritionValueDto {
    @IsInt()
    @IsNotEmpty()
    food_id: number;

    @IsInt()
    @IsNotEmpty()
    data_source_id: number;

    @IsOptional()
    @IsDecimal()
    calories_kcal?: number;

    @IsOptional()
    @IsDecimal()
    protein_g?: number;

    @IsOptional()
    @IsDecimal()
    carbs_g?: number;

    @IsOptional()
    @IsDecimal()
    fat_g?: number;

    @IsOptional()
    @IsDecimal()
    base_serving_size?: number;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    base_unit?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    state?: string;

    @IsOptional()
    @IsString()
    notes?: string;
}
