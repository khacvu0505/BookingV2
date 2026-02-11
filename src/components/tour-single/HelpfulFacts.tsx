const HelpfulFacts = ({ tour }) => {
  if (!tour) {
    return;
  }
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div>
          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className="icon-clock text-14 mr-10" />
                Khởi hành từ: {tour?.checkIn}
              </div>
            </div>
            <div className="col-12">
              <div className="text-15">
                <i className=" icon-clock text-14 mr-10" />
                Kết thúc sau: {tour?.checkOut}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="">
          <div className="row x-gap-50 y-gap-5 pt-10">
            <div className="col-12">
              <div className="text-15">
                <i className="icon-calendar-2 text-14 mr-10" />
                Thời gian: {tour?.duration}
              </div>
            </div>

            <div className="col-12">
              <div className="text-15">
                <i className=" icon-calendar-2 text-14 mr-10 " />
                Danh mục: {tour?.categoryName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpfulFacts;
