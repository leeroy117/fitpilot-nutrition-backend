import { PartialType } from '@nestjs/mapped-types';
import { CreateDataSourcesDto } from './create-data-sources.dto';

export class UpdateDataSourcesDto extends PartialType(CreateDataSourcesDto) {}