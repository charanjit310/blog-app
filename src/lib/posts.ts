import "server-only";
import type { CreatePostInput, Post, UpdatePostInput } from "@/types/post";

const API_BASE = process.env.POSTS_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

/**
 * Data access layer for posts.
 *
 * This is the ONLY module that knows about JSONPlaceholder. Everything else
 * in the app (Server Components, Route Handlers, Server Actions) calls
 * these functions instead of fetching JSONPlaceholder directly. If we ever
 * swap in a real database, this is the only file that changes.
 *
 * Marked `server-only` so it can never accidentally end up in a client
 * bundle (it would fail the build if imported from a "use client" file).
 *
 * Note on persistence: JSONPlaceholder is a mock API. It returns realistic
 * responses for POST/PUT/DELETE (e.g. a new id, echoed body) but does not
 * actually persist writes on their server. Route Handlers below return
 * whatever JSONPlaceholder responds with, and the UI merges that into local
 * state optimistically so the CRUD flow behaves correctly in this demo.
 */

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`, {
    // Revalidate every 60s (ISR) — blog content doesn't need to be
    // second-fresh, but shouldn't go stale forever either.
    next: { revalidate: 60, tags: ["posts"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  return res.json();
}

export async function getPost(id: number): Promise<Post | null> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    next: { revalidate: 60, tags: [`post-${id}`] },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  }

  return res.json();
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to create post: ${res.status}`);
  }

  return res.json();
}

export async function updatePost(id: number, input: UpdatePostInput): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to update post ${id}: ${res.status}`);
  }

  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete post ${id}: ${res.status}`);
  }
}
