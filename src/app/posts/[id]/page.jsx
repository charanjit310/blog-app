import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { DeleteButton } from "@/components/DeleteButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) return { title: "Entry not found" };

  return {
    title: post.title,
    description: post.body.slice(0, 140),
  };
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/posts"
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
      >
        ← Archive
      </Link>

      <p className="font-mono text-xs uppercase tracking-widest text-accent mt-8 mb-3">
        Entry No. {String(post.id).padStart(2, "0")}
      </p>
      <h1 className="font-display text-4xl sm:text-5xl leading-tight tracking-tight capitalize mb-8">
        {post.title}
      </h1>

      <p className="text-ink/90 text-lg leading-relaxed whitespace-pre-line mb-12">
        {post.body}
      </p>

      <div className="flex items-center gap-6 pt-6 border-t border-border">
        <Link
          href={`/posts/${post.id}/edit`}
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          Edit
        </Link>
        <DeleteButton postId={post.id} />
      </div>
    </article>
  );
}
