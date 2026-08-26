import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TeamPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1240px] px-[5vw]">
      <header className="flex items-center justify-between border-b border-line py-[27px]">
        <Link href="/admin" className="text-xs font-bold tracking-[0.16em]">
          FIELD<span className="px-1 text-accent"> / </span>NOTES
        </Link>
        <nav className="flex items-center gap-[30px] text-xs text-muted">
          <Link href="/admin">Dashboard</Link>
          <ThemeToggle />
        </nav>
      </header>
      <section className="py-[90px_0_120px] max-[700px]:py-[70px_0]">
        <p className="mb-[18px] text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
          Private workspace / Access
        </p>
        <h1 className="m-0 mb-[18px] font-sans text-[clamp(48px,7vw,82px)] font-[650] leading-[0.9] tracking-[-0.085em]">
          Team access.
        </h1>
        <p className="text-sm leading-[1.5] text-muted">
          Manage the people who can publish to this publication.
        </p>
        <div className="flex items-center justify-between gap-7 border-y border-line py-6 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <strong>Admin account</strong>
            <span>admin@example.com</span>
          </div>
          <button className="border border-foreground bg-transparent px-[18px] py-3.5 text-[11px] uppercase tracking-[0.08em] hover:border-accent hover:text-accent">
            Change password
          </button>
        </div>
        <div className="mt-12 border border-line p-7">
          <h2 className="font-editorial text-[28px] font-normal">Add an admin</h2>
          <p className="text-sm text-muted">Give another owner access to the writing desk.</p>
          <form className="mt-[35px] flex max-w-[420px] flex-col gap-5">
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.12em] text-muted">
              Email
              <input
                className="border-0 border-b border-line bg-transparent py-3 outline-0 focus:border-accent"
                type="email"
                placeholder="owner@example.com"
              />
            </label>
            <button
              className="inline-flex w-fit gap-4 border border-foreground bg-foreground px-[18px] py-3.5 text-[11px] uppercase tracking-[0.08em] text-background hover:border-accent hover:bg-accent"
              type="button">
              Add admin <span>+</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
