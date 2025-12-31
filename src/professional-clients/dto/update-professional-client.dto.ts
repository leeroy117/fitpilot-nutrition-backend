import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalClientDto } from './create-professional-client.dto';

export class UpdateProfessionalClientDto extends PartialType(CreateProfessionalClientDto) {}
