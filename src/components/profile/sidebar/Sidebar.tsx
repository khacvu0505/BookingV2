import { Link, useNavigate } from "react-router-dom";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./Sidebar.style.scss";
import classNames from "classnames";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarContent = useMemo(() => [
    {
      id: 1,
      icon: "/img/dashboard/sidebar/gear.svg",
      name: t("COMMON.PERSONAL_INFO"),
      routePath: "/profile/information",
      subRoute: [],
    },
    {
      id: 2,
      icon: "/img/dashboard/sidebar/booking.svg",
      name: t("COMMON.BOOKING_HISTORY"),
      routePath: "/profile/booking-history-hotel",
      subRoute: [
        {
          id: 1,
          name: t("COMMON.HOTEL"),
          url: "/profile/booking-history-hotel",
        },
        {
          id: 2,
          name: "Tour",
          url: "/profile/booking-history-tour",
        },
      ],
    },
    {
      id: 3,
      icon: "/img/dashboard/sidebar/bookmark.svg",
      name: t("COMMON.FAVORITES"),
      routePath: "/profile/wishlist",
      subRoute: [],
    },
  ], [t]);

  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => (
        <div className="sidebar__item" key={item.id}>
          <div>
            {item?.subRoute.length > 0 ? (
              <Menu
                className={classNames("menu-booking-history", {
                  active: [
                    "/profile/booking-history-hotel",
                    "/profile/booking-history-tour",
                  ].includes(pathname),
                })}
              >
                <SubMenu
                  label={
                    <div className="d-flex align-items-center menu-booking-history-item">
                      <img src={item.icon} alt="image" className="mr-15" />
                      {item.name}
                    </div>
                  }
                  open={[
                    "/profile/booking-history-hotel",
                    "/profile/booking-history-tour",
                  ].includes(pathname)}
                >
                  {item.subRoute.map((subItem) => (
                    <MenuItem
                      key={subItem.id}
                      onClick={() => navigate(subItem.url)}
                      className={
                        [pathname].includes(subItem.url)
                          ? "menu-active-link"
                          : ""
                      }
                    >
                      {subItem.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              </Menu>
            ) : (
              <div
                className={`${
                  isActiveLink(item.routePath, pathname) ? "-is-active" : ""
                } sidebar__button `}
              >
                <Link
                  to={item.routePath}
                  className="d-flex items-center text-15 lh-1 fw-500"
                >
                  <img src={item.icon} alt="image" className="mr-15" />
                  {item.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
