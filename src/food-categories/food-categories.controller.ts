import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { CreateFoodCategoriesDto } from './dto/create-food-categories.dto';
import { UpdateFoodCategoriesDto } from './dto/update-food-categories.dto';

@Controller('food-categories')
export class FoodCategoriesController {
  constructor(private readonly service: FoodCategoriesService) {}

  @Post()
  create(@Body() createDto: CreateFoodCategoriesDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateFoodCategoriesDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
