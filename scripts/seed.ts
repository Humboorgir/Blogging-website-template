import "dotenv/config";
import { auth } from "../src/lib/auth";
import { db } from "../src/db";
import { posts, user } from "../src/db/schema";
import { eq } from "drizzle-orm";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
const existingAdmin = await db.query.user.findFirst({ where: eq(user.email, email) });
if (existingAdmin) await db.delete(user).where(eq(user.id, existingAdmin.id));
await auth.api.signUpEmail({ body: { name: "Publication admin", email, password } });
const samplePosts = [
  {
    slug: "the-quiet-power-of-a-well-made-tool",
    category: "Practice",
    title: "The quiet power of a well-made tool",
    excerpt:
      "Why the best digital tools disappear into the rhythm of the work, and what their makers understand about restraint.",
    body: "A good tool does not ask to be admired. It makes room for attention.\n\nThe most generous interfaces are often the quietest ones: a considered default, a shortcut that becomes muscle memory, a surface that does not insist on being seen.\n\nThis is a note about restraint, and about the patient craft of removing everything that stands between a person and the work they came to do.",
    status: "published" as const,
    readingMinutes: 6,
    date: new Date("2026-08-21"),
  },
  {
    slug: "a-slower-way-to-think-about-speed",
    category: "Field notes",
    title: "A slower way to think about speed",
    excerpt: "Notes from a week spent removing friction instead of adding features.",
    body: "Speed is not a number on a benchmark. It is the feeling of being met by a system that understands what you mean.\n\nWe spent a week taking things away: one notification, two settings, a loading state that had become a habit. The result was not merely faster. It felt calmer.",
    status: "published" as const,
    readingMinutes: 4,
    date: new Date("2026-08-14"),
  },
  {
    slug: "interfaces-with-fingerprints",
    category: "Materials",
    title: "Interfaces with fingerprints",
    excerpt:
      "On the small irregularities that make a digital experience feel considered, human, and worth returning to.",
    body: "Perfect surfaces can be strangely forgettable. The things we remember often carry evidence of a hand: a line that is slightly too long, a texture that refuses to flatten.\n\nDigital work can hold those marks too. Not as decoration, but as a record of judgment.",
    status: "published" as const,
    readingMinutes: 8,
    date: new Date("2026-08-06"),
  },
  {
    slug: "the-shape-of-a-draft",
    category: "Practice",
    title: "The shape of a draft",
    excerpt: "A private sample post for testing the publishing workflow.",
    body: "This unpublished note is included as a demo of the draft workflow. It will never appear on the public site until an admin publishes it.",
    status: "draft" as const,
    readingMinutes: 3,
    date: new Date("2026-08-01"),
  },
];

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
      readingMinutes: post.readingMinutes,
      publishedAt: post.status === "published" ? post.date : null,
      createdAt: post.date,
      updatedAt: post.date,
    })),
  )
  .onConflictDoUpdate({
    target: posts.slug,
    set: {
      category: posts.category,
      title: posts.title,
      excerpt: posts.excerpt,
      body: posts.body,
      status: posts.status,
      tags: posts.tags,
      readingMinutes: posts.readingMinutes,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
    },
  });

console.log(`Seeded admin account and ${samplePosts.length} sample posts.`);
