"use client";

import { useEffect } from "react";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-danger mb-4">
        Something went wrong
      </p>
      <h1 className="font-display text-3xl mb-4">
        Couldn&apos;t load the archive.
      </h1>
      <p className="text-muted mb-8">
        The API didn&apos;t respond the way we expected. Try again.
      </p>
      <button
        onClick={reset}
        className="bg-accent text-bg font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    </div>
  );
}
