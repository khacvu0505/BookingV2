import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/schemas/paymentSchema";
import { useEffect, useMemo, useRef, useState } from "react";
import { useVerifyIsLogin } from "@/hooks/useVerifyIsLogin";

import {
  getBookingExpired,
  getHoldTime,
  saveBookingTour,
} from "@/api/booking.api";
import Select from "react-select";

import { paymentInfo } from "./CustomerInfo.constant";
import { booking_id, hold_code, info_booking_tour } from "@/utils/constants";

import classNames from "classnames";
import useWindowSize from "@/utils/useWindowSize";
import { getFromSessionStorage, setToSessionStorage } from "@/utils/utils";
import useCustomerInfoHook from "./CustomerInfo.hook";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import VerifyOTPModal from "./VerifyOTPModal";
import BookingOverView from "./BookingOverView";
import SidebarRightTour from "@/components/booking-page/SideBarRightTour";
import BookingOverviewTour from "./BookingOverviewTour";

interface TourBookingSessionData {
  ServicePrices?: Array<{ serviceID?: string; quantity?: number; [key: string]: unknown }>;
  supplierCode?: string;
  date?: string | Date;
  tourID?: string;
  isNeedApproval?: boolean;
  [key: string]: unknown;
}

interface DataSuccessInfo {
  email: string;
  bookingID: string;
}

interface ImperativeRef {
  setIsVisible: (visible: boolean) => void;
  [key: string]: unknown;
}

const CustomerInfoTour = () => {
  const isMobile = useWindowSize().width < 768;
  const infoBooking = getFromSessionStorage<TourBookingSessionData>(info_booking_tour);
  const profile = useSelector((state) => state.app.profile);
  const { countryList } = useCustomerInfoHook();
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const [holdTime, setHoldTime] = useState("");
  const [promitionCode, setPromotionCode] = useState("");
  const islogin = useVerifyIsLogin();
  const [paymentType, setPaymentType] = useState("");
  const [dataSuccess, setDataSuccess] = useState<DataSuccessInfo | null>(null);
  const refOTPModal = useRef<ImperativeRef | null>(null);
  const refBookingOverview = useRef<ImperativeRef | null>(null);
  const refBookingOverviewTour = useRef<ImperativeRef | null>(null);
  const emailCustomer = profile?.email || "";

  const customStyles = {
    control: (base: Record<string, unknown>) => ({
      ...base,
      height: 70,
      minHeight: 70,
    }),
  };

  const paymentInfoOptions = useMemo(() => {
    if (islogin) {
      return paymentInfo;
    }
    return paymentInfo.filter((payment) => !payment.isAuthorization);
  }, [paymentInfo]);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setFocus,
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: emailCustomer || "",
      mobileNo: "",
      specialRequest: "",
      isVisitedCustomer: false,
      customerName: "",
      customerMobileNo: "",
      countryFID: "" as any,
      mobileCode: "" as any,
      // invoice info
      isInvoice: false,
      companyName: "",
      taxCode: "",
      emailReceiveInvoice: "",
      companyAddress: "",
    } as any,
    resolver: yupResolver(paymentSchema) as any,
  });

  const handleFormatDataBooking = (data: Record<string, any>) => {
    const booking_idSS = getFromSessionStorage<string>(booking_id) || "";
    const {
      firstName = "",
      lastName = "",
      email = "",
      mobileNo = "",
      specialRequest = "",
      mobileCode = "+84",
      isVisitedCustomer,
      customerName,
      customerMobileNo,
      countryFID,
      isInvoice,
      companyName,
      taxCode,
      emailReceiveInvoice,
      companyAddress,
    } = data || {};
    const isOwner = !isVisitedCustomer;
    const bookingInfo = {
      salutation: "Mr",
      countryFID: countryFID?.value || "1",
      mobileCode: mobileCode || "+84",
      firstName,
      lastName,
      email,
      mobileNo: mobileNo ? mobileNo.slice(1) : "",
      specialRequest,
      paymentType,
      isVisitedCustomer: isOwner,
      customerName: isOwner ? "" : customerName,
      customerMobileNo: isOwner ? "" : customerMobileNo,
      isExportInvoice: Boolean(isInvoice),
      companyName,
      taxCode,
      receivedEmail: emailReceiveInvoice,
      companyAddress,
    };
    const ServicePrices = infoBooking?.ServicePrices?.filter(
      (item) => (item?.quantity ?? 0) > 0
    );

    const dataFormatted = {
      id: booking_idSS ? booking_idSS : "",
      bookingInfo,
      supplierCode: infoBooking?.supplierCode,
      date: infoBooking?.date || new Date(),
      voucherFID: "",
      tourID: infoBooking?.tourID,
      isNeedApproval: Boolean(infoBooking?.isNeedApproval),
      ServicePrices: ServicePrices?.map((item) => ({
        serviceID: item?.serviceID,
        quantity: item?.quantity,
      })),
    };

    return dataFormatted;
  };

  const handleSubmitForm = (data: Record<string, any>) => {
    if (!paymentType) {
      handleRenderNoti("Vui lòng chọn phương thức thanh toán", "error");
      return;
    }

    setIsSubmmitting(true);
    const dataFormatted = handleFormatDataBooking(data);

    try {
      saveBookingTour(dataFormatted)
        .then((res) => {
          const isSuccess = res.success;
          if (isSuccess) {
            const resData = res?.data as Record<string, any>;
            setDataSuccess({
              email: resData?.email || "",
              bookingID: resData?.bookingID || "",
            });
            setIsSubmmitting(false);
            refBookingOverviewTour.current?.setIsVisible(true);
            // refBookingOverview.current.setIsVisible(true);
            setToSessionStorage(booking_id, resData?.bookingID || "");
          } else {
            handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
          }
          setIsSubmmitting(false);
        })
        .catch(() => {
          setIsSubmmitting(false);
          handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
        });
    } catch (error) {
      handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
      throw error;
    }
  };

  const handleChoosePaymentTye = (code: string) => {
    setPaymentType(code);
  };

  useEffect(() => {
    setValue("email", emailCustomer);
  }, [emailCustomer]);

  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      setFocus(firstErrorKey as any);
    }
  }, [errors]);

  useEffect(() => {
    const holdCode = getFromSessionStorage<string>(hold_code);

    try {
      getHoldTime(holdCode ?? "")
        .then((res) => {
          const isSuccess = res.success;
          if (isSuccess) {
            setHoldTime((res?.data as string) || "");
          } else {
            setHoldTime("");
          }
        })
        .catch(() => {
          setHoldTime("");
        });
    } catch (error) {
      handleRenderNoti("Có lỗi xảy ra, vui lòng thử lại sau", "error");
      throw error;
    }

    return () => {
      getBookingExpired(holdCode ?? "");
    };
  }, []);

  return (
    <>
      <div className="col-xl-7 col-lg-8 mt-30">
        <h2 className="text-18 fw-500 bg-light-2 px-10 py-10 text-dark-2 rounded-4">
          Thông tin liên hệ
        </h2>
        <div className="row x-gap-20 y-gap-20 pt-20 ">
          <div className="col-md-6">
            <div className="form-input ">
              <input type="text" required {...register("firstName")} />
              <label className="lh-1 text-16 text-light-1">
                Tên <span className="text-danger"> *</span>
              </label>
            </div>
            {errors.firstName &&
              handleRenderMessageError(errors.firstName.message as string)}
          </div>
          {/* End col-6 */}
          <div className="col-md-6">
            <div className="form-input ">
              <input type="text" required {...register("lastName")} />
              <label className="lh-1 text-16 text-light-1">
                Họ <span className="text-danger"> *</span>
              </label>
            </div>
            {errors.lastName &&
              handleRenderMessageError(errors.lastName.message as string)}
          </div>

          {/* End col-6 */}

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                required
                {...register("email")}
                disabled={emailCustomer ? true : false}
              />
              <label className="lh-1 text-16 text-light-1">
                Email
                <span className="text-danger"> *</span>
              </label>
            </div>
            {errors.email && handleRenderMessageError(errors.email.message as string)}
          </div>
          <div className="col-md-6">
            <Controller
              name="countryFID"
              control={control}
              defaultValue={"" as any}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Chọn quốc gia ..."
                  onChange={(selectedOption: any) => {
                    setValue("mobileCode", selectedOption.mobileCode);
                    setValue("countryFID", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={countryList}
                  styles={customStyles}
                />
              )}
            />
            {errors.countryFID &&
              handleRenderMessageError(errors.countryFID.message as string)}
          </div>

          {/* <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                required
                {...register("mobileCode")}
                disabled
              />
              <label className="lh-1 text-16 text-light-1">Mã vùng</label>
            </div>
            {errors.mobileCode &&
              handleRenderMessageError(errors.mobileCode.message)}{" "}
          </div> */}

          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <span className="input-group-text" style={{ height: "70px" }}>
                {(watch("countryFID") as any)?.mobileCode || `+84`}
              </span>
              <div className="form-input w-100">
                <input
                  className="w-100"
                  type="text"
                  required
                  {...register("mobileNo")}
                />
                <label className="lh-1 text-16 text-light-1">
                  Số điện thoại
                  <span className="text-danger"> *</span>
                </label>
              </div>
            </div>
            {errors.mobileNo &&
              handleRenderMessageError(errors.mobileNo.message as string)}
          </div>

          <div className="col-12">
            <div className="form-input ">
              <textarea
                required
                rows={6}
                defaultValue={""}
                {...register("specialRequest")}
              />
              <label className="lh-1 text-16 text-light-1">
                Yêu cầu đặc biệt
              </label>
            </div>
          </div>

          {/* End col-12 */}
          <div className="col-12">
            <div
              className="form-checkbox px-10 d-flex align-items-center mb-20"
              data-bs-toggle="collapse"
              data-bs-target={`#info-customer`}
            >
              <input
                type="checkbox"
                name="isVisitedCustomer"
                {...register("isVisitedCustomer")}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <p className="ml-10 text-dark-2">Đặt tour này cho người khác</p>
            </div>
            <div
              className="accordion-collapse collapse"
              id={"info-customer"}
              data-bs-parent="#Faq1"
            >
              <div className="py-15 px-20 rounded-4 bg-light-2 border-light">
                <div className="col-12 mb-20">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("customerName")}
                      className="bg-white"
                      // style={{ background: "white" }}
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Thông tin khách hàng
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.customerName &&
                    handleRenderMessageError(errors.customerName.message as string)}
                </div>
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("customerMobileNo")}
                      className="bg-white"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      SĐT khách hàng
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.customerMobileNo &&
                    handleRenderMessageError(errors.customerMobileNo.message as string)}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div
              className="form-checkbox px-10 d-flex align-items-center mb-20"
              data-bs-toggle="collapse"
              data-bs-target="#invoice-info"
            >
              <input
                type="checkbox"
                name="isInvoice"
                {...register("isInvoice")}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <p className="ml-10 text-dark-2">Xuất hóa đơn</p>
            </div>
            <div
              className="accordion-collapse collapse"
              id="invoice-info"
              data-bs-parent="#Faq1"
            >
              <div className="py-15 px-20 rounded-4 bg-light-2 border-light">
                <div className="col-12 mb-20">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("companyName")}
                      className="bg-white"
                      // style={{ background: "white" }}
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Tên công ty
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.companyName &&
                    handleRenderMessageError(errors.companyName.message as string)}
                </div>
                <div className="col-12 mb-20">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("taxCode")}
                      className="bg-white"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Mã số thuế
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.taxCode &&
                    handleRenderMessageError(errors.taxCode.message as string)}
                </div>
                <div className="col-12 mb-20">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("companyAddress")}
                      className="bg-white"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Điạ chỉ công ty
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.companyAddress &&
                    handleRenderMessageError(errors.companyAddress.message as string)}
                </div>
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      {...register("emailReceiveInvoice")}
                      className="bg-white"
                    />
                    <label className="lh-1 text-16 text-light-1">
                      Email
                      <span className="text-danger"> *</span>
                    </label>
                  </div>
                  {errors.emailReceiveInvoice &&
                    handleRenderMessageError(
                      errors.emailReceiveInvoice.message as string
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-method border-1 border-light rounded-4 ">
          <h2 className="text-18 fw-500 bg-light-2 px-10 py-10 text-dark-2 rounded-4 px-10 py-10">
            Phương thức thanh toán
          </h2>
          <div className="px-10 py-10">
            {paymentInfoOptions.map((payment) => (
              <div
                key={payment.id}
                className={classNames(
                  "form-checkbox  items-center justify-content-between flex-wrap px-10 border-bottom-light rounded-4 py-10 my-10",
                  {
                    "d-flex": !isMobile,
                    "d-block": isMobile,
                  }
                )}
                onClick={() => handleChoosePaymentTye(payment.code)}
              >
                <div className="d-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={payment.code === paymentType}
                    onChange={() => {}}
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check" />
                  </div>
                  <p className="ml-10 text-dark-2">{payment.title}</p>
                </div>
                <div className="text-15 ml-10 d-flex justify-content-end justify-content-md-between align-items-center mt-10 md-md-0">
                  {payment.img.map((img, index) => (
                    <img key={index} src={img} alt="logo" className="mx-1" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="col-12">
          <div className="row y-gap-20 items-center">
            <div className="col-auto">
              <div className="text-14 text-light-1 d-flex justify-content-start mt-10">
                <p className="mr-10 mt-1">


                  <div className="form-checkbox px-10 mt-4 mb-20">
                    <input
                      type="checkbox"
                      name="isInvoice"
                      value={isAccepted}
                      onChange={() => setIsAccepted(!isAccepted)}
                    />
                    <div className="form-checkbox__mark">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                  </div>
                </p>
                {`Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin trên và đồng ý với các điều khoản, điều kiện và chính sách quyền riêng tư của OKdimall.`}
              </div>
            </div>

          </div>
        </div> */}
        {/* End col-12 */}

        <div className="d-flex justify-content-end w-100">
          <button
            type="submit"
            className=" button -dark-1 btn-lg px-30 mt-20 h-60 bg-blue-1 text-white"
            onClick={handleSubmit(handleSubmitForm as any)}
            disabled={isSubmmitting}
          >
            {isSubmmitting ? (
              <>
                <span className="loader"></span>
                <span className="ml-10">Đang xử lý...</span>
              </>
            ) : (
              <>
                <img src="/img/payments/lock.svg" alt="lock" />
                <span className="ml-10">Thanh toán</span>
              </>
            )}
          </button>
        </div>

        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          {/* <BookingDetails /> */}
          <SidebarRightTour
            holdTime={holdTime}
            setPromotionCode={setPromotionCode}
            isCreateInvoice={Boolean(watch("isInvoice"))}
          />
        </div>
      </div>
      {/*  */}
      <VerifyOTPModal
        ref={refOTPModal}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
      />
      <BookingOverView
        ref={refBookingOverview}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
        refOTPModal={refOTPModal}
      />
      <BookingOverviewTour
        ref={refBookingOverviewTour}
        email={dataSuccess?.email}
        refOTPModal={refOTPModal}
      />
    </>
  );
};

export default CustomerInfoTour;
