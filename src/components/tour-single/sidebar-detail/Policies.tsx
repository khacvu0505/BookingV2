import { useSelector } from "react-redux";

const Policies = ({ policies }) => {
  if (!policies || policies?.length === 0) {
    return;
  }
  return (
    <div className="row">
      {policies?.map((item, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="">
            <div className="d-flex items-center">
              <div className="text-16 fw-500">{item.value}</div>
            </div>
            <div className="col-12">
              <div
                className="text-15"
                dangerouslySetInnerHTML={{
                  __html: item.text?.replaceAll("\n", "<br />") || "",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Policies;
