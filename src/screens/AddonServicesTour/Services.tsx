import ServiceDetail from "./ServiceDetail";

const Services = ({ addonList }) => {
  return (
    <div className="row">
      {addonList &&
        addonList?.map((service) => (
          <div className={"col-xl-4 col-md-6 px-10"} key={service?.serviceID}>
            <ServiceDetail service={service} />
          </div>
        ))}
    </div>
  );
};
export default Services;
