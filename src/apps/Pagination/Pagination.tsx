import { useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import "./Pagination.style.scss";
import classNames from "classnames";

const Pagination = ({
  totalPage: total,
  currentPageProps,
  onClick = (page: any) => {},
}: { totalPage: any; currentPageProps?: any; onClick?: (page: any) => void }) => {
  const [params, setSearchParams] = useQueryParams();
  const pageParam = currentPageProps
    ? currentPageProps
    : Number(params.page) || 1;

  const [currentPage, setCurrentPage] = useState(pageParam);

  const handlePageClick = (pageNumber: any) => {
    if (currentPage === pageNumber) return;
    setCurrentPage(pageNumber);
    setSearchParams({ ...params, page: pageNumber.toString() });
    onClick(Number(pageNumber));
  };

  const handleClickArrowChangePage = (isNextPage: boolean) => {
    if (isNextPage && currentPage < total) {
      handlePageClick(Number(currentPage) + 1);
    } else if (!isNextPage && currentPage > 1) {
      handlePageClick(Number(currentPage) - 1);
    }
  };

  const renderPagination = () => {
    if (total <= 7) {
      return [...Array(total)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <div className="col-auto" key={pageNumber}>
            <div
              onClick={() => handlePageClick(pageNumber)}
              className={`size-40 flex-center border-light rounded-4 cursor-pointer ${
                pageParam === pageNumber ? "bg-primary-500 text-white" : ""
              }`}
            >
              {pageNumber}
            </div>
          </div>
        );
      });
    }

    let pages: (number | string)[] = [];
    const range = 2; // số trang hiển thị 2 bên current

    const showLeftDots = currentPage > range + 2;
    const showRightDots = currentPage < total - (range + 1);

    // luôn hiển thị page đầu
    pages.push(1);

    // dấu chấm bên trái
    if (showLeftDots) {
      pages.push("dots-left");
    }

    // trang ở giữa (currentPage - 2 đến currentPage + 2)
    const startPage = Math.max(2, currentPage - range);
    const endPage = Math.min(total - 1, currentPage + range);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // dấu chấm bên phải
    if (showRightDots) {
      pages.push("dots-right");
    }

    // luôn hiển thị page cuối
    pages.push(total);

    return pages.map((page: number | string, index: number) => {
      if (page === "dots-left" || page === "dots-right") {
        return (
          <span key={page + index} className="col-auto">
            ...
          </span>
        );
      }

      return (
        <div className="col-auto" key={page}>
          <div
            onClick={() => handlePageClick(page)}
            className={`size-40 flex-center border-light rounded-4 cursor-pointer ${
              pageParam === page ? "bg-primary-500 text-white" : ""
            }`}
          >
            {page}
          </div>
        </div>
      );
    });
  };

  return (
    total > 1 && (
      <div className="my-30 xl:my-20 lg:my-15 pt-30 lg:pt-20 pb-30 lg:pb-20">
        <div className="d-flex justify-center">
          {total > 1 && (
            <div>
              <button
                className={classNames("size-40 rounded-4 border-light mr-15", {
                  "cursor-not-allowed": Number(currentPage) === 1,
                  "button -blue-1": Number(currentPage) !== 1,
                })}
                onClick={() => handleClickArrowChangePage(false)}
                disabled={Number(currentPage) === 1}
              >
                <i className="icon-chevron-left text-12" />
              </button>
            </div>
          )}

          <div>
            <div className="row x-gap-20 y-gap-20 items-center">
              {renderPagination()}
            </div>
          </div>

          {total > 1 && (
            <div>
              <button
                className={classNames("size-40 rounded-4 border-light ml-15", {
                  "cursor-not-allowed": Number(currentPage) === total,
                  "button -blue-1": Number(currentPage) !== total,
                })}
                onClick={() => handleClickArrowChangePage(true)}
                disabled={Number(currentPage) === total}
              >
                <i className="icon-chevron-right text-12" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Pagination;
