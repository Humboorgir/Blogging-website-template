## Field Notes

Reusable editorial blogging template built with Next.js App Router, Drizzle, PostgreSQL, and Better Auth.

### Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `BETTER_AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
2. Create a PostgreSQL database with your provider.
3. Run `bun run db:generate`, `bun run db:migrate`, then `bun run db:seed`.
4. Start the app with `bun dev` and visit `/admin/login`.

The seed creates three published demo posts, one private draft, and the first admin account. Admin actions are intentionally private; there is no public sign-up route.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
