import React from "react";
import { useTranslation } from "react-i18next";
import WishlistComponent from "@/apps/wishlist";

const Wishlist = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-20 sm:px-10">
      <div className="row justify-between items-end lg:pb-40 md:pb-20 sm:pb-0">
        <div className="col-12 mb-24 lg:mb-10">
          <h1 className="text-24 lg:text-22 md:text-20 fw-600 text-neutral-800 mb-8">
            {t("PROFILE.WISHLIST_FAVORITE_TITLE")}
          </h1>
          <p className="text-14 fw-400 text-neutral-500">
            {t("PROFILE.WISHLIST_FAVORITE_DESC")}
          </p>
        </div>
      </div>
      <div>
        <WishlistComponent />
      </div>
    </div>
  );
};

export default Wishlist;
