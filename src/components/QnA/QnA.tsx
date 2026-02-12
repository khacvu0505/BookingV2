interface QnAProps {
  listQnA: any[];
}

const QnA = ({ listQnA }: QnAProps) => {
  return (
    <div
      className="accordion -simple row y-gap-10 px-0 js-accordion mt-10 mx-auto"
      id="Faq1"
    >
      {listQnA?.map((item: any, index: number) => (
        <div className="col-lg-6" key={index}>
          <div className="accordion__item border-light rounded-22 px-15 py-15 lg:py-10 lg:px-10">
            <div
              className="accordion__button d-flex items-center h-65 "
              data-bs-toggle="collapse"
              data-bs-target={`#QnA${index}`}
            >
              <div className="accordion__icon size-35 flex-center bg-light-2 rounded-full mr-20">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="tooltip">
                <div className="button lg:text-15 text-dark-1 text-start text-truncate-2 rounded-0">
                  {item?.value}
                </div>
                {item?.value?.length > 50 && (
                  <span className="tooltiptext">{item?.value}</span>
                )}
              </div>
            </div>

            <div
              className="accordion-collapse collapse"
              id={`QnA${index}`}
              data-bs-parent="#QnA"
            >
              <div className="pt-10 pl-60">
                <p
                  className="text-15 lg:text-14"
                  dangerouslySetInnerHTML={{
                    __html: item?.text?.replaceAll("\n", "<br/>") || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QnA;
