import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deletePost, getPost, updatePost } from "@/lib/posts";
import { postSchema } from "@/lib/validation";

// GET /api/posts/:id — fetch a single post
export async function GET(_request, { params }) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT /api/posts/:id — update a post
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = postSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    const post = await updatePost(Number(id), parsed.data);
    revalidateTag(`post-${id}`, "max");
    revalidateTag("posts", "max");
    return NextResponse.json(post);
  } catch (error) {
    console.error(`[PUT /api/posts/${id}]`, error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/:id — delete a post
export async function DELETE(_request, { params }) {
  const { id } = await params;

  try {
    await deletePost(Number(id));
    revalidateTag("posts", "max");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[DELETE /api/posts/${id}]`, error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
