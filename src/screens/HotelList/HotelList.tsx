import React, { lazy, useEffect, useState } from "react";
import BannerHotelList from "@/screens/HotelList/BannerHotelList";
// import Navbar from "@/screens/HotelList/Navbar";
import MetaComponent from "@/apps/MetaComponent";
import useQueryParams from "@/hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import {
  addDate,
  cleanedObject,
  clearSessionStorage,
  formatDate,
} from "@/utils/utils";
import {
  setHotels,
  setRequestingHotels,
} from "@/features/hotel-list/hotelSlice";
import { getHotelList } from "@/api/hotel.api";
import OffCanvasComponent from "@/apps/OffCanvasComponent";
import AccommodationType from "./Navbar/AccommodationType";
import RatingHotelList from "./Navbar/RatingHotelList";
import RatingByCustomer from "./Navbar/RatingByCustomer";
import LocationHotel from "./Navbar/LocationHotel";
import SubLocationHotel from "./Navbar/SubLocationHotel";

const Navbar = lazy(() => import("@/screens/HotelList/Navbar"));
const HotelListContent = lazy(() =>
  import("@/screens/HotelList/HotelListContent")
);

const metadata = {
  title: "Hotel List",
  description: "Travel & Tour",
};

const HotelList = () => {
  const [params, setSearchParams] = useQueryParams();
  const dispatch = useDispatch();

  const secondaryLocationList =
    useSelector((state) => state.hotels.secondaryLocation) || undefined;

  const {
    location: locationParam = "DN",
    checkIn: checkInParam = formatDate(new Date()),
    checkOut: checkOutParam = addDate(new Date(), 3),
    adults: adultsParam = 2,
    children: childrenParam = 0,
    room: roomParam = 1,
    minPrice: minPriceParam = 0,
    maxPrice: maxPriceParam = 20000000,
    page: pageParam = 1,
    pageSize: pageSizeParam = 10,
    keyword: keywordParam = "",
    rating: ratingParam,
    subLocation: subLocationParam,
    benefit: benefitsParam,
    position: positionParam,
    ratingByCustomer: ratingByCustomerParam,
    accommodationType: accommodationTypeParam,
    sort: sortParam = "",
  } = params || {};

  useEffect(() => {
    if (secondaryLocationList?.length === 0 || !secondaryLocationList) return;
    const subLocationArr = subLocationParam
      ? subLocationParam?.split("-").map(Number)
      : [];
    const subLocationParamFormatted =
      secondaryLocationList?.length > 0
        ? secondaryLocationList
            .filter((item) => subLocationArr.includes(item.id))
            .map((i) => i.value)
            .join(",")
        : undefined;
    const benefitsParamFormatted = benefitsParam
      ? benefitsParam.replaceAll("-", ",")
      : "";
    const accommodationTypeParamFormatted = accommodationTypeParam
      ? accommodationTypeParam.replaceAll("-", ",")
      : "";

    dispatch(setRequestingHotels());
    getHotelList(
      cleanedObject({
        RegionID: locationParam,
        FromDate: checkInParam,
        ToDate: checkOutParam,
        Adult: adultsParam,
        Children: childrenParam,
        TotalRoom: roomParam,
        Keyword: keywordParam,
        MinPrice: Number(minPriceParam),
        MaxPrice: Number(maxPriceParam),
        Rating: ratingParam,
        SecondaryLocation: subLocationParamFormatted,
        BenefitGroup: benefitsParamFormatted,
        DistanceCenter: positionParam,
        Votes: ratingByCustomerParam,
        CategoryType: accommodationTypeParamFormatted,
        Page: Number(pageParam) || 1,
        PageSize: Number(pageSizeParam) || 10,
        Orders: sortParam,
      })
    )
      .then((res) => {
        dispatch(
          setHotels({
            data: res.data,
            total: res.totalRecords,
            totalPages: res.totalPage,
          })
        );
      })
      .catch(() => {
        dispatch(
          setHotels({
            data: [],
            total: 0,
            totalPages: 0,
          })
        );
      });
    // }
  }, [
    accommodationTypeParam,
    adultsParam,
    benefitsParam,
    checkInParam,
    checkOutParam,
    childrenParam,
    dispatch,
    keywordParam,
    locationParam,
    maxPriceParam,
    minPriceParam,
    pageParam,
    pageSizeParam,
    positionParam,
    ratingByCustomerParam,
    ratingParam,
    roomParam,
    secondaryLocationList,
    subLocationParam,
    sortParam,
  ]);

  useEffect(() => {
    let defaultParams = {
      ...params,
    };
    if (!locationParam) {
      defaultParams = { ...defaultParams, location: "" };
    }
    if (!checkInParam) {
      defaultParams = { ...defaultParams, checkIn: formatDate(new Date()) };
    }
    if (!checkOutParam) {
      defaultParams = { ...defaultParams, checkOut: addDate(new Date(), 3) };
    }
    if (!pageParam) {
      defaultParams = { ...defaultParams, page: 1 };
    }
    if (!adultsParam) {
      defaultParams = { ...defaultParams, adults: 2 };
    }
    if (!childrenParam) {
      defaultParams = { ...defaultParams, children: 0 };
    }
    if (!roomParam) {
      defaultParams = { ...defaultParams, room: 1 };
    }
    setSearchParams(defaultParams);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scroll({ top: 0 });
  }, []);

  return (
    <div className="xl:mb-120 lg:mb-80 md:mb-30">
      <MetaComponent meta={metadata} />

      <BannerHotelList />
      <div className="container">
        <div className="row justify-end mt-md-5">
          <Navbar />
          <OffCanvasComponent
            id={"offcanvas-hotels-filter"}
            header={
              <div className="d-flex items-center">
                <img
                  src="/images/HotelList/icon-filter.png"
                  alt="filter hotel list okdimall"
                  className="navbar_head-icon"
                />
                <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 ml-8">
                  Bộ lọc thông tin khách sạn
                </p>
              </div>
            }
          >
            <div className="navbar_content w-fitcontent">
              <AccommodationType />
              <RatingHotelList />
              <RatingByCustomer />
              <LocationHotel />
              <SubLocationHotel />
            </div>
          </OffCanvasComponent>
          <HotelListContent />
        </div>
      </div>
    </div>
  );
};

export default HotelList;
