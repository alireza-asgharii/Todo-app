import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [value, setValue] = useState(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    return todos ? todos : [];
  });

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
