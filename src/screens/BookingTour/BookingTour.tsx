import MetaComponent from "@/components/MetaComponent";
import React, { lazy, useEffect, useMemo, useRef, useState } from "react";

import Input from "@/components/Form/Input";
import { Controller, useForm } from "react-hook-form";
import Select from "@/components/Form/Select";
import TextArea from "@/components/Form/TextArea";
import Checkbox from "@/components/Form/Checkbox";
import Button from "@/components/Button";
import useWindowSize from "@/utils/useWindowSize";
import {
  clearSessionStorage,
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/utils";
import {
  booking_id,
  BREAKPOINT_XL,
  create_invoice,
  info_booking_tour,
  previous_item,
  hold_code,
  tax_include,
} from "@/utils/constants";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import useCustomerInfoHook from "./CustomerInfo.hook";
import { useVerifyIsLogin } from "@/hooks/useVerifyIsLogin";
import { usePaymentInfo } from "@/constants/Booking.constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/schemas/paymentSchema";
import classNames from "classnames";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { saveBookingTour } from "@/api/booking.api";
import "./Booking.style.scss";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import useStorageListener from "@/hooks/useStorageListener";
import { refreshToken } from "@/api/auth.api";
import { saveAccessTokenToLocalStorage } from "@/utils/auth";
import { reset as resetApp } from "@/features/app/appSlice";
import AuthenModal from "@/components/AuthenModal";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const Breadcrumb = lazy(() => import("@/components/Breadcrumb"));
const SidebarRight = lazy(() => import("@/components/Sidebar/SidebarRightTour"));
const TimeRemainning = lazy(() => import("./TimeRemainning"));
const BookingOverviewTour = lazy(() => import("./BookingOverview"));

const metadata = {
  title: "Booking Tours",
  description: "OKdimall - Travel & Tour",
};

const BookingTour = () => {
  const { t } = useTranslation();
  const refSignInModal = useRef<any>(null);
  const dispatch = useAppDispatch();

  const isMobile = useWindowSize().width < 768;
  // eslint-disable-next-line no-undef
  const isTablet = window.innerWidth < BREAKPOINT_XL;
  const infoBooking = getFromSessionStorage(info_booking_tour) as any;
  const profile = useSelector((state: any) => state.app.profile);
  const { countryList } = useCustomerInfoHook();
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const islogin = useVerifyIsLogin();
  const [paymentType, setPaymentType] = useState("");
  const [dataSuccess, setDataSuccess] = useState<any>(null);
  const refOTPModal = useRef<any>(null);
  const refBookingOverviewTour = useRef<any>(null);
  const emailCustomer = profile?.email || "";
  const createInvoice = useStorageListener(create_invoice);

  const breadcrumbData = useMemo(
    () => [
      {
        title: t("COMMON.HOME"),
        link: "/",
      },
      {
        title: infoBooking?.supplierName,
        link: `/tour/${infoBooking?.slug}`,
      },
      {
        title: t("COMMON.BOOKING_DETAIL_INFO"),
      },
    ],
    [t]
  );

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 50,
      minHeight: 50,
      border: "1px solid #ededf4",
      "&:hover": {
        border: "1px solid #ededf4",
      },
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const paymentInfo = usePaymentInfo();

  const paymentInfoOptions = useMemo(() => {
    if (islogin) {
      return paymentInfo;
    }
    return paymentInfo.filter((payment) => !payment.isAuthorization);
  }, [islogin, paymentInfo]);

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
  } = useForm<any>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      specialRequest: "",
      isVisitedCustomer: false,
      customerName: "",
      customerMobileNo: "",
      countryFID: "",
      mobileCode: "",
      // invoice info
      isInvoice: false,
      companyName: "",
      taxCode: "",
      emailReceiveInvoice: "",
      companyAddress: "",
      pickUp: "",
      dropOff: "",
    },
    resolver: yupResolver(paymentSchema) as any,
  });

  const handleFormatDataBooking = (data: any) => {
    const booking_idSS = getFromSessionStorage(booking_id) || "";
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
      pickUp,
      dropOff,
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
      pickUp,
      dropOff,
    };
    const ServicePrices = infoBooking?.ServicePrices?.filter(
      (item) => item?.quantity > 0
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
      addOns: infoBooking?.addons?.map((item) => ({
        ID: item?.serviceID,
        Quantity: item?.count,
      })),
    };

    return dataFormatted;
  };

  const fetchDataRefresh = async () => {
    try {
      const data = await refreshToken();
      if (data?.success) {
        saveAccessTokenToLocalStorage(data?.data as any);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSubmitForm = async (data: any) => {
    if (islogin) {
      const refreshToken = await fetchDataRefresh();
      if (!refreshToken) {
        Swal.fire({
          title: t("COMMON.NOTIFICATION"),
          imageUrl: "/images/Booking/icon-info.png",
          text: t("COMMON.SESSION_EXPIRED"),
          confirmButtonText: t("COMMON.LOGIN_AGAIN"),
          confirmButtonColor: "#f52549",
          cancelButtonText: t("COMMON.CONTINUE_WITHOUT_LOGIN"),
          cancelButtonColor: "#00aeed",
          showCancelButton: true,
          allowEscapeKey: false,
          allowEnterKey: true,
          allowOutsideClick: false,
          position: "top",
          customClass: {
            popup: "mt-30",
          },
        }).then((result) => {
          dispatch(resetApp());
          reset();
          if (result.isConfirmed) {
            refSignInModal?.current?.setIsVisible(true);
            return;
          }
        });

        return;
      }
    }
    if (!paymentType) {
      handleRenderNoti(t("COMMON.PLEASE_CHOOSE_PAYMENT_METHOD"), "error");
      return;
    }

    setIsSubmmitting(true);
    const dataFormatted = handleFormatDataBooking(data);

    try {
      saveBookingTour(dataFormatted)
        .then((res: any) => {
          const isSuccess = res.success;
          if (isSuccess) {
            setDataSuccess({
              email: res?.data?.email || "",
              bookingID: res?.data?.bookingID || "",
            });
            setIsSubmmitting(false);
            refBookingOverviewTour.current.setIsVisible(true);
            // refBookingOverview.current.setIsVisible(true);
            setToSessionStorage(booking_id, res?.data?.bookingID || "");
          } else {
            handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN"), "error");
          }
          setIsSubmmitting(false);
        })
        .catch(() => {
          setIsSubmmitting(false);
          handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN"), "error");
        });
    } catch (error) {
      handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN"), "error");
      throw error;
    }
  };

  const handleChoosePaymentTye = (code: any) => {
    setPaymentType(code);
  };

  useEffect(() => {
    setValue("email", emailCustomer);
  }, [emailCustomer]);

  useEffect(() => {
    setFocus(Object.keys(errors)[0] as any);
  }, [errors]);

  useEffect(() => {
    if (islogin) {
      setValue("email", emailCustomer);
    } else {
      setValue("email", "");
    }
  }, [emailCustomer, islogin]);

  useEffect(() => {
    return () => {
      clearSessionStorage(info_booking_tour);
      clearSessionStorage(booking_id);
      clearSessionStorage(hold_code);
      clearSessionStorage(tax_include);
      clearSessionStorage(create_invoice);
    };
  }, []);

  return (
    <div className="booking_page mb-120 xl:mb-60 md:mt-80">
      <MetaComponent meta={metadata} />
      <div className="container">
        <Breadcrumb data={breadcrumbData} />
      </div>
      <TimeRemainning />

      <div className="container">
        <div className="row">
          <div className="col-xl-8 mt-30 xl:mt-10 booking_page_customer-info">
            <div className="booking_page_customer-info-input px-24 py-24 xl:px-16 sm:px-12 xl:py-16">
              <h2 className="booking_page_customer-info-title">
                {t("COMMON.CUSTOMER_INFO")}
              </h2>
              <div className="row x-gap-20 y-gap-20 pt-20 ">
                <div className="col-md-6">
                  <Input
                    required
                    label={t("COMMON.LABEL_FIRST_NAME")}
                    placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    required
                    label={t("COMMON.LABEL_LAST_NAME")}
                    placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                  />
                </div>

                <div className="col-md-6">
                  <Input
                    required
                    label={"Email"}
                    placeholder={t("COMMON.PLACEHOLDER_EMAIL")}
                    name="email"
                    register={register}
                    error={errors.email}
                    disabled={islogin}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    required
                    label={t("COMMON.LABEL_PHONE")}
                    placeholder={t("COMMON.PLACEHOLDER_PHONE")}
                    name="mobileNo"
                    register={register}
                    error={errors.mobileNo}
                    prefix={watch("countryFID")?.mobileCode || `+84`}
                  />
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        required
                        label={t("TOUR_BOOKING.PICKUP_LOCATION")}
                        placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                        name="pickUp"
                        register={register}
                        error={errors.pickUp}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        required
                        label={t("TOUR_BOOKING.DROP_OFF_LOCATION")}
                        placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                        name="dropOff"
                        register={register}
                        error={errors.dropOff}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <Controller
                    name="countryFID"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={t("COMMON.LABEL_COUNTRY")}
                        required
                        placeholder={t("COMMON.PLACEHOLDER_COUNTRY")}
                        onChange={(selectedOption) => {
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

                <div className="col-12">
                  <TextArea
                    label={t("COMMON.LABEL_REQUEST_MORE")}
                    placeholder={t(
                      "TOUR_BOOKING.LABEL_REQUEST_MORE_DESCRIPTION"
                    )}
                    rows={isMobile ? 4 : 3}
                    name={"specialRequest"}
                    register={register}
                    error={errors.specialRequest}
                  />
                </div>

                {/* End col-12 */}
                <div className="col-12">
                  <div
                    className="form-checkbox d-flex align-items-center mb-20"
                    data-bs-toggle="collapse"
                    data-bs-target={`#info-customer`}
                  >
                    <Checkbox
                      name={"isVisitedCustomer"}
                      register={register}
                      label={t("TOUR_BOOKING.BOOK_FOR_ANOTHER_PERSON")}
                    />
                  </div>
                  <div
                    className="accordion-collapse collapse"
                    id={"info-customer"}
                    data-bs-parent="#Faq1"
                  >
                    <div className="row">
                      <div className="col-md-6 mb-20">
                        <Input
                          required
                          label={t("COMMON.CUSTOMER_INFO")}
                          placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                          name="customerName"
                          register={register}
                          error={errors.customerName}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          required
                          label={t("COMMON.LABEL_PHONE")}
                          placeholder={t("COMMON.PLACEHOLDER_PHONE")}
                          name="customerMobileNo"
                          register={register}
                          error={errors.customerMobileNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="form-checkbox d-flex align-items-center mb-20"
                    data-bs-toggle="collapse"
                    data-bs-target="#invoice-info"
                  >
                    <Checkbox
                      name={"isInvoice"}
                      register={register}
                      label={t("COMMON.GENERATE_INVOICE")}
                      checked={!!createInvoice}
                      onClick={(e) =>
                        setToSessionStorage(create_invoice, e.target.checked)
                      }
                    />
                  </div>
                  <div
                    className="accordion-collapse collapse"
                    id="invoice-info"
                    data-bs-parent="#Faq1"
                  >
                    <div className="row">
                      <div className="col-md-6 mb-20">
                        <Input
                          required
                          label={t("COMMON.LABEL_COMPANY_NAME")}
                          placeholder={t("COMMON.PLACEHOLDER_COMPANY_NAME")}
                          name="companyName"
                          register={register}
                          error={errors.companyName}
                        />
                      </div>
                      <div className="col-md-6 mb-20">
                        <Input
                          required
                          label={t("COMMON.LABEL_TAX_CODE")}
                          placeholder={t("COMMON.PLACEHOLDER_TAX_CODE")}
                          name="taxCode"
                          register={register}
                          error={errors.taxCode}
                        />
                      </div>
                      <div className="col-md-6 mb-20">
                        <Input
                          required
                          label={t("COMMON.LABEL_ADDRESS_COMPANY")}
                          placeholder={t("COMMON.PLACEHOLDER_ADDRESS_COMPANY")}
                          name="companyAddress"
                          register={register}
                          error={errors.companyAddress}
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          required
                          label={"Email"}
                          placeholder={t("COMMON.PLACEHOLDER_EMAIL")}
                          name="emailReceiveInvoice"
                          register={register}
                          error={errors.emailReceiveInvoice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="booking_page_customer-info-payment-method px-24 py-24 xl:px-16 sm:px-12 xl:py-16">
              <div className="payment-method rounded-4 ">
                <h2 className="payment-method-title md:text-15 md:mb-10">
                  {t("COMMON.PAYMENT_METHOD")}
                </h2>
                {paymentInfoOptions.map((payment) => (
                  <div
                    key={payment.id}
                    className={classNames(
                      "form-checkbox items-center justify-content-between flex-wrap border-bottom-light rounded-4 py-10 my-10",
                      {
                        "d-flex": !isMobile,
                        "d-block": isMobile,
                      }
                    )}
                    onClick={() => handleChoosePaymentTye(payment.code)}
                  >
                    <Checkbox
                      name={"paymentMethod"}
                      checked={payment.code === paymentType}
                      onChange={() => {}}
                      label={payment.title}
                      isRadio
                    />
                    <div className="text-15 ml-10 d-flex justify-content-end justify-content-md-between align-items-center mt-10 md-md-0 xl:justify-start xl:ml-25">
                      {payment.img.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="logo"
                          className="mx-1 payment-method-img"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-14 text-neutral-800 mt-10">
                {t("COMMON.PRIVACY_TEXT")}{" "}
                <span
                  className="pointer underline text-primary-500"
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    window.open("/privacy-policy", "_blank");
                  }}
                >
                  {t("COMMON.PRIVACY_POLICY")}
                </span>
              </p>

              <div className="mt-24 d-flex justify-content-end">
                <Button
                  onClick={handleSubmit(handleSubmitForm)}
                  disabled={isSubmmitting}
                >
                  {isSubmmitting ? (
                    <>
                      <span className="loader"></span>
                      <span className="ml-10">
                        {t("COMMON.PROCESSING")} ...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{t("COMMON.PAYMENT")}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* End .row */}
          </div>
          {!isTablet && (
            <div className="col-xl-4 mt-30 d-block xl:d-none">
              <SidebarRight />
            </div>
          )}
        </div>
      </div>
      {/* <VerifyOTPModal
        ref={refOTPModal}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
      /> */}
      {/* <BookingOverview
        ref={refBookingOverview}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
        refOTPModal={refOTPModal}
      /> */}
      <BookingOverviewTour
        ref={refBookingOverviewTour}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
        refOTPModal={refOTPModal}
      />
      <AuthenModal ref={refSignInModal} />
    </div>
  );
};

export default BookingTour;
