import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExchangeGroupDto {
  @IsOptional()
  @IsInt()
  system_id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsInt()
  avg_calories?: number;

  @IsOptional()
  @IsString()
  @MaxLength(7)
  color_code?: string;
}
