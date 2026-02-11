import React, { useCallback, useEffect, useRef, useState } from "react";
import RatingModal from "@/components/profile/rating-modal/RatingModal";
import InfoBookingCustomerModal from "@/components/profile/info-booking-customer-modal";

import { formatCurrency, formatStringToDate } from "@/utils/utils";
import Skeleton from "react-loading-skeleton";
import { getBookingHistory } from "@/api/user.api";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import useWindowSize from "@/utils/useWindowSize";
import classNames from "classnames";
import { useSelector } from "react-redux";

const BookingHistoryHotel = ({ isFinishTab, status }) => {
  const refRatingModal = useRef(null);
  const { currentCurrency } = useSelector((state) => state.app);
  const refInfoBookingCustomerModal = useRef(null);
  const navigate = useNavigate();
  const isMobile = useWindowSize().width < 768;

  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleClickRating = () => {
    refRatingModal.current.setIsVisible(true);
  };

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
          const { success = false, data } = res || {};
          if (success) {
            setHotelList(data);
          } else {
            setHotelList([]);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHotelList([]);
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
    navigate(`/profile/booking-history/${bookingID}`);
  };

  useEffect(() => {
    setIsLoading(true);

    getBookingHistory({
      page: 1,
      pageSize: 10,
      entity: {
        keyword: search,
        status,
        paymentType: "",
        supplierType: "Hotel",
      },
    })
      .then((res) => {
        const { success = false, data } = res || {};
        if (success) {
          setHotelList(data);
        } else {
          setHotelList([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHotelList([]);
      });
  }, [status]);

  if (isLoading) {
    return <Skeleton count={5} />;
  }

  return (
    <>
      <div className="row mb-30">
        <div className="col-12 col-md-6 col-xl-4 px-0">
          <div className="form-input ">
            <input
              type="text"
              placeholder="Nhập tên ..."
              onChange={handleChangeValue}
              value={search}
              className="bg-white"
            />
            <label className="lh-1 text-14 text-light-1">Tìm kiếm </label>
          </div>
        </div>
      </div>

      {hotelList.length > 0 &&
        hotelList.map((item, index) => (
          <div className="col-12 md:mb-70" key={index}>
            <div className="row bg-white mb-20 py-15 px-4 rounded-8">
              <div className="col-md-auto">
                <img
                  className="rounded-4  img-fluid"
                  src={item.thumbs.length > 0 ? item.thumbs[0] : ""}
                  alt="image"
                  width={250}
                  height={250}
                />
              </div>
              {/* End col */}

              <div className="col-md md:py-0">
                <div className="d-flex align-items-center mb-10 mb-md-30 mt-10 md-md-0">
                  <h3
                    className="text-18 text-md-24 lh-14 fw-500 mr-1 cursor-pointer"
                    onClick={() => handleClickShowInfoCustomer(item?.bookingID)}
                  >
                    {item?.supplierName}
                  </h3>
                  {/* <RatingComponent stop={6} initialRating={item?.class}/> */}
                </div>

                <div className="row x-gap-10 y-gap-10 items-center ">
                  <div>
                    <p className="text-md-15 text-dark-1">
                      <span>Ngày nhận phòng: </span>
                      {formatStringToDate(item?.checkInDate)}
                    </p>
                    <p className="text-md-15 text-dark-1">
                      <span className="min-w-100">Ngày trả phòng: </span>
                      {formatStringToDate(item?.checkOutDate)}
                    </p>
                  </div>
                </div>
                {/* End .row */}

                {/* <div className="row x-gap-10 y-gap-10 pt-20">
                <div className="col-auto">
                  <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                    Breakfast
                  </div>
                </div>
                <div className="col-auto">
                  <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                    WiFi
                  </div>
                </div>
                <div className="col-auto">
                  <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                    Spa
                  </div>
                </div>
                <div className="col-auto">
                  <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                    Bar
                  </div>
                </div>
              </div> */}
              </div>

              <div className="col-md-auto text-right md:text-left md: py-0">
                <div className="d-flex flex-column justify-between h-full">
                  <div className="md:pt-5 pt-24">
                    <span className="fw-500 text-blue-1 text-18 text-md-22">
                      {formatCurrency(item?.totalPayment)} {currentCurrency}
                    </span>
                  </div>
                  {isFinishTab ? (
                    <p
                      className="text-md-18 text-blue-1 cursor-pointer underline italic"
                      onClick={handleClickRating}
                    >
                      Đánh giá
                    </p>
                  ) : (
                    <p
                      className="text-md-18 text-blue-1 cursor-pointer underline italic"
                      onClick={() =>
                        handleClickShowInfoCustomer(item?.bookingID)
                      }
                    >
                      Xem chi tiết
                    </p>
                  )}
                </div>
              </div>
              {/* End col */}
            </div>
            {/* End .row */}
            {/* @ts-ignore */}
            <RatingModal ref={refRatingModal} />
            <InfoBookingCustomerModal ref={refInfoBookingCustomerModal} />
          </div>
        ))}
    </>
  );
};

export default React.memo(BookingHistoryHotel);
