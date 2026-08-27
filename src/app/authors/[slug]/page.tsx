import { notFound } from "next/navigation";
import { Avatar, Footer, Header, PostCard } from "@/components/field-notes";
import { authors, authorForPost, getAuthor } from "@/lib/authors";
import { getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const author = getAuthor((await params).slug);
  if (!author) notFound();
  const posts = await getPosts();
  const written = posts.filter((post) => authorForPost(post).slug === author.slug);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col gap-7 border-b border-border pb-14 md:flex-row md:items-end">
          <Avatar author={author} large />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contributor</p>
            <h1 className="mt-3 font-serif text-6xl tracking-tight">{author.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {author.role} · {written.length} notes
            </p>
          </div>
        </div>
        <p className="max-w-2xl py-12 text-2xl leading-10 text-muted-foreground">{author.bio}</p>
        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-2">
          {written.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
