import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import CustomButton from "@components/common-components/custom-button";
import style from "./style.module.scss";
import * as _ from "lodash";
import { useStore } from "@stores/root-store";
import { observer } from "mobx-react";
import { constImages } from "@utils/images";
import {
    useParams
  } from "react-router-dom";
import { notification } from "@utils/notifications";
import {
  CAP_SUBMIT,
} from "@utils/const";
import { AddBetsBtn } from "@components/users/json-data";
import { REPORT_FILTER } from "@components/users/const";
import HeaderButtons from "../common-components/header-buttons";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "../common-components/title-bar-updated";
import { CAMEL_CREATED_AT } from "@utils/const/TableColumns";
import { ColTextCheck } from "@components/common-components/export-common-components/table-columns-text-check";
import Table from "@components/common-components/table";
import { numberWithCommas } from "@utils/common-functions";
import moment from "moment";
import { constRoute } from "@utils/route";

export const ProfitLossReport = observer(() => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [gameName, setGameName] = useState(null);
  const [gameArray, setGameArray] = useState([]);
  const [sportsWiseData, setSportsWiseData] = useState([])
  const [singleUserId, setSingleUserId] = useState(null)

  const  { id } = useParams();
  const {
    user: {getUserInfo, loadSingleUser},
    bet: { loadProfitLossData, loadGameDataOfProfitLoss, loadingGameDataProfitLoss },
  } = useStore(null);
  useEffect(() => {
    if(id){
      loadSingleUserData()
    }
  },[])
  const loadSingleUserData = async() => {
    const res = await loadSingleUser({id});
    if(res?.success){
      setSingleUserId(res?.results?.userId)
    }
  }
  const handlegetProfitLossGame = async () => {
    const res = await loadProfitLossData(singleUserId);
    if (res?.success) {
      setGameArray(res?.results);
    }
  };

  const openNewWindow = (route) => {
    const newWindow =  window.open(`${window.location.href.replaceAll(`/profit-loss/${id}`,`/${route}`)}`,"_blank", 'width=520,height=600,resizable,scrollbars');
    // const newWindow = window.open(window.location.href.replaceAll('/daily-report', '/Reports/MarketShares'), '_blank');
    localStorage.setItem('currentLink', route)
    newWindow.focus();
  };

  const handleLoadGameData = async(id)=>{
    const data = {
      id: id,
      userId: singleUserId
    }
    const res = await loadGameDataOfProfitLoss(data)
    if(res?.success){
      setSportsWiseData(res?.results)
    }
  }
  useEffect(() => {
    if (singleUserId) handlegetProfitLossGame();
  }, [singleUserId]);

  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const headerButtonUserBets = useMemo(
    () => (
      <div className={style.betsBtnMainContainer}>
        <div className={style.betsBtnMain}>
          <Col xxl={16} xl={16} lg={14} md={12} sm={12} xs={24}>
            <HeaderButtons
              className={style.addBetsizeLoginBtn}
              btnList={AddBetsBtn}
              navigateId={id}
            />
          </Col>
          <Col xxl={8} xl={8} lg={10} md={12} sm={12} xs={24}>
            <h2 className={style.userName}> {getUserInfo?.userName} </h2>
          </Col>
        </div>
      </div>
    ),
    [getUserInfo]
  );  
  const handleSubmit = ()=>{
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    if(firstDate.getTime() && lastDate.getTime()){
    if (startDate <= endDate){ 
    }
    else {notification.error("Start Date Must be less or Equal to End Date");
    return ;
  }
}   else {
  if ((startDate <= endDate) || !endDate){}
  else {notification.error("Start Date Must be less or Equal to End Date");
  return ;
}
}
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const columns = [
    {
      title: "Date",
      dataIndex: CAMEL_CREATED_AT,
      render: (_, data)=>{
        return<p>{moment(new Date(data?.date))?.format('YYYY-MM-DD hh:mm:ss a')}</p>
      },
    },
    {
      title: gameName?.name,
      dataIndex: 'name',
      render: (_, data)=>{
        return <p className={style.clickAble}
        onClick={() => {
          const newData = {
            Data: data
          };
           localStorage.setItem('adminProfitLoss', JSON.stringify(newData))
              openNewWindow(`${constRoute?.profitLossDetail}`)
        }}
        >{data?.name|| '--'}</p>
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: ColTextCheck,
    },
  ];
  return (
    <Wrapper>
     <Row>{headerButtonUserBets}</Row>
     <TitleBarUpdated title={REPORT_FILTER} icon={<TfiAlignJustify/>} isIcon={true}/>
     <div className={style.dateSection}>
        <div className={style.flexAndGapClass}>
            <DateTimePicker
              calendarIcon={
                <FaCalendarAlt className={style.calenderIcon} style={{fontSize: '20px'}}/>
            }
              value={startDate}
              format="MM-dd-yyyy HH:mm aa"
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
            />
            <DateTimePicker
              calendarIcon={
                <FaCalendarAlt className={style.calenderIcon} style={{fontSize: '20px'}}/>
            }
              value={endDate}
              format="MM-dd-yyyy HH:mm aa"
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
                <CustomButton
          title={CAP_SUBMIT}
          customClass={style.btnStyle}
          onClick={() => {
            handleSubmit();
          }}
        />
        </div>
      </div>
      <TitleBarUpdated title={`${'Sports ProfitLoss'} (${getUserInfo?.userName})`} icon={<TfiAlignJustify/>} isIcon={true}/>
      {gameArray?.length ? (
        <div className={style.gameNameWithAmount}>
          <div className={style.gameName}>
            {gameArray?.map((item) => {
              return (
                <div
                  onClick={() =>{ 
                    setGameName(item)
                    handleLoadGameData(item?._id)
                  }}
                  className={style.clickAble}
                >{`${capitalizeFirstLetter(item?.name)} ( ${
                  numberWithCommas(item?.amount?.toFixed(0))
                } )`}</div>
              );
            })}
          </div>
          <div>{`Total: (${ numberWithCommas(gameArray?.reduce(
            (a, b) => a + Number(b?.amount),
            0
          ).toFixed(0))})`}</div>
        </div>
      ) : (
        ""
      )}
      {gameName ? (
        <>
          <div style={{ marginTop: "15px" }}>
            <TitleBarUpdated
              title={"Account Ledger"}
              isIcon={true}
              icon={<TfiAlignJustify />}
            />
          </div>
          <Table dataSource={sportsWiseData} loading={loadingGameDataProfitLoss} columns={columns} />
        </>
      ) : (
        ""
      )}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 10px;
  @media screen and (max-width:650px) {
    padding: 4px;
  }
`;