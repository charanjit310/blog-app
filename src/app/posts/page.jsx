import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostListItem } from "@/components/PostListItem";

// See the note in app/page.jsx — render on request, not at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Archive",
  description: "Every entry, newest first.",
};

export default async function PostsPage() {
  const posts = await getPosts();
  const sorted = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            Archive
          </p>
          <h1 className="font-display text-4xl tracking-tight">
            {posts.length} entries
          </h1>
        </div>
        <Link
          href="/posts/new"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          + New Entry
        </Link>
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted py-12 text-center">
          Nothing here yet. Be the first to write something.
        </p>
      ) : (
        <ul>
          {sorted.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}
