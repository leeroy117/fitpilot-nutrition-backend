import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AvailabilitySlotsService } from './availability-slots.service';
import { CreateAvailabilitySlotsDto } from './dto/create-availability-slots.dto';
import { UpdateAvailabilitySlotsDto } from './dto/update-availability-slots.dto';

@Controller('availability-slots')
export class AvailabilitySlotsController {
  constructor(private readonly availabilitySlotsService: AvailabilitySlotsService) {}

  @Post()
  create(@Body() createAvailabilitySlotsDto: CreateAvailabilitySlotsDto) {
    return this.availabilitySlotsService.create(createAvailabilitySlotsDto);
  }

  @Get()
  findAll() {
    return this.availabilitySlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.availabilitySlotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAvailabilitySlotsDto: UpdateAvailabilitySlotsDto) {
    return this.availabilitySlotsService.update(id, updateAvailabilitySlotsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.availabilitySlotsService.remove(id);
  }
}
