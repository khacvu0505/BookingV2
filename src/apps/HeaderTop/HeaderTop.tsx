import React, { useState } from "react";
import giftIcon from "/images/home/gift-icon.png";
import okdimallLogo from "/images/home/okdimall_logo.png";
import ModalTopHeader from "./ModalTopHeader";
import { DisplayGiftInfo, displayPhoneInfo } from "./HeaderTop.config";
import SearchInput from "./SearchInput";
import OffCanvasHeaderSearch from "../OffCanvasHeaderSearch";

const HeaderTop = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleOpen = (type: string) => {
    setOpen(true);
    setType(type);
  };
  return (
    <div className=" header-banner bg-primary-50 py-12">
      <div className="container d-flex xxl:d-none justify-between items-center px-0">
        <div>
          <i
            className="ri-map-pin-2-fill text-white text-14 bg-primary-500 rounded-circle py-6 px-6 mr-4"
            aria-hidden="true"
          />
          <span className="text-14 text-neutral-800 fw-400">
            Nguyễn Lộ Trạch, Nha Trang, Khánh Hòa, Việt Nam
          </span>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center justify-center gap-1">
            {displayPhoneInfo()}
          </div>
          <div className="d-flex align-items-center justify-center">
            {DisplayGiftInfo()}
          </div>
        </div>

        <SearchInput />
      </div>

      {/* Mobile and Tablet */}
      <div className="d-none xxl:d-flex justify-between align-items-center container-mobile">
        <img
          src={okdimallLogo as any}
          alt="okdimall-logo"
          className="object-cover cursor-pointer"
          onClick={() => handleOpen("logo")}
        />
        <div className="d-flex align-items-center gap-3 ">
          <div>
            <img
              src={giftIcon as any}
              alt="gift-icon"
              className="object-cover cursor-pointer"
              onClick={() => handleOpen("gift")}
            />
          </div>

          <div className="cursor-pointer" onClick={() => handleOpen("phone")}>
            <i
              className="ri-phone-fill text-white text-14 bg-primary-500 rounded-circle py-6 px-6 mr-4"
              aria-hidden="true"
            />
          </div>
          <div
            className="cursor-pointer mt-5"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvas-header-search"
            data-bs-target="#offcanvas-header-search"
          >
            <i
              className="ri-search-line text-primary-500 text-20"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <ModalTopHeader
        open={open}
        handleClose={() => setOpen(false)}
        type={type}
      />
      <OffCanvasHeaderSearch />
    </div>
  );
};

export default HeaderTop;
