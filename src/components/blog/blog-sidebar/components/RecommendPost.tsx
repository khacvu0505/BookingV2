import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecommendBlogs } from "@/api/blogs.api";
import { formatDate } from "@/utils/utils";

const RecommendPost = () => {
  const [listRecommend, setListRecommend] = useState([]);
  useEffect(() => {
    getRecommendBlogs()
      .then((res) => {
        if (res?.success) {
          setListRecommend(res?.data);
        } else {
          setListRecommend([]);
        }
      })
      .catch(() => {
        setListRecommend([]);
      });
  }, []);
  return (
    <>
      {listRecommend?.map((item) => (
        <div className="col-12" key={item?.slug}>
          <div className="d-flex items-center">
            <img
              className="size-65 rounded-8"
              src={item?.thumbnailImageURL}
              alt="image"
            />

            <div className="ml-15">
              <h5 className="text-15 lh-15 fw-500">
                <Link to={`/blogs/${item.slug}`}>{item?.blogName || ""}</Link>
              </h5>
              <div className="text-13 lh-1 mt-5">
                <i className="icon-calendar text-12 text-light-1 mr-5" />
                {formatDate(new Date(item?.publishDate) || new Date())}
                <i className="icon-eye text-12 text-light-1 mr-5 ml-15" />
                {item?.totalView}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecommendPost;
