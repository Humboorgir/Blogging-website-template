import "dotenv/config";
import { auth } from "../src/lib/auth";
import { db } from "../src/db";
import { posts, user } from "../src/db/schema";
import { posts as samplePosts } from "../src/lib/posts";
import { eq } from "drizzle-orm";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
const existingAdmin = await db.query.user.findFirst({ where: eq(user.email, email) });
if (existingAdmin) await db.delete(user).where(eq(user.id, existingAdmin.id));
await auth.api.signUpEmail({ body: { name: "Publication admin", email, password } });
await db
  .insert(posts)
  .values(
    samplePosts.map((post) => ({
      slug: post.slug,
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      status: post.status,
      tags: [post.category.toLowerCase()],
      readingMinutes: Number.parseInt(post.readTime, 10),
      publishedAt: post.status === "published" ? new Date(post.date) : null,
      createdAt: new Date(post.date),
      updatedAt: new Date(post.date),
    })),
  )
  .onConflictDoNothing({ target: posts.slug });
console.log(`Seeded ${samplePosts.length} demo posts and ${email}.`);
