"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "@/lib/posts";
import { postSchema } from "@/lib/validation";

export interface PostFormState {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"title" | "body", string[]>>;
}

/**
 * Create a post. Wired to a <form action={...}> so it works even before
 * client JS hydrates (progressive enhancement) — useActionState just
 * layers pending/error UI on top.
 */
export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let newId: number;
  try {
    const post = await createPost({ ...parsed.data, userId: 1 });
    newId = post.id;
  } catch {
    return { status: "error", message: "Could not create post. Try again." };
  }

  updateTag("posts");
  revalidatePath("/posts");
  redirect(`/posts/${newId}`);
}

export async function updatePostAction(
  id: number,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updatePost(id, parsed.data);
  } catch {
    return { status: "error", message: "Could not save changes. Try again." };
  }

  updateTag(`post-${id}`);
  updateTag("posts");
  revalidatePath("/posts");
  redirect(`/posts/${id}`);
}

export async function deletePostAction(id: number) {
  try {
    await deletePost(id);
  } catch {
    // In a real backend we'd surface this; JSONPlaceholder deletes always
    // succeed, so this branch is here for completeness.
    return;
  }

  updateTag("posts");
  revalidatePath("/posts");
  redirect("/posts");
}
