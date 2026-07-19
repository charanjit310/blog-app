import { PostForm } from "@/components/PostForm";
import { createPostAction } from "@/app/actions/posts";

export const metadata = {
  title: "New Entry",
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
        New Entry
      </p>
      <h1 className="font-display text-4xl tracking-tight mb-10">
        Write something.
      </h1>
      <PostForm action={createPostAction} submitLabel="Publish entry" />
    </div>
  );
}
