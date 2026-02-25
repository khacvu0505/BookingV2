import Social2 from "@/components/common/social/Social2";
import { sanitizeHtml } from "@/utils/sanitize";

const DetailsContent = ({ blogDetail }) => {
  const { content = "" } = blogDetail || {};
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(content),
        }}
      />
      <div className="row y-gap-20 justify-between pt-30">
        <div className="col-auto">
          <div className="d-flex items-center">
            <div className="fw-500 mr-10">Share</div>
            <div className="d-flex items-center">
              <Social2 />
            </div>
          </div>
        </div>
        {/* End social share */}

        <div className="col-auto">
          <div className="row x-gap-10 y-gap-10">
            <div className="col-auto">
              <div className="button -blue-1 py-5 px-20 bg-blue-1-05 rounded-100 text-15 fw-500 text-blue-1 text-capitalize">
                Social
              </div>
            </div>
          </div>
        </div>
        {/* End tags */}
      </div>
    </>
  );
};

export default DetailsContent;
