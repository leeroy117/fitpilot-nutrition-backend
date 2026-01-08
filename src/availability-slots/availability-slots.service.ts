import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilitySlotDto } from './dto/create-availability-slot.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';

@Injectable()
export class AvailabilitySlotsService {
  constructor(private readonly prisma: PrismaService) { }

  private parseTimeToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date(1970, 0, 1, hours, minutes, seconds);
    return date;
  }

  create(createAvailabilitySlotDto: CreateAvailabilitySlotDto) {
    const data: any = { ...createAvailabilitySlotDto };
    if (data.start_time) data.start_time = this.parseTimeToDate(data.start_time);
    if (data.end_time) data.end_time = this.parseTimeToDate(data.end_time);

    return this.prisma.availability_slots.create({
      data,
    });
  }

  findAll() {
    return this.prisma.availability_slots.findMany({
      where: { deleted_at: null },
    });
  }

  findByProfessionalId(professionalId: number) {
    return this.prisma.availability_slots.findMany({
      where: { professional_id: professionalId, deleted_at: null },
    });
  }

  findOne(id: number) {
    return this.prisma.availability_slots.findUnique({
      where: { id, deleted_at: null },
    });
  }

  update(id: number, updateAvailabilitySlotDto: UpdateAvailabilitySlotDto) {
    const data: any = { ...updateAvailabilitySlotDto };
    if (data.start_time) data.start_time = this.parseTimeToDate(data.start_time);
    if (data.end_time) data.end_time = this.parseTimeToDate(data.end_time);

    return this.prisma.availability_slots.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.availability_slots.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
