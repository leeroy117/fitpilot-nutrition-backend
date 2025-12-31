import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateServingUnitDto {
  @IsOptional()
  @IsInt()
  food_id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  unit_name: string;

  @IsDecimal()
  gram_equivalent: number;

  @IsOptional()
  @IsBoolean()
  is_exchange_unit?: boolean;
}
