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
    return errors[name] ? "editor-input-error" : "";
  }
  if (loading)
    return (
      <main className="admin-frame">
        <p className="editor-loading">Loading writing desk...</p>
      </main>
    );
  return (
    <main className="admin-frame">
      <header className="admin-header">
        <Link href="/admin" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav className="site-nav">
          <Link href="/admin">All notes</Link>
          <span>{postId ? "Editing draft" : "New note"}</span>
        </nav>
      </header>
      <section className="editor-page">
        <div className="editor-top">
          <div>
            <p className="eyebrow">Writing desk / {postId ? "Edit note" : "New note"}</p>
            <h1>Shape the thought.</h1>
          </div>
          <div className="editor-actions">
            <button className="admin-button secondary" type="submit" form="post-editor" disabled={saving}>
              Save draft
            </button>
            <button
              className="admin-button"
              type="button"
              disabled={saving}
              onClick={() => void save("published")}>
              Publish <span>↗</span>
            </button>
          </div>
        </div>
        {message && (
          <p className={Object.keys(errors).length ? "editor-message" : "editor-success"} role="status">
            {message}
          </p>
        )}
        <form id="post-editor" onSubmit={submit}>
          <div className="editor-meta">
            <div className="editor-field">
              <input
                className={inputClass("title")}
                aria-label="Post title"
                placeholder="Untitled note"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrors((current) => ({ ...current, title: undefined }));
                }}
              />
              {errors.title && <p className="editor-field-error">{errors.title}</p>}
            </div>
            <div className="editor-field">
              <input
                className={inputClass("slug")}
                aria-label="Post slug"
                placeholder="post-slug"
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                  setErrors((current) => ({ ...current, slug: undefined }));
                }}
              />
              {errors.slug && <p className="editor-field-error">{errors.slug}</p>}
            </div>
            <div className="editor-field">
              <input
                className={inputClass("excerpt")}
                aria-label="Post excerpt"
                placeholder="A short description for the archive..."
                value={excerpt}
                onChange={(event) => {
                  setExcerpt(event.target.value);
                  setErrors((current) => ({ ...current, excerpt: undefined }));
                }}
              />
              {errors.excerpt && <p className="editor-field-error">{errors.excerpt}</p>}
            </div>
          </div>
          <div className="editor-fields">
            <Combobox items={categories} inputValue={category} onInputValueChange={setCategory} autoHighlight>
              <ComboboxInput
                className="category-trigger"
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
          <Tabs className="editor-tabs" defaultValue="editor">
            <TabsList className="editor-tabs-list" variant="line">
              <TabsTrigger value="editor">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent className="editor-pane" value="editor">
              <div className="toolbar">
                <button type="button" onClick={() => setBody((value) => `# Heading\n\n${value}`)}>
                  H1
                </button>
                <button type="button" onClick={() => setBody((value) => `**bold** ${value}`)}>
                  B
                </button>
                <button
                  type="button"
                  onClick={() => setBody((value) => `${value}\n\n[Link text](https://example.com)`)}>
                  Link
                </button>
                <button type="button" onClick={() => setBody((value) => `${value}\n\n\`\`\`\ncode\n\`\`\``)}>
                  Code
                </button>
                <span>Markdown</span>
              </div>
              <textarea
                className={inputClass("body")}
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                  setErrors((current) => ({ ...current, body: undefined }));
                }}
                aria-label="Markdown body"
              />
              {errors.body && <p className="editor-field-error editor-body-error">{errors.body}</p>}
            </TabsContent>
            <TabsContent className="preview-pane" value="preview">
              <p className="eyebrow">Live preview</p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </TabsContent>
          </Tabs>
        </form>
      </section>
    </main>
  );
}
