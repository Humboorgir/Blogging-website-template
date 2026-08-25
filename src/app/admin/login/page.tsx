"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(data.get("email")),
      password: String(data.get("password")),
      callbackURL: "/admin",
    });
    if (result.error) setError(result.error.message ?? "Unable to sign in.");
  }
  return (
    <main className="admin-frame">
      <Link href="/" className="wordmark">
        FIELD<span> / </span>NOTES
      </Link>
      <section className="login-panel">
        <p className="eyebrow">Private workspace</p>
        <h1>Welcome back.</h1>
        <p className="admin-muted">Sign in to write, edit, and publish your notes.</p>
        <form onSubmit={submit} className="admin-form">
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="admin-button">
            Sign in <span>↗</span>
          </button>
        </form>
      </section>
    </main>
  );
}
