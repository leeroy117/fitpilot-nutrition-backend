import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateFoodCategoriesDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;

}
