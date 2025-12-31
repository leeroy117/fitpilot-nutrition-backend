import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyTargetsDto } from './create-daily-targets.dto';

export class UpdateDailyTargetsDto extends PartialType(CreateDailyTargetsDto) {}