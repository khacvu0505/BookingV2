// Module augmentation: type useSelector with RootState by default
import "react-redux";

// Global declarations (inside module augmentation file, must use `declare global`)
declare global {
  const ZaloSocialSDK: { reload: () => void };
}
declare module "react-redux" {
  import type { RootState } from "@/store/store";
  export function useSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}

declare module "react-rating" {
  import React from "react";

  interface RatingProps {
    initialRating?: number;
    rating?: number;
    stop?: number;
    start?: number;
    step?: number;
    fractions?: number;
    readonly?: boolean;
    quiet?: boolean;
    direction?: "ltr" | "rtl";
    emptySymbol?: React.ReactNode | string | string[];
    fullSymbol?: React.ReactNode | string | string[];
    placeholderSymbol?: React.ReactNode | string | string[];
    placeholderRating?: number;
    onChange?: (value: number) => void;
    onClick?: (value: number) => void;
    onHover?: (value: number) => void;
    className?: string;
  }

  const Rating: React.FC<RatingProps>;
  export default Rating;
}

declare module "react-modal-video" {
  import { Component } from "react";

  interface ModalVideoProps {
    channel?: string;
    isOpen?: boolean;
    videoId?: string;
    autoplay?: boolean;
    youtube?: Record<string, unknown>;
    ratio?: string;
    vimeo?: Record<string, unknown>;
    allowFullScreen?: boolean;
    animationSpeed?: number;
    classNames?: Record<string, string>;
    aria?: Record<string, string>;
    onClose?: () => void;
  }

  export default class ModalVideo extends Component<ModalVideoProps> {}
}

declare module "react-pro-sidebar" {
  import { FC, ReactNode } from "react";

  export interface SidebarProps {
    className?: string;
    width?: string;
    collapsedWidth?: string;
    collapsed?: boolean;
    toggled?: boolean;
    onToggle?: (value: boolean) => void;
    onBackdropClick?: () => void;
    image?: string;
    breakPoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    backgroundColor?: string;
    rootStyles?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface MenuProps {
    className?: string;
    children?: ReactNode;
    renderExpandIcon?: (params: { open: boolean }) => ReactNode;
    closeOnClick?: boolean;
    menuItemStyles?: Record<string, unknown>;
    rootStyles?: React.CSSProperties;
  }

  export interface MenuItemProps {
    className?: string;
    icon?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    component?: string | React.ElementType;
    routerLink?: ReactNode;
    children?: ReactNode;
    rootStyles?: React.CSSProperties;
    onClick?: () => void;
  }

  export interface SubMenuProps {
    className?: string;
    label?: string | ReactNode;
    icon?: ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    active?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    rootStyles?: React.CSSProperties;
    onOpenChange?: (open: boolean) => void;
  }

  export const Sidebar: FC<SidebarProps>;
  export const Menu: FC<MenuProps>;
  export const MenuItem: FC<MenuItemProps>;
  export const SubMenu: FC<SubMenuProps>;
  export const ProSidebarProvider: FC<{ children?: ReactNode }>;
  export const useProSidebar: () => {
    collapseSidebar: (collapsed?: boolean) => void;
    toggleSidebar: (toggled?: boolean) => void;
    broken: boolean;
    collapsed: boolean;
    toggled: boolean;
  };
}

// react-parallax has its own types, no need to redeclare

declare module "react-multi-date-picker" {
  import { FC, ReactNode } from "react";

  export class DateObject {
    constructor(date?: Date | string | number | DateObject);
    format(formatStr?: string): string;
    add(value: number, type: string): DateObject;
    subtract(value: number, type: string): DateObject;
    set(key: string, value: unknown): DateObject;
    toDate(): Date;
    valueOf(): number;
    year: number;
    month: { number: number; name: string };
    day: number;
    weekDay: { number: number; name: string };
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    isValid: boolean;
  }

  interface DatePickerProps {
    value?: DateObject | DateObject[] | Date | Date[] | string | string[] | number | number[] | null;
    onChange?: (date: DateObject | DateObject[] | null) => void;
    format?: string;
    calendar?: string;
    locale?: string;
    mapDays?: (params: { date: DateObject; today: DateObject; selectedDate: DateObject | DateObject[]; currentMonth: { name: string; number: number }; isSameDate: (a: DateObject, b: DateObject) => boolean }) => Record<string, unknown> | undefined;
    multiple?: boolean;
    range?: boolean;
    onlyMonthPicker?: boolean;
    onlyYearPicker?: boolean;
    className?: string;
    inputClass?: string;
    containerClassName?: string;
    arrowClassName?: string;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    arrowStyle?: React.CSSProperties;
    minDate?: DateObject | Date | string | number;
    maxDate?: DateObject | Date | string | number;
    disableMonthPicker?: boolean;
    disableYearPicker?: boolean;
    zIndex?: number;
    plugins?: ReactNode[];
    render?: (value: string | string[], openCalendar: () => void, handleChange: (e: unknown) => void) => ReactNode;
    numberOfMonths?: number;
    currentDate?: DateObject;
    children?: ReactNode;
    placeholder?: string;
    name?: string;
    id?: string;
    title?: string;
    required?: boolean;
    editable?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    fixMainPosition?: boolean;
    fixRelativePosition?: boolean;
    offsetY?: number;
    offsetX?: number;
    readOnly?: boolean;
    disabled?: boolean;
    hideMonth?: boolean;
    hideYear?: boolean;
    hideWeekDays?: boolean;
    shadow?: boolean;
    fullYear?: boolean;
    weekStartDayIndex?: number;
    showOtherDays?: boolean;
    weekDays?: string[] | Array<string[]>;
    months?: string[] | Array<string[]>;
    calendarPosition?: string;
    animations?: unknown[];
    type?: string;
  }

  const DatePicker: FC<DatePickerProps>;
  export default DatePicker;
  export { DateObject };
}

declare module "photoswipe" {
  export interface PhotoSwipeOptions {
    dataSource?: unknown[];
    index?: number;
    bgOpacity?: number;
    spacing?: number;
    allowPanToNext?: boolean;
    loop?: boolean;
    pinchToClose?: boolean;
    closeOnVerticalDrag?: boolean;
    padding?: { top: number; bottom: number; left: number; right: number };
    closeTitle?: string;
    zoomTitle?: string;
    arrowPrevTitle?: string;
    arrowNextTitle?: string;
    errorMsg?: string;
    preload?: [number, number];
    gallery?: string | HTMLElement;
    children?: string;
    pswpModule?: unknown;
  }

  export default class PhotoSwipe {
    constructor(options?: PhotoSwipeOptions);
    init(): void;
    close(): void;
    destroy(): void;
  }
}

declare module "react-input-range" {
  import { Component } from "react";

  interface Range {
    min: number;
    max: number;
  }

  interface InputRangeProps {
    allowSameValues?: boolean;
    ariaLabelledby?: string;
    ariaControls?: string;
    classNames?: Record<string, string>;
    disabled?: boolean;
    draggableTrack?: boolean;
    formatLabel?: (value: number, type: string) => string;
    maxValue?: number;
    minValue?: number;
    name?: string;
    onChange: (value: number | Range) => void;
    onChangeStart?: (value: number | Range) => void;
    onChangeComplete?: (value: number | Range) => void;
    step?: number;
    value: number | Range;
  }

  export default class InputRange extends Component<InputRangeProps> {}
}
