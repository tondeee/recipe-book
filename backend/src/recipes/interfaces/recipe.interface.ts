export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;

  strIngredient1?: string;
  strIngredient2?: string;

  strMeasure1?: string;
  strMeasure2?: string;
}

export interface RecipeResponse {
  meals: Recipe[] | null;
}
