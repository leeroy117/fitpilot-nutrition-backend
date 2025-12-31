import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExchangeSystemsService } from './exchange-systems.service';
import { CreateExchangeSystemsDto } from './dto/create-exchange-systems.dto';
import { UpdateExchangeSystemsDto } from './dto/update-exchange-systems.dto';

@Controller('exchange-systems')
export class ExchangeSystemsController {
  constructor(private readonly service: ExchangeSystemsService) {}

  @Post()
  create(@Body() createDto: CreateExchangeSystemsDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateExchangeSystemsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
