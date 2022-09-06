import { useEffect, useState } from "react";

const useLocalStorage = (key, initialState) => {
  const [value, setValue] = useState(() => {
    const getLoc = JSON.parse(localStorage.getItem(key));
    return getLoc ? getLoc : initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
