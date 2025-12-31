import { Module } from '@nestjs/common';
import { ServingUnitsController } from './serving-units.controller';
import { ServingUnitsService } from './serving-units.service';

@Module({
  controllers: [ServingUnitsController],
  providers: [ServingUnitsService]
})
export class ServingUnitsModule {}
