import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateDataSourcesDto {
  @IsString()
  name: string;

}
