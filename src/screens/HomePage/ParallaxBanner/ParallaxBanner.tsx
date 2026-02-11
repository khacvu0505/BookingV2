import { BREAKPOINT_LG } from "@/utils/constants";
import useWindowSize from "@/utils/useWindowSize";
import { insertIframe } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ParallaxBanner = ({
  videoBackground,
  videoImage,
  videoAvt,
  videoURL,
}) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize().width < BREAKPOINT_LG;
  return (
    <div className=" relative overflow-hidden ">
      {videoBackground && (
        <img
          src={videoBackground}
          alt="bg-background"
          className="absolute object-fit-cover w-100 h-full"
        />
      )}
      <div className="section-bg pt-50 pb-50">
        <div className="container">
          <div className="row bg-white justify-center align-items-center text-center rounded mx-0 xl:pt-20">
            <div
              className="col-12 col-xl-4   d-xl-block gap-3 gap-xl-0 justify-center align-middle pt-3 pt-xl-0"
              data-aos="fade"
            >
              <div id="iframeContainer" className="text-center">
                {insertIframe(
                  videoURL,
                  "iframeContainer",
                  isMobile ? "320px" : "360px"
                ) as any}
              </div>
              <div className="mb-3 mb-md-0">
                <p className="text-center  text-14 fw-400 text-neutral-800">
                  {t("HOME.LOOK_THE_WORLD")}
                </p>
                <p className="text-center  text-14 fw-400 text-neutral-800">
                  {t("HOME.WONDERFUL")}
                </p>
                <p className="text-center text-14 fw-400 text-neutral-800">
                  {t("HOME.DREAM")}
                </p>
                <p className="text-center text-14 fw-400 text-neutral-800">
                  {t("HOME.AND")} <strong>OKdimall</strong> {t("HOME.REALITY")}
                </p>
              </div>
            </div>
            <div
              className="col-12 col-xl-5 mb-3 mb-xl-0 px-0 xl:py-40"
              data-aos="fade-up"
            >
              <LazyLoadImage src={videoImage} alt="parallax" />
            </div>
            <div className="col-12 col-xl-3" data-aos="fade">
              <LazyLoadImage
                className="rounded-circle img-circle "
                src={videoAvt}
                alt="peole"
              />

              <p className="p-3 lg:w-1/1 xl:w-3/4 w-1/1  text-14 fw-400 text-neutral-800 mx-auto">
                {t("HOME.DESCRIPTION_BANNER")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBanner;
