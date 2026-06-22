# Jaya Abadi Poultry

Poultry farm lead generation website built with Next.js, statically generated for fast delivery, and powered by Decap CMS for content management.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **CMS:** Decap CMS (Git-based)
- **Deployment:** Netlify

## Features

- 100% static generation (SSG) with ISR
- Product catalog with 15+ items across 5 categories (Ayam, Itik, Angsa, Entok, Lainnya)
- Product gallery with video/image slider support
- Blog with 3 articles
- WhatsApp integration for lead generation
- Scroll-reveal animations and counter animations
- Mobile-first responsive design
- Decap CMS for content editing (products, blog, company info, homepage)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── data/                    # Content files (editable via Decap CMS)
│   ├── products/            # Products (1 file per product)
│   ├── blog/                # Blog articles (1 file per article)
│   ├── company.json         # Company info
│   └── homepage.json        # Homepage content
├── public/
│   ├── admin/               # Decap CMS entry
│   │   ├── index.html
│   │   └── config.yml
│   └── images/              # Static images
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (public)/        # Public route group
│   │   └── api/             # API routes (revalidation)
│   ├── components/          # React components
│   ├── lib/                 # Utilities & data reader
│   └── types/               # TypeScript interfaces
└── next.config.ts           # Next.js configuration
```

## Decap CMS

Content is managed through `/admin/`:

| Collection | Data File | Editable Fields |
|------------|-----------|----------------|
| Produk | `data/products/*.json` | Name, price, stock, category, specs, media |
| Blog | `data/blog/*.json` | Title, content, tags, author |
| Company | `data/company.json` | Phone, address, stats, maps |
| Homepage | `data/homepage.json` | Hero text, values, CTA |

### Local Development

For local CMS preview, change backend to `test-repo` in `public/admin/config.yml`:

```yaml
backend:
  name: test-repo
```

**Don't commit this change.** Revert to `github` before pushing.

### Production

1. Push to GitHub
2. Deploy to Netlify
3. Register GitHub OAuth App (callback: `https://SITE.netlify.app/.netlify/functions/auth`)
4. Set up Authentication Provider in Netlify
5. Update `repo` in `config.yml` to `username/repo-name`
6. Access `https://SITE.netlify.app/admin/`

## Build

```bash
npm run build
```

All pages are statically generated with ISR (1-hour revalidation). To trigger manual revalidation, POST to `/api/revalidate` with `{ secret: env.REVALIDATION_SECRET }`.

## License

MIT
