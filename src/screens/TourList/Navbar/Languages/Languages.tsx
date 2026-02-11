import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages: { name: string; id: string; count?: any }[] = [
  { name: "Vietnamese", id: "vn" },
  { name: "English", id: "english" },
  { name: "Korean", id: "kr" },
  { name: "Chinese", id: "zh" },
];

const Languages = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const [selected, setSelected] = useState("");

  const { language: languageParam } = params; // Retrieve the duration parameter

  const handleChooseLanguage = (value) => {
    if (selected !== "" && selected === value) {
      // If the same duration is clicked again, clear the selection
      setSearchParams(
        cleanedObject({
          ...params,
          language: "",
        })
      );
      setSelected("");
      return;
    }

    setSearchParams({
      ...params,
      language: value,
    });

    setSelected(value);

    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (languageParam) {
      setSelected(languageParam); // Update state when durationParam changes
    } else {
      setSelected(""); // Clear if durationParam is not set
    }
  }, [languageParam]);
  return (
    <div>
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("TOURS.FILTER/LANGUAGE")}
      </p>

      {languages.map((language, index) => (
        <div key={index} className="row y-gap-10 items-center justify-between">
          <div className="col-auto mb-16 lg:mb-10 md:text-6">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="language"
                checked={selected ? selected === language.id : false}
                onChange={() => handleChooseLanguage(language.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-16 lg:text-15 md:text-14 ml-10">
                {language.name}
              </div>
            </div>
          </div>
          {/* End .col */}
          <div className="col-auto">
            <div className="text-15 text-light-1">{language.count}</div>
          </div>
        </div>
        /* End .row */
      ))}
    </div>
  );
};

export default Languages;
