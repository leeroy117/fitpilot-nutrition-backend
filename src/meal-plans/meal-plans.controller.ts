import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Meal Plans')
@Controller('meal-plans')
export class MealPlansController {
    constructor(private readonly mealPlansService: MealPlansService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new meal plan with meals and exchanges' })
    create(@Body() createMealPlanDto: CreateMealPlanDto) {
        return this.mealPlansService.create(createMealPlanDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all meal plans with optional filters' })
    @ApiQuery({ name: 'professionalId', required: false, type: Number })
    @ApiQuery({ name: 'isTemplate', required: false, type: Boolean })
    findAll(
        @Query('professionalId') professionalId?: string,
        @Query('isTemplate') isTemplate?: string,
    ) {
        const profId = professionalId ? parseInt(professionalId, 10) : undefined;
        const isTemp = isTemplate === 'true' ? true : isTemplate === 'false' ? false : undefined;
        return this.mealPlansService.findAll(profId, isTemp);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific meal plan by ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.mealPlansService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a meal plan and its nested components' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateMealPlanDto: UpdateMealPlanDto) {
        return this.mealPlansService.update(id, updateMealPlanDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete a meal plan' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.mealPlansService.remove(id);
    }
}
