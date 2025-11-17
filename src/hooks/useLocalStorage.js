

import { useState, useEffect } from "react";

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (err) {
      console.error("Failed to read from localStorage:", err);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [key, state]);

  return [state, setState];
}
