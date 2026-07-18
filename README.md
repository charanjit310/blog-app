# Field Notes — a full-stack Next.js blog (CRUD demo)

A small blog with full Create / Read / Update / Delete, built on the Next.js
App Router. Data is sourced from [JSONPlaceholder](https://jsonplaceholder.typicode.com),
proxied through this app's own API layer.

Stack: **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** ·
**Tailwind CSS 4** · **Zod**

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required —
`POSTS_API_BASE_URL` defaults to JSONPlaceholder (see `.env.local.example`
if you want to point it elsewhere later).

## Why it's built this way

This is meant to double as a short tour of App Router patterns, not just a
working demo. The things worth pointing out in a walkthrough:

### 1. One data-access layer, three consumers
`src/lib/posts.ts` is the only file that knows about JSONPlaceholder. It's
marked `import "server-only"` so it fails the build if a Client Component
ever imports it by mistake. Three things call it:

- **Server Components** (`app/posts/page.tsx`, `app/posts/[id]/page.tsx`)
  call it directly — no HTTP round trip to our own API needed, since they
  already run on the server.
- **Route Handlers** (`app/api/posts/route.ts`, `app/api/posts/[id]/route.ts`)
  wrap it in a REST-shaped API (`GET/POST /api/posts`, `GET/PUT/DELETE
  /api/posts/:id`) — this is the piece you'd point an external client or
  mobile app at.
- **Server Actions** (`app/actions/posts.ts`) wrap it for form mutations.

If this ever moves off JSONPlaceholder onto a real database, `lib/posts.ts`
is the only file that changes.

### 2. Server Actions + `useActionState`, not client-side fetch, for forms
`components/PostForm.tsx` submits via a Server Action bound to the
`<form action={...}>` prop. That means the create/edit flow works even
before client JS hydrates — `useActionState` just layers pending state and
field-level validation errors on top. Validation runs through the same Zod
schema on both the client (`postSchema`) and inside the action, so the
server never trusts client input.

### 3. Reads are cached and tagged; writes invalidate precisely
Every read in `lib/posts.ts` is tagged (`posts`, `post-<id>`). Mutations
invalidate only the tags they affect, not the whole cache. Two APIs are
used deliberately:

- `updateTag()` in Server Actions, for **immediate** read-your-writes —
  when you publish a post and get redirected to it, you see it right away.
- `revalidateTag(tag, "max")` in Route Handlers, for **eventual**
  stale-while-revalidate — appropriate for a REST endpoint an external
  caller might hit.

(This is a Next.js 16 change — `revalidateTag` now requires that second
argument. Worth flagging in review since it's a recent breaking change.)

### 4. Route-level rendering is explicit, not accidental
`/` and `/posts` are marked `export const dynamic = "force-dynamic"` on
purpose: they render on request rather than being prerendered at build
time. Individual `fetch()` calls still get cached via the Data Cache
(`revalidate: 60`), so this isn't "no caching" — it just means the first
fetch happens per-request instead of at `next build`, which keeps the build
resilient if the upstream API is briefly unreachable during CI.

### 5. UX states aren't an afterthought
Every route that fetches data has a matching `loading.tsx` (skeleton, not a
spinner) and the `/posts` segment has an `error.tsx` boundary with retry.
`app/posts/[id]/not-found.tsx` handles a deleted/missing post distinctly
from a generic 404.

### 6. A note on "full CRUD" against a mock API
JSONPlaceholder simulates POST/PUT/DELETE responses (new IDs, echoed
bodies) but doesn't actually persist writes server-side — that's a known
property of the mock API, not a bug here. Cache tags are invalidated on
every mutation so the app behaves correctly within a session; a page
refresh after a while will show JSONPlaceholder's original 100 posts again,
since nothing was really saved upstream.

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── posts/
│   │   ├── page.tsx               # Archive (list) — Server Component
│   │   ├── loading.tsx / error.tsx
│   │   ├── new/page.tsx           # Create form
│   │   └── [id]/
│   │       ├── page.tsx           # Post detail — Server Component
│   │       ├── loading.tsx / not-found.tsx
│   │       └── edit/page.tsx      # Edit form
│   ├── api/posts/route.ts         # REST: GET list, POST create
│   ├── api/posts/[id]/route.ts    # REST: GET/PUT/DELETE one
│   └── actions/posts.ts           # Server Actions for form mutations
├── components/
│   ├── PostForm.tsx                # Shared create/edit form (Client Component)
│   ├── PostListItem.tsx
│   └── DeleteButton.tsx
├── lib/
│   ├── posts.ts                    # Data access layer (server-only)
│   └── validation.ts                # Shared Zod schema
└── types/post.ts
```

## Testing the REST API directly

```bash
curl http://localhost:3000/api/posts
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"A new entry that is long enough","body":"Body text that clears the ten character minimum."}'
```
