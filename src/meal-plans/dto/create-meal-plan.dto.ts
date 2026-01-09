import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsArray, ValidateNested, IsBoolean, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMealPlanExchangeDto {
    @ApiProperty({ description: 'The ID of the exchange group' })
    @IsInt()
    exchange_group_id: number;

    @ApiProperty({ description: 'The quantity of exchanges' })
    @IsInt()
    quantity: number;
}

export class CreateMealPlanMealDto {
    @ApiProperty({ description: 'The name of the meal', example: 'Desayuno' })
    @IsString()
    @MaxLength(50)
    meal_name: string;

    @ApiProperty({ description: 'The order of the meal in the plan' })
    @IsInt()
    sort_order: number;

    @ApiProperty({ type: [CreateMealPlanExchangeDto], description: 'Exchanges for this meal' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMealPlanExchangeDto)
    meal_plan_exchanges: CreateMealPlanExchangeDto[];
}

export class CreateMealPlanDto {
    @ApiProperty({ description: 'The name of the meal plan', example: 'Plan Hipertrofia 2500 kcal' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ description: 'Description of the meal plan' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'The ID of the user who created the plan' })
    @IsInt()
    @IsOptional()
    created_by?: number;

    @ApiPropertyOptional({ description: 'Whether this plan is a template', default: false })
    @IsBoolean()
    @IsOptional()
    is_template?: boolean;

    @ApiProperty({ type: [CreateMealPlanMealDto], description: 'Meals included in the plan' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMealPlanMealDto)
    meal_plan_meals: CreateMealPlanMealDto[];
}
