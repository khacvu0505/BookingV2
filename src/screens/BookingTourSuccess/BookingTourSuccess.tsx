import dynamic from "next/dynamic";
import BookingSuccessPage from "@/components/Booking/BookingSuccessPage/BookingSuccessPage";

const InvoiceComponent = dynamic(() => import("./invoice/Invoice"));

const BookingTourSuccess = () => {
  return (
    <BookingSuccessPage
      supplierType="Tour"
      InvoiceComponent={InvoiceComponent}
    />
  );
};

export default BookingTourSuccess;
