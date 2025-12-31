import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfessionalProfilesModule } from './professional-profiles/professional-profiles.module';
import { ProfessionalClientsModule } from './professional-clients/professional-clients.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ClientMetricsModule } from './client-metrics/client-metrics.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { DailyTargetsModule } from './daily-targets/daily-targets.module';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { ExchangeGroupsModule } from './exchange-groups/exchange-groups.module';
import { ExchangeSystemsModule } from './exchange-systems/exchange-systems.module';
import { FoodCategoriesModule } from './food-categories/food-categories.module';
import { FoodLogsModule } from './food-logs/food-logs.module';
import { FoodsModule } from './foods/foods.module';
import { ServingUnitsModule } from './serving-units/serving-units.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AvailabilitySlotsModule } from './availability-slots/availability-slots.module';

import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';

@Module({
imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, UsersModule, ProfessionalProfilesModule, ProfessionalClientsModule, PlansModule, SubscriptionsModule, ClientMetricsModule, RefreshTokensModule, DailyTargetsModule, DataSourcesModule, ExchangeGroupsModule, ExchangeSystemsModule, FoodCategoriesModule, FoodLogsModule, FoodsModule, ServingUnitsModule, AppointmentsModule, AvailabilitySlotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
