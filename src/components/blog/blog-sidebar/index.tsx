import Categories from "./components/Categories";
import RecentPost from "./components/RecentPost";
import RecommendPost from "./components/RecommendPost";
import SearchBox from "./components/SearchBox";

const index = () => {
  return (
    <div className="sidebar -blog">
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Tìm kiếm</h5>
        <SearchBox />
      </div>
      {/* End searchbox */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Danh mục</h5>
        <div className="y-gap-5">
          <Categories />
        </div>
      </div>
      {/* End .Categories */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Bài viết gần đây</h5>
        <div className="row y-gap-20 pt-10">
          <RecentPost />
        </div>
      </div>
      {/* End RecentPost */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Gợi ý</h5>
        <div className="row y-gap-20 pt-10">
          <RecommendPost />
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Tags</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <Tags />
        </div>
      </div> */}
    </div>
  );
};

export default index;
