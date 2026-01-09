import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodNutritionValueDto } from './dto/create-food-nutrition-value.dto';
import { UpdateFoodNutritionValueDto } from './dto/update-food-nutrition-value.dto';

@Injectable()
export class FoodNutritionValuesService {
    constructor(private readonly prisma: PrismaService) { }

    create(createDto: CreateFoodNutritionValueDto) {
        return this.prisma.food_nutrition_values.create({
            data: createDto,
        });
    }

    findAll() {
        return this.prisma.food_nutrition_values.findMany({
            where: { deleted_at: null },
            include: {
                foods: true,
                data_sources: true,
            },
        });
    }

    findByFoodId(foodId: number) {
        return this.prisma.food_nutrition_values.findMany({
            where: { food_id: foodId, deleted_at: null },
            include: {
                data_sources: true,
            },
        });
    }

    async findOne(id: number) {
        const value = await this.prisma.food_nutrition_values.findUnique({
            where: { id, deleted_at: null },
            include: {
                foods: true,
                data_sources: true,
            },
        });

        if (!value) {
            throw new NotFoundException(`Food nutrition value with ID ${id} not found`);
        }

        return value;
    }

    update(id: number, updateDto: UpdateFoodNutritionValueDto) {
        return this.prisma.food_nutrition_values.update({
            where: { id },
            data: updateDto,
        });
    }

    remove(id: number) {
        return this.prisma.food_nutrition_values.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
}
