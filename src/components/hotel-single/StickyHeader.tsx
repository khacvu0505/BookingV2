import { useEffect, useRef, useState } from "react";
import { formatCurrency, getMinValueFromList } from "@/utils/utils";
import OffCanvasDetail from "./sidebar-detail/OffCanvasDetail";
import { useSelector } from "react-redux";
import { useTabTitleHeader } from "@/utils/constants";

const StickyHeader = ({ offCanvasRef, roomInfos, hotelPolicies = {} }) => {
  const [header, setHeader] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);
  const tabTitleHeader = useTabTitleHeader();

  const changeBackground = () => {
    // eslint-disable-next-line no-undef
    if (window.scrollY >= 400) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", changeBackground);
  }, []);

  const handleChooseRoom = () => {
    // eslint-disable-next-line no-undef
    const roomElement = document.getElementById("available-room");
    let pos = roomElement.offsetTop;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, pos);
    }, 100);
  };

  return (
    <div className={`singleMenu js-singleMenu ${header ? "-is-active" : ""}`}>
      <div className="singleMenu__content">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center lg:mt-10">
            <div className="col-auto">
              <div className="singleMenu__links row x-gap-30 y-gap-10 align-items-center">
                {tabTitleHeader?.map((item, index) => (
                  <div className="col-auto" key={item}>
                    <button
                      className="button"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasDetail"
                      aria-controls="offcanvasRight"
                      onClick={() => offCanvasRef?.current?.setActiveTab(index)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto ">
                  <div className="text-14">
                    Giá từ
                    <span className="text-22 text-dark-1 fw-500 ml-10">
                      {roomInfos && typeof roomInfos === "object"
                        ? formatCurrency(
                            getMinValueFromList(
                              roomInfos?.map((item) => item?.finalPrice)
                            )
                          )
                        : 0}{" "}
                      {currentCurrency}
                    </span>
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    className="button h-lg-50 h-40 px-24 -dark-1 bg-blue-1 text-white"
                    onClick={handleChooseRoom}
                  >
                    Chọn phòng <div className="icon-arrow-top-right ml-15" />
                  </button>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .singleMenu__content */}
      <OffCanvasDetail ref={offCanvasRef} hotelPolicies={hotelPolicies} />
    </div>
  );
};

export default StickyHeader;
