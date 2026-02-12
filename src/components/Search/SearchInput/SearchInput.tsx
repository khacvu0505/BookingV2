import React from "react";
import "./SearchInput.style.scss";

const SearchInput = ({
  placeholder,
  leftIcon,
  rightButton,
  onChange,
  ...rest
}) => {
  return (
    <div className="search-input">
      {leftIcon && <div className="search-input__icon">{leftIcon}</div>}
      <input
        {...rest}
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        onChange={onChange}
      />
      {rightButton && <div className="search-input__button">{rightButton}</div>}
    </div>
  );
};

export default SearchInput;
