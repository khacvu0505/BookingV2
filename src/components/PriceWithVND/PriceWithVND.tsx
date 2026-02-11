import { formatCurrency } from "@/utils/utils";
import { useSelector } from "react-redux";
import { formatCurrencySendToServer } from "@/utils/utils";
import { current_currency } from "@/utils/constants";
import { getFromLocalStorage } from "@/utils/utils";

/**
 * Component hiển thị giá với helper text VND (nếu currency khác VND)
 * @param {number} price - Giá hiển thị theo currency hiện tại
 * @param {number} currencyRate - Tỷ giá (rate từ server)
 * @param {string} currencyCode - Mã currency hiện tại (VND, USD, etc.)
 * @param {string} className - Class CSS cho giá chính
 * @param {string} helperClassName - Class CSS cho helper text VND
 */
const PriceWithVND = ({ 
  price, 
  currencyRate = 1, 
  currencyCode = null,
  className = "", 
  helperClassName = "text-12 text-neutral-500 mt-4",
  showCurrency = true
}) => {
  const { currentCurrency } = useSelector((state) => state.app);
  
  // Lấy currency code từ localStorage nếu không được truyền vào
  const activeCurrencyCode = currencyCode || formatCurrencySendToServer(
    getFromLocalStorage(current_currency)?.value || "vn"
  );
  
  // Tính giá VND từ giá hiển thị
  // Server trả về currencyRate theo hướng: foreign -> VND (ví dụ USD->VND = 24000)
  // Nên để quy đổi sang VND cần nhân với rate
  const vndPrice = currencyRate && currencyRate !== 0 ? price * currencyRate : price;
  
  // Chỉ hiển thị helper text khi currency khác VND
  const shouldShowVNDHelper = activeCurrencyCode && activeCurrencyCode !== "VND" && currencyRate && currencyRate !== 1;
  
  return (
    <div className="d-inline-flex flex-column">
      <span className={className}>
        {formatCurrency(price)} {showCurrency && currentCurrency}
      </span>
      {shouldShowVNDHelper && (
        <span className={helperClassName}>
          ({formatCurrency(Math.round(vndPrice))} đ)
        </span>
      )}
    </div>
  );
};

export default PriceWithVND;

