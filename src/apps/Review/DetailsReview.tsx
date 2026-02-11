import { useEffect, useRef, useState } from "react";
import ReviewGallery from "./ReviewGallery";
import { getListComments } from "@/api/hotel.api";
import Skeleton from "react-loading-skeleton";
import { formatStringToDate } from "@/utils/utils";
import Pagination from "@/apps/Pagination";
import ReviewSkeleton from "../SkeletonReview/SkeletonReview";
import { useTranslation } from "react-i18next";

interface DetailsReviewProps {
  hotel: any;
}

const DetailsReview = ({ hotel }: DetailsReviewProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [infoComments, setInfoComments] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const lastFetchKey = useRef<string | null>(null);

  useEffect(() => {
    if (!hotel?.hotelCode) return;
    const fetchKey = `${hotel.hotelCode}_${currentPage}`;
    if (fetchKey === lastFetchKey.current) return;
    lastFetchKey.current = fetchKey;
    let cancelled = false;

    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getListComments({
          Page: currentPage,
          PageSize: 5,
          Entity: hotel.hotelCode,
        });
        if (cancelled) return;
        if (data?.success) {
          setInfoComments(data);
        }
      } catch (error) {
        if (!cancelled) console.error("Uncaught error: ", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchComments();
    return () => { cancelled = true; };
  }, [hotel?.hotelCode, currentPage]);

  if (infoComments?.data?.length === 0) return;

  return (
    <div className="pt-20">
      {isLoading && (
        <div className="container py-60">
          <ReviewSkeleton />
        </div>
      )}
      {!isLoading && (
        <div>
          {infoComments?.data?.map((item: any, index: number) => (
            <div
              key={index + item?.userName}
              className="border-top-light pt-20 xl:pt-15 pb-30 xl:pb-20"
            >
              <div className="row  justify-between">
                <div className="col-lg-4">
                  <div className="d-flex gap-3">
                    <div 
                      className="flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-medium"
                      style={{
                        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
                        minWidth: 45,
                        height: 45,
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      {item?.userName
                        ?.split(' ')
                        .filter(Boolean)
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()
                        .substring(0, 2)}
                    </div>
                    <div>
                      <div className="fw-500 text-18 xl:text-16 lg:text-15">
                        {item?.userName}
                      </div>
                      {item?.countryName && (
  <div className="text-12 text-neutral-300">
    <i className="ri-map-pin-fill text-neutral-500 fw-400 text-12 mr-6"></i>
    <span className="ml-2 text-12 font-normal text-neutral-400">
      {item.countryName}
    </span>
  </div>
)}
                      {item?.feedbackDate && <div className="text-12 text-neutral-300">
                      <i className="ri-creative-commons-nc-fill text-neutral-500 fw-400 text-12 mr-6"></i>
                      {t("COMMON.FEEDBACK_DATE")}{formatStringToDate(item?.feedbackDate, { format: 'DD/MM/YY' })}
                      </div>}
                      {item?.checkInDate && <p className="text-12 text-neutral-300">
                        <i className="ri-calendar-2-line text-neutral-500 fw-400 text-12 mr-6"></i>
                        {item?.totalNight} {t("COMMON.NIGHT")}
                         {" "}({formatStringToDate(item?.checkInDate, { format: 'DD/MM' })} - {formatStringToDate(item?.checkOutDate, { format: 'DD/MM/YY' })})
                        </p>}
                      {item?.bookingType && <p className="text-12 fw-400 text-neutral-300">
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.99965 12.5564C10.0679 12.5564 12.5552 10.0691 12.5552 7.00087C12.5552 3.93262 10.0679 1.44531 6.99965 1.44531C3.9314 1.44531 1.44409 3.93262 1.44409 7.00087C1.44409 10.0691 3.9314 12.5564 6.99965 12.5564Z"
                            stroke="#6A718A"
                            strokeWidth="0.833333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.99973 6.72309C7.76679 6.72309 8.38862 6.10126 8.38862 5.3342C8.38862 4.56714 7.76679 3.94531 6.99973 3.94531C6.23267 3.94531 5.61084 4.56714 5.61084 5.3342C5.61084 6.10126 6.23267 6.72309 6.99973 6.72309Z"
                            stroke="#6A718A"
                            strokeWidth="0.833333"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.11694 10.9819C3.21242 9.53426 4.41685 8.38965 5.88862 8.38965H8.11084C9.58067 8.38965 10.7839 9.53123 10.8821 10.9761"
                            stroke="#6A718A"
                            strokeWidth="0.833333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-6">{item?.bookingType}</span>
                      </p>}
                      
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 lg:pt-10">
                  <p className="text-truncate text-18 xl:text-16 lg:text-15 fw-500 w-75 text-neutral-800">
                  &quot;{item?.title}&quot;
                  </p>
                  <div className="d-flex gap-2">
                    <p className="text-12 fw-400 text-white bg-primary-500 rounded-4 px-1">
                      {item?.totalVote}
                    </p>
                    <p className="text-12 fw-400 text-neutral-800">
                      {item?.voteStatus}
                    </p>
                  </div>
                  <p className="text-12 fw-400 text-neutral-500 text-truncate-3 mt-6">
                    {item?.comment}
                  </p>
                  <ReviewGallery commentImgs={item?.images} />
                </div>
              </div>
            </div>
          ))}
          <Pagination
            totalPage={infoComments?.totalPage}
            currentPageProps={currentPage}
            onClick={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsReview;
