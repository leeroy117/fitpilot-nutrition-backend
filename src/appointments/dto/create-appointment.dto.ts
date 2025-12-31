import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  professional_id: number;

  @IsInt()
  client_id: number;

  @IsDateString()
  @IsNotEmpty()
  scheduled_at: string;

  @IsOptional()
  @IsInt()
  duration_minutes?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  meeting_link?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
