export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-sage-100" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-sage-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-sage-100" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-sage-100" />
      </div>
    </div>
  );
}
