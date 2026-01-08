import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAppointmentsDto {
  @ApiProperty({ description: 'The ID of the professional' })
  @IsInt()
  professional_id: number;

  @ApiProperty({ description: 'The ID of the client' })
  @IsInt()
  client_id: number;

  @ApiProperty({ description: 'The date and time of the appointment' })
  @IsDateString()
  scheduled_at: string;

  @ApiPropertyOptional({ description: 'The duration of the appointment in minutes', default: 60 })
  @IsInt()
  @IsOptional()
  duration_minutes?: number;

  @ApiPropertyOptional({ description: 'The status of the appointment', default: 'scheduled' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  status?: string;

  @ApiPropertyOptional({ description: 'The title of the appointment' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @ApiPropertyOptional({ description: 'The link to the meeting' })
  @IsString()
  @IsOptional()
  meeting_link?: string;

  @ApiPropertyOptional({ description: 'Additional notes for the appointment' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'The date and time the record was soft-deleted' })
  @IsDateString()
  @IsOptional()
  deleted_at?: string;

  @ApiPropertyOptional({ description: 'The start date and time of the appointment' })
  @IsDateString()
  @IsOptional()
  start_date?: string;

  @ApiPropertyOptional({ description: 'The end date and time of the appointment' })
  @IsDateString()
  @IsOptional()
  end_date?: string;

  @ApiPropertyOptional({ description: 'The effective duration of the appointment' })
  @IsInt()
  @IsOptional()
  effective_duration?: number;
}
