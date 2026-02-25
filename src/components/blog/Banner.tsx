import { useTranslation } from "react-i18next";

const BannerBlogs = () => {
  const { t } = useTranslation();
  return (
    <div className="col-12 " data-aos="fade">
      <div className="relative d-flex">
        <img
          src="/img/blog/blog-banner.png"
          alt="image"
          className="col-12 rounded-4"
          style={{ minHeight: " 300px" }}
        />
        <div className="blogBanner__content"></div>
        <div className=" absolute z-2 px-50 top-35">
          <h1 className="text-50 fw-600 text-white lg:text-40 md:text-30">
            {t("COMMON.BLOG_BANNER_TITLE")}
          </h1>
          <div className="text-white" dangerouslySetInnerHTML={{ __html: t("COMMON.BLOG_BANNER_DESC") }} />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
      </div>
    </div>
  );
};

export default BannerBlogs;
