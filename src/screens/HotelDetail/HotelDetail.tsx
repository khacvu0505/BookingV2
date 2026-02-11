import "photoswipe/dist/photoswipe.css";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDate,
  cleanedObject,
  formatDate,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { defaultServices, info_booking, tax_include } from "@/utils/constants";
import {
  clearHotelInfo,
  setRoomActive,
} from "@/features/hotel-detail/hotelDetailSlice";
import {
  fetchHotelBySlug,
  fetchRelatedHotels,
  fetchRoomList,
  fetchServicesByRoom,
} from "@/features/hotel-detail/reducers";
import { getHotelPolicies } from "@/api/hotel.api";
import { handleSetDefaultBooking } from "@/utils/handleSetDefaultBooking";
import isEmpty from "lodash/isEmpty";
import "./HotelDetail.styles.scss";
import useWindowSize from "@/utils/useWindowSize";
import { BREAKPOINT_LG } from "@/utils/constants";
import GalleryComponent from "@/apps/Gallery";
import classNames from "classnames";
import QnA from "@/apps/QnA";
import Breadcrumb from "@/apps/Breadcrumb";
import StickyHeader from "@/apps/StickyHeader";
import RoomList from "./RoomList";
import SidebarRight from "@/apps/SidebarRight";
import SearchBarWithoutLocation from "@/apps/MasterSearch/SearchBarWithoutLocation";
import Overview from "./Overview";
import Surrounding from "./Surrounding";
import HelpfulFacts from "./HelpfulFacts";
import ReviewProgress from "@/apps/Review/ReviewProgress";
import DetailsReview from "@/apps/Review/DetailsReview";
import PropertyHighlights from "@/apps/PropertyHighlights";
import RelatedHotels from "@/apps/RelatedHotels";
import HotelDetailSkeleton from "./SkeletonHotelDetail";
import TabHotelDetail from "@/apps/OffCanvasHotelDetailMobile";
import { useTranslation } from "react-i18next";

const HotelDetail = () => {
  const { t } = useTranslation();
  const isDesktop = useWindowSize().width > BREAKPOINT_LG;
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useQueryParams();
  const dispatch = useAppDispatch();
  const { hotelInfo, isLoadingHotelInfo, relatedHotels, roomInfos } =
    useSelector((state: any) => state.hotel);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hotelPolicies, setHotelPolicies] = useState<any>(null);
  const offCanvasRef = useRef<any>();

  const { checkIn, checkOut, adults, children, room, location, roomActive } =
    searchParams || {};

  const breadcrumbData = useMemo(
    () => [
      {
        title: t("HOTEL.HOTEL"),
        link: `/hotels/?checkIn=${
          searchParams?.checkIn || formatDate(new Date())
        }&checkOut=${searchParams?.checkOut || addDate(new Date(), 3)}&adults=${
          searchParams?.adults || 2
        }&children=${searchParams?.chilren || 0}&room=${
          searchParams?.room || 1
        }&location=${searchParams?.location || "NT"}&page=1`,
      },
      {
        title: hotelInfo?.hotelName,
        link: "#",
      },
    ],
    [hotelInfo?.hotelName, t]
  );

  useEffect(() => {
    // get hotel info
    const params = {
      Slug: slug,
      FromDate: searchParams.checkIn,
      ToDate: searchParams.checkOut,
      TotalRoom: searchParams.room,
    };
    dispatch(fetchHotelBySlug(cleanedObject(params)) as any);
    //get hotel policies
    getHotelPolicies(params)
      .then((res) => {
        if (res?.success) {
          setHotelPolicies(res?.data);
        } else {
          setHotelPolicies([]);
        }
      })
      .catch(() => {
        setHotelPolicies([]);
      });
  }, [slug]);

  useEffect(() => {
    const infoBooking = getFromSessionStorage(info_booking);
    if ((!infoBooking || isEmpty(infoBooking)) && hotelInfo) {
      handleSetDefaultBooking({
        hotelCode: hotelInfo?.hotelCode,
        hotelName: hotelInfo?.hotelName,
        searchParams,
      });
    }
    if (hotelInfo) {
      const paramsRoom = {
        supplierCode: hotelInfo?.hotelCode,
        fromDate: searchParams?.checkIn,
        toDate: searchParams?.checkOut,
        adult: +searchParams?.adults,
        children: +searchParams?.children,
        totalRoom: +searchParams?.room,
      };
      dispatch(fetchRoomList(paramsRoom) as any);
      setToSessionStorage(tax_include, hotelInfo?.taxInclude);
    }
  }, [hotelInfo]);

  useEffect(() => {
    if (!hotelInfo?.hotelCode) return;
    const params = {
      regionID: searchParams.location,
      supplierType: "Hotel",
      currentCode: hotelInfo?.hotelCode,
    };
    dispatch(fetchRelatedHotels(params) as any);
  }, [hotelInfo?.hotelCode, searchParams.location]);

  useEffect(() => {
    if (!isLoadingHotelInfo) {
      // eslint-disable-next-line no-undef
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }, [isLoadingHotelInfo]);

  useEffect(() => {
    let infoBooking = getFromSessionStorage(info_booking) as any;
    if (
      infoBooking &&
      infoBooking.services &&
      infoBooking.services.length > 0
    ) {
      infoBooking.services.map((item: any) => {
        dispatch(
          fetchServicesByRoom({
            roomID: item?.roomID,
            roomName: item?.roomName,
            source: item?.source,
            searchParams,
            isRefreshServiceRoom: true,
          }) as any
        );
      });
    }
  }, []);

  useEffect(() => {
    const handleBackNavigation = (event: any) => {
      navigate({
        pathname: "/hotels",
        search: createSearchParams({
          checkIn: searchParams?.checkIn || formatDate(new Date()),
          checkOut: searchParams?.checkOut || addDate(new Date(), 3),
          adults: searchParams?.adults || 2,
          children: searchParams?.children || 0,
          room: searchParams?.room || 1,
          location: searchParams?.location || "",
        } as any).toString(),
      });
    };

    // eslint-disable-next-line no-undef, no-restricted-globals
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      // eslint-disable-next-line no-restricted-globals, no-undef
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  useEffect(() => {
    let infoBooking = getFromSessionStorage(info_booking);
    let defaultParams: any = {
      ...searchParams,
      roomActive: roomActive || 1,
    };
    if (!checkIn) {
      defaultParams = { ...defaultParams, checkIn: formatDate(new Date()) };
    }
    if (!checkOut) {
      defaultParams = { ...defaultParams, checkOut: addDate(new Date(), 3) };
    }
    if (!adults) {
      defaultParams = { ...defaultParams, adults: 2 };
    }
    if (!children) {
      defaultParams = { ...defaultParams, children: 0 };
    }
    if (!location) {
      defaultParams = { ...defaultParams, location: "" };
    }
    if (!room) {
      defaultParams = { ...defaultParams, room: 1 };
      const servicesDefault = defaultServices(1);
      setToSessionStorage(info_booking, {
        hotelInfo: {
          ...infoBooking?.hotelInfo,
          room: 1,
        },
        services: servicesDefault,
        voucherApplies: infoBooking.voucherApplies || []
      });
      // eslint-disable-next-line no-undef
      const event = new Event("triggerSearch");
      // eslint-disable-next-line no-undef
      window.dispatchEvent(event);
    }
    setSearchParams(defaultParams);
    dispatch(setRoomActive(+searchParams?.roomActive || 1));

    return () => {
      dispatch(clearHotelInfo());
    };
  }, []);

  return (
    <>
      <MetaComponent
        meta={{
          title: "Hotel Detail",
          description: "OKdimall - Du lịch và trải nghiệm",
        }}
      />

      <div className="header-margin"></div>

      {isLoadingHotelInfo && (
        <div className="container py-60">
          <HotelDetailSkeleton />
        </div>
      )}

      {!isLoadingHotelInfo && (
        <>
          <div className="container pt-10">
            <Breadcrumb data={breadcrumbData} />
          </div>

          <StickyHeader
            roomInfos={roomInfos}
            hotelPolicies={hotelPolicies}
            offCanvasRef={offCanvasRef}
            hotel={hotelInfo}
          />

          <GalleryComponent hotel={hotelInfo} roomInfos={roomInfos} />

          <section className="pt-30 lg:pt-20 pb-50 lg:pb-0">
            <div className="container">
              <PropertyHighlights hotel={hotelInfo} />
            </div>
          </section>

          <section className="d-none lg:d-block lg:mt-20 lg:mb-0">
            <div className="container">
              <TabHotelDetail hotel={hotelInfo} hotelPolicies={hotelPolicies} />
            </div>
          </section>

          <section id="available-room">
            <div className="container">
              <div
                className={classNames("rounded-22 ", {
                  hotelDetailSearchSticky: isDesktop,
                  hotelDetailSearch: !isDesktop,
                })}
              >
                <SearchBarWithoutLocation />
              </div>
              <div className="mt-30 lg:mt-20">
                <div className="row pb-10">
                  <h3 className="text-32 xl:text-26 lg:text-24 fw-700 mb-24 lg:mb-15 lg:text-center">
                    {t("COMMON.ROOM_LIST")}
                  </h3>
                </div>
                <div className="row">
                  <div className="col-xl-8 xl:order-2 px-10">
                    <RoomList hotelsData={roomInfos} />
                  </div>

                  <div className="col-xl-4 xl:order-1 d-block xl:d-none px-0">
                    <SidebarRight />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-50 xl:pt-40 lg:pt-30">
            <div className="container">
              <div className="row y-gap-40">
                <div id="overview" className="col-12 pt-0">
                  <Overview content={hotelInfo?.overview} />
                </div>
              </div>
            </div>
          </section>

          {hotelPolicies?.neighborhoods &&
            hotelPolicies?.neighborhoods?.length > 0 && (
              <section className="pt-50 xl:pt-40 lg:pt-30">
                <div className="container">
                  <h3 className="text-32 xl:text-26 lg:text-24 lg:text-center mb-24 xl:mb-20 lg:mb-16 fw-700">
                    {t("HOTEL.GO_NEARLY")}
                  </h3>

                  <div className="row x-gap-40 lg:x-gap-20 y-gap-20 xl:y-gap-15 pt-10">
                    <Surrounding neighborhoods={hotelPolicies?.neighborhoods} />
                  </div>
                </div>
              </section>
            )}

          <section className="pt-50 xl:pt-40 lg:pt-30">
            <div className="container">
              <div className="pt-50 xl:pt-40 lg:pt-30 border-top-light">
                <h3 className="text-32 xl:text-26 lg:text-24 lg:text-center fw-700 ">
                  {t("COMMON.INFORMATION_USEFUL")}
                </h3>

                <HelpfulFacts hotel={hotelInfo} />
              </div>
            </div>
          </section>

          <section id="reviews">
            <div className="container">
              <h3 className="text-32 xl:text-26 lg:text-24 fw-700 pt-50 xl:pt-40 lg:pt-30 lg:text-center">
                {t("COMMON.RATING")}
              </h3>

              <ReviewProgress hotel={hotelInfo} />
              <div>
                <DetailsReview hotel={hotelInfo} />
              </div>
            </div>
          </section>

          <section id="faq" className="pb-30">
            <div className="container">
              <div className="pt-20">
                <h2 className="text-32 xl:text-26 lg:text-24 fw-700 mb-20 xl:mb-15 lg:text-center">
                  {t("HOTEL.FAQ")}
                </h2>

                <div className="accordion -simple row y-gap-10 js-accordion">
                  <QnA listQnA={hotelPolicies?.qnA} />
                </div>
              </div>
            </div>
          </section>

          {relatedHotels?.length > 0 && (
            <section className=" pb-30">
              <div className="container">
                <h2 className="text-32 xl:text-26 lg:text-24 fw-700 mb-20 xl:mb-15 lg:text-center">
                  {t("COMMON.YOU_MAY_LIKE")}
                </h2>

                <div className="pt-20 sm:pt-20 item_gap-x10 ">
                  <RelatedHotels />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default HotelDetail;
