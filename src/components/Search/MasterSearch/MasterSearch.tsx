import { useEffect, useState } from "react";
import classNames from "classnames";
import { Tabs } from "@/components/Tabs";
import "./MasterSearch.styles.scss";
import SearchBar from "./SearchBar/SearchBar";
import useQueryParams from "@/hooks/useQueryParams";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MasterSearchProps {
  showTab?: boolean;
}

const MasterSearch = ({ showTab = true }: MasterSearchProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const [searchParams, setSearchParams] = useQueryParams();

  const getTabItems = (activeTab: number) => [
    {
      key: 1,
      label: t("HOME.TABS/HOTELS"),
      icon: "icon-bed",
      children: <SearchBar activeTab={activeTab} showTab={true} type="hotel" />,
    },
    {
      key: 2,
      label: t("HOME.TABS/TOURS"),
      icon: "icon-destination",
      children: <SearchBar activeTab={activeTab} showTab={true} type="tour" />,
    },
  ];

  useEffect(() => {
    if (location?.pathname === "/")
      setSearchParams({
        ...searchParams,
        type: activeTab === 1 ? "hotel" : "tour",
      });
  }, [activeTab, location?.pathname]);

  return (
    <>
      <div className={classNames("masterSearch is-in-view")}>
        {showTab ? (
          <Tabs
            defaultActiveKey={1 as any}
            onChange={(value: any) => {
              setActiveTab(value);
            }}
            items={getTabItems(activeTab) as any}
            className="bg-white tabCustom"
          />
        ) : (
          <SearchBar activeTab={activeTab} showTab={showTab} type="hotel" />
        )}
      </div>
    </>
  );
};

export default MasterSearch;
