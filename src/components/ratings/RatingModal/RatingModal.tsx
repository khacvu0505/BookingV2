import { feedbackBooking } from "@/api/booking.api";
import FileUpload from "@/components/upload-file/UploadFile";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import Rating from "react-rating";
import TextArea from "@/components/Form/TextArea";
import Button from "@/components/Button";
import Select from "react-select";
import Input from "@/components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ratingSchema } from "@/schemas/ratingSchema";
import { useTranslation } from "react-i18next";

interface RatingState {
  Location: number;
  Staff: number;
  Cleanliness: number;
  ValueForMoney: number;
  Comfort: number;
  Facilities: number;
  FreeWifi: number;
  [key: string]: number;
}

interface RatingValueItem {
  id: number;
  name: string;
  key: string;
}

interface RatingModalProps {
  setHotelList?: React.Dispatch<React.SetStateAction<any[]>>;
  handleRatingSuccess?: () => void;
  bookingId?: string;
}

export interface RatingModalHandle {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  setBookingId: (id: string) => void;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 55,
    minHeight: 55,
  }),
};

const RatingModal = (
  { setHotelList, handleRatingSuccess, bookingId: bookingIdProps = "" }: RatingModalProps,
  ref: React.Ref<RatingModalHandle>
) => {
  const { t } = useTranslation();
  const refFileValue = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bookingId, setBookingId] = useState(bookingIdProps);
  const [isSubmmitting, setIsSubmmitting] = useState(false);

  const options = useMemo(
    () => [
      { label: t("PROFILE.TRAVEL_ALONE"), value: "Du lich mot minh" },
      { label: t("PROFILE.TRAVEL_COUPLE"), value: "Du lich cap doi" },
      { label: t("PROFILE.BUSINESS_TRIP"), value: "Di cong tac" },
      { label: t("PROFILE.FAMILY_WITH_CHILD"), value: "Gia dinh voi tre nho" },
      { label: t("PROFILE.FAMILY_WITH_CHILD2"), value: "Gia dinh voi tre lon" },
      { label: t("PROFILE.TRAVEL_GROUP"), value: "Du lich nhom" },
    ],
    [t]
  );

  const [bookingType, setBookingType] = useState(options[0].value);
  const [rating, setRating] = useState<RatingState>({
    Location: 5,
    Staff: 5,
    Cleanliness: 5,
    ValueForMoney: 5,
    Comfort: 5,
    Facilities: 5,
    FreeWifi: 5,
  });

  const ratingValue = useMemo<RatingValueItem[]>(
    () => [
      {
        id: 1,
        name: t("COMMON.LOCATION"),
        key: "Location",
      },
      {
        id: 2,
        name: t("COMMON.STAFF_TITLE"),
        key: "Staff",
      },
      {
        id: 3,
        name: t("COMMON.CLEAN"),
        key: "Cleanliness",
      },
      {
        id: 4,
        name: t("COMMON.REASONABLE_PRICE"),
        key: "ValueForMoney",
      },
      {
        id: 5,
        name: t("COMMON.COMFORT"),
        key: "Comfort",
      },
      {
        id: 6,
        name: t("COMMON.FACILITIES"),
        key: "Facilities",
      },
      {
        id: 7,
        name: t("COMMON.WIFI_FREE"),
        key: "FreeWifi",
      },
    ],
    [t]
  );

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
      title: "",
      comment: "",
    },
    resolver: yupResolver(ratingSchema),
  });

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
    setBookingId,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleChangeSubRating = (key: string, value: number) => {
    setRating({
      ...rating,
      [key]: value,
    });
  };

  const handleSubmitRating = (data: { title: string; comment: string }) => {
    setIsSubmmitting(true);
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append("bookingID", bookingId);
    formData.append("location", String(+rating.Location));
    formData.append("staff", String(+rating.Staff));
    formData.append("cleanliness", String(+rating.Cleanliness));
    formData.append("valueForMoney", String(+rating.ValueForMoney));
    formData.append("comfort", String(+rating.Comfort));
    formData.append("facilities", String(+rating.Facilities));
    formData.append("freeWifi", String(+rating.FreeWifi));
    formData.append("comments", data.comment);
    formData.append("title", data.title);
    formData.append("type", "Review");
    formData.append("bookingType", bookingType);
    if (refFileValue?.current?.selectedFile?.length > 0) {
      refFileValue.current.selectedFile.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    feedbackBooking(formData)
      .then((res: any) => {
        if (res.success) {
          if (setHotelList) {
            setHotelList((prev: any[]) => {
              return prev.map((item: any) => {
                if (item.bookingID === bookingId) {
                  return {
                    ...item,
                    isFeedback: true,
                  };
                }
                return item;
              });
            });
          } else {
            handleRatingSuccess?.();
          }
          setIsSubmmitting(false);
          handleRenderNoti(t("PROFILE.THANK_YOU_FOR_RATING"), "success");
          handleCloseModal();
        } else {
          setIsSubmmitting(false);
          handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
        }
      })
      .catch(() => {
        setIsSubmmitting(false);

        handleRenderNoti(t("COMMON.TRY_AGAIN_LATER"), "error");
      });
  };

  return (
    <div
      className={`currencyMenu js-currencyMenu ${isVisible ? "" : "is-hidden"}`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div
        className="currencyMenu__content bg-white rounded-4 modal-custom-size1"
        style={{
          top: "5%",
        }}
      >
        <div className="text-right pr-10">
          <button className="pointer" onClick={handleCloseModal}>
            <i className="icon-close" />
          </button>
        </div>
        <div className="d-flex items-center justify-between px-30 sm:px-15 ">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <p className="text-16 fw-700 text-neutral-800 mb-10">
              {t("PROFILE.RATING_YOUR_EXPERIENCE")}
            </p>
          </div>
        </div>
        <div>
          <div className="row justify-content-center mb-10">
            <div className="col-10 mb-20">
              <div>
                <div className="row mt-10">
                  {ratingValue.map((item) => (
                    <div
                      className="col-md-6 mb-20 lg:mb-16 md:mb-6 d-flex align-items-center flex-wrap"
                      key={item.id}
                    >
                      <p
                        className="text-dark text-16 lg:text-15 md:text-14"
                        style={{
                          minWidth: "150px",
                        }}
                      >
                        {item?.name}
                      </p>
                      <div className="ml-20">
                        {/* @ts-ignore - react-rating types */}
                        <Rating
                          stop={5}
                          initialRating={rating[item.key]}
                          emptySymbol={
                            <i
                              className="icon-star text-20 mr-10"
                              style={{
                                color: "#a29d9d",
                              }}
                            ></i>
                          }
                          fullSymbol={
                            <i className="icon-star text-20 text-yellow-star mr-10"></i>
                          }
                          onClick={(value: number) =>
                            handleChangeSubRating(item?.key, value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-10 mb-10">
              <div className="row">
                <div className="col-12 col-sm-6 mb-0 sm:mb-10">
                  <Input
                    required
                    label={t("PROFILE.TITLE")}
                    placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                    name="title"
                    register={register}
                    error={errors.title}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <p className="text-14 fw-500 text-neutral-800">
                    {t("PROFILE.CUSTOMER_TYPE")}
                  </p>
                  <Select
                    placeholder={`${t("COMMON.PLEASE_CHOOSE")} ...`}
                    options={options}
                    styles={customStyles}
                    onChange={(selectedOption: any) => {
                      setBookingType(selectedOption?.value);
                    }}
                    defaultValue={options[0]}
                  />
                </div>
              </div>
            </div>

            <div className="col-10 mb-10">
              <TextArea
                placeholder={t("COMMON.PLACEHOLDER_INPUT")}
                label={t("COMMON.YOUR_COMMENT")}
                name="comment"
                rows={2}
                register={register}
                error={errors.comment}
              />
            </div>
            <div className="col-10 mb-20">
              <FileUpload ref={refFileValue} />
            </div>
          </div>
        </div>
        <div className="border-top-light pb-20">
          <div className="d-flex justify-content-end mr-30 mt-20">
            <Button onClick={handleCloseModal} isOutline className="px-40">
              {t("COMMON.CLOSE")}
            </Button>
            <Button
              onClick={handleSubmit(handleSubmitRating)}
              className="ml-24 px-40"
            >
              {isSubmmitting ? (
                <>
                  <span className="loader"></span>
                </>
              ) : (
                <span>{t("COMMON.SUBMIT")}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef<RatingModalHandle, RatingModalProps>(RatingModal);
