import dynamic from "next/dynamic";
import BookingSuccessPage from "@/components/Booking/BookingSuccessPage/BookingSuccessPage";

const InvoiceComponent = dynamic(() => import("./invoice/Invoice"));

const BookingSuccess = () => {
  return (
    <BookingSuccessPage
      supplierType="Hotel"
      InvoiceComponent={InvoiceComponent}
    />
  );
};

export default BookingSuccess;
