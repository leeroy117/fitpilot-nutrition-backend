import { PartialType } from '@nestjs/mapped-types';
import { CreateServingUnitsDto } from './create-serving-units.dto';

export class UpdateServingUnitsDto extends PartialType(CreateServingUnitsDto) {}