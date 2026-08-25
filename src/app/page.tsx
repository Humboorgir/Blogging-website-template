import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const posts = [
  {
    category: "Practice",
    title: "The quiet power of a well-made tool",
    excerpt:
      "Why the best digital tools disappear into the rhythm of the work, and what their makers understand about restraint.",
    date: "August 21, 2026",
    readTime: "6 min read",
    accent: "ochre",
  },
  {
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
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav aria-label="Primary navigation" className="site-nav">
          <Link href="#latest">Latest</Link>
          <Link href="/archive">Archive</Link>
          <ThemeToggle />
        </nav>
      </header>

      <section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow">A journal for making things well</p>
        <h1 id="intro-title">
          Ideas worth
          <br />
          <em>keeping close.</em>
        </h1>
        <div className="intro-note">
          <span className="rule" />
          <p>
            Thoughtful notes on technology, craft, and the work between the two. Written for curious people
            who care about how things come to be.
          </p>
        </div>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <div className="featured-art" aria-hidden="true">
          <span>FN</span>
          <i />
        </div>
        <div className="featured-copy">
          <p className="eyebrow">Featured / Practice</p>
          <h2 id="featured-title">The quiet power of a well-made tool</h2>
          <p className="lead">
            Why the best digital tools disappear into the rhythm of the work, and what their makers understand
            about restraint.
          </p>
          <div className="post-meta">
            <span>August 21, 2026</span>
            <span>6 min read</span>
          </div>
          <Link className="text-link" href="/posts/the-quiet-power-of-a-well-made-tool">
            Read the essay <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="latest" id="latest" aria-labelledby="latest-title">
        <div className="section-heading">
          <p className="eyebrow">The notebook</p>
          <h2 id="latest-title">Latest notes</h2>
          <Link href="/archive" className="text-link">
            View archive <span>↗</span>
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(1).map((post) => (
            <article className={`post-card ${post.accent}`} key={post.title}>
              <div className="post-mark" aria-hidden="true">
                {post.accent === "moss" ? "∿" : "✳"}
              </div>
              <p className="eyebrow">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>Field Notes / Demo publication</span>
        <span>Made for the long read</span>
      </footer>
    </main>
  );
}
