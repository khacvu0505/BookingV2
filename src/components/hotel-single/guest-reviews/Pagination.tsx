import { forwardRef, useImperativeHandle, useState } from "react";

const Pagination = ({ totalPage, handleClickPage }, ref) => {
  const [currentPage, setCurrentPage] = useState(1);

  useImperativeHandle(
    ref,
    () => ({
      currentPage,
      setCurrentPage,
    }),
    [currentPage]
  );

  const rangePage = 2;

  const renderDots = () => <span className="col-auto">...</span>;

  const renderPagination = () => {
    return (
      totalPage > 0 &&
      [...Array(totalPage)].map((_, index) => {
        const pageNumber = index + 1;

        if (
          currentPage <= rangePage * 2 + 1 &&
          pageNumber > currentPage + rangePage &&
          pageNumber < totalPage - 1
        ) {
          return renderDots();
        } else if (
          currentPage > rangePage * 2 + 1 &&
          currentPage < totalPage - rangePage * 2
        ) {
          if (pageNumber > rangePage && pageNumber < currentPage - 1) {
            return renderDots();
          } else if (
            pageNumber > currentPage + rangePage &&
            pageNumber < totalPage - 1
          ) {
            return renderDots();
          }
        } else if (
          currentPage >= totalPage - rangePage * 2 &&
          pageNumber < currentPage - rangePage &&
          pageNumber > rangePage
        ) {
          return renderDots();
        }
        const className = `size-40 flex-center rounded-full cursor-pointer ${
          currentPage === pageNumber ? "bg-dark-1 text-white" : ""
        }`;
        return (
          <div className="col-auto" key={index}>
            <div
              onClick={() => handleClickPage(pageNumber)}
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
    if (isNextPage && currentPage < totalPage) {
      handleClickPage(Number(currentPage) + 1);
    } else if (!isNextPage && currentPage > 1) {
      handleClickPage(Number(currentPage) - 1);
    }
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        {totalPage > 0 && (
          <div className="col-auto md:order-1">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleClickArrowChangePage(false)}
              disabled={Number(currentPage) === 1}
            >
              <i className="icon-chevron-left text-12" />
            </button>
          </div>
        )}

        <div className="col-auto md:order-2">
          <div className="row x-gap-10 y-gap-10 items-center ">
            {renderPagination()}
          </div>
        </div>
        {totalPage > 0 && (
          <div className="col-auto md:order-3">
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              onClick={() => handleClickArrowChangePage(true)}
              disabled={Number(currentPage) === totalPage}
            >
              <i className="icon-chevron-right text-12" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(Pagination);
