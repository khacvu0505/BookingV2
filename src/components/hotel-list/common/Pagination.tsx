import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";

const Pagination = ({ totalPage: total }) => {
  const [params, setSearchParams] = useQueryParams();
  const pageParam = Number(params.page) || 1;

  const [currentPage, setCurrentPage] = useState(pageParam);

  const handlePageClick = (pageNumber) => {
    if (currentPage === pageNumber) return;
    setCurrentPage(pageNumber);
    setSearchParams({ ...params, page: pageNumber.toString() });
  };

  const rangePage = 2;

  const renderDots = () => <span className="col-auto">...</span>;

  const renderPagination = () => {
    return (
      total > 0 &&
      [...Array(total)].map((_, index) => {
        const pageNumber = index + 1;

        if (
          pageParam <= rangePage * 2 + 1 &&
          pageNumber > pageParam + rangePage &&
          pageNumber < total - 1
        ) {
          return renderDots();
        } else if (
          pageParam > rangePage * 2 + 1 &&
          pageParam < total - rangePage * 2
        ) {
          if (pageNumber > rangePage && pageNumber < pageParam - 1) {
            return renderDots();
          } else if (
            pageNumber > pageParam + rangePage &&
            pageNumber < total - 1
          ) {
            return renderDots();
          }
        } else if (
          pageParam >= total - rangePage * 2 &&
          pageNumber < pageParam - rangePage &&
          pageNumber > rangePage
        ) {
          return renderDots();
        }
        const className = `size-40 flex-center rounded-full cursor-pointer ${
          pageParam === pageNumber ? "bg-dark-1 text-white" : ""
        }`;
        return (
          <div className="col-auto" key={index}>
            <div
              onClick={() => handlePageClick(pageNumber)}
              className={className}
            >
              {pageNumber}
            </div>
          </div>
        );
      })
    );
  };

  const handleClickArrowChangePage = (isNextPage) => {
    if (isNextPage && currentPage < total) {
      handlePageClick(Number(currentPage) + 1);
    } else if (!isNextPage && currentPage > 1) {
      handlePageClick(Number(currentPage) - 1);
    }
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        {total > 0 && (
          <div className="col-auto">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleClickArrowChangePage(false)}
              disabled={Number(currentPage) === 1}
            >
              <i className="icon-chevron-left text-12" />
            </button>
          </div>
        )}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20 items-center">
            {renderPagination()}
          </div>
        </div>
        {total > 0 && (
          <div className="col-auto">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleClickArrowChangePage(true)}
              disabled={Number(currentPage) === total}
            >
              <i className="icon-chevron-right text-12" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
