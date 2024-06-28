import { observer } from "mobx-react";
import { memo, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import Checkbox from "antd/lib/checkbox";
import {
  CAMEL_USER_NAME,
  CAP_AMOUNT,
  CAP_FINAL_SHEET,
  CAP_HIDE_ZERO_AMOUNTS,
  CAP_NAME, 
  CAP_TOTAL,
  DASH,
  DOUBLE_DASH,
  LOWER_THEME,
} from "@utils/const";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTheme } from "@utils/hooks/useTheme";
import Table from "@components/common-components/table"; 
import { useStore } from "@stores/root-store";
import { Tooltip } from "antd";
import { TfiAlignJustify } from "react-icons/tfi";
import { formatLargeNumber, numberWithCommas } from "@utils/common-functions";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import useWindowSize from "@utils/hooks/useWindowSize";
const FinalSheet = observer(() => {
  const {
    user: { getUserInfo, getAllUsers, loadAllUsers, loadFinalSheet, getFinalSheetReport },
  } = useStore(null);
  const navigate = useNavigate()
  const innerWidth = useWindowSize().width;
  // useEffect(() => { 
  //   if (getAllUsers == null) {
  //     loadAllUsers();
  //   }
  // }, []);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  useEffect(() => {
      loadFinalSheet();
  }, []);
  const [positiveValueData, setPositiveValueData] = useState([]);
  const [isHideZero, setIsHideZero] = useState(false)
  useEffect(() => {
    setPositiveValueData(getFinalSheetReport?.positiveClients);
  }, [JSON.stringify(getFinalSheetReport?.positiveClients)]);
  const columns = [
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <Tooltip title={data.userName}>
           <p className={`dynamicColorOnHover`}><span className={style.clickAble} onClick={()=>{
            navigate(`${constRoute.users}?userId=${data?.userId}`)
           }}> {data.userName || DOUBLE_DASH} </span></p>
          </Tooltip>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <div><span style={{color:data?.clientPL>=0 ? '#00b181' : 'red'}} className="dynamicColorOnHover">{numberWithCommas(Math.round(data?.clientPL || 0))}</span></div>,
      },
    ]
    console.warn('innerWidth', innerWidth)
  const theme = useTheme();
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      const filterData = getFinalSheetReport?.positiveClients?.filter(
        (i) => i?.clientPL !== 0 
      );
      setPositiveValueData(filterData);
      setIsHideZero(true)
    } else {
      setPositiveValueData(getFinalSheetReport?.positiveClients);
      setIsHideZero(false)
    }
  };
  const finalSheetDiv = useMemo(
    () => (
      <TitleBarUpdated title={`${getUserInfo?.userName || ''} ${DASH} ${CAP_FINAL_SHEET}`}
      isIcon={true} icon={<TfiAlignJustify />}
      isRightRibbon={ <div className={style.finalSheetCheckBoxDiv}>
      <Checkbox onChange={handleCheckboxChange} />
      <label style={{width:innerWidth>380 ? 136 : 80, fontSize: innerWidth>380 ? '12px': '12px'}} className={style.finalSheetCheckBoxLable}>
        {CAP_HIDE_ZERO_AMOUNTS}
      </label>
    </div>}
      />
    ),
    [
      localStorage.getItem(LOWER_THEME),
      theme,
      JSON.stringify(getFinalSheetReport?.positiveClients),
      innerWidth
    ]
  );
  return (
    <div>
      <div className={style.mainContainer}>
        <ReportTypeHeaderBtns />
        {finalSheetDiv}
        <div className={style.mainTableDiv}>
          <div className={style.gridOne}>
            <Table
              className={style.positiveClient}
              dataSource={positiveValueData}
              columns={columns}
              checkPagination={false}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:getFinalSheetReport?.totalPositiveClientPL>=0 ? "#085845": '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      {numberWithCommas(Math.round(getFinalSheetReport?.totalPositiveClientPL || 0))}
                    </h3>
                  </div>
                );
              }}
            />
          </div>
          <div className={style.gridTwo}>
            <Table
              className={style.negativeClient}
              dataSource={isHideZero? getFinalSheetReport?.negativeClients?.filter((item)=> item?.clientPL!==0) : getFinalSheetReport?.negativeClients}
              columns={columns}
              checkPagination={false}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:getFinalSheetReport?.totalNegativeClientPL>=0 ? "#085845": '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      {numberWithCommas(Math.round(getFinalSheetReport?.totalNegativeClientPL || 0))}
                    </h3>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}); 

export default memo(FinalSheet);
