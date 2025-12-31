import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodLogsDto } from './create-food-logs.dto';

export class UpdateFoodLogsDto extends PartialType(CreateFoodLogsDto) {}