import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDataSourceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
