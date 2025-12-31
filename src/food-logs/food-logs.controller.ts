import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FoodLogsService } from './food-logs.service';
import { CreateFoodLogsDto } from './dto/create-food-logs.dto';
import { UpdateFoodLogsDto } from './dto/update-food-logs.dto';

@Controller('food-logs')
export class FoodLogsController {
  constructor(private readonly service: FoodLogsService) {}

  @Post()
  create(@Body() createDto: CreateFoodLogsDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateFoodLogsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
