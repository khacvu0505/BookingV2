import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/header/default-header";
import Header3 from "@/components/header/header-3";

import DefaultFooter from "@/components/footer/default";
import NotFound from "@/components/common/NotFound";
import Footer2 from "@/components/footer/footer-2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "404 || Du lịch và trải nghiệm",
  description: "OKdimall - Du lịch và trải nghiệm",
};

const NotFoundPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
