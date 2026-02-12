import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "@/utils/utils";

const BlogList = () => {
  const { listBlogs } = useSelector((state) => state.blogs);
  return (
    <>
      {listBlogs?.map((item) => (
        <Link
          to={`/blogs/${item.slug}`}
          className="blogCard -type-1 col-12"
          key={item.id}
        >
          <div className="row y-gap-15 items-center md:justify-center md:text-center">
            <div className="col-lg-4">
              <div className="blogCard__image rounded-4">
                <img
                  className="cover w-100 img-fluid h-250"
                  src={item?.thumbnailURL}
                  alt="image"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="text-15 text-light-1">
                <i className="icon-calendar text-12 text-light-1 mr-5" />
                {formatDate(new Date(item?.publishDate) || new Date())}
                <i className="icon-eye text-12 text-light-1 mr-5 ml-20" />
                {item?.totalView}
              </div>
              <h3 className="text-22 text-dark-1 mt-10 md:mt-5 text-truncate">
                {item.blogName}
              </h3>
              <div className="text-15 lh-16 text-light-1 mt-10 md:mt-5 text-truncate-3">
                {item.description}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default BlogList;
