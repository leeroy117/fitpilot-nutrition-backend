import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateFoodsDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsInt()
  data_source_id?: number;

  @IsOptional()
  @IsInt()
  exchange_group_id?: number;

  @IsOptional()
  @IsBoolean()
  is_recipe?: boolean;

  @IsOptional()
  @IsNumber()
  base_serving_size?: number;

  @IsOptional()
  @IsString()
  base_unit?: string;

  @IsOptional()
  @IsNumber()
  calories_kcal?: number;

  @IsOptional()
  @IsNumber()
  protein_g?: number;

  @IsOptional()
  @IsNumber()
  carbs_g?: number;

  @IsOptional()
  @IsNumber()
  fat_g?: number;
}
