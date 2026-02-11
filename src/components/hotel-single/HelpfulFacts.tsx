const HelpfulFacts = ({ hotel }) => {
  if (!hotel) {
    return;
  }
  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div>
          {/* <div className="d-flex items-center">
            <i className="icon-calendar text-20 mr-10"></i>
            <div className="text-16 fw-500">Ngày nhận/Ngày trả</div>
          </div> */}

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className="icon-clock text-14 mr-10" />
                Nhận phòng từ: {hotel?.checkIn}
              </div>
            </div>

            <div className="col-12">
              <div className="text-15">
                <i className="icon-clock text-14 mr-10" />
                Trả phòng trước: {hotel?.checkOut}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-30">
          <div className="d-flex items-center">
            <i className="icon-location-pin text-20 mr-10"></i>
            <div className="text-16 fw-500">Getting around</div>
          </div>

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">Airport transfer fee: 60 USD</div>
            </div>

            <div className="col-12">
              <div className="text-15">Distance from city center: 2 km</div>
            </div>

            <div className="col-12">
              <div className="text-15">
                Travel time to airport (minutes): 45
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="">
          {/* <div className="d-flex items-center">
            <i className="icon-ticket text-20 mr-10"></i>
            <div className="text-16 fw-500">Extras</div>
          </div> */}

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className=" icon-calendar-2 text-14 mr-10" />
                Năm xây dựng: {hotel?.builtYear}
              </div>
            </div>

            <div className="col-12">
              <div className="text-15">
                <i className=" icon-calendar-2 text-14 mr-10 " />
                Nâng cấp gần nhất năm: {hotel?.upgradedYear}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-30">
          <div className="d-flex items-center">
            <i className="icon-parking text-20 mr-10"></i>
            <div className="text-16 fw-500">Parking</div>
          </div>

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">Daily parking fee: 65 USD</div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="">
          {/* <div className="d-flex items-center">
            <i className="icon-plans text-20 mr-10"></i>
            <div className="text-16 fw-500">The property</div>
          </div> */}

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className="icon-plans text-14 mr-10"></i>Số tầng:{" "}
                {hotel?.floor}
              </div>
            </div>

            <div className="col-12">
              <div className="text-15">
                {" "}
                <i className="icon-plans text-14 mr-10"></i>Số phòng:{" "}
                {hotel?.rooms}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="">
          {/* <div className="d-flex items-center">
            <i className="icon-plans text-20 mr-10"></i>
            <div className="text-16 fw-500">The property</div>
          </div> */}

          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className="icon-plans text-14 mr-10"></i>Số nhà hàng:{" "}
                {hotel?.restaurant}
              </div>
            </div>

            <div className="col-12">
              <div className="text-15">
                <i className="icon-plans text-14 mr-10"></i>Bar và lounge:{" "}
                {hotel?.barOrLounges}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpfulFacts;
