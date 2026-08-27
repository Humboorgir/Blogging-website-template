import Link from "next/link";
import { ArrowUpRight, FileText, PenLine, Users } from "lucide-react";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function AdminPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  const published = allPosts.filter((post) => post.status === "published");
  const drafts = allPosts.filter((post) => post.status === "draft");
  return (
    <main className="min-h-screen bg-admin-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-xl font-semibold">
            Field Notes<span className="text-primary">.</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/admin/editor">New article</Link>
            <Link href="/admin/team">Team</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Editorial desk
            </p>
            <h1 className="mt-3 font-serif text-5xl tracking-tight">Good morning.</h1>
          </div>
          <Link
            href="/admin/editor"
            className="flex items-center gap-2 bg-primary px-4 py-2 text-sm text-primary-foreground">
            Write a note <PenLine className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="border border-border bg-background p-6">
            <FileText className="size-5 text-muted-foreground" />
            <p className="mt-8 text-sm text-muted-foreground">Published</p>
            <p className="mt-1 font-serif text-4xl">{published.length}</p>
          </div>
          <div className="border border-border bg-background p-6">
            <PenLine className="size-5 text-muted-foreground" />
            <p className="mt-8 text-sm text-muted-foreground">Drafts</p>
            <p className="mt-1 font-serif text-4xl">{drafts.length}</p>
          </div>
          <div className="border border-border bg-background p-6">
            <Users className="size-5 text-muted-foreground" />
            <p className="mt-8 text-sm text-muted-foreground">Contributors</p>
            <p className="mt-1 font-serif text-4xl">1</p>
          </div>
        </div>
        <section className="mt-12 border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-serif text-2xl">Recent notes</h2>
            <span className="text-sm text-muted-foreground">{allPosts.length} total</span>
          </div>
          {allPosts.map((post) => (
            <Link
              href={`/admin/editor?slug=${post.slug}`}
              key={post.id}
              className="flex items-center gap-4 border-b border-border p-5 last:border-0">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{post.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.category} ·{" "}
                  {post.status === "draft"
                    ? "Draft"
                    : post.publishedAt?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                </p>
              </div>
              <span className="rounded-full bg-status-background px-3 py-1 text-xs">{post.status}</span>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
