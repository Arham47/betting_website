/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  CAMEL_USER_NAME,
  CAP_AMOUNT,
  CAP_NAME,
  CAP_TOTAL,
  DOUBLE_DASH,
} from "@utils/const";
import { Col, Row } from "antd";
import Table from "@components/common-components/table";
import { useStore } from "@stores/root-store";
import { numberWithCommas, truncate } from "@utils/common-functions";
// import CustomButton from "@components/common-components/custom-button";
import { useLocation, useNavigate } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import useWindowSize from "@utils/hooks/useWindowSize";
import { CAP_ENTRIES, CAP_SEARCH, CAP_SHOW } from "@utils/const";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

import moment from "moment";
import { constRoute } from "@utils/route";

const Statement = observer(() => {
  const {
    user: { loadingMarketPositions, loadMarketPositions, getUserInfo}, 
  } = useStore(null);
  // const [dailyPLForMinus, setDailyPlForMinus] = useState([])
  // const [dailyPlForPositive, setDailyPlForPositive] = useState([])
  const [positiveValue, setPositiveValue] = useState([])
  const [negativeValue, setNagitiveValue] =  useState([])
  const parsData = JSON.parse(localStorage.getItem('userStatementData'))
  const [UserIdArray, setUserIdArray] =  useState([parsData?.userId])
  const [search, setSearch] = useState("");
  const data = useWindowSize().width;
  const [isDetailed, setIsDetailed] = useState(false)
  const [betterDetailed, setIsBetterDetailed] = useState([])
 const [userRecord, setUserRecord] = useState(null)
 const [pageNo, setPageNo] = useState(1)
 const [pageSize, setPageSize] = useState(10)
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleDataOfMatchWiseReportData = async(userId)=>{
  const data ={
    userId:userId,
    page:pageNo,
    pageSize:pageSize
  }
 const res = await loadMarketPositions(data)
  const positive =  res?.results?.filter((item)=>item?.amount>=0)
const negative =  res?.results?.filter((item)=>item?.amount<0)
setIsDetailed(res?.isDetailed)
setIsBetterDetailed(res?.results)
setUserRecord(res)
setNagitiveValue(negative);
setPositiveValue(positive)
}
useEffect(()=>{
  handleDataOfMatchWiseReportData(parsData?.userId)
},[])
const openNewWindow = (route) => {
  const newWindow =  window.open(`${window.location.href.replaceAll(`/statement`,'/statement-detail')}`,"_blank", 'width=520,height=600,resizable,scrollbars');
  localStorage.setItem('currentLink', route)
  newWindow.focus();
};
  const columns =[ 
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <div>
            {UserIdArray?.find((z)=>z==data?._id) || data?._id < getUserInfo?.userId  ?
            <p>{data?.name || DOUBLE_DASH}</p>:<p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
                  setUserIdArray([...UserIdArray, data?._id])
                  if(data?.role == '5'){
                    const newData = {userId:data?._id, marketId:parsData?.marketId, betId:data?.betId}
                    localStorage.setItem('userStatementDetail', JSON.stringify(newData))
                    openNewWindow(`${constRoute?.statementDetail}`)
                  }else{
                    handleDataOfMatchWiseReportData(data?._id)
                  }
            }}>{data?.name || DOUBLE_DASH}</p>
            }
            {/* <p className={style.clickAble} onClick={() => {
               if(data?.role == '5'){
                const newData = {userId:data?._id, marketId:parsData?.marketId}
                localStorage.setItem('userStatementDetail', JSON.stringify(newData))
                openNewWindow(`${constRoute?.statementDetail}`)
              }else{
                handleDataOfMatchWiseReportData(data?._id)
              }
            }}>{data?.name || DOUBLE_DASH}</p> */}
          </div>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <p >{numberWithCommas(Math.round(data?.amount))}</p>,
      },
    ]
    const columnsNegative =[ 
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <div>
          {UserIdArray?.find((z)=>z==data?._id) || data?._id < getUserInfo?.userId ?<p>{data?.name || DOUBLE_DASH}</p>:<p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
                  setUserIdArray([...UserIdArray, data?._id])
                  if(data?.role == '5'){
                    const newData = {userId:data?._id, marketId:parsData?.marketId, betId:data?.betId}
                    localStorage.setItem('userStatementDetail', JSON.stringify(newData))
                    openNewWindow(`${constRoute?.statementDetail}`)
                  }else{
                    handleDataOfMatchWiseReportData(data?._id)
                  }
            }}>{data?.name || DOUBLE_DASH}</p>
            }
            {/* <p className={style.clickAble} onClick={() => {
              if(data?.role == '5'){
                const newData = {userId:data?._id, marketId:parsData?.marketId}
                localStorage.setItem('userStatementDetail', JSON.stringify(newData))
                openNewWindow(`${constRoute?.statementDetail}`)
              }else{
                handleDataOfMatchWiseReportData(data?._id)
              }
            }}>{data?.name || DOUBLE_DASH}</p> */}
          </div>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <div style={{color: 'red'}}>{numberWithCommas(Math.round(data?.amount))}</div>,
      },
    ]
  useEffect(()=>{
localStorage.setItem('currentLink', '/users')
  }, [])
  const handleChange = (e) => {
    setSearch(e?.target?.value);
  };
  const handleBackLogic = async()=>{
    console.log('this is called of back buuton===', UserIdArray)
    if(UserIdArray?.length>1){
      UserIdArray.pop()
      const lastuserId =  UserIdArray[UserIdArray?.length-1];
    handleDataOfMatchWiseReportData(lastuserId)
    }
  }
  return (
    <>
    <div className={style.mainContainer}>
       <div className={style.container}>
          {/* <div className={style.headerWrapper}><CustomButton customClass={style.btnStyle} title="Back"/><span className={style.eventClass}>{parsData?.Data?.Event}</span><span className={style.userNameDesign} >{parsData?.userName}</span></div> */}
          <TitleBarUpdated isButton={true} btnTitle={'Back'} clickHandler={() => handleBackLogic()} title={<span className={style.userNameDesign} >{parsData?.name}</span>} isRightRibbon={<div className={style.eventHead}>{data>400 ? data>800 ? parsData?.description : truncate(parsData?.description, 24) : truncate(parsData?.description, 18)}</div>}/>
        <Row className={style.mainTableDiv}>
          <Col lg={7} md={10} sm={24} xs={24} className={style.gridOne}>
            <Table
              className={style.positiveClient}
              columns={columns}
              loading={loadingMarketPositions}
              dataSource={positiveValue}
              checkPagination={false}
              footer={() => {
                return (<>
                    <h3 className={style.footerTotal}>{CAP_TOTAL}</h3>
                    <h3 className={style.footerTotal}>
                      { numberWithCommas(Math.round(positiveValue?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}
                    </h3>
                    </>
                );
              }}
            />
          </Col>
          <Col lg={7} md={10} sm={24} xs={24} className={style.gridTwo}>
            <Table
              className={style.negativeClient}
              columns={columnsNegative}
              loading={loadingMarketPositions}
              dataSource={negativeValue}
              checkPagination={false}
              footer={() => {
                return (<>
                    <h3 className={style.footerTotal}>{CAP_TOTAL}</h3>
                    <h3 className={style.footerTotal}>
                    { numberWithCommas(Math.round(negativeValue?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}                    </h3>
                  </>
                );
              }}
            />
          </Col>
        
        </Row>

      </div>
    </div>
    </>
  );
});

export default memo(Statement);
