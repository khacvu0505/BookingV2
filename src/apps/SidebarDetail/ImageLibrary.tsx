import React, { useEffect, useState } from "react";
import LightGallery from "lightgallery/react";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

import "./ImageLibrary.style.scss";
import { getImageLibrary } from "@/api/hotel.api";

interface GalleryProps {
  hotel: any;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

function Gallery({ hotel }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImageLibrary(hotel?.hotelCode);
        if (data?.success) {
          if (data.data.length > 0) {
            const imgList = data.data.map((item: string, idx: number) => ({
              id: idx + 1,
              src: item,
              alt: `Image ${idx + 1}`,
            }));
            setImages(imgList);
          }
        } else {
          setImages([]);
        }
      } catch (error) {
        setImages([]);
      }
    };
    fetchData();
  }, []);

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
