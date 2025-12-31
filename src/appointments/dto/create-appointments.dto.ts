import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentsDto {
  @IsInt()
  professional_id: number;

  @IsInt()
  client_id: number;

  @IsDateString()
  scheduled_at: string;

  @IsInt()
  @IsOptional()
  duration_minutes?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  meeting_link?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  professional_notes?: string;

  @IsString()
  @IsOptional()
  client_feedback?: string;
}
