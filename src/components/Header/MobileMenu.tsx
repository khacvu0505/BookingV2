import { useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { logout } from "@/api/auth.api";
import { reset } from "@/features/app/appSlice";
import { clearAccessTokenFromLocalStorage } from "@/utils/auth";
import { handleRenderNoti } from "@/utils/handleRenderNoti";
import okdimallLogo from "/images/home/okdimall_logo.png";
import classNames from "classnames";
import {
  displayAuthenButton,
  displayDestinationIcon,
  displayNewsIcon,
  displayTourIcon,
} from "./Header.config";
import avatarIcon from "/images/Profile/info.png";
import wishlistIcon from "/images/Profile/wishlist.png";
import historyListIcon from "/images/Profile/booking-history.png";
import "./Header.styles.scss";
import { useTranslation } from "react-i18next";
import { addDate, formatDate } from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";

const MobileMenu = () => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
  const { searchValue } = useSelector((state) => state.app);
  const regions = useSelector((state) => state.hotels.regions) || [];
  const defaultLocation = regions[0]?.id || "";
  const { isAuthenticated = false, profile } =
    useSelector((state) => state.app) || {};
  const { fullName = "", thumb = "" } = profile || {};

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    logout()
      .then(() => {
        dispatch(reset());
        clearAccessTokenFromLocalStorage();
        navigate("/");
      })
      .catch(() => {
        handleRenderNoti(t("COMMON.LOGOUT_FAILED"), "error");
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between pb-0">
        <img
          src={okdimallLogo .src}
          alt="okdimall-logo"
          className="object-cover cursor-pointer"
        />

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
      </div>
      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          <div data-bs-dismiss="offcanvas">
            <MenuItem
              onClick={() => navigate("/")}
              className={classNames("text-neutral-800 ", {
                "menu-active-link": pathname === "/",
              })}
            >
              <div className="d-flex items-center gap-3">
                <i className="ri-home-4-line text-20 text-neutral-800" />
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/HOME")}
                </span>
              </div>
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate(
                  `/hotels?checkIn=${formatDate(new Date())}&checkOut=${addDate(
                    new Date(),
                    3
                  )}&adults=2&children=0&room=1&location=${
                    params?.location || searchValue?.location || defaultLocation
                  }&page=1`
                )
              }
              className={pathname.includes("/hotels") ? "menu-active-link" : ""}
            >
              <div className="d-flex items-center gap-3">
                <i className="icon-bed text-20 text-neutral-800  " />
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/HOTELS")}
                </span>
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/tour")}
              className={pathname === "/tour" ? "menu-active-link" : ""}
            >
              <div className="d-flex items-center gap-3">
                {displayTourIcon(
                  pathname === "/tour"
                    ? "var(--color-primary-500)"
                    : "var(--color-neutral-800)"
                )}
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/TOURS")}
                </span>
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/destinations")}
              className={
                pathname.includes("/destinations") ? "menu-active-link" : ""
              }
            >
              <div className="d-flex items-center gap-3">
                {displayDestinationIcon(
                  pathname === "/destinations"
                    ? "var(--color-primary-500)"
                    : "var(--color-neutral-800)"
                )}
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/DESTINATIONS")}
                </span>
              </div>
            </MenuItem>
            {/* <MenuItem
              onClick={() => navigate("/flights-ticket")}
              className={
                pathname.includes("/flights-ticket") ? "menu-active-link" : ""
              }
            >
              <div className="d-flex items-center gap-3">
                {displayFlightTicketIcon(
                  pathname === "/flights-ticket"
                    ? "var(--color-primary-500)"
                    : "var(--color-neutral-800)"
                )}
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/FLIGHT_TICKET")}
                </span>
              </div>
            </MenuItem> */}
            {/* <MenuItem
              onClick={() => navigate("/promotions")}
              className={
                pathname.includes("/promotions") ? "menu-active-link" : ""
              }
            >
              <div className="d-flex items-center gap-3">
                {displayPromotionIcon(
                  pathname === "/promotions"
                    ? "var(--color-primary-500)"
                    : "var(--color-neutral-800)"
                )}
                <span>{t("HOME.HEADER/PROMOTIONS")}</span>
              </div>
            </MenuItem> */}
            <MenuItem
              onClick={() => navigate("/news")}
              className={pathname === "/news" ? "menu-active-link" : ""}
            >
              <div className="d-flex items-center gap-3">
                {displayNewsIcon(
                  pathname === "/news"
                    ? "var(--color-primary-500)"
                    : "var(--color-neutral-800)"
                )}
                <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                  {t("HOME.HEADER/NEWS")}
                </span>
              </div>
            </MenuItem>
          </div>

          {/* Personal information */}
          {isAuthenticated && !isEmpty(profile) ? (
            <>
              <p className="text-17 xl:text-16 lg:text-15 md:text-14 fw-500 text-neutral-400 px-20 py-15">
                {t("HOME.HEADER/PROFILE")}
              </p>
              <SubMenu
                label={
                  <div className="d-flex items-center gap-3">
                    <img
                      src={avatarIcon .src}
                      alt="avatar-icon"
                      className="object-cover text-20 lg:text-18"
                    />
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link":
                            pathname.includes("information") ||
                            pathname.includes("change-password"),
                        }
                      )}
                    >
                      {t("COMMON.PERSONAL_INFORMATION")}
                    </span>
                  </div>
                }
              >
                <div data-bs-dismiss="offcanvas">
                  <MenuItem onClick={() => navigate("/profile/information")}>
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link": pathname.includes("information"),
                        }
                      )}
                    >
                      {t("HOME.HEADER/FILE")}
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/profile/change-password")}
                  >
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link":
                            pathname.includes("change-password"),
                        }
                      )}
                    >
                      {t("PROFILE.CHANGE_PASSWORD")}
                    </span>
                  </MenuItem>
                </div>
              </SubMenu>

              <SubMenu
                label={
                  <div className="d-flex items-center gap-3">
                    <img
                      src={historyListIcon .src}
                      alt="avatar-icon"
                      className="object-cover text-20 lg:text-18"
                    />
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link":
                            pathname.includes("/booking-history"),
                        }
                      )}
                    >
                      {t("PROFILE.BOOKING_HISTORY")}
                    </span>
                  </div>
                }
              >
                <div data-bs-dismiss="offcanvas">
                  <MenuItem
                    onClick={() => navigate("/profile/booking-history-hotel")}
                  >
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link": pathname.includes(
                            "/booking-history-hotel"
                          ),
                        }
                      )}
                    >
                      {t("HOME.HEADER/HOTELS")}
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/profile/booking-history-tour")}
                  >
                    <span
                      className={classNames(
                        "text-17 xl:text-16 lg:text-15 md:text-14",
                        {
                          "menu-active-link": pathname.includes(
                            "/booking-history-tour"
                          ),
                        }
                      )}
                    >
                      {t("HOME.HEADER/TOURS")}
                    </span>
                  </MenuItem>
                </div>
              </SubMenu>
              <div data-bs-dismiss="offcanvas">
                <MenuItem onClick={() => navigate("/profile/wishlist")}>
                  <img
                    src={wishlistIcon .src}
                    alt="avatar-icon"
                    className="object-cover text-20 lg:text-18 mr-15"
                  />
                  <span
                    className={classNames(
                      "text-17 xl:text-16 lg:text-15 md:text-14",
                      {
                        "menu-active-link": pathname.includes("wishlist"),
                      }
                    )}
                  >
                    {t("HOME.HEADER/WISHLIST")}
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClickLogout}>
                  <img
                    src={avatarIcon .src}
                    alt="avatar-icon"
                    className="object-cover text-20 lg:text-18 mr-15"
                  />
                  <span className="text-17 xl:text-16 lg:text-15 md:text-14">
                    {t("HOME.HEADER/LOGOUT")}
                  </span>
                </MenuItem>
              </div>
            </>
          ) : (
            <div
              className="authenButtonMobile mt-20 d-flex flex-column items-center gap-3"
              data-bs-dismiss="offcanvas"
            >
              {displayAuthenButton(handleLogin, handleSignup)}
            </div>
          )}
        </Menu>
      </Sidebar>
    </>
  );
};

export default MobileMenu;
