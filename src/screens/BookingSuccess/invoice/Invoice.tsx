import { formatCurrency, formatStringToDate } from "@/utils/utils";
import React from "react";
import { useSelector } from "react-redux";
import "./Invoice.style.scss";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

export default function InvoiceComponent({ bookingInfo }) {
  const { t } = useTranslation();
  const { currentCurrency } = useSelector((state) => state.app);
  const isMobile = useWindowSize().width < 768;
  const contactData = [
    { url: "#", text: "https://OKdimall.com/" },
    { url: "#", text: "booking@okdimall.com" },
    { url: "#", text: "+84 886 479 456" },
  ];

  return (
    <section
      className="rounded-8 mb-50"
      style={{
        borderLeft: "3px solid red",
        backgroundColor: "#fbfbfb",
      }}
    >
      <div className="container lg:mx-0">
        <div className="row justify-center px-0">
          <div className="rounded-4 lg:px-0">
            <div className="px-20 lg:px-6">
              <div className="row justify-between pt-10 pt-md-50">
                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.CHECK_IN_DATE")}:
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-600 text-neutral-800">
                    {formatStringToDate(bookingInfo?.checkInDate)}
                  </div>
                </div>
                {/* end .col */}

                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("BOOKING_SUCCESS_HOTEL.CHECK_OUT_DATE")}:
                  </div>
                  <div className="text-18 lg:text-17 md:text-16 fw-600 text-neutral-800">
                    {formatStringToDate(bookingInfo?.checkOutDate)}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row justify-between pt-10 pt-md-50">
                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.HOTEL_NAME")}:
                  </div>
                  <p className="text-18 lg:text-17 md:text-16 fw-600 text-neutral-500">
                    {bookingInfo?.supplierName}
                  </p>
                </div>
                {/* End .col */}

                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.CUSTOMER")}:
                  </div>
                  <p className="text-18 lg:text-17 md:text-16 fw-600 text-neutral-800">
                    {bookingInfo?.customerName}
                  </p>
                </div>
              </div>
              {/* End .row */}

              <div className="row pt-20 pt-md-50 overflow-x-auto mw-100">
                <div className="col-12">
                  {isMobile ? (
                    <>
                      {bookingInfo?.details?.map((item, index) => (
                        <div key={index}>
                          <p className="text-16 text-neutral-800 fw-600 mb-16 md:mb-6">
                            {t("COMMON.ROOM")} {index + 1}
                          </p>
                          <p className="text-18 lg:text-17 md:text-16 fw-600 text-action-highlight">
                            {item?.roomName}
                          </p>
                          <div className="d-flex items-center">
                            <img
                              alt="icon"
                              src="/images/HotelList/icon-bed.png"
                              className="mr-8"
                            />
                            <p className="text-14 text-neutral-500 mb-33 md:mb-0">
                              {item?.serviceName}
                            </p>
                          </div>
                          <div className="d-flex justify-between mb-16 md:mb-6">
                            <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                              {t("BOOKING_SUCCESS_HOTEL.PRICE")}
                            </p>

                            <PriceWithVND
                              price={bookingInfo?.totalAmount}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-16 lg:text-15 md:text-14 fw-700 text-secondary-500"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </div>
                          <div className="d-flex justify-between mb-16 md:mb-6">
                            <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                              {t("COMMON.DISCOUNT")}
                            </p>

                            <PriceWithVND
                              price={bookingInfo?.totalDiscount}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-18 lg:text-17 md:text-16 fw-500 text-action-success"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </div>
                          <div className="d-flex justify-between mb-24 md:mb-6">
                            <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                              {t("BOOKING_SUCCESS_HOTEL.REMAINING_AMOUNT")}
                            </p>

                            <PriceWithVND
                              price={bookingInfo?.totalPayment}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-24 lg:text-22 md:text-20 fw-700 text-primary-500"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <table className="table col-12 pt-0 mb-0 table_invoice_hotel">
                      <thead className="text-blue-1">
                        <tr>
                          <th>{t("COMMON.ROOM")}</th>
                          <th>{t("BOOKING_SUCCESS_HOTEL.PRICE")}</th>
                          <th>{t("COMMON.DISCOUNT")}</th>
                          <th>{t("BOOKING_SUCCESS_HOTEL.REMAINING_AMOUNT")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingInfo?.details?.map((item, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                minWidth: "220px",
                              }}
                            >
                              <div className="d-flex items-center lg:flex-column lg:items-start">
                                <p className="fw-500 text-action-highlight mr-4">
                                  {t("COMMON.ROOM")} {index + 1}:
                                </p>
                                <p className="fw-700 text-action-highlight">
                                  {item?.roomName}{" "}
                                </p>
                              </div>
                              <p className="fw-400 text-14 text-neutral-500">
                                <img
                                  alt="icon"
                                  src="/images/HotelList/icon-bed.png"
                                  className="mr-8"
                                />
                                {item?.serviceName}
                              </p>
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <p className="fw-400 text-14 text-neutral-500">
                                      {addOn?.serviceName} x {addOn?.quantity}
                                    </p>
                                  </div>
                                ))}
                            </td>
                            <td>
                              <PriceWithVND
                                price={item?.totalAmount}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="text-16 fw-400 text-neutral-800"
                                helperClassName="text-12 text-neutral-500"
                              />
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <PriceWithVND
                                      price={addOn?.totalAmount}
                                      currencyRate={bookingInfo?.currencyRate}
                                      currencyCode={bookingInfo?.currencyCode}
                                      className="text-16 fw-400 text-neutral-800"
                                      helperClassName="text-12 text-neutral-500"
                                    />
                                  </div>
                                ))}
                            </td>
                            <td>
                              <PriceWithVND
                                price={item?.totalDiscount}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="text-16 fw-400 text-neutral-800"
                                helperClassName="text-12 text-neutral-500"
                              />
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <PriceWithVND
                                      price={addOn?.totalDiscount}
                                      currencyRate={bookingInfo?.currencyRate}
                                      currencyCode={bookingInfo?.currencyCode}
                                      className="text-16 fw-400 text-neutral-800"
                                      helperClassName="text-12 text-neutral-500"
                                    />
                                  </div>
                                ))}
                            </td>
                            <td>
                              <PriceWithVND
                                price={item?.totalPayment}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="text-16 fw-400 text-neutral-800"
                                helperClassName="text-12 text-neutral-500"
                              />
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <PriceWithVND
                                      price={addOn?.totalPayment}
                                      currencyRate={bookingInfo?.currencyRate}
                                      currencyCode={bookingInfo?.currencyCode}
                                      className="text-16 fw-400 text-neutral-800"
                                      helperClassName="text-12 text-neutral-500"
                                    />
                                  </div>
                                ))}
                            </td>
                          </tr>
                        ))}
                        {bookingInfo?.vouchers
                          ?.filter((item) => item.voucherCode)
                          .map((voucher, index) => (
                            <tr key={index} style={{ verticalAlign: "middle" }}>
                              <td>
                                <span
                                  style={{
                                    color: "#706262",
                                    fontSize: "13px",
                                  }}
                                >
                                  {t("BOOKING_SUCCESS_HOTEL.PROMOTION")}
                                </span>
                                <br />
                                {voucher?.voucherName}
                              </td>
                              <td>
                                <PriceWithVND
                                  price={0}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="text-16 fw-400 text-neutral-800"
                                  helperClassName="text-12 text-neutral-500"
                                />
                              </td>
                              <td>
                                <PriceWithVND
                                  price={voucher?.totalDiscount}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="text-16 fw-400 text-neutral-800"
                                  helperClassName="text-12 text-neutral-500"
                                />
                              </td>
                              <td>
                                <span className="text-16 fw-400 text-neutral-800">- </span>
                                <PriceWithVND
                                  price={voucher?.totalDiscount}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="text-16 fw-400 text-neutral-800"
                                  helperClassName="text-12 text-neutral-500"
                                />
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td className="text-md-18 fw-500">
                            {t("COMMON.TOTAL_AMOUNT")}
                          </td>
                          <td
                            style={{
                              color: "#00AEED",
                            }}
                          >
                            <PriceWithVND
                              price={bookingInfo?.totalAmount}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-18 fw-500"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </td>
                          <td
                            style={{
                              color: "#00B507",
                            }}
                          >
                            <PriceWithVND
                              price={bookingInfo?.totalDiscount}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-18 fw-500"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </td>
                          <td
                            style={{
                              color: "#F52549",
                            }}
                          >
                            <PriceWithVND
                              price={bookingInfo?.totalPayment}
                              currencyRate={bookingInfo?.currencyRate}
                              currencyCode={bookingInfo?.currencyCode}
                              className="text-18 fw-500"
                              helperClassName="text-12 text-neutral-500"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End layout-pt */}

            <div className="border-top-light pt-20 mx-20">
              <div className="row x-gap-60 y-gap-10 justify-center lg:mb-30">
                {contactData.map((contact, index) => (
                  <div className="col-auto" key={index}>
                    <a
                      href={contact.url}
                      className="text-16 lg:text-15 md:text-14 text-primary-500"
                    >
                      {contact.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {/* End border-top */}
          </div>
        </div>
      </div>
    </section>
  );
}
