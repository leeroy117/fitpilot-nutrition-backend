import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsInt()
  exchange_group_id?: number;

  @IsOptional()
  @IsBoolean()
  is_recipe?: boolean;

  @IsOptional()
  @IsDecimal()
  base_serving_size?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  base_unit?: string;

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
  fiber_g?: number;

  @IsOptional()
  @IsDecimal()
  glycemic_index?: number;

  @IsOptional()
  @IsDecimal()
  glycemic_load?: number;
}
