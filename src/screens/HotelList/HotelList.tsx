import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import BannerHotelList from "@/screens/HotelList/BannerHotelList";
import MetaComponent from "@/components/MetaComponent";
import useQueryParams from "@/hooks/useQueryParams";
import { useSelector } from "react-redux";
import {
  addDate,
  cleanedObject,
  formatDate,
} from "@/utils/utils";
import { getHotelList } from "@/api/hotel.api";
import OffCanvasComponent from "@/components/OffCanvas/OffCanvasComponent";
import AccommodationType from "./Navbar/AccommodationType";
import RatingHotelList from "./Navbar/RatingHotelList";
import RatingByCustomer from "./Navbar/RatingByCustomer";
import LocationHotel from "./Navbar/LocationHotel";
import SubLocationHotel from "./Navbar/SubLocationHotel";
import { useQuery } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/query-keys";

const Navbar = dynamic(() => import("@/screens/HotelList/Navbar"));
const HotelListContent = dynamic(() =>
  import("@/screens/HotelList/HotelListContent")
);

const metadata = {
  title: "Hotel List",
  description: "Travel & Tour",
};

const HotelList = () => {
  const [params, setSearchParams] = useQueryParams();

  const secondaryLocationList =
    useSelector((state: any) => state.hotels.secondaryLocation) || undefined;
  const regions =
    useSelector((state: any) => state.hotels.regions) || [];
  const defaultLocation = regions[0]?.id || "";

  const {
    location: locationParam = defaultLocation,
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

  const { data: hotelListData, isLoading: isLoadingHotels } = useQuery({
    queryKey: hotelKeys.list({
      locationParam,
      checkInParam,
      checkOutParam,
      adultsParam,
      childrenParam,
      roomParam,
      minPriceParam,
      maxPriceParam,
      pageParam,
      pageSizeParam,
      keywordParam,
      ratingParam,
      subLocationParam,
      benefitsParam,
      positionParam,
      ratingByCustomerParam,
      accommodationTypeParam,
      sortParam,
    }),
    queryFn: async () => {
      const subLocationArr = subLocationParam
        ? subLocationParam?.split("-").map(Number)
        : [];
      const subLocationParamFormatted =
        secondaryLocationList?.length > 0
          ? secondaryLocationList
              .filter((item: any) => subLocationArr.includes(item.id))
              .map((i: any) => i.value)
              .join(",")
          : undefined;
      const benefitsParamFormatted = benefitsParam
        ? benefitsParam.replaceAll("-", ",")
        : "";
      const accommodationTypeParamFormatted = accommodationTypeParam
        ? accommodationTypeParam.replaceAll("-", ",")
        : "";

      const res = await getHotelList(
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
      );

      return {
        hotels: Array.isArray(res.data) ? res.data : [],
        total: res.totalRecords ?? 0,
        totalPages: res.totalPage ?? 0,
      };
    },
    enabled: !!secondaryLocationList && secondaryLocationList.length > 0,
  });

  const hotels = hotelListData?.hotels ?? [];
  const total = hotelListData?.total ?? 0;
  const totalPages = hotelListData?.totalPages ?? 0;

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
          <HotelListContent
            hotels={hotels}
            total={total}
            totalPages={totalPages}
            isLoadingHotels={isLoadingHotels}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelList;
