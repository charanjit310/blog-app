import Link from "next/link";
import type { Post } from "@/types/post";

function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
}

export function PostListItem({ post }: { post: Post }) {
  return (
    <li className="group border-b border-border">
      <Link
        href={`/posts/${post.id}`}
        className="flex items-start gap-5 py-6 px-1 -mx-1 rounded-sm hover:bg-bg-elevated transition-colors"
      >
        <span className="font-mono text-xs text-muted pt-1.5 shrink-0 tabular-nums">
          {String(post.id).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-snug capitalize group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          <p className="text-muted text-sm mt-1.5 leading-relaxed">
            {truncate(post.body, 140)}
          </p>
        </div>
      </Link>
    </li>
  );
}
