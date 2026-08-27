export const authors = [
  { slug: 'mira-chen', name: 'Mira Chen', role: 'Systems designer', bio: 'Mira writes about the quiet mechanics behind useful products, teams, and tools.', initials: 'MC' },
  { slug: 'jonas-reed', name: 'Jonas Reed', role: 'Independent researcher', bio: 'Jonas explores the cultural edge of technology and the stories we tell about progress.', initials: 'JR' },
  { slug: 'leila-okafor', name: 'Leila Okafor', role: 'Editor-at-large', bio: 'Leila covers craft, attention, and the places where digital life meets the physical world.', initials: 'LO' },
]

export const posts = [
  { slug: 'the-shape-of-a-day', title: 'The shape of a day', excerpt: 'On designing a life around the kind of attention you want to keep.', category: 'Attention', date: 'Aug 18, 2026', author: authors[0], readTime: '8 min read', featured: true, color: 'bg-amber-100 dark:bg-amber-950/40' },
  { slug: 'a-field-guide-to-small-tools', title: 'A field guide to small tools', excerpt: 'The best tools do not announce themselves. They make room for the work.', category: 'Tools', date: 'Aug 12, 2026', author: authors[1], readTime: '6 min read', color: 'bg-sky-100 dark:bg-sky-950/40' },
  { slug: 'notes-on-making-room', title: 'Notes on making room', excerpt: 'What an empty desk, a good question, and a slower meeting can teach us.', category: 'Practice', date: 'Aug 04, 2026', author: authors[2], readTime: '5 min read', color: 'bg-rose-100 dark:bg-rose-950/40' },
  { slug: 'the-useful-unknown', title: 'The useful unknown', excerpt: 'A case for leaving some things unresolved long enough to become interesting.', category: 'Ideas', date: 'Jul 28, 2026', author: authors[0], readTime: '7 min read', color: 'bg-lime-100 dark:bg-lime-950/40' },
  { slug: 'how-we-keep-a-notebook', title: 'How we keep a notebook', excerpt: 'A shared practice for collecting fragments before they become thoughts.', category: 'Practice', date: 'Jul 19, 2026', author: authors[2], readTime: '4 min read', color: 'bg-violet-100 dark:bg-violet-950/40' },
]

export const categories = ['All', 'Attention', 'Tools', 'Practice', 'Ideas']

export const articleBody = [
  { type: 'p', text: 'There is a particular kind of morning that feels less like a beginning than a clearing. The world has not yet filled itself with requests. A cup sits warm beside the notebook. For a few minutes, attention belongs entirely to the person holding it.' },
  { type: 'h2', text: 'An architecture for attention' },
  { type: 'p', text: 'We tend to speak about attention as if it were a resource we spend. But it is also a place we inhabit. The shape of a day is, in part, the shape of the rooms we make for our minds to return to.' },
  { type: 'quote', text: 'A good day is not a day without interruption. It is a day with somewhere to return.' },
  { type: 'p', text: 'Small rituals create those rooms. They do not need to be precious or elaborate. A walk without a podcast. A list with three lines instead of thirty. The decision to finish one thing before opening the next.' },
  { type: 'h2', text: 'The edges matter' },
  { type: 'p', text: 'The beginning and end of a workday are not administrative details; they are thresholds. When we make them visible, the day gains a contour. We can tell where we are, and that makes it easier to choose where to go next.' },
  { type: 'p', text: 'This is less about discipline than generosity. We are giving tomorrow a cleaner starting point. We are leaving a light on.' },
]

export function getPost(slug: string) { return posts.find((post) => post.slug === slug) ?? posts[0] }
export function getAuthor(slug: string) { return authors.find((author) => author.slug === slug) ?? authors[0] }
