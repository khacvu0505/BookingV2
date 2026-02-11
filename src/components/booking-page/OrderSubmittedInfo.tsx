import { getBookingInfo, getOnePayCallback } from "@/api/booking.api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatCurrency, formatStringToDate } from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import Loading from "@/screens/Loading";
import InvoiceComponent from "../invoice/Invoice";

const OrderSubmittedInfo = () => {
  const [params, _] = useQueryParams();
  const { vpc_Amount = "" } = params;
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetBookingInfo = async () => {
    try {
      setIsLoading(true);
      const res = await getBookingInfo(id as string);
      if (res.success) {
        setBookingInfo(res.data);
        navigate(`/booking/${id}`);
      } else {
        setBookingInfo(null);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setBookingInfo(null);
    }
  };

  useEffect(() => {
    if (vpc_Amount) {
      getOnePayCallback({
        bookingID: id as string,
        // eslint-disable-next-line no-undef
        url: window.location.href,
      })
        .then((res) => {
          const { success } = res;
          if (success) {
            handleGetBookingInfo();
          } else {
            setIsLoading(false);
            setBookingInfo(null);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setBookingInfo(null);
        });
    } else {
      handleGetBookingInfo();
    }
  }, []);

  if (!id) {
    navigate("/page-not-found");
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="col-xl-10 col-lg-10">
        <div className="order-completed-wrapper">
          {!bookingInfo ? (
            <div className="d-flex flex-column justify-content-center items-center mt-40 lg:md-40 sm:mt-24">
              <div className="size-80 flex-center rounded-full bg-danger">
                <span className="text-30 text-white">X</span>
              </div>
              <div className="text-30 lh-1 fw-600 mt-20">
                Đặt phòng thất bại
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center items-center mt-40 lg:md-40 sm:mt-24">
              <div className="size-40 size-md-80 flex-center rounded-full bg-dark-3">
                <i className="icon-check text-20 text-md-30 text-white" />
              </div>
              <div className="text-20 text-md-30 lh-1 fw-600 mt-20">
                Đặt phòng thành công
              </div>
              <div className="text-14 text-md-18 text-dark mt-10">
                Thông tin chi tiết đã được gửi tới: {bookingInfo?.email}
              </div>
              <div className="d-flex items-center mt-10">
                <p className="text-14 text-md-18 mr-5 text-dark">
                  Quản lý booking của bạn{" "}
                </p>
                <button
                  onClick={() => navigate("/profile/booking-history-hotel")}
                  className="button px-10 py-2 bg-blue-1 text-white shadow-2"
                >
                  Tại đây
                </button>
              </div>
            </div>
          )}
          {!bookingInfo ? (
            <p className="text-center mt-30 text-18 text-dark-1">
              Có lỗi xảy ra trong quá trình xử lý đặt phòng. <br />
              Chúng tôi đã ghi nhận vấn đề này và đang cố gắng khắc phục. Xin
              lỗi vì sự bất tiện này.
            </p>
          ) : (
            <>
              <div className="border-type-1 rounded-8 px-30 px-md-50 py-10 py-md-35 mt-20 mb-20 mt-md-40 mb-md-40">
                <div className="row justify-content-center">
                  <div className="col-lg-3 col-md-6 px-0 mb-10">
                    <div className="text-15 lh-12">Mã đặt phòng</div>
                    <div className="text-15 lh-12 fw-500 text-blue-1">
                      {bookingInfo?.bookingNo}
                    </div>
                  </div>
                  {/* End .col */}
                  <div className="col-lg-3 col-md-6 px-0 mb-10">
                    <div className="text-15 lh-12">Ngày nhận</div>
                    <div className="text-15 lh-12 fw-500 text-blue-1">
                      {formatStringToDate(bookingInfo?.checkInDate)}
                    </div>
                  </div>
                  {/* End .col */}
                  <div className="col-lg-3 col-md-6 px-0 mb-10">
                    <div className="text-15 lh-12">Trạng thái</div>
                    <div className="text-15 lh-12 fw-500 text-blue-1">
                      {bookingInfo?.paymentStatus === "Full"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </div>
                  </div>
                  {/* End .col */}
                  <div className="col-lg-3 col-md-6 px-0">
                    <div className="text-15 lh-12">Phương thức</div>
                    <div className="text-15 lh-12 fw-500 text-blue-1">
                      {bookingInfo?.paymentMethod}
                    </div>
                  </div>
                  {/* End .col */}
                </div>
              </div>

              <InvoiceComponent bookingInfo={bookingInfo} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSubmittedInfo;
