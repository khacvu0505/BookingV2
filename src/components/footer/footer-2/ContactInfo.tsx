const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Hotline",
      action: "tel:0886479456",
      text: "+84 886 479 456",
    },
    {
      id: 2,
      title: "Email",
      action: "mailto:info@okdimall.com",
      text: "info@okdimall.com",
    },
    {
      id: 3,
      title: "Tên công ty",
      text: "OKdimall Travel Co., Ltd",
    },
    {
      id: 4,
      title: "Địa chỉ",
      text: "3/2 Nguyễn Lộ Trạch, phường Nha Trang, tỉnh Khánh Hòa, Việt Nam",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-10" key={item.id}>
          <div className={"text-16 mt-10"}>{item.title}</div>
          <a href={item?.action} className="text-15 fw-500 text-white mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
