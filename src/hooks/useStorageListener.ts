import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

const isClient = typeof window !== "undefined";

const useStorageListener = <T = any>(
  key: string,
  storageType: "sessionStorage" | "localStorage" = "sessionStorage"
): T | null => {
  const [value, setValue] = useState<T | null>(() => {
    if (!isClient) return null;
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    const rawValue = storage.getItem(key);
    return rawValue !== null ? (JSON.parse(rawValue) as T) : null;
  });

  const getStorageValue = useCallback((): T | null => {
    if (!isClient) return null;
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    const rawValue = storage.getItem(key);
    return rawValue !== null ? (JSON.parse(rawValue) as T) : null;
  }, [key, storageType]);

  const updateValue = useCallback(() => {
    setValue(getStorageValue());
  }, [getStorageValue]);

  useEffect(() => {
    // Debounced function for handling storage events
    const handleStorageChange = debounce((event: StorageEvent) => {
      const isTargetStorage =
        storageType === "localStorage" ? localStorage : sessionStorage;
      if (event.storageArea === isTargetStorage && event.key === key) {
        updateValue();
      }
    }, 300);

    // Listen to the `storage` event (cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, storageType, updateValue]);

  useEffect(() => {
    // Custom event for same-tab updates
    const triggerUpdate = (): void => {
      const event = new Event(`${storageType}-update`);
      window.dispatchEvent(event);
    };

    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    const originalSetItem = storage.setItem.bind(storage);

    storage.setItem = function (...args: [string, string]) {
      originalSetItem(...args);
      triggerUpdate();
    };

    // Listen for the custom event
    const handleCustomEvent = debounce(updateValue, 300);
    window.addEventListener(`${storageType}-update`, handleCustomEvent);

    return () => {
      // Cleanup
      window.removeEventListener(`${storageType}-update`, handleCustomEvent);
      storage.setItem = originalSetItem; // Restore the original method
    };
  }, [key, storageType, updateValue]);

  useEffect(() => {
    // Polling mechanism for environments where `storage` doesn't trigger
    const interval = setInterval(() => {
      const currentValue = getStorageValue();
      if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
        setValue(currentValue);
      }
    }, 1000); // Poll every 1 second

    return () => clearInterval(interval);
  }, [getStorageValue, value]);

  return value;
};

export default useStorageListener;
