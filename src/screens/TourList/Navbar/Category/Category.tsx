import { getCategoryByTourService } from "@/api/tours.api";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();

  const [categories, setCategories] = useState([]);
  // const [selected, setSelected] = useState([]);
  const [selected, setSelected] = useState("");

  const { category: categoryParam } = params;

  const handleChooseCategory = (id) => {
    setSelected(id);

    if (id) {
      setSearchParams(
        cleanedObject({
          ...params,
          category: selected.toString() === id.toString() ? "" : id,
        })
      );
    } else {
      setSearchParams(
        cleanedObject(
          cleanedObject({
            ...params,
            category: "",
          })
        )
      );
    }
  };

  // const handleChooseCategory = (id) => {
  //   const isExisted = selected.includes(id);

  //   const data = isExisted
  //     ? [...selected].filter((item) => item !== id)
  //     : [...selected, id];
  //   setSelected(data);

  //   if (data?.length > 0) {
  //     setSearchParams({
  //       ...params,
  //       category: data.join("-"),
  //     });
  //   } else {
  //     setSearchParams(
  //       cleanedObject({
  //         ...params,
  //         category: "",
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoryByTourService();
      if (data?.success) {
        const dataFormatted = data?.data.map((item) => ({
          name: item.text,
          id: item.valueString,
        }));
        setCategories(dataFormatted);
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelected(categoryParam);
    } else {
      setSelected("");
    }
  }, [categoryParam]);

  return (
    <div className="mb-32 lg:mb-20 md:mb-16 mt-16">
      <p className="text-18 lg:text-17 md:text-16 fw-500 text-neutral-800 mb-24 lg:mb-16 md:mb-10">
        {t("COMMON.CATEGORY")}
      </p>
      {categories.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between mb-16 lg:mb-10 md:mb-6"
          key={category.name}
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                value={category.id}
                checked={selected === category.id.toString()}
                onChange={() => handleChooseCategory(category.id.toString())}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-16 lg:text-15 md:text-14 ml-10 md:ml-8">
                {category.name}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{category.count}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
