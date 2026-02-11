import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject, formatCurrency } from "@/utils/utils";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";

const PirceSlider = () => {
  const [params, setSearchParams] = useQueryParams();
  const { minPrice: minPriceParam = 0, maxPrice: maxPriceParam = 20000000 } =
    params;

  const [price, setPrice] = useState({
    value: { min: 0, max: 20000000 },
  });

  const debouncedFilterPrice = useCallback(
    debounce((priceTerm) => {
      const newParams = cleanedObject({
        ...params,
        minPrice: priceTerm.min,
        maxPrice: priceTerm.max,
      });
      setSearchParams(newParams);
    }, 500),
    []
  );

  const handleChangeValue = useCallback(
    (value) => {
      setPrice({ value });
      debouncedFilterPrice(value);
    },
    [debouncedFilterPrice, params]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const newParams = cleanedObject({
      ...params,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
    });
    setSearchParams(newParams);
    setPrice({
      value: { min: Number(minPriceParam), max: Number(maxPriceParam) },
    });
  }, [minPriceParam, maxPriceParam]);

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">
            {formatCurrency(price.value.min)} Đ
          </span>
          -
          <span className="js-upper mx-1">
            {formatCurrency(price.value.max)} Đ
          </span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          step={100000}
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={20000000}
          value={price.value}
          onChange={(value) => handleChangeValue(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
