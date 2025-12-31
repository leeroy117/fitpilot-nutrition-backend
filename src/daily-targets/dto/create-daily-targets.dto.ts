import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateDailyTargetsDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsInt()
  target_energy_kcal?: number;

  @IsOptional()
  @IsInt()
  target_protein_g?: number;

  @IsOptional()
  @IsInt()
  target_carbs_g?: number;

  @IsOptional()
  @IsInt()
  target_fat_g?: number;

}
