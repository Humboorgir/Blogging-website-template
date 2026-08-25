import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";

type PostInput = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  coverImageUrl?: string;
  tags?: string;
  body?: string;
  status?: "draft" | "published";
};

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (request.nextUrl.searchParams.get("categories") === "true") {
    const categories = await db.selectDistinct({ category: posts.category }).from(posts).orderBy(posts.category);
    return NextResponse.json(categories.map(({ category }) => category));
  }
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "A slug is required." }, { status: 400 });
  const post = await db.query.posts.findFirst({ where: eq(posts.slug, slug) });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json(post);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const input = (await request.json()) as PostInput;
  const title = input.title?.trim();
  const slug = input.slug?.trim();
  const excerpt = input.excerpt?.trim();
  const body = input.body?.trim();
  if (!title || !slug || !excerpt || !body) {
    return NextResponse.json({ error: "Title, slug, excerpt, and body are required." }, { status: 400 });
  }

  const status: "draft" | "published" = input.status === "published" ? "published" : "draft";
  const now = new Date();
  const values = {
    slug,
    title,
    excerpt,
    body,
    category: input.category?.trim() || "Notes",
    coverImageUrl: input.coverImageUrl?.trim() || null,
    tags:
      input.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],
    status,
    publishedAt: status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
    readingMinutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 200)),
  };

  try {
    if (input.id) {
      const [updated] = await db
        .update(posts)
        .set({ ...values })
        .where(eq(posts.id, input.id))
        .returning({ id: posts.id, slug: posts.slug });
      if (!updated) return NextResponse.json({ error: "Post not found." }, { status: 404 });
      return NextResponse.json(updated);
    }
    const [created] = await db.insert(posts).values(values).returning({ id: posts.id, slug: posts.slug });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("posts_slug_unique"))
      return NextResponse.json({ error: "That slug is already in use." }, { status: 409 });
    return NextResponse.json({ error: "Unable to save the post." }, { status: 500 });
  }
}
