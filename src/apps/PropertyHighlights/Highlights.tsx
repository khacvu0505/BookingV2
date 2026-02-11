import highLight1 from "/images/HotelDetail/highlight-1.png";
import highLight2 from "/images/HotelDetail/highlight-2.png";
import highLight3 from "/images/HotelDetail/highlight-3.png";
import highLight4 from "/images/HotelDetail/highlight-4.png";
import "./Highlights.style.scss";

interface HightlightsProps {
  propertyHighlights: any[];
}

const Hightlights = ({ propertyHighlights }: HightlightsProps) => {
  const icons = [highLight1, highLight2, highLight3, highLight4];
  return (
    <div className="highlightContainer">
      <div className="row y-gap-20 pt-30 ">
        {propertyHighlights?.map((item: any, index: number) => (
          <div className="col-lg-3 col-6 " key={index}>
            <div className="text-center">
              {item?.icon ? (
                <img
                  src={item.icon}
                  alt="OKdimall hotel icon"
                  className="iconHighlight"
                />
              ) : (
                <img
                  src={icons[index] as any}
                  alt="icon-highlight"
                  className="iconHighlight"
                />
              )}
              <div className="text-18 xl:text-16 lg:text-15 md:text-14 fw-400 lh-16 mt-10 text-neutral-500">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hightlights;
