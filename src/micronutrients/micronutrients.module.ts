import { Module } from '@nestjs/common';
import { MicronutrientsService } from './micronutrients.service';
import { MicronutrientsController } from './micronutrients.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MicronutrientsController],
  providers: [MicronutrientsService],
})
export class MicronutrientsModule {}
