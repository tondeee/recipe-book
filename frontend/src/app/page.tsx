import { Suspense } from "react";
import { RecipeList } from "@/components/recipe-list";
import { FilterBar } from "@/components/filter-bar";
import { getRecipes } from "@/services/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const ingredient = searchParams?.ingredient?.toString() || undefined;
  const country = searchParams?.country?.toString() || undefined;
  const category = searchParams?.category?.toString() || undefined;
  const search = searchParams?.search?.toString() || undefined;

  const recipes = await getRecipes({ ingredient, country, category, search });

  const activeFilter = ingredient
    ? { type: "ingredient" as const, value: ingredient }
    : country
    ? { type: "country" as const, value: country }
    : category
    ? { type: "category" as const, value: category }
    : undefined;

  const title = search
    ? `Search results for "${search}"`
    : ingredient
    ? `Recipes with ${ingredient}`
    : country
    ? `${country} Cuisine`
    : category
    ? `${category} Recipes`
    : "All Recipes";

  return (
    <div className="min-h-screen">
      <main className="flex flex-col">
        <div className="bg-stone-50 py-12 mb-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Recipe Book</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover delicious recipes from around the world. Browse by
              ingredients, cuisine, or category to find your next culinary
              adventure.
            </p>
          </div>
        </div>

        <FilterBar activeFilter={activeFilter} />

        <Suspense fallback={<RecipeList recipes={[]} isLoading={true} />}>
          <RecipeList recipes={recipes} title={title} />
        </Suspense>
      </main>
    </div>
  );
}
