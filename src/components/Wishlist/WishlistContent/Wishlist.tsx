import React, { useEffect, useState } from "react";

import {
  getCategoryTypeFavourite,
  getFavouriteList,
  removeFavourite,
} from "@/api/user.api";
import useQueryParams from "@/hooks/useQueryParams";
import { useTranslation } from "react-i18next";
import WishlistItem from "@/components/Wishlist/WishlistItemComponent";
import Pagination from "@/components/Pagination";

const Wishlist = () => {
  const { t } = useTranslation();
  const [params, setSearchParams] = useQueryParams();
  const { page: pageParam = 1, type = "Hotel" } = params;

  const [category, setCategory] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading] = useState(false);

  const handleTabClick = (tab: string) => {
    setSearchParams({ ...params, type: tab, page: 1 });
  };

  const handleRemoveFavourite = (wishlistId: string) => {
    removeFavourite(wishlistId).then(() => {
      setFavourites(
        favourites.filter((item: any) => item.wishListID !== wishlistId)
      );
    });
  };

  useEffect(() => {
    getCategoryTypeFavourite()
      .then((res) => {
        if (res.success) {
          setCategory(res.data);
        } else {
          setCategory([]);
        }
      })
      .catch((err) => {
        setCategory([]);
      });
  }, []);

  useEffect(() => {
    getFavouriteList({
      page: Number(pageParam),
      pageSize: 10,
      entity: {
        supplierType: type,
      },
    })
      .then((res) => {
        if (res.success) {
          setFavourites(res.data);
          setTotalPage(res?.totalPage || 0);
        } else {
          setFavourites([]);
        }
      })
      .catch((err) => {
        setFavourites([]);
      });
  }, [pageParam, type]);

  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {category?.slice(0, 2)?.map((item: any, index: number) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-14 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  type === item?.value ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(item?.value)}
              >
                {item?.text}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="mt-16 lg:mt-10 d-flex items-center justify-content-between md:flex-column md:items-start">
          <p className="text-16 lg:text-15 md:text-14 text-neutral-500 fw-500">
            {t("COMMON.LIST")}
          </p>
          {/* <div className="w-40 md:w-1/1">
            <Input
              name="search"
              onChange={handleChangeValue}
              value={search}
              placeholder="Nhập thông tin tìm kiếm"
              prefix={
                <img src="/images/Profile/icon-search.png" alt="icon-search" />
              }
            />
          </div> */}
        </div>

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="row y-gap-20 md:px-10">
              {favourites.length > 0 ? (
                <WishlistItem
                  favourites={favourites}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
              ) : (
                <p className="text-neutral-800 text-16 lg:text-15 md:text-14 text-center">
                  {t("COMMON.NOT_FOUND_INFORMATION")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
      <Pagination totalPage={totalPage} />
    </>
  );
};

export default Wishlist;
