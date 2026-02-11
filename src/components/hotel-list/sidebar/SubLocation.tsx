import { getSubLocation } from "@/api/hotel.api";
import { setSecondaryLocation } from "@/features/hotel-list/hotelSlice";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SubLocation = () => {
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
    <>
      {subLocationList?.length > 0 &&
        subLocationList.map((deal) => (
          <div key={deal.id}>
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                value={deal.id}
                checked={selected.includes(deal.id)}
                onChange={() => handleChooseSubLocation(deal.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{deal.text}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SubLocation;
