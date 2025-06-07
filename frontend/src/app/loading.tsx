import { RecipeList } from "@/components/recipe-list";

export default function Loading() {
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

        <RecipeList recipes={[]} isLoading={true} />
      </main>
    </div>
  );
}
