import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateMenuItemDto {
    @IsInt()
    @IsOptional()
    exchange_group_id?: number;

    @IsInt()
    @IsOptional()
    food_id?: number;

    @IsInt()
    @IsOptional()
    recipe_id?: number;

    @IsInt()
    @IsOptional()
    serving_unit_id?: number;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}

export class CreateMenuMealDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsOptional()
    source_meal_plan_meal_id?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMenuItemDto)
    @IsOptional()
    menu_items?: CreateMenuItemDto[];
}

export class CreateMenuDto {
    @IsInt()
    @IsOptional()
    meal_plan_id?: number | null;

    @IsInt()
    @IsOptional()
    client_id?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    start_date?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    end_date?: Date;

    @IsInt()
    @IsOptional()
    created_by?: number;

    @IsBoolean()
    @IsOptional()
    is_reusable?: boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    title?: string;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMenuMealDto)
    @IsOptional()
    menu_meals?: CreateMenuMealDto[];
}
