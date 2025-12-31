import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDateString()
  @IsNotEmpty()
  expires_at: string;

  @IsOptional()
  @IsBoolean()
  is_revoked?: boolean;

  @IsOptional()
  @IsString()
  user_agent?: string;

  @IsOptional()
  @IsString()
  ip_address?: string;
}
