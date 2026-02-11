import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";

const languages = [
  { name: "Vietnamese", id: "vn" },
  { name: "English", id: "english" },
  { name: "Korean", id: "kr" },
  { name: "Chinese", id: "zh" },
];

const Languages = () => {
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
    <>
      {languages.map((language, index) => (
        <div key={index} className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
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
              <div className="text-15 ml-10">{language.name}</div>
            </div>
          </div>
          {/* End .col */}
          <div className="col-auto">
            <div className="text-15 text-light-1">{(language as any).count}</div>
          </div>
        </div>
        /* End .row */
      ))}
    </>
  );
};

export default Languages;
