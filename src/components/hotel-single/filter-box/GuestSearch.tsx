import React, { forwardRef, useImperativeHandle, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

const Counter = ({ code, name, defaultValue, onCounterChange }) => {
  const [count, setCount] = useState(defaultValue);
  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(code, count + 1);
  };
  const decrementCount = () => {
    if (count > 1 || (count > 0 && code === "children")) {
      setCount(count - 1);
      onCounterChange(code, count - 1);
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name}</div>
          {/* {code === "children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Tuổi 0 - 17</div>
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

const GuestSearch = (_, ref) => {
  const [searchParams] = useQueryParams();
  const { adults = 2, children = 0, room = 1 } = searchParams;
  const [dataCounter, setDataCounter] = useState({
    adults: +adults,
    children: +children,
    room: +room,
  });

  const counters = [
    { name: "Người lớn", defaultValue: +adults, code: "adults" },
    { name: "Trẻ em", defaultValue: +children, code: "children" },
    { name: "Phòng", defaultValue: +room, code: "room" },
  ];
  const handleCounterChange = (code, value) => {
    setDataCounter((prev) => ({ ...prev, [code]: value }));
  };
  useImperativeHandle(
    ref,
    () => {
      return { dataCounter };
    },
    [dataCounter]
  );
  return (
    <div className="searchMenu-guests px-20 py-10 border-light rounded-4 js-form-dd js-form-counters cursor-pointer ">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Số phòng - Khách</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{dataCounter.adults}</span> Người lớn
          - <span className="js-count-child">{dataCounter.children}</span> Trẻ
          em - <span className="js-count-room">{dataCounter.room}</span> Phòng
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.code}
              code={counter.code}
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
export default forwardRef(GuestSearch);
