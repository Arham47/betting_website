/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  // CAMEL_USER_NAME,
  // CAP_AMOUNT,
  // CAP_NAME,
  // CAP_TOTAL,
  DOUBLE_DASH,
} from "@utils/const";
import { Col, Row } from "antd";
// import Table from "@components/common-components/table";
import { useStore } from "@stores/root-store";
import { numberWithCommas } from "@utils/common-functions";
// import CustomButton from "@components/common-components/custom-button";
// import { useLocation } from "react-router-dom";
// import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import useWindowSize from "@utils/hooks/useWindowSize";
import { CAP_ENTRIES, CAP_SEARCH, CAP_SHOW } from "@utils/const";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import moment from "moment";
const ProfitLossDetail = observer(() => {
  const {
    user: { loadDailyMatchWiseprofitLose}, 
  } = useStore(null);
  // const [dailyPLForMinus, setDailyPlForMinus] = useState([])
  // const [dailyPlForPositive, setDailyPlForPositive] = useState([])
  // const [positiveValue, setPositiveValue] = useState([])
  // const [negativeValue, setNagitiveValue] =  useState([])
  // const [UserIdArray, setUserIdArray] =  useState([parsData?.Data?.userId])
  const [entries, setEntries] = useState("10");
  const [options] = useState([10, 25, 50, 100])
  const [search, setSearch] = useState("");
  const [isShowData, setIsShowData] = useState([]);
  const data = useWindowSize().width;
  // const [isDetailed, setIsDetailed] = useState(false)
  const [betterDetailed, setIsBetterDetailed] = useState([])
 const [userRecord, setUserRecord] = useState(null)
 const letters= [{type:0, letter: 'B'}, {type:1, letter: 'L'}]
const adminProfitLossData = JSON.parse(localStorage.getItem('adminProfitLoss'))
  console.warn("adminProfitLossData", adminProfitLossData)
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleDataOfMatchWiseReportData = async()=>{
  const data ={
    id: adminProfitLossData?.Data?.userId,
    matchId:adminProfitLossData?.Data?._id
  }
const res =   await loadDailyMatchWiseprofitLose(data)
// const positive =  res?.results?.filter((item)=>item?.amount>=0)
// const negative =  res?.results?.filter((item)=>item?.amount<0)
// setNagitiveValue(negative);
// setPositiveValue(positive);
// setIsDetailed(res?.isDetailed)
setIsBetterDetailed(res?.results)
setUserRecord(res)
console.warn("res****", res)
}
useEffect(()=>{
  handleDataOfMatchWiseReportData()
},[])
  // const columns =[ 
  //     {
  //       title: CAP_NAME,
  //       dataIndex: CAMEL_USER_NAME,
  //       render: (_, data) => (
  //         <div>
  //           {UserIdArray?.find((z)=>z==data?._id) ?
  //           <p>{data?.name || DOUBLE_DASH}</p>:<p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
  //              setUserIdArray([...UserIdArray, data?._id])
  //              handleDataOfMatchWiseReportData(data?._id)
  //           }}>{data?.name || DOUBLE_DASH}</p>}
  //         </div>
  //       ),
  //     },
  //     {
  //       title: CAP_AMOUNT,
  //       render: (_, data) => <p >{numberWithCommas(data?.amount)}</p>,
  //     },
  //   ]
    // const columnsNegative =[ 
    //   {
    //     title: CAP_NAME,
    //     dataIndex: CAMEL_USER_NAME,
    //     render: (_, data) => (
    //       <div>
    //        {UserIdArray?.find((z)=>z==data?._id) ?
    //         <p>{data?.name || DOUBLE_DASH}</p>: <p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
    //            setUserIdArray([...UserIdArray, data?._id])
    //            handleDataOfMatchWiseReportData(data?._id)
    //         }}>{data.name || DOUBLE_DASH}</p>}
    //       </div>
    //     ),
    //   },
    //   {
    //     title: CAP_AMOUNT,
    //     render: (_, data) => <div style={{color: 'red'}}>{numberWithCommas(data?.amount)}</div>,
    //   },
    // ]
  useEffect(()=>{
localStorage.setItem('currentLink', '/users')
  }, [])
  const handleChange = (e) => {
    setSearch(e?.target?.value);
  };
  // const handleBackLogic = async()=>{
  //   if(UserIdArray?.length>1){
  //   const lastuserId =  UserIdArray[UserIdArray?.length-1];
  //   UserIdArray.pop()
  //   handleDataOfMatchWiseReportData(lastuserId)
  //   }
  // }
  const handleShowCharacter = (item) => {
    if (item?.isfancyOrbookmaker && item?.fancyData) {
      if (item?.type == 1) return "Yes";
      else return "No";
    }
    else if (item?.type == 0) return "B";
    else if (item?.type == 1) return "L";
    else if (item?.type == 2) return "Figure";
    else if (item?.type == 4) {
      if (item?.name?.toLowerCase()?.includes("chota")) return "CHOTA";
      else return "BARA";
    } else if (item?.type == 3) {
      if (item?.name?.toLowerCase()?.includes("jotta")) return "JOTTA";
      else return "KALI";
    }
  };

  const handleShowColors = (item) => {
    if (item?.isfancyOrbookmaker && item?.fancyData) {
      if (item?.type == 1) return "#17A2B8";
      else return "#DC3545";
    }
    else{
      if(item?.type == 1) return "#DC3545";
      else return "#17A2B8";
    }
  };

  return (
    <>
    <div className={style.mainWrraperBetterTable}>
    <Row gutter={[4, 4]}>
      <Col lg={8} md={7} xs={24}>
        <div className={style.rowOne}>
          <div>Winner</div>
          <div className={style.rowContentWrapper}>{userRecord?.Winner|| ''}</div>
        </div>
      </Col>
      <Col lg={8} md={7} xs={24}>
        <div className={style.rowOne}>
          <div>Net PL</div>
          <div className={style.rowContentWrapper} style={{color: betterDetailed?.reduce((a, b)=>a + b.pl, 0)>=0 ? '' : 'red'}}>{numberWithCommas(Math.round(betterDetailed?.reduce((a, b)=>a + b.pl, 0)))}</div>
        </div>
      </Col>
      <Col lg={8} md={10} xs={24}>
        <div className={style.rowOne}>
          <div>userName:</div>
          <div className={style.rowContentWrapper}>{userRecord?.currentUser||''}</div>
        </div>
      </Col>
    </Row>
    <div className={style.flexMargin}>
      <div>
      <div className={style.entriesData}>
            <label>{CAP_SHOW} </label>
            <select
              className={style.inputHeight}
              id="entries"
              value={entries}
              onChange={(e) => {
                setEntries(e?.target?.value);
              }}
            >
              {options.map((item) => {
                return (
                  <option
                    label={item?.toString()}
                    className={style.inputColor}
                  >
                    {item}{" "}
                  </option>
                );
              })}
            </select>
            <label> {CAP_ENTRIES}</label>
          </div>
      </div>
      <div>
      <div className={style.entriesData}>
        <label>{CAP_SEARCH}: </label>
        <input
          value={search}
          className={style.inputHeight}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      </div>
    </div>
    <div className={style.tableWrapperClass}>
    <table className={style.newtable}>
        <thead>
          <tr className={style.theadUnColor}>
            <th className={style.width16}>Runner</th>
            <th className={style.width9}>Price</th>
            {data > 450 && data <= 850 ? (
              <>
                <th className={style.width9}>{'Size'}</th>
              </>
            ) : data > 850 && data <= 1170 ? (
              <>
                {" "}
                <th className={style.width9}>{'Size'}</th>
                <th className={style.width9}>{'Side'}</th>
                <th className={style.width9}>{'P/L'}</th>
                <th className={style.width9}>{'PlaceAt'}</th>
                {/* <th className={style.width9}>{'Matched At'}</th> */}
              </>
            ) : data > 1170 ? (
              <>
                <th className={style.width9}>{'Size'}</th>
                <th className={style.width10}>{'Side'}</th>
                <th className={style.width10}>{'P/L'}</th>
                <th className={style.width10}>{'PlaceAt'}</th>
                {/* <th className={style.width10}>{'Matched At'}</th> */}
                <th className={style.width10}>{'Settled At'}</th>
                <th className={style.width20}>{'Customer'}</th>
                <th className={style.width20}>{'Dealer'}</th>
                <th className={style.width20}>{'Order-ID'}</th>
                {/* <th className={style.width20}>{'fullOdds'}</th> */}
              </>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          { betterDetailed?.length ? (
            betterDetailed?.map((item, index) => {
              return (
                <>
                  {" "}
                  <tr key={index}>
                    <td className={style.onlyWidth16}>
                      <div className={style.userNameWrapper}>
                      {data<1170 ? <div className={style.tooltipWrraper}>
                          {isShowData?.find( (z) => z === item?._id) ? <BiMinusCircle className={style.minusIcon}
                            style={{ fontSize: "15px" }}
                            onClick={() => {
                              const data = isShowData?.find(
                                (z) => z === item?._id
                              );
                              if (data) {
                                const filterData = isShowData?.filter(
                                  (z) => z !== item?._id
                                );
                                setIsShowData(filterData);
                              } else {
                                setIsShowData([...isShowData, item?._id]);
                              }
                            }}
                          />:
                          <BiPlusCircle className={style.plusIcon}
                            style={{ fontSize: "15px" }}
                            onClick={() => {
                              const data = isShowData?.find(
                                (z) => z === item?._id
                              );
                              if (data) {
                                const filterData = isShowData?.filter(
                                  (z) => z !== item?._id
                                );
                                setIsShowData(filterData);
                              } else {
                                setIsShowData([...isShowData, item?._id]);
                              }
                            }}
                          />
                          }
                        </div> : ''}
                        <div
                        >
                            {item?.name || DOUBLE_DASH}
                        </div>
                        
                      </div>
                    </td>
                    <td className={style.width9}>
                      {numberWithCommas(item?.price)}
                    </td>
                    {data > 450 && data <= 850 ? (
                      <td className={style.width9}>{item?.size}</td>
                    ) : data > 850 && data <= 1170 ? (
                      <>
                        <td className={style.width9}>{item?.size}</td>
                        <td className={style.width9} style={{background:handleShowColors(item)}}>{handleShowCharacter(item) || ''}</td>
                        <td className={style.width9} style={{color: item?.pl>=0 ? '' : 'red'}}>{numberWithCommas(Math.round(item?.pl))}</td>
                        <td className={style.width9}>
                          {item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD HH:mm:ss a') :'--'}
                        </td>
                        {/* <td className={style.width9}>
                          {item?.matcheAt || 0}
                        </td> */}
                      </>
                    ) : data > 1170 ? (
                      <>
                        <td className={style.width9}>{item?.size}</td>
                        <td className={style.width10} style={{background:handleShowColors(item)}}>{handleShowCharacter(item) || ''}</td>
                        <td className={style.width10} style={{color: item?.pl>=0 ? '' : 'red'}}>{numberWithCommas(Math.round(item?.pl))}</td>
                        <td className={style.width10}>
                          {item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD HH:mm:ss a') :'--'}
                        </td>
                        {/* <td className={style.width10}>
                          {item?.matcheAt || 0}
                        </td> */}
                        <td className={style.width10}>
                          {item?.sattledAt ? moment(new Date(item?.sattledAt)).format('YYYY-MM-DD HH:mm:ss a') :'--' }
                        </td>
                        <td className={style.width20}>
                          <div className={style.userIcons}>
                            {userRecord?.currentUser}
                          </div>
                        </td>
                        <td className={style.width20}>
                          <div className={style.userIcons}>
                            {userRecord?.dealer}
                          </div>
                        </td> <td className={style.width20}>
                          <div className={style.userIcons}>
                            {item?._id}
                          </div>
                        </td> 
                        {/* <td className={style.width20}>
                          <div className={style.userIcons}>
                            {item?.fullod}
                          </div>
                        </td> */}
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                  {isShowData?.find((z) => z === item?._id) && data < 450 ? (
                    <tr>
                      {" "}
                      {/* <ul className={style.paddingLeft22}> */}
                        <div className={style.listStyleFont14}>
                          <b>{'Size'}: </b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.size}
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <b>{'Side'}: </b>{" "}
                          <span className={style.paddingLeft10}>
                            {handleShowCharacter(item) || ''}
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <b>{'P/L'}:</b>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.pl>=0 ? '' : 'red'}}>
                            {numberWithCommas(Math.round(item?.pl))}
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <b>{'PlaceAt'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD HH:mm:ss a') :'--'  }</span>
                        </div>
                        {/* <div className={style.listStyleFont14}>
                          <b>{'Matched At'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.matcheAt}
                          </span>
                        </div> */}
                        <div className={style.listStyleFont14}>
                          <b>{'Settled At'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.sattledAt ? moment(new Date(item?.sattledAt)).format('YYYY-MM-DD HH:mm:ss a') :'--' }
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Customer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.currentUser}
                            </div>
                          </div>
                        </div>

                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Dealer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.dealer}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Order-ID'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?._id}
                            </div>
                          </div>
                        </div>
                        {/* <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'FullOdds'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?.fullod}
                            </div>
                          </div>
                        </div> */}
                      {/* </ul> */}
                    </tr>
                  ) : isShowData?.find((z) => z === item?._id) &&
                    data <= 850 ? (
                    <tr>
                      {" "}
                      <td colSpan={3}>
                        <div className={style.listStyleFont14}>
                          <b>{'Side'}: </b>{" "}
                          <span className={style.paddingLeft10}>
                            {handleShowCharacter(item) || ''}
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <b>{'P/L'}:</b>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.pl>=0 ? '' : 'red'}}>
                            {numberWithCommas(Math.round(item?.pl))}
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <b>{'PlaceAt'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD HH:mm:ss a') :'--'}</span>
                        </div>
                        {/* <div className={style.listStyleFont14}>
                          <b>{'Matched At'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.matcheAt}
                          </span>
                        </div> */}
                        <div className={style.listStyleFont14}>
                          <b>{'Settled At'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.sattledAt ? moment(new Date(item?.sattledAt)).format('YYYY-MM-DD HH:mm:ss a') :'--' }
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Customer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.currentUser}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Dealer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.dealer}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Order-ID'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?._id}
                            </div>
                          </div>
                        </div>
                        {/* <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'FullOdds'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?.fullod}
                            </div>
                          </div>
                        </div> */}
                      </td>
                    </tr>
                  ) : isShowData?.find((z) => z === item?._id) &&
                    data <= 1170 ? (
                    <tr>
                      {" "}
                      <td colSpan={7}>
                        <div className={style.listStyleFont14}>
                          <b>{'Settled At'}:</b>{" "}
                          <span className={style.paddingLeft10}>
                            {item?.sattledAt ? moment(new Date(item?.sattledAt)).format('YYYY-MM-DD HH:mm:ss a') :'--' }
                          </span>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Customer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.currentUser}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Dealer'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {userRecord?.dealer}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <b> {'Order-ID'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?._id}
                            </div>
                          </div>
                        </div>
                        <div className={style.listStyleFont14}>
                          {/* <div className={style.listStyleOption}>
                            <b> {'FullOdds'}:</b>
                            {"   "}
                            <div
                              style={{ display: "flex" }}
                              className={style.userIcons}
                            >
                              {item?.fullod}
                            </div>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </>
              );
            })
          ) : (
            <td
              style={{ border: "none" }}
              colSpan={data > 1170 ? 9 : data > 850 ? 7 : data > 450 ? 3 : 5}
            >
              <div className={style.noRecordClass}>No Records</div>
            </td>
          )}
        </tbody>
      </table>
      </div>
  </div>
    </>
  );
});

export default memo(ProfitLossDetail);
