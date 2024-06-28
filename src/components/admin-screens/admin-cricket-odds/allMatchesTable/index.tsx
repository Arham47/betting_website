/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import {useState } from "react";
import Table from "@components/common-components/table";
import { Checkbox, Row } from "antd";
import style from "../style.module.scss";
import styled from "styled-components";
import useWindowSize from "@utils/hooks/useWindowSize";
import RulesModal from "../rulesModal";
import {BET_DELAY_NUMBER, NUM_STR_5_ROLE } from "@utils/const";
import { formatLargeNumberWithKValues, numberWithCommas, truncate} from "@utils/common-functions";
import { useStore } from "@stores/root-store";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import FullBookModel from "../FullBookModel";
import moment from "moment";
import { FaIdBadge } from "react-icons/fa";
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
  liveScoreData?: any;
  liveMatchData?: any;
  isFancyBooker?:any;
  raceStatus?: any;
  marketIdsForProfitLoss?: any;
  fancyProfitLoss?:any;
  bookMakerForProfitLoss?:any;
  getMatchBetsData?:any;
  currentPositinProfitLoss?: any;
}

const AllMatchesTable: React.FC<AllMatchesTableProps> = observer(
  ({
    currentPositinProfitLoss,
    liveScoreData,
    setIsEditStake,
    isEditStake,
    setBetPlayType,
    tableData,
    copyDataOfFakeBets,
    liveMatchData,
    isFancyBooker,
    raceStatus,
    marketIdsForProfitLoss,
    fancyProfitLoss,
    bookMakerForProfitLoss,
    getMatchBetsData,
    ...props
  }) => {
    const innerWidth = useWindowSize().width;
    const [isOpenFullBook, setisOpenFullBook] = useState(false);
    const [rulesModalOpen, setRulesModalOpen] = useState(false);
    const [titleModel, setTitleModel] = useState("");
    const [filterData, setFilterData] = useState(null)

    const navigate = useNavigate();
    // console.log('liveMatchData', liveMatchData)
    const {
      user: { getUserInfo },
      bet: {
        getMatchedBetsData,
      },
    } = useStore(null);

    const calculateRrrCrr = (matchType, targetScore, rrr, crr) => {
      if (matchType === "TEST") {
        return `CRR ${crr}`;
      } else {
        if (targetScore) {
          if (rrr) {
            return `  RRR ${rrr}`;
          } else {
            return `  CRR ${crr}`;
          }
        } else {
          return `  CRR ${crr}`;
        }
      }
    };

    const onChange = (e: CheckboxChangeEvent) => {
    };
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
    const targetHandler = (data) => {
      if (!data) return '';
      
      if(data?.score?.spnmessage){
        if(data?.score?.activenation1 == 1) {
          const team1Score = parseInt(data?.score?.score2?.split('-')[0]) +1 ;
          return `Target: ${team1Score}`
        }else if(data?.score?.activenation2 == 1){
          const team2Score = parseInt(data?.score?.score1?.split('-')[0]) +1 ;
          return `Target: ${team2Score}`
        }
      }
    };
    const columns = [
      {
        title: "",
        render: (_, data, ind) => {
          return (
            <div>
              {data?.marketName === "Match Odds" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 4,
                    borderBottom: "1px solid gray",
                    borderTop: "1px solid gray",
                  }}
                >
                  {isFancyBooker ? "" : <Checkbox onChange={onChange}>
                    <b
                      style={{ fontSize: "1rem", color: "red" }}
                      className="dynamicColorOnHover"
                    >
                      Over
                    </b>
                  </Checkbox>}
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                      <span style={{display:'flex', gap:8}}>
                        <b>{liveScoreData?.score?.spnnation2 || ''}</b>
                        <b>{liveScoreData?.score?.score2 || ''}</b>
                        <b>{liveScoreData?.score?.activenation1 === 1 ? liveScoreData?.score?.spnreqrate1 : liveScoreData?.score?.spnreqrate2}</b>
                      </span>
                      <span style={{display:'flex', gap:8}}>
                        <b>{liveScoreData?.score?.spnnation1 || ''}</b>
                        <b>{liveScoreData?.score?.score1 || ''}</b>
                        <b>{liveScoreData?.score?.activenation1 === 1 ? liveScoreData?.score?.spnrunrate1 : liveScoreData?.score?.spnrunrate2}</b>
                      </span>
                      <span style={{display:'flex', gap:8}}>
                      <b>{targetHandler(liveScoreData)}</b>
                      </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {data?.marketName === "Match Odds" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 6,
                    borderTop: "1px solid gray",
                    gap:6
                  }}
                >
                  <b
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {moment(liveMatchData?.openDate)?.format("D MMM, YYYY h:mm a")}{" "}
                  </b>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    Winners: 1
                  </span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    Bet Delay: {BET_DELAY_NUMBER}
                  </span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {liveMatchData?.openDate ? getTimeDiff(liveMatchData?.openDate) : '-'}
                  </span>
                  <span
                    className="dynamicColorOnHover"
                    style={{ fontSize: "1rem" }}
                  >
                    {formatLargeNumberWithKValues(data?.totalMatched || 0)}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottom: "1px solid gray",
                  }}
                >
                  {" "}
                  <b
                    style={{ fontSize: "1rem" }}
                    className="dynamicColorOnHover"
                  >
                    {data?.marketName}
              {data?.marketName === "Fancy" ? <span style={{fontSize:10, fontStyle:'italic', color:'brown', paddingLeft:2}}>(0 commission)</span> : ''}
                  </b>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {data?.last_odds?.runners?.map((i, key) => (
                    <CuntriesHeader style={{whiteSpace: 'nowrap'}} className="dynamicColorOnHover" key={key}>
                      {(innerWidth > 500) ?truncate(i?.runnerName, 40) : truncate(i?.runnerName, 20)}
                      <div >{data?.marketName !== "Fancy" ? 
                       data?.marketName === "Bookmaker" ? 
                       <span style={{color:
                         bookMakerForProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss?.toFixed(0)>0 ? 'green' : 'red', fontSize: '12px', fontWeight:'bold'}}>
                         {getMatchBetsData?.some((z) => z?.isfancyOrbookmaker && z?.fancyData == null) ? bookMakerForProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss ? Math.round(Number(bookMakerForProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss)) : '0' : ''}
                       </span>
                       :
                       <span style={{color:
                        marketIdsForProfitLoss?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.SelectionId == i?.SelectionId ? Number(marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss)>0 ? 'green' : 'red' : '', fontSize: '12px', fontWeight:'bold'}}>
                        {marketIdsForProfitLoss?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners?.length && marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.SelectionId == i?.SelectionId ? getMatchBetsData?.some((z) => z?.marketId == marketIdsForProfitLoss[ind]?.last_odds?.marketId) ? marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss ? Math.round(Number(marketIdsForProfitLoss[ind]?.last_odds?.runners[key]?.profitLoss)) : '0' : '' : ''}
                      </span>
                  :data?.marketName === "Fancy" ? 
                      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <div  style={{color: getMatchBetsData?.some((z) => z?.isfancyOrbookmaker && z?.fancyData == i?.runnerName)  &&fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss?.toFixed(0)>0? 'green': 'red', fontSize: '12px', fontWeight:'bold'}}>
                        {getMatchBetsData?.some((z) => z?.isfancyOrbookmaker && z?.fancyData == i?.runnerName) ? fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss ? Math.round(Number(fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss)) : '0' : ''}
                          </div>
                        <div  style={{color:getMatchBetsData?.some((z) => z?.isfancyOrbookmaker && z?.fancyData == i?.runnerName) && fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss2?.toFixed(0)>0 ? 'green' : 'red', fontSize: '12px', fontWeight:'bold'}}>
                        {getMatchBetsData?.some((z) => z?.isfancyOrbookmaker && z?.fancyData == i?.runnerName) ? fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss2 ? Math.round(Number(fancyProfitLoss?.find((item) =>item?.SelectionId == i?.SelectionId)?.profitLoss2)) : '0' : ''}
                        </div>
                          <LinkWrapper
                          style={{ color: "#2366AD" }}
                          onClick={() => {
                            const filterDataCurrentPosition = currentPositinProfitLoss?.filter((item)=>item?.runner==i?.SelectionId)
                            console.warn('filterDataCurrentPosition', filterDataCurrentPosition)
                            const datafilter =  getMatchedBetsData?.filter((item)=>item?.runner==i?.SelectionId)
                            filterDataCurrentPosition?.forEach(element => {
                              if(element?.type==0){
                               element['totalWinningAmount'] = element?.maxWinningAmount
                               element['totalLoosingAmount'] = element?.loosingAmount
                              }
                               else{
                                element['totalWinningAmount'] =  element?.maxWinningAmount
                                element['totalLoosingAmount'] =  element?.loosingAmount
                              }  
                            })
                            setFilterData(filterDataCurrentPosition)
                            setTitleModel(i?.runnerName);
                            setisOpenFullBook(true);
                          }}
                        >
                          Full Book
                        </LinkWrapper></div> : ''}
                        </div>
                      {/* {data?.marketName === "fancy" ? (
                        <LinkWrapper
                          style={{ color: "#2366AD" }}
                          onClick={() => {
                            setTitleModel(i?.runnerName);
                            setisOpenFullBook(true);
                          }}
                        >
                          Full Book
                        </LinkWrapper>
                      ) : data?.marketName === "Match Odds" ? (
                        <div>
                          <b
                            style={{
                              color: data?.amount > 0 ? "green" : "red",
                            }}
                          >
                            -439
                          </b>
                        </div>
                      ) : (
                        ""
                      )} */}
                    </CuntriesHeader>
                  ))}
                </div>
                <div style={{ display: "flex", width: "50%" }}>
                  <div style={{ width: "50%" }}>
                    <div>
                      {data?.last_odds?.runners?.map((value, indexs) => {
                        if (value?.Status === "ACTIVE") {
                          return (
                            <div
                              style={{
                                display: "flex",
                                height: 49,
                                background:  "#8DD2F0",
                                justifyContent: value?.ExchangePrices?.AvailableToBack?.length === 3 ? "center" : innerWidth > 890 ? 'right' : 'center',
                              }}
                            >
                              {innerWidth > 890
                                ? value?.ExchangePrices?.AvailableToBack?.length ? [...value?.ExchangePrices?.AvailableToBack]?.sort((a, b) => a?.price - b?.price)?.map(
                                    (item, index) => {
                                      return (
                                        <BackValueWrraper
                                          // className={
                                          //   (copyDataOfFakeBets?.length &&
                                          //     copyDataOfFakeBets[ind]?.runners
                                          //       ?.length &&
                                          //       copyDataOfFakeBets[ind]?.runners[
                                          //         indexs
                                          //       ]?.ExchangePrices
                                          //         ?.AvailableToBack?.length&&
                                          //     [...copyDataOfFakeBets[ind]?.runners[
                                          //       indexs
                                          //     ]?.ExchangePrices
                                          //       ?.AvailableToBack]?.sort((a, b) => a?.price - b?.price)[index]
                                          //       ?.price !== item?.price) ||
                                          //   (copyDataOfFakeBets?.length &&
                                          //     copyDataOfFakeBets[ind]?.runners
                                          //       ?.length &&
                                          //   copyDataOfFakeBets[ind]?.runners[
                                          //         indexs
                                          //       ]?.ExchangePrices
                                          //         ?.AvailableToBack?.length&&
                                          //     [...copyDataOfFakeBets[ind]?.runners[
                                          //       indexs
                                          //     ]?.ExchangePrices
                                          //       ?.AvailableToBack]?.sort((a, b) => a?.price - b?.price)[index]
                                          //       ?.size !== item?.size)
                                          //     ? style.changeBackground
                                          //     : ""
                                          // }
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
                                          bg={ "#8DD2F0"}
                                          hoverBg={ "#8DD2F0"}
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
                                  ): ''
                                : value?.ExchangePrices?.AvailableToBack?.slice(
                                    0,
                                    1
                                  )?.map((item, index) => {
                                    return (
                                      <BackValueWrraper
                                        // className={
                                        //   (copyDataOfFakeBets?.length &&
                                        //     copyDataOfFakeBets[ind]?.runners
                                        //       ?.length &&
                                        //       copyDataOfFakeBets[ind]?.runners[
                                        //         indexs
                                        //       ]?.ExchangePrices
                                        //         ?.AvailableToBack?.length&&
                                        //     copyDataOfFakeBets[ind]?.runners[
                                        //       indexs
                                        //     ]?.ExchangePrices?.AvailableToBack[
                                        //       index
                                        //     ]?.price !== item?.price) ||
                                        //   (copyDataOfFakeBets?.length &&
                                        //     copyDataOfFakeBets[ind]?.runners
                                        //       ?.length &&
                                        //       copyDataOfFakeBets[ind]?.runners[
                                        //         indexs
                                        //       ]?.ExchangePrices
                                        //         ?.AvailableToBack?.length&&
                                        //     copyDataOfFakeBets[ind]?.runners[
                                        //       indexs
                                        //     ]?.ExchangePrices?.AvailableToBack[
                                        //       index
                                        //     ]?.size !== item?.size)
                                        //     ? style.changeBackground
                                        //     : ""
                                        // }
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
                                        bg={ "#8DD2F0"}
                                        hoverBg={ "#8DD2F0"}
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
                                  fontSize: "1rem",
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

                  <div style={{ width: "50%" }}>
                     <div>
                      {data?.last_odds?.runners?.map((value, indexs) => {
                        if (value?.Status === "ACTIVE") {
                          return (
                            <div
                              style={{
                                display: "flex",
                                height: 49,
                                background:  "#FFAFB2",
                                justifyContent: value?.ExchangePrices?.AvailableToLay?.length === 3 ? "center" : innerWidth > 890 ? 'left' : 'center',
                              }}
                            >
                              {innerWidth > 890
                                ? value?.ExchangePrices?.AvailableToLay?.map(
                                    (item, index) => {
                                      return (
                                        <BackValueWrraper
                                          // className={
                                          //   (copyDataOfFakeBets?.length &&
                                          //     copyDataOfFakeBets[ind]?.runners
                                          //       ?.length &&
                                          //       copyDataOfFakeBets[ind]?.runners[
                                          //         indexs
                                          //       ]?.ExchangePrices?.AvailableToLay?.length&&
                                          //     copyDataOfFakeBets[ind]?.runners[
                                          //       indexs
                                          //     ]?.ExchangePrices?.AvailableToLay[
                                          //       index
                                          //     ]?.price !== item?.price) ||
                                          //   (copyDataOfFakeBets?.length &&
                                          //     copyDataOfFakeBets[ind]?.runners[
                                          //       indexs
                                          //     ]?.ExchangePrices?.AvailableToLay?.length&&
                                          //     copyDataOfFakeBets[ind]?.runners
                                          //       ?.length &&
                                          //     copyDataOfFakeBets[ind]?.runners[
                                          //       indexs
                                          //     ]?.ExchangePrices?.AvailableToLay[
                                          //       index
                                          //     ]?.size !== item?.size)
                                          //     ? style.changeBackground
                                          //     : ""
                                          // }
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
                                          bg={ "#FFAFB2"}
                                          hoverBg={ "#FFAFB2"}
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
                                        // className={
                                        //   (copyDataOfFakeBets?.length &&
                                        //     copyDataOfFakeBets[ind]?.runners
                                        //       ?.length &&
                                        //       copyDataOfFakeBets[ind]?.runners[
                                        //         indexs
                                        //       ]?.ExchangePrices?.AvailableToLay?.length&&
                                        //     copyDataOfFakeBets[ind]?.runners[
                                        //       indexs
                                        //     ]?.ExchangePrices?.AvailableToLay[
                                        //       index
                                        //     ]?.price !== item?.price) ||
                                        //   (copyDataOfFakeBets?.length &&
                                        //     copyDataOfFakeBets[ind]?.runners
                                        //       ?.length &&
                                        //       copyDataOfFakeBets[ind]?.runners[
                                        //         indexs
                                        //       ]?.ExchangePrices?.AvailableToLay?.length&&
                                        //     copyDataOfFakeBets[ind]?.runners[
                                        //       indexs
                                        //     ]?.ExchangePrices?.AvailableToLay[
                                        //       index
                                        //     ]?.size !== item?.size)
                                        //     ? style.changeBackground
                                        //     : ""
                                        // }
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
                                        bg={ "#FFAFB2"}
                                        hoverBg={ "#FFAFB2"}
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
                        }
                        else{
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
            {isFancyBooker ? "" : <TitleBarUpdated 
            title={<span className={style.mainSpan}> { `${innerWidth > 700 ? liveMatchData?.name : truncate(liveMatchData?.name, 36)|| ''} - Match Odds`} <span>{raceStatus===null ?liveMatchData?.status:  raceStatus?.inplay?" Inplay " : "CLOSED"}</span><span className={style.userIcon}><FaIdBadge onClick={() => {
              navigate(`${constRoute?.userBookCricket}?id=${liveMatchData?._id}`, { state: liveScoreData });
              const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
              localStorage.setItem('userBookEvent', JSON.stringify({...otherEvents, cricket:liveMatchData?.name}))
              }}/></span>
            </span>}
            />}
        </Row>
        <Table
          loading={props?.loading}
          checkPagination={false}
          dataSource={tableData}
          className={style.tableWrapperMain}
          columns={columns}
          showHeader={false}
        />
        <RulesModal
          open={rulesModalOpen}
          title={"Market Rules"}
          setOpen={setRulesModalOpen}
        />
        <FullBookModel
          open={isOpenFullBook}
          setOpen={setisOpenFullBook}
          title={titleModel}
          setTitle ={setTitleModel}
          filterData={filterData}
          getMatchedBetsData={getMatchedBetsData}
          liveMatchData={liveMatchData}
        />
      </MainTableWrraper>
    );
  }
);

export default AllMatchesTable;

const MainTableWrraper = styled.div`
  width: 100%;
  // .tableWrapperMain{
  //   .ant-table-content{
  //     table{
  //       border:none;
  //     }
  //   }
  //   .ant-table-cell{
  //     border: none;
  //     padding: 0px !important;
  //   }
  // }
`;
const BackValueWrraper = styled.span<{ bg?: string; hoverBg?: string }>`
  width: 30%;
  margin-left: 5px;
  margin-top: 3px;
  // height: 50px;
  display: flex;
  color: #121212;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  background-color: ${(p) => (p.bg ? p.bg : "#eeee")};
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
const LinkWrapper = styled.a`
  // padding-left: 15px;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const CuntriesHeader = styled.p`
  font-size: 1rem;
  height: 50px;
  padding-left:10px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  // align-items:center;
  justify-content: center;
  // color: #121212;
`;
const TotalValues = styled.span`
  color: #121212;
`;
