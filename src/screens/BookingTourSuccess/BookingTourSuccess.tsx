import { lazy } from "react";
import BookingSuccessPage from "@/components/Booking/BookingSuccessPage/BookingSuccessPage";

const InvoiceComponent = lazy(() => import("./invoice/Invoice"));

const BookingTourSuccess = () => {
  return (
    <BookingSuccessPage
      supplierType="Tour"
      InvoiceComponent={InvoiceComponent}
    />
  );
};

export default BookingTourSuccess;
