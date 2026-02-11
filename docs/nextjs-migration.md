# OKdimall - Next.js Migration Document

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current Architecture](#2-current-architecture)
3. [Migration Feasibility](#3-migration-feasibility)
4. [Route Mapping](#4-route-mapping)
5. [Key Challenges & Solutions](#5-key-challenges--solutions)
6. [Migration Phases](#6-migration-phases)
7. [File-by-File Migration Guide](#7-file-by-file-migration-guide)
8. [Dependency Changes](#8-dependency-changes)
9. [Estimated Effort](#9-estimated-effort)

---

## 1. Project Overview

**Project**: OKdimall - Booking platform for hotels and tours
**Current Stack**: React 18 + Vite 4 + Redux Toolkit + React Router v6
**Target Stack**: Next.js 14+ (App Router)

### Current Stats

| Metric | Count |
|--------|-------|
| Screens (pages) | 33 |
| API modules | 11 |
| Redux slices | 7 |
| Custom hooks | 5 |
| Languages supported | 4 (vn, gb, kr, cn) |

---

## 2. Current Architecture

### 2.1 Entry Point

```
index.html
  └── src/main.jsx
        ├── React.Suspense (loading fallback)
        ├── Redux Provider (store)
        ├── BrowserRouter (React Router)
        └── App.jsx
              ├── HeaderTop
              ├── Header
              ├── WrapperComponent → useRouteElement() (all routes)
              ├── Footer
              ├── ToastContainer
              ├── AuthenModal
              ├── SocialWrap
              ├── OffCanvasLocation
              ├── OffCanvasDatePicker
              └── BottomSheet / BottomSheetTour (tablet only)
```

### 2.2 State Management

**Redux Store** (`src/store/store.js`):

| Slice | File | Purpose |
|-------|------|---------|
| `app` | `features/app/appSlice.js` | Auth, profile, currency, language, search |
| `hotels` | `features/hotel-list/hotelSlice.js` | Hotel listing, filtering, wishlist |
| `hotel` | `features/hotel-detail/hotelDetailSlice.js` | Single hotel details |
| `tours` | `features/tour-list/tourList.slice.js` | Tour listing |
| `tour` | `features/tour/tourSlice.js` | Single tour details |
| `blogs` | `features/blogs/blogSlice.js` | Blog listing |
| `hero` | `features/hero/findPlaceSlice.js` | Search/hero section |

**Critical**: `appSlice` initializes from `localStorage` at module load time:
```javascript
// src/features/app/appSlice.js
const initialState = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),  // localStorage
  profile: getProfile(),                                        // localStorage
  currentCurrency: formatCurrencyFromLanguage(...)              // localStorage
};
```

### 2.3 API Layer

**HTTP Client** (`src/utils/http.js`):
- Axios instance with class-based interceptors
- Base URL: `https://extapi.okdimall.com/api`
- Request interceptor: adds `Authorization`, `Lang`, `CurrencyCode` headers
- Response interceptor: handles token save on login, auto-refresh on 401
- Token refresh failure redirects via `window.location.href = "/login"`

**API Modules** (`src/api/`):
- `auth.api.js` - Login, register, logout, refresh token, forgot password
- `hotel.api.js` - Hotel search, details, rooms, availability
- `tours.api.js` - Tour search, details
- `booking.api.js` - Booking creation, payment, hold/release
- `user.api.js` - Profile, wishlist, booking history
- `blog.api.js` / `blogs.api.js` - Blog content
- `news.api.js` - News content
- `category.api.js` - Categories
- `destinations.api.js` - Destination data
- `promotion.api.js` - Promotions

### 2.4 Custom Hooks

| Hook | File | Purpose | Next.js Impact |
|------|------|---------|----------------|
| `useFetchData` | `hooks/useFetchData.js` | GET requests with loading/error/pagination | Client-only, works as-is |
| `useMutate` | `hooks/useMutateData.js` | POST/PUT with loading/error | Client-only, works as-is |
| `useQueryParams` | `hooks/useQueryParams.js` | URL query parsing (wraps `useSearchParams` from React Router) | **Must replace** with `next/navigation` |
| `useStorageListener` | `hooks/useStorageListener.js` | Cross-tab storage sync with polling | Client-only, needs `typeof window` guard |
| `useVerifyIsLogin` | `hooks/useVerifyIsLogin.js` | Auth check from Redux | Works as-is |

### 2.5 Authentication Flow

```
Login → API returns access_token
  → saveAccessTokenToLocalStorage(token)
  → Redux: setIsAuthenticated(true)
  → Axios interceptor attaches token to all requests

On 401 Response:
  → Attempt token refresh (POST /refresh-token)
  → Success: Retry original request with new token
  → Failure: Clear localStorage, redirect to /login

Logout:
  → Clear localStorage (access_token, profile)
  → Dispatch custom event "clearLocalStorage"
  → Redux: reset()
```

### 2.6 Browser API Usage

**localStorage** (used across entire app):
- `access_token` - Auth token
- `profile` - User profile JSON
- `current_currency` - Selected currency
- `current_language` - Selected language
- `hotel_search_history` - Recent hotel searches
- `tour_search_history` - Recent tour searches

**sessionStorage** (booking flow):
- `hold_code` - Server hold code (30-min timeout)
- `booking_id` - Created booking ID
- `info_booking` - Hotel booking details
- `tourBookingInfo` - Tour booking details
- `previous_item` - Last selected item
- `create_invoice` - Invoice flag
- `tax_include` - Tax flag

**window object**:
- `window.innerWidth` - Responsive breakpoint check (App.jsx:73) - **HYDRATION RISK**
- `window.scroll()` - Scroll to top on route change
- `window.addEventListener("storage")` - Cross-tab sync
- `window.dispatchEvent()` - Custom events for wishlist
- `window.location.href` - Auth failure redirect (http.js:157)

**document object**:
- `document.addEventListener("setWishlistInfo")` - Hotel wishlist events
- `document.addEventListener("setWishlistTourInfo")` - Tour wishlist events

### 2.7 Internationalization

**Setup** (`src/i18n.js`):
- i18next + HTTP Backend + Browser Language Detector
- Translation files: `/public/locales/{lang}/translation.json`
- Languages: `["vn", "gb", "kr", "cn"]`, default: `"vn"`
- Usage: `const { t } = useTranslation()`

### 2.8 External Scripts

- Zalo SDK: `<script src="https://sp.zalo.me/plugins/sdk.js"></script>`
- Google Fonts: Be Vietnam Pro (loaded via `<link>`)

---

## 3. Migration Feasibility

### 3.1 Compatibility Matrix

| Feature | Compatible | Effort | Notes |
|---------|-----------|--------|-------|
| React components | Yes | Low | Add `"use client"` directive |
| Redux Toolkit | Yes | Low | Wrap in client provider |
| Axios + interceptors | Yes | Low | Client-side only |
| React Hook Form + Yup | Yes | None | Works as-is |
| i18next | Yes | Low | Keep HTTP backend or upgrade to next-i18next |
| SASS/Bootstrap | Yes | None | Native Next.js support |
| Swiper/Slick | Yes | None | Client components |
| react-helmet-async | **Replace** | Low | Use Next.js `metadata` API |
| React Router v6 | **Replace** | Medium | Convert to App Router file-based routing |
| react-lazy-load-image | Yes | None | Or use `next/image` for optimization |
| lightgallery | Yes | Low | Client component |
| AOS (animations) | Yes | Low | Client component |
| react-toastify | Yes | None | Client component |
| sweetalert2 | Yes | None | Client component |

### 3.2 Benefits After Migration

| Benefit | Impact |
|---------|--------|
| **SSR for SEO** | Hotel/tour pages indexed by search engines with full content |
| **Faster initial load** | Server-rendered HTML, automatic code splitting |
| **Image optimization** | `next/image` with lazy loading, WebP, responsive sizes |
| **Font optimization** | `next/font` for Be Vietnam Pro (no layout shift) |
| **Metadata API** | Dynamic SEO tags per page without react-helmet |
| **Middleware** | Auth checks at edge, before page loads |
| **API Routes** | Optional backend proxy, better security |
| **Static generation** | Blog/news pages can be statically generated |

---

## 4. Route Mapping

### Current Routes → Next.js App Router

```
React Router Path                    → Next.js App Directory
─────────────────────────────────────────────────────────────
/                                    → app/page.jsx
/hotels                              → app/hotels/page.jsx
/hotels/:slug                        → app/hotels/[slug]/page.jsx
/tour                                → app/tour/page.jsx
/tour/:slug                          → app/tour/[slug]/page.jsx
/booking                             → app/booking/page.jsx
/booking-hotel/:id                   → app/booking-hotel/[id]/page.jsx
/booking-tour                        → app/booking-tour/page.jsx
/booking-tour/:id                    → app/booking-tour/[id]/page.jsx
/addon-services                      → app/addon-services/page.jsx
/addon-services-tour                 → app/addon-services-tour/page.jsx
/news                                → app/news/page.jsx
/news/:slug                          → app/news/[slug]/page.jsx
/blogs                               → app/blogs/page.jsx
/destinations                        → app/destinations/page.jsx
/promotions                          → app/promotions/page.jsx
/about                               → app/about/page.jsx
/contact                             → app/contact/page.jsx
/privacy-policy                      → app/privacy-policy/page.jsx
/privacy-policies                    → app/privacy-policies/page.jsx
/contact-us-form-submits             → app/contact-us-form-submits/page.jsx
/dispute-resolution-mechanism        → app/dispute-resolution-mechanism/page.jsx
/login                               → app/(auth)/login/page.jsx
/signup                              → app/(auth)/signup/page.jsx
/profile/information                 → app/(protected)/profile/information/page.jsx
/profile/wishlist                    → app/(protected)/profile/wishlist/page.jsx
/profile/booking-history-hotel       → app/(protected)/profile/booking-history-hotel/page.jsx
/profile/booking-history-tour        → app/(protected)/profile/booking-history-tour/page.jsx
/profile/booking-history/:id         → app/(protected)/profile/booking-history/[id]/page.jsx
/profile/booking-history-tour/:id    → app/(protected)/profile/booking-history-tour/[id]/page.jsx
/profile/change-password             → app/(protected)/profile/change-password/page.jsx
*                                    → app/not-found.jsx
```

### Layout Structure

```
app/
├── layout.jsx              ← Root layout (Redux Provider, i18n, HeaderTop, Header, Footer, globals)
├── page.jsx                ← Home (lazy → can be server component)
├── not-found.jsx           ← 404 page
├── (auth)/
│   ├── layout.jsx          ← ProtectedRoute logic (redirect if logged in)
│   ├── login/page.jsx
│   └── signup/page.jsx
├── (protected)/
│   └── profile/
│       ├── layout.jsx      ← RejectedRoute logic + ProfileWrapper
│       ├── information/page.jsx
│       ├── wishlist/page.jsx
│       ├── booking-history-hotel/page.jsx
│       ├── booking-history-tour/page.jsx
│       ├── booking-history/[id]/page.jsx
│       ├── booking-history-tour/[id]/page.jsx
│       └── change-password/page.jsx
├── hotels/
│   ├── page.jsx
│   └── [slug]/page.jsx
├── tour/
│   ├── page.jsx
│   └── [slug]/page.jsx
├── booking/page.jsx
├── booking-hotel/[id]/page.jsx
├── booking-tour/
│   ├── page.jsx
│   └── [id]/page.jsx      ← booking-tour/:id (BookingTourSuccess)
├── news/
│   ├── page.jsx
│   └── [slug]/page.jsx
├── blogs/page.jsx
├── destinations/page.jsx
├── promotions/page.jsx
├── about/page.jsx
├── contact/page.jsx
├── addon-services/page.jsx
├── addon-services-tour/page.jsx
├── privacy-policy/page.jsx
├── privacy-policies/page.jsx
├── contact-us-form-submits/page.jsx
└── dispute-resolution-mechanism/page.jsx
```

### Route Guards → Next.js Middleware

```javascript
// middleware.js (project root)
import { NextResponse } from "next/server";

const protectedPaths = ["/profile"];
const authPaths = ["/login", "/signup"];

export function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes: redirect to /login if not authenticated
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Auth routes: redirect to / if already authenticated
  if (authPaths.some((p) => pathname.startsWith(p))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/signup"],
};
```

---

## 5. Key Challenges & Solutions

### 5.1 Hydration Mismatch: `window.innerWidth` in Render

**Problem** (`src/App.jsx:73`):
```javascript
const isTablet = window.innerWidth < BREAKPOINT_XL; // Runs during render!
```

**Solution**: Use state + useEffect:
```javascript
"use client";

const [isTablet, setIsTablet] = useState(false);

useEffect(() => {
  const checkTablet = () => setIsTablet(window.innerWidth < BREAKPOINT_XL);
  checkTablet();
  window.addEventListener("resize", checkTablet);
  return () => window.removeEventListener("resize", checkTablet);
}, []);
```

### 5.2 Redux Initial State from localStorage

**Problem** (`src/features/app/appSlice.js`):
```javascript
const initialState = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()), // SSR: localStorage undefined
  profile: getProfile(),                                       // SSR: localStorage undefined
};
```

**Solution**: Initialize with safe defaults, hydrate on client:
```javascript
// appSlice.js - Safe initial state
const initialState = {
  isAuthenticated: false,
  profile: null,
  currentCurrency: DEFAULT_CURRENCY,
  // ...
};

// ClientHydration.jsx - Hydrate from localStorage after mount
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setProfile, setChangeCurrency } from "@/features/app/appSlice";
import { getAccessTokenFromLocalStorage, getProfile } from "@/utils/auth";

export default function ClientHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();
    if (token) {
      dispatch(setIsAuthenticated(true));
      dispatch(setProfile(getProfile()));
    }
    // hydrate currency, language, etc.
  }, []);

  return null;
}
```

### 5.3 Axios Token Refresh with `window.location.href`

**Problem** (`src/utils/http.js:157`):
```javascript
window.location.href = "/login"; // Not available in SSR
```

**Solution**: Use Next.js router for client-side redirect:
```javascript
// Option A: Keep window check (simplest)
if (typeof window !== "undefined") {
  window.location.href = "/login";
}

// Option B: Move to cookie-based auth (recommended for SSR)
// Store token in httpOnly cookie, check in middleware
```

### 5.4 Custom Document Events for Wishlist

**Problem** (`src/App.jsx:94, 150`):
```javascript
document.addEventListener("setWishlistInfo", function(e) { ... });
document.addEventListener("setWishlistTourInfo", function(e) { ... });
```

**Solution**: Keep in client component, or refactor to Redux actions:
```javascript
// Option A: Keep as-is in "use client" root layout component
// Option B (recommended): Replace with Redux dispatch
// Instead of: document.dispatchEvent(new CustomEvent("setWishlistInfo", { detail }))
// Use:        dispatch(toggleWishlist(detail))
```

### 5.5 useQueryParams Hook (React Router dependency)

**Problem** (`src/hooks/useQueryParams.js`):
```javascript
import { useSearchParams } from "react-router-dom"; // React Router
```

**Solution**: Replace with Next.js equivalent:
```javascript
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = Object.fromEntries(searchParams.entries());

  const setSearchParams = (newParams) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });
    router.push(`${pathname}?${urlParams.toString()}`);
  };

  return [params, setSearchParams];
}
```

### 5.6 useStorageListener Hook

**Problem**: Accesses `localStorage`/`sessionStorage` at initialization, patches `storage.setItem`, uses `window` events.

**Solution**: Add SSR guard:
```javascript
"use client";

const useStorageListener = (key, storageType = "sessionStorage") => {
  const [value, setValue] = useState(null); // Safe default for SSR

  useEffect(() => {
    // Hydrate from storage after mount
    const storage = storageType === "localStorage" ? localStorage : sessionStorage;
    const rawValue = storage.getItem(key);
    setValue(rawValue !== null ? JSON.parse(rawValue) : null);
  }, []);

  // ... rest of hook logic stays in useEffect (already client-only)
};
```

### 5.7 react-helmet-async → Next.js Metadata

**Problem**: Currently uses `react-helmet-async` for `<title>` and `<meta>` tags.

**Solution**: Use Next.js Metadata API:
```javascript
// Static metadata (per page)
export const metadata = {
  title: "Hotels - OKdimall",
  description: "Find the best hotels...",
};

// Dynamic metadata (for [slug] pages)
export async function generateMetadata({ params }) {
  const hotel = await fetchHotelBySlug(params.slug);
  return {
    title: `${hotel.name} - OKdimall`,
    description: hotel.description,
    openGraph: { images: [hotel.image] },
  };
}
```

### 5.8 i18n Strategy

**Option A - Minimal changes** (keep current setup):
- Keep i18next with HTTP backend
- All pages are client components
- No SEO benefit for different languages

**Option B - Next.js i18n routing** (recommended for SEO):
```
app/
├── [lang]/                    ← Language prefix in URL
│   ├── layout.jsx
│   ├── page.jsx               ← /vn, /gb, /kr, /cn
│   ├── hotels/page.jsx        ← /vn/hotels, /gb/hotels
│   └── ...
```

```javascript
// middleware.js - Language detection
const locales = ["vn", "gb", "kr", "cn"];
const defaultLocale = "vn";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = detectLocale(request) || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}
```

---

## 6. Migration Phases

### Phase 1: Project Setup (4 hours)

**Tasks:**
- [ ] Initialize Next.js 14 project with App Router
- [ ] Configure `next.config.js` (SASS, path aliases, image domains)
- [ ] Copy `jsconfig.json` paths (`@/` → `src/`)
- [ ] Setup environment variables (`.env.local`)
- [ ] Install all current dependencies
- [ ] Copy `/public` folder (locales, images, favicon)
- [ ] Copy `/src` folder structure

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "extapi.okdimall.com" },
      // Add other image domains used in the project
    ],
  },
};

module.exports = nextConfig;
```

### Phase 2: Root Layout & Providers (6 hours)

**Tasks:**
- [ ] Create `app/layout.jsx` (root layout)
- [ ] Setup Redux Provider as client component
- [ ] Setup i18n initialization
- [ ] Move global CSS imports (Bootstrap, Swiper, AOS, remixicon, etc.)
- [ ] Move Header, HeaderTop, Footer into layout
- [ ] Add global client components (ToastContainer, AuthenModal, SocialWrap, OffCanvas)
- [ ] Create `ClientHydration` component for localStorage → Redux sync
- [ ] Replace Zalo SDK `<script>` with `next/script`
- [ ] Replace Google Fonts with `next/font`

**Root Layout Example:**
```javascript
// app/layout.jsx
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import ReduxProvider from "@/providers/ReduxProvider";
import ClientLayout from "@/components/ClientLayout";

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "remixicon/fonts/remixicon.css";
import "@/styles/index.scss";
import "@/App.style.scss";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "OKdimall - Du lịch và trải nghiệm",
  description: "Booking platform for hotels and tours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={beVietnamPro.className}>
      <body>
        <ReduxProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
        <Script src="https://sp.zalo.me/plugins/sdk.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
```

### Phase 3: Page Migration (16 hours)

**Priority order** (high-traffic pages first):

1. **Home** (`/`) - Convert `screens/HomePage` → `app/page.jsx`
2. **Hotel List** (`/hotels`) - Convert `screens/HotelList` → `app/hotels/page.jsx`
3. **Hotel Detail** (`/hotels/:slug`) - Convert `screens/HotelDetail` → `app/hotels/[slug]/page.jsx`
4. **Tour List** (`/tour`) - Convert `screens/TourList` → `app/tour/page.jsx`
5. **Tour Detail** (`/tour/:slug`) - Convert `screens/TourDetail` → `app/tour/[slug]/page.jsx`
6. **Booking flow** - All booking-related pages
7. **Auth pages** - Login, Signup
8. **Profile pages** - All profile sub-routes
9. **Content pages** - News, Blogs, About, Contact, Destinations, etc.
10. **Static pages** - Privacy Policy, Dispute Resolution, etc.

**Per-page migration pattern:**
```javascript
// app/hotels/page.jsx
"use client";

import HotelList from "@/screens/HotelList";

export default function HotelsPage() {
  return <HotelList />;
}
```

### Phase 4: Fix Hydration Issues (8 hours)

**Tasks:**
- [ ] Fix `window.innerWidth` in App.jsx (move to useEffect)
- [ ] Fix `appSlice.js` localStorage initialization (safe defaults + client hydration)
- [ ] Guard all `localStorage`/`sessionStorage` access with `typeof window !== "undefined"`
- [ ] Guard all `window.addEventListener` / `document.addEventListener` in useEffect
- [ ] Fix `useStorageListener` hook for SSR safety
- [ ] Fix currency/language localStorage reads in App.jsx render
- [ ] Test all pages for hydration warnings in dev console

### Phase 5: Replace React Router (10 hours)

**Tasks:**
- [ ] Remove `react-router-dom` dependency
- [ ] Replace all `useNavigate()` → `useRouter()` from `next/navigation`
- [ ] Replace all `useParams()` → `useParams()` from `next/navigation`
- [ ] Replace all `useLocation()` → `usePathname()` + `useSearchParams()`
- [ ] Replace all `<Link to="...">` → `<Link href="...">`
- [ ] Replace `<Navigate to="...">` → `redirect()` or `useRouter().push()`
- [ ] Rewrite `useQueryParams` hook (see Section 5.5)
- [ ] Delete `src/useRouteElement.jsx`
- [ ] Create middleware for route guards (see Section 4)

**React Router → Next.js cheat sheet:**

| React Router | Next.js | Import |
|-------------|---------|--------|
| `useNavigate()` | `useRouter()` | `next/navigation` |
| `navigate("/path")` | `router.push("/path")` | - |
| `useParams()` | `useParams()` | `next/navigation` |
| `useLocation()` | `usePathname()` | `next/navigation` |
| `useSearchParams()` | `useSearchParams()` | `next/navigation` |
| `<Link to="/path">` | `<Link href="/path">` | `next/link` |
| `<Navigate to="/path" />` | `redirect("/path")` | `next/navigation` |
| `<Outlet />` | `{children}` in layout | - |

### Phase 6: Auth Migration (8 hours)

**Tasks:**
- [ ] Decide: keep localStorage tokens OR move to cookies
- [ ] If cookies: update login API handler to set httpOnly cookie
- [ ] If cookies: update Axios interceptor to read from cookie
- [ ] Create auth middleware for protected routes
- [ ] Update token refresh flow for Next.js context
- [ ] Fix `window.location.href = "/login"` → `router.push("/login")`
- [ ] Test full auth flow: login → protected page → token refresh → logout

### Phase 7: Optimize for SSR (Optional, 8 hours)

**Tasks:**
- [ ] Convert static pages to server components (About, Contact, Privacy Policy)
- [ ] Add `generateMetadata` for hotel/tour detail pages
- [ ] Replace `react-helmet-async` with Metadata API
- [ ] Consider `generateStaticParams` for blog/news pages
- [ ] Add `next/image` for key images (hotel cards, tour cards)
- [ ] Add `loading.jsx` files for streaming/suspense

### Phase 8: Testing & Cleanup (12 hours)

**Tasks:**
- [ ] Test all 33 routes
- [ ] Test booking flow end-to-end (hotel + tour)
- [ ] Test auth flow (login, signup, token refresh, logout, protected routes)
- [ ] Test i18n (all 4 languages)
- [ ] Test currency switching
- [ ] Test wishlist (add/remove)
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Test cross-tab storage sync
- [ ] Remove unused dependencies (react-router-dom, @vitejs/plugin-react-swc, vite)
- [ ] Remove old files (index.html, vite.config.js, useRouteElement.jsx)
- [ ] Run `next build` and fix any build errors
- [ ] Performance testing (Lighthouse)

---

## 7. File-by-File Migration Guide

### Files to DELETE after migration

| File | Reason |
|------|--------|
| `index.html` | Replaced by `app/layout.jsx` |
| `vite.config.js` | Replaced by `next.config.js` |
| `src/main.jsx` | Replaced by `app/layout.jsx` |
| `src/App.jsx` | Logic distributed to `app/layout.jsx` + `ClientLayout.jsx` |
| `src/useRouteElement.jsx` | Replaced by file-based routing |

### Files to MODIFY

| File | Changes |
|------|---------|
| `src/features/app/appSlice.js` | Safe initial state (no localStorage at import time) |
| `src/utils/http.js` | Guard `window.location.href`, consider cookie-based auth |
| `src/utils/auth.js` | Add `typeof window` guards for SSR |
| `src/hooks/useQueryParams.js` | Replace React Router with `next/navigation` |
| `src/hooks/useStorageListener.js` | Add SSR safety for initial state |
| `src/i18n.js` | Optional: adapt for Next.js i18n routing |
| `jsconfig.json` | Verify `@/` alias works with Next.js |
| `package.json` | Update scripts, add next, remove vite |

### Files to CREATE

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `app/layout.jsx` | Root layout |
| `app/page.jsx` | Home page |
| `app/not-found.jsx` | 404 page |
| `app/loading.jsx` | Global loading UI |
| `app/**/page.jsx` | All route pages (33 files) |
| `app/**/layout.jsx` | Layout for auth, profile groups |
| `middleware.js` | Route guards + i18n |
| `src/providers/ReduxProvider.jsx` | Client-side Redux provider wrapper |
| `src/components/ClientLayout.jsx` | Client-side layout components (Header, Footer, etc.) |
| `src/components/ClientHydration.jsx` | localStorage → Redux hydration |

---

## 8. Dependency Changes

### Remove

| Package | Reason |
|---------|--------|
| `vite` | Replaced by Next.js bundler |
| `@vitejs/plugin-react-swc` | Not needed (Next.js uses SWC natively) |
| `react-router-dom` | Replaced by Next.js App Router |
| `react-helmet-async` | Replaced by Next.js Metadata API |
| `i18next-browser-languagedetector` | Optional: replace with middleware-based detection |

### Add

| Package | Reason |
|---------|--------|
| `next` | Next.js framework |
| `eslint-config-next` | Next.js ESLint rules |

### Keep (no changes)

All other dependencies work with Next.js as-is:
`@reduxjs/toolkit`, `react-redux`, `axios`, `react-hook-form`, `@hookform/resolvers`, `yup`, `i18next`, `react-i18next`, `i18next-http-backend`, `bootstrap`, `sass`, `swiper`, `react-slick`, `slick-carousel`, `aos`, `classnames`, `lodash`, `moment`, `react-toastify`, `sweetalert2`, `lightgallery`, `photoswipe`, `react-photoswipe-gallery`, `react-select`, `react-tabs`, `react-rating`, `react-share`, `react-otp-input`, `react-input-range`, `react-loading-skeleton`, `react-modal-video`, `react-lazy-load-image-component`, `react-parallax`, `react-pro-sidebar`, `react-multi-date-picker`, `chart.js`, `react-chartjs-2`, `google-map-react`, `html-react-parser`, `query-string`, `prop-types`, `remixicon`, `@popperjs/core`, `@faker-js/faker`

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 9. Estimated Effort

| Phase | Hours | Priority |
|-------|-------|----------|
| 1. Project Setup | 4h | Required |
| 2. Root Layout & Providers | 6h | Required |
| 3. Page Migration (33 pages) | 16h | Required |
| 4. Fix Hydration Issues | 8h | Required |
| 5. Replace React Router | 10h | Required |
| 6. Auth Migration | 8h | Required |
| 7. SSR Optimization | 8h | Optional |
| 8. Testing & Cleanup | 12h | Required |
| **Total** | **72h** | - |

**Timeline**: ~2-3 weeks (1 developer) or ~1-2 weeks (2 developers)

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hydration mismatches | High | Medium | Phase 4 dedicated to fixing; test each page |
| Booking flow regression | Medium | High | Extensive e2e testing; sessionStorage logic unchanged |
| Auth token loss during migration | Low | High | Test auth flow thoroughly; keep localStorage approach initially |
| Third-party library SSR issues | Medium | Low | Use `"use client"` directive; most libraries are client-only |
| Performance regression | Low | Medium | Lighthouse before/after comparison |

### Recommended Approach

**Start with a "client-first" migration:**
1. Wrap every page component with `"use client"` initially
2. Get all 33 routes working in Next.js
3. Gradually convert suitable pages to server components
4. Add SSR data fetching where beneficial (hotel/tour detail pages for SEO)

This minimizes risk while still gaining Next.js benefits (routing, code splitting, image optimization, middleware).
