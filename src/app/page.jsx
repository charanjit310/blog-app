import Link from "next/link";
import { getPosts } from "@/lib/posts";

// Render on request rather than prerendering at build time. The page still
// benefits from the Data Cache (see the `revalidate: 60` on the fetch in
// lib/posts.js) — this only means the *first* fetch happens when a request
// comes in, not during `next build`. That keeps builds resilient to the
// upstream API being briefly unreachable at build time (as happens in some
// CI/sandboxed environments), which matters more here since this is a demo
// against a third-party mock API rather than an in-house backend.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPosts();
  const count = posts.length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
        Issue No. {String(count).padStart(3, "0")}
      </p>
      <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
        Notes from the field,
        <br />
        written down properly.
      </h1>
      <p className="text-muted text-lg leading-relaxed max-w-xl mb-10">
        A small full-stack blog demo built on the Next.js App Router —
        server-rendered reads, a REST API of its own, and progressively
        enhanced forms for every write.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity"
        >
          Browse the archive
        </Link>
        <Link
          href="/posts/new"
          className="inline-flex items-center gap-2 border border-border text-ink px-5 py-3 rounded-sm hover:border-accent transition-colors"
        >
          Write an entry
        </Link>
      </div>
    </div>
  );
}
