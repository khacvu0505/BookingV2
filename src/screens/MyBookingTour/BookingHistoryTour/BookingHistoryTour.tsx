import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RatingModal from "@/apps/RatingModal";
import InfoBookingCustomerModal from "@/components/profile/info-booking-customer-modal";

import { formatCurrency, formatStringToDate } from "@/utils/utils";
import { getBookingHistory } from "@/api/user.api";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import useWindowSize from "@/utils/useWindowSize";
import { useSelector } from "react-redux";
import Input from "@/apps/Input";
import Dropdown2 from "@/apps/Dropdown2/Dropdown2";
import TagComponent from "@/apps/TagComponent";
import { useTranslation } from "react-i18next";
import Pagination from "@/apps/Pagination";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

const BookingHistoryTour = ({ isFinishTab, status }) => {
  const { t } = useTranslation();
  const refRatingModal = useRef(null);
  const { currentCurrency } = useSelector((state) => state.app);
  const refInfoBookingCustomerModal = useRef(null);
  const navigate = useNavigate();
  const isMobile = useWindowSize().width < 768;

  const [tourList, setTourList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);

  const handleClickRating = (_item?: any) => {
    refRatingModal.current.setIsVisible(true);
  };

  const options = useMemo(
    () => [
      { label: t("COMMON.CREATED_DATE_DESC"), value: "CreateDate DESC" },
      { label: t("COMMON.CREATED_DATE_ASC"), value: "CreateDate ASC" },
      { label: t("COMMON.NAME_A_Z"), value: "SupplierName ASC" },
      { label: t("COMMON.NAME_Z_A"), value: "SupplierName DESC" },
    ],
    [t]
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm, statusValue) => {
      getBookingHistory({
        page: 1,
        pageSize: 10,
        entity: {
          keyword: searchTerm,
          status: statusValue,
          paymentType: "",
          supplierType: "Hotel",
        },
      })
        .then((res) => {
          const { success = false, data, totalPage = 1 } = res || {};
          if (success) {
            setTourList(data);
            setTotalPage(totalPage);
          } else {
            setTourList([]);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setTourList([]);
        });
    }, 500),
    []
  );

  const handleChangeValue = useCallback(
    (event) => {
      setSearch(event.target.value);

      debouncedSearch(event.target.value, status);
    },
    [debouncedSearch, status]
  );

  const handleClickShowInfoCustomer = (bookingID) => {
    navigate(`/profile/booking-history-tour/${bookingID}`);
  };

  useEffect(() => {
    setIsLoading(true);

    getBookingHistory({
      page: 1,
      pageSize: 10,
      orders: sort?.value,
      entity: {
        keyword: search,
        status,
        paymentType: "",
        supplierType: "Tour",
      },
    })
      .then((res) => {
        const { success = false, data, totalPage = 1 } = res || {};
        if (success) {
          setTourList(data);
          setTotalPage(totalPage);
        } else {
          setTourList([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setTourList([]);
      });
  }, [status, sort]);

  //   if (isLoading) {
  //     return <Skeleton count={5} />;
  //   }

  return (
    <>
      <div className="row mb-30">
        <div className="d-flex justify-content-between items-center flex-wrap mt-20 px-0">
          <h3 className="text-16 lg:text-15 md:text-14 fw-500 text-neutral-500 mb-6">
            {t("COMMON.LIST")}
          </h3>
          <div className="d-flex items-center justify-between w-100">
            <div className="md:w-1/1">
              <Input
                name="search"
                onChange={handleChangeValue}
                value={search}
                placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                prefix={
                  <img
                    src="/images/Profile/icon-search.png"
                    alt="icon-search"
                  />
                }
              />
            </div>
            <div className="ml-16 sm:ml-10 sm:w-1/7">
              <Dropdown2
                label={t("PROFILE.SORT_BY_DATE_BOOKING_ROOM")}
                options={options}
                onSelect={(item) => {
                  setSort(item);
                }}
                className="sm:w-30"
              />
            </div>
          </div>
        </div>
      </div>

      {tourList.length > 0 ? (
        tourList.map((item, index) => (
          <div className="col-12 md:mb-70 sm:mb-30" key={index}>
            <div
              className="row items-center bg-white mb-20 py-15 px-4 rounded-8 border-light"
              style={{
                background:
                  "linear-gradient(90deg, rgba(236, 236, 236, 0.2) 0%, rgba(143, 143, 143, 0) 100%)",
              }}
            >
              <div className="col-12 col-sm-5 col-md-4 col-lg-3">
                <img
                  className="rounded-8 img-fluid object-cover pointer sm:w-1/1 min-h-160 md:h-220"
                  src={item.thumbs.length > 0 ? item.thumbs[0] : ""}
                  alt="image"
                  width={264}
                  style={{ height: 160 }}
                  onClick={() => handleClickShowInfoCustomer(item?.bookingID)}
                />
              </div>
              {/* End col */}

              <div className="col-12 col-sm-7 col-md-8 col-lg-9 md:py-0">
                <div
                  className="d-flex items-center pointer lg:flex-column lg:items-start lg:mt-20"
                  onClick={() => handleClickShowInfoCustomer(item?.bookingID)}
                >
                  <div className="d-flex items-center sm:mb-6">
                    <TagComponent
                      text={t("COMMON.BOOKING_NO")}
                      type="primary"
                    />
                    <p className="ml-4 mt-4 text-14 fw-500 text-neutral-500">
                      {item?.bookingNo}
                    </p>
                  </div>
                  <div className="d-flex items-center ml-16 lg:ml-0">
                    <TagComponent
                      text={t("COMMON.BOOKING_ROOM_DATE")}
                      type="info"
                    />
                    <p className="ml-4 mt-4 text-14 fw-500 text-neutral-500">
                      {formatStringToDate(item?.createDate)}
                    </p>
                  </div>
                </div>
                <div className="d-flex items-center justify-content-between mb-16 lg:mb-10 flex-wrap sm:flex-column sm:items-start lg:mt-20 md:mt-10">
                  <h3
                    className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 cursor-pointer"
                    onClick={() => handleClickShowInfoCustomer(item?.bookingID)}
                  >
                    {item?.supplierName}
                  </h3>
                  <PriceWithVND
                    price={item?.totalPayment}
                    currencyRate={item?.currencyRate}
                    currencyCode={item?.currencyCode}
                    className="text-24 lg:text-20 md:text-18 fw-600 text-primary-500"
                    helperClassName="text-12 text-neutral-500"
                  />
                </div>

                <div className="row x-gap-10 y-gap-10 items-center ">
                  <div>
                    <div className="d-flex items-center justify-content-between mb-8">
                      <div className="d-flex items-center">
                        <img
                          src="/images/Profile/icon-calendar.png"
                          alt="icon-calendar"
                          className="mr-4"
                        />
                        <p className="text-14 fw-400 text-neutral-400">
                          {t("PROFILE.TOUR_DATE")}:
                        </p>
                        <p className="fw-600 text-14 text-neutral-800 ml-4">
                          {formatStringToDate(item?.checkInDate)}
                        </p>
                      </div>
                      {isFinishTab && Boolean(!item?.isFeedback) && (
                        <p
                          className="italic underline text-14 fw-400 text-primary-500 pointer d-block sm:d-none text-end"
                          onClick={handleClickRating}
                        >
                          {t("COMMON.RATING")}
                        </p>
                      )}
                    </div>
                    {isFinishTab && Boolean(!item?.isFeedback) && (
                      <p
                        className="italic underline text-14 fw-400 text-primary-500 pointer d-none sm:d-block text-end"
                        onClick={() => handleClickRating(item)}
                      >
                        {t("COMMON.RATING")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <RatingModal ref={refRatingModal} />
            <InfoBookingCustomerModal ref={refInfoBookingCustomerModal} />
          </div>
        ))
      ) : (
        <div className="text-center mt-88">
          <img
            src="/images/Profile/no-booking.png"
            alt="no-booking"
            width={88}
            height={88}
          />
          <p className="text-16 lg:text-15 md:text-14 fw-500 text-neutral-500">
            {t("PROFILE.NOT_FOUND_BOOKING")}
          </p>
        </div>
      )}
      <Pagination totalPage={totalPage} />
    </>
  );
};

export default React.memo(BookingHistoryTour);
