import React, { useMemo, useState } from "react";

interface TabItem {
  key: string;
  label: string;
  icon?: string;
  children?: React.ReactNode;
}

interface TabsProps {
  onChange: (key: string) => void;
  defaultActiveKey: string;
  items: TabItem[];
  className?: string;
}

export const Tabs = ({ onChange, defaultActiveKey, items, className }: TabsProps) => {
  const [tabActive, setTabActive] = useState(defaultActiveKey);

  const renderTabActive = useMemo(() => {
    const itemActive = items.find((item: TabItem) => item.key === tabActive);
    return itemActive?.children;
  }, [items, tabActive]);

  return (
    <div>
      <div className="tabs -bookmark js-tabs">
        <div
          className={`tabs__controls d-flex items-center js-tabs-controls ${className}`}
        >
          {items?.map((tab: TabItem) => (
            <button
              key={tab?.key}
              className={`tabs__button px-20 lg:px-16 lg:py-12 py-16 fw-500 tex-16 lg:text-13 xl:text-14 text-dark-1 js-tabs-button text-dark-1  ${
                tab?.key === tabActive
                  ? "is-tab-el-active border-bottom-primary-500-2"
                  : "border-bottom-light-2"
              }`}
              onClick={() => {
                setTabActive(tab?.key);
                onChange(tab?.key);
              }}
            >
              <i className={`${tab.icon} text-20 mr-10`}></i>
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {renderTabActive}
    </div>
  );
};
