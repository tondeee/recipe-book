export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strTags?: string;
  strYoutube?: string;

  [key: string]: string | undefined;
}

export interface RecipeResponse {
  meals: Recipe[] | null;
}

export interface RecipeListProps {
  recipes: Recipe[];
  title?: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
}

export interface RecipeDetailProps {
  recipe: Recipe;
  similarRecipes?: Recipe[];
}
