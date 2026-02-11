import { getBookingInfo, sendOTP } from "@/api/booking.api";
import {
  booking_id,
  create_invoice,
  info_booking,
  tax_include,
} from "@/utils/constants";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import {
  clearSessionStorage,
  formatCurrency,
  formatStringToDate,
} from "@/utils/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

const BookingOverView = ({ email, bookingID, refOTPModal }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [overview, setOverview] = useState(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);

  const handleClickContinue = () => {
    if (!isAccepted) {
      handleRenderNoti("Vui lòng chấp nhận điều khoản và điều kiện", "error");
      return;
    }
    setIsSubmitting(true);
    sendOTP(email).then((res) => {
      const { success } = res;
      if (success) {
        setIsVisible(false);
        refOTPModal.current.setIsVisible(true);
        clearSessionStorage(info_booking);
        clearSessionStorage(booking_id);
        clearSessionStorage(tax_include);
        clearSessionStorage(create_invoice);
      }
      setIsSubmitting(false);
    });
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );

  useEffect(() => {
    if (bookingID) {
      setIsLoadingRoom(true);
      getBookingInfo(bookingID)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            setOverview(data);
          } else {
            setOverview(null);
          }
          setIsLoadingRoom(false);
        })
        .catch(() => {
          setIsLoadingRoom(false);
          setOverview(null);
        });
    }
  }, [bookingID, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setIsAccepted(false);
    }
  }, [isVisible]);

  const isLoading = isLoadingRoom || !overview;

  return (
    <div
      className={`currencyMenu js-currencyMenu  ${
        isVisible ? "" : "is-hidden"
      }`}
      style={{ paddingTop: 20 }}
    >
      <div className="currencyMenu__bg"></div>
      <div className="currencyMenu__content bg-white rounded-4 modal-custom-size2">
        <div className="text-right pr-10 pt-5">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        {isLoading ? (
          <Skeleton count={5} />
        ) : (
          <>
            <div className="overflow-y-scroll h-70vh">
              <div className="mx-auto mb-10 info-booking-customer-container">
                <h4 className="text-20 fw-500 mb-10 pt-20">
                  {overview?.supplierName}{" "}
                </h4>
                <div
                  className="accordion js-accordion -simple"
                  id="BookingOverview"
                >
                  {overview?.details.map((item) => (
                    <div
                      key={item?.roomIndex}
                      className={`accordion__item px-20 py-20 mb-20 border-light rounded-4`}
                    >
                      <div
                        aria-expanded={1 === item?.roomIndex ? "true" : "false"}
                        className="accordion__button d-flex items-center"
                        data-bs-toggle="collapse"
                        data-bs-target={`#OverviewBooking${item.roomIndex}`}
                      >
                        <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-5">
                          <i className="icon-plus" />
                          <i className="icon-minus" />
                        </div>
                        <div className="button text-dark-1 text-start">
                          Phòng {item?.roomIndex}: {item?.roomName} -{" "}
                          {item?.serviceName}
                        </div>
                      </div>
                      <div
                        className={`accordion-collapse collapse ml-20
                       ${item.roomIndex === 1 && "show"}
                      `}
                        id={`OverviewBooking${item.roomIndex}`}
                        data-bs-parent="#InfoBooking"
                      >
                        {/* <div className="d-flex align-items-center pt-10">
                          <p className="text-dark-1 mr-10">
                            {item?.roomName} -
                          </p>
                          <p className="text-dark-1">{item?.serviceName}</p>
                        </div> */}

                        <div className="d-flex align-items-center ml-20">
                          {item?.totalAmount === item?.totalPayment ||
                          item?.totalAmount < item?.totalPayment ? (
                            <PriceWithVND
                              price={item?.totalPayment}
                              currencyRate={overview?.currencyRate}
                              currencyCode={overview?.currencyCode}
                              className="text-success"
                              helperClassName="text-12 text-neutral-500"
                            />
                          ) : (
                            <>
                              <PriceWithVND
                                price={item?.totalAmount}
                                currencyRate={overview?.currencyRate}
                                currencyCode={overview?.currencyCode}
                                helperClassName="text-12 text-neutral-500"
                              />
                              <p>&nbsp; - &nbsp;</p>
                              <PriceWithVND
                                price={item?.totalPayment}
                                currencyRate={overview?.currencyRate}
                                currencyCode={overview?.currencyCode}
                                className="text-success"
                                helperClassName="text-12 text-neutral-500"
                              />
                            </>
                          )}
                        </div>

                        {item?.addOns.length > 0 && (
                          <>
                            <p className="text-dark-1">Dịch vụ thêm</p>
                            {item?.addOns.map((addOn, idx) => (
                              <div
                                key={idx}
                                className="d-flex align-items-center pl-20"
                              >
                              <p className="text-dark-1 mr-10">
                                {addOn?.serviceName}(
                                <PriceWithVND
                                  price={addOn?.totalPayment / addOn.quantity}
                                  currencyRate={overview?.currencyRate}
                                  currencyCode={overview?.currencyCode}
                                  helperClassName="text-12 text-neutral-500"
                                />
                                {" "}x {addOn.quantity}):{" "}
                              </p>
                              <div className="text-dark-1">
                                <PriceWithVND
                                  price={addOn?.totalPayment}
                                  currencyRate={overview?.currencyRate}
                                  currencyCode={overview?.currencyCode}
                                  helperClassName="text-12 text-neutral-500"
                                />
                              </div>
                              </div>
                            ))}
                          </>
                        )}

                        <div className="mt-20 ">
                          <p
                            className="text-dark"
                            style={{
                              fontSize: "18px",
                            }}
                          >
                            Chính Sách
                          </p>
                          <div
                            className="d-flex align-items-center"
                            style={{
                              minHeight: "80px",
                            }}
                          >
                            <p
                              className="d-none d-sm-block"
                              style={{
                                backgroundColor: "green",
                                height: "100%",
                                width: "8px",
                                marginRight: "10px",
                                minHeight: "80px",
                              }}
                            ></p>
                            <div>
                              <p className="text-dark fw-bold">
                                {item?.cancelPolicyName}
                              </p>

                              <div
                                style={{
                                  fontSize: "14px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item?.cancelPolicyDetail?.replaceAll(
                                      "\n",
                                      "<br/>"
                                    ) || "",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            style={{
                              minHeight: "80px",
                            }}
                          >
                            <p
                              className="d-none d-sm-block"
                              style={{
                                backgroundColor: "red",
                                height: "100%",
                                width: "8px",
                                marginRight: "10px",
                                minHeight: "80px",
                              }}
                            ></p>
                            <div>
                              <p className="text-dark fw-bold">
                                {item?.refundPolicyName}
                              </p>
                              <div
                                style={{
                                  fontSize: "14px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item?.refundPolicyDetail?.replaceAll(
                                      "\n",
                                      "<br/>"
                                    ) || "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-20">
                          <p
                            className="text-dark"
                            style={{
                              fontSize: "18px",
                            }}
                          >
                            Quyền lợi
                          </p>
                          <p className="text-dark ml-20">{item?.benefits}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {overview?.specialRequest && (
                  <div>
                    <p className="text-dark-1">Yêu cầu đặc biệt</p>
                    <p className="text-dark-1">{overview?.specialRequest}</p>
                  </div>
                )}
              </div>
              <div className="info-booking-customer-container mx-auto">
                <h4 className="text-20 fw-500 mb-10 pt-20">
                  Thông tin của bạn
                </h4>
                <div className="border-type-1 rounded-8 px-20 mb-20 ">
                  <div className="row py-5">
                    <div className="col-md-6">
                      <div className="d-flex justify-between py-20">
                        <div className="text-15 lh-16">Họ và tên </div>
                        <div className="text-15 lh-16 fw-500 uppercase">
                          {overview?.customerName}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-between py-20">
                        <div className="text-15 lh-16">Số tiền</div>

                        <div className="text-15 lh-16 fw-500">
                          <PriceWithVND
                            price={overview?.totalAmount}
                            currencyRate={overview?.currencyRate}
                            currencyCode={overview?.currencyCode}
                            helperClassName="text-12 text-neutral-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="text-15 lh-16">Email</div>
                        <div className="text-15 lh-16 fw-500">
                          {overview?.email}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="d-flex align-items-center">
                          <div className="text-15 lh-16 mr-10">Giảm giá</div>
                          <div className="searchMenu-loc js-form-dd js-liverSearch">
                            <div
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              data-bs-offset="0,22"
                            >
                              <div className="cursor-pointer">
                                {/* <i className="icon-location-2 text-20 text-light-1 mt-5 cursor-pointer"></i> */}
                                <svg
                                  width="26px"
                                  height="26px"
                                  viewBox="0 0 48 48"
                                  version={"1"}
                                  xmlns="http://www.w3.org/2000/svg"
                                  enableBackground="new 0 0 48 48"
                                >
                                  <circle
                                    fill="#2196F3"
                                    cx={24}
                                    cy={24}
                                    r={21}
                                  />
                                  <rect
                                    x={22}
                                    y={22}
                                    fill="#ffffff"
                                    width={4}
                                    height={11}
                                  />
                                  <circle
                                    fill="#ffffff"
                                    cx={24}
                                    cy="16.5"
                                    r="2.5"
                                  />
                                </svg>

                                {/* End ml-10 */}
                              </div>
                            </div>

                            <div className="shadow-2 dropdown-menu min-width-400">
                              <div className="bg-white sm:px-0 sm:py-15 rounded-4">
                                <ul className="y-gap-5 js-results">
                                  {overview?.vouchers?.length > 0 &&
                                    overview?.vouchers.map((voucher, idx) => (
                                      <li
                                        key={idx}
                                        className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 active"`}
                                        role="button"
                                      >
                                        <div className="d-flex">
                                          <div className="text-13 fw-400 js-search-option-target">
                                            {voucher?.voucherName} {"("}
                                            <span className="text-success fw-600 ">
                                              {" "}
                                              {formatCurrency(
                                                voucher?.totalDiscount
                                              )}{" "}
                                              {currentCurrency}
                                            </span>{" "}
                                            {")"}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {overview?.totalDiscount > 0 ? (
                          <div className="text-15 lh-16 fw-500 text-success">
                            <PriceWithVND
                              price={overview?.totalDiscount}
                              currencyRate={overview?.currencyRate}
                              currencyCode={overview?.currencyCode}
                              helperClassName="text-12 text-neutral-500"
                            />
                          </div>
                        ) : (
                          // text-blue-1
                          <div className="text-15 lh-16 fw-500 text-success">
                            <PriceWithVND
                              price={overview?.totalDiscount}
                              currencyRate={overview?.currencyRate}
                              currencyCode={overview?.currencyCode}
                              helperClassName="text-12 text-neutral-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="text-15 lh-16">Số điện thoại</div>
                        <div className="text-15 lh-16 fw-500">
                          {overview?.customerPhone}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="text-15 lh-16">Tổng thanh toán</div>

                        <div className="text-18 lh-16 fw-500 text-danger">
                          <PriceWithVND
                            price={overview?.totalPayment}
                            currencyRate={overview?.currencyRate}
                            currencyCode={overview?.currencyCode}
                            className="text-18 lh-16 fw-500 text-danger"
                            helperClassName="text-12 text-neutral-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="text-15 lh-16">Ngày nhận phòng</div>

                        <div className="text-15 lh-16 fw-500">
                          {" "}
                          {formatStringToDate(overview?.checkInDate)}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-between border-top-light py-20">
                        <div className="text-15 lh-16">Ngày trả phòng</div>

                        <div className="text-15 lh-16 fw-500">
                          {" "}
                          {formatStringToDate(overview?.checkOutDate)}
                        </div>
                      </div>
                    </div>

                    {/* End .col */}
                  </div>

                  {/* End .row */}
                </div>
              </div>
            </div>
            <div className="py-20 border-top-light">
              <div className="info-booking-customer-container mx-auto">
                <div className="text-14 text-light-1 d-flex justify-content-start mt-10">
                  <p className="mr-10 mt-1">
                    <div className="form-checkbox px-10 mt-4 mb-20">
                      <input
                        type="checkbox"
                        name="isInvoice"
                        value={String(isAccepted)}
                        onChange={() => setIsAccepted(!isAccepted)}
                      />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon icon-check" />
                      </div>
                    </div>
                  </p>
                  {`Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin trên và đồng ý với các điều khoản, điều kiện và `}<span
              className="underline pointer text-primary-500"
              onClick={() => {
                // eslint-disable-next-line no-undef
                window.open("/privacy-policy", "_blank");
              }}
            >
              {'chính sách quyền riêng tư của OKdimall.'}
            </span>
                </div>
              </div>
              <div className="d-flex justify-content-end mr-30 mt-10">
                <button
                  className="button -outline-blue-1 py-20 -dark-1 text-blue-1 mr-10"
                  style={{ width: 100, height: 50 }}
                  onClick={handleCloseModal}
                >
                  <span>Thoát</span>
                </button>
                <button
                  className="button py-20 -dark-1 bg-blue-1 text-white "
                  style={{ width: 150, height: 50 }}
                  onClick={handleClickContinue}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader"></span>
                      <span className="ml-10">Đang xử lý...</span>
                    </>
                  ) : (
                    <span>Thanh toán</span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default forwardRef(BookingOverView);
