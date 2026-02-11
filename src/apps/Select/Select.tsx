import React from "react";
import SelectComponent from "react-select";
import "./Select.style.scss";

interface SelectProps {
  options: any[];
  styles?: any;
  label?: string;
  required?: boolean;
  [key: string]: any;
}

const Select = ({ options, styles, label, required, ...rest }: SelectProps) => {
  return (
    <>
      <label className="okdimall_input-label lg:text-15 md:text-14">
        {label} {required && <span className="text-danger"> *</span>}
      </label>
      <SelectComponent
        {...rest}
        options={options}
        styles={styles}
        className="okdimall_select"
      />
    </>
  );
};

export default Select;
