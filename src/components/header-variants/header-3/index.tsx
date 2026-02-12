import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MainMenu from "../MainMenu";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import HeaderSearch from "../HeaderSearch";
import MobileMenu from "../MobileMenu";
import HotPlaces from "../HotPlaces";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/api/user.api";
import { reset, setProfile } from "@/features/app/appSlice";
import {
  clearAccessTokenFromLocalStorage,
  setProfile as saveProfileToLocalStorage,
} from "@/utils/auth";
import { logout } from "@/api/auth.api";
import { toast } from "react-toastify";
import isEmpty from "lodash/isEmpty";
import AuthenModal from "@/components/authen/AuthenModal";
import useWindowSize from "@/utils/useWindowSize";
import { handleRenderNoti } from "@/utils/handleRenderNoti";

const infoOptions = [
  { id: 1, title: "Hồ sơ của tôi", link: "/profile/information" },
  { id: 2, title: "Đơn đặt chỗ", link: "/profile/booking-history-hotel" },
  { id: 3, title: "Đăng xuất", link: "/logout" },
];

const Header1 = (props, ref) => {
  const { isAuthenticated, profile } = useSelector((state) => state.app) || {};
  const { fullName = "", thumb = "" } = profile || {};

  const isDesktop = useWindowSize().width > 768;

  const refSignInModal = useRef(null);

  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeBackground = () => {
    // eslint-disable-next-line no-undef
    if (window.scrollY >= 10) {
      setNavbar(true);
      return;
    }
    // eslint-disable-next-line no-undef
    if (window.innerWidth >= 1200) {
      setNavbar(false);
    }
  };

  const reSizeBg = () => {
    // eslint-disable-next-line no-undef
    if (window.innerWidth < 1200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleClickProfile = (link) => {
    if (link === "/logout") {
      logout()
        .then(() => {
          dispatch(reset());
          clearAccessTokenFromLocalStorage();
          // navigate("/");
        })
        .catch(() => {
          handleRenderNoti("Đăng xuất thất bại", "error");
        });

      return;
    }
    navigate(link);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", changeBackground);
    // eslint-disable-next-line no-undef
    window.addEventListener("resize", reSizeBg);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("scroll", changeBackground);
      // eslint-disable-next-line no-undef
      window.removeEventListener("resize", reSizeBg);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setNavbar(false);
      return;
    }
    setNavbar(true);
  }, [isDesktop]);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile().then((data: any) => {
        dispatch(setProfile(data));
        saveProfileToLocalStorage(data);
      });
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <header
        className={`header bg-white ${
          navbar ? "is-sticky" : "h-large p-large"
        }`}
      >
        <div className="header__container sm:px-20">
          <div className="row justify-content-around items-center pb-2 px-30 sm:px-0">
            <div className="col-auto sm:px-0">
              <div className="d-flex items-center">
                {/* {isDesktop ? (
                  <span className="text-11 fw-500 border-blue-1 rounded-22 px-10 py-5">
                    PHIÊN BẢN DEMO
                  </span>
                ) : (
                  <span className="text-11 fw-500  text-blue-1">DEMO</span>
                )} */}
                <Link to="/" className="header-logo sm:mr-0 mr-20">
                  <img src="/img/general/logo-okdimall.svg" alt="logo icon" />
                </Link>
                {/* End logo */}

                <HeaderSearch />

                {!navbar && <HotPlaces />}

                {navbar && (
                  <div className="header-menu">
                    <div className="header-menu__content">
                      <MainMenu style="text-dark-1" />
                    </div>
                  </div>
                )}

                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto sm:pl-0">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* <CurrenctyMegaMenu textClass="text-dark-1" /> */}
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}

                  <LanguageMegaMenu textClass="text-dark-1" />
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}
                {isAuthenticated && (
                  <Link
                    to="/profile/booking-history-hotel"
                    className="d-inline-flex"
                  >
                    <i className="pl-20 icon-clock text-18 fw-bold"></i>
                  </Link>
                )}

                {/* Heart icon */}
                {isAuthenticated && (
                  <Link to="/profile/wishlist" className="d-inline-flex">
                    <i className="pl-20 icon-heart text-18 fw-bold"></i>
                  </Link>
                )}

                {isAuthenticated && !isEmpty(profile) ? (
                  <>
                    <p className="text-dark-1 ml-15">Hi, {fullName}</p>
                    <div className="dropdown js-dropdown js-amenities-active header-mobile-custom">
                      <div
                        className="dropdown__button d-flex items-center text-14 rounded-100 px-15 h-34 "
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="true"
                        aria-expanded="false"
                        data-bs-offset="0,10"
                      >
                        <img
                          // src="/img/general/logo-okdimall.svg"
                          src={thumb}
                          className="rounded-circle"
                          alt="avatar"
                          style={{ width: 50, height: 50 }}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              "/img/general/logo-okdimall.svg";
                          }}
                        />
                      </div>

                      <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
                        <div className="text-15 y-gap-15 js-dropdown-list">
                          {infoOptions.map((item) => (
                            <div key={item.id}>
                              <button
                                className={`d-block js-dropdown-link text-dark-1`}
                                onClick={() => handleClickProfile(item.link)}
                                style={{ fontWeight: 400 }}
                              >
                                {item.title}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* End dropdown-menu */}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Start btn-group */}

                    <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none cursor-pointer">
                      <div
                        // to="/login"
                        onClick={() =>
                          refSignInModal.current.setIsVisible(true)
                        }
                        className="button px-30 fw-400 text-14 -blue-1 -blue-1-05  h-50"
                      >
                        Đăng nhập
                      </div>
                    </div>
                  </>
                )}

                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-dark-1">
                  {/* <div>
                    <Link
                      to="/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div> */}
                  <div>
                    <div className="d-flex">
                      {!isAuthenticated && (
                        <div
                          onClick={() =>
                            refSignInModal.current.setIsVisible(true)
                          }
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"
                              fill="#0D0D0D"
                            />
                          </svg>
                        </div>
                      )}

                      <button
                        className="d-flex items-center icon-menu text-inherit text-20 ml-15 cursor-pointer"
                        data-bs-toggle="offcanvas"
                        aria-controls="mobile-sidebar_menu"
                        data-bs-target="#mobile-sidebar_menu"
                      ></button>
                    </div>
                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex={-1}
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {!navbar && (
            <div className="sub-menu xl:d-none">
              <div className="sub-menu__content">
                <div className="header-menu ">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      <AuthenModal ref={refSignInModal} />

      {/* End Header */}
    </>
  );
};

export default Header1;
