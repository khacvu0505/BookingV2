import AddonServicesPage from "@/components/AddonServicesPage/AddonServicesPage";
import AddonList from "./AddonList";

const AddonServicesTour = () => {
  return <AddonServicesPage supplierType="Tour" AddonListComponent={AddonList} />;
};

export default AddonServicesTour;
