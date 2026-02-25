import OffCanvasComponent from "@/components/OffCanvas/OffCanvasComponent";
import React from "react";
import SidebarRightTour from "@/components/Sidebar/SidebarRightTour";

const OffCanvasSidebarRightTour = () => {
  return (
    <OffCanvasComponent
      id="offcanvas-sibebar-right-tour-cart"
      alignment="offcanvas-bottom"
      className="h-80vh"
      isShowHeader={false}
      classNameBody="p-0"
    >
      <SidebarRightTour isOffcanvas={true} />
    </OffCanvasComponent>
  );
};

export default OffCanvasSidebarRightTour;
