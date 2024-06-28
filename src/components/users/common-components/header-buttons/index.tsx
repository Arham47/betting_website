import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import {
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_OUTLINED,
  LOWER_SUBMIT,
} from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@stores/root-store";
export interface HeaderBtnPropsTypes {
  btnList?: [];
  className?: string;
  navigateId?: string | number | null ;
}

const HeaderButtons = observer(({ btnList = [], className = "", navigateId = "" }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate()
  const [activeElement, setActiveElement] = useState("");
  const {
    user: { getSingleUser },
  } = useStore(null);
  useEffect(() => {
    setActiveElement(location?.pathname);
  }, [location?.pathname]);

  return (
    <div className={theme || LOWER_LIGHT_HYPEN_THEME}>
      <div className={`${style.usersHeaderBtnContainer} ${className}`}> 
        <div className={style.btnContainer}>
          {btnList?.length > 0 &&
            btnList?.map((item) => {
              return (
                <CustomButton
                  className={
                    navigateId ?
                     activeElement ===`${item?.path}/${getSingleUser?._id}`?
                      style.activeButton
                      : style.headerButtons:
                      activeElement===item?.path
                      ? style.activeButton
                      : style.headerButtons
                  }
                  variant={LOWER_OUTLINED}
                  htmlType={LOWER_SUBMIT}
                  onClick={() => {
                    if (navigateId) {
                      if(item?.path==='/ledger'){
                        localStorage.setItem('type', '')
                         navigate(`${item?.path}/${navigateId}`, {state: {showButton: true}})
                      }
                      else navigate(`${item?.path}/${navigateId}`)
                    } else {
                      navigate(item?.path)
                    }
                  }}
                  loading={item?.loading}
                  title={item?.btnTitle}
                />
                
              );
            })}
        </div>
      </div>
    </div>
  );
});

export default memo(HeaderButtons);
