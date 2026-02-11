import { getCountries } from "@/api/category.api";
import { useEffect, useState } from "react";

interface CountryOption {
  label: string;
  value: string;
  mobileCode: string;
}

const useCustomerInfoHook = () => {
  const [countryList, setCountryList] = useState<CountryOption[]>([]);

  useEffect(() => {
    // country list
    getCountries()
      .then((res) => {
        const list = (res?.data as any[]) || [];
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
