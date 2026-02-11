import { getVoteSupplier } from "@/api/hotel.api";
import { converObjectToArray } from "@/utils/utils";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const voteSupplierInfo = {
  location: "Vị trí",
  comfort: "Thoải mái",
  facilities: "Cơ sở vật chất",
  freeWifi: "Wifi miễn phí",
  cleanliness: "Độ sạch sẽ",
  staff: "Nhân viên nhiệt tình",
  valueForMoney: "Hợp với giá tiền",
};

const ReviewProgress = ({ hotel }: { hotel: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [voteSupplier, setVoteSupplier] = useState<any>({});
  useEffect(() => {
    const fetchVoteSupplier = async () => {
      setIsLoading(true);
      try {
        const voteSupplierData = await getVoteSupplier(hotel?.hotelCode);
        const data = voteSupplierData?.data;
        if (data && typeof data === "object" && voteSupplierData?.success) {
          setVoteSupplier(data);
        } else {
          setVoteSupplier(null);
        }
      } catch (error) {
        console.error("Uncaught error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (hotel?.hotelCode) {
      fetchVoteSupplier();
    }
  }, [hotel?.hotelCode]);

  return (
    <>
      {isLoading && (
        <div className="container py-60">
          <Skeleton wrapper={"div" as any} height={200} />
          <Skeleton count={3} />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="row y-gap-30 items-center pt-20">
            <div className="col-lg-3">
              <div className="flex-center rounded-22 min-h-250 bg-blue-1-05">
                <div className="text-center">
                  <div className="text-60 md:text-50 fw-600 text-blue-1">
                    {voteSupplier?.votePoint}
                  </div>
                  <div className="fw-500 lh-1">{voteSupplier?.voteStatus}</div>
                  <div className="text-14 text-light-1 lh-1 mt-5">
                    {voteSupplier?.totalReview} đánh giá
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row y-gap-30">
                {voteSupplier &&
                  typeof voteSupplier === "object" &&
                  converObjectToArray(voteSupplier as Record<string, unknown>)?.map((item, index) => {
                    if (
                      item?.label !== "totalReview" &&
                      item?.label !== "votePoint" &&
                      typeof item?.value === "number"
                    ) {
                      return (
                        <div className="col-md-4 col-sm-6" key={index}>
                          <div className="d-flex items-center justify-between">
                            <div className="text-15 fw-500">
                              {voteSupplierInfo[item?.label]}
                            </div>
                            <div className="text-15 text-light-1 fw-500 capitalize">
                              {item?.value && Number(item?.value).toFixed(1)}
                            </div>
                          </div>
                          <div className="progressBar mt-10">
                            <div className="progressBar__bg bg-blue-2" />
                            <div
                              className="progressBar__bar bg-blue-1"
                              style={{ width: `${(item?.value || 0) * 10}%` }}
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
