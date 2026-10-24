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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Dashboard data

Set `NEXT_PUBLIC_BASE_URL` to the backend API root (for example, `http://localhost:5000/api`). The backend stores dashboard-managed programs, projects, news, opportunities, reports, publications, partners, team profiles, contact messages, and notifications in MongoDB.

Set `NEXT_PUBLIC_SITE_URL` to the canonical public website origin (for example, `https://thebrainbuilders.org`) in production. The frontend publishes `robots.txt` and a sitemap containing public pages, published news and blog articles, and public team profiles. Public article and staff pages are server-rendered with page-specific metadata and structured data; account and dashboard routes are marked noindex. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools after deployment. Indexing is controlled by search engines and cannot be guaranteed by the site alone.

On backend startup, existing MongoDB programs and projects plus the hard-coded programs, projects, news, opportunities, publications, reports, innovation tools, team directory, and the supplied 25-post BBYDI blog export are migrated additively. Blog imports preserve the supplied article slugs, author bylines, categories, reading times, dates, featured story, and article body. The screenshot innovation entries are repaired and published by a one-time migration; run it manually with `npm run seed:innovations` in the backend project. Other existing content is not overwritten on subsequent starts. To run the blog import manually, use `npm run seed:blog` in the backend project. Real partner entries and downloadable report files can be added from the dashboard; the previous “Partner 1” placeholders are not migrated.

Staff submissions remain unpublished until an administrator approves them. The Tasks page is not integrated yet.

Administrators manage newsroom articles from **Dashboard → News** and the Innovation & Technology for Good cards from **Dashboard → Innovation & technology**. The editor supports formatted text, drag-and-drop image uploads, tables, drafts, and a preview before publishing. Each published article receives a unique URL slug derived from its headline and is available under `/news/:slug`. The article layout includes a lead image, an optional browser text-to-speech player, related stories, and copy, native-share, email, Facebook, LinkedIn, and X sharing options. Article HTML is sanitized by the backend before it is stored and again before it is rendered.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
