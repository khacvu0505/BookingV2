import { setFilter } from "@/features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const { filter } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const catContent = useMemo(() => [
    { name: t("COMMON.HOTEL"), value: "HOTEL" },
    { name: "Tour", value: "TOUR" },
    { name: t("COMMON.TICKET"), value: "TICKET" },
    { name: t("COMMON.FLIGHT"), value: "FLIGHT" },
    { name: t("COMMON.SHUTTLE"), value: "CAR" },
    { name: t("COMMON.CRUISE"), value: "CRUISE" },
    { name: t("COMMON.GOLF"), value: "GOLF" },
  ], [t]);
  const handleCategory = (value) => {
    const dataFilter = {
      ...filter,
      Entity: {
        ...filter.Entity,
        SupplierType: filter.Entity.SupplierType === value ? "" : value,
      },
    };
    dispatch(setFilter(dataFilter));
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
