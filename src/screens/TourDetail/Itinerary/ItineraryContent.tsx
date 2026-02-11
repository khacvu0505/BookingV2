import { useState } from "react";
import { useTranslation } from "react-i18next";

const ItineraryContent = ({ data }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      {data?.map((item, index) => (
        <div className="col-12" key={`${index}_${item?.value1}`}>
          <div className="accordion__item ">
            <div className="d-flex">
              <div className="accordion__icon size-40 flex-center bg-primary-50 text-primary-500 rounded-full">
                <div className="text-14 fw-500">{index + 1}</div>
              </div>

              <div className="ml-20">
                <div className="text-16 lg:text-15 lh-15 fw-500 text-primary-500">
                  {item?.value1}
                </div>
                <div className="text-14 lg:text-13 lh-15 text-light-1 mt-5">
                  {t("COMMON.STOP_OVER")}:{" "}
                  <b>
                    {item?.value} {t("COMMON.MINUTES")}
                  </b>
                </div>
                <div
                  className={`accordion-collapse collapse ${
                    openIndex === index ? "show" : ""
                  }`}
                  id={`itinerary_${index}`}
                  data-bs-parent="#itineraryContent"
                >
                  <div className="pb-15">
                    {/* <img
                      src={item.img}
                      alt="image"
                      className="rounded-4 mt-15"
                    /> */}
                    <div
                      className="text-14  lg:text-13 mt-10"
                      dangerouslySetInnerHTML={{
                        __html: item?.text?.replaceAll("\n", "<br/>") || "",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="accordion__button"
                  onClick={() => toggleCollapse(index)}
                >
                  <button className="d-block lh-15 text-14 lg:text-13 underline fw-500 mt-5">
                    {openIndex === index ? "Ẩn bớt" : "Xem thêm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItineraryContent;
