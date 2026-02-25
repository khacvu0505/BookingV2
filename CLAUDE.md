# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start Next.js development server
npm run build    # Production build (runs rm -rf .next first via prebuild)
npm run start    # Start production server
npm run lint     # ESLint check (ignored during builds via eslint.ignoreDuringBuilds)
```

No test framework is configured. There are no test commands.

## Architecture Overview

This is a **Next.js 15** booking platform (OKdimall) for hotels and tours, **migrated from Vite + React Router to Next.js App Router**. The migration is incomplete — a React Router compatibility layer exists at `src/lib/router-compat.tsx` and is aliased via webpack so that existing `react-router-dom` imports resolve to Next.js navigation equivalents (`useNavigate`, `useLocation`, `useParams`, `Link`, `Navigate`).

### Tech Stack

- **Framework**: Next.js 15 with App Router, React 18, TypeScript (strict: false)
- **State Management**: Redux Toolkit (`src/features/` slices, `src/store/`)
- **Data Fetching**: Axios (client-side `src/utils/http.ts`) + React Query (`@tanstack/react-query`) + custom hooks
- **Forms**: React Hook Form + Yup (`src/schemas/`)
- **i18n**: i18next — languages: `vn`, `gb`, `kr`, `cn` — translations at `public/locales/{lang}/translation.json`
- **Styling**: SCSS + Bootstrap 5
- **Path alias**: `@/` → `src/` (tsconfig + next.config)

### Key Architectural Patterns

**Page rendering pattern**: App Router pages in `app/` are thin wrappers that render screen components from `src/screens/`. All screen components are client-side (`"use client"`). Server-side data fetching uses `src/lib/server-fetch.ts` (native `fetch` with ISR caching, default 300s revalidation).

**Client-side provider stack** (`app/layout.tsx` → `ClientProvider`): QueryClientProvider → Redux Provider → Suspense → ClientLayout (loaded via `dynamic` with `ssr: false`). Bootstrap JS is also loaded client-side only.

**Dual HTTP clients**:
- Client-side: Axios singleton in `src/utils/http.ts` with interceptors that auto-attach `Lang`/`CurrencyCode` headers and handle 401 token refresh
- Server-side: `src/lib/server-fetch.ts` uses native `fetch` with hardcoded `Lang: "vi"` and `CurrencyCode: "VND"`

**API request pattern** (client-side POST): Most list endpoints use `http.post(URL, { page, pagesize, Entity: { ...filters }, orders })`.

**Auth flow**: Tokens stored in localStorage (`access_token`). Middleware (`middleware.ts`) checks `access_token` cookie for protected routes (`/profile/*`, `/booking/*`, `/addon-services/*`) and redirects unauthenticated users to `/login`. Auth pages redirect authenticated users to `/`.

**Booking flow session storage keys**: `hold_code`, `booking_id`, `info_booking`, `info_booking_tour`.

### Redux Store Shape

| Store Key | Slice File | Purpose |
|-----------|-----------|---------|
| `app` | `features/app/appSlice` | Auth, profile, currency, language, search params |
| `hotels` | `features/hotel-list/hotelSlice` | Hotel listing, filtering, pagination |
| `hotel` | `features/hotel-detail/hotelDetailSlice` | Active hotel detail (room selection) |
| `tours` | `features/tour-list/tourList.slice` | Tour listing, filtering, pagination |
| `tour` | `features/tour/tourSlice` | Tour booking (prices, addons, dates) |
| `blogs` | `features/blogs/blogSlice` | Blog filters (region, category, keyword) |
| `hero` | `features/hero/findPlaceSlice` | Hero tab state (Hotels vs Tours) |

### Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|------|---------|
| `useFetchData(funcFetch, params)` | Returns `[data, isLoading, totalPage, refetchData]`, auto re-fetches on param change |
| `useMutate(funcMutate)` | Returns `[mutate, data, isLoading, error]` for POST/PUT operations |
| `useQueryParams()` | URL query param parsing synced with Next.js navigation |
| `useStorageListener(key)` | Cross-tab + same-tab storage change listener with debouncing |
| `useVerifyIsLogin()` | Auth check from Redux store |

### Adding New Features

1. API function in `src/api/`
2. Redux slice in `src/features/` if needed
3. Screen component in `src/screens/FeatureName/`
4. App Router page in `app/feature-name/page.tsx` rendering the screen
5. Translation keys in `public/locales/{lang}/translation.json`

### Important Config Notes

- `reactStrictMode: false` in next.config
- ESLint errors are **ignored during builds** (`eslint.ignoreDuringBuilds: true`)
- Webpack aliases: `react-router-dom` → `src/lib/router-compat.tsx`, `/images/{home,HotelList,HotelDetail,Profile}` → `public/images/`
- Sass deprecation warnings silenced: `legacy-js-api`, `import`, `global-builtin`
- Security headers (CSP, HSTS, X-Frame-Options) configured in `next.config.mjs`
- `NEXT_PUBLIC_API_BASE_URL` env var points to `https://extapi.okdimall.com/api`
