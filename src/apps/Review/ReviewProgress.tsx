import { getVoteSupplier } from "@/api/hotel.api";
import RatingComponent from "@/apps/Rating";
import { hotelKeys } from "@/lib/query-keys";
import { converObjectToArray } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ReviewProgressProps {
  hotel: any;
}

const ReviewProgress = ({ hotel }: ReviewProgressProps) => {
  const { t } = useTranslation();

  const { data: voteSupplier, isLoading } = useQuery({
    queryKey: hotelKeys.voteSupplier(hotel?.hotelCode ?? ""),
    queryFn: async () => {
      const res = await getVoteSupplier(hotel.hotelCode);
      if (res?.success && res?.data && typeof res.data === "object") {
        return res.data;
      }
      return null;
    },
    enabled: !!hotel?.hotelCode,
  });

  const voteSupplierInfo = useMemo(
    () => ({
      location: t("COMMON.LOCATION"),
      comfort: t("COMMON.COMFORT"),
      facilities: t("COMMON.FACILITIES"),
      freeWifi: t("COMMON.FREE_WIFI"),
      cleanliness: t("COMMON.CLEAN_LINESS"),
      staff: t("COMMON.STAFF"),
      valueForMoney: t("COMMON.VALUE_FOR_MONEY"),
    }),

    [t]
  );

  return (
    <>
      {!isLoading && (
        <>
          <div className="row y-gap-30 items-center pt-20">
            <div className="col-md-4 col-xl-3">
              <div className="flex-center rounded-22 min-h-250 bg-blue-1-05">
                <div className="text-center">
                  <div className="text-60 md:text-50 fw-600 text-blue-1">
                    {voteSupplier?.votePoint || 10}
                  </div>
                  <div className="fw-600 text-24 xl:text-22 lg:text-20">
                    {voteSupplier?.voteStatus || "Tuyệt vời"}
                  </div>
                  <div className="text-16 xl:text-15 text-primary-500 fw-400 mt-5">
                    {voteSupplier?.totalReview} {t("COMMON.RATING")}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-xl-9">
              <div className="row y-gap-30">
                {voteSupplier &&
                  typeof voteSupplier === "object" &&
                  converObjectToArray(voteSupplier)?.map((item: any, index: number) => {
                    if (
                      item?.label !== "totalReview" &&
                      item?.label !== "votePoint" &&
                      typeof item?.value === "number"
                    ) {
                      return (
                        <div className="col-lg-4 col-md-6" key={index}>
                          <div className="md:d-flex md:justify-between d-block">
                            <div className="d-flex items-center ">
                              <div className="text-15 lg:text-14 fw-500 ">
                                {(voteSupplierInfo as Record<string, string>)[item?.label] || "Vị trí"}
                              </div>
                              <div className="text-15 lg:text-14 text-light-1 fw-500 text-primary-500 pl-5">
                                {`(${
                                  item?.value &&
                                  Number(item?.value || 10.0).toFixed(1)
                                })`}
                              </div>
                            </div>
                            <RatingComponent
                              initialRating={item?.value || 5}
                              stop={5}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewProgress;
