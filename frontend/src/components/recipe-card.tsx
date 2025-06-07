import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.idMeal}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            {recipe.strMealThumb && (
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            )}
          </AspectRatio>
          {recipe.strCategory && (
            <div className="absolute right-2 top-2">
              <Badge variant="secondary" className="opacity-90">
                {recipe.strCategory}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="px-4 py-2 pb-0">
          <CardTitle className="line-clamp-2 text-lg">
            {recipe.strMeal}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          {recipe.strArea && (
            <p className="text-sm text-muted-foreground">
              {recipe.strArea} cuisine
            </p>
          )}
        </CardContent>
        <CardFooter className="px-4 py-2 pt-0 flex justify-between">
          <p className="text-sm">View recipe →</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
