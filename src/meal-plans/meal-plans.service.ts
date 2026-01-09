import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Injectable()
export class MealPlansService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createDto: CreateMealPlanDto) {
        const { meal_plan_meals, ...planData } = createDto;

        return this.prisma.meal_plans.create({
            data: {
                ...planData,
                meal_plan_meals: {
                    create: meal_plan_meals.map((meal) => ({
                        meal_name: meal.meal_name,
                        sort_order: meal.sort_order,
                        meal_plan_exchanges: {
                            create: meal.meal_plan_exchanges.map((exchange) => ({
                                exchange_group_id: exchange.exchange_group_id,
                                quantity: exchange.quantity,
                            })),
                        },
                    })),
                },
            },
            include: {
                meal_plan_meals: {
                    include: {
                        meal_plan_exchanges: true,
                    },
                },
            },
        });
    }

    async findAll(professionalId?: number, isTemplate?: boolean) {
        return this.prisma.meal_plans.findMany({
            where: {
                deleted_at: null,
                ...(professionalId && { created_by: professionalId }),
                ...(isTemplate !== undefined && { is_template: isTemplate }),
            },
            include: {
                meal_plan_meals: {
                    include: {
                        meal_plan_exchanges: {
                            include: {
                                exchange_groups: true
                            }
                        },
                    },
                    orderBy: {
                        sort_order: 'asc',
                    },
                },
            },
            orderBy: {
                updated_at: 'desc',
            },
        });
    }

    async findOne(id: number) {
        const plan = await this.prisma.meal_plans.findUnique({
            where: { id, deleted_at: null },
            include: {
                meal_plan_meals: {
                    include: {
                        meal_plan_exchanges: {
                            include: {
                                exchange_groups: true
                            }
                        },
                    },
                    orderBy: {
                        sort_order: 'asc',
                    },
                },
            },
        });

        if (!plan) {
            throw new NotFoundException(`Meal plan with ID ${id} not found`);
        }

        return plan;
    }

    async update(id: number, updateDto: UpdateMealPlanDto) {
        const { meal_plan_meals, ...planData } = updateDto;

        // Verify existence
        await this.findOne(id);

        return this.prisma.$transaction(async (tx) => {
            // 1. Update basic plan data
            if (Object.keys(planData).length > 0) {
                await tx.meal_plans.update({
                    where: { id },
                    data: { ...planData, updated_at: new Date() },
                });
            }

            // 2. Handle meals if provided
            if (meal_plan_meals) {
                // For simplicity in this implementation, we'll replace the meals
                // In a production environment, you might want to perform fine-grained diff updates

                // Delete existing meals (cascades to exchanges)
                await tx.meal_plan_meals.deleteMany({
                    where: { meal_plan_id: id },
                });

                // Re-create meals and exchanges
                for (const meal of meal_plan_meals) {
                    await tx.meal_plan_meals.create({
                        data: {
                            meal_plan_id: id,
                            meal_name: meal.meal_name,
                            sort_order: meal.sort_order,
                            meal_plan_exchanges: {
                                create: meal.meal_plan_exchanges.map((ex) => ({
                                    exchange_group_id: ex.exchange_group_id,
                                    quantity: ex.quantity,
                                })),
                            },
                        },
                    });
                }
            }

            return tx.meal_plans.findUnique({
                where: { id },
                include: {
                    meal_plan_meals: {
                        include: {
                            meal_plan_exchanges: true,
                        },
                        orderBy: {
                            sort_order: 'asc',
                        },
                    },
                },
            });
        });
    }

    async remove(id: number) {
        // Verify existence
        await this.findOne(id);

        return this.prisma.meal_plans.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    }
}
