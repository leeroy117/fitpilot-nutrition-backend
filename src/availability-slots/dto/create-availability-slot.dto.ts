import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateAvailabilitySlotDto {
  @IsInt()
  professional_id: number;

  @IsOptional()
  @IsInt()
  day_of_week?: number;

  @IsOptional()
  @IsDateString()
  start_time?: string;

  @IsOptional()
  @IsDateString()
  end_time?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
