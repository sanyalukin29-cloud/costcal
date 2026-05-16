"use client";

import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that updates after `delay` ms of stillness.
 * Used to throttle realtime calculation as the user types.
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
