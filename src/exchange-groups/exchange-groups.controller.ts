import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExchangeGroupsService } from './exchange-groups.service';
import { CreateExchangeGroupsDto } from './dto/create-exchange-groups.dto';
import { UpdateExchangeGroupsDto } from './dto/update-exchange-groups.dto';

@Controller('exchange-groups')
export class ExchangeGroupsController {
  constructor(private readonly service: ExchangeGroupsService) {}

  @Post()
  create(@Body() createDto: CreateExchangeGroupsDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateExchangeGroupsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
