import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Duration = () => {
  const { t } = useTranslation();
  const durationOptions = [
    { label: t("COMMON.MAX_1_HOUR"), id: "0" },
    { label: t("COMMON.FROM_1_TO_4_HOURS"), id: "1" },
    { label: t("COMMON.MORE_THAN_4_HOURS"), id: "4" },
  ];
  const [params, setSearchParams] = useQueryParams();
  const [selected, setSelected] = useState("");

  const { duration: durationParam } = params; // Retrieve the duration parameter

  const handleChooseDuration = (value) => {
    if (selected !== "" && selected === value) {
      // If the same duration is clicked again, clear the selection
      setSearchParams(
        cleanedObject({
          ...params,
          duration: "",
        })
      );
      setSelected("");
      return;
    }

    setSearchParams({
      ...params,
      duration: value,
    });

    setSelected(value);

    // eslint-disable-next-line no-undef
    // window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (durationParam) {
      setSelected(durationParam); // Update state when durationParam changes
    } else {
      setSelected(""); // Clear if durationParam is not set
    }
  }, [durationParam]);
  return (
    <div>
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("TOURS.FILTER/DURATION")}
      </p>

      {durationOptions.map((option, index) => (
        <div
          className="row y-gap-10 items-center justify-between mb-16 lg:mb-10 md:mb-6"
          key={index}
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="duration"
                checked={
                  selected ? Number(selected) === Number(option.id) : false
                }
                onChange={() => handleChooseDuration(option.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-16 lg:text-15 md:text-14 ml-10">
                {option.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Duration;
