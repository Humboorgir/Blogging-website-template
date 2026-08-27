import { ArchiveBrowser } from "@/components/archive-browser";
import { Footer, Header } from "@/components/field-notes";
import { getPosts } from "@/lib/posts";

export default async function ArchivePage() {
  const posts = await getPosts();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The library</p>
        <h1 className="mt-5 font-serif text-6xl tracking-tight">Archive</h1>
        <p className="mt-5 max-w-xl text-lg leading-7 text-muted-foreground">
          Dispatches on attention, tools, practice, and the useful unknown.
        </p>
        <ArchiveBrowser posts={posts} />
      </main>
      <Footer />
    </>
  );
}
