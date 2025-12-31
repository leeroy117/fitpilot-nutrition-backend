import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeSystemsDto } from './create-exchange-systems.dto';

export class UpdateExchangeSystemsDto extends PartialType(CreateExchangeSystemsDto) {}