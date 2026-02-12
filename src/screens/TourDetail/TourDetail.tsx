import "photoswipe/dist/photoswipe.css";
import { useParams } from "react-router-dom";

import { useEffect, useMemo, useRef } from "react";
import {
  getTourBySlug,
  getTourPoliciesBySlug,
  getTourPrices,
  getTourServices,
} from "@/api/tours.api";
import useQueryParams from "@/hooks/useQueryParams";
import { getFromSessionStorage } from "@/utils/utils";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { setTourBookingInfo } from "@/features/tour/tourSlice";
import { info_booking_tour } from "@/utils/constants";
import { fetchRelatedHotels } from "@/features/hotel-detail/reducers";
import { useQuery, useMutation } from "@tanstack/react-query";
import { tourKeys } from "@/lib/query-keys";

import MetaComponent from "@/components/MetaComponent";
import Breadcrumb from "@/components/Breadcrumb";
import StickyHeader from "@/components/StickyHeader";
import GalleryComponent from "@/components/Gallery";
import PropertyHighlights from "@/components/PropertyHighlights";
import Tickets from "./Tickets";
import Overview from "./Overview";
import HelpfulFacts from "./HelpfulFacts";
import Itinerary from "./Itinerary";
import ReviewProgress from "@/components/Review/ReviewProgress";
import DetailsReview from "@/components/Review/DetailsReview";
import QnA from "@/components/QnA";
import RelatedHotels from "@/components/RelatedHotels";
import CustomCalendar from "@/components/Form/CustomCalendar";
import { useTranslation } from "react-i18next";

const TourDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [searchParams] = useQueryParams();
  const dispatch = useAppDispatch();
  const { tourBookingInfo } = useSelector((state: any) => state.tour);
  const { relatedHotels } = useSelector((state: any) => state.hotel);

  const { data: tour, isLoading: isTourLoading } = useQuery({
    queryKey: tourKeys.detail(String(slug ?? "")),
    queryFn: async () => {
      const res = await getTourBySlug({ Slug: slug });
      if (res?.success) return res.data;
      return null;
    },
    enabled: !!slug,
  });

  const { data: policiesTour } = useQuery({
    queryKey: tourKeys.policies(String(slug ?? "")),
    queryFn: async () => {
      const res = await getTourPoliciesBySlug({ Slug: slug });
      if (res?.success) return res.data;
      return null;
    },
    enabled: !!slug,
  });

  const { data: services, isLoading: serviceLoading } = useQuery({
    queryKey: tourKeys.services(
      tourBookingInfo?.supplierCode ?? "",
      tourBookingInfo?.date ?? ""
    ),
    queryFn: async () => {
      const params = omitBy(
        {
          Date: tourBookingInfo.date,
          supplierCode: tourBookingInfo.supplierCode,
        },
        (v) => isNil(v)
      );
      const res = await getTourServices(params);
      if (res?.success) return res.data;
      return null;
    },
    enabled: !!tourBookingInfo?.supplierCode,
  });

  const {
    mutate: getTourServicePrice,
    data: tourPrices,
    isPending: tourPricesLoading,
  } = useMutation({
    mutationFn: async (params: Record<string, unknown>) => {
      const res = await getTourPrices(params);
      if (res?.success) return res.data;
      return null;
    },
  });

  const offCanvasRef = useRef<any>();

  const breadcrumbData = useMemo(
    () => [
      {
        title: "Tour",
        link: "/tour",
      },
      {
        title: (tour as any)?.hotelName,
        link: "#",
      },
    ],
    [(tour as any)?.hotelName]
  );

  useEffect(() => {
    const tourBookingGetFromStorage = getFromSessionStorage(info_booking_tour);
    if (tourBookingGetFromStorage) {
      dispatch(setTourBookingInfo(tourBookingGetFromStorage));
    }
  }, []);

  useEffect(() => {
    if (tour) {
      dispatch(
        setTourBookingInfo({
          ...tourBookingInfo,
          supplierCode: (tour as any)?.hotelCode,
          supplierName: (tour as any)?.hotelName,
          slug: slug || "",
        })
      );
    }
  }, [tour]);

  useEffect(() => {
    if (tourPrices) {
      const data = tourPrices as any[];
      dispatch(
        setTourBookingInfo({
          ...tourBookingInfo,
          ServicePrices: data.map((item: any, index: number) =>
            index === 0
              ? { ...item, quantity: 1, maxQuantity: item.quantity }
              : { ...item, quantity: 0, maxQuantity: item.quantity }
          ),
        })
      );
    }
  }, [dispatch, tourPrices]);

  useEffect(() => {
    if (!(tour as any)?.hotelCode || !(tour as any)?.regionID) return;
    const params = {
      regionID: (tour as any)?.regionID || "",
      supplierType: "Tour",
      currentCode: (tour as any)?.hotelCode,
    };
    dispatch(fetchRelatedHotels(params) as any);
  }, [(tour as any)?.hotelCode, (tour as any)?.regionID]);

  const handleChooseService = (tourItem: any) => {
    getTourServicePrice(
      omitBy(
        {
          Date: tourBookingInfo.date,
          tourID: tourItem?.tourID,
        },
        (v) => isNil(v)
      ) as Record<string, unknown>
    );

    dispatch(
      setTourBookingInfo({
        ...tourBookingInfo,
        tourID: tourItem?.tourID,
        tourName: tourItem?.tourName,
      })
    );
  };

  return (
    <>
      <MetaComponent
        meta={{
          title: "Tour Detail",
          description: "OKdimall - Du lịch và trải nghiệm",
        }}
      />

      <div className="header-margin"></div>

      {isTourLoading && (
        <div className="container py-60">
          <Skeleton wrapper={"div" as any} height={200} />
          <Skeleton count={3} />
        </div>
      )}

      {!isTourLoading && (
        <>
          <div className="container">
            <Breadcrumb data={breadcrumbData} />
          </div>

          <StickyHeader
            roomInfos={services}
            offCanvasRef={offCanvasRef}
            hotelPolicies={policiesTour}
            type="tour"
            hotel={tour}
          />

          <GalleryComponent hotel={tour} type="tour" roomInfos={services} />

          <section className="pt-50 xl:pt-40 lg:pt-30 ">
            <div className="container">
              <PropertyHighlights hotel={tour} type="tour" />
            </div>
          </section>

          <section className="pt-50 xl:pt-40 lg:pt-30" id="available-room">
            <div className="container">
              <div className="sectionTitle -md text-center mb-30 lg:mb-20">
                <h2 className="sectionTitle__title">
                  {t("TOUR.CHOOSE_SERVICE")}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {t("TOUR.CHOOSE_SERVICE_DESC")}
                </p>
              </div>
              <CustomCalendar locale="vi" />
            </div>
          </section>

          <div className="container">
            {serviceLoading ? (
              <Skeleton wrapper={"div" as any} height={200} />
            ) : (
              <Tickets
                services={services}
                handleChooseService={handleChooseService}
                tourPrices={tourPrices}
                tourPricesLoading={tourPricesLoading}
              />
            )}
          </div>

          <div className=" container pt-50 xl:pt-40 lg:pt-30">
            <Overview content={(tour as any)?.overview} />
          </div>

          <section className="pt-50 xl:pt-40 lg:pt-30">
            <div className="container">
              <div className="row mb-24 xl:mb-20 lg:mb-15">
                <div className="col-12">
                  <h3 className="text-32 xl:text-26 lg:text-24 fw-700 lg:text-center">
                    {t("COMMON.INFORMATION_USEFUL")}
                  </h3>
                </div>
              </div>

              <HelpfulFacts tour={tour} />
            </div>
          </section>

          <section className="pt-50 xl:pt-40 lg:pt-30">
            <div className="container">
              <h3 className="text-32 xl:text-26 lg:text-24 fw-700 mb-15 xl:mb-10 lg:text-center">
                {t("TOUR.JOURNEY")}
              </h3>
              <div>
                <Itinerary data={(policiesTour as any)?.itinerary || []} />
              </div>
            </div>
          </section>

          <section id="reviews">
            <div className="container">
              <h3 className="text-32 xl:text-26 lg:text-24 fw-700 mb-10 lg:text-center">
                {t("COMMON.RATING")}
              </h3>

              <ReviewProgress hotel={tour} />

              <DetailsReview hotel={tour} />
            </div>
          </section>

          <section id="faq" className="pb-30">
            <div className="container">
              <div className="pt-20">
                <h2 className="text-32 xl:text-26 lg:text-24 fw-700 mb-20 xl:mb-15 lg:text-center">
                  {t("COMMON.FAQ")}
                </h2>

                <div className="accordion -simple row y-gap-10 js-accordion">
                  <QnA listQnA={(policiesTour as any)?.qnA} />
                </div>
              </div>
            </div>
          </section>

          {relatedHotels?.length > 0 && (
            <section className="pt-30 pb-20 xl:pt-20 lg:pt-10">
              <div className="container">
                <h2 className="text-32 xl:text-26 lg:text-24 fw-700 mb-20 lg:mb-10 lg:text-center">
                  {t("COMMON.YOU_MAY_LIKE")}
                </h2>

                <div className="pt-20 lg:pt-10 item_gap-x10 ">
                  <RelatedHotels isTour />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default TourDetail;
