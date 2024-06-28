import { useStore } from "@stores/root-store";
import { LOWER_LIGHT_HYPEN_THEME, LOWER_THEME } from "@utils/const";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(LOWER_LIGHT_HYPEN_THEME);

  const {
    setting: {getSelectedTheme},
  } = useStore(null);

  useEffect(() => {
      setTheme(localStorage.getItem(LOWER_THEME))
  }, [])
  
  useEffect(() => {
    setTheme(getSelectedTheme)
  }, [getSelectedTheme])
  
  return theme;
};

