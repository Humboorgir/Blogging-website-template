import Link from 'next/link'
import { ArrowUpRight, FileText, PenLine, Users } from 'lucide-react'
import { posts } from '@/lib/field-notes'

export default function Admin() {
  const stats = [['Published', '24', FileText], ['Drafts', '03', PenLine], ['Contributors', '08', Users]] as const
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href="/" className="font-serif text-xl font-semibold">Field Notes<span className="text-primary">.</span></Link><nav className="flex gap-5 text-sm text-muted-foreground"><Link href="/admin/editor">New article</Link><Link href="/admin/team">Team</Link></nav></div></header>
      <div className="mx-auto max-w-7xl px-5 py-12"><div className="flex items-end justify-between"><div><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Editorial desk</p><h1 className="mt-3 font-serif text-5xl tracking-tight">Good morning, Mira.</h1></div><Link href="/admin/editor" className="flex items-center gap-2 bg-primary px-4 py-2 text-sm text-primary-foreground">Write a note <PenLine className="size-4" /></Link></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">{stats.map(([label, value, Icon]) => <div className="border border-border bg-background p-6" key={label}><Icon className="size-5 text-muted-foreground" /><p className="mt-8 text-sm text-muted-foreground">{label}</p><p className="mt-1 font-serif text-4xl">{value}</p></div>)}</div>
        <section className="mt-12 border border-border bg-background"><div className="flex items-center justify-between border-b border-border p-5"><h2 className="font-serif text-2xl">Recent notes</h2><span className="text-sm text-muted-foreground">Updated just now</span></div>{posts.slice(0, 4).map((post) => <Link href={`/admin/editor/${post.slug}`} key={post.slug} className="group flex items-center gap-4 border-b border-border p-5 transition-colors last:border-0 hover:bg-muted/50"><div className="min-w-0 flex-1"><p className="truncate font-medium group-hover:underline group-hover:underline-offset-4">{post.title}</p><p className="mt-1 text-xs text-muted-foreground">{post.category} · {post.date}</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs">Published</span><ArrowUpRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>)}</section>
      </div>
    </main>
  )
}
