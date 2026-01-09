import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createDto: CreateRecipeDto) {
        const { recipe_exchanges, ...recipeData } = createDto;

        return this.prisma.recipes.create({
            data: {
                ...recipeData,
                recipe_exchanges: {
                    create: recipe_exchanges?.map((exchange) => ({
                        exchange_group_id: exchange.exchange_group_id,
                        quantity: exchange.quantity,
                    })) || [],
                },
            },
            include: {
                recipe_exchanges: {
                    include: {
                        exchange_groups: true,
                    },
                },
            },
        });
    }

    async findAll(createdBy?: number, isTemplate?: boolean) {
        return this.prisma.recipes.findMany({
            where: {
                deleted_at: null,
                ...(createdBy && { created_by: createdBy }),
                ...(isTemplate !== undefined && { is_template: isTemplate }),
            },
            include: {
                recipe_exchanges: {
                    include: {
                        exchange_groups: true,
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }

    async findOne(id: number) {
        const recipe = await this.prisma.recipes.findUnique({
            where: { id, deleted_at: null },
            include: {
                recipe_exchanges: {
                    include: {
                        exchange_groups: true,
                    },
                },
            },
        });

        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        return recipe;
    }

    async update(id: number, updateDto: UpdateRecipeDto) {
        const { recipe_exchanges, ...recipeData } = updateDto;

        // Verify existence
        await this.findOne(id);

        return this.prisma.$transaction(async (tx) => {
            // 1. Update basic recipe data
            if (Object.keys(recipeData).length > 0) {
                await tx.recipes.update({
                    where: { id },
                    data: { ...recipeData },
                });
            }

            // 2. Handle exchanges if provided
            if (recipe_exchanges) {
                // Delete existing exchanges
                await tx.recipe_exchanges.deleteMany({
                    where: { recipe_id: id },
                });

                // Re-create exchanges
                if (recipe_exchanges.length > 0) {
                    await tx.recipe_exchanges.createMany({
                        data: recipe_exchanges.map((ex) => ({
                            recipe_id: id,
                            exchange_group_id: ex.exchange_group_id,
                            quantity: ex.quantity,
                        })),
                    });
                }
            }

            return tx.recipes.findUnique({
                where: { id },
                include: {
                    recipe_exchanges: {
                        include: {
                            exchange_groups: true,
                        },
                    },
                },
            });
        });
    }

    async remove(id: number) {
        // Verify existence
        await this.findOne(id);

        return this.prisma.recipes.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
}
