import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";

const durationOptions = [
  { label: "Tối đa 1 tiếng", id: "0" },
  { label: "1 đến 4 tiếng", id: "1" },
  { label: "Hơn 4 tiếng", id: "4" },
];

const Duration = () => {
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
    <>
      {durationOptions.map((option, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="duration"
                checked={
                  selected ? Number(selected) === Number(option.id) : false
                }
                onClick={() => handleChooseDuration(option.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{option.label}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Duration;
