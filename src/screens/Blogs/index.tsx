import React from "react";
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/header/default-header";
import DefaultFooter from "@/components/footer/default";
import LocationTopBar from "@/components/common/LocationTopBar";
import Blog2 from "@/components/blog/Blog2";
import BlogSidebar from "@/components/blog/blog-sidebar";
import BlogPagination from "@/components/blog/BlogPagination";
import Header3 from "@/components/header/header-3";
import Footer2 from "@/components/footer/footer-2";

import MetaComponent from "@/components/common/MetaComponent";
import BannerBlogs from "@/components/blog/Banner";
import Destinations from "@/components/blog/Destinations";
import CategoryList from "@/components/blog/CategoryList";
import BlogList from "@/components/blog/BlogList";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const metadata = {
  title: "Blogs || Travel & Tour",
  description: "Travel & Tour",
};

const BlogListV2 = () => {
  const { loadingBlogs, listBlogs } = useSelector((state) => state.blogs);
  return (
    <div className="mt-100">
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End Header 1 */}

      {/* <LocationTopBar /> */}
      {/* End location top bar section */}

      <BannerBlogs />

      <section className="layout-pt-sm layout-pb-sm ">
        <div className="container">
          <div className="pt-20 relative ">
            <Destinations />
          </div>
        </div>
      </section>

      <section className="layout-pt-sm">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Bài viết nổi bật</h2>
              </div>
            </div>
          </div>
          <CategoryList />
        </div>
      </section>
      {/* End title */}

      <section className="layout-pt-sm layout-pb-sm">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-9">
              {loadingBlogs ? (
                <Skeleton count={5} />
              ) : listBlogs?.length > 0 ? (
                <>
                  <div className="row y-gap-30">
                    <BlogList />
                  </div>
                  <BlogPagination />
                </>
              ) : (
                <div className="text-center">Không có thông tin bài viết</div>
              )}
            </div>

            <div className="col-xl-3">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* <CallToActions /> */}
      {/* End Call To Actions Section */}

      {/* End Call To Actions Section */}
    </div>
  );
};

export default BlogListV2;
