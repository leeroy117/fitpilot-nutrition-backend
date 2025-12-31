import { Module } from '@nestjs/common';
import { AvailabilitySlotsService } from './availability-slots.service';
import { AvailabilitySlotsController } from './availability-slots.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AvailabilitySlotsController],
  providers: [AvailabilitySlotsService],
})
export class AvailabilitySlotsModule {}
