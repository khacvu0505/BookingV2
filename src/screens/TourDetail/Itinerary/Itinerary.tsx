import { useState } from "react";
import { Tabs } from "@/components/Tabs";
import Timelines from "@/components/Timelines";
import Modal from "@/components/Modal";
import ItineraryContent from "./ItineraryContent";
import { useTranslation } from "react-i18next";

const Itinerary = ({ data }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<any>(0);
  const [showModal, setShowModal] = useState(false);
  const [stepChoose, setStepChoose] = useState<any>();

  const handleMoreClick = (step) => {
    setShowModal(true);
    setStepChoose(step);
  };

  const getTabItems = () =>
    data?.map((item, index) => ({
      key: index,
      label: `${t("COMMON.DAY")} ${index + 1}`,
      icon: "icon-destination",
      children: (
        <>
          <div className="d-block xl:d-none">
            <Timelines steps={[...item]} handleMoreClick={handleMoreClick} />
          </div>
          <div className="d-none xl:d-block py-30">
            <div className="relative">
              <div className="border-test" />
              <div
                className="accordion -map row y-gap-20"
                id="itineraryContent"
              >
                <ItineraryContent data={data && data[activeTab]} />
              </div>
            </div>
          </div>
        </>
      ),
    }));

  return (
    <div>
      <Tabs
        defaultActiveKey={0 as any}
        onChange={(value) => {
          setActiveTab(value);
        }}
        items={getTabItems()}
        className="bg-white tabCustom"
      />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={stepChoose?.value1}
      >
        {stepChoose && (
          <>
            {stepChoose?.value && (
              <p className="text-16 fw-500 ">
                {t("COMMON.STOP_OVER")}:{" "}
                <span className="text-primary-500">
                  {stepChoose?.value} {t("COMMON.MINUTES")}
                </span>
              </p>
            )}
            <p
              className="text-16 fw-400 w-100 mt-10"
              dangerouslySetInnerHTML={{
                __html: stepChoose?.text?.replaceAll("\n", "<br/>") || "",
              }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Itinerary;
