import parse from "html-react-parser";
import RatingBox from "./RatingBox";

interface MapComponentProps {
  mapIFrame: string;
  hotel?: any;
}

const MapComponent = ({ mapIFrame, hotel }: MapComponentProps) => {
  return (
    <div className="relative">
      <div className="flex-center h-auto md:h-500 overflow-hidden">
        {mapIFrame && parse(mapIFrame)}
        <div className="absolute" style={{ bottom: "5%", right: "10%" }}>
          {hotel && <RatingBox hotel={hotel} />}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
