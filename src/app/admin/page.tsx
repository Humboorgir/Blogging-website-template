import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function AdminPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  const published = allPosts.filter((post) => post.status === "published");
  const drafts = allPosts.filter((post) => post.status === "draft");
  return (
    <main className="mx-auto min-h-screen max-w-[1240px] px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav className="flex items-center gap-[30px] text-xs text-muted">
          <span>Admin workspace</span>
          <Link href="/admin/login">Sign out</Link>
          <ThemeToggle />
        </nav>
      </header>
      <section className="py-[90px_0_120px] max-[700px]:py-[70px_0]">
        <div className="flex items-end justify-between gap-7 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Private workspace
            </p>
            <h1 className="m-0 font-sans text-[clamp(48px,7vw,82px)] font-[650] leading-[0.9] tracking-[-0.085em]">
              Good morning.
            </h1>
          </div>
          <Link
            href="/admin/editor"
            className="inline-flex gap-4 border border-foreground bg-foreground px-[18px] py-3.5 text-[11px] uppercase tracking-[0.08em] text-background hover:border-accent hover:bg-accent">
            New note <span>+</span>
          </Link>
        </div>
        <div className="my-[75px] grid grid-cols-3 border-y border-line py-6 max-[700px]:my-[55px]">
          <div>
            <strong className="font-editorial text-[42px] font-normal max-[700px]:text-[30px]">
              {published.length}
            </strong>
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted max-[700px]:text-[9px]">
              Published notes
            </span>
          </div>
          <div>
            <strong className="font-editorial text-[42px] font-normal max-[700px]:text-[30px]">
              {drafts.length}
            </strong>
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted max-[700px]:text-[9px]">
              Draft in progress
            </span>
          </div>
          <div>
            <strong className="font-editorial text-[42px] font-normal max-[700px]:text-[30px]">—</strong>
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted max-[700px]:text-[9px]">
              Readers this month
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-[15px]">
          <h2 className="m-0 font-editorial text-[28px] font-normal">Your notes</h2>
          <span className="text-[10px] uppercase tracking-[0.1em] text-muted">
            {published.length + drafts.length} total
          </span>
        </div>
        <div className="mb-[85px]">
          {allPosts.map((post) => (
            <div
              className="grid grid-cols-[2fr_1fr_50px] items-center gap-5 border-b border-line py-5 text-sm max-[700px]:grid-cols-[1fr_45px]"
              key={post.slug}>
              <div>
                <span
                  className={`mr-2 inline-block size-[7px] rounded-full ${post.status === "draft" ? "bg-accent" : "bg-moss"}`}
                />
                {post.title}
              </div>
              <span className="text-[11px] text-muted max-[700px]:col-start-1 max-[700px]:row-start-2">
                {post.status === "draft"
                  ? "Draft"
                  : post.publishedAt?.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
              </span>
              <Link
                className="text-[11px] text-accent max-[700px]:col-start-2 max-[700px]:row-span-2"
                href={`/admin/editor?slug=${post.slug}`}>
                Edit ↗
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-b border-line pb-[15px]">
          <h2 className="m-0 font-editorial text-[28px] font-normal">Team access</h2>
          <Link className="text-[11px] text-accent" href="/admin/team">
            Manage admins ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
