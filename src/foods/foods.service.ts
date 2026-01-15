import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodsDto } from './dto/create-foods.dto';
import { UpdateFoodsDto } from './dto/update-foods.dto';

@Injectable()
export class FoodsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createDto: CreateFoodsDto) {
    return this.prisma.foods.create({
      data: createDto,
    });
  }

  private mapFoodResponse(food: any) {
    const nutrition = food.food_nutrition_values?.[0];
    let micronutrients = [];

    if (nutrition && nutrition.food_micronutrient_values) {
      micronutrients = nutrition.food_micronutrient_values.map(mv => ({
        id: mv.micronutrients.id,
        name: mv.micronutrients.name,
        unit: mv.micronutrients.unit,
        category: mv.micronutrients.category,
        amount: mv.amount
      }));
    }

    if (nutrition) {
      return {
        ...food,
        base_serving_size: nutrition.base_serving_size ?? food.base_serving_size,
        base_unit: nutrition.base_unit ?? food.base_unit,
        fiber_g: nutrition.fiber_g ?? food.fiber_g,
        glycemic_index: nutrition.glycemic_index ?? food.glycemic_index,
        glycemic_load: nutrition.glycemic_load ?? food.glycemic_load,
        micronutrients: micronutrients
      };
    }
    return { ...food, micronutrients };
  }

  private async getPreferredDataSourceId(professionalId?: number): Promise<number> {
    if (!professionalId) return 1;

    const settings = await this.prisma.professional_settings.findUnique({
      where: { professional_id: professionalId },
    });

    return settings?.preferred_exchange_system_id || 1;
  }

  async findAll(professionalId?: number) {
    const dataSourceId = await this.getPreferredDataSourceId(professionalId);

    const foods = await this.prisma.foods.findMany({
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: {
            data_source_id: dataSourceId,
            deleted_at: null
          },
          include: { 
            data_sources: true,
            food_micronutrient_values: {
              include: {
                micronutrients: true
              }
            }
          }
        },
        serving_units: true,
      },
    });

    return foods.map(food => this.mapFoodResponse(food));
  }

  async findOne(id: number, professionalId?: number) {
    const dataSourceId = await this.getPreferredDataSourceId(professionalId);

    const food = await this.prisma.foods.findUnique({
      where: { id },
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: {
            data_source_id: dataSourceId,
            deleted_at: null
          },
          include: { 
            data_sources: true,
            food_micronutrient_values: {
              include: {
                micronutrients: true
              }
            }
          }
        },
        serving_units: true,
      },
    });

    return food ? this.mapFoodResponse(food) : null;
  }

  update(id: number, updateDto: UpdateFoodsDto) {
    return this.prisma.foods.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.foods.delete({
      where: { id },
    });
  }

  async findByExchangeGroup(exchangeGroupId: number, professionalId?: number) {
    const dataSourceId = await this.getPreferredDataSourceId(professionalId);

    const foods = await this.prisma.foods.findMany({
      where: { exchange_group_id: exchangeGroupId },
      include: {
        food_categories: true,
        exchange_groups: true,
        food_nutrition_values: {
          where: {
            data_source_id: dataSourceId,
            deleted_at: null
          },
          include: { 
            data_sources: true,
            food_micronutrient_values: {
              include: {
                micronutrients: true
              }
            }
          }
        },
        serving_units: true,
      },
    });

    return foods.map(food => this.mapFoodResponse(food));
  }
}
