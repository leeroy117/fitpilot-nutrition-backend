import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MicronutrientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.micronutrients.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.micronutrients.findUnique({
      where: { id },
    });
  }
}
