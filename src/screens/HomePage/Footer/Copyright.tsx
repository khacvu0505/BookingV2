// import Social from "@/components/common/social/Social";
import { BREAKPOINT_MD } from "@/utils/constants";
import useWindowSize from "@/utils/useWindowSize";

const Copyright = () => {
  const isMobile = useWindowSize().width < BREAKPOINT_MD;
  return (
    <div className="row justify-between items-center y-gap-10 w-100">
      <div className="col-auto w-100">
        <div className="d-flex items-center flex-wrap text-15 xl:text-14 lg:text-13 md:text-12">
          ©2024 by
          <a
            href="https://okdimall.com"
            className="mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            OKdimall Travel Co., Ltd -
          </a>
          All rights reserved - Tax code: 4201934832 - International Tour
          Operator Licence: 56-173/2022/CDLQGVN-GP LHQT.
        </div>
      </div>

      {/* <div className="col-auto">
        <div className="row y-gap-10 items-center">
          {!isMobile && (
            <div className="col-auto">
              <div className="d-flex x-gap-20 items-center">
                <Social />
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Copyright;
