import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, MaxLength, IsDateString } from 'class-validator';
import { user_role_enum } from '@generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @IsEnum(user_role_enum)
  role?: user_role_enum;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  deleted_at?: string;
}
