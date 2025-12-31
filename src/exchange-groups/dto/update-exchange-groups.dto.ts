import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeGroupsDto } from './create-exchange-groups.dto';

export class UpdateExchangeGroupsDto extends PartialType(CreateExchangeGroupsDto) {}