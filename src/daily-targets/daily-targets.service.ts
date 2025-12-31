import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDailyTargetsDto } from './dto/create-daily-targets.dto';
import { UpdateDailyTargetsDto } from './dto/update-daily-targets.dto';

@Injectable()
export class DailyTargetsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateDailyTargetsDto) {
    return this.prisma.daily_targets.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.daily_targets.findMany();
  }

  findOne(id: number) {
    return this.prisma.daily_targets.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateDailyTargetsDto) {
    return this.prisma.daily_targets.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.daily_targets.delete({
      where: { id },
    });
  }
}
