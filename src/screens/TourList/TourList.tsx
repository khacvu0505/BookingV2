import useQueryParams from "@/hooks/useQueryParams";
import { useDispatch } from "react-redux";
import { lazy, useEffect } from "react";
import { getTourListService } from "@/api/tours.api";
import { cleanedObject, clearSessionStorage } from "@/utils/utils";
import {
  setRequestingTours,
  setTours,
} from "@/features/tour-list/tourList.slice";
import { booking_id, info_booking_tour } from "@/utils/constants";
import OffCanvasComponent from "@/apps/OffCanvasComponent";
import Category from "./Navbar/Category";
import RatingTourList from "./Navbar/RatingTourList";
import Duration from "./Navbar/Duration";
import Languages from "./Navbar/Languages";
import FindTour from "./Navbar/FindTour";
import RatingByCustomer from "./Navbar/RatingByCustomer";

const MetaComponent = lazy(() => import("@/apps/MetaComponent"));
const BannerTourList = lazy(() => import("./BannerTourList"));
const Navbar = lazy(() => import("./Navbar"));
const TourListContent = lazy(() => import("./TourListContent"));

const metadata = {
  title: "Tour List",
  description: "OKdimall - Travel & Tour",
};

const TourList = () => {
  const [params, setSearchParams] = useQueryParams();
  const {
    page: pageParam = 1,
    pageSize: pageSizeParam = 9,
    location: regionIDParam = "",
    minPrice: minPriceParam = 0,
    maxPrice: maxPriceParam = 200000000,
    votes: votesParam,
    category: categoryTypeParam = "",
    duration: durationParam,
    language: languageParam = "",
    sort: sortParam,
    search: searchParam,
    rating: ratingParam,
    ratingByCustomer: ratingByCustomerParam,
  } = params || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const obj = cleanedObject({
        regionID: regionIDParam,
        minPrice: Number(minPriceParam),
        maxPrice: Number(maxPriceParam),
        votes: votesParam,
        categoryType: categoryTypeParam || "",
        duration: durationParam,
        Page: Number(pageParam) || 1,
        PageSize: Number(pageSizeParam) || 9,
        Orders: sortParam,
        Rating: ratingParam,
        Votes: ratingByCustomerParam,

        // languages: languageParam,
      });
      const data = await getTourListService({
        ...obj,
        keyword: searchParam || "",
      });
      dispatch(setTours(data));
    };

    dispatch(setRequestingTours());

    fetchData();
  }, [
    regionIDParam,
    minPriceParam,
    maxPriceParam,
    votesParam,
    categoryTypeParam,
    durationParam,
    pageParam,
    pageSizeParam,
    sortParam,
    ratingParam,
    ratingByCustomerParam,
    searchParam,
    dispatch,
  ]);

  useEffect(() => {
    clearSessionStorage(info_booking_tour);
    clearSessionStorage(booking_id);
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      <BannerTourList />

      <div className="container mt-50 lg:mt-30 md:mt-16">
        <div className="row">
          <Navbar />
          <OffCanvasComponent
            id={"offcanvas-tours-filter"}
            header={
              <div className="d-flex items-center">
                <img
                  src="/images/HotelList/icon-filter.png"
                  alt="filter hotel list okdimall"
                  className="navbar_head-icon"
                />
                <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 ml-8">
                  Bộ lọc thông tin
                </p>
              </div>
            }
          >
            <div className="navbar_content w-fitcontent">
              <FindTour />
              <Category />
              <RatingTourList />
              <RatingByCustomer />
              <Duration />
              <Languages />
            </div>
          </OffCanvasComponent>
          <TourListContent />
        </div>
      </div>
    </>
  );
};

export default TourList;
