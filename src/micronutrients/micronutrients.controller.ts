import { Controller, Get, Param } from '@nestjs/common';
import { MicronutrientsService } from './micronutrients.service';

@Controller('micronutrients')
export class MicronutrientsController {
  constructor(private readonly micronutrientsService: MicronutrientsService) {}

  @Get()
  findAll() {
    return this.micronutrientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.micronutrientsService.findOne(+id);
  }
}
