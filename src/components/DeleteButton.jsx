"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/app/actions/posts";

export function DeleteButton({ postId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this entry? This can't be undone.")) return;
    startTransition(() => {
      deletePostAction(postId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="font-mono text-xs uppercase tracking-widest text-danger hover:opacity-75 transition-opacity disabled:opacity-40"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
