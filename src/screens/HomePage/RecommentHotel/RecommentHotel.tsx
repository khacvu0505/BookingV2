import React, { useEffect, useMemo, useState } from "react";
import HotelList from "./HotelList";
import { fetchRecommendHotels } from "@/features/hotel-list/reducers";
import { setRecommendHotels } from "@/features/hotel-list/hotelSlice";
import { useAppDispatch } from "@/store/hooks";

import RecommentIcon1 from "./components/RecommentIcon1";
import RecommentIcon2 from "./components/RecommentIcon2";
import RecommentIcon3 from "./components/RecommentIcon3";
import RecommentIcon4 from "./components/RecommentIcon4";
import RecommentIcon5 from "./components/RecommentIcon5";
import TabRecomment from "@/components/TabRecomment";
import { useTranslation } from "react-i18next";

const RecommentHotel = ({ initialHotels }: { initialHotels?: any[] }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const listRecommendLabel = useMemo(
    () => [
      {
        id: 1,
        img: <RecommentIcon1 />,
        imgActive: <RecommentIcon1 isActive />,
        name: t("HOME.TOP_RESORTS"),
      },
      {
        id: 2,
        img: <RecommentIcon2 />,
        imgActive: <RecommentIcon2 isActive />,
        name: t("HOME.INTERNATION_BRAND"),
      },
      {
        id: 3,
        img: <RecommentIcon3 />,
        imgActive: <RecommentIcon3 isActive />,
        name: t("HOME.VIETNAM_BRAND"),
      },
      {
        id: 4,
        img: <RecommentIcon5 />,
        imgActive: <RecommentIcon5 isActive />,
        name: t("HOME.VILLAR_LUXURY"),
      },
      {
        id: 5,
        img: <RecommentIcon4 />,
        imgActive: <RecommentIcon4 isActive />,
        name: t("HOME.LUXURY_APARTMENT"),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (initialHotels && initialHotels.length > 0) {
      dispatch(setRecommendHotels(initialHotels));
    } else {
      const params = { type: 3 };
      dispatch(fetchRecommendHotels(params) as any);
    }
  }, []);

  const handleRecommentItem = (value: any) => {
    const params = { type: value };
    dispatch(fetchRecommendHotels(params) as any);
  };

  return (
    <div>
      <TabRecomment
        handleRecommentItem={handleRecommentItem}
        defaultActive={3}
        listTabs={listRecommendLabel}
      />

      <HotelList />
    </div>
  );
};

export default RecommentHotel;
