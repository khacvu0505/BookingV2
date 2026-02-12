"use client";

import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import Header from "@/components/Header";
import HeaderTop from "@/components/Search/HeaderTop";
import Footer from "@/screens/HomePage/Footer";
import AuthenModal from "@/components/authen/AuthenModal";
import SocialWrap from "@/components/SocialWrap";
import {
  OffCanvasDatePicker,
  OffCanvasLocation,
} from "@/components/Search/MasterSearch/OffCanvasMasterSearch";
import BottomSheet from "@/components/OffCanvas/BottomSheet";
import BottomSheetTour from "@/components/OffCanvas/BottomSheet/BottomSheetTour";

import { getProfile } from "@/utils/auth";
import { saveFavourite, removeFavourite } from "@/api/user.api";
import {
  updateHotelList,
  updateHotelRecommendList,
} from "@/features/hotel-list/hotelSlice";
import { updateTourList } from "@/features/tour-list/tourList.slice";
import {
  BREAKPOINT_XL,
  current_currency,
  current_language,
} from "@/utils/constants";
import { getFromLocalStorage, removeLocalStorage } from "@/utils/utils";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const refSignInModal = useRef<{ setIsVisible: (v: boolean) => void } | null>(null);
  const pathname = usePathname();
  const [isTablet, setIsTablet] = useState(false);
  const dispatch = useDispatch();

  // Check responsive breakpoint
  useEffect(() => {
    const checkTablet = () => setIsTablet(window.innerWidth < BREAKPOINT_XL);
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  // Validate localStorage values
  useEffect(() => {
    const language = getFromLocalStorage(current_currency);
    const currency = getFromLocalStorage(current_language);
    if (typeof language !== "object") {
      removeLocalStorage(current_currency);
    }
    if (typeof currency !== "object") {
      removeLocalStorage(current_language);
    }
  }, []);

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Hotel wishlist event listener
  useEffect(() => {
    const handler = function (e: CustomEvent<{ wishListID: number; supplierCode: string; listedPrice?: number; finalPrice?: number; isRecommend?: boolean }>) {
      const profile = getProfile();

      if (!profile) {
        refSignInModal.current?.setIsVisible(true);
        return;
      }
      if (e.detail.wishListID === 0) {
        saveFavourite({
          supplierCode: e?.detail?.supplierCode || "",
          listedPrice: e?.detail?.listedPrice || 0,
          finalPrice: e?.detail?.finalPrice || 0,
        }).then((res: { success?: boolean; data?: unknown }) => {
          if (res?.success) {
            if (e.detail.isRecommend) {
              dispatch(
                updateHotelRecommendList({
                  wishListID: res?.data,
                  supplierCode: e?.detail?.supplierCode,
                })
              );
              return;
            }
            dispatch(
              updateHotelList({
                wishListID: res?.data,
                supplierCode: e?.detail?.supplierCode,
              })
            );
          }
        });
      } else {
        removeFavourite(String(e.detail.wishListID)).then(() => {
          if (e.detail.isRecommend) {
            dispatch(
              updateHotelRecommendList({
                wishListID: 0,
                supplierCode: e?.detail?.supplierCode,
              })
            );
            return;
          }
          dispatch(
            updateHotelList({
              wishListID: 0,
              supplierCode: e?.detail?.supplierCode,
            })
          );
        });
      }
    };

    document.addEventListener("setWishlistInfo", handler as EventListener);
    return () => document.removeEventListener("setWishlistInfo", handler as EventListener);
  }, [dispatch]);

  // Tour wishlist event listener
  useEffect(() => {
    const handler = function (e: CustomEvent<{ wishListID: number; supplierCode: string; listedPrice?: number; finalPrice?: number; isRecommend?: boolean }>) {
      const profile = getProfile();

      if (!profile) {
        refSignInModal.current?.setIsVisible(true);
        return;
      }
      if (e.detail.wishListID === 0) {
        saveFavourite({
          supplierCode: e?.detail?.supplierCode || "",
          listedPrice: e?.detail?.listedPrice || 0,
          finalPrice: e?.detail?.finalPrice || 0,
        }).then((res: { success?: boolean; data?: unknown }) => {
          if (res?.success) {
            dispatch(
              updateTourList({
                wishListID: res?.data,
                supplierCode: e?.detail?.supplierCode,
              })
            );
          }
        });
      } else {
        removeFavourite(String(e.detail.wishListID)).then(() => {
          dispatch(
            updateTourList({
              wishListID: 0,
              supplierCode: e?.detail?.supplierCode,
            })
          );
        });
      }
    };

    document.addEventListener("setWishlistTourInfo", handler as EventListener);
    return () => document.removeEventListener("setWishlistTourInfo", handler as EventListener);
  }, [dispatch]);

  return (
    <>
      <HeaderTop />
      <Header />
      <main>{children}</main>
      <Footer />

      <ToastContainer limit={1} />
      <AuthenModal ref={refSignInModal} />
      <SocialWrap />
      <OffCanvasLocation />
      <OffCanvasDatePicker />

      {isTablet && (
        <>
          <BottomSheet />
          <BottomSheetTour />
        </>
      )}
    </>
  );
}
