import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) { }

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Get()
    findAll(
        @Query('createdBy') createdBy?: string,
        @Query('isTemplate') isTemplate?: string,
    ) {
        const createdById = createdBy ? parseInt(createdBy, 10) : undefined;
        const isTemplateFlag = isTemplate !== undefined ? isTemplate === 'true' : undefined;
        return this.recipesService.findAll(createdById, isTemplateFlag);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(id, updateRecipeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.remove(id);
    }
}
