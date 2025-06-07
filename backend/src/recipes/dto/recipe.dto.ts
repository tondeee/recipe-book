export class RecipeDto {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: any;
}

export class RecipeResponseDto {
  meals: RecipeDto[] | null;
}
