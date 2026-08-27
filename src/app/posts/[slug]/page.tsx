import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { CopyLinkButton, Avatar, Footer, Header, Meta, PostCard } from "@/components/field-notes";
import { authorForPost } from "@/lib/authors";
import { getPost, getPostAccent, getPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const accent = getPostAccent(post.slug);
  const allPosts = await getPosts();
  const related = allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const author = authorForPost(post);
  return (
    <>
      <Header />
      <div className="fixed left-0 top-0 h-1 w-2/5 bg-primary" />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <Link
          href="/archive"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to archive
        </Link>
        <article className="mx-auto mt-16 max-w-3xl">
          <Meta post={post} />
          <h1 className="mt-6 font-serif text-5xl leading-[.98] tracking-tight md:text-7xl">{post.title}</h1>
          <p className="mt-7 text-xl leading-8 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 border-y border-border py-5">
            <Avatar author={author} />
            <div className="text-sm">
              <div>{author.name}</div>
              <div className="text-muted-foreground">
                {post.publishedAt?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {post.readingMinutes} min read
              </div>
            </div>
            <div className="ml-auto">
              <CopyLinkButton />
            </div>
          </div>
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt=""
              className="mt-12 aspect-[2/1] w-full rounded-sm object-cover"
            />
          ) : (
            <div
              className={`mt-12 aspect-[2/1] rounded-sm ${accent === "ochre" ? "bg-amber-100 dark:bg-amber-950/40" : accent === "moss" ? "bg-sky-100 dark:bg-sky-950/40" : "bg-rose-100 dark:bg-rose-950/40"}`}
            />
          )}
          <div className="prose prose-neutral dark:prose-invert mt-14 max-w-none font-serif text-lg leading-8">
            {post.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <section className="mx-auto mt-24 max-w-6xl border-t border-border pt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Keep reading</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
