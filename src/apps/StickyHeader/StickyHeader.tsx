import { useEffect, useState } from "react";
import { formatCurrency, getMinValueFromList } from "@/utils/utils";
import { useSelector } from "react-redux";
import OffCanvasDetail from "../SidebarDetail/OffCanvasDetail";
import Button from "@/apps/Button";
import { useTranslation } from "react-i18next";
import { useTabTitleHeader } from "@/utils/constants";

interface StickyHeaderProps {
  offCanvasRef: React.RefObject<any>;
  roomInfos: any[];
  hotelPolicies?: any;
  hotel: any;
  type?: string;
}

const StickyHeader = ({
  offCanvasRef,
  roomInfos,
  hotelPolicies = {},
  hotel,
  type = "hotel",
}: StickyHeaderProps) => {
  const { t } = useTranslation();
  const [header, setHeader] = useState(false);
  const { currentCurrency } = useSelector((state) => state.app);
  const tabTitleHeader = useTabTitleHeader();

  const changeBackground = () => {
    // eslint-disable-next-line no-undef
    if (window.scrollY >= 400) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", changeBackground);
  }, []);

  const handleChooseRoom = () => {
    // eslint-disable-next-line no-undef
    const roomElement = document.getElementById("available-room");
    let pos = roomElement?.offsetTop || 0;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, pos);
    }, 100);
  };

  return (
    <div
      className={`singleMenu d-block lg:d-none js-singleMenu ${
        header ? "-is-active" : ""
      }`}
    >
      <div className="singleMenu__content">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center ">
            <div className="col-auto">
              <div className="singleMenu__links row x-gap-30 y-gap-10 align-items-center">
                {tabTitleHeader?.map((item: string, index: number) => (
                  <div className="col-auto" key={item}>
                    <button
                      className="button"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasDetail"
                      aria-controls="offcanvasRight"
                      onClick={() => offCanvasRef?.current?.setActiveTab(index)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto ">
                  <div className="text-14">
                    {t("COMMON.PRICE_FROM")}

                    <span className="text-22 text-dark-1 fw-500 ml-10">
                      {roomInfos && typeof roomInfos === "object"
                        ? formatCurrency(
                            getMinValueFromList(
                              roomInfos?.map((item: any) => item?.finalPrice)
                            )
                          )
                        : 0}{" "}
                      {currentCurrency}
                    </span>
                  </div>
                </div>
                <div className="col-auto">
                  <Button onClick={handleChooseRoom}>
                    {type === "hotel"
                      ? t("HOTEL.CHOOSE_ROOM")
                      : t("TOUR.CHOOSE_TOUR")}{" "}
                    <div className="icon-arrow-top-right ml-15" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OffCanvasDetail
        ref={offCanvasRef}
        hotelPolicies={hotelPolicies}
        hotel={hotel}
      />
    </div>
  );
};

export default StickyHeader;
