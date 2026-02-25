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
- **Data Fetching**: Axios (client-side) + React Query (`@tanstack/react-query`) + custom hooks
- **Routing**: Next.js App Router (with React Router compatibility layer in `/src/lib/router-compat.tsx`)
- **HTTP Client**: Axios with interceptors in `/src/utils/http.ts` (client-side), `fetch` in `/src/lib/server-fetch.ts` (server-side SSR)
- **Forms**: React Hook Form + Yup validation schemas in `/src/schemas/`
- **i18n**: i18next with translations in `/public/locales/{lang}/translation.json`
- **Styling**: SCSS + Bootstrap 5

### Directory Structure

```
app/                              # Next.js App Router pages
├── (auth)/                       # Auth group
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (protected)/                  # Authenticated pages
│   └── profile/
│       ├── layout.tsx
│       ├── information/page.tsx
│       ├── change-password/page.tsx
│       ├── wishlist/page.tsx
│       ├── booking-history/page.tsx
│       ├── booking-history/[id]/page.tsx
│       ├── booking-history-hotel/page.tsx
│       ├── booking-history-tour/page.tsx
│       └── booking-history-tour/[id]/page.tsx
├── hotels/                       # Hotel listing and detail
│   ├── page.tsx
│   └── [slug]/page.tsx
├── tour/                         # Tour listing and detail
│   ├── page.tsx
│   └── [slug]/page.tsx
├── booking/page.tsx              # General booking
├── booking-hotel/[id]/page.tsx   # Hotel booking by ID
├── booking-tour/
│   ├── page.tsx                  # Tour booking listing
│   └── [id]/page.tsx             # Tour booking detail
├── addon-services/page.tsx       # Hotel addon services
├── addon-services-tour/page.tsx  # Tour addon services
├── news/                         # News listing and detail
│   ├── page.tsx
│   └── [slug]/page.tsx
├── blogs/page.tsx                # Blog listing
├── promotions/page.tsx           # Promotions
├── destinations/page.tsx         # Destinations
├── contact/page.tsx              # Contact page
├── contact-us-form-submits/page.tsx
├── privacy-policy/page.tsx
├── privacy-policies/page.tsx
├── dispute-resolution-mechanism/page.tsx
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page
├── error.tsx                     # Error boundary
└── not-found.tsx                 # 404 page

src/
├── api/                          # API functions (see API Reference below)
├── components/                   # All UI components (see Components below)
├── features/                     # Redux slices (see Redux Slices below)
├── screens/                      # Page-level screen components (used by App Router pages)
├── hooks/                        # Custom hooks (see Custom Hooks below)
├── lib/                          # Next.js utilities
│   ├── server-fetch.ts           # Server-side SSR fetch with caching
│   ├── query-client.ts           # React Query client setup
│   ├── query-keys.ts             # React Query key factory
│   └── router-compat.tsx         # React Router compatibility layer
├── schemas/                      # Yup validation schemas
│   ├── loginSchema.ts
│   ├── signUpSchema.ts
│   ├── changePasswordSchema.ts
│   ├── profileFormSchema.ts
│   ├── paymentSchema.ts
│   └── ratingSchema.ts
├── store/                        # Redux store
│   ├── store.ts                  # configureStore with all slices
│   └── hooks.ts                  # useAppDispatch, useAppSelector
├── styles/                       # Global SCSS styles
│   ├── index.scss
│   ├── info-booking-customer.scss
│   ├── loading-button.scss
│   ├── masonry-layout.scss
│   └── verify-otp.scss
├── types/                        # TypeScript type definitions
│   ├── types.ts
│   ├── index.ts
│   ├── scss.d.ts
│   └── vendor.d.ts
├── utils/                        # Utilities
│   ├── http.ts                   # Axios client with interceptors & token refresh
│   ├── auth.ts                   # Authentication utilities
│   ├── constants.ts              # Utility constants
│   ├── utils.tsx                 # General utilities (groupBy, formatters, etc.)
│   ├── handleAlert.tsx           # Alert handling (SweetAlert2)
│   ├── handleRenderMessageError.tsx
│   ├── handleRenderNoti.tsx      # Notification rendering (Toastify)
│   ├── handleSetDefaultBooking.ts
│   ├── isTextMatched.ts
│   ├── linkActiveChecker.ts
│   └── useWindowSize.ts          # Window size hook
├── data/                         # Static data (menus, mock data)
│   ├── mainMenuData.ts
│   ├── footerContent.ts
│   ├── hotels.ts, tours.ts, blogs.ts
│   ├── desinations.ts, tourCategories.ts
│   └── ... (activity, cars, cruise, flights, rentals, teamData, testimonialData)
├── constants/                    # Application constants
│   └── Booking.constant.ts
└── i18n.ts                       # i18next configuration
```

### Components Structure

```
src/components/
├── Booking/                      # Booking flows
│   ├── BookingDetailPage/
│   ├── BookingHistoryList/
│   ├── BookingSuccessPage/
│   ├── CancelBookingModal/
│   └── MyBookingPage/
├── Form/                         # Form controls
│   ├── Input/, Select/, TextArea/, Checkbox/
│   ├── DateSearch/, CustomCalendar/
│   └── GuestSearch/
├── Search/                       # Search features
│   ├── HeaderTop/                # Top header search bar
│   ├── MasterSearch/             # Main search with SearchBar, LocationSearch
│   │   ├── SearchBar/            # Full search bar with location
│   │   ├── SearchBarWithoutLocation/
│   │   └── OffCanvasMasterSearch/  # Mobile search drawers
│   ├── SearchAll/                # Global search (Hashtag, Regions)
│   └── SearchInput/
├── OffCanvas/                    # Offcanvas/drawer panels
│   ├── OffCanvasComponent/       # Reusable offcanvas wrapper (Bootstrap)
│   ├── OffCanvasHeaderSearch/    # Header search drawer
│   ├── OffCanvasHotelDetailMobile/  # Mobile hotel detail tabs
│   └── BottomSheet/              # Bottom sheet (sidebar right, tour)
├── Sidebar/                      # Sidebar panels
│   ├── SidebarDetail/            # Hotel detail sidebar (Policies, PropertyHighlights, ImageLibrary)
│   ├── SidebarRight/             # Hotel booking sidebar (BookNowButton, TotalPrice)
│   ├── SidebarRightTour/         # Tour booking sidebar
│   └── SidebarProfile/           # Profile page sidebar
├── Header/                       # Main header (MainMenu, MobileMenu, LanguageMegaMenu)
├── header-variants/              # Header variants (default-header, header-3)
├── hotel-list/                   # Hotel list page components
│   ├── hotel-list-v5/            # Active variant (Sidebar, TopHeaderFilter)
│   ├── sidebar/                  # Filter components (Price, Rating, Amenities, Map, etc.)
│   └── common/
├── ratings/                      # Rating components (Rating, RatingInCard, RatingModal, RatingSvg)
├── profile/                      # Profile management
│   ├── profile-form/             # Profile form + change-password, forgot-password
│   ├── sidebar/, properties/
│   ├── rating-modal/
│   ├── update-customer-receive/
│   └── cancel-booking-information-modal/
├── Wishlist/                     # WishlistContent, WishlistItemComponent
├── blog/                         # Blog components (blog-details, blog-sidebar)
├── promotion/                    # Promotion components (PromotionDetailModal, PromotionBanner)
├── AddonServicesPage/            # Addon services page
├── footer/                       # Footer variants (default, footer-2)
├── authen/, AuthenModal/         # Authentication modals
├── ClientLayout/                 # Client-side layout wrapper
├── PropertyHighlights/           # Property highlights with icons + map
├── MapComponent/                 # Google Map component
├── Review/                       # Review/comments display
├── Gallery/                      # Image gallery (LightGallery, PhotoSwipe)
├── RelatedHotels/                # Related hotels section
├── Skeleton/                     # Loading skeletons (Card, Header, Item, List, Review)
├── CardItem/                     # Reusable card component
├── Button/                       # Button components
├── Breadcrumb/                   # Breadcrumb navigation
├── Pagination/                   # Pagination component
├── Modal/                        # Modal wrapper
├── Tabs/, Tag/, TagComponent/    # Tab and tag UI
├── DropDown/, Dropdown2/         # Dropdown components
├── MetaComponent/                # SEO meta tags
├── ShowPrice/, PriceWithVND/     # Price display components
├── promotion-price/, PromotionPrice/  # Promotion pricing
├── PopularLocation/              # Popular locations section
├── StickyHeader/                 # Sticky header behavior
├── ErrorBoundary/                # React error boundary
├── LoadingPage/                  # Full-page loading
├── QnA/, ReturnPolicy/           # Info pages
├── ForgotPassword/, RegisterMember/
├── social-network/, SocialWrap/  # Social sharing
├── upload-file/                  # File upload
├── about/, block/, brand/, counter/, team/, testimonial/, Timelines/
└── common/                       # Shared components (LoginForm, SignUpForm, Seo, social)
```

### Screens Structure

```
src/screens/
├── HomePage/                     # Home (Carousel, Promotion, TopDestination, RecommentHotel, etc.)
├── HotelList/                    # Hotel listing (banner, content, navbar)
├── HotelDetail/                  # Hotel detail (amenities, overview, room list, surrounding)
├── TourList/                     # Tour listing (banner, content, navbar)
├── TourDetail/                   # Tour detail (overview, itinerary, tickets, helpful facts)
├── Booking/                      # Hotel booking (BookingOverview, TimeRemaining, VerifyOTPModal)
├── BookingTour/                  # Tour booking (similar to Booking)
├── BookingDetail/                # Hotel booking detail
├── BookingDetailTour/            # Tour booking detail
├── BookingSuccess/               # Hotel booking success (with invoice)
├── BookingTourSuccess/           # Tour booking success
├── AddonServices/                # Hotel addon services (AddonList, Services, ServiceDetail)
├── AddonServicesTour/            # Tour addon services
├── MyBookingHotel/               # Hotel booking history
├── MyBookingTour/                # Tour booking history
├── Blogs/, BlogDetail/           # Blog pages
├── News/                         # News page
├── Promotion/                    # Promotions page
├── Destinations/                 # Destinations page
├── Profile/, ChangePassword/     # Profile pages
├── Wishlist/                     # Wishlist page
├── LogIn/, SignUp/               # Auth pages
├── Contact/, ContactUsFormSubmit/  # Contact pages
├── About/                        # About page
├── PrivacyPolicy/, PrivacyPolicies/
├── DisputeResolutionMechanism/
└── NotFound/                     # 404 page
```

### Key Redux Slices

| Slice | Store Key | Purpose |
|-------|-----------|---------|
| `appSlice` | `app` | Global state: auth, profile, currency, language, search params |
| `hotelSlice` | `hotels` | Hotel listing, filtering, pagination, regions |
| `hotelDetailSlice` | `hotel` | Single hotel detail (active room selection) |
| `toursSlice` | `tours` | Tour listing, filtering, pagination, regions |
| `tourSlice` | `tour` | Single tour booking info (prices, addons, dates) |
| `blogSlice` | `blogs` | Blog listing filters (region, category, keyword) |
| `findPlaceSlice` | `hero` | Hero section tab state (Hotels vs Tours toggle) |

### API Reference

| File | Key Functions |
|------|--------------|
| `auth.api.ts` | `loginAccount`, `registerAccount`, `refreshToken`, `logout`, `verifyRegisterOTP`, `updatePassword`, `checkEmailExist` |
| `hotel.api.ts` | `getHotelList`, `getHotelBySlug`, `getRoomList`, `getHotelPolicies`, `getRelatedHotels`, `getRecommendHotels`, `getAddOnServices`, `getSearchLocation`, `getSearchGeneral`, `getVoteSupplier`, `getListComments`, `getImageLibrary` |
| `tours.api.ts` | `getTourBySlug`, `getTourPoliciesBySlug`, `getTourServices`, `getTourPrices`, `getCategoryByTourService`, `getTourListService` |
| `booking.api.ts` | `saveBooking`, `saveBookingTour`, `verifyOTP`, `sendOTP`, `getHoldBooking`, `getHoldBookingTour`, `getBookingOverview`, `getCartSummary`, `getCartTourSummary`, `getPaymentBooking`, `feedbackBooking` |
| `user.api.ts` | `getProfile`, `updateUserInfo`, `getBookingHistory`, `getBookingDetail`, `saveFavourite`, `removeFavourite`, `getFavouriteList`, `requestCancelBooking`, `forgotPassword` |
| `blogs.api.ts` | `getListCategory`, `getSearchBlogs`, `getRecentBlogs`, `getRecommendBlogs`, `getRelatedBlogs` |
| `blog.api.ts` | `getBlogDetail`, `getBlogRelated` |
| `news.api.ts` | `getNewsByRegion`, `getNewsRelated`, `getToursRecommend` |
| `category.api.ts` | `getRegions`, `getCountries`, `getMobileCode`, `getImageHome` |
| `destinations.api.ts` | `getDestinationByRegion`, `getPopularDestinations` |
| `promotion.api.ts` | `getSupplierType`, `getVoucherCategory`, `getPromotionList` |

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

| Hook | Parameters | Returns | Purpose |
|------|-----------|---------|---------|
| `useFetchData` | `funcFetch, params` | `[data, isLoading, totalPage, refetchData]` | API calls with loading/error states, auto re-fetches on param change |
| `useMutate` | `funcMutate` | `[mutate, data, isLoading, error]` | POST/PUT operations with loading/error management |
| `useQueryParams` | none | `[params, setSearchParams]` | URL query parameter parsing and syncing with Next.js navigation |
| `useStorageListener` | `key, storageType?` | `T \| null` | Listen to storage changes (cross-tab + same-tab) with debouncing |
| `useCountries` | none | `{ countryList }` | Fetch countries via React Query (label, value, mobileCode) |
| `useVerifyIsLogin` | none | `boolean` | Check authentication status from Redux store |

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

### Key Dependencies

| Category | Packages |
|----------|----------|
| Framework | Next.js 15.5, React 18.3, TypeScript 5.9 |
| State | Redux Toolkit 1.9, react-redux 8.1 |
| Data Fetching | axios 1.6, @tanstack/react-query 5.90 |
| Forms | react-hook-form 7.51, yup 1.4 |
| UI | Bootstrap 5.2, sass 1.69, remixicon 4.3 |
| Carousel/Gallery | swiper 8, react-slick 0.29, lightgallery 2.8, photoswipe 5.4 |
| i18n | i18next 23.16, react-i18next 15.1 |
| Notifications | sweetalert2 11.10, react-toastify 10.0 |
| Maps | google-map-react 2.2 |
| Other | moment 2.30, lodash 4.17, react-select 5.8, react-otp-input 3.1 |

### Adding New Features

1. Create API function in `/src/api/`
2. Add Redux slice/actions in `/src/features/` if needed
3. Create screen component in `/src/screens/FeatureName/`
4. Add App Router page in `/app/feature-name/page.tsx` that renders the screen component
5. For SSR data, use server fetch in `/src/lib/server-fetch.ts`
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
- Middleware (`middleware.ts`) handles auth/protected route guards
