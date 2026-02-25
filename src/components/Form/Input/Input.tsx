import React, { useState } from "react";
import "./Input.style.scss";
import { handleRenderMessageError } from "@/utils/handleRenderMessageError";
import classNames from "classnames";

interface InputProps {
  label?: React.ReactNode;
  name?: string;
  register?: any;
  required?: boolean;
  error?: { message?: string } | null;
  prefix?: React.ReactNode;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  prefix,
  type = "text",
  className,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className={`okdimall_input w-100 ${className}`}>
      {label && (
        <label className="okdimall_input-label">
          {label} {required && <span className="text-danger"> *</span>}
        </label>
      )}
      <div className="okdimall_input-wrapper">
        {prefix && <span className="okdimall_input-prefix">{prefix}</span>}
        <input
          type={inputType}
          {...(register
            ? register(name, { required, autoComplete: "off" })
            : {})}
          {...props}
          required={required}
          className={classNames("okdimall_input-field w-100", {
            "okdimall_input-field-prefix": Boolean(prefix),
          })}
          autoComplete={type === "password" ? "new-password" : "off"}
          name={name || `field_${Math.random().toString(36).substring(7)}`}
        />

        {type === "password" && (
          <span
            className="okdimall_input-icon"
            onClick={togglePasswordVisibility}
            role="button"
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? (
              <img src="/images/Profile/icon-eye-open.png" alt="eye-open" />
            ) : (
              <img src="/images/Profile/icon-eye-close.png" alt="eye-close" />
            )}
          </span>
        )}
      </div>

      {error && handleRenderMessageError(error.message)}
    </div>
  );
};

export default Input;
