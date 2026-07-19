import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: {
    default: "Field Notes — a Next.js blog",
    template: "%s — Field Notes",
  },
  description:
    "A full-stack CRUD blog built with Next.js App Router, Route Handlers, and Server Actions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-ink hover:text-accent transition-colors"
            >
              Field Notes
            </Link>
            <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
              <Link href="/posts" className="hover:text-accent transition-colors">
                Archive
              </Link>
              <Link
                href="/posts/new"
                className="hover:text-accent transition-colors"
              >
                New Entry
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-6 font-mono text-xs text-muted flex items-center justify-between">
            <span>Next.js App Router · Route Handlers · Server Actions</span>
            <span>Data via JSONPlaceholder</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
