# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start Next.js development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## Architecture Overview

This is a **Next.js 15** booking platform (OKdimall) for hotels and tours, migrated from Vite + React Router to Next.js App Router. Uses:
- **Framework**: Next.js 15 with App Router (`/app/` directory)
- **State Management**: Redux Toolkit with slices in `/src/features/`
- **Routing**: Next.js App Router (with React Router compatibility layer in `/src/lib/router-compat.tsx`)
- **HTTP Client**: Axios with interceptors in `/src/utils/http.ts` (client-side), `fetch` in `/src/lib/server-fetch.ts` (server-side SSR)
- **Forms**: React Hook Form + Yup validation schemas in `/src/schemas/`
- **i18n**: i18next with translations in `/public/locales/{lang}/translation.json`
- **Styling**: SCSS + Bootstrap

### Directory Structure

```
app/                  # Next.js App Router pages
├── (auth)/           # Auth pages (login, signup)
├── (protected)/      # Authenticated pages (profile, bookings)
├── hotels/           # Hotel listing and detail ([slug])
├── tour/             # Tour listing and detail ([slug])
├── news/             # News listing and detail ([slug])
├── blogs/            # Blog listing
├── booking/          # Booking flows (hotel, tour)
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── not-found.tsx     # 404 page

src/
├── api/              # API functions (auth, hotel, tours, booking, user, blogs)
├── components/       # All UI components (reusable + feature-specific)
│   ├── Booking/      # BookingDetailPage, BookingHistoryList, BookingSuccessPage, CancelBookingModal, MyBookingPage
│   ├── Form/         # Input, Select, TextArea, Checkbox, DateSearch, CustomCalendar, GuestSearch
│   ├── OffCanvas/    # OffCanvasComponent, OffCanvasHeaderSearch, OffCanvasHotelDetailMobile, BottomSheet
│   ├── ratings/      # Rating, RatingInCard, RatingModal, RatingSvg
│   ├── Search/       # SearchAll, SearchInput, MasterSearch, HeaderTop
│   ├── Sidebar/      # SidebarDetail, SidebarProfile, SidebarRight, SidebarRightTour
│   ├── Skeleton/     # SkeletonCard, SkeletonHeader, SkeletonItem, SkeletonList, SkeletonReview
│   ├── Wishlist/     # WishlistContent, WishlistItemComponent
│   └── ...           # Other ungrouped components (Button, Header, CardItem, etc.)
├── features/         # Redux slices (app, hotels, hotel, tours, tour, blogs)
├── screens/          # Legacy page components (used by App Router pages)
├── hooks/            # Custom hooks (useFetchData, useMutate, useQueryParams)
├── lib/              # Next.js utilities (server-fetch.ts, router-compat.tsx)
├── schemas/          # Yup validation schemas
├── store/            # Redux store configuration
├── styles/           # Global SCSS styles
├── types/            # TypeScript type definitions
├── utils/            # Utilities (http.ts, helpers)
├── data/             # Static data
└── constants/        # Application constants
```

### Key Redux Slices

| Slice | Purpose |
|-------|---------|
| `appSlice` | Global state (auth, profile, currency, language) |
| `hotelSlice` | Hotel listing and filtering |
| `hotelDetailSlice` | Single hotel details |
| `toursSlice` | Tour listing |
| `tourSlice` | Single tour details |

### API Pattern

All API requests include language and currency headers. Base URL is configured via `NEXT_PUBLIC_API_BASE_URL` env variable.

**Client-side (Axios):**
```javascript
http.post(URL, {
  page: number,
  pagesize: number,
  Entity: { filterCriteria },
  orders: string
})
```

**Server-side (SSR with caching):**
```typescript
import { serverFetch } from "@/lib/server-fetch";

// Default: cached for 300s (ISR)
const data = await serverFetch("/endpoint");

// Custom revalidation
const data = await serverFetch("/endpoint", { revalidate: 600 });

// No cache (user-specific data)
const data = await serverFetch("/endpoint", { revalidate: false });
```

Token refresh is handled automatically on 401 responses via Axios interceptors (client-side).

### Environment Variables

Configured in `.env`:
```
NEXT_PUBLIC_API_BASE_URL=https://extapi.okdimall.com/api
```

### Custom Hooks

- `useFetchData(funcFetch, params)` - API calls with loading/error states, returns `[data, isLoading, totalPage, refetchData]`
- `useMutate(funcMutate)` - POST/PUT operations, returns `[mutate, data, isLoading, error]`
- `useQueryParams()` - URL query parameter parsing and syncing
- `useStorageListener(key)` - Listen to storage changes via custom events

### Booking Flow Storage Keys

Session storage keys used during booking:
- `hold_code` - Server hold code (30-min timeout)
- `booking_id` - Created booking ID
- `info_booking` / `info_booking_tour` - Booking details

### Internationalization

Supported languages: Vietnamese (vn), English (gb), Korean (kr), Chinese (cn)

```javascript
const { t } = useTranslation();
return <p>{t("HOTEL_BOOKING.PAYMENT_METHOD")}</p>
```

### Path Aliases

`@/` maps to `src/` (configured in `next.config.mjs` and `tsconfig.json`)

### Adding New Features

1. Create API function in `/src/api/`
2. Add Redux slice/actions in `/src/features/` if needed
3. Create screen component in `/src/screens/FeatureName/`
4. Add App Router page in `/app/feature-name/page.tsx` that renders the screen component
5. For SSR data, add server fetch function in `/src/lib/server-fetch.ts`
6. Add translation keys to `/public/locales/{lang}/translation.json`

### Form Implementation

```javascript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { schema } from '@/schemas/schemaName';

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
```

### Next.js Config Notes

- `sassOptions.silenceDeprecations` suppresses Sass `@import` and `global-builtin` deprecation warnings
- `devIndicators: false` is applied only in production via conditional spread
- Webpack aliases provide React Router compatibility layer and Vite-style `/images/*` imports
