import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateFoodsDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

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
  @IsInt()
  glycemic_index?: number;

  @IsOptional()
  @IsNumber()
  glycemic_load_per_100g?: number;

  @IsOptional()
  @IsNumber()
  base_serving_size?: number;

  @IsOptional()
  @IsString()
  base_unit?: string;

}
