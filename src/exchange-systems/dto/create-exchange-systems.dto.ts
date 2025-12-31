import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateExchangeSystemsDto {
  @IsString()
  name: string;

}
