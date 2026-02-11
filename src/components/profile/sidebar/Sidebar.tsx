import { Link, useNavigate } from "react-router-dom";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./Sidebar.style.scss";
import classNames from "classnames";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarContent = [
    {
      id: 1,
      icon: "/img/dashboard/sidebar/gear.svg",
      name: "Thông tin cá nhân",
      routePath: "/profile/information",
      subRoute: [],
    },
    {
      id: 2,
      icon: "/img/dashboard/sidebar/booking.svg",
      name: "Lịch sử đặt chỗ",
      routePath: "/profile/booking-history-hotel",
      subRoute: [
        {
          id: 1,
          name: "Khách sạn",
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
      name: "Ưa thích",
      routePath: "/profile/wishlist",
      subRoute: [],
    },
  ];

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
