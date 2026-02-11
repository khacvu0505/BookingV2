import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import HotelItem from "./HotelItem";

import "./HotelListData.style.scss";
import { useTranslation } from "react-i18next";

const HotelListData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hotelList = useSelector((state) => state.hotels.hotels) || [];

  useEffect(() => {
    const handleBackNavigation = (event) => {
      navigate("/", { replace: true });
    };

    // eslint-disable-next-line no-undef
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  if (hotelList.length === 0) {
    return (
      <p className="text-16 lg:text-15 md:text-14 text-neutral-800 text-center mt-30 md:mt-20 pb-30 md:pb-20">
        {t("HOTELS.NOT_FOUND")}
      </p>
    );
  }
  return (
    <div className="mt-24 row">
      {hotelList?.length > 0 &&
        hotelList.map((item, idx) => <HotelItem key={idx} item={item} />)}
    </div>
  );
};

export default HotelListData;
