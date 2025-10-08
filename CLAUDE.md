# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Keizok** is an SNS marketing automation tool for e-commerce businesses. The application enables automatic generation of social media content from product information via EC site integration, with both automated and manual content generation modes.

## Development Commands

- **Development**: `npm run dev` - Start Next.js development server with Turbopack
- **Build**: `npm run build` - Create production build
- **Lint**: `npm run lint` - Run ESLint
- **Production**: `npm start` - Start production server

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives + shadcn/ui
- **Form Handling**: react-hook-form + zod
- **Icons**: lucide-react
- **Charts**: recharts
- **Date Handling**: date-fns
- **Analytics**: Vercel Analytics

## Architecture

### App Structure (Next.js App Router)

The app uses Next.js 15's App Router with a dashboard-centric layout:

- `app/layout.tsx` - Root layout with GeistMono font, analytics, and Japanese locale
- `app/page.tsx` - Landing page
- `app/dashboard/layout.tsx` - Dashboard layout with `SidebarProvider` and `AppSidebar`
- `app/dashboard/page.tsx` - Main dashboard with stats and content preview
- `app/dashboard/generate/` - Single content generation interface
- `app/dashboard/settings/` - EC site integration settings
- `app/dashboard/products/` - Product management
- `app/dashboard/gallery/` - Generated content gallery
- `app/dashboard/posts/` - Post management

### Component Organization

- `components/ui/` - Reusable shadcn/ui components (button, card, input, etc.)
- `components/app-sidebar.tsx` - Main navigation sidebar with menu items
- `components/theme-provider.tsx` - Theme provider wrapper

### Core Utilities

- `lib/utils.ts` - Contains `cn()` helper for Tailwind class merging
- `lib/mock-data.ts` - Mock product data for development
- `hooks/use-mobile.ts` - Mobile detection hook

### Path Aliases

- `@/*` maps to the root directory for clean imports

## Key Features & Pages

### 1. Dashboard (`/dashboard`)
- Overview stats (registered products, generated content, monthly generation count)
- Two main modes: Automatic generation (EC integration) and Single generation
- Recent content preview grid

### 2. EC Site Integration (`/dashboard/settings`)
- Connect to EC platforms (Shopify, BASE, STORES, MakeShop)
- Configure API keys for detailed product sync
- Auto-generation settings (frequency, content type, posting style)

### 3. Single Generation (`/dashboard/generate`)
- Three input methods:
  - Select from registered products
  - Upload product image
  - Input product URL
- Generate images or videos
- Custom prompt support (optional)
- Preview with download and Instagram posting options

### 4. Navigation Sidebar
- Client component using shadcn/ui Sidebar primitives
- Active route highlighting via `usePathname()`
- Menu items with icons and badges

## Styling Conventions

- Tailwind CSS v4 with `@tailwindcss/postcss`
- Geist Mono font (imported from `geist/font/mono`)
- Japanese language support (`lang="ja"`)
- Gradient accents on cards using `bg-gradient-to-*`
- Hover states with transitions for interactive elements
- Muted color scheme with primary accent color

## Build Configuration

The `next.config.mjs` has the following configurations:
- ESLint errors ignored during builds (`ignoreDuringBuilds: true`)
- TypeScript errors ignored during builds (`ignoreBuildErrors: true`)
- Image optimization disabled (`unoptimized: true`)

These settings suggest the project prioritizes rapid development/iteration. For production, consider re-enabling type checking and ESLint validation.

## Development Notes

- This project is synced with v0.app (Vercel's AI-powered design tool)
- Deployed on Vercel
- Uses loading states with skeleton components (`loading.tsx` files)
- Mock data is used for development (see `lib/mock-data.ts`)
- Client components marked with `"use client"` directive where needed
- Forms use controlled components with React state
