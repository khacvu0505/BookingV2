import { useEffect, useState } from "react";
import { getListCategory } from "@/api/blogs.api";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/blogs/blogSlice";

const CategoryList = () => {
  const [listCategory, setListCategory] = useState([]);
  const dispatch = useDispatch();

  const { filter } = useSelector((state) => state.blogs);

  useEffect(() => {
    getListCategory()
      .then((res) => {
        if (res.success) {
          setListCategory(res?.data as any);
          if ((res?.data as any)?.length > 0) {
            const dataFilter = {
              ...filter,
              Entity: { ...filter.Entity, CateID: 0 },
            };
            dispatch(setFilter(dataFilter));
          }
        } else {
          setListCategory([]);
        }
      })
      .catch(() => setListCategory([]));
  }, []);

  const handleCategory = (categoryCode) => {
    const dataFilter = {
      ...filter,
      Entity: { ...filter.Entity, CateID: categoryCode },
    };
    dispatch(setFilter(dataFilter));
  };

  return (
    <>
      <div className="tabs -pills-3 pt-30 js-tabs">
        <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
          <div className="col-auto">
            <button
              className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
                !filter.Entity?.CateID ? "is-tab-el-active" : ""
              }`}
              onClick={() => handleCategory(0)}
            >
              Tất cả
            </button>
          </div>
          {listCategory?.map((option) => (
            <div className="col-auto" key={option?.code}>
              <button
                className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
                  filter.Entity?.CateID === option.code
                    ? "is-tab-el-active"
                    : ""
                }`}
                onClick={() => handleCategory(option.code)}
              >
                {option?.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
