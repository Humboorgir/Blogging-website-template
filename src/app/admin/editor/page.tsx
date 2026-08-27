import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import EditorForm from "@/app/admin/editor/editor-form";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";

type EditorPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function EditorPage({ searchParams }: EditorPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const { slug } = await searchParams;
  const categoriesPromise = db
    .selectDistinct({ category: posts.category })
    .from(posts)
    .orderBy(posts.category);
  const postPromise = slug
    ? db.query.posts.findFirst({ where: eq(posts.slug, slug) })
    : Promise.resolve(undefined);
  const [categoryRows, post] = await Promise.all([categoriesPromise, postPromise]);

  return (
    <EditorForm
      categories={categoryRows.map(({ category }) => category)}
      post={
        post
          ? {
              id: post.id,
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              category: post.category,
              coverImageUrl: post.coverImageUrl,
              tags: post.tags,
              body: post.body,
              status: post.status,
            }
          : undefined
      }
    />
  );
}
