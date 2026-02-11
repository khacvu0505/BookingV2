import { useCallback, useEffect, useRef, useState } from "react";
import ReviewGallery from "./ReviewGallery";
import { getListComments } from "@/api/hotel.api";
import Skeleton from "react-loading-skeleton";
import { formatStringToDate } from "@/utils/utils";
import Pagination from "./Pagination";
import type { ApiResponse } from "@/types";

interface CommentItem {
  userName?: string;
  avtURL?: string;
  feedbackDate?: string;
  totalVote?: number;
  voteStatus?: string;
  comment?: string;
  images?: string[];
  [key: string]: unknown;
}

interface CommentsData {
  data?: CommentItem[];
  totalPage?: number;
  success?: boolean;
  [key: string]: unknown;
}

interface PaginationRef {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

interface DetailsReviewProps {
  tour: {
    supplierCode?: string;
    [key: string]: unknown;
  };
}

const DetailsReview = ({ tour }: DetailsReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [infoComments, setInfoComments] = useState<CommentsData>({});

  const currentPageRef = useRef<PaginationRef | null>(null);

  const fetchListComments = useCallback(
    async ({ Page }: { Page: number }) => {
      // get comments
      setIsLoading(true);
      try {
        const data = await getListComments({
          Page,
          PageSize: 10,
          Entity: tour?.supplierCode,
        });
        if (data?.success) {
          setInfoComments(data as CommentsData);
        }
      } catch (error) {
        console.error("Uncaught error: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [tour?.supplierCode, setInfoComments]
  );

  useEffect(() => {
    if (tour?.supplierCode) {
      fetchListComments({ Page: 1 });
    }
  }, [fetchListComments, tour?.supplierCode]);

  const handleClickPage = (Page: number) => {
    if (currentPageRef?.current?.currentPage === Page) return;
    currentPageRef?.current?.setCurrentPage(Page);
    fetchListComments({ Page });
  };

  return (
    <>
      {isLoading && (
        <div className="container py-60">
          <Skeleton height={200} />
        </div>
      )}
      {!isLoading && (
        <div className="row y-gap-40">
          {infoComments?.data?.map((item: CommentItem, index: number) => (
            <div className="col-lg-6" key={index + (item?.userName ?? "")}>
              <div className="row x-gap-20 y-gap-20 items-center align-items-center">
                <div className="col-auto">
                  <img
                    src={item?.avtURL}
                    alt="image"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div className="col-auto">
                  <div className="fw-500 lh-15">{item?.userName}</div>
                  <div className="text-14 text-light-1 lh-15">
                    {formatStringToDate(item?.feedbackDate ?? "", { isHideDay: true })}
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-5">
                <h5 className="fw-500 text-blue-1 ">{item?.totalVote}</h5>
                <div className="ml-10 text-blue-1 fw-500">
                  {item?.voteStatus}
                </div>
              </div>
              <p className="text-15 text-dark-1 mt-5">{item?.comment}</p>

              <ReviewGallery />

              {/* <div className="d-flex x-gap-30 items-center pt-20">
                <button className="d-flex items-center text-blue-1">
                  <i className="icon-like text-16 mr-10" />
                  Thich
                </button>
                <button className="d-flex items-center text-light-1">
                  <i className="icon-dislike text-16 mr-10" />
                  Khong thich
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
      <Pagination
        totalPage={infoComments?.totalPage || 0}
        handleClickPage={handleClickPage}
        ref={currentPageRef}
      />
    </>
  );
};

export default DetailsReview;
