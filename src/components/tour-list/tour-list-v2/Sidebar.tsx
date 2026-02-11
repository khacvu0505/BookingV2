import CategoryTypes from "../sidebar/CategoryTypes";
import OthersFilter from "../sidebar/OthersFilter";
import Duration from "../sidebar/Duration";
import Languages from "../sidebar/Languages";
import PirceSlider from "../sidebar/PirceSlider";
import MainFilterSearchBox from "./MainFilterSearchBox";
import RatingsFilter from "@/components/tour-list/sidebar/RatingFilter";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-10 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Tìm tour</h5>

          <div className="row y-gap-20 pt-10">
            <MainFilterSearchBox />
          </div>
        </div>
      </div>
      {/* End search tours */}

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Danh mục</h5>
        <div className="sidebar-checkbox">
          <CategoryTypes />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End popular filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Other</h5>
        <div className="sidebar-checkbox">
          <OthersFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Giá</h5>
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
        <h5 className="text-18 fw-500 mb-10">Thời gian</h5>
        <div className="sidebar-checkbox">
          <Duration />
        </div>
      </div>
      {/* End style filter */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Ngôn ngữ</h5>
        <div className="sidebar-checkbox">
          <Languages />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Aminities filter */}
    </>
  );
};

export default Sidebar;
