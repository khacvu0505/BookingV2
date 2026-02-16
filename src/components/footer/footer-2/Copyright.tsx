import Social from "../../common/social/Social";
import useWindowSize from "@/utils/useWindowSize";
import { useTranslation } from "react-i18next";

const Copyright = () => {
  const { t } = useTranslation();
  const isMobile = useWindowSize().width < 768;

  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10 flex-wrap">
          <div className="col-auto">
            <div className="d-flex items-center flex-wrap">
              ©2024 by
              <a
                href="https://okdimall.com"
                className="mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                OKdimall Travel Co., Ltd {!isMobile && "-"}
              </a>
              {t("COMMON.COPYRIGHT_INFO")}
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}

      <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
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
