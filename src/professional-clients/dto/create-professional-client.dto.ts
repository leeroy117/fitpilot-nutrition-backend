import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { service_type_enum } from '@generated/prisma/enums';

export class CreateProfessionalClientDto {
  @IsInt()
  professional_id: number;

  @IsInt()
  client_id: number;

  @IsEnum(service_type_enum)
  service_type: service_type_enum;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  deleted_at?: string;
}
