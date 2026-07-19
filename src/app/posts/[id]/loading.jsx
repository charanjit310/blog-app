export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <div className="h-3 w-16 bg-bg-elevated rounded animate-pulse" />
      <div className="h-3 w-24 bg-bg-elevated rounded animate-pulse mt-8" />
      <div className="h-12 w-3/4 bg-bg-elevated rounded animate-pulse" />
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full bg-bg-elevated rounded animate-pulse" />
        <div className="h-4 w-full bg-bg-elevated rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-bg-elevated rounded animate-pulse" />
      </div>
    </div>
  );
}
