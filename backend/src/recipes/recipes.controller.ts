import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeResponseDto } from './dto/recipe.dto';

@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ): Promise<RecipeResponseDto> {
    if (search) {
      return this.recipesService.searchRecipesByName(search);
    }

    if (ingredient) {
      return this.recipesService.getRecipesByIngredient(ingredient);
    }

    if (country) {
      return this.recipesService.getRecipesByCountry(country);
    }

    if (category) {
      return this.recipesService.getRecipesByCategory(category);
    }

    return this.recipesService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string): Promise<RecipeResponseDto> {
    return this.recipesService.getRecipeById(id);
  }
}
