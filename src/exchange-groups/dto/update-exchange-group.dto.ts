import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeGroupDto } from './create-exchange-group.dto';

export class UpdateExchangeGroupDto extends PartialType(CreateExchangeGroupDto) {}
