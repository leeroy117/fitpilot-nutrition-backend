import { IsBoolean, IsDecimal, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsDecimal()
  price_monthly?: number;

  @IsOptional()
  @IsBoolean()
  access_nutrition?: boolean;

  @IsOptional()
  @IsBoolean()
  access_training?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
