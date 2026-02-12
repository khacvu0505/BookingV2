import useQueryParams from "@/hooks/useQueryParams";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface CounterProps {
  name: string;
  defaultValue: number;
  onCounterChange: (name: string, value: number) => void;
}

const Counter = ({ name, defaultValue, onCounterChange }: CounterProps) => {
  const [count, setCount] = useState(defaultValue);
  const { t } = useTranslation();

  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };
  const decrementCount = () => {
    const specials = ["adults", "room"];
    if (count > 0) {
      if (specials.includes(name) && count === 1) return;
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };
  const handleRenderTextByName = (name: string) => {
    switch (name) {
      case "adults":
        return t("HOME.ADULT");

      case "children":
        return t("HOME.CHILD");
      case "room":
        return t("COMMON.ROOM");
      default:
        return "--";
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 xl:text-14 lg:text-13 lh-12 fw-500">
            {" "}
            {handleRenderTextByName(name)}
          </div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
          )}
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 lg:size-25 rounded-4 js-down"
              onClick={() => {
                decrementCount();
              }}
            >
              <i className="icon-minus text-12 " />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 xl:text-14 lg:text-13 js-count">
                {count}
              </div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 lg:size-25 rounded-4 js-up"
              onClick={incrementCount}
            >
              <i className="icon-plus text-12" />
            </button>
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

interface GuestSearchProps {
  handleChangeValue: (value: Record<string, any>) => void;
  defaultValue?: {
    adults: number;
    children: number;
    room: number;
  };
}

const GuestSearch = ({
  handleChangeValue,
  defaultValue = {
    adults: 2,
    children: 0,
    room: 1,
  },
}: GuestSearchProps) => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
  const [guestCounts, setGuestCounts] = useState({
    adults: Number(params?.adults) || 2,
    children: Number(params?.children) || 0,
    room: Number(params?.room) || 1,
  });
  const handleCounterChange = (name: string, value: number) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
    handleChangeValue({ [name]: value });
  };

  const counters = useMemo(() => {
    return [
      { name: "adults", defaultValue: guestCounts.adults },
      { name: "children", defaultValue: guestCounts.children },
      { name: "room", defaultValue: guestCounts.room },
    ];
  }, [guestCounts]);

  return (
    <div className=" lg:px-0 js-form-dd js-form-counters">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-400">
          {t("HOME.GUEST_NUMBER")}
        </h4>
        <div className="text-18 xl:text-16 lg:text-14 text-neutral-800 fw-700">
          <span className="js-count-adult">{guestCounts.adults}</span>{" "}
          {t("HOME.ADULT")} -{" "}
          <span className="js-count-child">{guestCounts.children}</span>{" "}
          {t("HOME.CHILD")}-{" "}
          <span className="js-count-room">{guestCounts.room}</span>{" "}
          {t("COMMON.ROOM")}
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 lg:px-25 py-30 lg:py-25 rounded-4 counter-box">
          {counters?.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              defaultValue={counter.defaultValue}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GuestSearch;
