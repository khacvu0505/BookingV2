import Tag from "@/components/Tag";
import { useTabTitleHeader } from "@/utils/constants";
import React, { useState } from "react";
import Reviews from "@/components/Review/Review";
import Policies from "@/components/Sidebar/SidebarDetail/Policies";
import PropertyHighlights from "@/components/Sidebar/SidebarDetail/PropertyHighlights";
import ImageLibrary from "@/components/Sidebar/SidebarDetail/ImageLibrary";
import OffCanvasHotelDetailMobile from "./OffCanvasHotelDetailMobile";

interface TabHotelDetailProps {
  hotel: any;
  hotelPolicies: any;
}

interface TabChild {
  header: string;
  body: React.ReactNode;
}

const TabHotelDetail = ({ hotel, hotelPolicies }: TabHotelDetailProps) => {
  const [activeChild, setActiveChild] = useState<TabChild | undefined>();
  const tabTitleHeader = useTabTitleHeader();

  const handleTabClick = (item: string, index: number) => {
    switch (index) {
      case 0:
        setActiveChild({ header: item, body: <Reviews hotel={hotel} /> });
        break;
      case 1:
        setActiveChild({
          header: item,
          body: <Policies policies={hotelPolicies?.policies} />,
        });
        break;
      case 2:
        setActiveChild({
          header: item,
          body: <PropertyHighlights amenities={hotelPolicies?.amenities} />,
        });
        break;
      case 3:
        setActiveChild({
          header: item,
          body: <ImageLibrary hotel={hotel} />,
        });
        break;
      default:
        break;
    }
  };

  const attributesActive = {
    "data-bs-toggle": "offcanvas",
    "aria-controls": "offcanvas-hotel-detail",
    "data-bs-target": "#offcanvas-hotel-detail",
  };
  return (
    <div className="row">
      {tabTitleHeader?.map((item: string, index: number) => (
        <div className="col-auto mb-10" key={index}>
          <Tag
            className="w-100 text-center cursor-pointer border-0 text-neutral-800 fw-600"
            onClick={() => handleTabClick(item, index)}
            {...attributesActive}
          >
            {item}
          </Tag>
        </div>
      ))}
      <OffCanvasHotelDetailMobile
        header={<div className="text-20 fw-600">{activeChild?.header}</div>}
        body={activeChild?.body}
        hotel={hotel}
      />
    </div>
  );
};

export default TabHotelDetail;
