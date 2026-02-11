# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server with HMR (opens browser automatically)
npm run build    # Production build
npm run lint     # ESLint check (zero warnings enforced)
npm run preview  # Preview production build
```

## Architecture Overview

This is a **React + Vite** booking platform (OKdimall) for hotels and tours, using:
- **State Management**: Redux Toolkit with slices in `/src/features/`
- **Routing**: React Router v6 in `/src/useRouteElement.jsx`
- **HTTP Client**: Axios with interceptors in `/src/utils/http.js`
- **Forms**: React Hook Form + Yup validation schemas in `/src/schemas/`
- **i18n**: i18next with translations in `/public/locales/{lang}/translation.json`

### Directory Structure

```
src/
├── api/          # API functions (auth, hotel, tours, booking, user)
├── apps/         # Reusable UI components (Input, Button, Header, etc.)
├── components/   # Feature-specific components
├── features/     # Redux slices (app, hotels, hotel, tours, tour, blogs)
├── screens/      # Main page components (preferred over /pages/)
├── hooks/        # Custom hooks (useFetchData, useMutate, useQueryParams)
├── schemas/      # Yup validation schemas
├── store/        # Redux store configuration
├── utils/        # Utilities (http.js, helpers)
└── constants/    # Application constants
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

All API requests include language and currency headers. Base URL: `https://extapi.okdimall.com/api`

```javascript
// Request format
http.post(URL, {
  page: number,
  pagesize: number,
  Entity: { filterCriteria },
  orders: string
})
```

Token refresh is handled automatically on 401 responses via interceptors.

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

`@/` maps to `src/` (configured in vite.config.js and jsconfig.json)

### Adding New Features

1. Create API function in `/src/api/`
2. Add Redux slice/actions in `/src/features/` if needed
3. Create screen component in `/src/screens/FeatureName/`
4. Add route in `/src/useRouteElement.jsx`
5. Add translation keys to `/public/locales/{lang}/translation.json`

### Form Implementation

```javascript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { schema } from '@/schemas/schemaName';

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
```
