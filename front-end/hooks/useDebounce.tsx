/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useDebounce = (value: any, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
