import { useEffect } from "react";
import { useAppSelector } from "./hooks";

const useCustomScrollbar = () => {
  const { theme } = useAppSelector(state => state.theme);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('scrollbar-light');
    } else {
      document.body.classList.remove('scrollbar-light');
    }
  }, [theme]);
};

export default useCustomScrollbar;