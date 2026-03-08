import { getBlogRelated } from "@/api/blog.api";
import { useQuery } from "@tanstack/react-query";
import { formatStringToDate } from "@/utils/utils";

const RelatedBlog = ({ blogDetail }) => {
  const { data: blogRelated = [] } = useQuery({
    queryKey: ["blogRelated", blogDetail?.id],
    queryFn: async () => {
      const res = await getBlogRelated({
        RegionID: blogDetail?.regionID,
        CateID: blogDetail?.cateID,
        id: blogDetail?.id,
      });
      return res?.success ? res.data : [];
    },
    enabled: !!blogDetail,
  });

  if (blogRelated?.length === 0) return null;

  return (
    <>
      {blogRelated.map((item, index) => (
        <div className="col-lg-4 col-sm-6 rounded" key={index}>
          <a
            href={`/news/${item?.slug}`}
            className="blogCard -type-2 d-block bg-white rounded-4 shadow-4"
          >
            <div className="blogCard__image">
              <div className="rounded-4">
                <img
                  className="cover w-100 img-fluid"
                  src={item?.thumbnailImageURL}
                  alt="image"
                />
              </div>
            </div>
            <div className="px-20 py-20">
              <h4 className="text-dark-1 text-18 fw-500">{item?.blogName}</h4>
              <div className="text-15 text-light-1 mt-10 d-flex align-items-center">
                <span className="mr-16">
                  <span className="icon-calendar mr-5"></span>
                  {formatStringToDate(item?.publishDate, true)}
                </span>

                <div className="d-flex align-items-center ml-10">
                  <span className="icon-eye fs-20 mr-5"></span>
                  <span className="fs-18">{item?.totalView}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default RelatedBlog;
