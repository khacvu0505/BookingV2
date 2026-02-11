const RadomText = ({ randomText, className }: { randomText: any; className?: any }) => {
  return (
    <>
      {randomText && (
        <div
          className={`d-flex items-center justify-end mr-6  mb-10 ${className}`}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            className="svgFillAll jss1309"
          >
            <path
              d="M12.739 6.478L6.652 15l1.217-5.478H3L9.087 1 7.87 6.478h4.87z"
              stroke="#f52549"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="text-primary-500 text-14 lg:text-13 md:text-12">
            {randomText}
          </span>
        </div>
      )}
    </>
  );
};

export default RadomText;
