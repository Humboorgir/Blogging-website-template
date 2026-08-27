import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

export type Post = typeof posts.$inferSelect;

export async function getPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));
}

export async function getPost(slug: string) {
  return db.query.posts.findFirst({
    where: (post, { and, eq }) => and(eq(post.slug, slug), eq(post.status, "published")),
  });
}

export function formatPostDate(date: Date | null) {
  return date ? date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) : "";
}

export function getPostAccent(value: number | string) {
  const index =
    typeof value === "number"
      ? value
      : [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return (["ochre", "moss", "rust"] as const)[index % 3];
}
