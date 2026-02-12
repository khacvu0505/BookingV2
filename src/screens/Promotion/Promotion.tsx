import React, { useEffect, useRef, useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import PromotionBanner from "@/components/promotion/PromotonBanner/PromotionBanner";
import PromotionDetailModal from "@/components/promotion/PromotionDetailModal";
import {
  getPromotionList,
  getSupplierType,
  getVoucherCategory,
} from "@/api/promotion.api";
import useQueryParams from "@/hooks/useQueryParams";
import { cleanedObject } from "@/utils/utils";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { promotionKeys } from "@/lib/query-keys";

const metadata = {
  title: "Promotions || Travel & Tour",
  description: "Travel & Tour",
};

const Promotion = () => {
  const [params, setSearchParams] = useQueryParams();
  const navigate = useNavigate();
  const refModalDetail = useRef(null);
  const [selected, setSelected] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [supplierTypeSelected, setSupplierTypeSelected] = useState([]);
  const [voucherGroupSelected, setVoucherGroupSelected] = useState([]);

  const {
    page: pageParam,
    pageSize: pageSizeParam,
    supplierType: supplierTypeParam,
    voucherGroup: voucherGroupParam,
  } = params;

  const handleClickGetCode = (value) => {
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText(value?.voucherCode);
    setSelected(value);
    setIsVisible(true);
  };

  const handleClickDetail = (value) => {
    setSelected(value);
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      refModalDetail.current.setIsVisible(true);
    }, 300);
    setIsVisible(false);
  };

  const handleClickFilterSupplierType = (value) => {
    const isExisted = supplierTypeSelected.includes(value);
    const data = isExisted
      ? [...supplierTypeSelected].filter((item) => item !== value)
      : [...supplierTypeSelected, value];

    setSupplierTypeSelected(data);
    if (data?.length > 0) {
      setSearchParams({
        ...params,
        supplierType: data.join(","),
      });
    } else {
      setSearchParams(
        cleanedObject({
          ...params,
          supplierType: "",
        })
      );
    }
  };

  const handleClickFilterVoucherGroup = (value) => {
    const isExisted = voucherGroupSelected.includes(value);
    const data = isExisted
      ? [...voucherGroupSelected].filter((item) => item !== value)
      : [...voucherGroupSelected, value];

    setVoucherGroupSelected(data);
    if (data?.length > 0) {
      setSearchParams({
        ...params,
        voucherGroup: data.join(","),
      });
    } else {
      setSearchParams(
        cleanedObject({
          ...params,
          voucherGroup: "",
        })
      );
    }
  };

  const { data: supplierList = [] } = useQuery({
    queryKey: promotionKeys.supplierTypes(),
    queryFn: async () => {
      const res = await getSupplierType();
      return res?.data || [];
    },
  });

  const { data: voucherCategoryList = [] } = useQuery({
    queryKey: promotionKeys.voucherCategories(),
    queryFn: async () => {
      const res = await getVoucherCategory();
      return res?.data || [];
    },
  });

  const promotionQueryParams = {
    Page: Number(pageParam) || 1,
    PageSize: Number(pageSizeParam) || 10,
    SupplierType: supplierTypeParam || "",
    VoucherGroup: voucherGroupParam || "",
  };

  const { data: promotionData, isLoading } = useQuery({
    queryKey: promotionKeys.list(promotionQueryParams),
    queryFn: async () => {
      const res = await getPromotionList({
        Page: promotionQueryParams.Page,
        PageSize: promotionQueryParams.PageSize,
        "Entity.SupplierType": promotionQueryParams.SupplierType,
        "Entity.VoucherGroup": promotionQueryParams.VoucherGroup,
      });
      if (res?.success) {
        return { list: res.data, totalPage: res.totalPage || 0 };
      }
      return { list: [], totalPage: 0 };
    },
  });

  const promotionList = promotionData?.list || [];
  const totalPage = promotionData?.totalPage || 0;

  useEffect(() => {
    let defaultParams = {
      ...params,
    };
    if (!pageParam) {
      defaultParams = { ...defaultParams, page: 1 };
    }
    if (!pageSizeParam) {
      defaultParams = { ...defaultParams, pageSize: 10 };
    }
    if (!supplierTypeParam) {
      defaultParams = { ...defaultParams, supplierType: "" };
    }
    if (!voucherGroupParam) {
      defaultParams = { ...defaultParams, voucherGroup: "" };
    }

    setSearchParams(cleanedObject(defaultParams));
  }, []);

  useEffect(() => {
    if (supplierTypeParam) {
      setSupplierTypeSelected(supplierTypeParam.split(","));
    } else {
      setSupplierTypeSelected([]);
    }
    if (voucherGroupParam) {
      setVoucherGroupSelected(voucherGroupParam.split(","));
    } else {
      setVoucherGroupSelected([]);
    }
  }, [supplierTypeParam, voucherGroupParam]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-100">
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>

      <PromotionBanner />
      <section className="layout-pt-sm layout-pb-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sectionTitle -md">
                <p className="text-dark fw-500">Sản phẩm áp dụng được</p>
                {supplierList.map((item, idx) => (
                  <div className="form-checkbox d-flex items-center" key={idx}>
                    <input
                      type="checkbox"
                      checked={supplierTypeSelected.includes(item.value)}
                      onChange={() => handleClickFilterSupplierType(item.value)}
                    />
                    <div className="form-checkbox__mark">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                    <div className="text-15 ml-10">{item.text}</div>
                  </div>
                ))}
              </div>
              <div className="sectionTitle -md mt-10">
                <p className="text-dark fw-500">Ưu đãi</p>
                {voucherCategoryList.map((item, idx) => (
                  <div className="form-checkbox d-flex items-center" key={idx}>
                    <input
                      type="checkbox"
                      checked={voucherGroupSelected.includes(item.value)}
                      onChange={() => handleClickFilterVoucherGroup(item.value)}
                    />
                    <div className="form-checkbox__mark">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                    <div className="text-15 ml-10">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              {isLoading ? (
                <Skeleton count={10} />
              ) : (
                <div>
                  {promotionList.length > 0 && (
                    <>
                      <div className="d-flex gap-2 cursor-pointer flex-wrap promotion_list">
                        {promotionList.map((item, idx) => (
                          <div className="card promotion_item" key={idx}>
                            <img
                              src={item.thumbnailURL}
                              className="card-img-top"
                              alt="promotion"
                              onClick={() => handleClickDetail(item)}
                            />
                            <div className="card-body">
                              <h5
                                className="card-title text-truncate-2 promotion_item_title"
                                onClick={() => handleClickDetail(item)}
                              >
                                {item.voucherName}
                              </h5>
                              <p className="card-text text-truncate">
                                {item.description}
                              </p>
                              <button
                                className="button py-10 px-2 -dark-1 bg-blue-1 text-white w-100 mt-20"
                                onClick={() => handleClickGetCode(item)}
                              >
                                {selected?.voucherCode === item.voucherCode &&
                                isVisible
                                  ? "Đã sao chép"
                                  : "Lấy mã"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Pagination totalPage={totalPage || 0} />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <PromotionDetailModal ref={refModalDetail} selected={selected} />
    </div>
  );
};

export default Promotion;
