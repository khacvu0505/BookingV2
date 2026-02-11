import { useState } from "react";
import "./Dropdown.style.scss";

interface DropdownOption {
  title: string;
  value: any;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (item: DropdownOption) => void;
  value: DropdownOption;
}

const Dropdown = ({ options, onChange, value }: DropdownProps) => {
  const [active, setActive] = useState(value);

  return (
    <div className="dropdown-component">
      <div className="dropdown js-dropdown js-amenities-active">
        <div
          className="dropdown__button d-flex items-center justify-content-between text-14 border-light px-15 h-34 border-primary-500 rounded-4 w-100"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
          data-bs-offset="0,10"
        >
          <span className="js-dropdown-title dropdown-title">
            {active.title}
          </span>
          <i className="icon icon-chevron-sm-down text-7 ml-10" />
        </div>

        <div className="toggle-element -dropdown js-click-dropdown dropdown-menu pr-0">
          <div className="text-15 y-gap-15 js-dropdown-list">
            {options.map((item: DropdownOption, index: number) => (
              <div key={index}>
                <button
                  className={`${
                    item.value === active.value ? "text-blue-1 " : ""
                  }d-block js-dropdown-link`}
                  onClick={() => {
                    setActive(item);
                    onChange(item);
                  }}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

// const Dropdown = ({}) => {
//   const dropdown = {
//     title: "Cabin Type",
//     value: "Cabin Type",
//     options: ["Small", "Medium", "Large"],
//   };
//   return (
//     <>
//       <DropdownItem {...dropdown} />
//     </>
//   );
// };

// export default Dropdown;
