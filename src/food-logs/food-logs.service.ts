import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodLogsDto } from './dto/create-food-logs.dto';
import { UpdateFoodLogsDto } from './dto/update-food-logs.dto';

@Injectable()
export class FoodLogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateFoodLogsDto) {
    return this.prisma.food_logs.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.food_logs.findMany();
  }

  findOne(id: number) {
    return this.prisma.food_logs.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateFoodLogsDto) {
    return this.prisma.food_logs.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.food_logs.delete({
      where: { id },
    });
  }
}
