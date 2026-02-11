import SidebarRight from "@/components/hotel-single/SidebarRight";
import { info_booking } from "@/utils/constants";
import { getFromSessionStorage } from "@/utils/utils";
// @ts-ignore
import Services from "./Services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddOnServices } from "@/features/hotel-detail/reducers";
import Skeleton from "react-loading-skeleton";

const ServiceList = () => {
  const infoBooking = getFromSessionStorage(info_booking) as any;
  const dispatch = useDispatch();
  const { isLoadingAddon, addonServices } = useSelector((state) => state.hotel);
  const services = infoBooking?.services || [];

  useEffect(() => {
    if (infoBooking) {
      (dispatch as any)(
        fetchAddOnServices({ supplierCode: infoBooking?.hotelInfo?.hotelCode })
      );
    }
  }, []);

  return (
    <div className="accordion -simple row y-gap-20 js-accordion" id="Addon">
      <div className=" pt-50">
        {isLoadingAddon && <Skeleton count={7} />}

        {addonServices && addonServices.length > 0 && (
          <aside className={`border-light-2 rounded-4 shadow-4 lg:ml-0 mb-10`}>
            <div className="fs-18 fw-500 bg-gray-1 px-15 py-15 border-bottom-light-2">
              Dịch vụ mua thêm
            </div>
            <div className="px-20 py-20 ">
              {services.map((item, index) => (
                <div
                  className="col-12 mb-20"
                  key={`${item.serviceID}-${index}`}
                >
                  <div className="accordion__item px-20 py-20 border-light rounded-4">
                    <div
                      className="accordion__button d-flex justify-content-between"
                      aria-expanded={index === 0 ? true : false}
                      data-bs-toggle="collapse"
                      data-bs-target={`#Addon${item.serviceID}${index}`}
                    >
                      <div className="button d-block">
                        <div className="text-18 text-left">
                          Phòng {index + 1}
                        </div>
                        <div className="text-15 fw-normal mt-10">
                          {item.serviceName}
                        </div>
                      </div>

                      <div className="accordion__text  flex-center  mr-20">
                        <span>
                          Xem dịch vụ
                          <i className=" ml-5 icon-play text-10" />
                        </span>
                        <span>
                          Ẩn dịch vụ <i className="ml-5 icon-ski text-10" />
                        </span>
                      </div>
                    </div>
                    {/* End accordion button */}

                    <div
                      className={`accordion-collapse collapse  border-top-light mt-15 ${
                        index === 0 && "show"
                      }`}
                      id={`Addon${item.serviceID}${index}`}
                      data-bs-parent="#Addon"
                    >
                      <div className="px-15 pt-15">
                        <Services addonList={addonServices} indexRoom={index} />
                      </div>
                    </div>
                    {/* End accordion conent */}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
