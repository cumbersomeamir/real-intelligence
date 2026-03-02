# LuckNow PropIntel

LuckNow PropIntel is a full-stack property intelligence and deal detection platform for Lucknow, built with an AI-agent-first architecture.

## Stack

- Frontend: Next.js 15.0.3 (App Router), Tailwind CSS v4, Zustand, React Query, NextAuth v5, Recharts, Framer Motion
- Backend: Node.js 20, Express, MongoDB (Mongoose), Redis + BullMQ, Socket.io, JWT auth, Winston logging
- Deployment targets:
  - Frontend: Vercel
  - Backend: Railway or Render

## Monorepo Structure

- `frontend/`: Next.js application with SSR marketing pages, auth pages, dashboard pages, API proxy routes, shared design system
- `backend/`: Express MVC backend with models, controllers, services, routes, middleware, jobs, and seed data

## Quick Start

1. Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
cd ..
```

2. Configure environment variables:

- Copy root `.env.example` values into your local env setup.
- Backend requires `MONGODB_URI`, `REDIS_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`.
- Frontend requires `BACKEND_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.

3. Run locally (separate terminals):

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

4. Open app:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Architecture Overview

### Frontend

- App Router route groups:
  - `(marketing)`: SEO-first public pages (`/about`, `/pricing`, `/contact`, `/blog`, `/micro-locations`, `/reports`, legal)
  - `(auth)`: `/login`, `/register`
  - `(dashboard)`: authenticated product pages (`/dashboard`, `/map`, `/deals`, `/properties`, `/analytics`, `/buyers`, `/revenue`, `/ai-agents`, `/scraper`, `/social`, `/whatsapp`, `/settings`)
- Shared primitives in `frontend/components/ui`
- Shared charts/maps/ai/common in `frontend/components/*`
- SEO metadata via page-level `generateMetadata`
- JSON-LD support via `components/common/JsonLd`
- PWA support: `frontend/public/manifest.json` + `frontend/public/sw.js`

### Backend (MVC + Service Layer)

- Models: Users, Properties, Deals, Buyers, MicroLocations, AgentTasks, Reports, BlogPosts, Transactions, etc.
- Controllers: REST handlers for each domain
- Services: business logic modules (auth, scraping, location intelligence, ML scoring, messaging, payments, AI agents)
- Middleware: auth, RBAC, rate limiting, validation, caching, logging, global error handling
- Jobs: background job stubs under `backend/src/jobs`

### AI Agent System

- Base interface: `backend/src/services/ai-agents/agents/baseAgent.js`
- Agents implemented:
  - `ScraperAgent`
  - `ValuationAgent`
  - `DealDetectorAgent`
  - `BuyerMatchAgent`
  - `ContentAgent`
  - `OutreachAgent`
  - `ReportAgent`
  - `MonitorAgent`
- Orchestration:
  - Registry: `agentRegistry.js`
  - Queue: `taskQueue.js` (BullMQ)
  - Scheduler: `agentOrchestrator.js` (cron)
  - Feedback: `feedbackLoop.js`

## API Surface

Base URL: `/api`

- Auth: `/auth/*`
- Properties: `/properties/*`
- Deals: `/deals/*`
- Buyers: `/buyers/*`
- Micro-locations: `/micro-locations/*`
- Analytics: `/analytics/*`
- AI NL query: `/ai/query`
- Agents: `/agents/*`
- Scraper: `/scraper/*`
- Revenue: `/revenue/*`
- Reports: `/reports/*`
- Blog: `/blog/*`
- WhatsApp: `/whatsapp/*`
- Webhooks: `/webhooks/*`

## Seed Data

- `backend/src/seeds/microLocations.js`: 50+ Lucknow micro-locations
- `backend/src/seeds/sampleProperties.js`: 50 sample properties
- `backend/src/seeds/circleRates.js`: Lucknow circle rate approximations

Run seed:

```bash
cd backend
npm run seed
```

## Security Baseline

- Helmet enabled
- CORS allowlist via `FRONTEND_URL`
- XSS sanitization (`xss-clean`)
- Mongo injection sanitization (`express-mongo-sanitize`)
- Request size limits (10mb)
- JWT + RBAC
- Redis-backed rate limits (public/auth/admin/webhook)

## SEO + SSR Notes

- Public pages export `generateMetadata`
- Dynamic routes support static params where applicable
- JSON-LD added on key public pages (Organization, WebSite, Article, Product, FAQPage, LocalBusiness, BreadcrumbList)
- `next-sitemap` configured via `frontend/next-sitemap.config.js`

## Deployment

### Frontend (Vercel)

- Root directory: `frontend`
- Build command: `npm run build`
- Install command: `npm install`
- Required envs: `BACKEND_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_WS_URL`

### Backend (Railway/Render)

- Root directory: `backend`
- Start command: `npm start`
- Required envs: `MONGODB_URI`, `REDIS_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`
- Expose port `5000` (or provider dynamic `PORT`)

## Important Notes

- `app/page.js` is the canonical landing route (`/`) to avoid App Router duplicate root route collisions.
- Backend uses ESM (`"type": "module"`) and relative imports.
- Many feature modules are production-safe scaffolds intended for iterative hardening with live provider credentials and real data pipelines.
# real-intelligence
