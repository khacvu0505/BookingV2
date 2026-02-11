/* eslint-disable no-undef */
import axios, { AxiosError, HttpStatusCode } from "axios";
import { escapeRegExp, pickBy } from "lodash";
import moment from "moment";
import { DateObject } from "react-multi-date-picker";
import { CURRENCY, DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from "./constants";
import i18n from "@/i18n";
import classNames from "classnames";
import React from "react";

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export function isAxiosUnauthorizeError(error: unknown): boolean {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError(error: unknown): boolean {
  return (
    isAxiosUnauthorizeError(error) &&
    (error as AxiosError<{ data?: { name?: string } }>).response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

export const formatCurrency = (price: number | string): string | number => {
  const value = new Intl.NumberFormat("en-DE");
  return typeof price === "number" ? value.format(price) : 0;
};

export const cleanedObject = <T extends Record<string, unknown>>(object: T): Partial<T> =>
  pickBy(
    object,
    (value) => value !== undefined && value !== null && value !== ""
  ) as Partial<T>;

// TODO: improve case star is float number
export const renderStars = (starNumber = 6): JSX.Element => {
  const star = Math.round(starNumber);
  const filledStars = Array(star)
    .fill(null)
    .map((_, index) => (
      <i
        key={`filled-star-${index}`}
        className="icon-star text-12 text-yellow-1"
      ></i>
    ));
  const emptyStars = Array(6 - star)
    .fill(null)
    .map((_, index) => (
      <i
        key={`empty-star-${star + index}`}
        className="icon-star text-12 text-gray-2"
      ></i>
    ));

  return (
    <div>
      {filledStars}
      {emptyStars}
    </div>
  );
};

export const formatDateCalendar = (date: DateObject | null): string => {
  if (!date) return new DateObject().format("YYYY-MM-DD");
  return date.format("YYYY-MM-DD");
};

interface FormatStringToDateOptions {
  isHideDay?: boolean;
  format?: string | null;
}

export const formatStringToDate = (dateString: string, options: FormatStringToDateOptions | boolean = {}): string => {
  const normalizedOptions: FormatStringToDateOptions = typeof options === 'boolean' ? { isHideDay: options } : options;
  const { isHideDay = false, format = null } = normalizedOptions;

  if (format) {
    return moment(dateString).format(format);
  }

  const dayNamesVi = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const dayName = dayNamesVi[dateObject.getDay()];

  const formattedDate = isHideDay
    ? `${day}-${month}-${year}`
    : `${dayName}, ${day}-${month}-${year}`;
  return formattedDate;
};

export const calculateNights = (checkInDateString: string, checkOutDateString: string): number => {
  const checkInDate = new Date(checkInDateString);
  const checkOutDate = new Date(checkOutDateString);

  const timeDifferenceMs = checkOutDate.getTime() - checkInDate.getTime();
  const differenceInDays = timeDifferenceMs / (1000 * 60 * 60 * 24);
  const nights = Math.ceil(differenceInDays);

  return nights;
};

export const arrayWithUniqueObject = <T extends Record<string, unknown>>(
  array: T[],
  objectToPush: Partial<T>,
  location: number
): T[] => {
  const data = array.map((item, index) =>
    index + 1 === location ? { ...item, ...objectToPush } : item
  );
  return data;
};

export const fillArrayWithObject = <T extends Record<string, unknown>>(
  array: T[],
  objectToPush: Partial<T>
): T[] => {
  return array.map((item) => ({ ...item, ...objectToPush }));
};

export const arrayUnique = <T extends Record<string, unknown>>(
  objectArray: T[],
  obj: T,
  keyCheck: string
): T[] => {
  const index = objectArray.findIndex(
    (item) => item[keyCheck] === obj[keyCheck]
  );
  if (index !== -1) {
    objectArray.splice(index, 1);
  } else {
    objectArray.push(obj);
  }
  return objectArray;
};

export const updateArray = <T extends Record<string, unknown>>(
  objectArray: T[],
  obj: T,
  keyCheck: string
): T[] => {
  const dataObj = objectArray.find((item) => item[keyCheck] === obj[keyCheck]);
  let newObjectArray = objectArray;
  if (dataObj) {
    newObjectArray = objectArray.map((item) =>
      dataObj[keyCheck] === item[keyCheck] ? obj : item
    );
  }
  return newObjectArray;
};

const _isClient = typeof window !== "undefined";

export const getFromSessionStorage = <T = any>(key: string): T | null => {
  if (!_isClient) return null;
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setToSessionStorage = (key: string, value: unknown): void => {
  if (!_isClient) return;
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const clearSessionStorage = (key: string): void => {
  if (!_isClient) return;
  sessionStorage.removeItem(key);
};

export const getFromLocalStorage = <T = any>(key: string): T | null => {
  if (!_isClient) return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setToLocalStorage = (key: string, value: unknown): void => {
  if (!_isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string): void => {
  if (!_isClient) return;
  localStorage.removeItem(key);
};

export const formatDate = (date: Date): string => {
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
};

export const addDate = (date: string | Date, days: number): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result);
};

export const groupBy = <T extends Record<string, unknown>>(
  array: T[] | undefined,
  key: string
): Record<string, T[]> => {
  return (
    array?.reduce<Record<string, T[]>>((result, currentValue) => {
      const groupKey = String(currentValue[key]);
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {}) ?? {}
  );
};

export function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function getMinValueFromList(list: number[]): number {
  let min = list[0];
  for (let i = 0; i < list.length; i++) {
    if (list[i] < min) {
      min = list[i];
    }
  }
  return min;
}

export function insertIframe(iframeString: string, idContainer: string, width = "360px"): void {
  const iframeContainerTempDiv = document.getElementById(
    "iframeContainerTempDiv"
  );
  if (iframeString && !iframeContainerTempDiv) {
    const tempDiv = document.createElement("div");
    tempDiv.setAttribute("id", "iframeContainerTempDiv");
    tempDiv.innerHTML = iframeString;

    const iframe = tempDiv.querySelector("iframe");
    if (iframe) {
      iframe.style.width = width;
      iframe.style.height = "223px";

      document.getElementById(idContainer)?.appendChild(tempDiv);
    } else {
      console.error("No iframe found in the response");
    }
  }
}

export const converObjectToArray = (obj: Record<string, unknown>): Array<{ label: string; value: unknown; [key: string]: unknown }> => {
  return Object.keys(obj).map((key) => ({
    label: key,
    value: obj[key],
    ...(typeof obj[key] === "object" && obj[key] !== null ? obj[key] as Record<string, unknown> : {}),
  }));
};

export const convertTextFromCamelToCapitalize = (text: string): string => {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

interface DayInfo {
  key: string;
  day: string;
  month: string;
  year: string;
  date: string;
}

export function getDaysBetween(startDate: string | Date, endDate: string | Date, locale = "vi"): DayInfo[] {
  let start = moment(startDate).locale(locale);
  const end = moment(endDate).locale(locale);
  const days: DayInfo[] = [];

  while (start <= end) {
    let dayDisplay: string;
    if (locale === "vi") {
      const dayOfWeek = start.day();
      dayDisplay = dayOfWeek === 0 ? "CN" : `Thứ ${dayOfWeek + 1}`;
    } else {
      dayDisplay = start.format("ddd");
    }

    const monthDisplay =
      locale === "vi" ? `Tháng ${start.format("M")}` : start.format("MMMM");

    const uniqueKey = start.format("YYYY-MM-DD");

    days.push({
      key: uniqueKey,
      day: dayDisplay,
      month: monthDisplay,
      year: start.format("YYYY"),
      date: start.format("D"),
    });
    start = start.add(1, "day");
  }

  return days;
}

export const formatCurrencyFromLanguage = (languageCode: string): string => {
  const convertedCurrency = CURRENCY[languageCode || DEFAULT_LANGUAGE];
  return convertedCurrency;
};

export const formatCurrencySendToServer = (languageCode: string): string => {
  switch (languageCode) {
    case "vn":
      return "VND";
    case "gb":
      return "USD";
    case "id":
      return "IDR";
    case "eur":
      return "EUR";
    case "myr":
      return "MYR";
    case "php":
      return "PHP";
    case "sgd":
      return "SGD";
    case "thb":
      return "THB";
    default:
      return "VND";
  }
};

export const formatLanguageSendToSever = (languageCode: string): string => {
  switch (languageCode) {
    case "vn":
      return "vi";
    case "gb":
      return "en";
    case "kr":
      return "ko";
    case "cn":
      return "zh";
    default:
      return "vi";
  }
};

const normalizeString = (str: string): string =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

interface HighlightedTextProps {
  text: string;
  highlight: string;
  classNameCustom?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight, classNameCustom = "" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const normalizedText = normalizeString(text);
  const normalizedHighlight = normalizeString(highlight);

  const regex = new RegExp(`(${escapeRegExp(normalizedHighlight)})`, "gi");
  const parts = normalizedText.split(regex);

  let originalIndex = 0;

  return (
    <span
      className={classNames("text-16 lg:text-15 md:text-14", {
        [classNameCustom]: !!classNameCustom,
      })}
    >
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        const originalPart = text.slice(
          originalIndex,
          originalIndex + part.length
        );
        originalIndex += part.length;

        return isMatch ? (
          <span key={index} style={{ color: "red" }}>
            {originalPart}
          </span>
        ) : (
          originalPart
        );
      })}
    </span>
  );
};
