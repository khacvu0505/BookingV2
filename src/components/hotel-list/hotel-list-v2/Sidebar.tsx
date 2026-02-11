import { memo } from "react";
import DealsFilter from "../sidebar/DealsFilter";
import Map from "../sidebar/Map";
import SearchBox from "../sidebar/SearchBox";
import PopularFilters from "../sidebar/PopularFilters";
import AminitesFilter from "../sidebar/AminitesFilter";
import RatingsFilter from "../sidebar/RatingsFilter";
import GuestRatingFilters from "../sidebar/GuestRatingFilters";
import StyleFilter from "../sidebar/StyleFilter";
import NeighborhoddFilter from "../sidebar/NeighborhoddFilter";
import PirceSlider from "../sidebar/PirceSlider";
import MainFilterSearchBox from "../hotel-list-v2/MainFilterSearchBox";
import BenefitGroup from "../sidebar/BenefitGroup";
import SubLocation from "../sidebar/SubLocation";
import AmenitiesFilter from "../sidebar/AminitesFilter";
import RatingByCustomer from "../sidebar/RatingByCustomer";
import AccommodationType from "../sidebar/AccommodationType";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Tìm khách sạn</h5>

          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox />
          </div>
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Tìm kiếm theo tên</h5>
        <SearchBox />
      </div>
      {/* End search box */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Loại hình nơi ở</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <AccommodationType />
          </div>
        </div>
      </div>

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Giá hàng đêm</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>
      {/* End Nightly priceslider */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Xếp hạng sao</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingsFilter />
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Đánh giá của khách</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingByCustomer />
        </div>
      </div>
      {/* End rating filter */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Vị trí</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <AmenitiesFilter />
          </div>
        </div>
      </div>
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Chọn phòng có</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <BenefitGroup />
          </div>
        </div>
      </div>

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Địa điểm</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <SubLocation />
          </div>
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Deals</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <DealsFilter />
          </div>
        </div>
      </div> */}
      {/* End deals filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Popular Filters</h5>
        <div className="sidebar-checkbox">
          <PopularFilters />
        </div>
      </div> */}
      {/* End popular filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Aminities</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Guest Rating</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters />
        </div>
      </div> */}
      {/* End Guest Rating */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Style</h5>
        <div className="sidebar-checkbox">
          <StyleFilter />
        </div>
      </div> */}
      {/* End style filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Neighborhood</h5>
        <div className="sidebar-checkbox">
          <NeighborhoddFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}

      {/* <div className="sidebar__item -no-border position-relative">
        <Map />
      </div> */}
      {/* End find map */}
    </>
  );
};

export default memo(Sidebar);
