import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServingUnitsDto } from './dto/create-serving-units.dto';
import { UpdateServingUnitsDto } from './dto/update-serving-units.dto';

@Injectable()
export class ServingUnitsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateServingUnitsDto) {
    return this.prisma.serving_units.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.serving_units.findMany();
  }

  findOne(id: number) {
    return this.prisma.serving_units.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateServingUnitsDto) {
    return this.prisma.serving_units.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.serving_units.delete({
      where: { id },
    });
  }
}
