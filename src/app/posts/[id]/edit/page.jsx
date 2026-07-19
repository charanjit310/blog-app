import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { PostForm } from "@/components/PostForm";
import { updatePostAction } from "@/app/actions/posts";

export const metadata = {
  title: "Edit Entry",
};

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, post.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
        Entry No. {String(post.id).padStart(2, "0")}
      </p>
      <h1 className="font-display text-4xl tracking-tight mb-10">
        Edit entry.
      </h1>
      <PostForm
        action={boundAction}
        defaultValues={{ title: post.title, body: post.body }}
        submitLabel="Save changes"
      />
    </div>
  );
}
