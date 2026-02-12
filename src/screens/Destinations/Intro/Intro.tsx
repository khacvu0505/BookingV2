import React, { useMemo, useRef } from "react";
import Button from "@/components/Button";
import LightGallery from "lightgallery/react";
import "./Intro.style.scss";

// import plugins if you need
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { Trans, useTranslation } from "react-i18next";

const Intro = ({ data }) => {
  const { t } = useTranslation();
  const lightGalleryRef = useRef(null);

  const handleOpenGallery = () => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery();
    }
  };
  const images = useMemo(() => {
    const imgList = data?.images || [];
    data?.thumbnailURL && imgList.unshift(data?.thumbnailURL);
    return (
      imgList.map((item, idx) => ({
        id: idx + 1,
        image: item,
      })) || []
    );
  }, [data]);

  return (
    <div className="mb-50 xl:mb-40 lg:mb-30 introContainer">
      <h2 className="fw-700 text-32 xl:text-26 lg:text-24 lg:text-center text-neutral-800 mb-10">
        {data?.name}
      </h2>
      <p className="fw-400 text-14 text-neutral-800 mb-30 lg:text-center">
        {t("DESTINATIONS.INTRO_DESCRIPTION")}
      </p>
      <div className="relative">
        <img
          src={data?.thumbnailURL}
          alt="OKdimall destinations"
          className="rounded-8 object-cover introImage"
          width={1416}
        />
        <Button
          className="absolute bottom-20 right-20"
          onClick={handleOpenGallery}
        >
          <Trans
            i18nKey="DESTINATIONS.SEE_ALL_PICTURES"
            values={{
              images: images?.length,
            }}
          />
        </Button>
      </div>

      <LightGallery
        onInit={(ref) => (lightGalleryRef.current = ref.instance)}
        dynamic={true}
        dynamicEl={images.map((item) => ({
          src: item.image,
          thumb: item.image,
        }))}
        plugins={[lgZoom, lgVideo]}
        mode="lg-fade"
        pager={false}
        galleryId={"nature"}
        autoplayFirstVideo={false}
        mobileSettings={{
          controls: false,
          showCloseIcon: true,
          download: false,
          rotate: false,
        }}
      />
    </div>
  );
};

export default Intro;
