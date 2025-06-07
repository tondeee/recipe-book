import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/recipe-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

interface RecipeListProps {
  recipes: Recipe[];
  title?: string;
  isLoading?: boolean;
}

export function RecipeList({
  recipes,
  title,
  isLoading = false,
}: RecipeListProps) {
  return (
    <div className="container mx-auto py-8">
      {title && (
        <h1 className="text-3xl font-bold mb-8">
          {title}
          {isLoading && <Spinner className="ml-4 inline-block" size="sm" />}
        </h1>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-full">
                <div className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No recipes found</p>
        </div>
      )}
    </div>
  );
}
