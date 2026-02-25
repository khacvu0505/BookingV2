import React, { useMemo, useState } from "react";
import HotelList from "./HotelList";
import { getRecommendHotels } from "@/api/hotel.api";

import RecommentIcon1 from "./components/RecommentIcon1";
import RecommentIcon2 from "./components/RecommentIcon2";
import RecommentIcon3 from "./components/RecommentIcon3";
import RecommentIcon4 from "./components/RecommentIcon4";
import RecommentIcon5 from "./components/RecommentIcon5";
import TabRecomment from "@/components/TabRecomment";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/query-keys";

const RecommentHotel = ({ initialHotels }: { initialHotels?: any[] }) => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState(3);

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

  const { data: recommendHotels = [] } = useQuery({
    queryKey: hotelKeys.recommended(activeType),
    queryFn: async () => {
      const res = await getRecommendHotels({ type: activeType });
      return res.data ?? [];
    },
    initialData: activeType === 3 && initialHotels?.length ? initialHotels : undefined,
  });

  const handleRecommentItem = (value: any) => {
    setActiveType(value);
  };

  return (
    <div>
      <TabRecomment
        handleRecommentItem={handleRecommentItem}
        defaultActive={3}
        listTabs={listRecommendLabel}
      />

      <HotelList hotels={recommendHotels} />
    </div>
  );
};

export default RecommentHotel;
