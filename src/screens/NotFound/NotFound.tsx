import NotFound from "@/components/common/NotFound";

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
