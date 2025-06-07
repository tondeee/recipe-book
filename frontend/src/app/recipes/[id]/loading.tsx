import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div>
            <Skeleton className="h-80 w-full rounded-lg mb-6" />

            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            <div className="mt-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
