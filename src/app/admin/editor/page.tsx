"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bold, Eye, Italic, Link2, MoreHorizontal, Save, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ThemeToggle } from "@/components/theme-toggle";

const starter =
  "A good tool does not ask to be admired. It makes room for attention.\n\nStart writing your note here...";
type FieldName = "title" | "slug" | "excerpt" | "body";
type Status = "draft" | "published";
type SavedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImageUrl: string | null;
  tags: string[];
  body: string;
  status: Status;
};
type EditorValues = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: Status;
  body: string;
  coverImageUrl: string;
  tags: string;
};

function renderMarkdown(markdown: string) {
  return markdown.split("\n").map((line, index) => {
    const key = `${line}-${index}`;
    if (line.startsWith("### "))
      return (
        <h3 key={key} className="mt-8 font-serif text-2xl">
          {line.slice(4)}
        </h3>
      );
    if (line.startsWith("## "))
      return (
        <h2 key={key} className="mt-10 font-serif text-3xl">
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("# "))
      return (
        <h1 key={key} className="font-serif text-4xl tracking-tight md:text-5xl">
          {line.slice(2)}
        </h1>
      );
    if (line.startsWith("> "))
      return (
        <blockquote
          key={key}
          className="my-8 border-l-2 border-primary pl-5 font-serif text-2xl italic leading-relaxed text-muted-foreground">
          {line.slice(2)}
        </blockquote>
      );
    if (line.startsWith("- "))
      return (
        <li key={key} className="ml-5 list-disc leading-7">
          {line.slice(2)}
        </li>
      );
    if (!line.trim()) return <div key={key} className="h-4" />;
    return (
      <p key={key} className="leading-8 text-muted-foreground">
        {line}
      </p>
    );
  });
}

export default function EditorPage() {
  const [values, setValues] = useState<EditorValues>({
    title: "",
    slug: "",
    excerpt: "",
    category: "Notes",
    status: "draft",
    body: starter,
    coverImageUrl: "",
    tags: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [postId, setPostId] = useState<string>();
  const [savedLabel, setSavedLabel] = useState("Unsaved changes");
  const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    const editSlug = new URLSearchParams(window.location.search).get("slug");
    Promise.all([
      fetch("/api/admin/posts?categories=true").then((response) => response.json()),
      editSlug
        ? fetch(`/api/admin/posts?slug=${encodeURIComponent(editSlug)}`).then((response) => response.json())
        : Promise.resolve(null),
    ])
      .then(([categoryData, post]) => {
        setCategories(categoryData as string[]);
        if (post?.id) {
          const saved = post as SavedPost;
          setPostId(saved.id);
          setValues({
            title: saved.title,
            slug: saved.slug,
            excerpt: saved.excerpt,
            category: saved.category,
            status: saved.status,
            body: saved.body,
            coverImageUrl: saved.coverImageUrl ?? "",
            tags: saved.tags.join(", "),
          });
          setSavedLabel("Saved just now");
        }
      })
      .catch(() => setMessage("Unable to load the writing desk."))
      .finally(() => setLoading(false));
  }, []);

  const previewContent = useMemo(() => renderMarkdown(values.body), [values.body]);
  function update(key: keyof EditorValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setSavedLabel("Unsaved changes");
  }
  function validate() {
    const next: Partial<Record<FieldName, string>> = {};
    if (!values.title.trim()) next.title = "Fill in a title.";
    if (!values.slug.trim()) next.slug = "Fill in a post slug.";
    if (!values.excerpt.trim()) next.excerpt = "Fill in a description.";
    if (!values.body.trim()) next.body = "Write some content first.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function save(status: Status) {
    if (!validate()) {
      setMessage("Fill in the required properties before saving this note.");
      return;
    }
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId, ...values, status }),
    });
    const result = (await response.json()) as { error?: string; id?: string };
    setSaving(false);
    if (response.ok) {
      setPostId(result.id ?? postId);
      setValues((current) => ({ ...current, status }));
      setSavedLabel(status === "published" ? "Published just now" : "Saved just now");
      setMessage(status === "published" ? "Published successfully." : "Draft saved successfully.");
    } else setMessage(result.error ?? "Unable to save the post.");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save("draft");
  }
  if (loading)
    return (
      <main className="grid min-h-screen place-items-center bg-muted/30 px-5">
        <p className="text-muted-foreground">Loading writing desk...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="size-4" /> Desk
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">{savedLabel}</span>
          <Button variant="outline" size="sm" type="submit" form="post-editor" disabled={saving}>
            <Save data-icon="inline-start" /> Save draft
          </Button>
          <Button size="sm" type="button" disabled={saving} onClick={() => void save("published")}>
            Publish
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {postId ? "Edit article" : "New article"}
          </p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-6xl">
            {postId ? "Shape the story." : "Make a new note."}
          </h1>
        </div>
        {message && (
          <p
            className={`mb-6 text-sm ${Object.keys(errors).length ? "text-destructive" : "text-emerald-600"}`}
            role="status">
            {message}
          </p>
        )}
        <form id="post-editor" onSubmit={submit}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="border border-border bg-background p-5 shadow-sm md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Bold"
                    onClick={() => update("body", `**bold** ${values.body}`)}>
                    <Bold />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Italic"
                    onClick={() => update("body", `*italic* ${values.body}`)}>
                    <Italic />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Add link"
                    onClick={() => update("body", `${values.body}\n\n[Link text](https://example.com)`)}>
                    <Link2 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Text style"
                    onClick={() => update("body", `# Heading\n\n${values.body}`)}>
                    <Type />
                  </Button>
                </div>
                <div className="flex border border-border p-1 text-xs">
                  <Button
                    variant={preview ? "ghost" : "secondary"}
                    size="sm"
                    type="button"
                    onClick={() => {
                      setTransitionDirection("right");
                      setPreview(false);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant={preview ? "secondary" : "ghost"}
                    size="sm"
                    type="button"
                    onClick={() => {
                      setTransitionDirection("left");
                      setPreview(true);
                    }}>
                    <Eye data-icon="inline-start" /> Preview
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[600px] overflow-hidden">
                {preview ? (
                  <article
                    key="preview"
                    className={`min-h-[600px] max-w-2xl origin-top font-serif text-lg ${transitionDirection === "left" ? "animate-in fade-in slide-in-from-left-2" : "animate-in fade-in slide-in-from-right-2"}`}>
                    {previewContent}
                  </article>
                ) : (
                  <Textarea
                    key="editor"
                    aria-label="Markdown content"
                    autoFocus
                    value={values.body}
                    onChange={(event) => update("body", event.target.value)}
                    className={`min-h-[600px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-7 outline-none ${errors.body ? "border-destructive" : ""}`}
                    placeholder="Write in Markdown..."
                  />
                )}
              </div>
              {errors.body && <p className="mt-2 text-xs text-destructive">{errors.body}</p>}
            </section>
            <aside className="flex flex-col gap-5">
              <div className="border border-border bg-background p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-serif text-xl">Details</h2>
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </div>
                <label className="flex flex-col gap-2 text-xs text-muted-foreground">
                  Title
                  <Input
                    aria-invalid={!!errors.title}
                    value={values.title}
                    onChange={(event) => update("title", event.target.value)}
                  />
                </label>
                {errors.title && <p className="mt-2 text-xs text-destructive">{errors.title}</p>}
                <label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                  Slug
                  <Input
                    aria-invalid={!!errors.slug}
                    value={values.slug}
                    onChange={(event) => update("slug", event.target.value)}
                    className="font-mono text-xs"
                  />
                </label>
                {errors.slug && <p className="mt-2 text-xs text-destructive">{errors.slug}</p>}
                <label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                  Excerpt
                  <Textarea
                    aria-invalid={!!errors.excerpt}
                    value={values.excerpt}
                    onChange={(event) => update("excerpt", event.target.value)}
                    className="min-h-20 resize-none"
                  />
                </label>
                {errors.excerpt && <p className="mt-2 text-xs text-destructive">{errors.excerpt}</p>}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-2 text-xs text-muted-foreground">
                    Category
                    <Combobox
                      items={categories}
                      inputValue={values.category}
                      onInputValueChange={(value) => update("category", value)}>
                      <ComboboxInput aria-label="Post category" placeholder="Category" showTrigger />
                      <ComboboxContent>
                        <ComboboxEmpty>No matching category.</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </label>
                  <label className="flex flex-col gap-2 text-xs text-muted-foreground">
                    Status
                    <select
                      value={values.status}
                      onChange={(event) => update("status", event.target.value as Status)}
                      className="h-8 border border-input bg-background px-2 text-sm text-foreground">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </label>
                </div>
                <label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                  Cover image URL
                  <Input
                    value={values.coverImageUrl}
                    onChange={(event) => update("coverImageUrl", event.target.value)}
                  />
                </label>
                <label className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                  Tags
                  <Input
                    value={values.tags}
                    onChange={(event) => update("tags", event.target.value)}
                    placeholder="craft, tools"
                  />
                </label>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
