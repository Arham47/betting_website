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
import { numberWithCommas } from "@utils/common-functions";
// import CustomButton from "@components/common-components/custom-button";
import { useLocation } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import useWindowSize from "@utils/hooks/useWindowSize";
import { CAP_ENTRIES, CAP_SEARCH, CAP_SHOW } from "@utils/const";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

import moment from "moment";

const DailyPlNewReport = observer(() => {
  const {
    user: { loadDailyMatchWiseDetailedData, loadingDailyMatchWiseReportData}, 
  } = useStore(null);
  // const [dailyPLForMinus, setDailyPlForMinus] = useState([])
  // const [dailyPlForPositive, setDailyPlForPositive] = useState([])
  const [positiveValue, setPositiveValue] = useState([])
  const [negativeValue, setNagitiveValue] =  useState([])
  const parsData = JSON.parse(localStorage.getItem('marketShareData'))
  const [UserIdArray, setUserIdArray] =  useState([parsData?.Data?.userId])
  const [entries, setEntries] = useState("10");
  const [options] = useState([10, 25, 50, 100])
  const [search, setSearch] = useState("");
  const [isShowData, setIsShowData] = useState([]);
  const data = useWindowSize().width;
  const [isDetailed, setIsDetailed] = useState(false)
  const [betterDetailed, setIsBetterDetailed] = useState([])
 const [userRecord, setUserRecord] = useState(null)
 const letters= [{type:0, letter: 'B'}, {type:1, letter: 'L'}]
  const location = useLocation();
  const stateData = location.state;
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleDataOfMatchWiseReportData = async(userId)=>{
  const data ={
    id:userId,
    matchId:parsData?.Data?._id
  }
 const res = await loadDailyMatchWiseDetailedData(data) 
  const positive = res?.results?.length ? res?.results?.filter((item)=>item?.amount>=0) : [];
const negative = res?.results?.length ? res?.results?.filter((item)=>item?.amount<0) : [];
setIsDetailed(res?.isDetailed)
setIsBetterDetailed(res?.results)
setUserRecord(res)
setNagitiveValue(negative);
setPositiveValue(positive)
}
useEffect(()=>{
  handleDataOfMatchWiseReportData(parsData?.Data?.userId)
},[])
  const columns =[ 
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <div>
            {UserIdArray?.find((z)=>z==data?._id) ?
            <p>{data?.name || DOUBLE_DASH}</p>:<p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
                  setUserIdArray([...UserIdArray, data?._id])
                  handleDataOfMatchWiseReportData(data?._id)
            }}>{data?.name || DOUBLE_DASH}</p>
            }
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
          {UserIdArray?.find((z)=>z==data?._id)?<p>{data?.name || DOUBLE_DASH}</p>:<p className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
                  setUserIdArray([...UserIdArray, data?._id])
                  handleDataOfMatchWiseReportData(data?._id)
            }}>{data?.name || DOUBLE_DASH}</p>
            }
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
    if(UserIdArray?.length>1){
    const lastuserId =  UserIdArray[UserIdArray?.length-1];
    UserIdArray.pop()
    handleDataOfMatchWiseReportData(lastuserId)
    }
  }
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
   {!isDetailed ?<div className={style.mainContainer}>
       <div className={style.container}>
          {/* <div className={style.headerWrapper}><CustomButton customClass={style.btnStyle} title="Back"/><span className={style.eventClass}>{parsData?.Data?.Event}</span><span className={style.userNameDesign} >{parsData?.userName}</span></div> */}
          <TitleBarUpdated isButton={true} btnTitle={'Back'} clickHandler={() => handleBackLogic()} title={<span className={style.userNameDesign} >{parsData?.userName}</span>} isRightRibbon={<div className={style.eventHead}>{parsData?.Data?.name}</div>}/>
        <Row className={style.mainTableDiv}>
          <Col lg={7} md={10} sm={24} xs={24} className={style.gridOne}>
            <Table
              className={style.positiveClient}
              columns={columns}
              loading={loadingDailyMatchWiseReportData}
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
              loading={loadingDailyMatchWiseReportData}
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
    : 
    (betterDetailed?.length && betterDetailed[0]?.sportsId === "6") ? <div>
         <Row className={style.casinoRow}>
          {betterDetailed?.map((item1, index) => {
            return <>
            <div style={{margin:"0px 8px"}}> 
          <h3>{parsData?.description || "--"}</h3>
        </div>
          <div className={style.mainWrapper}><div>UserName</div><div>{item1?.currentUser || '--'}</div></div>
          <div className={style.mainWrapper}><div>Date</div><div>{item1?.sattledAt ? moment(item1?.sattledAt)?.format("d/mm/yyyy hh:mm:ss a") : '--'}</div></div>
          <div className={style.mainWrapper}><div>Result</div><div>{item1?.result || '--'}</div></div>
          <div className={style.mainWrapper}><div>Bet Amount</div><div>{Math.round(Number(item1?.amount)) || '0'}</div></div>
          <div className={style.mainWrapper}><div>P & L</div><div style={{color:item1?.pl>0 ? "" : 'red'}}>{Math.round(item1?.pl || 0) || "--"}</div></div>
          <div className={style.mainWrapper}><div>Commission</div><div>{Math.round(item1?.commission || 0)}</div></div>
          <div className={style.mainWrapperLast}><div>Net P & L</div><div>{Math.round(item1?.pl || 0) || "--"}</div></div>
            </>
          })}
        
        </Row>
      </div>
   :
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
           <div className={style.rowContentWrapper} style={{color: betterDetailed?.reduce((a, b)=>a + b.pl, 0)>=0 ? '': 'red'}}>{numberWithCommas(Math.round(betterDetailed?.reduce((a, b)=>a + b.pl, 0)))}</div>
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
                       {numberWithCommas(item?.price || 0)}
                     </td>
                     {data > 450 && data <= 850 ? (
                       <td className={style.width9}>{item?.size || '--'}</td>
                     ) : data > 850 && data <= 1170 ? (
                       <>
                         <td className={style.width9}>{item?.size || '--'}</td>
                         <td className={style.width9} style={{background:handleShowColors(item)}}>{handleShowCharacter(item)  || ''}</td>
                         <td className={style.width9} style={{color: item?.pl>=0 ? '': 'red'}}>{numberWithCommas(Math.round(item?.pl))}</td>
                         <td className={style.width9}>
                           {item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD HH:mm:ss a') :'--'}
                         </td>
                         {/* <td className={style.width9}>
                           {item?.matcheAt || 0}
                         </td> */}
                       </>
                     ) : data > 1170 ? (
                       <>
                         <td className={style.width9}>{item?.size || '--'}</td>
                         <td className={style.width10} style={{background:handleShowColors(item)}}>{handleShowCharacter(item)  || ''}</td>
                         <td className={style.width10} style={{color: item?.pl>=0 ? '': 'red'}}>{numberWithCommas(Math.round(item?.pl))}</td>
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
                             {item?.size || '--'}
                           </span>
                         </div>
                         <div className={style.listStyleFont14}>
                           <b>{'Side'}: </b>{" "}
                           <span className={style.paddingLeft10}>
                             {handleShowCharacter(item)  || ''}
                           </span>
                         </div>
                         <div className={style.listStyleFont14}>
                           <b>{'P/L'}:</b>{" "}
                           <span className={style.paddingLeft10} style={{color: item?.pl>=0 ? '': 'red'}}>
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
                             {handleShowCharacter(item)  || ''}
                           </span>
                         </div>
                         <div className={style.listStyleFont14}>
                           <b>{'P/L'}:</b>{" "}
                           <span className={style.paddingLeft10} style={{color: item?.pl>=0 ? '': 'red'}}>
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
    }
    </>
  );
});

export default memo(DailyPlNewReport);
