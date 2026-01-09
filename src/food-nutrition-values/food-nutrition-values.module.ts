import { Module } from '@nestjs/common';
import { FoodNutritionValuesService } from './food-nutrition-values.service';
import { FoodNutritionValuesController } from './food-nutrition-values.controller';

@Module({
    controllers: [FoodNutritionValuesController],
    providers: [FoodNutritionValuesService],
})
export class FoodNutritionValuesModule { }
