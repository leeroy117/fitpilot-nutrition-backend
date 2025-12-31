import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientMetricDto } from './dto/create-client-metric.dto';
import { UpdateClientMetricDto } from './dto/update-client-metric.dto';

@Injectable()
export class ClientMetricsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientMetricDto: CreateClientMetricDto) {
    return this.prisma.client_metrics.create({
      data: createClientMetricDto,
    });
  }

  findAll() {
    return this.prisma.client_metrics.findMany();
  }

  findOne(id: number) {
    return this.prisma.client_metrics.findUnique({
      where: { id },
    });
  }

  update(id: number, updateClientMetricDto: UpdateClientMetricDto) {
    return this.prisma.client_metrics.update({
      where: { id },
      data: updateClientMetricDto,
    });
  }

  remove(id: number) {
    return this.prisma.client_metrics.delete({
      where: { id },
    });
  }
}
