import classNames from "classnames";
import React from "react";
import "./Button.styles.scss";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: React.ReactNode;
  isOutline?: boolean;
  disabled?: boolean;
  type?: string;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isOutline = false,
  disabled = false,
  type = "primary",
  htmlType = "button",
  className,
  isLoading,
  ...restProps
}) => {
  const handleRenderButton = () => {
    switch (type) {
      case "primary":
        return (
          <button
            {...restProps}
            type={htmlType}
            className={classNames(
              `button buttonCustom text-18 xl:text-16 lg:text-14 py-10 px-16 lg:py-8 lg:px-14 md:px-6`,
              {
                "-outline-primary-50 text-primary-500 border-primary-500":
                  isOutline,
                "-primary-400 bg-primary-500 text-white": !isOutline,
                [className]: !!className,
              }
            )}
            disabled={disabled || isLoading}
          >
            {isLoading && (
              <span
                className={classNames("text-primary-500 mr-5", {
                  "loader-outline": isOutline,
                  loader: !isOutline,
                })}
              ></span>
            )}
            {children}
          </button>
        );

      case "secondary":
        return (
          <button
            {...restProps}
            type={htmlType}
            className={classNames(
              `button buttonCustom text-18 xl:text-16 lg:text-14 py-10 px-16 lg:py-8 lg:px-14`,
              {
                "-outline-secondary-50 text-secondary-500 border-secondary-500":
                  isOutline,
                "-secondary-400 bg-secondary-500 text-white": !isOutline,

                [className]: className,
              }
            )}
            disabled={disabled || isLoading}
          >
            {isLoading && <span className="loader text-white mr-5"></span>}

            {children}
          </button>
        );

      default:
        break;
    }
  };

  return handleRenderButton();
};

export default Button;
