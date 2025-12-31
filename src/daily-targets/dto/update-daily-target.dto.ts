import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyTargetDto } from './create-daily-target.dto';

export class UpdateDailyTargetDto extends PartialType(CreateDailyTargetDto) {}
