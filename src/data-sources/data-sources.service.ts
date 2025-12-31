import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDataSourcesDto } from './dto/create-data-sources.dto';
import { UpdateDataSourcesDto } from './dto/update-data-sources.dto';

@Injectable()
export class DataSourcesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateDataSourcesDto) {
    return this.prisma.data_sources.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.data_sources.findMany();
  }

  findOne(id: number) {
    return this.prisma.data_sources.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateDataSourcesDto) {
    return this.prisma.data_sources.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.data_sources.delete({
      where: { id },
    });
  }
}
