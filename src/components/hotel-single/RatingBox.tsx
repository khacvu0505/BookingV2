const RatingBox = ({ hotel }) => {
  // const recommendRatings = [
  //   {
  //     id: 1,
  //     name: "Breakfast",
  //     numberOfRatings: "25",
  //   },
  //   {
  //     id: 2,
  //     name: "WiFi",
  //     numberOfRatings: "14",
  //   },
  //   {
  //     id: 3,
  //     name: "Food & Dining",
  //     numberOfRatings: "67",
  //   },
  // ];

  return (
    <div className="px-10 py-10 border-light rounded-22 mt-10">
      <div className="d-flex items-center">
        <div className="size-40 flex-center bg-blue-1 rounded-full">
          <div className="text-14 fw-600 text-white">
            {Number(hotel?.votePoint)}
          </div>
        </div>
        <div className="d-flex items-center ml-5">
          <div className="text-13  ml-5">
            <div className="text-14">
              Được khách đánh giá cao – <strong>{hotel?.votePercent}%</strong>{" "}
              muốn quay lại
            </div>
            <div className=" text-light-1">{hotel?.voteStatus}</div>
          </div>
        </div>
      </div>
      {/* End d-flex */}

      {/* End d-flex */}

      {/* <div className="border-top-light mt-20 mb-20" /> */}

      {/* <div className="row x-gap-10 y-gap-10">
        {recommendRatings.map((item) => (
          <div className="col-auto" key={item.id}>
            <div className="d-flex items-center py-5 px-20 rounded-100 border-light">
              <i className={`icon-like text-12 text-blue-1 mr-10`} />
              <div className="text-14 lh-15">
                {item.name}
                <span className="fw-500 text-blue-1 ml-5">
                  {item.numberOfRatings}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      {/* End .row */}
    </div>
  );
};

export default RatingBox;
