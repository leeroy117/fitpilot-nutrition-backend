import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeFoodDto } from './dto/create-recipe-food.dto';
import { UpdateRecipeFoodDto } from './dto/update-recipe-food.dto';

@Injectable()
export class RecipeFoodsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createDto: CreateRecipeFoodDto) {
        return this.prisma.recipe_foods.create({
            data: createDto,
            include: {
                foods: true,
                recipes: true,
                serving_units: true
            }
        });
    }

    async findAll(recipeId?: number) {
        return this.prisma.recipe_foods.findMany({
            where: {
                ...(recipeId && { recipe_id: recipeId }),
            },
            include: {
                recipes: true,
                foods: true,
                serving_units: true,
            },
        });
    }

    async findOne(id: number) {
        const recipeFood = await this.prisma.recipe_foods.findUnique({
            where: { id },
            include: {
                foods: true,
                serving_units: true,
                recipes: true
            },
        });

        if (!recipeFood) {
            throw new NotFoundException(`Recipe food with ID ${id} not found`);
        }

        return recipeFood;
    }

    async update(id: number, updateDto: UpdateRecipeFoodDto) {
        await this.findOne(id);
        return this.prisma.recipe_foods.update({
            where: { id },
            data: updateDto,
            include: {
                foods: true,
                serving_units: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.recipe_foods.delete({
            where: { id },
        });
    }
}
