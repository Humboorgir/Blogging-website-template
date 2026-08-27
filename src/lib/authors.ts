export const authors = [
  {
    slug: "mira-chen",
    name: "Mira Chen",
    role: "Systems designer",
    bio: "Mira writes about the quiet mechanics behind useful products, teams, and tools.",
    initials: "MC",
  },
  {
    slug: "jonas-reed",
    name: "Jonas Reed",
    role: "Independent researcher",
    bio: "Jonas explores the cultural edge of technology and the stories we tell about progress.",
    initials: "JR",
  },
  {
    slug: "leila-okafor",
    name: "Leila Okafor",
    role: "Editor-at-large",
    bio: "Leila covers craft, attention, and the places where digital life meets the physical world.",
    initials: "LO",
  },
] as const;

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug);
}

export function authorForPost(post: { slug: string }) {
  const index = [...post.slug].reduce((sum, character) => sum + character.charCodeAt(0), 0) % authors.length;
  return authors[index];
}
