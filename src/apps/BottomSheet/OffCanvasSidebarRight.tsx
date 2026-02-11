import OffCanvasComponent from "@/apps/OffCanvasComponent";
import React from "react";
import SidebarRight from "../SidebarRight";

const OffCanvasSidebarRight = () => {
  return (
    <OffCanvasComponent
      id="offcanvas-sibebar-right-cart"
      alignment="offcanvas-bottom"
      className="h-80vh"
      isShowHeader={false}
      classNameBody="p-0"
    >
      <SidebarRight isOffcanvas={true} />
    </OffCanvasComponent>
  );
};

export default OffCanvasSidebarRight;
