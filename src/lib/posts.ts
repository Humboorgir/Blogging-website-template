export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  status: "published" | "draft";
  accent: "ochre" | "moss" | "rust";
  body: string;
};

export const posts: Post[] = [
  {
    slug: "the-quiet-power-of-a-well-made-tool",
    category: "Practice",
    title: "The quiet power of a well-made tool",
    excerpt:
      "Why the best digital tools disappear into the rhythm of the work, and what their makers understand about restraint.",
    date: "August 21, 2026",
    readTime: "6 min read",
    status: "published",
    accent: "ochre",
    body: "A good tool does not ask to be admired. It makes room for attention.\n\nThe most generous interfaces are often the quietest ones: a considered default, a shortcut that becomes muscle memory, a surface that does not insist on being seen.\n\nThis is a note about restraint, and about the patient craft of removing everything that stands between a person and the work they came to do.",
  },
  {
    slug: "a-slower-way-to-think-about-speed",
    category: "Field notes",
    title: "A slower way to think about speed",
    excerpt: "Notes from a week spent removing friction instead of adding features.",
    date: "August 14, 2026",
    readTime: "4 min read",
    status: "published",
    accent: "moss",
    body: "Speed is not a number on a benchmark. It is the feeling of being met by a system that understands what you mean.\n\nWe spent a week taking things away: one notification, two settings, a loading state that had become a habit. The result was not merely faster. It felt calmer.",
  },
  {
    slug: "interfaces-with-fingerprints",
    category: "Materials",
    title: "Interfaces with fingerprints",
    excerpt:
      "On the small irregularities that make a digital experience feel considered, human, and worth returning to.",
    date: "August 06, 2026",
    readTime: "8 min read",
    status: "published",
    accent: "rust",
    body: "Perfect surfaces can be strangely forgettable. The things we remember often carry evidence of a hand: a line that is slightly too long, a texture that refuses to flatten.\n\nDigital work can hold those marks too. Not as decoration, but as a record of judgment.",
  },
  {
    slug: "the-shape-of-a-draft",
    category: "Practice",
    title: "The shape of a draft",
    excerpt: "A private sample post for testing the publishing workflow.",
    date: "August 01, 2026",
    readTime: "3 min read",
    status: "draft",
    accent: "moss",
    body: "This unpublished note is included as a demo of the draft workflow. It will never appear on the public site until an admin publishes it.",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
