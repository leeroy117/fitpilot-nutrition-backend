import { PartialType } from '@nestjs/mapped-types';
import { CreateServingUnitDto } from './create-serving-unit.dto';

export class UpdateServingUnitDto extends PartialType(CreateServingUnitDto) {}
