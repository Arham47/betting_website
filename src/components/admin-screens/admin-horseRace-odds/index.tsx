/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "@stores/root-store";
import { Col, Row, Spin } from "antd";
import style from "./style.module.scss";
import OpenBetsTable from "./openBetsTable";
import AllMatchesTable from "./allMatchesTable";
import CustomButton from "@components/common-components/custom-button";
import {
  NUM_STR_5_ROLE,
} from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "@utils/hooks/useWindowSize";
import { constRoute } from "@utils/route";
import { getSingleUrlParam } from "@utils/common-functions";
import { io } from "socket.io-client"
import { Draggable } from "drag-react";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import comingSoonImg from "@assets/images/coming-soon.png";
import { socketUrl } from "@api/const";

const AdminHorseRaceOdds = observer(() => {
  const location = useLocation()
  const marketId = getSingleUrlParam(location, 'id');
  const { width } = useWindowSize();
  const theme = useTheme();
  const navigate = useNavigate();
  const eId = getSingleUrlParam(location, 'eId');
  const matchId = getSingleUrlParam(location, "matchId")
  const [isEditStake, setIsEditStake] = useState({ status: false, val: 0, runnerName: '' });
  const [iframeScore, setIframeScore] = useState(null)
  const [copyDataOfFakeBets, setCopyDataFakeBetsData] = useState(null);
  const [tvScoreCard] = useState('1');
  const [isCount, setIsCount] = useState(true);
  const [horseRaceHeading, setHorseRaceHeading] = useState(null)
  const [eventName, setEventName] = useState(null);
  const [matchData, setMatchData] = useState(null)
  const [isRefresh, setIsRefresh] = useState(0);
  const [openBetData, setOpenBetData] = useState([]);
  const [matchBetData, setMatchBetData] = useState([]);
  const [horseRaceOddsData, setHorseRaceOddsData] = useState([])
  const [raceStatus, setRaceStatus] = useState(null)
  const [eventWinner, setEventWinner] = useState(null);
  const [runners, setRunners] = useState([])
  const {
    user: {
      getAllUsers,
      loadAllUsers,
      getUserInfo,
      loadAllMarketTypes,
      getAllMarketTypes,
    },
    bet: { loadMatchedBets, getMatchedBetsData, loadLiveStreemingData, loadCurrentPositionDetails, loadEventWinnerName },
  } = useStore(null);

  useEffect(() => {
    const intervalId = setInterval(getEventWinner, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [eId])

  const getEventWinner = async () => {
    if (eId) {
      const res = await loadEventWinnerName({ eventId: eId });
      if (res?.success) setEventWinner(res?.result?.winner)
    }
  }

  useEffect(() => {
    if (!getAllUsers) {
      if (getUserInfo?.role !== '5' && getUserInfo?.role) {
        loadAllUsers();
      }
    }
    if (!getAllMarketTypes) {
      loadAllMarketTypes();
    }
  }, []);

  const handleProfitLoss = (betsData) => {
    console.warn('betsData?.lengt', betsData?.length)
    let temp = [...runners]
    if (betsData?.length) {
      temp?.forEach((z, idx) => {
        let dummy = []
        betsData?.forEach((i) => {
          if (i?.type == 0) {
            console.warn('i?.runner == z?.selectionId', i?.runner == z?.selectionId)
            if (i?.runner == z?.selectionId) {
              dummy.push({ selectionId: z?.selectionId, runnerId: i?.runner, profitVal: i?.loosingAmount })
            } else {
              dummy.push({ selectionId: z?.selectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount })
            }
          } else {
            if (i?.runner == z?.selectionId) {
              dummy.push({ selectionId: z?.selectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount })
            } else {
              dummy.push({ selectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount })
            }
          }
        });
        temp[idx]['profitLoss'] = dummy?.reduce((accumulator, item) => {
          return accumulator + item.profitVal;
        }, 0);
      })
    }
    setRunners(temp)
    console.warn('temp++++++++++', temp)
  }

  useEffect(() => {
    // if (getMatchedBetsData?.length){ 
    loadCurrentPositionData();
    if (matchData?.eventNodes?.length) {
      const date = new Date(matchData?.eventNodes[0]?.event?.openDate).getTime()
      // const openBets = getMatchedBetsData?.filter((item)=>item?.createdAt < date)
      // const matchBet = getMatchedBetsData?.filter((item)=>item?.createdAt >= date)
      // const matchBet = getMatchedBetsData;
      // setOpenBetData(openBets)
      // setMatchBetData(matchBet)
      // }
    }
  }, [getMatchedBetsData, matchData])
  useEffect(() => {
    if (matchId) loadMatchedBets(matchId);
    const intervalId = setInterval(() => {
      if (matchId) loadMatchedBets(matchId)
      // loadCurrentPositionData();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [matchId]);

  const loadCurrentPositionData = async () => {
    if (matchId) {
      const resp = await loadCurrentPositionDetails(matchId);
      if (resp?.success) {
        if (resp?.results.length) {
          handleProfitLoss(resp?.results)
        }
      }
    }
  }
  const handleLiveStreaming = async () => {
    if (matchData?.eventNodes?.length) {
      const res = await loadLiveStreemingData(matchData?.eventNodes[0]?.eventId);
      if (res?.success) setIframeScore(res?.fancyData);
    }
  };
  useEffect(() => {
    handleLiveStreaming();
  }, [matchData]);
  let first_runners = []
  const handleRaceEventInfoData = (data) => {
    console.log('race event info', data)
    setRaceStatus(null)
    if (data?.eventNodes?.length) {
      setMatchData(data)
      const runners = data?.eventNodes[0]?.marketNodes?.runners;
      // console.log('runners', runners)
      const racingData = [{
        runners: runners,
        marketName: data?.eventNodes[0]?.marketNodes?.description?.marketName || '',
        marketId: data?.eventNodes[0]?._id || '',
        mid: data?.marketId
      }]
      first_runners = [...runners]
      setHorseRaceOddsData(racingData)
      setRunners(runners)
    }
  }
  const handleUpdatedRunners = (data) => {
    if (data?.state?.status === 'SUSPENDED') {
      setRaceStatus(prevData => {
        return { ...prevData, marketId: data.marketId, status: 'SUSPENDED' }
      })
      return false
    }
    const temp = [...first_runners]
    // console.log('here is odds data', data.runners, 'first_runners', first_runners)
    const updateArrayofRunners = temp?.map((item) => {
      const matchingObject = data?.runners?.find((Obj) => Obj?.selectionId == item?.selectionId)
      // console.log('matchingObject', matchingObject)
      if (matchingObject) return { ...item, exchange: matchingObject?.exchange, state: matchingObject?.state }
      else return { ...item }
    })
    setHorseRaceOddsData((horseRaceOddsData) => {
      setCopyDataFakeBetsData(horseRaceOddsData)
      return [{ ...horseRaceOddsData[0], runners: updateArrayofRunners }]
    })
    first_runners = [...updateArrayofRunners]
  }
  useEffect(() => {
    const socket = io(socketUrl, { path: "/websocket/" });
    socket.on('connect', () => {
      socket.emit('join', '$' + marketId)
      socket.on('odds', (data) => {
        handleUpdatedRunners(data)
      })
      socket.on('race_event_info', (data) => {
        setIsCount(false);
        handleRaceEventInfoData(data)
      })
      socket.on("racing_status", (data) => {
        // console.log('status',data);
        // console.log('data?.marketId==eventId', data?.marketId==marketId)
        if (data?.marketId == marketId) {
          if (data?.status === 'PENDING') {
            return
          } else {
            setRaceStatus(prevData => {
              return { ...data }
            })
          }
        }
      });
      socket.on('winnerForRacing ', (data) => {
        console.log('this is last odds', data)
      })
    });
    return () => {
      socket.disconnect();
      setIsCount(true);
      setHorseRaceHeading(null)
      setRaceStatus(null);
      setRunners([]);
    };
  }, [marketId, isRefresh]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tab1Data = () => {
    return (
      <div>
        <div className={style.tvWrraper} style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
          {/* <iframe
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            src={iframeScore?.streamingUrl} 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen = {false}
          ></iframe> */}
          <img src={comingSoonImg} alt="img" />
        </div>
      </div>
    );
  };
  const tab2Data = () => {
    return (
      <div>
        <div className={style.tvWrraper} style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
          <iframe
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            src={iframeScore?.scoreUrl}
            title="Live stream"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={false}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    );
  };
  return (
    <div className={style.mainCricketWrraper}>
      {isMobile ?
        <Draggable style={{ position: 'fixed', left: 'none', right: '10px', top: '52px', zIndex: 99999, cursor: 'move' }}>
          <div style={{
            display: 'flex',
            background: "#121212",
            height: 30,
            width: 30,
            opacity: '0.6',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}><BsArrowRepeat style={{ fontSize: 20, fontWeight: 'bolder', fill: 'cyan' }} onClick={() => {
            setIsCount(true);
            setIsRefresh(isRefresh + 1)
          }} /></div>
        </Draggable> : ''}
      {isCount ? <Spin className={style.antIconClass} size="large" /> :
        <Row gutter={6} className={style.mainRow}>
          <Col md={24} lg={16} xxl={16}>
            <div className={style.mainHeader}>
              {width < 991
                ? !(getUserInfo?.role === NUM_STR_5_ROLE) && (
                  <TitleBarUpdated
                    title={<div className={theme + " " + style.betAndBookWapper}>
                      <CustomButton customClass={style.btnStyle} title={"User Book"} onClick={() => {
                        navigate(`${constRoute?.userBookHorse}?id=${matchId}`);
                        const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
                        localStorage.setItem('userBookEvent', JSON.stringify({
                          ...otherEvents,
                          horse: matchData?.eventNodes[0]?.event?.eventName
                        }))
                      }} />
                    </div>}
                  />
                )
                : ""}
              <Row className={style.scoreSection}>
                {width <= 991 ? <div className={style.tabWrapper}>
                  {(tvScoreCard === '1') ? tab1Data() : tab2Data()}
                </div> : ''}

                <div className={style.mainScoresWrraper}>
                  <AllMatchesTable
                    isEditStake={isEditStake}
                    setIsEditStake={setIsEditStake}
                    copyDataOfFakeBets={copyDataOfFakeBets}
                    tableData={horseRaceOddsData}
                    marketId={marketId}
                    eventName={eventName}
                    horseRaceHeading={horseRaceHeading}
                    liveMatchData={matchData}
                    raceStatus={raceStatus}
                    runnersData={runners}
                    eventWinner={eventWinner}
                    getMatchBetsData={getMatchedBetsData}
                    matchId={matchId}
                  />
                </div>
              </Row>
            </div>
          </Col>
          <Col md={24} lg={8} xxl={8} className={style.mainTvWrraper}>
            {width > 991 ? !(getUserInfo?.role === NUM_STR_5_ROLE) && (
              <TitleBarUpdated
                title={<div className={theme + " " + style.betAndBookWapper}>
                  <CustomButton customClass={style.btnStyle} title={"User Book"} onClick={() => {
                    navigate(`${constRoute?.userBookHorse}?id=${matchId}`);
                    const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
                    localStorage.setItem('userBookEvent', JSON.stringify({
                      ...otherEvents,
                      horse: matchData?.eventNodes[0]?.event?.eventName
                    }))
                  }} />
                </div>}
              />
            ) : ''}
            {width > 991 ? <div className={style.tabWrapper}>
              {(tvScoreCard === '1') ? tab1Data() : tab2Data()}
            </div> : ''}
            {/* <div>
          <TitleBarUpdated title={`Open Bets (${openBetData?.length ? openBetData?.length : 0})`}/>
          <OpenBetsTable tableData={openBetData} />
        </div> */}
            <TitleBarUpdated title={<div className={style.fullBetListTitleBar}>
              <span
                className={style.eventName}>{`Matched Bets (${getMatchedBetsData?.length ? getMatchedBetsData?.length : 0})`}</span>
              <div>
                <CustomButton
                  title="Full Bet List"
                  customClass={style.btnStyle}
                  onClick={() => {
                    navigate(`${constRoute?.fullBetList}?eventId=${matchId}`);
                  }}
                />
              </div>
            </div>} />
            <OpenBetsTable tableData={getMatchedBetsData} />
          </Col>
        </Row>
      }
    </div>
  );
});
export default AdminHorseRaceOdds;