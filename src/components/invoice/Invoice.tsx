import { formatCurrency, formatStringToDate } from "@/utils/utils";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function InvoiceComponent({ bookingInfo }) {
  const { currentCurrency } = useSelector((state) => state.app);
  const contactData = [
    { url: "#", text: "https://okdimall.com/" },
    { url: "#", text: "invoice@okdimall.com" },
    { url: "#", text: "(123) 123-456" },
  ];

  const handlePrintClick = () => {
    // eslint-disable-next-line no-undef
    window.print();
  };

  // const items = [
  //   { description: "Standard Plan", price: 443.0, vat: 921.8, total: 9243 },
  //   { description: "Extra Plan", price: 413.0, vat: 912.8, total: 5943 },
  // ];

  // const total = items.reduce((acc, item) => acc + item.total, 0);
  return (
    <section className="bg-blue-2 py-10 px-10 rounded-8">
      <div className="container">
        <div className="row justify-center">
          <div className="py-10">
            <div className="bg-white rounded-4">
              <div className="px-20">
                <div className="row justify-between pt-10 pt-md-50">
                  <div className="col-auto">
                    <div className="text-15 text-light-1">Ngày nhận:</div>
                    <div className="text-15 fw-500 lh-15">
                      {formatStringToDate(bookingInfo?.checkInDate)}
                    </div>
                  </div>
                  {/* end .col */}

                  <div className="col-xl-4">
                    <div className="text-15 text-light-1">Ngày trả:</div>
                    <div className="text-15 fw-500 lh-15">
                      {formatStringToDate(bookingInfo?.checkOutDate)}
                    </div>
                  </div>
                </div>
                {/* End .row */}

                <div className="row justify-between pt-10 pt-md-50">
                  <div className="col-auto">
                    <div className="text-md-16">Tên khách sạn:</div>
                    <p className="text-16 text-md-18 fw-500 text-dark-1">
                      {bookingInfo?.supplierName}
                    </p>
                  </div>
                  {/* End .col */}

                  <div className="col-xl-4 mt-10 mt-md-0">
                    <div className="text-md-16">Khách hàng</div>
                    <p className="text-16 text-md-18 fw-500 text-dark-1">
                      {bookingInfo?.customerName}
                    </p>
                  </div>
                </div>
                {/* End .row */}

                <div className="row pt-20 pt-md-50 overflow-x-auto mw-100">
                  <div className="col-12">
                    <table className="table col-12 pt-0">
                      <thead className="bg-blue-1-05 text-blue-1">
                        <tr>
                          <th>Phòng</th>
                          <th>Giá</th>
                          <th>Giảm giá</th>
                          <th>Còn lại</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingInfo?.details?.map((item, index) => (
                          <tr key={index}>
                            <td style={{ minWidth: 300 }}>
                              {item?.roomName} - {item?.serviceName}
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <p className="text-15 text-dark-1">
                                      {addOn?.serviceName} x {addOn?.quantity}
                                    </p>
                                  </div>
                                ))}
                            </td>
                            <td>
                              {formatCurrency(item?.totalAmount)}{" "}
                              {currentCurrency}
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <p className="text-15 text-dark-1">
                                      {formatCurrency(addOn?.totalAmount)}{" "}
                                      {currentCurrency}
                                    </p>
                                  </div>
                                ))}
                            </td>
                            <td>
                              {formatCurrency(item?.totalDiscount)}{" "}
                              {currentCurrency}
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <p className="text-15 text-dark-1">
                                      {formatCurrency(addOn?.totalDiscount)}{" "}
                                      {currentCurrency}
                                    </p>
                                  </div>
                                ))}
                            </td>
                            <td>
                              {formatCurrency(item?.totalPayment)}{" "}
                              {currentCurrency}
                              {item?.addOns.length > 0 &&
                                item?.addOns.map((addOn, idx) => (
                                  <div key={idx}>
                                    <p className="text-15 text-dark-1">
                                      {formatCurrency(addOn?.totalPayment)}{" "}
                                      {currentCurrency}{" "}
                                    </p>
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
                                  Khuyến mãi
                                </span>
                                <br />
                                {voucher?.voucherName}
                              </td>
                              <td>0 {currentCurrency}</td>
                              <td>
                                {formatCurrency(voucher?.totalDiscount)}{" "}
                                {currentCurrency}
                              </td>
                              <td>
                                - {formatCurrency(voucher?.totalDiscount)}{" "}
                                {currentCurrency}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td className="text-md-18 fw-500">Tổng tiền</td>
                          <td className="text-md-18 fw-500">
                            {formatCurrency(bookingInfo?.totalAmount)}{" "}
                            {currentCurrency}
                          </td>
                          <td className="text-md-18 fw-500 text-success">
                            {formatCurrency(bookingInfo?.totalDiscount)}{" "}
                            {currentCurrency}
                          </td>
                          <td className="text-md-20 text-danger fw-500">
                            {formatCurrency(bookingInfo?.totalPayment)}{" "}
                            {currentCurrency}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* End .row */}
              </div>
              {/* End layout-pt */}

              <div className="border-top-light py-50">
                <div className="row x-gap-60 y-gap-10 justify-center">
                  {contactData.map((contact, index) => (
                    <div className="col-auto" key={index}>
                      <a href={contact.url} className="text-14">
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
