import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addDate, formatDate } from "@/utils/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface MainMenuProps {
  style?: string;
}

const MainMenu = ({ style = "" }: MainMenuProps) => {
  const { t } = useTranslation();
  const [params] = useQueryParams();
  const { pathname } = useLocation();
  const { searchValue } = useSelector((state) => state.app);

  const isHotelList = pathname === "/hotels/";
  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <li className={pathname === "/" ? "current" : ""}>
          <Link to="/">
            <span className="fw-500">{t("HOME.HEADER/HOME")}</span>
          </Link>
        </li>
        <li className={isHotelList ? "current" : ""}>
          <Link
            to={`/hotels/?checkIn=${formatDate(new Date())}&checkOut=${addDate(
              new Date(),
              3
            )}&adults=2&children=0&room=1&location=${
              params?.location || searchValue?.location || "DN"
            }&page=1`}
          >
            <span className="fw-500">{t("HOME.HEADER/HOTELS")}</span>
          </Link>
        </li>

        <li className={pathname.includes("tour") ? "current" : ""}>
          <Link to="/tour">
            <span className="fw-500">{t("HOME.HEADER/TOURS")}</span>
          </Link>
        </li>
        <li className={pathname === "/destinations" ? "current" : ""}>
          <Link to="/destinations">
            <span className="fw-500">{t("HOME.HEADER/DESTINATIONS")}</span>
          </Link>
        </li>
        <li className={pathname === "/news" ? "current" : ""}>
          <Link to="/news">
            <span className="fw-500">{t("HOME.HEADER/NEWS")}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
