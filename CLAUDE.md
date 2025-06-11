# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

This is a Next.js 15 application using the App Router architecture:

- **Framework**: Next.js 15.3.3 with React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **App Directory**: Uses the modern App Router (`app/` directory structure)
  - `app/layout.tsx` - Root layout with font configuration
  - `app/page.tsx` - Home page component
  - `app/globals.css` - Global styles

The project uses ESLint with Next.js recommended configurations for code quality.