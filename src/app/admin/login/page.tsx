"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

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
    <main className="mx-auto min-h-screen max-w-[1240px] px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[19px]">
        <Link href="/" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <ThemeToggle />
      </header>
      <section className="mx-auto my-[16vh] max-w-[420px]">
        <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
          Private workspace
        </p>
        <h1 className="m-0 mb-[18px] font-sans text-[clamp(48px,7vw,82px)] font-[650] leading-[0.9] tracking-[-0.085em]">
          Welcome back.
        </h1>
        <p className="text-sm leading-[1.5] text-muted">Sign in to write, edit, and publish your notes.</p>
        <form onSubmit={submit} className="mt-[35px] flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.12em] text-muted">
            Email
            <input
              className="border-0 border-b border-line bg-transparent py-3 font-inherit text-foreground outline-0 focus:border-accent"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.12em] text-muted">
            Password
            <input
              className="border-0 border-b border-line bg-transparent py-3 font-inherit text-foreground outline-0 focus:border-accent"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="m-0 text-xs text-[#a95136]">{error}</p>}
          <Button type="submit" className="mt-2 w-full">
            Sign in <span>↗</span>
          </Button>
        </form>
      </section>
    </main>
  );
}
