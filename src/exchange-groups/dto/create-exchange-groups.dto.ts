import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateExchangeGroupsDto {
  @IsOptional()
  @IsInt()
  system_id?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  avg_energy_kcal?: number;

  @IsOptional()
  @IsString()
  color_code?: string;

}
