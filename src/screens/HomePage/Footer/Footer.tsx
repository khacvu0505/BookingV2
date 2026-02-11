import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import "./Footer.styles.scss";
import Condition from "./Condition";
import instagramIcon from "/images/home/instagram.png";
import facebookIcon from "/images/home/facebook.png";

const Footer = () => {
  return (
    <footer className="footer -type-1 text-white footerContainer">
      <div className="container xxl:container-mobile">
        <div className="py-50 xl:pt-40 xl:pb-32">
          <p className="text-40 xl:text-30 fw-700 text-white">OKDIMALL</p>
          <p className="text-24 xl:text-20 fw-400 text-white">
            CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ DU LỊCH OKDIMALL
          </p>
        </div>
        <div className="d-flex gap-2">
          <img src={instagramIcon as any} alt="instagram-icon" />
          <img src={facebookIcon as any} alt="facebook-icon" />
        </div>
        <div className="row mb-70 xl:mb-50">
          <div className="col-12 col-lg-6 mb-50 xl:mb-20">
            <ContactInfo />
          </div>
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12 col-lg-6">
                <Condition />
              </div>
              <div className="col-12 col-lg-6">
                <AppButton />
              </div>
            </div>
          </div>
        </div>

        <div className="py-30 xl:py-20  border-top-white-15">
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
