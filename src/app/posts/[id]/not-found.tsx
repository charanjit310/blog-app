import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
        404
      </p>
      <h1 className="font-display text-3xl mb-4">This entry doesn&apos;t exist.</h1>
      <p className="text-muted mb-8">
        It may have been deleted, or the link is off.
      </p>
      <Link
        href="/posts"
        className="bg-accent text-bg font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity inline-block"
      >
        Back to archive
      </Link>
    </div>
  );
}
