import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const SidebarProfile = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const sidebarData = useMemo(() => {
    return [
      {
        icon: "/images/Profile/info.png",
        title: t("COMMON.PERSONAL_INFORMATION"),
        url: "/profile/information",
        links: [
          { title: t("PROFILE.PROFILE"), href: "/profile/information" },
          {
            title: t("PROFILE.CHANGE_PASSWORD"),
            href: "/profile/change-password",
          },
        ],
      },
      {
        icon: "/images/Profile/booking-history.png",
        title: t("PROFILE.BOOKING_HISTORY"),
        url: "/profile/booking-history-hotel",
        links: [
          {
            title: t("COMMON.HOTEL"),
            href: "/profile/booking-history-hotel",
          },
          {
            title: t("COMMON.TOUR"),
            href: "/profile/booking-history-tour",
          },
        ],
      },
      {
        icon: "/images/Profile/wishlist.png",
        title: t("PROFILE.WISHLIST"),
        url: "/profile/wishlist",
        links: [],
      },
    ];
  }, [t]);

  return (
    <div className="sidebar -dashboard">
      {sidebarData.map((item, index) => (
        <div className="sidebar__item" key={index}>
          {item?.links?.length > 0 ? (
            <div className="accordion -db-sidebar js-accordion">
              <div className="accordion__item">
                <div
                  className="accordion__button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#sidebarItem${index}`}
                >
                  <div
                    className={classNames(
                      "sidebar__button col-12 d-flex items-center justify-between rounded-0",
                      {
                        "bg-primary-40 text-primary-500 border-left-primary-500-2":
                          item?.links?.length > 0
                            ? item?.links
                                ?.map((link) => link.href)
                                .includes(pathname)
                            : item?.url === pathname,
                      }
                    )}
                  >
                    <div className="d-flex items-center text-15 lh-1 fw-500">
                      <img src={item.icon} alt="image" className="mr-10" />
                      {item.title}
                    </div>
                    <div className="icon-chevron-sm-down text-7" />
                  </div>
                </div>
                <div
                  id={`sidebarItem${index}`}
                  className={classNames("collapse", {
                    show:
                      item?.links?.length > 0
                        ? item?.links
                            ?.map((link) => link.href)
                            .includes(pathname)
                        : item?.url === pathname,
                  })}
                  data-bs-parent="#vendorSidebarMenu"
                >
                  <ul className="list-disc pt-15 pb-5 pl-20">
                    {item.links.map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className={classNames("mb-14", {
                          "text-primary-500": link.href === pathname,
                        })}
                      >
                        <Link to={link?.href}>{link.title}</Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Link to={item?.url}>
              <p
                className={classNames(
                  "fw-400 text-14 text-neutral-800 pointer px-15 h-55 d-flex items-center",
                  {
                    "text-primary-500": item.url === pathname,
                  }
                )}
              >
                <img src={item.icon} alt="image" className="mr-10" />

                {item?.title}
              </p>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarProfile;
