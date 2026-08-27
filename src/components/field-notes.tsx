"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X, ArrowUpRight, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/posts";
import { authors, authorForPost } from "@/lib/authors";

export type Author = (typeof authors)[number];

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    localStorage.setItem("field-notes-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}>
      {dark ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
    </Button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Latest", "/archive"],
    ["Archive", "/archive"],
    ["Authors", "/authors"],
    ["About", "/about"],
  ] as const;

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          Field Notes<span className="text-primary">.</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}>
            {open ? <X data-icon="inline-start" /> : <Menu data-icon="inline-start" />}
          </Button>
        </div>
      </div>
      <nav
        className={`grid overflow-hidden border-t border-border px-5 text-sm transition-[grid-template-rows,opacity,padding] duration-500 md:hidden ${open ? "grid-rows-[1fr] gap-4 py-5 opacity-100" : "grid-rows-[0fr] gap-0 py-0 opacity-0"}`}
        aria-hidden={!open}>
        <div className="flex min-h-0 flex-col gap-4">
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function formatDate(date: Date | null) {
  return (
    date?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) ?? "Unpublished"
  );
}

export function Meta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span>{post.category}</span>
      <span className="text-border">/</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span className="text-border">/</span>
      <span>{post.readingMinutes} min read</span>
    </div>
  );
}

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={copied ? "Article link copied" : "Copy article link"}
      onClick={() => void copyLink()}>
      <Link2 data-icon="inline-start" />
    </Button>
  );
}

export function Avatar({ author, large = false }: { author: Author; large?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ${large ? "size-16 text-lg" : "size-8 text-xs"} font-medium`}>
      {author.initials}
    </div>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const author = authorForPost(post);
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group flex flex-col gap-5 ${featured ? "md:grid md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-12" : ""}`}>
      <div
        className={`${featured ? "aspect-[4/3] md:aspect-[1.2/1]" : "aspect-[1.4/1]"} relative overflow-hidden rounded-sm bg-muted`}>
        <div className="absolute inset-8 border border-foreground/10 transition duration-500 group-hover:inset-6" />
        <span className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-foreground/60">
          Field / {post.category}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <Meta post={post} />
        <h2
          className={`${featured ? "text-4xl md:text-6xl" : "text-2xl"} font-serif leading-[1.05] tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4`}>
          {post.title}
        </h2>
        <p className="max-w-lg leading-6 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-2">
          <Avatar author={author} />
          <span className="text-sm">{author.name}</span>
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-serif text-xl text-foreground">
            Field Notes<span className="text-primary">.</span>
          </div>
          <p className="mt-2 max-w-xs">
            A publication about attention, tools, and making a life with intention.
          </p>
        </div>
        <div className="flex gap-5">
          <Link href="/about">About</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/authors">Authors</Link>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
