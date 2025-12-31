import { Module } from '@nestjs/common';
import { DailyTargetsController } from './daily-targets.controller';
import { DailyTargetsService } from './daily-targets.service';

@Module({
  controllers: [DailyTargetsController],
  providers: [DailyTargetsService]
})
export class DailyTargetsModule {}
