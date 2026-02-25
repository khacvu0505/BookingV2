import classNames from "classnames";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Offcanvas } from "bootstrap";

interface OffCanvasComponentProps {
  id: string;
  alignment?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  isShowHeader?: boolean;
  classNameBody?: string;
  footer?: React.ReactNode;
  isShowFooter?: boolean;
  [key: string]: any;
}

export interface OffCanvasComponentHandle {
  offcanvasRef: React.RefObject<HTMLDivElement | null>;
}

const OffCanvasComponent = (
  {
    id,
    alignment = "offcanvas-end",
    children,
    header,
    className,
    isShowHeader = true,
    classNameBody,
    footer,
    isShowFooter = false,
    ...props
  }: OffCanvasComponentProps,
  ref: React.Ref<OffCanvasComponentHandle>
) => {
  const { pathname } = useLocation();
  const isSpecialPage = ["/booking", "/booking-tour"].includes(pathname);
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const isOffcanvasBottom = alignment === "offcanvas-bottom";

  useEffect(() => {
    const offcanvasElement = offcanvasRef.current;
    if (!offcanvasElement) return;

    const handleShow = () => setIsOffcanvasVisible(true);
    const handleHide = () => setIsOffcanvasVisible(false);

    // Attach Bootstrap's Offcanvas event listeners
    offcanvasElement.addEventListener("show.bs.offcanvas", handleShow);
    offcanvasElement.addEventListener("hide.bs.offcanvas", handleHide);

    // Cleanup event listeners on unmount
    return () => {
      offcanvasElement.removeEventListener("show.bs.offcanvas", handleShow);
      offcanvasElement.removeEventListener("hide.bs.offcanvas", handleHide);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      offcanvasRef,
    }),
    [offcanvasRef]
  );

  return (
    <div
      id={id}
      className={classNames("offcanvas", {
        [className]: className,
        [alignment]: alignment,
      })}
      tabIndex={-1}
      aria-labelledby="offcanvasLabel"
      ref={offcanvasRef}
      {...props}
    >
      {isOffcanvasBottom && (
        <div
          className="text-center cursor-pointer"
          onClick={() => {
            const offcanvasElement = offcanvasRef.current;
            if (!offcanvasElement) return;
            const offcanvasInstance =
              Offcanvas.getInstance(offcanvasElement) ||
              new Offcanvas(offcanvasElement);
            offcanvasInstance.hide();
          }}
        >
          <i className="ri-arrow-down-s-line text-25 cursor-pointer"></i>
        </div>
      )}
      {isShowHeader && (
        <div className="offcanvas-header d-flex justify-between pb-0 pl-0 pt-15 pr-15 w-100">
          {header || <div></div>}
          <button
            type="button"
            className="btn-close ml-15  text-end"
            aria-label="Close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
      )}
      {(isOffcanvasVisible || isSpecialPage) && (
        <div
          className={classNames("offcanvas-body w-100 md:px-10", {
            [classNameBody]: classNameBody,
          })}
        >
          {children}
        </div>
      )}
      {isShowFooter && (
        <div className="offcanvas-header d-flex justify-between pt-10 pb-10 w-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default forwardRef<OffCanvasComponentHandle, OffCanvasComponentProps>(OffCanvasComponent);
