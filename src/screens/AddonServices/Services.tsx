import { getFromSessionStorage } from "@/utils/utils";
import ServiceDetail from "./ServiceDetail";
import { info_booking } from "@/utils/constants";
import { useState } from "react";
import { handleSetAddon } from "@/utils/handleSetDefaultBooking";

const Services = ({ addonList, indexRoom }) => {
  const infoBooking = getFromSessionStorage(info_booking);
  const [roomActiveInfo, setRoomActiveInfo] = useState(
    infoBooking?.services[indexRoom]
  );
  const handleCheckAddon = (service) => {
    const services = handleSetAddon(service, indexRoom, 1, true);
    setRoomActiveInfo(services[indexRoom]);
  };
  return (
    <div className="row">
      {addonList &&
        addonList?.map((service, idx) => (
          <div className={"col-xl-4 col-md-6 px-10"} key={service?.serviceID}>
            <ServiceDetail
              service={service}
              handleCheckAddon={handleCheckAddon}
              roomActiveInfo={roomActiveInfo}
              setRoomActiveInfo={setRoomActiveInfo}
              indexRoom={indexRoom}
            />
          </div>
        ))}
    </div>
  );
};
export default Services;
