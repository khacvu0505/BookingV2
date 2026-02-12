import { getSubLocation } from "@/api/hotel.api";
import { setSecondaryLocation } from "@/features/hotel-list/hotelSlice";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./SubLocationHotel.style.scss";
import classNames from "classnames";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";

const SubLocationHotel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [params, setSearchParams] = useQueryParams();
  const { location: locationParam = "", subLocation: subLocationParam } =
    params;
  const [subLocationList, setSubLocationList] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleChooseSubLocation = (id) => {
    const isExisted = selected.includes(id);

    const data = isExisted
      ? [...selected].filter((item) => item !== id)
      : [...selected, id];
    setSelected(data);

    if (data?.length > 0) {
      setSearchParams({
        ...params,
        subLocation: data.join("-"),
      });
    } else {
      setSearchParams(
        cleanedObject({
          ...params,
          subLocation: "",
        })
      );
    }

    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (subLocationParam) {
      setSelected(subLocationParam.split("-").map(Number));
    } else {
      setSelected([]);
    }
  }, [subLocationParam]);

  useEffect(() => {
    if (!locationParam) {
      setSubLocationList([]);
      return;
    }
    getSubLocation(locationParam)
      .then((res) => {
        const data = res.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setSubLocationList(data);
        dispatch(setSecondaryLocation(data));
      })
      .catch(() => {
        setSubLocationList([]);
      });
  }, [locationParam]);

  if (subLocationList?.length === 0) return null;
  return (
    <div className="sub_location_hotel mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("HOTELS.NAVIGATION/LOCATION")}
      </p>
      <div className="sub_location_hotel_content">
        {subLocationList?.length > 0 &&
          subLocationList.map((deal, index) => (
            <div
              key={deal.id}
              className={classNames(
                "sub_location_hotel_content_item mb-16 lg:mb-10 md:mb-6",
                {
                  "sub_location_hotel_content_last-item":
                    (subLocationList.length === 1) === (index as any),
                }
              )}
            >
              <div className="form-checkbox d-flex items-center">
                {/* <input
                  type="checkbox"
                  value={deal.id}
                  checked={selected.includes(deal.id)}
                  onChange={() => handleChooseSubLocation(deal.id)}
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div> */}
                <Checkbox
                  value={deal.id}
                  checked={selected.includes(deal.id)}
                  onChange={() => handleChooseSubLocation(deal.id)}
                />
                <div className="text-16 lg:text-15 md:text-14 ml-10">
                  {deal.text}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubLocationHotel;
