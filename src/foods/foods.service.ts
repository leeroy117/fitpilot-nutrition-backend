import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodsDto } from './dto/create-foods.dto';
import { UpdateFoodsDto } from './dto/update-foods.dto';

@Injectable()
export class FoodsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateFoodsDto) {
    return this.prisma.foods.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.foods.findMany();
  }

  findOne(id: number) {
    return this.prisma.foods.findUnique({
      where: { id },
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
}
