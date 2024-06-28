/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { useState } from "react";
import Table from "@components/common-components/table";
import {  Col, Row } from "antd";
import style from "../style.module.scss";
import styled from "styled-components";
import useWindowSize from "@utils/hooks/useWindowSize";
import RulesModal from "../rulesModal";
import { BET_DELAY_NUMBER, NUM_STR_5_ROLE } from "@utils/const";
import { formatLargeNumberWithKValues, numberWithCommas, truncate } from "@utils/common-functions";
import { useStore } from "@stores/root-store";
import { FaIdBadge } from "react-icons/fa";
import moment from "moment";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface AllMatchesTableProps {
  tableData?: any;
  loading?: boolean;
  setIsEditStake?: any;
  isEditStake?: any;
  setBetPlayType?: any;
  copyDataOfFakeBets?: any;
  scoreBoard?:any;
  scoreData?:any;
  liveMatchData?: any;
  raceStatus?: any;
  marketIdsForProfitLoss?: any;
  winnerName?:any;
  getMatchBetsData:any;
}

const AllMatchesTable: React.FC<AllMatchesTableProps> = observer(
  ({raceStatus, liveMatchData, setIsEditStake, isEditStake, winnerName, getMatchBetsData, marketIdsForProfitLoss, setBetPlayType, scoreBoard, scoreData, tableData, copyDataOfFakeBets, ...props }) => {
    const innerWidth = useWindowSize().width;
    const [rulesModalOpen, setRulesModalOpen] = useState(false);
    const navigate = useNavigate();
    const {
      user: {
        getUserInfo,
      } } = useStore(null);
      const getTimeDiff = (timeString) => {
        const currentTime = moment();
        const time = moment(timeString); // Convert input string to moment object
      
        if (time.isSameOrAfter(currentTime)) {
          const timeDifferenceMinutes = time.diff(currentTime, 'minutes');
      
          if (timeDifferenceMinutes <= 1) {
            return 'In a minute';
          } else if (timeDifferenceMinutes < 60) {
            return `In ${timeDifferenceMinutes} minutes`;
          } else {
            const days = Math.floor(timeDifferenceMinutes / (60 * 24)); // Calculate days
            const hours = Math.floor((timeDifferenceMinutes % (60 * 24)) / 60);
            const minutes = timeDifferenceMinutes % 60;
      
            if (days === 0) {
              if (hours === 1) {
                return `In ${hours} hour and ${minutes} minutes `;
              } else if (hours > 1) {
                return `In ${hours} hours and ${minutes} minutes `;
              } else {
                return `In ${minutes} minutes `;
              }
            } else {
              return `In ${days} days and ${hours} hours `;
            }
          }
        } else {
          const timeDifferenceMinutes = currentTime.diff(time, 'minutes');
      
          if (timeDifferenceMinutes <= 1) {
            return 'a minute ago';
          } else if (timeDifferenceMinutes < 60) {
            return `${timeDifferenceMinutes} minutes ago`;
          } else {
            const days = Math.floor(timeDifferenceMinutes / (60 * 24)); // Calculate days
            const hours = Math.floor((timeDifferenceMinutes % (60 * 24)) / 60);
            const minutes = timeDifferenceMinutes % 60;
      
            if (days === 0) {
              if (hours === 1) {
                return `${hours} hour and ${minutes} minutes ago`;
              } else if (hours > 1) {
                return `${hours} hours and ${minutes} minutes ago`;
              } else {
                return `${minutes} minutes ago`;
              }
            } else {
              return `${days} days and ${hours} hours ago`;
            }
          }
        }
      };
    const columns = [
      {
        title: "",
        render: (_, data, ind) => {
         return (
           <div>
             {ind === 0 ?<div
               style={{
                 display: "flex",
                 justifyContent: "space-between",
                 padding: 10,
                 borderBottom: "1px solid gray",
                 border: "1px solid gray",
                 gap:50
               }}
             >
             <DateDetailsWrapper>
               <b className="dynamicColorOnHover" style={{fontSize:'1rem', whiteSpace:'nowrap'}}>{liveMatchData?.openDate ? moment(liveMatchData?.openDate)?.format('D MMM, YYYY h:mm A') : ''}</b>
               <span  className="dynamicColorOnHover" style={{fontSize:'1rem'}}>Winners: 1</span>
               {innerWidth <= 800 ? <span  className="dynamicColorOnHover" style={{fontSize:'1rem'}}>{liveMatchData?.openDate ? getTimeDiff(liveMatchData?.openDate) : '-'}</span> : ''}
               </DateDetailsWrapper>
               <BetDelayWrapper>
               <span  className="dynamicColorOnHover" style={{fontSize:'1rem'}}>Bet Delay: {BET_DELAY_NUMBER}</span>
               {innerWidth >= 800 ? <span className="dynamicColorOnHover" style={{fontSize:'1rem'}}>{liveMatchData?.openDate ? getTimeDiff(liveMatchData?.openDate) : '-'}</span> : ''}
               <span className="dynamicColorOnHover" style={{fontSize:'1rem'}}>{tableData?.length ? formatLargeNumberWithKValues(tableData[0]?.totalMatched) : 0}</span>
              </BetDelayWrapper>
             </div> : 
            <div
            style={{
              display: "flex",
              justifyContent: "space-between",
                 borderBottom: "1px solid gray",
                 padding: 10,
            }}
          >
             <b style={{fontSize:'1rem'}} className="dynamicColorOnHover">{data?.marketName}</b>
          </div>
             }
             <div style={{ display: "flex", justifyContent: "space-between" }}>
               <div style={{paddingLeft:6}}>
                 {data?.last_odds?.runners?.map((i, key) => (
                   <CuntriesHeader className="dynamicColorOnHover" key={key} style={{background:i?.runnerName == winnerName ? 'lightgreen' : ''}}>
                     {i?.runnerName}
                     <div  style={{color: marketIdsForProfitLoss?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.SelectionId == i?.SelectionId ? Number(marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss)>0 ? 'green': 'red': '', fontSize: '12px', fontWeight:'bold'}}>
                    {marketIdsForProfitLoss?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.SelectionId == i?.SelectionId ? getMatchBetsData?.some((z) => z?.marketId == marketIdsForProfitLoss[ind]?.last_odds?.marketId) ? marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss ? Math.floor(Number(marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss)) : '0' : '' : ''}
                    </div>
                   </CuntriesHeader>
                 ))}
               </div>
               <div style={{ display: "flex", width:'50%' }}>
                 <div  style={{width:'50%'}}>
                   <div>
                     {data?.last_odds?.runners?.map((value, indexs) => {
                       if (value?.Status === "ACTIVE") {
                         return (
                           <div
                             style={{
                               display: "flex",
                               height: 49,
                               background: "#8DD2F0",
                               justifyContent:value?.ExchangePrices?.AvailableToBack === 3 ? 'center' : 'right'
                             }}
                           >
                             {innerWidth > 890
                               ?value?.ExchangePrices?.AvailableToBack?.length ?   [...value?.ExchangePrices?.AvailableToBack]?.reverse()?.map(
                                   (item, index) => {
                                     return (
                                       <BackValueWrraper
                                         className={
                                           copyDataOfFakeBets?.length &&
                                           copyDataOfFakeBets[ind]?.runners
                                             ?.length &&
                                             copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.ExchangePrices?.AvailableToBack&&
                                           [...copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToBack]?.reverse()[
                                             index
                                           ]?.price !== item?.price||
                                           copyDataOfFakeBets?.length &&
                                           copyDataOfFakeBets[ind]?.runners
                                             ?.length &&
                                             copyDataOfFakeBets[ind]?.runners[
                                              indexs
                                            ]?.ExchangePrices?.AvailableToBack&&
                                           [...copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToBack]?.reverse()[
                                             index
                                           ]?.size !== item?.size
                                             ? style.changeBackground
                                             : ""
                                         }
                                         onClick={() => {
                                           if (
                                             getUserInfo?.role ===
                                             NUM_STR_5_ROLE
                                           ) {
                                             setIsEditStake({
                                               ...isEditStake,
                                               status: true,
                                               val: item?.price,
                                               runnerName: value?.runnerName,
                                             });
                                             setBetPlayType(1);
                                           }
                                         }}
                                         bg={"#8DD2F0"}
                                         hoverBg={"#8DD2F0"}
                                       >
                                         <BackValues>
                                           {item?.price ? item?.price : ''}
                                         </BackValues>
                                         <TotalValues>
                                           {item?.size
                                             ? formatLargeNumberWithKValues(item?.size, 1)
                                                 ?.toString()
                                                 ?.replace(".0", "")
                                             : ""}
                                         </TotalValues>
                                       </BackValueWrraper>
                                     );
                                   }
                                 ):''
                               : value?.ExchangePrices?.AvailableToBack?.slice(
                                   0,
                                   1
                                 )?.map((item, index) => {
                                   return (
                                     <BackValueWrraper
                                       className={
                                        copyDataOfFakeBets?.length &&
                                        copyDataOfFakeBets[ind]?.runners
                                          ?.length &&
                                          copyDataOfFakeBets[ind]?.runners[
                                           indexs
                                         ]?.ExchangePrices?.AvailableToBack&&
                                        copyDataOfFakeBets[ind]?.runners[
                                          indexs
                                        ]?.ExchangePrices?.AvailableToBack[
                                          index
                                        ]?.price !== item?.price||
                                        copyDataOfFakeBets?.length &&
                                        copyDataOfFakeBets[ind]?.runners
                                          ?.length &&
                                          copyDataOfFakeBets[ind]?.runners[
                                           indexs
                                         ]?.ExchangePrices?.AvailableToBack&&
                                        copyDataOfFakeBets[ind]?.runners[
                                          indexs
                                        ]?.ExchangePrices?.AvailableToBack[
                                          index
                                        ]?.size !== item?.size
                                           ? style.changeBackground
                                           : ""
                                       }
                                       onClick={() => {
                                         if (
                                           getUserInfo?.role === NUM_STR_5_ROLE
                                         ) {
                                           setIsEditStake({
                                             ...isEditStake,
                                             status: true,
                                             val: item?.price,
                                             runnerName: value?.runnerName,
                                           });
                                           setBetPlayType(1);
                                         }
                                       }}
                                       bg={"#8dd2f0"}
                                       hoverBg={"#8DD2F0"}
                                       valuesWidth={'100%'}
                                     >
                                       <BackValues>
                                         {item?.price ? item?.price : ''}
                                       </BackValues>
                                       <TotalValues>
                                         {item?.size
                                           ? formatLargeNumberWithKValues(item?.size, 1)
                                               ?.toString()
                                               ?.replace(".0", "")
                                           : ""}
                                       </TotalValues>
                                     </BackValueWrraper>
                                   );
                                 })}
                           </div>
                         );
                       } else {
                         return (
                           <div
                             style={{
                               height: 48,
                               background: "#ececed",
                               width: "200%",
                               marginTop: 2,
                               display: "flex",
                               justifyContent: "center",
                               alignItems: "center",
                             }}
                           >
                             <div
                               style={{
                                 color: "red",
                                 textAlign: "center",
                                 position: "absolute",
                                 fontSize:'1rem'
                               }}
                             >
                               {value?.Status}
                             </div>
                           </div>
                         );
                       }
                     })}
                   </div>
                 </div>

                 <div  style={{width:'50%'}}>
                   <div>
                     {data?.last_odds?.runners?.map((value, indexs) => {
                       if (value?.Status === "ACTIVE") {
                         return (
                           <div
                             style={{
                               display: "flex",
                               height: 49,
                               background: "#FFAFB2",
                               justifyContent:value?.ExchangePrices?.AvailableToLay === 3 ? 'center' : 'left'
                             }}
                           >
                             {innerWidth > 890
                               ? value?.ExchangePrices?.AvailableToLay?.map(
                                   (item, index) => {
                                     return (
                                       <BackValueWrraper
                                         className={
                                          copyDataOfFakeBets?.length &&
                                          copyDataOfFakeBets[ind]?.runners
                                            ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToLay&&
                                          copyDataOfFakeBets[ind]?.runners[
                                            indexs
                                          ]?.ExchangePrices?.AvailableToLay[
                                            index
                                          ]?.price !== item?.price||
                                          copyDataOfFakeBets?.length &&
                                          copyDataOfFakeBets[ind]?.runners
                                            ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToLay&&
                                          copyDataOfFakeBets[ind]?.runners[
                                            indexs
                                          ]?.ExchangePrices?.AvailableToLay[
                                            index
                                          ]?.size !== item?.size
                                             ? style.changeBackground
                                             : ""
                                         }
                                         onClick={() => {
                                           if (
                                             getUserInfo?.role ===
                                             NUM_STR_5_ROLE
                                           ) {
                                             setIsEditStake({
                                               ...isEditStake,
                                               status: true,
                                               val: item?.price,
                                               runnerName: value?.runnerName,
                                             });
                                             setBetPlayType(0);
                                           }
                                         }}
                                         bg={"#FFAFB2"}
                                         hoverBg={"#FFAFB2"}
                                       >
                                         <BackValues>
                                           {item?.price ? item?.price : ''}
                                         </BackValues>
                                         <TotalValues>
                                           {item?.size
                                             ? formatLargeNumberWithKValues(item?.size, 1)
                                                 ?.toString()
                                                 ?.replace(".0", "")
                                             : ""}
                                         </TotalValues>
                                       </BackValueWrraper>
                                     );
                                   }
                                 )
                               : value?.ExchangePrices?.AvailableToLay?.slice(
                                   0,
                                   1
                                 )?.map((item, index) => {
                                   return (
                                     <BackValueWrraper
                                       className={
                                        copyDataOfFakeBets?.length &&
                                          copyDataOfFakeBets[ind]?.runners
                                            ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToLay&&
                                          copyDataOfFakeBets[ind]?.runners[
                                            indexs
                                          ]?.ExchangePrices?.AvailableToLay[
                                            index
                                          ]?.price !== item?.price||
                                          copyDataOfFakeBets?.length &&
                                          copyDataOfFakeBets[ind]?.runners
                                            ?.length &&
                                            copyDataOfFakeBets[ind]?.runners[
                                             indexs
                                           ]?.ExchangePrices?.AvailableToLay&&
                                          copyDataOfFakeBets[ind]?.runners[
                                            indexs
                                          ]?.ExchangePrices?.AvailableToLay[
                                            index
                                          ]?.size !== item?.size
                                           ? style.changeBackground
                                           : ""
                                       }
                                       onClick={() => {
                                         if (
                                           getUserInfo?.role === NUM_STR_5_ROLE
                                         ) {
                                           setIsEditStake({
                                             ...isEditStake,
                                             status: true,
                                             val: item?.price,
                                             runnerName: value?.runnerName,
                                           });
                                           setBetPlayType(0);
                                         }
                                       }}
                                       bg={"#FFAFB2"}
                                       hoverBg={"#FFAFB2"}
                                       valuesWidth={'100%'}
                                     >
                                       <BackValues>
                                         {item?.price ? item?.price : ''}
                                       </BackValues>
                                       <TotalValues>
                                         {item?.size
                                           ? formatLargeNumberWithKValues(item?.size, 1)
                                               ?.toString()
                                               ?.replace(".0", "")
                                           : ""}
                                       </TotalValues>
                                     </BackValueWrraper>
                                   );
                                 })}
                           </div>
                         );
                       } else{
                        return <div   style={{
                          height: 48,
                          background: "#ececed",
                          width: "100%",
                          marginTop: 2,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}></div>
                      }
                     })}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         );
      },
      },
    ];

    return (
      <MainTableWrraper>
         <Row className={style.eventHeader}>
          <TitleBarUpdated title={<span className={style.mainSpan}> { `${innerWidth>700 ? liveMatchData?.name : truncate(liveMatchData?.name, 36)|| ''} - Match Odds`} <span>{raceStatus===null ?liveMatchData?.status:  raceStatus?.inplay?" Inplay " : "CLOSED"}</span><span className={style.userIcon}><FaIdBadge onClick={() => {
            navigate(`${constRoute?.userBookSoccer}?id=${liveMatchData?._id}`, { state: liveMatchData });
            const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
            localStorage.setItem('userBookEvent', JSON.stringify({...otherEvents, soccer:liveMatchData?.name}))
            }}/></span>
          </span>}/>
        </Row> 
        <Row className={style.detailsWrraperRow}>
             {scoreData?.score!==null ?  <Col md={24} lg={24} xxl={24} className={style.detailsWrraper}>
              <div className={style.timeDetilSection}>
                    <div><b>{scoreData?.score?.home?.name || ''}</b><b>{scoreData?.score?.home?.score || ''}</b></div>
                    <div><b>Time</b><b>{scoreData?.timeElapsed || ""}</b></div>
                    <div><b>{scoreData?.score?.away?.name || ''}</b><b>{scoreData?.score?.away?.score || ''}</b></div>
              </div>
              </Col> : ''}
            </Row>
        <Table
          loading={props?.loading}
          checkPagination={false}
          dataSource={tableData}
          columns={columns}
          showHeader={false}
        />
        <RulesModal
          open={rulesModalOpen}
          title={"Market Rules"}
          setOpen={setRulesModalOpen}
        />
      </MainTableWrraper>
    );
  }
);

export default AllMatchesTable;

const MainTableWrraper = styled.div`
  width: 100%;
`;
const BackValueWrraper = styled.span<{valuesWidth?:any, bg?: string; hoverBg?: string }>`
  width: ${(p) => (p?.valuesWidth ? p?.valuesWidth : '30%')};
  margin-left: 5px;
  margin-top: 3px;
  // height: 50px;
  display: flex;
  color: #121212;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  background-color: ${(p) => (p?.bg ? p?.bg : "#eeee")};
  .changeBackground {
    
      background-color: yellow !important;
      transition: background-color 0.5s !important;
    
  }
  &:hover {
    background-color: ${(p) => p.hoverBg};
    cursor: pointer;
  }
`;

const BackValues = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #121212;
`;
const CuntriesHeader = styled.p`
font-size: 1rem;
height: 50px;
margin: 0px;
padding-left:4px;
display: flex;
flex-direction: column;
// align-items:center;
justify-content: center;
// color: #121212;
`;
const TotalValues = styled.span`
  color: #121212;
`;
const DateDetailsWrapper = styled.div`
display:flex;
column-gap:16px;
row-gap:4px;
justify-content:space-between;
width:50%;
@media screen and (max-width: 520px){
  flex-direction:column;
}
`
const BetDelayWrapper = styled.div`
display:flex;
column-gap:16px;
justify-content:space-between;
width:50%;
@media screen and (max-width: 800px){
  flex-direction:column;
  align-items:flex-end;
}
`;