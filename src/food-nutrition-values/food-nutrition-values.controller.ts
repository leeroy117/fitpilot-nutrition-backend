import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FoodNutritionValuesService } from './food-nutrition-values.service';
import { CreateFoodNutritionValueDto } from './dto/create-food-nutrition-value.dto';
import { UpdateFoodNutritionValueDto } from './dto/update-food-nutrition-value.dto';

@Controller('food-nutrition-values')
export class FoodNutritionValuesController {
    constructor(private readonly service: FoodNutritionValuesService) { }

    @Post()
    create(@Body() createDto: CreateFoodNutritionValueDto) {
        return this.service.create(createDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('food/:foodId')
    findByFoodId(@Param('foodId', ParseIntPipe) foodId: number) {
        return this.service.findByFoodId(foodId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateFoodNutritionValueDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
