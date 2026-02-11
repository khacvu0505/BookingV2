import { Link } from "react-router-dom";
import blogsData from "../../data/blogs";
import { useEffect, useState } from "react";
import { getRecommendBlogs } from "@/api/blogs.api";
import { formatDate } from "@/utils/utils";
import Skeleton from "react-loading-skeleton";

const Blog4 = () => {
  const [recommendPost, setRecommendPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getRecommendBlogs()
      .then((res) => {
        if (res?.success) {
          setRecommendPost(res?.data);
        } else {
          setRecommendPost([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setRecommendPost([]);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Skeleton count={3} />;
  }
  return (
    <>
      {recommendPost?.map((item) => (
        <div
          className="col-lg-3 col-sm-6"
          key={item?.slug}
          data-aos="fade"
          data-aos-delay={50}
        >
          <Link
            to={`/blogs/${item.slug}`}
            className="blogCard -type-1 d-block "
          >
            <div className="blogCard__image">
              <div className="ratio ratio-1:1 rounded-4 rounded-8">
                <img
                  className="img-ratio js-lazy"
                  src={item?.thumbnailImageURL}
                  alt="image"
                />
              </div>
            </div>
            <div className="mt-20">
              <h4 className="text-dark-1 text-18 fw-500">{item?.blogName}</h4>
              <div className="text-light-1 text-15 lh-14 mt-5">
                <i className="icon-calendar text-12 text-light-1 mr-5" />
                {formatDate(new Date(item?.publishDate) || new Date())}
                <i className="icon-eye text-12 text-light-1 mr-5 ml-15" />
                {item?.totalView}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blog4;
