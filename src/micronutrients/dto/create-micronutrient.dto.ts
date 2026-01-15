import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateMicronutrientDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(20)
  unit: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;
}
