import { Link } from "react-router-dom";
import footerDataContent from "../../../data/footerContent";

const FooterContent = () => {
  return (
    <>
      {footerDataContent.map((item) => (
        <div className="col-xl-4 col-lg-4 col-sm-6" key={item.id}>
          <h5 className="text-20 fw-500 mb-30">{item.title}</h5>
          <div className="d-flex y-gap-10 flex-column">
            {item.menuList.map((menu, i) => (
              <Link to={menu.routerPath} key={i}>
                {menu.name}
              </Link>
            ))}
          </div>
          <div className="mt-30 d-flex gap-3 align-items-center">
            {/* <div style={{ width: "120px" }}>
              <img
                src="/img/app/bo-cong-thuong-logo.webp"
                alt="image"
                className="rounded-4 w-100 object-cover"
                width={100}
                height={50}
              />
            </div> */}
            {/* <div style={{ width: "120px" }}>
              <img
                src="/img/app/da-dang-ki-log.png"
                alt="image"
                className="rounded-4 w-100 object-cover"
                width={100}
                height={50}
              />
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
