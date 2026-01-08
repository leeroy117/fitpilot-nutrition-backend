import { IsBoolean, IsDateString, IsInt, IsOptional, Matches } from 'class-validator';

export class CreateAvailabilitySlotsDto {
  @IsInt()
  professional_id: number;

  @IsInt()
  @IsOptional()
  day_of_week?: number;


  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in HH:MM:SS format',
  })
  start_time?: string;


  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in HH:MM:SS format',
  })
  end_time?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
