interface PoliciesProps {
  policies: any[];
}

const Policies = ({ policies }: PoliciesProps) => {
  if (!policies) {
    return;
  }
  return (
    <div className="row">
      {policies?.map((item: any, index: number) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="">
            <div className="d-flex items-center">
              <div className="text-16 lg:text-15 fw-500">
                <i
                  className={`${item.icon} text-16 lg:text-15 mr-10`}
                />
                {item.value}
              </div>
            </div>
            <div className="col-12">
              <div
                className="text-15 lg:text-15"
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
