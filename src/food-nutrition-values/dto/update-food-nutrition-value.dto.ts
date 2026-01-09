import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodNutritionValueDto } from './create-food-nutrition-value.dto';

export class UpdateFoodNutritionValueDto extends PartialType(CreateFoodNutritionValueDto) { }
