import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilitySlotsDto } from './dto/create-availability-slots.dto';
import { UpdateAvailabilitySlotsDto } from './dto/update-availability-slots.dto';

@Injectable()
export class AvailabilitySlotsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAvailabilitySlotsDto: CreateAvailabilitySlotsDto) {
    return this.prisma.availability_slots.create({
      data: createAvailabilitySlotsDto,
    });
  }

  findAll() {
    return this.prisma.availability_slots.findMany();
  }

  findOne(id: number) {
    return this.prisma.availability_slots.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAvailabilitySlotsDto: UpdateAvailabilitySlotsDto) {
    return this.prisma.availability_slots.update({
      where: { id },
      data: updateAvailabilitySlotsDto,
    });
  }

  remove(id: number) {
    return this.prisma.availability_slots.delete({
      where: { id },
    });
  }
}
