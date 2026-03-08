import { getBenefitByRoom } from "@/api/hotel.api";
import { groupBy } from "@/utils/utils";
import classNames from "classnames";
import React, {
  forwardRef,
  useMemo,
  useImperativeHandle,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const AmenitiesModal = (props, ref) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = props;
  useImperativeHandle(ref, () => ({
    isVisible,
    setIsVisible,
  }));

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const { data: fetchedBenefits, isLoading } = useQuery({
    queryKey: ["benefitByRoom", data?.roomID],
    queryFn: async () => {
      const res = await getBenefitByRoom(data?.roomID);
      return res?.success ? res.data : [];
    },
    enabled: isVisible && !!data?.roomID,
  });

  const amenitiesByGroup = useMemo(() => {
    if (fetchedBenefits) {
      return groupBy(fetchedBenefits, "group");
    }
    if (data?.amenities) {
      return groupBy(data.amenities, "group");
    }
    return [];
  }, [fetchedBenefits, data?.amenities]);

  if (isLoading) return <></>;

  return (
    <div
      className={`currencyMenu js-currencyMenu pt-50  ${
        isVisible ? "" : "is-hidden"
      }`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div className="currencyMenu__content bg-white rounded-22 modal-custom-size4 h-600 px-20">
        <div className="row mx-20 mt-20 pb-10 border-bottom-light justify-content-between">
          <div className=" col-auto text-20 fw-500">
            {t("COMMON.ALL_AMENITIES_IN_ROOM", { roomName: data?.roomName })}
          </div>
          <div className="col-auto">
            <button className="pointer" onClick={handleCloseModal}>
              <i className="icon-close" />
            </button>
          </div>
        </div>

        <div className="h-500 overflow-y-scroll">
          <div
            className={classNames("grid-container-masonry", {
              "d-flex": Object.keys(amenitiesByGroup)?.length <= 2,
            })}
          >
            {Object.keys(amenitiesByGroup)?.map((item) => (
              <div className="masonry-item" key={item}>
                <div className="row y-gap-30">
                  <div className="col-12 pb-0 px-0">
                    <div>
                      {item !== "undefined" && (
                        <div className="d-flex items-center text-16 fw-500">
                          <i className={`icon-city-2 text-20 mr-10`} />
                          {item}
                        </div>
                      )}
                      <div className="text-15 pt-10 w-100">
                        {amenitiesByGroup[item].map((amen, index) => (
                          <div className="d-flex items-center" key={index}>
                            <i className="icon-check text-10 mr-20" />
                            {amen?.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(AmenitiesModal);
