import { Link, useNavigate } from "react-router-dom";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/api/user.api";
import { reset, setProfile } from "@/features/app/appSlice";
import {
  clearAccessTokenFromLocalStorage,
  setProfile as saveProfileToLocalStorage,
} from "@/utils/auth";
import { logout } from "@/api/auth.api";
import isEmpty from "lodash/isEmpty";
import AuthenModal from "@/components/authen/AuthenModal";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import MainMenu from "./MainMenu";
import LanguageMegaMenu from "./LanguageMegaMenu";
import avatarDefault from "/images/home/avatar-default.png";
import { displayAuthenButton } from "./Header.config";
import MobileMenu from "./MobileMenu";
import { STEPS } from "../AuthenModal/AuthenModal";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, profile } = useSelector((state) => state.app) || {};
  const { fullName = "", thumb = "", firstName, lastName } = profile || {};

  const refSignInModal = useRef<any>(null);

  const [hideHeaderTop, setHigheHeaderTop] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const infoOptions = useMemo(
    () => [
      { id: 1, title: t("COMMON.MY_PROFILE"), link: "/profile/information" },
      {
        id: 2,
        title: t("HOME.HEADER/BOOKING"),
        link: "/profile/booking-history-hotel",
      },
      { id: 3, title: t("HOME.HEADER/LOGOUT"), link: "/logout" },
    ],
    [t]
  );

  const changeBackground = () => {
    // eslint-disable-next-line no-undef
    if (window.scrollY >= 15) {
      setHigheHeaderTop(true);
    } else {
      setHigheHeaderTop(false);
    }
  };

  const handleClickProfile = (link: string) => {
    if (link === "/logout") {
      logout()
        .then(() => {
          dispatch(reset());
          clearAccessTokenFromLocalStorage();
        })
        .catch(() => {
          handleRenderNoti("Dang xuat that bai", "error");
        });

      return;
    }
    navigate(link);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener("scroll", changeBackground);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile().then((data: any) => {
        dispatch(setProfile(data));
        saveProfileToLocalStorage(data);
      });
    }
  }, [dispatch, isAuthenticated]);

  const handleOpenAuthenModal = () => {
    refSignInModal.current.setIsVisible(true);
  };

  const handleOpenRegisterModal = () => {
    refSignInModal.current.setStep(STEPS.CHECK_EMAIL);

    refSignInModal.current.setIsVisible(true);
  };

  return (
    <>
      <header
        className={`header mt-65 md:mt-52 bg-white ${
          hideHeaderTop ? "is-sticky" : ""
        }`}
        style={{
          boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container xxl:container-mobile sm:px-20">
          <div className="row justify-between items-center pb-2 px-0">
            <div className="col-auto d-flex align-center px-0">
              <Link to="/" className="header-logo sm:mr-0">
                <Image
                  src="/img/general/logo-okdimall.svg"
                  alt="logo icon"
                  width={150}
                  height={40}
                  priority
                />
              </Link>

              <div className="header-menu">
                <div className="header-menu__content mt-8 d-block xxl:d-none">
                  <MainMenu />
                </div>
              </div>
            </div>

            <div className="col-auto sm:pl-0 px-0">
              <div className="d-flex items-center">
                <LanguageMegaMenu textClass="text-dark-1" />

                {isAuthenticated && (
                  <Link
                    to="/profile/wishlist"
                    className="d-inline-flex xxl:d-none"
                  >
                    <i className="pl-15 ri-heart-line text-20 text-primary-500"></i>
                  </Link>
                )}

                {isAuthenticated && !isEmpty(profile) ? (
                  <>
                    <p className="text-dark-1 ml-15 d-block xxl:d-none">
                      Hi, {firstName} {lastName}
                    </p>
                    <div className="dropdown js-dropdown js-amenities-active header-mobile-custom d-block xxl:d-none">
                      <div
                        className="dropdown__button d-flex items-center text-14 rounded-100 px-15 h-34 "
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="true"
                        aria-expanded="false"
                        data-bs-offset="0,10"
                      >
                        <img
                          src={thumb}
                          className="rounded-circle object-cover"
                          alt="avatar"
                          style={{ width: 50, height: 50 }}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
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
                                className={`d-block js-dropdown-link text-dark-1 fw-400`}
                                onClick={() => handleClickProfile(item.link)}
                              >
                                {item.title}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d-flex xxl:d-none align-items-center gap-2 ml-10">
                    {displayAuthenButton(
                      handleOpenAuthenModal,
                      handleOpenRegisterModal
                    )}
                  </div>
                )}

                {/* Mobile and Tablet */}
                <div className="d-none xxl:d-flex x-gap-20 items-center  text-dark-1">
                  <div className="d-flex items-center gap-3">
                    <img
                      src={
                        isAuthenticated && !isEmpty(profile)
                          ? thumb
                          : avatarDefault.src
                      }
                      className="rounded-circle ml-10 cursor-pointer"
                      alt="avatar"
                      style={{ width: 26, height: 26, objectFit: "contain" }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/img/general/logo-okdimall.svg";
                      }}
                      onClick={() =>
                        !isAuthenticated &&
                        isEmpty(profile) &&
                        navigate("/login")
                      }
                    />
                    <button
                      className="d-flex items-center ri-menu-line text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-end  mobile_menu-contnet"
                      tabIndex={-1}
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AuthenModal ref={refSignInModal} />
    </>
  );
};

export default Header;
