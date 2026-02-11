import { getCountries } from "@/api/category.api";
import { useEffect, useState } from "react";

const useCustomerInfoHook = () => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    // country list
    getCountries()
      .then((res) => {
        const list = res?.data || [];
        setCountryList(
          list.map((item) => ({
            label: item?.text || "",
            value: item?.value || "",
            mobileCode: item?.value1 || "",
          }))
        );
      })
      .catch((err) => {
        setCountryList([]);
      });
  }, []);

  return {
    countryList,
  };
};
export default useCustomerInfoHook;
