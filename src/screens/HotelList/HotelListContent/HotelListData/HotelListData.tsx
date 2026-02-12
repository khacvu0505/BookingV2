import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import HotelItem from "./HotelItem";

import "./HotelListData.style.scss";
import { useTranslation } from "react-i18next";

interface HotelListDataProps {
  hotels: any[];
}

const HotelListData = ({ hotels }: HotelListDataProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = (event: any) => {
      navigate("/", { replace: true });
    };

    // eslint-disable-next-line no-undef
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  if (hotels.length === 0) {
    return (
      <p className="text-16 lg:text-15 md:text-14 text-neutral-800 text-center mt-30 md:mt-20 pb-30 md:pb-20">
        {t("HOTELS.NOT_FOUND")}
      </p>
    );
  }
  return (
    <div className="mt-24 row">
      {hotels?.length > 0 &&
        hotels.map((item, idx) => <HotelItem key={idx} item={item} />)}
    </div>
  );
};

export default HotelListData;
