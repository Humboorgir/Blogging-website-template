import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";

export function generateStaticParams() {
  return posts.filter((post) => post.status === "published").map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post || post.status !== "published") notFound();
  return (
    <main className="mx-auto max-w-[1240px] overflow-hidden px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav className="flex items-center gap-[30px] text-xs text-muted [&_a:hover]:text-foreground">
          <Link href="/archive">Archive</Link>
          <Link href="/">Home</Link>
          <ThemeToggle />
        </nav>
      </header>
      <article className="max-w-[900px] py-[115px_0_120px] max-[700px]:py-[80px_0]">
        <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
          {post.category} / {post.date}
        </p>
        <h1 className="m-0 mb-[30px] max-w-[850px] font-sans text-[clamp(52px,8vw,105px)] font-[650] leading-[0.88] tracking-[-0.085em]">
          {post.title}
        </h1>
        <p className="max-w-[510px] text-lg leading-[1.5] text-muted">{post.excerpt}</p>
        <div
          className={`my-[85px] flex min-h-[420px] items-center justify-center font-editorial text-[clamp(100px,18vw,230px)] max-[700px]:my-[60px] max-[700px]:min-h-[270px] ${post.accent === "ochre" ? "bg-accent text-white" : post.accent === "moss" ? "bg-[#111] text-[#3291ff]" : "bg-[#eaeaea] text-[#111]"}`}
          aria-hidden="true">
          {post.accent === "ochre" ? "FN" : post.accent === "moss" ? "∿" : "✳"}
        </div>
        <div className="max-w-[650px] font-sans text-[21px] leading-[1.65] max-[700px]:text-lg">
          {post.body.split("\n\n").map((paragraph) => (
            <p className="mb-7" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <Link
          className="mt-8 inline-flex w-fit gap-2.5 border-b border-foreground pb-1 text-xs"
          href="/archive">
          Back to archive <span className="text-base leading-[10px] text-accent">↗</span>
        </Link>
      </article>
    </main>
  );
}
