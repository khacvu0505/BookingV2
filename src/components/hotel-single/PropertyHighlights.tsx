import parse from "html-react-parser";
import OffCanvasDetail from "./sidebar-detail/OffCanvasDetail";
const PropertyHighlights2 = ({
  propertyHighlights,
  hotelPolicies = {},
  offCanvasRef,
  hasCanvas = true,
}) => {
  return (
    <div>
      <div className="row y-gap-20 pt-30">
        {propertyHighlights?.map((item, index) => (
          <div className="col-lg-3 col-6" key={index}>
            <div className="text-center">
              {item.icon ? (
                parse(item.icon)
              ) : (
                <i className="icon-city text-24 text-blue-1"></i>
              )}
              <div className="text-15 lh-1 mt-10">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-40 w-100">
        <button
          className="button d-flex items-center justify-content-center w-100"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDetail"
          aria-controls="offcanvasRight"
          onClick={() => offCanvasRef?.current?.setActiveTab(2)}
        >
          <div className="py-5 px-20 rounded-100 border-light">
            <i className={`icon-plus text-12 text-blue-1 mr-10`} />
            <span className="text-14 lh-15">Xem thêm</span>
          </div>
        </button>
      </div> */}
      {hasCanvas && (
        <OffCanvasDetail ref={offCanvasRef} hotelPolicies={hotelPolicies} />
      )}
    </div>
  );
};

export default PropertyHighlights2;
