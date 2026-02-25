import AddonServicesPage from "@/components/AddonServicesPage/AddonServicesPage";
import AddonList from "./AddonList";

const AddonServices = () => {
  return <AddonServicesPage supplierType="Hotel" AddonListComponent={AddonList} />;
};

export default AddonServices;
