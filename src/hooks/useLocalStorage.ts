import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      try {
        return JSON.parse(savedValue) as T;
      } catch {
        return initialValue;
      }
    }

    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erreur de sauvegarde localStorage :", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
