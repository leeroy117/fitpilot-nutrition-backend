import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentsDto } from './create-appointments.dto';

export class UpdateAppointmentsDto extends PartialType(CreateAppointmentsDto) { }
