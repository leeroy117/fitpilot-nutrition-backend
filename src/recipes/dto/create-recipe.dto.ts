import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeExchangeDto } from './recipe-exchange.dto';

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    created_by?: number;

    @IsBoolean()
    @IsOptional()
    is_template?: boolean;

    @ValidateNested({ each: true }) // Wait, in some versions it's each: true
    @Type(() => RecipeExchangeDto)
    @IsOptional()
    recipe_exchanges?: RecipeExchangeDto[];
}
