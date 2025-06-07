import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  activeFilter?: {
    type: "ingredient" | "country" | "category";
    value: string;
  };
}

const popularCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Seafood",
  "Vegetarian",
];

const popularCuisines = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "French",
  "American",
];

export function FilterBar({ activeFilter }: FilterBarProps) {
  return (
    <div className="container mx-auto py-4">
      {activeFilter && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtered by:</span>
          <Badge variant="outline" className="text-sm">
            {activeFilter.type === "ingredient"
              ? "Ingredient: "
              : activeFilter.type === "country"
              ? "Cuisine: "
              : "Category: "}
            {activeFilter.value}
          </Badge>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-sm h-8">
              Clear filter
            </Button>
          </Link>
        </div>
      )}

      <div>
        <h3 className="font-medium mb-2">Popular Categories</h3>
        <div className="flex gap-2 flex-wrap">
          {popularCategories.map((category) => (
            <Link
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
            >
              <Badge variant="secondary" className="cursor-pointer">
                {category}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Popular Cuisines</h3>
        <div className="flex gap-2 flex-wrap">
          {popularCuisines.map((cuisine) => (
            <Link
              key={cuisine}
              href={`/?country=${encodeURIComponent(cuisine)}`}
            >
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
              >
                {cuisine}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
