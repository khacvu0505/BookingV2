import { getPolicyBySupplier } from "@/api/booking.api";
import Button from "@/components/Button";
import { groupBy } from "@/utils/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface PolicyProps {
  bookingDetail: any;
  isTour?: boolean;
}

export interface PolicyHandle {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const Policy = ({ bookingDetail, isTour = false }: PolicyProps, ref: React.Ref<PolicyHandle>) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      isVisible,
      setIsVisible,
    }),
    [isVisible]
  );

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible || !bookingDetail?.supplierCode) return;
    const fetchData = async () => {
      const res = await getPolicyBySupplier(bookingDetail?.supplierCode);
      if (res?.success) {
        setData(res.data);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, [isVisible, bookingDetail]);

  return (
    <div
      className={`currencyMenu js-currencyMenu ${isVisible ? "" : "is-hidden"}`}
    >
      <div className="currencyMenu__bg" onClick={handleCloseModal}></div>
      <div
        className="currencyMenu__content bg-white rounded-4 modal-custom-size1"
        style={{
          top: "5%",
        }}
      >
        <div className="d-flex justify-content-between py-10">
          <p className="text-20 fw-700 text-neutral-800 pl-20">
            {t("COMMON.POLICY_OF")} {isTour ? "tour" : t("COMMON.HOTEL")}
          </p>
          <div className="text-right pr-10">
            <button className="pointer" onClick={handleCloseModal}>
              <i className="icon-close" />
            </button>
          </div>
        </div>
        <div className="px-30 overflow-y-scroll max-h-450">
          {data?.length > 0 &&
            data.map((item: any, idx: number) => (
              <div key={idx} className="mb-10">
                <p className="text-neutral-800">{item.value}</p>
                <p className="text-14">{item.text}</p>
              </div>
            ))}
        </div>
        <div className="border-top-light pb-20">
          <div className="d-flex justify-content-end mr-30 mt-20">
            <Button onClick={handleCloseModal} isOutline className="px-40">
              {t("COMMON.CLOSE")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef<PolicyHandle, PolicyProps>(Policy);
