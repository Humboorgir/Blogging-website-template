import Link from "next/link";
import { posts } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ArchivePage() {
  return (
    <main className="mx-auto max-w-[1240px] overflow-hidden px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav className="flex items-center gap-[30px] text-xs text-muted [&_a:hover]:text-foreground">
          <Link href="/">Home</Link>
          <span>Archive</span>
          <ThemeToggle />
        </nav>
      </header>
      <section className="py-[120px_0_150px] max-[700px]:py-[85px_0]">
        <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
          The notebook
        </p>
        <h1 className="m-0 mb-[90px] font-sans text-[clamp(52px,8vw,105px)] font-[650] leading-[0.88] tracking-[-0.085em]">
          Everything we have
          <br />
          <em className="not-italic text-muted">kept close.</em>
        </h1>
        <div className="border-t border-line">
          {posts
            .filter((post) => post.status === "published")
            .map((post) => (
              <Link
                className="group grid grid-cols-[1fr_3fr_30px] items-center gap-[25px] border-b border-line py-[25px] transition-[padding,color] duration-200 hover:pl-3 hover:text-accent max-[700px]:grid-cols-[1fr_25px]"
                href={`/posts/${post.slug}`}
                key={post.slug}>
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted max-[700px]:col-span-full">
                  {post.date}
                </span>
                <span>
                  <small className="block text-[10px] uppercase tracking-[0.1em] text-muted">
                    {post.category}
                  </small>
                  <strong className="mt-1 block font-sans text-[26px] font-normal tracking-[-0.03em] max-[700px]:text-[22px]">
                    {post.title}
                  </strong>
                </span>
                <span className="text-xl">↗</span>
              </Link>
            ))}
        </div>
      </section>
      <footer className="flex justify-between gap-5 border-t border-line py-[25px_0_35px] text-[10px] uppercase leading-[1.4] tracking-[0.1em] text-muted">
        <span>Field Notes / Demo publication</span>
        <span>Made for the long read</span>
      </footer>
    </main>
  );
}
