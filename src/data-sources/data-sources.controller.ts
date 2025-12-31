import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { CreateDataSourcesDto } from './dto/create-data-sources.dto';
import { UpdateDataSourcesDto } from './dto/update-data-sources.dto';

@Controller('data-sources')
export class DataSourcesController {
  constructor(private readonly service: DataSourcesService) {}

  @Post()
  create(@Body() createDto: CreateDataSourcesDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDataSourcesDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
