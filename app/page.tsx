import type { Metadata } from "next";
import {
  fetchHomeImages,
  fetchVoucherCategories,
  fetchRecommendHotelsServer,
  fetchRegionsServer,
} from "@/lib/server-fetch";
import HomeClient from "@/screens/HomePage/HomeClient";
import type { HomePageData } from "@/screens/HomePage/HomeClient";

export const metadata: Metadata = {
  title: "OKdimall - Du lịch và trải nghiệm",
  description:
    "Đặt phòng khách sạn, resort, tour du lịch với giá tốt nhất tại OKdimall.",
};

export default async function HomePage() {
  const [homeImagesResult, vouchersResult, hotelsResult, regionsResult] =
    await Promise.allSettled([
      fetchHomeImages(),
      fetchVoucherCategories(),
      fetchRecommendHotelsServer(),
      fetchRegionsServer(),
    ]);

  const data: HomePageData = {
    homeImages:
      homeImagesResult.status === "fulfilled" ? homeImagesResult.value : null,
    vouchers:
      vouchersResult.status === "fulfilled" ? vouchersResult.value : null,
    recommendHotels:
      hotelsResult.status === "fulfilled" ? hotelsResult.value : null,
    regions:
      regionsResult.status === "fulfilled" ? regionsResult.value : null,
  };

  return <HomeClient data={data} />;
}
