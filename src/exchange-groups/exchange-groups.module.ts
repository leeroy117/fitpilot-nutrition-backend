import { Module } from '@nestjs/common';
import { ExchangeGroupsController } from './exchange-groups.controller';
import { ExchangeGroupsService } from './exchange-groups.service';

@Module({
  controllers: [ExchangeGroupsController],
  providers: [ExchangeGroupsService]
})
export class ExchangeGroupsModule {}
