import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodCategoriesDto } from './create-food-categories.dto';

export class UpdateFoodCategoriesDto extends PartialType(CreateFoodCategoriesDto) {}