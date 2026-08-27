"use client";

import { useState } from "react";
import { PostCard } from "@/components/field-notes";
import type { Post } from "@/lib/posts";

export function ArchiveBrowser({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  const filtered = posts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="mt-14 flex flex-col gap-5 border-y border-border py-5 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the archive"
          aria-label="Search the archive"
          className="border-b border-border bg-transparent py-2 text-sm outline-none md:w-64"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-1.5 text-xs ${category === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {!filtered.length && <p className="py-20 text-muted-foreground">No notes match that search.</p>}
      </div>
    </>
  );
}
