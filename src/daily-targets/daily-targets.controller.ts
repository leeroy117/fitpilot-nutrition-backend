import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DailyTargetsService } from './daily-targets.service';
import { CreateDailyTargetsDto } from './dto/create-daily-targets.dto';
import { UpdateDailyTargetsDto } from './dto/update-daily-targets.dto';

@Controller('daily-targets')
export class DailyTargetsController {
  constructor(private readonly service: DailyTargetsService) {}

  @Post()
  create(@Body() createDto: CreateDailyTargetsDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDailyTargetsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
