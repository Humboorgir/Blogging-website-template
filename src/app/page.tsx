import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const posts = [
  {
    slug: "a-slower-way-to-think-about-speed",
    category: "Practice",
    title: "The quiet power of a well-made tool",
    excerpt:
      "Why the best digital tools disappear into the rhythm of the work, and what their makers understand about restraint.",
    date: "August 21, 2026",
    readTime: "6 min read",
    accent: "ochre",
  },
  {
    slug: "interfaces-with-fingerprints",
    category: "Field notes",
    title: "A slower way to think about speed",
    excerpt: "Notes from a week spent removing friction instead of adding features.",
    date: "August 14, 2026",
    readTime: "4 min read",
    accent: "moss",
  },
  {
    category: "Materials",
    title: "Interfaces with fingerprints",
    excerpt:
      "On the small irregularities that make a digital experience feel considered, human, and worth returning to.",
    date: "August 06, 2026",
    readTime: "8 min read",
    accent: "rust",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-[1240px] overflow-hidden px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-[30px] text-xs text-muted [&_a]:transition-colors [&_a:hover]:text-foreground">
          <Link href="#latest">Latest</Link>
          <Link href="/archive">Archive</Link>
          <ThemeToggle />
        </nav>
      </header>

      <section
        className="grid min-h-[620px] grid-cols-[1fr_1.1fr] gap-8 px-0 pt-[150px] pb-[110px] max-[700px]:block max-[700px]:pt-[85px] max-[700px]:pb-[75px]"
        aria-labelledby="intro-title">
        <div>
          <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
            A journal for making things well
          </p>
          <h1
            id="intro-title"
            className="m-0 max-w-[780px] font-sans text-[clamp(60px,8.8vw,126px)] font-[650] leading-[0.86] tracking-[-0.085em]">
            Ideas worth
            <br />
            <em className="not-italic text-muted">keeping close.</em>
          </h1>
        </div>
        <div className="mb-[4vw] ml-auto flex max-w-[300px] items-start gap-[18px] self-end max-[700px]:mt-[50px] max-[700px]:mb-0 max-[700px]:ml-0">
          <span className="mt-2 block h-px basis-[34px] bg-accent" />
          <p className="m-0 text-[13px] leading-[1.55] text-muted">
            Thoughtful notes on technology, craft, and the work between the two. Written for curious people
            who care about how things come to be.
          </p>
        </div>
      </section>

      <section
        className="mt-8 grid min-h-[470px] grid-cols-[1.15fr_1fr] bg-foreground text-background shadow-[0_25px_90px_rgba(0,112,243,0.13)] max-[700px]:block"
        aria-labelledby="featured-title">
        <div
          className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#4e5b4d] font-editorial text-[clamp(100px,16vw,230px)] text-[#e7e6dc] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(0,112,243,0.75),transparent_65%)]"
          aria-hidden="true">
          <span className="relative z-[1] mr-[0.18em] tracking-[-0.18em]">FN</span>
          <i className="absolute h-[62%] w-1/2 rounded-full border border-[rgba(231,230,220,0.4)]" />
        </div>
        <div className="flex min-h-[390px] flex-col justify-center px-[clamp(30px,6vw,90px)] py-[45px]">
          <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-[#3291ff]">
            Featured / Practice
          </p>
          <h2
            id="featured-title"
            className="m-0 mb-[22px] max-w-[600px] font-sans text-[clamp(35px,4vw,57px)] font-semibold leading-[0.96] tracking-[-0.07em]">
            The quiet power of a well-made tool
          </h2>
          <p className="mb-0 max-w-[390px] text-[15px] leading-[1.55] text-muted">
            Why the best digital tools disappear into the rhythm of the work, and what their makers understand
            about restraint.
          </p>
          <div className="mt-auto flex gap-[18px] border-t border-line pt-[15px] text-[10px] uppercase tracking-[0.08em] text-muted">
            <span>August 21, 2026</span>
            <span>6 min read</span>
          </div>
          <Link
            className="mt-8 inline-flex w-fit gap-2.5 border-b border-background pb-1 text-xs"
            href="/posts/the-quiet-power-of-a-well-made-tool">
            Read the essay <span className="text-base leading-[10px] text-accent">↗</span>
          </Link>
        </div>
      </section>

      <section
        className="py-[110px_0_95px] max-[700px]:py-[85px_0]"
        id="latest"
        aria-labelledby="latest-title">
        <div className="grid grid-cols-[1fr_2fr_1fr] items-end border-b border-line pb-[18px] max-[700px]:block">
          <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
            The notebook
          </p>
          <h2
            id="latest-title"
            className="m-0 font-editorial text-[44px] font-normal tracking-[-0.04em] max-[700px]:mb-5">
            Latest notes
          </h2>
          <Link
            href="/archive"
            className="ml-auto inline-flex w-fit gap-2.5 border-b border-foreground pb-1 text-xs max-[700px]:ml-0">
            View archive <span className="text-base leading-[10px] text-accent">↗</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[22px] pt-[30px] max-[700px]:block">
          {posts.slice(1).map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              className={`group flex min-h-[320px] flex-col border-t-4 ${post.accent === "rust" ? "border-accent" : "border-moss"} px-[30px] pb-[25px] pt-7 transition-transform hover:-translate-y-1 max-[700px]:min-h-[280px]`}
              key={post.title}>
              <div
                className={`mb-[25px] font-editorial text-[38px] ${post.accent === "rust" ? "text-accent" : "text-moss"}`}
                aria-hidden="true">
                {post.accent === "moss" ? "∿" : "✳"}
              </div>
              <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                {post.category}
              </p>
              <h3 className="m-0 mb-[15px] max-w-[400px] font-sans text-[34px] font-semibold leading-none tracking-[-0.065em]">
                {post.title}
              </h3>
              <p className="m-0 max-w-[400px] text-sm leading-[1.55] text-muted">{post.excerpt}</p>
              <div className="mt-auto flex gap-[18px] border-t border-line pt-[15px] text-[10px] uppercase tracking-[0.08em] text-muted">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
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
