"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const starter =
  "A good tool does not ask to be admired. It makes room for attention.\n\nStart writing your note here...";
type FieldName = "title" | "slug" | "excerpt" | "body";
type SavedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImageUrl: string | null;
  tags: string[];
  body: string;
};

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Notes");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState(starter);
  const [categories, setCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState<string>();
  const [loading, setLoading] = useState(true);

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
          setTitle(saved.title);
          setSlug(saved.slug);
          setExcerpt(saved.excerpt);
          setCategory(saved.category);
          setCoverImageUrl(saved.coverImageUrl ?? "");
          setTags(saved.tags.join(", "));
          setBody(saved.body);
        }
      })
      .catch(() => setMessage("Unable to load the writing desk."))
      .finally(() => setLoading(false));
  }, []);

  function validate() {
    const next: Partial<Record<FieldName, string>> = {};
    if (!title.trim()) next.title = "Fill in a title.";
    if (!slug.trim()) next.slug = "Fill in a post slug.";
    if (!excerpt.trim()) next.excerpt = "Fill in a description.";
    if (!body.trim()) next.body = "Write some content first.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function save(status: "draft" | "published") {
    if (!validate()) {
      setMessage("Fill in the required properties before saving this note.");
      return;
    }
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId, title, slug, excerpt, category, coverImageUrl, tags, body, status }),
    });
    const result = (await response.json()) as { error?: string; id?: string; slug?: string };
    setSaving(false);
    if (response.ok) {
      setPostId(result.id ?? postId);
      setMessage(status === "published" ? "Published successfully." : "Draft saved successfully.");
    } else setMessage(result.error ?? "Unable to save the post.");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save("draft");
  }
  function inputClass(name: FieldName) {
    return errors[name] ? "border-destructive shadow-[0_0_0_3px_rgba(217,45,32,0.1)]" : "";
  }
  if (loading)
    return (
      <main className="mx-auto flex min-h-screen max-w-[1240px] items-center justify-center px-[5vw] text-muted">
        <p>Loading writing desk...</p>
      </main>
    );
  return (
    <main className="mx-auto min-h-screen max-w-[1240px] px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/admin" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav className="flex items-center gap-[30px] text-xs text-muted">
          <Link href="/admin">All notes</Link>
          <span>{postId ? "Editing draft" : "New note"}</span>
          <ThemeToggle />
        </nav>
      </header>
      <section className="py-[90px_0_120px] max-[700px]:py-[70px_0]">
        <div className="flex items-end justify-between gap-7 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Writing desk / {postId ? "Edit note" : "New note"}
            </p>
            <h1 className="m-0 font-sans text-[clamp(48px,7vw,82px)] font-[650] leading-[0.9] tracking-[-0.085em]">
              Shape the thought.
            </h1>
          </div>
          <div className="flex gap-2.5">
            <button
              className="border border-foreground bg-transparent px-[18px] py-3.5 text-[11px] uppercase tracking-[0.08em] disabled:opacity-50"
              type="submit"
              form="post-editor"
              disabled={saving}>
              Save draft
            </button>
            <button
              className="border border-foreground bg-foreground px-[18px] py-3.5 text-[11px] uppercase tracking-[0.08em] text-background hover:border-accent hover:bg-accent"
              type="button"
              disabled={saving}
              onClick={() => void save("published")}>
              Publish <span>↗</span>
            </button>
          </div>
        </div>
        {message && (
          <p
            className={`mt-6 text-sm ${Object.keys(errors).length ? "text-destructive" : "text-[#00875a]"}`}
            role="status">
            {message}
          </p>
        )}
        <form id="post-editor" onSubmit={submit}>
          <div className="mt-[70px] mb-[25px] grid grid-cols-[1fr_1fr_1.5fr] gap-[30px] max-[700px]:block max-[700px]:mt-[55px]">
            <div className="editor-field">
              <input
                className={`w-full border-0 border-b border-line bg-transparent py-3 text-foreground outline-0 focus:border-accent max-[700px]:mb-[18px] ${inputClass("title")}`}
                aria-label="Post title"
                placeholder="Untitled note"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrors((current) => ({ ...current, title: undefined }));
                }}
              />
              {errors.title && <p className="mt-2 text-xs text-destructive">{errors.title}</p>}
            </div>
            <div className="editor-field">
              <input
                className={`w-full border-0 border-b border-line bg-transparent py-3 text-foreground outline-0 focus:border-accent max-[700px]:mb-[18px] ${inputClass("slug")}`}
                aria-label="Post slug"
                placeholder="post-slug"
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                  setErrors((current) => ({ ...current, slug: undefined }));
                }}
              />
              {errors.slug && <p className="mt-2 text-xs text-destructive">{errors.slug}</p>}
            </div>
            <div className="editor-field">
              <input
                className={`w-full border-0 border-b border-line bg-transparent py-3 text-foreground outline-0 focus:border-accent ${inputClass("excerpt")}`}
                aria-label="Post excerpt"
                placeholder="A short description for the archive..."
                value={excerpt}
                onChange={(event) => {
                  setExcerpt(event.target.value);
                  setErrors((current) => ({ ...current, excerpt: undefined }));
                }}
              />
              {errors.excerpt && <p className="mt-2 text-xs text-destructive">{errors.excerpt}</p>}
            </div>
          </div>
          <div className="mb-[25px] grid grid-cols-3 gap-[30px] max-[700px]:block [&>*]:max-[700px]:mb-3.5">
            <Combobox items={categories} inputValue={category} onInputValueChange={setCategory} autoHighlight>
              <ComboboxInput
                className="border-line bg-transparent"
                aria-label="Post category"
                placeholder="Category"
                showTrigger
              />
              <ComboboxContent>
                <ComboboxEmpty>No matching category. Keep typing to create one.</ComboboxEmpty>
                <ComboboxList>
                  {(item: any) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <input
              aria-label="Cover image URL"
              placeholder="Cover image URL (optional)"
              value={coverImageUrl}
              onChange={(event) => setCoverImageUrl(event.target.value)}
            />
            <input
              aria-label="Post tags"
              placeholder="Tags, separated by commas"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
            />
          </div>
          <Tabs className="min-h-[550px] border border-line" defaultValue="editor">
            <TabsList className="flex w-full rounded-none border-b border-line px-3.5" variant="line">
              <TabsTrigger value="editor">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent className="min-h-[500px]" value="editor">
              <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2">
                <button
                  className="bg-transparent px-2 py-1.5 text-muted hover:text-accent"
                  type="button"
                  onClick={() => setBody((value) => `# Heading\n\n${value}`)}>
                  H1
                </button>
                <button
                  className="bg-transparent px-2 py-1.5 text-muted hover:text-accent"
                  type="button"
                  onClick={() => setBody((value) => `**bold** ${value}`)}>
                  B
                </button>
                <button
                  className="bg-transparent px-2 py-1.5 text-muted hover:text-accent"
                  type="button"
                  onClick={() => setBody((value) => `${value}\n\n[Link text](https://example.com)`)}>
                  Link
                </button>
                <button
                  className="bg-transparent px-2 py-1.5 text-muted hover:text-accent"
                  type="button"
                  onClick={() => setBody((value) => `${value}\n\n\`\`\`\ncode\n\`\`\``)}>
                  Code
                </button>
                <span className="ml-auto text-[10px] uppercase text-muted">Markdown</span>
              </div>
              <textarea
                className={`h-[430px] w-full resize-none border-0 bg-transparent p-7 font-mono text-base leading-[1.7] text-foreground outline-0 ${inputClass("body")}`}
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                  setErrors((current) => ({ ...current, body: undefined }));
                }}
                aria-label="Markdown body"
              />
              {errors.body && <p className="mt-2 text-xs text-destructive">{errors.body}</p>}
            </TabsContent>
            <TabsContent
              className="min-h-[500px] p-7 [&_h1]:mb-5 [&_h1]:font-editorial [&_h1]:text-4xl [&_h1]:font-normal [&_h2]:my-6 [&_h2]:font-editorial [&_h2]:text-[1.75rem] [&_h2]:font-normal [&_p]:font-editorial [&_p]:leading-[1.6]"
              value="preview">
              <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                Live preview
              </p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </TabsContent>
          </Tabs>
        </form>
      </section>
    </main>
  );
}
