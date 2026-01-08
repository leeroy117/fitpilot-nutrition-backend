import { IsBoolean, IsDateString, IsInt, IsOptional, Matches } from 'class-validator';

export class CreateAvailabilitySlotDto {
  @IsInt()
  professional_id: number;

  @IsOptional()
  @IsInt()
  day_of_week?: number;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in HH:MM:SS format',
  })
  start_time?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in HH:MM:SS format',
  })
  end_time?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  deleted_at?: string;
}
