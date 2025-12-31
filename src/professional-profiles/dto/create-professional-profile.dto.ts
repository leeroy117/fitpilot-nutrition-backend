import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfessionalProfileDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  license_number?: string;

  @IsOptional()
  @IsString()
  work_address?: string;

  @IsOptional()
  social_media?: any;
}
