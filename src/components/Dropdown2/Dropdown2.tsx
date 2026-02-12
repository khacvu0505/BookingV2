import React, { useState } from "react";
import "./Dropdown2.style.scss";

interface DropdownOption {
  label: string;
  value: any;
}

interface Dropdown2Props {
  label: string;
  options?: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  className?: string;
}

const Dropdown2 = ({ label, options = [], onSelect, className }: Dropdown2Props) => {
  const isDesktop = window.innerWidth > 576;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option.label); // Hiển thị label của option đã chọn
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); // Truyền cả object lên API
    }
  };

  return (
    <div className={`custom-dropdown ${className}`}>
      <div
        className="custom-dropdown-label w-fitcontent"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        <img src="/images/Profile/icon-sort.png" alt="icon-sort" />
        {isDesktop && (
          <p className="text-primary-500 text-16 lg:text-15 md:text-14">
            {selectedOption}
          </p>
        )}
        {/* <span className={`custom-dropdown-icon ${isOpen ? "open" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span> */}
      </div>
      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option: DropdownOption, index: number) => (
            <div
              key={index}
              className="custom-dropdown-item"
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
