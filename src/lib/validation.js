import { z } from "zod";

/**
 * Single source of truth for what a valid post looks like.
 * Used by the form (client-side feedback) AND the route handler
 * (server-side enforcement) — never trust the client alone.
 */
export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),
  body: z
    .string()
    .trim()
    .min(10, "Body must be at least 10 characters")
    .max(5000, "Body must be under 5000 characters"),
});
