import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
// import FilterIcon from "@assets/icons/filter-icon.png";
// import FilterIconDark from "@assets/icons/filter-icon-dark.png";
import style from "./style.module.scss";
// import TitleBar from "@components/users/common-components/title-bar";
import { CAP_REPORT_TYPE,} from "@components/users/const";
import { useTheme } from "@utils/hooks/useTheme";
// import { LOWER_LIGHT_HYPEN_THEME, LOWER_THEME } from "@utils/const";
import HeaderButtons from "@components/users/common-components/header-buttons";
import { HeaderBtnList } from "@components/users/json-data";
import { FilterOutlined } from "@ant-design/icons";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const ReportTypeHeaderBtn = observer(() => {
  const theme = useTheme();
  // const [filterIcon, setFilterIcon] = useState(null);
  // useEffect(() => {
  //   if (localStorage.getItem(LOWER_THEME) === LOWER_LIGHT_HYPEN_THEME) {
  //     setFilterIcon(FilterIconDark);
  //   } else {
  //     setFilterIcon(FilterIcon);
  //   }
  // }, [localStorage.getItem(LOWER_THEME), theme]);
  return (
    <div className={style.mainContainer}>
      {/* <TitleBar
        icon={filterIcon}
        title={CAP_REPORT_TYPE}
        className={style.finalSheetTitleBar}
      /> */}
      {/* <div className={style.searchBarMain}>
          <div className={style.searchTitleBar}>   
            <FilterOutlined className={style.filterIcon}/> 
            <h4 className={style.searchUserText}>{CAP_REPORT_TYPE}</h4>          
          </div>
        </div> */}
         <TitleBarUpdated 
          title={CAP_REPORT_TYPE}
          icon={<FilterOutlined /> }
          isIcon={true}
          />
      <div className={style.headerBtnCard}>
        <HeaderButtons btnList={HeaderBtnList} />
      </div>
    </div>
  );
});
export default memo(ReportTypeHeaderBtn);