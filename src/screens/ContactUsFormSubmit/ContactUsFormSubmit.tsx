import React from "react";
import MetaComponent from "@/components/MetaComponent";

const metadata = {
  title: "Contact",
  description: "OKdimall - Travel & Tour",
};

const ContactUsFormSubmit = () => {
  <MetaComponent meta={metadata} />;

  return (
    <div className="mb-50">
      <section className="mt-100 md:mt-80">
        <div className="container">
          <p className="text-neutral-800 text-24 lg:text-20">
            Danh sách đánh giá, phản ánh, kiến nghị của Tổ chức xã hội
          </p>
          <p className="text-neutral-800 text-16  lg:text-14">
            Danh sách các đánh giá, phản ánh, kiến nghị của tổ chức xã hội tham
            gia bảo vệ quyền lợi người tiêu dùng hoặc tổ chức đánh giá tín nhiệm
            theo quy định của pháp luật
          </p>
          <a
            href="https://docs.google.com/spreadsheets/d/1UR15WAqqNiV5QXUp-MXDmQ6gpOz0IVaI5HUe1f2eJhY/edit?gid=0#gid=0"
            className="text-neutral-800 underline italic text-16"
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            Nhấp vào để xem
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUsFormSubmit;
