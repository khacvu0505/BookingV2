import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import appSlice from "../features/app/appSlice";
import hotelSlice from "@/features/hotel-list/hotelSlice";
import hotelDetailSlice from "@/features/hotel-detail/hotelDetailSlice";
import blogsSlice from "@/features/blogs/blogSlice";
import toursSlice from "@/features/tour-list/tourList.slice";
import tourSlice from "@/features/tour/tourSlice";

export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    app: appSlice,
    hotels: hotelSlice,
    hotel: hotelDetailSlice,
    blogs: blogsSlice,
    tours: toursSlice,
    tour: tourSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
