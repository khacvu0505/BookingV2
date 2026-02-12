import { getCountries } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";
import { commonKeys } from "@/lib/query-keys";

const useCountries = () => {
  const { data: countryList = [] } = useQuery({
    queryKey: commonKeys.countries(),
    queryFn: async () => {
      const res = await getCountries();
      const list = res?.data || [];
      return list.map((item) => ({
        label: item?.text || "",
        value: item?.value || "",
        mobileCode: item?.value1 || "",
      }));
    },
  });

  return { countryList };
};

export default useCountries;
