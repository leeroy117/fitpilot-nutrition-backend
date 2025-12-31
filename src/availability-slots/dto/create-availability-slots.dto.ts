import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateAvailabilitySlotsDto {
  @IsInt()
  professional_id: number;

  @IsInt()
  @IsOptional()
  day_of_week?: number;

  @IsDateString()
  @IsOptional()
  start_time?: string;

  @IsDateString()
  @IsOptional()
  end_time?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
