import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/schemas/paymentSchema";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
import { useVerifyIsLogin } from "@/hooks/useVerifyIsLogin";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import { saveBooking } from "@/api/booking.api";
// import Select from "react-select";
import useCustomerInfoHook from "./CustomerInfo.hook";
import { getFromSessionStorage, setToSessionStorage, clearSessionStorage } from "@/utils/utils";
import {
  booking_id,
  BREAKPOINT_XL,
  create_invoice,
  info_booking,
  previous_item,
  hold_code,
  tax_include,
} from "@/utils/constants";
import classNames from "classnames";
import useWindowSize from "@/utils/useWindowSize";
import "./Booking.style.scss";
import useStorageListener from "@/hooks/useStorageListener";
import { refreshToken } from "@/api/auth.api";
import { saveAccessTokenToLocalStorage } from "@/utils/auth";
import AuthenModal from "@/apps/AuthenModal";

const TimeRemainning = lazy(() => import("./TimeRemainning"));
const MetaComponent = lazy(() => import("@/apps/MetaComponent"));
const Breadcrumb = lazy(() => import("@/apps/Breadcrumb"));
const Input = lazy(() => import("@/apps/Input"));
const Select = lazy(() => import("@/apps/Select"));
const TextArea = lazy(() => import("@/apps/TextArea"));
const Checkbox = lazy(() => import("@/apps/Checkbox"));
const Button = lazy(() => import("@/apps/Button"));
const SidebarRight = lazy(() => import("@/apps/SidebarRight"));
const VerifyOTPModal = lazy(() => import("./VerifyOTPModal"));
const BookingOverView = lazy(() => import("./BookingOverview"));
import { reset as resetApp } from "@/features/app/appSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { usePaymentInfo } from "@/constants/Booking.constant";
import { useAppDispatch } from "@/store/hooks";

const metadata = {
  title: "Booking Hotels",
  description: "OKdimall - Travel & Tour",
};

const Booking = () => {
  const { t } = useTranslation();
  const refSignInModal = useRef<any>(null);
  const dispatch = useAppDispatch();

  const isMobile = useWindowSize().width < 768;
  // eslint-disable-next-line no-undef
  const isTablet = window.innerWidth < BREAKPOINT_XL;
  const infoBooking = getFromSessionStorage(info_booking) as any;
  const slug = getFromSessionStorage(previous_item) as string;
  const hotelInfo = infoBooking?.hotelInfo || {};
  const createInvoice = useStorageListener<any>(create_invoice);

  const profile = useSelector((state: any) => state.app.profile);
  const { countryList } = useCustomerInfoHook();
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const islogin = useVerifyIsLogin();
  const [paymentType, setPaymentType] = useState("");
  const [smokingRoom, setSmokingRoom] = useState<any>("");
  const [bigBed, setBigBed] = useState<any>("");
  const [dataSuccess, setDataSuccess] = useState<any>(null);
  const refOTPModal = useRef<any>(null);
  const refBookingOverview = useRef<any>(null);
  const emailCustomer = profile?.email || "";

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

  const smokingInfo = [
    {
      id: 1,
      title: t("HOTEL_BOOKING.NO_SMOKING"),
      img: "/images/Booking/no-smoking.png",
      code: 0,
    },
    {
      id: 2,
      title: t("HOTEL_BOOKING.SMOKING"),
      img: "/images/Booking/smoking.png",
      code: 1,
    },
  ];

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
    },
    resolver: yupResolver(paymentSchema) as any,
  });

  const breadcrumbData = [
    {
      title: t("COMMON.HOME"),
      link: "/",
    },
    {
      title: infoBooking?.hotelInfo?.hotelName,
      link: `${slug}?checkIn=${hotelInfo?.fromDate}&checkOut=${hotelInfo?.toDate}&adults=${hotelInfo?.adults}&children=${hotelInfo?.children}&room=${hotelInfo?.room}`,
    },
    {
      title: t("COMMON.BOOKING_DETAIL_INFO"),
    },
  ];

  const roomType = [
    {
      id: 1,
      title: t("HOTEL_BOOKING.QUEEN_BED"),
      img: "/images/Booking/bed-large.png",
      code: 1,
    },
    {
      id: 2,
      title: t("HOTEL_BOOKING.TWO_BED"),
      img: "/images/Booking/bed-small.png",
      code: 2,
    },
  ];

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
      smokingRoom: smokingRoom ? Number(smokingRoom) : 0,
      bigBed: bigBed ? Number(bigBed) : 0,
    };

    const dataFormatted = {
      id: booking_idSS ? booking_idSS : "",
      bookingInfo,
      supplierCode: infoBooking?.hotelInfo?.hotelCode,
      fromDate: infoBooking?.hotelInfo?.fromDate,
      toDate: infoBooking?.hotelInfo?.toDate,
      voucherFID: "",
      totalAdult: infoBooking?.hotelInfo?.adults,
      totalChildren: infoBooking?.hotelInfo?.children,
      totalRoom: infoBooking?.hotelInfo?.room,
      roomInfos: infoBooking?.services?.map((item) => ({
        roomID: item?.roomID,
        serviceID: item?.serviceID,
        addOns:
          item?.addOn?.map((addon) => ({
            ID: addon?.serviceID,
            Quantity: addon?.count || 1,
          })) || [],
        source: item.source,
      })),
      voucherCodes: infoBooking?.voucherCodes || "",
    };
    return dataFormatted;
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
            popup: "mt-30", // Thêm class để tùy chỉnh khoảng cách
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
      saveBooking(dataFormatted)
        .then((res: any) => {
          const isSuccess = res.success;
          if (isSuccess) {
            setDataSuccess({
              email: res?.data?.email || "",
              bookingID: res?.data?.bookingID || "",
            });
            setIsSubmmitting(false);
            refBookingOverview.current.setIsVisible(true);
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

  const handleChooseSmokingInfo = (code: any) => {
    setSmokingRoom(code);
  };

  const handleChooseBigBed = (code: any) => {
    setBigBed(code);
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

  // Clear booking-related storages when leaving the booking screen
  useEffect(() => {
    return () => {
      clearSessionStorage(hold_code);
      clearSessionStorage(booking_id);
      clearSessionStorage(info_booking);
      clearSessionStorage(previous_item);
      clearSessionStorage(tax_include);
      clearSessionStorage(create_invoice);
    };
  }, []);

  return (
    <section className="booking_page mb-120 xl:mb-60 md:mt-80">
      <MetaComponent meta={metadata} />
      <div className="container">
        <Breadcrumb data={breadcrumbData} />
      </div>
      <TimeRemainning />
      <div className="container">
        <div className="row">
          <div className="col-xl-8 mt-30 xl:mt-10 booking_page_customer-info">
            <div className="booking_page_customer-info-input px-24 py-24 xl:px-16 sm:px-12 xl:py-16">
              <h2 className="booking_page_customer-info-title md:text-15">
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
                <div>
                  <p className="text-neutral-800 fw-500 text-14 lg:text-14 md:text-14">
                    {t("COMMON.SPECIAL_REQUEST")}
                  </p>
                  <p className="fw-400 italic text-14 text-neutral-500">
                    {t("COMMON.SUPPLIER_NOTE")}
                  </p>
                </div>
                <div className="col-12">
                  <div className="bg-light-5 py-8 rounded-4">
                    <div className="ml-16 lg:ml-10">
                      <p className="text-16 md:text-15 fw-600 text-neutral-800">
                        {t("HOTEL_BOOKING.SMOKING_POLICY")}
                      </p>
                      <div className="row w-100">
                        {smokingInfo.map((item) => (
                          <div
                            key={item.id}
                            className={classNames(
                              "form-checkbox items-center justify-content-between flex-wrap border-bottom-light rounded-4 py-10 my-10 col-12 col-md-6"
                            )}
                            onClick={() => handleChooseSmokingInfo(item.code)}
                          >
                            <Checkbox
                              name={"smokingRoom"}
                              checked={item.code === smokingRoom}
                              label={
                                <div className="d-flex items-center">
                                  <img src={item.img} alt="Booking" />
                                  <p className="ml-10 text-16 md:text-14">
                                    {item.title}
                                  </p>
                                </div>
                              }
                              isRadio
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-16 mt-10">
                      <p className="text-16 md:text-15 fw-600 text-neutral-800">
                        {t("HOTEL_BOOKING.CHOOSE_BED")}
                      </p>
                      <div className="row w-100">
                        {roomType.map((item) => (
                          <div
                            key={item.id}
                            className={classNames(
                              "form-checkbox items-center justify-content-between flex-wrap border-bottom-light rounded-4 py-10 my-10 col-12 col-md-6"
                            )}
                            onClick={() => handleChooseBigBed(item.code)}
                          >
                            <Checkbox
                              name={"bigBed"}
                              checked={item.code === bigBed}
                              label={
                                <div className="d-flex items-center">
                                  <img src={item.img} alt="Booking" />
                                  <p className="ml-10 text-16 md:text-14">
                                    {item.title}
                                  </p>
                                </div>
                              }
                              isRadio
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <TextArea
                    label={t("COMMON.LABEL_REQUEST_MORE")}
                    placeholder={t("HOTEL_BOOKING.PLACEHOLDER_REQUEST_MORE")}
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
                      label={t("HOTEL_BOOKING.BOOK_FOR_ANOTHER_PERSON")}
                    />
                  </div>
                  <div
                    className="accordion-collapse collapse"
                    id={"info-customer"}
                    data-bs-parent="#Faq1"
                  >
                    <div>
                      <div className="col-12 col-md-6 mb-20">
                        <Input
                          required
                          label={t("COMMON.CUSTOMER_INFO")}
                          placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                          name="customerName"
                          register={register}
                          error={errors.customerName}
                        />
                      </div>
                      <div className="col-12 col-md-6">
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
            <div className="booking_page_customer-info-payment-method  px-24 py-24 xl:px-16 sm:px-12 xl:py-16">
              <div className="payment-method rounded-4 ">
                <h2 className="payment-method-title md:text-15">
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
      <BookingOverView
        ref={refBookingOverview}
        email={dataSuccess?.email}
        bookingID={dataSuccess?.bookingID}
        refOTPModal={refOTPModal}
      />
      <AuthenModal ref={refSignInModal} />
    </section>
  );
};

export default Booking;
