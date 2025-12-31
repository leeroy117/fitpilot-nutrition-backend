import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExchangeSystemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  country_code?: string;
}
