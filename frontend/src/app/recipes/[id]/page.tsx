import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, getRecipes } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface RecipeDetailProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.slice(0, 10).map((recipe) => ({
    id: recipe.idMeal,
  }));
}

function IngredientsList({ recipe }: { recipe: any }) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ingredients.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Link href={`/?ingredient=${encodeURIComponent(item.name)}`}>
              <Badge className="cursor-pointer hover:bg-primary">
                {item.name}
              </Badge>
            </Link>
            <span className="text-sm text-muted-foreground">
              {item.measure}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimilarRecipes({ recipes }: { recipes: any[] }) {
  if (recipes.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">More recipes in this category</h2>
      <div className="grid grid-cols-1 gap-4">
        {recipes.slice(0, 4).map((recipe) => (
          <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="flex items-center p-2 gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  {recipe.strMealThumb && (
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-0">
                  <CardTitle className="text-sm">{recipe.strMeal}</CardTitle>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function RecipeDetailPage({ params }: RecipeDetailProps) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  const similarRecipes = await getRecipes({ category: recipe.strCategory });
  const filteredSimilarRecipes = similarRecipes.filter(
    (item) => item.idMeal !== recipe.idMeal
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative">
            {recipe.strMealThumb && (
              <div className="relative h-80 w-full overflow-hidden rounded-lg mb-6">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {recipe.strMeal}
            </h1>

            <div className="flex gap-2 mb-6">
              {recipe.strArea && (
                <Link href={`/?country=${encodeURIComponent(recipe.strArea)}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {recipe.strArea} Cuisine
                  </Badge>
                </Link>
              )}

              {recipe.strCategory && (
                <Link
                  href={`/?category=${encodeURIComponent(recipe.strCategory)}`}
                >
                  <Badge variant="secondary" className="cursor-pointer">
                    {recipe.strCategory}
                  </Badge>
                </Link>
              )}
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <div className="prose max-w-none">
                {recipe.strInstructions
                  ?.split("\r\n")
                  .map((paragraph, idx) =>
                    paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
                  )}
              </div>
            </div>

            <Suspense fallback={<Skeleton className="h-40 w-full" />}>
              <IngredientsList recipe={recipe} />
            </Suspense>

            {recipe.strYoutube && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Video Tutorial</h2>
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      recipe.strYoutube.split("v=")[1]
                    }`}
                    title={`How to make ${recipe.strMeal}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Suspense fallback={<Skeleton className="h-60 w-full" />}>
              <SimilarRecipes recipes={filteredSimilarRecipes} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
