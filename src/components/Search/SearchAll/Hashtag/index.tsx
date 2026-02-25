import { getHashtagSearchAll } from "@/api/user.api";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { searchKeys } from "@/lib/query-keys";
import { useTranslation } from "react-i18next";

const Hashtag = () => {
  const { t } = useTranslation();
  const { data: hashTagData = [] } = useQuery({
    queryKey: searchKeys.hashtags(),
    queryFn: async () => {
      const res = await getHashtagSearchAll();
      return res?.success ? res.data : [];
    },
  });

  return (
    <>
      {(hashTagData as any[])?.length > 0 && (
        <div className="pt-5 pb-5">
          <p className="text-neutral-800 fw-800 pb-5">
            {t("COMMON.PEOPLE_SEARCHING")}{" "}
          </p>

          <div className="d-flex align-items-center flex-wrap mb-2">
            {(hashTagData as any[])?.map((item: any, index: number) => (
              <div
                key={index}
                className="mr-5"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  // eslint-disable-next-line no-undef
                  window.open(item.url, "_self");
                }}
              >
                <p className="bg-secondary-500 px-10 rounded-30 mb-4 text-white text-13 pointer">
                  {item?.locationName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Hashtag;
