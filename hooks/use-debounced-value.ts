import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const cancel = () => {
    window.clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (mountedRef.current) {
      cancel();
      timeoutRef.current = window.setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }
  }, [value, delay]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [debouncedValue, cancel] as const;
}
