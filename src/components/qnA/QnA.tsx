const QnA = ({ faqContent }) => {
  return (
    <>
      {faqContent?.map((item, index) => (
        <div className="col-lg-6" key={index}>
          <div className="accordion__item px-20 lg:px-15 py-20 lg:py-15 border-light rounded-22">
            <div
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#QnA${index}`}
            >
              <div className="accordion__icon size-35 flex-center bg-light-2 rounded-full mr-20 xl:mr-15 lg:mr-10">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-dark-1 xl:text-14 text-start">
                {item?.value}
              </div>
            </div>
            {/* End accordion button */}

            <div
              className="accordion-collapse collapse"
              id={`QnA${index}`}
              data-bs-parent="#QnA"
            >
              <div className="pt-15 lg:pt-10 pl-50">
                <p
                  className="text-15 xl:text-14 lg:text-13"
                  dangerouslySetInnerHTML={{
                    __html: item?.text?.replaceAll("\n", "<br/>") || "",
                  }}
                />
              </div>
            </div>
            {/* End accordion conent */}
          </div>
        </div>
      ))}
    </>
  );
};

export default QnA;
