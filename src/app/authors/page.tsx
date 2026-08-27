import Link from "next/link";
import { Footer, Header } from "@/components/field-notes";
import { authors } from "@/lib/authors";
import { getPosts } from "@/lib/posts";

export default async function AuthorsPage() {
  const posts = await getPosts();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          The people behind the pages
        </p>
        <h1 className="mt-5 font-serif text-6xl tracking-tight">Authors</h1>
        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          {authors.map((author) => (
            <Link
              href={`/authors/${author.slug}`}
              key={author.slug}
              className="bg-background p-7 transition hover:bg-muted">
              <div className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
                {author.initials}
              </div>
              <h2 className="mt-8 font-serif text-2xl">{author.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{author.role}</p>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">{author.bio}</p>
              <p className="mt-8 font-mono text-xs text-muted-foreground">
                {
                  posts.filter((post) => post.slug.charCodeAt(0) % authors.length === authors.indexOf(author))
                    .length
                }{" "}
                notes
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
