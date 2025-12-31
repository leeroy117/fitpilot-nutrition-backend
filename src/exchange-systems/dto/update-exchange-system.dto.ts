import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeSystemDto } from './create-exchange-system.dto';

export class UpdateExchangeSystemDto extends PartialType(CreateExchangeSystemDto) {}
