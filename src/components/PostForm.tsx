"use client";

import { useActionState } from "react";
import type { PostFormState } from "@/app/actions/posts";

interface PostFormProps {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  defaultValues?: { title: string; body: string };
  submitLabel: string;
}

const initialState: PostFormState = { status: "idle" };

export function PostForm({ action, defaultValues, submitLabel }: PostFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <label
          htmlFor="title"
          className="block font-mono text-xs uppercase tracking-widest text-muted mb-2"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={defaultValues?.title}
          placeholder="Give it a headline"
          className="w-full bg-transparent border-b border-border py-3 font-display text-2xl placeholder:text-muted/50 focus:border-accent outline-none transition-colors"
        />
        {state.fieldErrors?.title && (
          <p className="text-danger text-sm mt-2">{state.fieldErrors.title[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="body"
          className="block font-mono text-xs uppercase tracking-widest text-muted mb-2"
        >
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={10}
          defaultValue={defaultValues?.body}
          placeholder="Write the entry…"
          className="w-full bg-bg-elevated border border-border rounded-sm p-4 leading-relaxed placeholder:text-muted/50 focus:border-accent outline-none transition-colors resize-y"
        />
        {state.fieldErrors?.body && (
          <p className="text-danger text-sm mt-2">{state.fieldErrors.body[0]}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-danger text-sm">{state.message}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-accent text-bg font-medium px-6 py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
