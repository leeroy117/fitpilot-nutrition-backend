import { Module } from '@nestjs/common';
import { ClientMetricsService } from './client-metrics.service';
import { ClientMetricsController } from './client-metrics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClientMetricsController],
  providers: [ClientMetricsService],
})
export class ClientMetricsModule {}
