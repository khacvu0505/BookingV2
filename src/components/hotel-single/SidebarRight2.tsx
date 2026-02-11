import Map from "./Map";
import parse from "html-react-parser";

const SidebarRight2 = ({ mapIFrame }) => {
  return (
    <div className="border-light rounded-4 ">
      <div>
        <Map mapIFrame={mapIFrame && parse(mapIFrame)} />
      </div>
      {/* End map */}

      {/* <div className="row y-gap-10">
        <div className="col-12">
          <div className="d-flex items-center">
            <i className="icon-award text-20 text-blue-1" />
            <div className="text-14 fw-500 ml-10">
              Vị trí đắc địa - nằm trong trung tâm thành phố
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex items-center">
            <i className="icon-pedestrian text-20 text-blue-1" />
            <div className="text-14 fw-500 ml-10">Thuận tiện đi lại</div>
          </div>
        </div>
      </div> */}
      {/* End .row */}

      {/* <div className="border-top-light mt-15 mb-15" />
      <div className="text-15 fw-500">Popular landmarks</div>
      <div className="d-flex justify-between pt-10">
        <div className="text-14">Royal Pump Room Museum</div>
        <div className="text-14 text-light-1">0.1 km</div>
      </div>

      <div className="d-flex justify-between pt-5">
        <div className="text-14">Harrogate Turkish Baths</div>
        <div className="text-14 text-light-1">0.1 km</div>
      </div>
      <button className="d-block text-14 fw-500 underline text-blue-1 mt-10">
        Show More
      </button> */}
    </div>
  );
};

export default SidebarRight2;
