import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabilitySlotsDto } from './create-availability-slots.dto';

export class UpdateAvailabilitySlotsDto extends PartialType(CreateAvailabilitySlotsDto) {}
