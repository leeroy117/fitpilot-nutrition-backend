import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateServingUnitsDto {
  @IsOptional()
  @IsInt()
  food_id?: number;

  @IsString()
  unit_name: string;

  @IsNumber()
  gram_equivalent: number;

  @IsOptional()
  @IsBoolean()
  is_exchange_unit?: boolean;

}
