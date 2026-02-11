import { useSelector } from "react-redux";
import useWindowSize from "@/utils/useWindowSize";

const TopHeaderFilter = () => {
  const isMobileScreen = useWindowSize().width < 768;
  const total = useSelector((state) => state.hotels.total) || 0;
  return (
    <>
      <div className="row y-gap-10 items-center justify-between items-center sm:mt-20 mt-sm-0 mt-20">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">{total} thông tin</span>
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20 mt-md-20">
            <div className="col-auto">
              <>
                {!isMobileScreen && (
                  <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                    <i className="icon-up-down text-14 mr-10" />
                    Lựa chọn hàng đầu cho tìm kiếm của bạn
                  </button>
                )}
              </>
            </div>
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
