import type { UserProfile } from "@/types";

const isClient = typeof window !== "undefined";

export const saveAccessTokenToLocalStorage = (access_token: string): void => {
  if (!isClient) return;
  localStorage.setItem("access_token", access_token);
  document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const clearAccessTokenFromLocalStorage = (): void => {
  if (!isClient) return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  document.cookie = "access_token=; path=/; max-age=0";
  const clearLocalStorageEvent = new Event("clearLocalStorage");
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
};

export const getAccessTokenFromLocalStorage = (): string => {
  if (!isClient) return "";
  const result = localStorage.getItem("access_token");
  return result || "";
};

export const getProfile = (): UserProfile | null => {
  if (!isClient) return null;
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const setProfile = (profile: UserProfile): void => {
  if (!isClient) return;
  localStorage.setItem("profile", JSON.stringify(profile));
};

interface MinimalEventTarget {
  dispatchEvent: (event: Event) => boolean;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
}

export const localStorageEventTarget: MinimalEventTarget = isClient
  ? new EventTarget()
  : { dispatchEvent: () => false, addEventListener: () => {}, removeEventListener: () => {} };
