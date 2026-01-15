import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RecipeFoodsService } from './recipe-foods.service';
import { CreateRecipeFoodDto } from './dto/create-recipe-food.dto';
import { UpdateRecipeFoodDto } from './dto/update-recipe-food.dto';

@Controller('recipe-foods')
export class RecipeFoodsController {
    constructor(private readonly recipeFoodsService: RecipeFoodsService) { }

    @Post()
    create(@Body() createDto: CreateRecipeFoodDto) {
        return this.recipeFoodsService.create(createDto);
    }

    @Get()
    findAll(@Query('recipe_id') recipeId?: string) {
        return this.recipeFoodsService.findAll(recipeId ? +recipeId : undefined);
    }

    @Get('recipe/:recipe_id')
    findByRecipeId(@Param('recipe_id', ParseIntPipe) recipeId: number) {
        return this.recipeFoodsService.findAll(recipeId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recipeFoodsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateRecipeFoodDto) {
        return this.recipeFoodsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.recipeFoodsService.remove(id);
    }
}
