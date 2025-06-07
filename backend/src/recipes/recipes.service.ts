import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RecipeResponseDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {
  private apiUrl: string = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiUrl = this.configService.get<string>('MEAL_DB_API_URL');
    if (apiUrl) {
      this.apiUrl = apiUrl;
    } else {
      this.apiUrl = 'https://www.themealdb.com/api/json/v1/1';
    }
  }

  async getAllRecipes(): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(`${this.apiUrl}/search.php?s=`),
    );
    return response.data;
  }

  async getRecipesByIngredient(ingredient: string): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(
        `${this.apiUrl}/filter.php?i=${ingredient}`,
      ),
    );
    return response.data;
  }

  async getRecipesByCountry(country: string): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(
        `${this.apiUrl}/filter.php?a=${country}`,
      ),
    );
    return response.data;
  }

  async getRecipesByCategory(category: string): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(
        `${this.apiUrl}/filter.php?c=${category}`,
      ),
    );
    return response.data;
  }

  async getRecipeById(id: string): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(
        `${this.apiUrl}/lookup.php?i=${id}`,
      ),
    );
    return response.data;
  }

  async searchRecipesByName(searchTerm: string): Promise<RecipeResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<RecipeResponseDto>(
        `${this.apiUrl}/search.php?s=${searchTerm}`,
      ),
    );
    return response.data;
  }
}
