import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MasterSearch.styles.scss";
import SearchContent from "./SearchContent";
import debounce from "lodash/debounce";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import {
  BREAKPOINT_LG,
  hotel_search_history,
  tour_search_history,
} from "@/utils/constants";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/utils";
import useWindowSize from "@/utils/useWindowSize";
import InputSearch from "./components/InputSearch";
import Input from "@/components/Form/Input";
import { setValueInputSearch } from "@/features/app/appSlice";
import { useTranslation } from "react-i18next";

interface LocationSearchProps {
  handleChangeValue: (value: Record<string, any>) => void;
  type?: string;
  isOffCanvas?: boolean;
}

const LocationSearch = ({ handleChangeValue, type, isOffCanvas = false }: LocationSearchProps) => {
  const { t } = useTranslation();
  const isDesktop = useWindowSize().width > BREAKPOINT_LG;
  const { search: params, pathname } = useLocation();
  const regions = useSelector((state) => state.hotels.regions) || [];
  const { valueInputSearch } = useSelector((state) => state.app);
  const [searchValueInput, setSearchValueInput] = useState(valueInputSearch);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isRemoveSearch, setIsRemoveSearch] = useState(true);
  const isHotelList = pathname === "/hotels/";

  useEffect(() => {
    if (!params || searchValueInput) return;
    const paramsObject = qs.parse(params);
    if (paramsObject?.location && isRemoveSearch) {
      const regionActive = regions.find(
        (item: any) => item.id === paramsObject.location
      );
      if (regionActive) {
        if (isHotelList) {
          dispatch(setValueInputSearch(regionActive?.name));
          handleChangeValue({
            location: regionActive?.id,
            locationName: regionActive?.name,
          });
        }
        setSelectedItem(regionActive);
      }
    }
  }, [params, regions, searchValueInput, isRemoveSearch]);

  // Default to first region when no location is selected
  useEffect(() => {
    if (regions.length > 0 && !selectedItem && !searchValueInput) {
      const firstRegion = regions[0];
      setSelectedItem(firstRegion);
      setSearchValueInput(firstRegion?.name);
      dispatch(setValueInputSearch(firstRegion?.name));
      handleChangeValue({
        location: firstRegion?.id,
        locationName: firstRegion?.name,
      });
    }
  }, [regions]);

  useEffect(() => {
    setSearchValueInput(valueInputSearch);
  }, [valueInputSearch]);

  const closeDropdown = () => {
    // eslint-disable-next-line no-undef
    const dropdown = document.querySelector(".dropdownMenuMasterSearch");
    if (dropdown) {
      dropdown.classList.remove("show");
    }
  };

  const openDropdown = () => {
    // eslint-disable-next-line no-undef
    const dropdown = document.querySelector(".dropdownMenuMasterSearch");
    if (!dropdown) return;
    dropdown.classList.add("show");
  };

  const handleOptionClick = (item: any) => {
    closeDropdown();
    setSearchValueInput(item.locationName);
    dispatch(setValueInputSearch(item.locationName));
    setSelectedItem(item);

    if (!item) return;

    switch (type) {
      case "hotel": {
        const listHotelSearchHistory =
          getFromLocalStorage(hotel_search_history) as any[] | null;

        const isExistHotel = listHotelSearchHistory?.some(
          (i: any) => i?.locationCode === item?.locationCode
        );
        const limitHotelSearchHistory = listHotelSearchHistory?.slice(0, 4);
        if (!isExistHotel) {
          setToLocalStorage(
            hotel_search_history,
            limitHotelSearchHistory
              ? [item, ...limitHotelSearchHistory]
              : [item]
          );
        }
        break;
      }

      case "tour": {
        const listTourSearchHistory = getFromLocalStorage(tour_search_history) as any[] | null;
        const isExistTour = listTourSearchHistory?.some(
          (i: any) => i?.locationCode === item?.locationCode
        );
        const limitTourSearchHistory = listTourSearchHistory?.slice(0, 3);
        if (!isExistTour) {
          setToLocalStorage(
            tour_search_history,
            limitTourSearchHistory ? [item, ...limitTourSearchHistory] : [item]
          );
        }

        break;
      }

      default:
        break;
    }
    switch (item?.type) {
      case 1:
        handleChangeValue({
          location: item?.locationCode,
          locationName: item?.locationName,
          slug: "",
        });
        break;
      case 2:
        handleChangeValue({
          location: item?.parentCode,
          slug: item?.locationCode,
          locationName: item?.locationName,
        });
        break;
      default:
        break;
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setValueInputSearch(value));
    }, 500),
    []
  );

  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValueInput(value);
    debouncedSearch(value); // Call the debounced handler
    openDropdown();
  };

  const handleClickInputSearch = () => {
    dispatch(setValueInputSearch(""));
    setSelectedItem(null);
    setSearchValueInput("");
    handleChangeValue({ location: "", slug: "", locationName: "" });
    setIsRemoveSearch(false);
  };

  const attributesActive = isDesktop
    ? {
        "data-bs-toggle": "dropdown",
        "data-bs-auto-close": "outside",
        "data-bs-offset": "0,22",
        "data-bs-display": "static",
      }
    : {
        "data-bs-toggle": "offcanvas",
        "aria-controls": "offcanvas-location-search",
        "data-bs-target": "#offcanvas-location-search",
      };

  return (
    <>
      <div className=" lg:px-0 js-form-dd js-liverSearch">
        {isOffCanvas ? (
          <>
            <Input
              placeholder="Tim kiem dia diem"
              value={searchValueInput}
              onChange={handleChangeInputSearch}
              onClick={handleClickInputSearch}
            />
            <div className="mt-15 lg:pt-6">
              <SearchContent
                regions={regions}
                handleOptionClick={handleOptionClick}
                selectedItem={selectedItem}
                searchValue={valueInputSearch}
                type={type}
              />
            </div>
          </>
        ) : (
          <>
            <div {...attributesActive}>
              <h4 className="text-18 xl:text-16 lg:text-14 fw-400 text-neutral-400">
                {t("HOME.LOCATION")}
              </h4>
              <InputSearch
                searchValue={searchValueInput}
                handleChangeInputSearch={handleChangeInputSearch}
                handleClickInputSearch={handleClickInputSearch}
                disabled={!isDesktop}
              />
            </div>
            <div
              className={`${
                isDesktop ? "" : "d-none"
              } shadow-2 dropdown-menu dropdownMenuMasterSearch w-100 max-h-500 overflow-scroll dropdownMenu`}
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
                <SearchContent
                  regions={regions}
                  handleOptionClick={handleOptionClick}
                  selectedItem={selectedItem}
                  searchValue={valueInputSearch}
                  type={type}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LocationSearch;
