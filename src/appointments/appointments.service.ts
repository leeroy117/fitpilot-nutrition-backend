import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentsDto } from './dto/create-appointments.dto';
import { UpdateAppointmentsDto } from './dto/update-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAppointmentsDto: CreateAppointmentsDto) {
    return this.prisma.appointments.create({
      data: createAppointmentsDto,
    });
  }

  findAll() {
    return this.prisma.appointments.findMany();
  }

  findOne(id: number) {
    return this.prisma.appointments.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAppointmentsDto: UpdateAppointmentsDto) {
    return this.prisma.appointments.update({
      where: { id },
      data: updateAppointmentsDto,
    });
  }

  remove(id: number) {
    return this.prisma.appointments.delete({
      where: { id },
    });
  }
}
