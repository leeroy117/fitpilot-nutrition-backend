import { IsDateString, IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClientMetricDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsDecimal()
  weight_kg?: number;

  @IsOptional()
  @IsDecimal()
  height_cm?: number;

  @IsOptional()
  @IsDecimal()
  body_fat_pct?: number;

  @IsOptional()
  @IsDecimal()
  muscle_mass_kg?: number;

  @IsOptional()
  @IsDecimal()
  visceral_fat?: number;

  @IsOptional()
  @IsDecimal()
  water_pct?: number;

  @IsOptional()
  @IsDecimal()
  waist_cm?: number;

  @IsOptional()
  @IsDecimal()
  hip_cm?: number;

  @IsOptional()
  @IsDecimal()
  chest_cm?: number;

  @IsOptional()
  @IsDecimal()
  arm_left_cm?: number;

  @IsOptional()
  @IsDecimal()
  arm_right_cm?: number;

  @IsOptional()
  @IsDecimal()
  thigh_left_cm?: number;

  @IsOptional()
  @IsDecimal()
  thigh_right_cm?: number;

  @IsOptional()
  @IsDecimal()
  calf_left_cm?: number;

  @IsOptional()
  @IsDecimal()
  calf_right_cm?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  recorded_by_user_id?: number;
}
