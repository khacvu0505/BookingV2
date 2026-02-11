import { useTranslation } from "react-i18next";

const ItineraryContent = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      {data?.map((item, index) => (
        <div className="col-12" key={`${index}_${item?.value1}`}>
          <div className="accordion__item ">
            <div className="d-flex">
              <div className="accordion__icon size-40 flex-center bg-blue-2 text-blue-1 rounded-full">
                <div className="text-14 fw-500">{index + 1}</div>
              </div>
              {/* End item number */}

              <div className="ml-20">
                <div className="text-16 lh-15 fw-500">{item?.value1}</div>
                <div className="text-14 lh-15 text-light-1 mt-5">
                  {/* Stop: 60 minutes - Admission included */}
                  {t("COMMON.STOP_OVER")} : {item?.value} {t("COMMON.MINUTES")}
                </div>
                <div
                  className={`accordion-collapse collapse`}
                  id={`itinerary_${index}`}
                  data-bs-parent="#itineraryContent"
                >
                  <div className=" pb-15">
                    {/* <img
                      src={item.img}
                      alt="image"
                      className="rounded-4 mt-15"
                    /> */}
                    <div
                      className="text-14 mt-10"
                      dangerouslySetInnerHTML={{
                        __html: item?.text?.replaceAll("\n", "<br/>") || "",
                      }}
                    />
                  </div>
                </div>
                {/* End accordion conent */}

                <div
                  className="accordion__button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#itinerary_${index}`}
                >
                  <button className="d-block lh-15 text-14 text-blue-1 underline fw-500 mt-5">
                    Xem thêm
                  </button>
                </div>
                {/* End accordion button */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItineraryContent;
