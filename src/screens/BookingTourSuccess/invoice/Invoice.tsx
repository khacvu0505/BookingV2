import { formatStringToDate } from "@/utils/utils";
import React from "react";
import "./Invoice.style.scss";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";
import PriceWithVND from "@/components/PriceWithVND/PriceWithVND";

export default function InvoiceComponent({ bookingInfo }) {
  const { t } = useTranslation();
  const isMobile = useWindowSize().width < 768;

  const contactData = [
    { url: "#", text: "https://OKdimall.com/" },
    { url: "#", text: "booking@okdimall.com" },
    { url: "#", text: "+84 886 479 456" },
  ];

  return (
    <section
      className="rounded-8 mb-50 bg-white pl-20 lg:pl-10 sm:pl-0"
      style={{
        borderLeft: "3px solid red",
      }}
    >
      <div className="container lg:mx-0">
        <div className="row justify-center px-0">
          <div className="">
            <div className="bg-white rounded-4 ">
              <div className="row justify-between pt-10 pt-md-50">
                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("BOOKING_SUCCESS_TOUR.START_DATE")}:{" "}
                  </div>
                  <div className="text-18 lg:text-16 md:text-14 fw-600 text-neutral-800">
                    {formatStringToDate(bookingInfo?.formDate)}
                  </div>
                </div>
                {/* end .col */}

                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("BOOKING_SUCCESS_TOUR.START_DATE")}:{" "}
                  </div>
                  <div className="text-18 lg:text-16 md:text-14 fw-600 text-neutral-800">
                    {formatStringToDate(bookingInfo?.toDate)}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row justify-between pt-10 pt-md-50">
                <div className="col-md-6">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.TOUR_NAME")}:{" "}
                  </div>
                  <p className="text-16 lg:text-15 md:text-14 fw-600 text-action-highlight">
                    {bookingInfo?.supplierName}
                  </p>
                </div>
                {/* End .col */}

                <div className="col-md-6 mt-10 mt-md-0">
                  <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                    {t("COMMON.CUSTOMER")}:
                  </div>
                  <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                    {bookingInfo?.customerName}
                  </p>
                </div>
                {bookingInfo?.pickUp && (
                  <div className="col-md-6 mt-10 mt-md-0">
                    <div className="text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                      {t("TOUR_BOOKING.PICKUP_LOCATION")}
                    </div>
                    <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800 text-truncate">
                      {bookingInfo?.pickUp}
                    </p>
                  </div>
                )}
                {bookingInfo?.dropOff && (
                  <div className="col-md-6 mt-10 mt-md-0">
                    <div className="text-16 text-16 lg:text-15 md:text-14 fw-400 text-neutral-500">
                      {t("TOUR_BOOKING.DROP_OFF_LOCATION")}
                    </div>
                    <p className="text-16 text-16 lg:text-15 md:text-14 fw-600 text-neutral-800 text-truncate">
                      {bookingInfo?.dropOff}
                    </p>
                  </div>
                )}
              </div>
              {/* End .row */}

              <div className="row pt-20 pt-md-50 overflow-x-auto mw-100">
                <div className="col-12">
                  {isMobile ? (
                    <>
                      {bookingInfo?.servicePrices?.map((item, index) => (
                        <div key={index} className="border-bottom-light py-10">
                          <p className="text-16 lg:text-15 md:text-14 fw-500 text-neutral-800">
                            {bookingInfo?.tourName}
                          </p>
                          <div className="d-flex items-center">
                            <p className="text-14 text-neutral-800">
                              <span className="text-primary-500">
                                x{item.quantity}
                              </span>{" "}
                              {item?.serviceName} (
                              <PriceWithVND
                                price={item.totalPayment}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="fw-500"
                                helperClassName="text-10 text-neutral-500"
                              />
                              )
                            </p>
                          </div>
                          {/* <div className="d-flex items-center mb-10">
                            <p className="text-14 fw-400 text-neutral-800 mr-4">
                              Giảm giá:
                            </p>
                            <p className="text-16 fw-400 text-neutral-800">
                              {formatCurrency(item?.totalDiscount)}{" "}
                              {currentCurrency}
                            </p>
                          </div>
                          <div className="d-flex items-center mb-10">
                            <p className="text-14 fw-400 text-neutral-800 mr-4">
                              Còn lại:
                            </p>
                            <p className="text-16 fw-400 text-neutral-800">
                              {formatCurrency(item?.totalPayment)}{" "}
                              {currentCurrency}
                            </p>
                          </div> */}
                        </div>
                      ))}
                      {bookingInfo?.addOns?.length > 0 &&
                        bookingInfo.addOns.map((item, index) => (
                          <div key={index} className="border-bottom-light">
                            <div className="d-flex items-center">
                              <p className="text-14 text-neutral-800 py-10 ">
                                <span className="text-primary-500">
                                  x{item.quantity}
                                </span>{" "}
                                {item?.serviceName} (
                                <PriceWithVND
                                  price={item.totalPayment}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="fw-500"
                                  helperClassName="text-10 text-neutral-500"
                                />
                                )
                              </p>
                            </div>
                          </div>
                        ))}
                      {/* <div className="d-flex justify-between mb-16">
                        <p className="text-16 fw-600 text-neutral-800">Giá</p>

                        <p className="text-16 fw-700 text-secondary-500">
                          {formatCurrency(bookingInfo?.totalAmount)}{" "}
                          {currentCurrency}
                        </p>
                      </div> */}
                      <div className="d-flex justify-between mb-16">
                        <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                          {t("COMMON.DISCOUNT")}:{" "}
                        </p>

                        <PriceWithVND
                          price={bookingInfo?.totalDiscount}
                          currencyRate={bookingInfo?.currencyRate}
                          currencyCode={bookingInfo?.currencyCode}
                          className="text-18 lg:text-17 md:text-16 fw-500 text-action-success"
                          helperClassName="text-12 text-neutral-500"
                        />
                      </div>
                      <div className="d-flex justify-between mb-24">
                        <p className="text-16 lg:text-15 md:text-14 fw-600 text-neutral-800">
                          {t("COMMON.REMAINING_AMOUNT")}:{" "}
                        </p>

                        <PriceWithVND
                          price={bookingInfo?.totalPayment}
                          currencyRate={bookingInfo?.currencyRate}
                          currencyCode={bookingInfo?.currencyCode}
                          className="text-24 lg:text-20 md:text-20 fw-700 text-primary-500"
                          helperClassName="text-12 text-neutral-500"
                        />
                      </div>
                    </>
                  ) : (
                    <table className="table col-12 pt-0 mb-0">
                      <thead className="bg-blue-1-05 text-blue-1">
                        <tr>
                          <th>{t("COMMON.SERVICE")}</th>
                          <th> {t("COMMON.DISCOUNT")}</th>
                          <th>{t("COMMON.REMAINING_AMOUNT")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingInfo?.servicePrices?.map((item, index) => (
                          <tr key={index}>
                            <td style={{ minWidth: 300 }}>
                              <p className="text-16 fw-600 text-neutral-800">
                                {bookingInfo?.tourName}
                              </p>
                              <p className="text-14 text-neutral-800">
                                <span className="text-14 text-primary-500">
                                  x{item.quantity}
                                </span>{" "}
                                {item?.serviceName}
                              </p>
                            </td>

                            <td>
                              <PriceWithVND
                                price={item?.totalDiscount}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="text-16 fw-400 text-neutral-800"
                                helperClassName="text-12 text-neutral-500"
                              />
                            </td>
                            <td>
                              <PriceWithVND
                                price={item?.totalPayment}
                                currencyRate={bookingInfo?.currencyRate}
                                currencyCode={bookingInfo?.currencyCode}
                                className="text-16 fw-400 text-neutral-800"
                                helperClassName="text-12 text-neutral-500"
                              />
                            </td>
                          </tr>
                        ))}
                        {bookingInfo?.addOns?.length > 0 &&
                          bookingInfo.addOns.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <p className="text-14 text-neutral-800">
                                  <span className="text-14 text-primary-500">
                                    x{item.quantity}
                                  </span>{" "}
                                  {item?.serviceName}
                                </p>
                              </td>
                              <td>
                                <PriceWithVND
                                  price={item?.totalDiscount}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="text-16 fw-400 text-neutral-800"
                                  helperClassName="text-12 text-neutral-500"
                                />
                              </td>
                              <td>
                                <PriceWithVND
                                  price={item?.totalPayment}
                                  currencyRate={bookingInfo?.currencyRate}
                                  currencyCode={bookingInfo?.currencyCode}
                                  className="text-16 fw-400 text-neutral-800"
                                  helperClassName="text-12 text-neutral-500"
                                />
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
                                  {t("COMMON.PROMOTION")}
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
                          <td className="text-md-18 fw-500">Tổng tiền</td>

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
              {/* End layout-pt */}

              <div className="border-top-light pt-20">
                <div className="row x-gap-60 y-gap-10 justify-center">
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
      </div>
    </section>
  );
}
