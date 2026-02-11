import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const ReviewGallery = ({ commentImgs }: { commentImgs: any }) => {
  return (
    <Gallery>
      <div className="row x-gap-30 y-gap-30 pt-20">
        {commentImgs?.map((img, i) => (
          <div className="col-auto" key={i}>
            <Item original={img} thumbnail={img} width={110} height={110}>
              {({ ref, open }) => (
                <img
                  src={img}
                  ref={ref as any}
                  onClick={open}
                  alt="image"
                  role="button"
                  className="rounded-22 object-cover h-110"
                  width={110}
                  height={110}
                />
              )}
            </Item>
          </div>
        ))}
      </div>
    </Gallery>
  );
};

export default ReviewGallery;
