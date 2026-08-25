import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.filter((post) => post.status === "published").map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post || post.status !== "published") notFound();
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav className="site-nav">
          <Link href="/archive">Archive</Link>
          <Link href="/">Home</Link>
        </nav>
      </header>
      <article className="article-page">
        <p className="eyebrow">
          {post.category} / {post.date}
        </p>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.excerpt}</p>
        <div className={`article-art ${post.accent}`} aria-hidden="true">
          {post.accent === "ochre" ? "FN" : post.accent === "moss" ? "∿" : "✳"}
        </div>
        <div className="article-body">
          {post.body.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="text-link" href="/archive">
          Back to archive <span>↗</span>
        </Link>
      </article>
    </main>
  );
}
