import React, { useEffect, useState } from "react";
import PaymentInfo from "../PaymentInfo";
import useWindowSize from "@/utils/useWindowSize";

import CustomerInfoTour from "@/components/booking-page/CustomerInfoTour";
import OrderTourSubmittedInfo from "@/components/booking-page/OrderTourSubmittedInfo";

const StepperBookingTour = ({ isDetail }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const isDesktop = useWindowSize().width > 768;

  useEffect(() => {
    if (isDetail) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [isDetail]);

  const steps = [
    {
      title: "Chọn tour",
      stepNo: "1",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <PaymentInfo />,
    },
    {
      title: "Chi tiết",
      stepNo: "2",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <CustomerInfoTour />,
    },

    {
      title: "Trạng thái",
      stepNo: "3",
      stepBar: "",
      content: <OrderTourSubmittedInfo />,
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {isDesktop && (
        <div className="row flex-column flex-sm-row align-items-start align-items-sm-center x-gap-40 y-gap-30  justify-content-center mt-30 md:mt-0">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="col-auto">
                <div
                  className="d-flex items-center transition"
                  // onClick={() => setCurrentStep(index)}
                >
                  <div
                    className={
                      currentStep > index
                        ? "active size-40 rounded-full flex-center bg-blue-1"
                        : currentStep === index
                        ? "active size-40 rounded-full flex-center bg-blue-1"
                        : "size-40 rounded-full flex-center bg-blue-1-05 text-blue-1 fw-500"
                    }
                  >
                    {currentStep > index ? (
                      <>
                        <i className="icon-check text-16 text-white"></i>
                      </>
                    ) : (
                      <>
                        {currentStep === index ? (
                          <>
                            <i className="icon-edit text-16 text-white"></i>
                          </>
                        ) : (
                          <>
                            <span>{step.stepNo}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="text-18 fw-500 ml-10"> {step.title}</div>
                </div>
              </div>

              {step.stepBar}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* End stepper header part */}

      <div className="row justify-content-center">{renderStep()}</div>
      {/* End main content */}

      {/* <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          <button
            className="button h-60 px-24 -blue-1 bg-light-2"
            disabled={currentStep === 0}
            onClick={previousStep}
          >
            Previous
          </button>
        </div>
   

        <div className="col-auto">
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
            disabled={currentStep === steps.length - 1}
            onClick={nextStep}
          >
            Next <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </div> */}
      {/* End stepper button */}
    </>
  );
};

export default StepperBookingTour;
