import { fetchGetSearchBlogs } from "@/features/blogs/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Categories = () => {
  const { filter } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const catContent = [
    { name: "Khách sạn", value: "HOTEL" },
    { name: "Tour", value: "TOUR" },
    { name: "Vé tham quan", value: "TICKET" },
    { name: "Vé máy bay", value: "FLIGHT" },
    { name: "Xe đưa đón", value: "CAR" },
    { name: "Du thuyền", value: "CRUISE" },
    { name: "Golf", value: "GOLF" },
  ];
  const handleCategory = (value) => {
    const dataFilter = {
      ...filter,
      Entity: {
        ...filter.Entity,
        SupplierType: filter.Entity.SupplierType === value ? "" : value,
      },
    };
    (dispatch as any)(fetchGetSearchBlogs(dataFilter));
  };
  return (
    <>
      {catContent.map((item) => (
        <div
          onClick={() => handleCategory(item.value)}
          className="cursor-pointer d-flex items-center justify-between text-dark-1"
          key={item.value}
        >
          <span
            className={`text-15 ${
              filter.Entity?.SupplierType === item.value
                ? "text-blue-1 fw-500"
                : "text-dark-1"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default Categories;
