import { t } from "i18next";
import Button from "../Button";

export const displayAuthenButton = (handleLogin: () => void, handleSignup: () => void) => {
  return (
    <>
      <Button onClick={handleLogin}>{t("HOME.LOGIN")}</Button>
      <Button onClick={handleSignup} isOutline>
        {t("HOME.SIGNUP")}
      </Button>
    </>
  );
};

export const displayTourIcon = (color: string) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.91602 11.5H3.58268L6.91602 7.75"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.2493 11.5001C15.2493 6.08681 11.0801 0.666748 6.91602 0.666748V11.5001H15.2493Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6047 16.3235L16.5 14L1.5 14L2.33333 16.5L11.9643 16.5C12.1898 16.5 12.4111 16.439 12.6047 16.3235Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.91602 11.5V14"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.084 7.75L16.084 7.75"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

export const displayDestinationIcon = (color: string) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.62565 13.3333C6.20095 13.3333 6.66732 12.867 6.66732 12.2917C6.66732 11.7164 6.20095 11.25 5.62565 11.25C5.05035 11.25 4.58398 11.7164 4.58398 12.2917C4.58398 12.867 5.05035 13.3333 5.62565 13.3333Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3757 13.3333C14.9509 13.3333 15.4173 12.867 15.4173 12.2917C15.4173 11.7164 14.9509 11.25 14.3757 11.25C13.8004 11.25 13.334 11.7164 13.334 12.2917C13.334 12.867 13.8004 13.3333 14.3757 13.3333Z"
      fill={color}
    />
    <path
      d="M2.91797 15.4167C2.22761 15.4167 1.66797 14.857 1.66797 14.1667L1.66797 10.2957C1.66797 9.34845 2.20333 8.48255 3.05072 8.05923L3.33485 7.91729L4.29733 3.78831C4.4732 3.03382 5.14577 2.5 5.92048 2.5L14.1239 2.5C14.9044 2.5 15.5804 3.04166 15.7505 3.8034L16.6693 7.91729L16.9527 8.05901C17.7996 8.48249 18.3346 9.34814 18.3346 10.2951V14.1667C18.3346 14.857 17.775 15.4167 17.0846 15.4167H16.2526V15.8333C16.2526 16.7538 15.5058 17.5 14.5853 17.5V17.5C13.6648 17.5 12.918 16.7538 12.918 15.8333V15.4167H7.08464V15.8334C7.08464 16.7539 6.33849 17.5 5.41808 17.5V17.5C4.49766 17.5 3.75152 16.7539 3.75152 15.8334V15.4167H2.91797Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M5.83398 9.16675H14.1673L13.479 6.06931C13.3943 5.68802 13.0561 5.41675 12.6655 5.41675L7.33579 5.41675C6.94521 5.41675 6.60703 5.68802 6.5223 6.06931L5.83398 9.16675Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
);

export const displayFlightTicketIcon = (color: string) => (
  <svg
    width={18}
    height={14}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.16797 8.08333L4.74144 9.7966C4.29272 10.021 3.75334 9.95531 3.37154 9.62986L0.667969 7.32535L2.15225 6.75654C2.41742 6.65492 2.7093 6.64662 2.97983 6.73301L4.34602 7.16931C4.6591 7.26929 4.99895 7.24196 5.29202 7.09321L14.568 2.38535C14.7433 2.29637 14.9371 2.25 15.1337 2.25H17.3346L16.6876 3.54399C16.5667 3.7859 16.3705 3.98205 16.1286 4.10301L12.3346 6"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.16743 8.08321L6.50059 8.91655L8.58395 13.0832L12.3339 5.99988"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.08439 6.41671L4.00106 2.66671L10.6677 4.33339"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const displayPromotionIcon = (color: string) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.66602 2.91675C1.66602 2.22639 2.22566 1.66675 2.91602 1.66675H9.99935H17.0827C17.773 1.66675 18.3327 2.22639 18.3327 2.91675V10.0001V17.0834C18.3327 17.7738 17.773 18.3334 17.0827 18.3334H9.99935H2.91602C2.22566 18.3334 1.66602 17.7738 1.66602 17.0834V10.0001V2.91675Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M1.66602 10H18.3327" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 18.3334V1.66675" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66602 14.1666V5.83325" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.334 14.1666V5.83325" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.0827 18.3333H2.91602" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.0827 1.66675H2.91602" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.0006 9.99988C10.0006 9.99988 14.2782 8.0793 14.9291 7.42843C15.5799 6.77755 15.5799 5.72228 14.9291 5.07141C14.2782 4.42054 13.2229 4.42053 12.572 5.07141C11.9212 5.72228 10.0006 9.99988 10.0006 9.99988ZM10.0006 9.99988C10.0006 9.99988 5.72292 8.0793 5.07204 7.42843M10.0006 9.99988C10.0006 9.99988 8.07994 5.72228 7.42907 5.0714M10.0006 9.99988C10.0006 9.99988 14.2781 11.9205 14.929 12.5714M10.0006 9.99988C10.0006 9.99988 11.9211 14.2776 12.572 14.9284M10.0006 9.99988C10.0006 9.99988 5.72301 11.9205 5.07214 12.5714C4.42126 13.2223 4.42127 14.2776 5.07214 14.9284C5.72302 15.5793 6.77829 15.5793 7.42916 14.9284C8.08003 14.2776 10.0006 9.99988 10.0006 9.99988Z"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const displayNewsIcon = (color: string) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.75065 18.3333L8.33398 15" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.3333 18.3333V5H10.4167L10.8333 8.33333L11.25 11.6667L11.6667 15L8.75 18.3333H18.3333Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.25 11.6667H14.5833" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.834 8.33325H14.584" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.66602 1.66675H9.99935L10.416 5.00008L10.8327 8.33341L11.2493 11.6667L11.666 15.0001H8.33268H1.66602V1.66675Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.16602 5H7.08268" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.16602 8.33325H7.49935" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.16602 11.6667H7.91602" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
