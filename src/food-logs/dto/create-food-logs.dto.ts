import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateFoodLogsDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  food_id?: number;

  @IsOptional()
  @IsDateString()
  logged_at?: string;

  @IsOptional()
  @IsString()
  meal_type?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsInt()
  serving_unit_id?: number;

}
