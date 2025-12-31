import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  user_id: number;

  @IsInt()
  plan_id: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsOptional()
  @IsBoolean()
  auto_renew?: boolean;
}
