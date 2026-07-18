/**
 * Domain types for the blog.
 *
 * These mirror JSONPlaceholder's `/posts` shape, kept separate from any
 * one API's response shape so the rest of the app doesn't care where
 * data comes from.
 */
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/** Shape accepted when creating a post — no id, server assigns it. */
export type CreatePostInput = Pick<Post, "title" | "body" | "userId">;

/** Shape accepted when editing a post — id required, rest optional. */
export type UpdatePostInput = Partial<CreatePostInput>;
