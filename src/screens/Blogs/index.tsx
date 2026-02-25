import React from "react";
import { useTranslation } from "react-i18next";
import BlogSidebar from "@/components/blog/blog-sidebar";
import BlogPagination from "@/components/blog/BlogPagination";

import MetaComponent from "@/components/common/MetaComponent";
import BannerBlogs from "@/components/blog/Banner";
import Destinations from "@/components/blog/Destinations";
import CategoryList from "@/components/blog/CategoryList";
import BlogList from "@/components/blog/BlogList";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { blogKeys } from "@/lib/query-keys";
import { getSearchBlogs } from "@/api/blogs.api";

const metadata = {
  title: "Blogs || Travel & Tour",
  description: "Travel & Tour",
};

const BlogListV2 = () => {
  const { t } = useTranslation();
  const { filter } = useSelector((state) => state.blogs);

  const { data: blogData, isLoading: loadingBlogs } = useQuery({
    queryKey: blogKeys.search(filter as any),
    queryFn: async () => {
      const res = await getSearchBlogs(filter as any);
      return {
        blogs: (res as any)?.data || [],
        totalPages: (res as any)?.totalPage || 0,
        totalRecords: (res as any)?.totalRecords || 0,
      };
    },
  });

  const listBlogs = blogData?.blogs ?? [];
  const totalPages = blogData?.totalPages ?? 0;

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
                <h2 className="sectionTitle__title">{t("COMMON.FEATURED_POSTS")}</h2>
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
                    <BlogList listBlogs={listBlogs} />
                  </div>
                  <BlogPagination totalPages={totalPages} />
                </>
              ) : (
                <div className="text-center">{t("COMMON.NO_POST_INFO")}</div>
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
