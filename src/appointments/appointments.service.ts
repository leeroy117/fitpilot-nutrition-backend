import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentsDto } from './dto/create-appointments.dto';
import { UpdateAppointmentsDto } from './dto/update-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createAppointmentsDto: CreateAppointmentsDto) {
    return this.prisma.appointments.create({
      data: createAppointmentsDto,
    });
  }

  findAll() {
    return this.prisma.appointments.findMany({
      where: { deleted_at: null },
    });
  }

  findOne(id: number) {
    return this.prisma.appointments.findUnique({
      where: { id, deleted_at: null },
    });
  }

  findByProfessionalId(professionalId: number) {
    return this.prisma.appointments.findMany({
      where: { professional_id: professionalId, deleted_at: null },
    });
  }

  update(id: number, updateAppointmentsDto: UpdateAppointmentsDto) {
    return this.prisma.appointments.update({
      where: { id },
      data: updateAppointmentsDto,
    });
  }

  remove(id: number) {
    return this.prisma.appointments.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
