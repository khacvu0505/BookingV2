const BannerBlogs = () => {
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
            Vì cuộc đời là những chuyến đi
          </h1>
          <div className="text-white">
            Chuyên trang thông tin, cẩm nang du lịch hàng đầu Việt Nam. Theo dõi
            <strong className="text-blue-1">OKdimall</strong> để hành trình du
            lịch của bạn luôn trọn vẹn!
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
      </div>
    </div>
  );
};

export default BannerBlogs;
