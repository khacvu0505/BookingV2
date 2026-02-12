import CallToActions from "@/components/common/CallToActions";
import Header3 from "@/components/header-variants/header-3";
import DefaultFooter from "@/components/footer/default";
import LocationTopBar from "@/components/common/LocationTopBar";
import RelatedBlog from "@/components/blog/blog-details/RelatedBlog";
import blogsData from "@/data/blogs";
import DetailsContent from "@/components/blog/blog-details/DetailsContent";
import FormReply from "@/components/blog/blog-details/FormReply";
import TopComment from "@/components/blog/blog-details/TopComment";
import BlogNavigator from "@/components/blog/blog-details/BlogNavigator";
import Comments from "@/components/blog/blog-details/Comments";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import { getBlogDetail } from "@/api/blog.api";
import { formatStringToDate } from "@/utils/utils";
import Footer2 from "@/components/footer/footer-2";
import { useTranslation } from "react-i18next";

const metadata = {
  title: "Blog Single || OKdimall - Travel & Tour",
  description: "OKdimall - Travel & Tour ",
};

const BlogSingleDynamic = () => {
  const { t } = useTranslation();
  let params = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const { slug } = params;
  const blog = blogsData[0];

  useEffect(() => {
    getBlogDetail(slug as string)
      .then((res) => {
        if (res.success) {
          setBlogDetail(res.data);
          return;
        }
        setBlogDetail(null);
      })
      .catch(() => {
        setBlogDetail(null);
      });
  }, []);

  if (!blogDetail) return null;

  return (
    <div className="mt-100">
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End Header 1 */}

      {/* <LocationTopBar /> */}
      {/* End location top bar section */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-40 justify-center text-center">
            <div className="col-auto">
              {/* <div className="text-15 fw-500 text-blue-1 mb-8 text-capitalize">
                {blog?.tag}
              </div> */}
              <h1 className="text-26 lg:text-24 md:text-20 fw-600">
                {blogDetail?.blogName}
              </h1>

              <div className="text-15 text-light-1 mt-10 d-flex align-items-center justify-content-center">
                <span className="mr-16">
                  <span className="icon-calendar mr-5"></span>
                  {formatStringToDate(blogDetail?.publishDate, true)}
                </span>

                <div className="d-flex align-items-center ml-10">
                  <span className="icon-eye fs-20 mr-5"></span>
                  <span className="fs-18">{blogDetail?.totalView}</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <img
                src={blogDetail?.thumbnailURL}
                alt="img-blog"
                className="col-12 rounded-8 w-100 img_large_details"
              />
            </div>
          </div>

          <div className="row y-gap-30 justify-center">
            <div className="col-xl-8 col-lg-10 layout-pt-md">
              <DetailsContent blogDetail={blogDetail} />
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  {t("NEWS.NEWS_RELATED")}
                </h2>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 pt-40">
            <RelatedBlog blogDetail={blogDetail} />
          </div>
        </div>
      </section>
      {/* End Related Content */}

      {/* <CallToActions /> */}
      {/* End Call To Actions Section */}

      {/* End Call To Actions Section */}
    </div>
  );
};

export default BlogSingleDynamic;
