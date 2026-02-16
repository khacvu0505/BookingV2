import { feedbackBooking } from "@/api/booking.api";
import FileUpload from "@/components/upload-file/UploadFile";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import React, { useImperativeHandle, useRef, useState } from "react";
import Rating from "react-rating";
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

interface FileUploadRef {
  selectedFile: File[];
  [key: string]: unknown;
}

interface RatingModalProps {
  bookingId: string;
  handleRatingSuccess: () => void;
}

const RatingModal = (props: RatingModalProps, ref: React.Ref<unknown>) => {
  const { t } = useTranslation();
  const refFileValue = useRef<FileUploadRef | null>(null);
  const { bookingId, handleRatingSuccess } = props;

  const ratingValue = [
    {
      id: 1,
      name: t("COMMON.LOCATION"),
      key: "Location" as const,
    },
    {
      id: 2,
      name: t("COMMON.STAFF_TITLE"),
      key: "Staff" as const,
    },
    {
      id: 3,
      name: t("COMMON.CLEAN_LINESS"),
      key: "Cleanliness" as const,
    },
    {
      id: 4,
      name: t("COMMON.REASONABLE_PRICE"),
      key: "ValueForMoney" as const,
    },
    {
      id: 5,
      name: t("COMMON.COMFORT"),
      key: "Comfort" as const,
    },
    {
      id: 6,
      name: t("COMMON.FACILITIES"),
      key: "Facilities" as const,
    },
    {
      id: 7,
      name: t("COMMON.WIFI_FREE"),
      key: "FreeWifi" as const,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<RatingState>({
    Location: 5,
    Staff: 5,
    Cleanliness: 5,
    ValueForMoney: 5,
    Comfort: 5,
    Facilities: 5,
    FreeWifi: 5,
  });

  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
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

  const handleSubmitRating = () => {
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
    formData.append("comments", comment);
    if ((refFileValue?.current?.selectedFile?.length ?? 0) > 0) {
      refFileValue.current!.selectedFile.forEach((file: File) => {
        formData.append("images", file);
      });
    }

    feedbackBooking(formData)
      .then((res) => {
        if (res.success) {
          handleRatingSuccess();
          handleRenderNoti(t("COMMON.THANK_FOR_REVIEW"), "success");
          handleCloseModal();
          return;
        }
        handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN_LATER"), "error");
      })
      .catch(() => {
        handleRenderNoti(t("COMMON.PLEASE_TRY_AGAIN_LATER"), "error");
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
        <div className="d-flex items-center justify-between px-30  sm:px-15 ">
          <div className="text-20 fw-500 lh-15 w-100 text-center">
            <p className="mt-10 text-dark pb-30" style={{ fontSize: "30px" }}>
              {t("COMMON.REVIEW_EXPERIENCE")}
            </p>
          </div>
        </div>
        <div className="overflow-y-scroll h-70vh overflow-x-hidden">
          <div className="row justify-content-center mb-30">
            <div className="col-10 mb-20">
              <div className="accordion js-accordion -simple mt-20">
                <div className={`accordion__item py-20 rounded-4`}>
                  <div
                    aria-expanded={"true"}
                    className={`accordion__button d-flex items-center `}
                    data-bs-toggle="collapse"
                    data-bs-target={`#RatingDetail`}
                  >
                    <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-5">
                      <i className="icon-plus" />
                      <i className="icon-minus" />
                    </div>
                    <div className="button text-dark-1 text-start">
                      {t("COMMON.DETAILED_REVIEW")}
                    </div>
                  </div>
                  <div
                    className={`accordion-collapse collapse ml-20 show`}
                    data-bs-parent="#RatingDetail"
                    id="RatingDetail"
                  >
                    <div className="row mt-20">
                      {ratingValue.map((item) => (
                        <div
                          className="col-md-6 mb-20 d-flex align-items-center flex-wrap"
                          key={item.id}
                        >
                          <p
                            className="text-dark"
                            style={{
                              minWidth: "150px",
                            }}
                          >
                            {item?.name}
                          </p>
                          <div className="ml-20">
                            {/* @ts-ignore - react-rating type incompatibility */}
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
              </div>
            </div>

            <div className="col-10 mb-20">
              <div className="form-input ">
                <textarea
                  required
                  rows={4}
                  defaultValue={""}
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("COMMON.YOUR_COMMENT")}
                </label>
              </div>
            </div>
            <div className="col-10 mb-20">
              <FileUpload ref={refFileValue} />
            </div>
          </div>
        </div>
        <div className="border-top-light pb-20">
          <div className="d-flex justify-content-end mr-30">
            <button
              className="button py-20 -dark-1 bg-blue-1 text-white px-30 mt-20"
              onClick={handleSubmitRating}
            >
              {t("COMMON.POST")} <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(RatingModal);
