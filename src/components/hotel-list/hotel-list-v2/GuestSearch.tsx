import useQueryParams from "@/hooks/useQueryParams";
import React, { useEffect, useState } from "react";

const Counter = ({ name, defaultValue, onCounterChange }) => {
  const [count, setCount] = useState(defaultValue);
  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };

  const handleRenderTextByName = (name) => {
    switch (name) {
      case "adults":
        return "Người lớn";

      case "children":
        return "Trẻ em";
      case "room":
        return "Phòng";
      default:
        return "--";
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">
            {handleRenderTextByName(name)}
          </div>
          {/* {name === "children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 10</div>
          )} */}
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={decrementCount}
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
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

const GuestSearch = ({ handleChangeDataFilter }) => {
  // const filterParams = useSelector((state) => state.hotels.filter);
  const [params, _] = useQueryParams();
  const {
    adults: adultsParam = 2,
    children: childrenParam = 0,
    room: roomParam = 1,
  } = params;

  const [counters, setCouters] = useState([
    { name: "adults", defaultValue: Number(adultsParam) },
    { name: "children", defaultValue: Number(childrenParam) },
    { name: "room", defaultValue: Number(roomParam) },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCounterChange = (name, value) => {
    handleChangeDataFilter(name, value);

    switch (name) {
      case "adults":
        setCouters([
          { name: "adults", defaultValue: value },
          { name: "children", defaultValue: childrenParam },
          { name: "room", defaultValue: roomParam },
        ]);

        break;
      case "children":
        setCouters([
          { name: "adults", defaultValue: adultsParam },
          { name: "children", defaultValue: value },
          { name: "room", defaultValue: roomParam },
        ]);
        break;
      case "room":
        setCouters([
          { name: "adults", defaultValue: adultsParam },
          { name: "children", defaultValue: childrenParam },
          { name: "room", defaultValue: value },
        ]);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setCouters([
      { name: "adults", defaultValue: Number(adultsParam) },
      { name: "children", defaultValue: Number(childrenParam) },
      { name: "room", defaultValue: Number(roomParam) },
    ]);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="searchMenu-guests px-20 py-10  lg:py-20  js-form-dd bg-white position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Số khách</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{counters[0].defaultValue}</span>{" "}
          người lớn -{" "}
          <span className="js-count-child">{counters[1].defaultValue}</span> trẻ
          em - <span className="js-count-room">{counters[2].defaultValue}</span>{" "}
          phòng
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
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
