import { IsDateString, IsDecimal, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFoodLogDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  food_id?: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  meal_type?: string;

  @IsOptional()
  @IsDecimal()
  quantity?: number;

  @IsOptional()
  @IsInt()
  serving_unit_id?: number;

  @IsOptional()
  @IsDateString()
  logged_at?: string;
}
