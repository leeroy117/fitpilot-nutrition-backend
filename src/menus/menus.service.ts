import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createDto: CreateMenuDto) {
        const { menu_meals, ...menuData } = createDto;

        return this.prisma.menus.create({
            data: {
                ...menuData,
                menu_meals: {
                    create: menu_meals?.map((meal) => ({
                        name: meal.name,
                        source_meal_plan_meal_id: meal.source_meal_plan_meal_id,
                        menu_items_menu_items_menu_meal_idTomenu_meals: {
                            create: meal.menu_items?.map((item) => ({
                                exchange_group_id: item.exchange_group_id,
                                food_id: item.food_id,
                                recipe_id: item.recipe_id,
                                serving_unit_id: item.serving_unit_id,
                                quantity: item.quantity,
                            })),
                        },
                    })),
                },
            },
            include: {
                menu_meals: {
                    include: {
                        menu_items_menu_items_menu_meal_idTomenu_meals: true,
                    },
                },
            },
        });
    }

    async findAll(professionalId: number, clientId?: number) {
        return this.prisma.menus.findMany({
            where: {
                ...(clientId && { client_id: clientId }),
                created_by: professionalId,
                is_reusable: true,
            },
            include: {
                menu_meals: {
                    include: {
                        menu_items_menu_items_menu_meal_idTomenu_meals: {
                            include: {
                                foods: {
                                    include: {
                                        food_nutrition_values: {
                                            include: {
                                                food_micronutrient_values: {
                                                    include: {
                                                        micronutrients: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                exchange_groups: true,
                                // Note: recipes relation is seemingly not connected to 'recipes' model in schema but to menu_meals, omitting to avoid confusion or errors
                                // recipes: true 
                            }
                        },
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }

    async findOne(id: number) {
        const menu = await this.prisma.menus.findUnique({
            where: { id },
            include: {
                menu_meals: {
                    include: {
                        menu_items_menu_items_menu_meal_idTomenu_meals: {
                            include: {
                                foods: {
                                    include: {
                                        food_nutrition_values: {
                                            include: {
                                                food_micronutrient_values: {
                                                    include: {
                                                        micronutrients: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                exchange_groups: true,
                                serving_units: true
                            }
                        },
                    },
                },
            },
        });

        if (!menu) {
            throw new NotFoundException(`Menu with ID ${id} not found`);
        }

        return menu;
    }

    async update(id: number, updateDto: UpdateMenuDto) {
        const { menu_meals, ...menuData } = updateDto;

        // Verify existence
        await this.findOne(id);

        return this.prisma.$transaction(async (tx) => {
            // 1. Update basic menu data
            if (Object.keys(menuData).length > 0) {
                await tx.menus.update({
                    where: { id },
                    data: menuData,
                });
            }

            // 2. Handle meals if provided
            if (menu_meals) {
                // Delete existing meals (cascades to items)
                await tx.menu_meals.deleteMany({
                    where: { menu_id: id },
                });

                // Re-create meals and items
                for (const meal of menu_meals) {
                    await tx.menu_meals.create({
                        data: {
                            menu_id: id,
                            name: meal.name,
                            source_meal_plan_meal_id: meal.source_meal_plan_meal_id,
                            menu_items_menu_items_menu_meal_idTomenu_meals: {
                                create: meal.menu_items?.map((item) => ({
                                    exchange_group_id: item.exchange_group_id,
                                    food_id: item.food_id,
                                    recipe_id: item.recipe_id,
                                    serving_unit_id: item.serving_unit_id,
                                    quantity: item.quantity,
                                })),
                            },
                        }
                    });
                }
            }

            return tx.menus.findUnique({
                where: { id },
                include: {
                    menu_meals: {
                        include: {
                            menu_items_menu_items_menu_meal_idTomenu_meals: true
                        }
                    }
                }
            });
        });
    }

    async remove(id: number) {
        const menu = await this.prisma.menus.findUnique({ where: { id } });
        if (!menu) {
            throw new NotFoundException(`Menu with ID ${id} not found`);
        }
        return this.prisma.menus.delete({
            where: { id },
        });
    }
}
