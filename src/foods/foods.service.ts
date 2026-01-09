import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodsDto } from './dto/create-foods.dto';
import { UpdateFoodsDto } from './dto/update-foods.dto';

@Injectable()
export class FoodsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createDto: CreateFoodsDto) {
    return this.prisma.foods.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.foods.findMany({
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: { deleted_at: null },
          include: { data_sources: true }
        },
        serving_units: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.foods.findUnique({
      where: { id },
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: { deleted_at: null },
          include: { data_sources: true }
        },
        serving_units: true,
      },
    });
  }

  update(id: number, updateDto: UpdateFoodsDto) {
    return this.prisma.foods.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.foods.delete({
      where: { id },
    });
  }

  findByExchangeGroup(exchangeGroupId: number) {
    return this.prisma.foods.findMany({
      where: { exchange_group_id: exchangeGroupId },
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: { deleted_at: null },
          include: { data_sources: true }
        },
        serving_units: true,
      },
    });
  }
}
