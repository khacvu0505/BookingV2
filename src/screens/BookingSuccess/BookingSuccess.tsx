import { lazy } from "react";
import BookingSuccessPage from "@/components/BookingSuccessPage/BookingSuccessPage";

const InvoiceComponent = lazy(() => import("./invoice/Invoice"));

const BookingSuccess = () => {
  return (
    <BookingSuccessPage
      supplierType="Hotel"
      InvoiceComponent={InvoiceComponent}
    />
  );
};

export default BookingSuccess;
