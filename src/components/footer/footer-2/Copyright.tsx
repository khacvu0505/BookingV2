import Social from "../../common/social/Social";
import useWindowSize from "@/utils/useWindowSize";

const Copyright = () => {
  const isMobile = useWindowSize().width < 768;
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10 flex-wrap">
          <div className="col-auto">
            {isMobile ? (
              <>
                <div className="d-flex items-center flex-wrap">
                  ©2024 by
                  <a
                    href="https://okdimall.com"
                    className="mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OKdimall Travel Co., Ltd
                  </a>
                  All rights reserved - Tax code: 4201934832 <br /> <br />{" "}
                  International Tour Operator Licence: <br />{" "}
                  56-173/2022/CDLQGVN-GP LHQT.
                </div>
              </>
            ) : (
              <>
                <div className="d-flex items-center flex-wrap">
                  ©2024 by
                  <a
                    href="https://okdimall.com"
                    className="mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OKdimall Travel Co., Ltd -
                  </a>
                  All rights reserved - Tax code: 4201934832 - International
                  Tour Operator Licence: 56-173/2022/CDLQGVN-GP LHQT.
                </div>
              </>
            )}
          </div>
          {/* End .col */}

          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}

      <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              {/* <button className="d-flex items-center text-14 fw-500 text-white mr-10">
                <i className="icon-globe text-16 mr-10" />
                <span className="underline">English (US)</span>
              </button>
              <button className="d-flex items-center text-14 fw-500 text-white">
                <i className="icon-usd text-16 mr-10" />
                <span className="underline">USD</span>
              </button> */}
            </div>
          </div>
          {/* End .col */}
          {!isMobile && (
            <div className="col-auto">
              <div className="d-flex x-gap-20 items-center">
                <Social />
              </div>
            </div>
          )}
          {/* End .col */}
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default Copyright;
