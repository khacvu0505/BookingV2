import React from "react";
import LightGallery from "lightgallery/react";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

import "./ImageLibrary.style.scss";
import { getImageLibrary } from "@/api/hotel.api";
import { useQuery } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/query-keys";

interface GalleryProps {
  hotel: any;
}

function Gallery({ hotel }: GalleryProps) {
  const { data: images = [] } = useQuery({
    queryKey: hotelKeys.imageLibrary(hotel?.hotelCode),
    queryFn: async () => {
      const res = await getImageLibrary(hotel?.hotelCode);
      if (res?.success && res.data.length > 0) {
        return res.data.map((item: string, idx: number) => ({
          id: idx + 1,
          src: item,
          alt: `Image ${idx + 1}`,
        }));
      }
      return [];
    },
    enabled: !!hotel?.hotelCode,
  });

  return (
    <div className="App">
      <LightGallery
        thumbnail={true}
        plugins={[lgZoom, lgVideo]}
        mode="lg-fade"
        pager={false}
        galleryId={"nature"}
        autoplayFirstVideo={false}
        elementClassNames={"masonry-grid"}
        mobileSettings={{
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false,
        }}
      >
        {images.map((item) => (
          <a
            href={item.src}
            className={`grid-item grid-item-${item.id}`}
            key={item.id}
          >
            <img alt={item.alt} src={item.src} />
          </a>
        ))}
      </LightGallery>
    </div>
  );
}
export default Gallery;
