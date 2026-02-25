import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

interface ReviewGalleryProps {
  commentImgs: string[];
}

const ReviewGallery = ({ commentImgs }: ReviewGalleryProps) => {
  return (
    <Gallery>
      <div className="row x-gap-30 y-gap-30 pt-20">
        {commentImgs?.map((img: string, i: number) => (
          <div className="col-auto" key={i}>
            <Item original={img} thumbnail={img} width={110} height={110}>
              {({ ref, open }: { ref: any; open: () => void }) => (
                <img
                  src={img}
                  ref={ref as React.Ref<HTMLImageElement>}
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
