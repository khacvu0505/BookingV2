import { lazy, useRef } from "react";
import { useEffect, useState } from "react";
import { getImageHome } from "@/api/category.api";

import MetaComponent from "@/apps/MetaComponent";
import LoadingPage from "@/apps/LoadingPage";
import Promotion from "./Promotion/Promotion";
import Carousel from "./Carousel";
import ReasonChoose from "./ReasonChoose";
import RecommentHotel from "./RecommentHotel";
import ParallaxBanner from "./ParallaxBanner";
import TopDestinations from "./TopDestination";
import ContactUs from "./ContactUs";
import { useTranslation } from "react-i18next";
// import TestModal from "./TestModal";

const metadata = {
  title: "Home",
  description: "OKdimall - Du lịch và trải nghiệm",
};

const Home = () => {
  // const testModalRef = useRef(null);
  const { t } = useTranslation();
  const [imagesHome, setImageHome] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {
    banners = [],
    videoURL = "",
    videoBackground = "",
    videoImage = "",
    videoAvt = "",
  } = imagesHome || {};

  useEffect(() => {
    const fetchImageHome = async () => {
      setLoading(true);
      await getImageHome()
        .then((res) => {
          if (res?.success) {
            setImageHome(res?.data);
          } else {
            setImageHome(null);
          }
        })
        .catch(() => {
          setImageHome(null);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchImageHome();
  }, []);

  return (
    <div className="w-100 overflow-hidden">
      <MetaComponent meta={metadata} />

      {isLoading ? <LoadingPage /> : <Carousel banners={banners} />}

      <section className="pt-50 xl:pt-40 pb-50 xl:pb-40">
        <div className="container">
          <div className="sectionTitle -md  text-center">
            <h2 className="sectionTitle__title">
              {t("HOME.ATTRACTIVE_DEALS")}
            </h2>
            <p className=" sectionTitle__text mt-5 sm:mt-0">
              {t("HOME.ATTRACTIVE_DEALS_DESC")}
            </p>
          </div>

          <div className="pt-40 lg:pt-16 relative">
            <Promotion />
          </div>
        </div>
      </section>

      <section className=" xl:pt-20 xl:pb-20">
        <div className="container">
          <div className="sectionTitle -md text-center">
            <h2 className="sectionTitle__title">{t("HOME.WHY_CHOOSE_US")}</h2>
            <p className=" sectionTitle__text mt-5 sm:mt-0">
              {t("HOME.WHY_CHOOSE_US_DESC")}
            </p>
          </div>

          <div className="pt-70 lg:pt-32">
            <ReasonChoose />
          </div>
        </div>
        <img
          src={"/images/home/dot-line.png"}
          alt="dot-line"
          className="object-cover"
          width={"100%"}
        />
      </section>

      <section className="  xl:pb-40 ">
        <div className="container">
          <div className="sectionTitle -md text-center">
            <h2 className="sectionTitle__title">{t("HOME.TOP_PRODUCT")}</h2>
            <p className=" sectionTitle__text mt-5 sm:mt-0">
              {t("HOME.TOP_PRODUCT_DESC")}
            </p>
          </div>
          <div className="pt-30 xl:pt-30">
            <RecommentHotel />
          </div>
        </div>
      </section>

      <ParallaxBanner
        videoAvt={videoAvt}
        videoBackground={videoBackground}
        videoImage={videoImage}
        videoURL={videoURL}
      />

      <section className="pt-50 xl:pt-40 pb-50 xl:pb-40">
        <div className="container">
          <div className="sectionTitle -md text-center">
            <h2 className="sectionTitle__title">
              {t("HOME.ATTRACTIVE_DESTINATION")}
            </h2>
            <p className=" sectionTitle__text mt-5 sm:mt-0">
              {t("HOME.ATTRACTIVE_DESTINATION_DESC")}
            </p>
          </div>

          <div className="row y-gap-30  justify-between pt-40 xl:pt-30 md:pt-20">
            <TopDestinations />
          </div>
        </div>
      </section>

      <section className=" pb-50 xl:pb-40">
        <div className="container px-25 xl:px-0 lg:w-1/1 xl:w-90 mx-auto">
          <ContactUs />
        </div>
      </section>
      {/* <TestModal ref={testModalRef} /> */}
    </div>
  );
};

export default Home;
