import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

export default async function AdminPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  const published = allPosts.filter((post) => post.status === "published");
  const drafts = allPosts.filter((post) => post.status === "draft");
  return (
    <main className="admin-frame">
      <header className="admin-header">
        <Link href="/" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav className="site-nav">
          <span>Admin workspace</span>
          <Link href="/admin/login">Sign out</Link>
        </nav>
      </header>
      <section className="admin-dashboard">
        <div className="admin-title">
          <div>
            <p className="eyebrow">Private workspace</p>
            <h1>Good morning.</h1>
          </div>
          <Link href="/admin/editor" className="admin-button">
            New note <span>+</span>
          </Link>
        </div>
        <div className="admin-stats">
          <div>
            <strong>{published.length}</strong>
            <span>Published notes</span>
          </div>
          <div>
            <strong>{drafts.length}</strong>
            <span>Draft in progress</span>
          </div>
          <div>
            <strong>—</strong>
            <span>Readers this month</span>
          </div>
        </div>
        <div className="admin-section-heading">
          <h2>Your notes</h2>
          <span>{published.length + drafts.length} total</span>
        </div>
        <div className="admin-table">
          {allPosts.map((post) => (
            <div className="admin-row" key={post.slug}>
              <div>
                <span className={`status-dot ${post.status}`} />
                {post.title}
              </div>
              <span>
                {post.status === "draft"
                  ? "Draft"
                  : post.publishedAt?.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
              </span>
              <Link href={`/admin/editor?slug=${post.slug}`}>Edit ↗</Link>
            </div>
          ))}
        </div>
        <div className="admin-section-heading">
          <h2>Team access</h2>
          <Link href="/admin/team">Manage admins ↗</Link>
        </div>
      </section>
    </main>
  );
}
