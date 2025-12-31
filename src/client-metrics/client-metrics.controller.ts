import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientMetricsService } from './client-metrics.service';
import { CreateClientMetricDto } from './dto/create-client-metric.dto';
import { UpdateClientMetricDto } from './dto/update-client-metric.dto';

@Controller('client-metrics')
export class ClientMetricsController {
  constructor(private readonly clientMetricsService: ClientMetricsService) {}

  @Post()
  create(@Body() createClientMetricDto: CreateClientMetricDto) {
    return this.clientMetricsService.create(createClientMetricDto);
  }

  @Get()
  findAll() {
    return this.clientMetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientMetricsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientMetricDto: UpdateClientMetricDto) {
    return this.clientMetricsService.update(+id, updateClientMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientMetricsService.remove(+id);
  }
}
