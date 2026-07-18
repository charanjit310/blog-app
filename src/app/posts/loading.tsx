export default function Loading() {
  const rows = Array.from({ length: 6 });
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 space-y-3">
        <div className="h-3 w-16 bg-bg-elevated rounded animate-pulse" />
        <div className="h-10 w-40 bg-bg-elevated rounded animate-pulse" />
      </div>
      <ul>
        {rows.map((_, i) => (
          <li key={i} className="border-b border-border py-6 flex gap-5">
            <div className="h-4 w-6 bg-bg-elevated rounded animate-pulse shrink-0 mt-1.5" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-2/3 bg-bg-elevated rounded animate-pulse" />
              <div className="h-4 w-full bg-bg-elevated rounded animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
