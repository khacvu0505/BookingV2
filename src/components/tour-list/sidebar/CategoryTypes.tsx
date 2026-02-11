import { getCategoryByTourService } from "@/api/tours.api";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import { useEffect, useState } from "react";

const CategoryTypes = () => {
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
    <>
      {categories.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between"
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
              <div className="text-15 ml-10">{category.name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{category.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryTypes;
