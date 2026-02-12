import React from "react";
import Modal from "../Modal";
import okdimallLogo from "/images/home/okdimall_logo.png";
import { DisplayGiftInfo, displayPhoneInfo } from "./HeaderTop.config";

interface ModalTopHeaderProps {
  open: boolean;
  handleClose: () => void;
  type: string;
}

const ModalTopHeader = ({ open, handleClose, type }: ModalTopHeaderProps) => {
  const renderModal = () => {
    switch (type) {
      case "logo":
        return (
          <>
            <img
              src={okdimallLogo.src}
              alt="okdimall-logo"
              className="object-cover cursor-pointer"
            />
            <span className="text-14 fw-400 text-neutral-800">
              OKdimall - Càng đi, Càng thích
            </span>
          </>
        );
      case "phone":
        return displayPhoneInfo();
      case "gift":
        return DisplayGiftInfo();

      default:
        break;
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-100 d-flex flex-column items-center gap-2">
        {renderModal()}
      </div>
    </Modal>
  );
};

export default ModalTopHeader;
