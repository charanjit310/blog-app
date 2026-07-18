import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createPost, getPosts } from "@/lib/posts";
import { postSchema } from "@/lib/validation";

// GET /api/posts — list all posts
export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[GET /api/posts]", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts — create a post
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = postSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    const post = await createPost({ ...parsed.data, userId: 1 });
    revalidateTag("posts", "max");
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[POST /api/posts]", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
