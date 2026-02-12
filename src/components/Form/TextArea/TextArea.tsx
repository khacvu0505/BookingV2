import React from "react";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import "./TextArea.style.scss";

const TextArea = ({
  label,
  name,
  register,
  required = false,
  rows = 3,
  defaultValue = "",
  error,
  ...rest
}) => {
  return (
    <div className="okdimall_textarea">
      {label && (
        <label className="okdimall_textarea-label">
          {label} {required && <span className="text-danger"> *</span>}
        </label>
      )}
      <textarea
        {...rest}
        rows={rows}
        defaultValue={defaultValue}
        {...(register ? register(name, { required }) : {})}
        className="okdimall_textarea-field"
      />

      {error && handleRenderMessageError(error.message)}
    </div>
  );
};

export default TextArea;
