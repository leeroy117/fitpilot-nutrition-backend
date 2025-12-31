import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFoodCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;
}
