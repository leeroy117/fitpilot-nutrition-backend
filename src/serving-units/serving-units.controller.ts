import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ServingUnitsService } from './serving-units.service';
import { CreateServingUnitsDto } from './dto/create-serving-units.dto';
import { UpdateServingUnitsDto } from './dto/update-serving-units.dto';

@Controller('serving-units')
export class ServingUnitsController {
  constructor(private readonly service: ServingUnitsService) {}

  @Post()
  create(@Body() createDto: CreateServingUnitsDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateServingUnitsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
