import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlanDto: CreatePlanDto) {
    return this.prisma.plans.create({
      data: createPlanDto as any,
    });
  }

  findAll() {
    return this.prisma.plans.findMany();
  }

  findOne(id: number) {
    return this.prisma.plans.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.prisma.plans.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  remove(id: number) {
    return this.prisma.plans.delete({
      where: { id },
    });
  }
}
