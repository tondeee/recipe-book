import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the recipe you were looking for. It may have
        been removed or doesn't exist.
      </p>
      <Link href="/">
        <Button>Back to Recipes</Button>
      </Link>
    </div>
  );
}
