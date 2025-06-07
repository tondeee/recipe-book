import { Recipe, RecipeResponse } from "@/types/recipe";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getRecipes(params?: {
  ingredient?: string;
  country?: string;
  category?: string;
  search?: string;
}): Promise<Recipe[]> {
  const queryParams = new URLSearchParams();

  if (params?.ingredient) {
    queryParams.append("ingredient", params.ingredient);
  }
  if (params?.country) {
    queryParams.append("country", params.country);
  }
  if (params?.category) {
    queryParams.append("category", params.category);
  }
  if (params?.search) {
    queryParams.append("search", params.search);
  }

  const queryString = queryParams.toString();
  const url = `${API_URL}/recipes${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.statusText}`);
    }

    const data: RecipeResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${API_URL}/recipes/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching recipe: ${response.statusText}`);
    }

    const data: RecipeResponse = await response.json();
    return data.meals && data.meals.length > 0 ? data.meals[0] : null;
  } catch (error) {
    console.error(`Failed to fetch recipe ${id}:`, error);
    return null;
  }
}
