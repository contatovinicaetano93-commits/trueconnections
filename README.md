# trueconnections

Landing premium da **True Connection** — comunidade cristã editorial.

## Stack

- Next.js (App Router) + Tailwind CSS
- GSAP + Lenis (motion / smooth scroll)
- Neon Postgres (`DATABASE_URL`)

## Setup

```bash
cp .env.example .env.local
# preencha DATABASE_URL
npm install
npm run dev
```

## Deploy

```bash
vercel
```

Defina `DATABASE_URL` no painel da Vercel (Environment Variables).
