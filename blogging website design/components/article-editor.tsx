'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, Bold, Eye, Italic, Link2, MoreHorizontal, Save, Trash2, Type } from 'lucide-react'
import { authors, getPost, posts } from '@/lib/field-notes'

type Post = (typeof posts)[number]

type EditorValues = {
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  status: 'Draft' | 'Published'
  readTime: string
  body: string
}

function initialValues(post?: Post): EditorValues {
  return {
    title: post?.title ?? '', slug: post?.slug ?? '', excerpt: post?.excerpt ?? '',
    category: post?.category ?? 'Attention', author: post?.author.name ?? authors[0].name,
    status: post?.featured ? 'Published' : 'Draft', readTime: post?.readTime ?? '5 min read',
    body: post ? `# ${post.title}\n\n${post.excerpt}\n\n## An architecture for attention\n\nThere is a particular kind of morning that feels less like a beginning than a clearing. The world has not yet filled itself with requests. A cup sits warm beside the notebook. For a few minutes, attention belongs entirely to the person holding it.\n\n> A good day is not a day without interruption. It is a day with somewhere to return.\n\nSmall rituals create those rooms. They do not need to be precious or elaborate. A walk without a podcast. A list with three lines instead of thirty.` : '# A new field note\n\nStart writing your idea here. Use Markdown to shape the story.'
  }
}

function renderMarkdown(markdown: string) {
  return markdown.split('\n').map((line, index) => {
    const key = `${line}-${index}`
    if (line.startsWith('### ')) return <h3 key={key} className="mt-8 font-serif text-2xl">{line.slice(4)}</h3>
    if (line.startsWith('## ')) return <h2 key={key} className="mt-10 font-serif text-3xl">{line.slice(3)}</h2>
    if (line.startsWith('# ')) return <h1 key={key} className="font-serif text-4xl tracking-tight md:text-5xl">{line.slice(2)}</h1>
    if (line.startsWith('> ')) return <blockquote key={key} className="my-8 border-l-2 border-primary pl-5 font-serif text-2xl italic leading-relaxed text-muted-foreground">{line.slice(2)}</blockquote>
    if (line.startsWith('- ')) return <li key={key} className="ml-5 list-disc leading-7">{line.slice(2)}</li>
    if (line.trim() === '') return <div key={key} className="h-4" />
    return <p key={key} className="leading-8 text-muted-foreground">{line}</p>
  })
}

export function ArticleEditor({ post }: { post?: Post }) {
  const [values, setValues] = useState(() => initialValues(post))
  const [preview, setPreview] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('left')
  const [saved, setSaved] = useState(post ? 'Saved just now' : 'Unsaved changes')
  const [deleted, setDeleted] = useState(false)
  const update = (key: keyof EditorValues, value: string) => setValues((current) => ({ ...current, [key]: value }))
  const previewContent = useMemo(() => renderMarkdown(values.body), [values.body])

  if (deleted) return <main className="grid min-h-screen place-items-center bg-muted/30 px-5"><div className="max-w-md border border-border bg-background p-8 text-center"><Trash2 className="mx-auto size-6 text-muted-foreground" /><h1 className="mt-5 font-serif text-3xl">Article deleted</h1><p className="mt-3 text-muted-foreground">The demo article has been removed from your editorial desk.</p><Link href="/admin" className="mt-7 inline-flex bg-primary px-4 py-2 text-sm text-primary-foreground">Return to desk</Link></div></main>

  return <main className="min-h-screen bg-muted/30">
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-6"><Link href="/admin" className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" /> Desk</Link><div className="flex items-center gap-2 md:gap-3"><span className="hidden text-xs text-muted-foreground sm:inline">{saved}</span><button onClick={() => setSaved('Saved just now')} className="flex items-center gap-2 border border-border px-3 py-2 text-sm transition hover:bg-muted"><Save className="size-4" /> Save</button><button onClick={() => { update('status', 'Published'); setSaved('Published just now') }} className="bg-primary px-3 py-2 text-sm text-primary-foreground transition hover:opacity-90">Publish</button></div></header>
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12"><div className="mb-8"><p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{post ? 'Edit article' : 'New article'}</p><h1 className="mt-3 font-serif text-4xl tracking-tight md:text-6xl">{post ? 'Shape the story.' : 'Make a new note.'}</h1></div><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"><section className="border border-border bg-background p-5 shadow-sm md:p-8"><div className="mb-6 flex items-center justify-between border-b border-border pb-3"><div className="flex items-center gap-1"><button aria-label="Bold" className="rounded p-2 hover:bg-muted"><Bold className="size-4" /></button><button aria-label="Italic" className="rounded p-2 hover:bg-muted"><Italic className="size-4" /></button><button aria-label="Add link" className="rounded p-2 hover:bg-muted"><Link2 className="size-4" /></button><button aria-label="Text style" className="rounded p-2 hover:bg-muted"><Type className="size-4" /></button></div><div className="flex border border-border p-1 text-xs"><button onClick={() => { setTransitionDirection('right'); setPreview(false) }} className={`px-3 py-1.5 transition ${!preview ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>Edit</button><button onClick={() => { setTransitionDirection('left'); setPreview(true) }} className={`flex items-center gap-1 px-3 py-1.5 transition ${preview ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}><Eye className="size-3" /> Preview</button></div></div><div className="relative min-h-[600px] overflow-hidden">
  {preview ? (
    <article key="preview" className={`animate-editor-${transitionDirection} min-h-[600px] max-w-2xl origin-top font-serif text-lg will-change-transform`}>{previewContent}</article>
  ) : (
    <textarea key="editor" aria-label="Markdown content" autoFocus value={values.body} onChange={(event) => update('body', event.target.value)} className={`animate-editor-${transitionDirection} min-h-[600px] w-full origin-top resize-y bg-transparent font-mono text-sm leading-7 outline-none placeholder:text-muted-foreground will-change-transform`} placeholder="Write in Markdown..." />
  )}
</div></section><aside className="flex flex-col gap-5"><div className="border border-border bg-background p-5"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-xl">Details</h2><MoreHorizontal className="size-4 text-muted-foreground" /></div><label className="flex flex-col gap-2 text-xs text-muted-foreground">Title<input value={values.title} onChange={(e) => update('title', e.target.value)} className="border-b border-border bg-transparent py-2 text-sm text-foreground outline-none focus:border-primary" /></label><label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">Slug<input value={values.slug} onChange={(e) => update('slug', e.target.value)} className="border-b border-border bg-transparent py-2 font-mono text-xs text-foreground outline-none focus:border-primary" /></label><label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">Excerpt<textarea value={values.excerpt} onChange={(e) => update('excerpt', e.target.value)} className="min-h-20 resize-none border-b border-border bg-transparent py-2 text-sm leading-6 text-foreground outline-none focus:border-primary" /></label><div className="mt-5 grid grid-cols-2 gap-3"><label className="flex flex-col gap-2 text-xs text-muted-foreground">Category<select value={values.category} onChange={(e) => update('category', e.target.value)} className="border border-border bg-background p-2 text-sm text-foreground outline-none"><option>Attention</option><option>Tools</option><option>Practice</option><option>Ideas</option></select></label><label className="flex flex-col gap-2 text-xs text-muted-foreground">Status<select value={values.status} onChange={(e) => update('status', e.target.value as EditorValues['status'])} className="border border-border bg-background p-2 text-sm text-foreground outline-none"><option>Draft</option><option>Published</option></select></label></div><label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">Author<select value={values.author} onChange={(e) => update('author', e.target.value)} className="border border-border bg-background p-2 text-sm text-foreground outline-none">{authors.map((author) => <option key={author.slug}>{author.name}</option>)}</select></label><label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">Reading time<input value={values.readTime} onChange={(e) => update('readTime', e.target.value)} className="border-b border-border bg-transparent py-2 text-sm text-foreground outline-none focus:border-primary" /></label></div>{post && <button onClick={() => setDeleted(true)} className="flex items-center justify-center gap-2 border border-destructive/40 bg-background px-4 py-3 text-sm text-destructive transition hover:bg-destructive/10"><Trash2 className="size-4" /> Delete article</button>}</aside></div></div>
  </main>
}

export { getPost }
