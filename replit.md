# TEDx Event Website

## Overview

A modern, cinematic, scroll-driven website for a school-hosted TEDx event themed "Compass Within: Finding direction in a world full of signals." The site features a minimal, intellectual, Apple-like design with 3D animations, scroll-triggered narratives, and a speaker showcase. Built as a full-stack application with React frontend and Express backend, serving both static content and API endpoints for speaker data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing (Home, About, Attend pages)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark mode, TED red accent)
- **UI Components**: shadcn/ui component library (Radix UI primitives with Tailwind styling)
- **3D Graphics**: React Three Fiber + Three.js with @react-three/drei helpers for the animated red "X" compass element
- **Animations**: GSAP with ScrollTrigger for scroll-driven narrative animations, Framer Motion for UI transitions

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: Simple REST endpoints defined in shared/routes.ts with Zod validation schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development Server**: Vite dev server integrated with Express via middleware for hot module replacement

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema**: Drizzle schema in shared/schema.ts defining speakers table (id, name, designation, title, summary, photoUrl, displayOrder)
- **Migrations**: Drizzle Kit for schema management (db:push command)

### Build System
- **Frontend Build**: Vite builds to dist/public
- **Backend Build**: esbuild bundles server code to dist/index.cjs with selective dependency bundling for faster cold starts
- **TypeScript**: Strict mode with path aliases (@/ for client/src, @shared/ for shared/)

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including 3D Experience, Navigation, SpeakerCard
    pages/        # Route pages (Home, About, Attend)
    hooks/        # Custom hooks (useSpeakers, useToast)
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers with seed data
  storage.ts      # Database access layer
  db.ts           # Drizzle database connection
shared/           # Shared code between frontend/backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via DATABASE_URL environment variable
- **connect-pg-simple**: Session storage for Express (included in dependencies)

### Third-Party Libraries
- **Radix UI**: Comprehensive primitive components for accessibility (dialog, dropdown, tabs, etc.)
- **GSAP**: Professional-grade animation library with ScrollTrigger plugin
- **Three.js / React Three Fiber**: 3D rendering for the interactive compass "X" element
- **Zod**: Runtime type validation for API requests/responses
- **Drizzle ORM**: Type-safe database queries with drizzle-zod for schema validation

### Fonts
- Inter (sans-serif) for body text
- Playfair Display (serif) for headings
- Loaded via Google Fonts CDN

### Development Tools
- **Replit Vite Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Full type coverage across frontend, backend, and shared code