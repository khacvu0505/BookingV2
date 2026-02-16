import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { addDate, formatDate } from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MainMenu = ({ style = "" }) => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
  const { pathname } = useLocation();
  const [isActiveParent] = useState(false);
  const regions = useSelector((state: any) => state.hotels.regions) || [];
  const defaultLocation = regions[0]?.id || "";

  const isHotelList = pathname === "/hotels/";
  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        {/* <li
          className={`${
            isActiveParentChaild(homeItems, pathname) ? "current" : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className="mr-10">Home</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <ul className="subnav">
            {homeItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}
        {/* End home page menu */}

        <li
          className={
            isActiveParent
              ? "menu-item-has-children -has-mega-menu current"
              : "menu-item-has-children -has-mega-menu"
          }
        >
          <a href="#">
            {/* <i className="icon icon-menu" /> */}
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"
                fill="#0D0D0D"
              />
            </svg>

            <span className="ml-10 fw-500">{t("COMMON.SERVICE_PACKAGE")}</span>
          </a>
          {/* <div className="mega">
            <CategoriesMegaMenu setIsActiveParent={setIsActiveParent} />
          </div> */}
        </li>
        {/* End categories menu items */}

        <li className={isHotelList ? "current" : ""}>
          <Link
            to={
              isHotelList
                ? `/hotels/?checkIn=${formatDate(
                    new Date()
                  )}&checkOut=${addDate(
                    new Date(),
                    3
                  )}&adults=2&children=0&room=1&location=${
                    params?.location || defaultLocation
                  }&page=1`
                : `/hotels/?checkIn=${formatDate(
                    new Date()
                  )}&checkOut=${addDate(
                    new Date(),
                    3
                  )}&adults=2&children=0&room=1&location=DN&page=1`
            }
          >
            <span className="fw-500">{t("HOME.HEADER/HOTELS")}</span>
          </Link>
        </li>
        {/* End Destinatinos single menu */}

        {/* <li
          className={`${
            isActiveParentChaild(blogItems, pathname) ? "current" : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className="mr-10">Blog</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <ul className="subnav">
            {blogItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}
        {/* End blogIems */}

        {/* <li
          className={`${
            isActiveParentChaild(pageItems, pathname) ? "current" : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className="mr-10">Pages</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <ul className="subnav">
            {pageItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}
        <li className={pathname.includes("tour") ? "current" : ""}>
          <Link to="/tour">
            <span className="fw-500">Tours</span>
          </Link>
        </li>
        {/* End pages items */}

        {/* <li
          className={`${
            pathname.split("/")[1] == "dashboard" ||
            pathname.split("/")[1] == "vendor-dashboard"
              ? "current"
              : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className="mr-10">Dashboard</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <ul className="subnav ">
            {dashboardItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, pathname) ? "current" : ""
                }
              >
                <Link to={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li> */}

        <li className={pathname === "/promotions" ? "current" : ""}>
          <Link to="/promotions">
            <span className="fw-500"> {t("HOME.HEADER/PROMOTIONS")}</span>
          </Link>
        </li>
        <li className={pathname === "/blogs" ? "current" : ""}>
          <Link to="/blogs">
            <span className="fw-500">{t("HOME.HEADER/NEWS")}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
