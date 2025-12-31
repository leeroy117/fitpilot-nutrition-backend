import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodCategoriesDto } from './dto/create-food-categories.dto';
import { UpdateFoodCategoriesDto } from './dto/update-food-categories.dto';

@Injectable()
export class FoodCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateFoodCategoriesDto) {
    return this.prisma.food_categories.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.food_categories.findMany();
  }

  findOne(id: number) {
    return this.prisma.food_categories.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateFoodCategoriesDto) {
    return this.prisma.food_categories.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.food_categories.delete({
      where: { id },
    });
  }
}
