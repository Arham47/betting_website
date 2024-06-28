import { useStore } from "@stores/root-store";
import {
  LOWER_DARK_HYPEN_THEME,
  LOWER_GREY_HYPEN_THEME,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
  LOWER_TOKEN,
} from "@utils/const";
import { Radio } from "antd";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { observer } from "mobx-react-lite";
// import { useStore } from "@stores/root-store";
export interface changeThemePropsTypes {
  isChangeTheme?: boolean;
  onCloseDrawer?:any;
}




const ThemeToggleBtn = observer(({ isChangeTheme = false, onCloseDrawer }: changeThemePropsTypes) => {
  const [value, setValue] = useState( isChangeTheme ? localStorage.getItem('updateTheme'): 
    localStorage.getItem(LOWER_THEME) || LOWER_LIGHT_HYPEN_THEME
  );

  const {
    setting: {
      changeTheme,
      updateDefaultTheme,
      getDefaultSettings,
      loadDefaultSettings,
    },

    user: {getUserInfo},
  } = useStore(null);


  useEffect(() => {
    if (!getDefaultSettings) {
      loadDefaultSettings();
    }
  }, []);

  const onChange = async (e) => {
        !isChangeTheme && changeTheme(e.target.value);
        // !isChangeTheme &&localStorage.setItem(LOWER_THEME, e.target.value)
    setValue(e.target.value);
        const payload = {
      _id: getDefaultSettings[1]?._id,
      defaultThemeName: e.target.value,
    };
        if(onCloseDrawer) {
      onCloseDrawer();
    }
        if (isChangeTheme) {
            await updateDefaultTheme(payload).then(
        (res) => {if(res?.success) {
          localStorage.setItem('updateTheme', e.target.value)
           loadDefaultSettings()
        }
      }
      );
    } else {
            localStorage.setItem(LOWER_THEME, e.target.value);
    }
  };

  useEffect(() => {
    changeTheme(localStorage.getItem(LOWER_THEME) || LOWER_LIGHT_HYPEN_THEME)
  }, [])

  return (
    <>
    {getUserInfo?.role === '0' && (
      <Radio.Group
        className={style.radioThemeSelecting}
        onChange={onChange}
        // defaultValue={localStorage.getItem(LOWER_THEME)}
        value={value}
      >
        <Radio
          className={style.lightTheme}
          value={LOWER_LIGHT_HYPEN_THEME}
        ></Radio>
        <Radio className={style.greyTheme} value={LOWER_GREY_HYPEN_THEME}></Radio>
        <Radio className={style.darkTheme} value={LOWER_DARK_HYPEN_THEME}></Radio>
      </Radio.Group>
      )}
    </>
  );
});

export default memo(ThemeToggleBtn);
