import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

export class TestHelper {
  constructor(private app: INestApplication) {}

  async cleanDatabase() {
    const prisma = this.app.get(PrismaService);
    // Add all table names here to clean them
    return prisma.$transaction([
      prisma.appointments.deleteMany(),
      prisma.availability_slots.deleteMany(),
      prisma.biometric_logs.deleteMany(),
      prisma.client_allergens.deleteMany(),
      prisma.daily_targets.deleteMany(),
      prisma.food_logs.deleteMany(),
      prisma.food_nutrients.deleteMany(),
      prisma.meal_plan_items.deleteMany(),
      prisma.meal_plans.deleteMany(),
      prisma.recipe_ingredients.deleteMany(),
      prisma.recipes.deleteMany(),
      prisma.serving_units.deleteMany(),
      prisma.foods.deleteMany(),
      prisma.food_categories.deleteMany(),
      prisma.exchange_groups.deleteMany(),
      prisma.exchange_systems.deleteMany(),
      prisma.data_sources.deleteMany(),
      prisma.users.deleteMany(), // Be careful with foreign keys
    ]);
  }
}
