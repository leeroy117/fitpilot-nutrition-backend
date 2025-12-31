import { Module } from '@nestjs/common';
import { ExchangeSystemsController } from './exchange-systems.controller';
import { ExchangeSystemsService } from './exchange-systems.service';

@Module({
  controllers: [ExchangeSystemsController],
  providers: [ExchangeSystemsService]
})
export class ExchangeSystemsModule {}
