import Link from "next/link";
import { posts } from "@/lib/posts";

export default function ArchivePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <span>Archive</span>
        </nav>
      </header>
      <section className="archive-page">
        <p className="eyebrow">The notebook</p>
        <h1>
          Everything we have
          <br />
          <em>kept close.</em>
        </h1>
        <div className="archive-list">
          {posts
            .filter((post) => post.status === "published")
            .map((post) => (
              <Link className="archive-row" href={`/posts/${post.slug}`} key={post.slug}>
                <span className="archive-date">{post.date}</span>
                <span>
                  <small>{post.category}</small>
                  <strong>{post.title}</strong>
                </span>
                <span className="archive-arrow">↗</span>
              </Link>
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
