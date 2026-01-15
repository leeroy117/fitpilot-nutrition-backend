import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodsDto } from './dto/create-foods.dto';
import { UpdateFoodsDto } from './dto/update-foods.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly service: FoodsService) { }

  @Post()
  create(@Body() createDto: CreateFoodsDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('professionalId') professionalId?: string) {
    const profId = professionalId ? parseInt(professionalId, 10) : undefined;
    return this.service.findAll(profId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('professionalId') professionalId?: string,
  ) {
    const profId = professionalId ? parseInt(professionalId, 10) : undefined;
    return this.service.findOne(id, profId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateFoodsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get('exchange-group/:id')
  findByExchangeGroup(
    @Param('id', ParseIntPipe) id: number,
    @Query('professionalId') professionalId?: string,
  ) {
    const profId = professionalId ? parseInt(professionalId, 10) : undefined;
    return this.service.findByExchangeGroup(id, profId);
  }
}
