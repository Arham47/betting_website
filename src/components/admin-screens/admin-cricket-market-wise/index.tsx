/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import {useEffect, useState, useRef} from "react";
import {useStore} from "@stores/root-store";
import DOMPurify from 'dompurify';
import {Col, Dropdown, Form, Modal, Radio, Row, Spin} from "antd";
import style from "./style.module.scss";
import OpenBetsTable from "./openBetsTable";
import AllMatchesTable from "./allMatchesTable";
import CustomButton from "@components/common-components/custom-button";
import {
  CAMEL_ALL_USERS,
  CAMEL_SELECTED_USERS,
  CAMEL_UNLOCK_ALL,
  CAP_ALL_USERS,
  CAP_BET_LOCKER,
  CAP_BET_LOCK_BTN_TITILE,
  CAP_CANCEL_BTN_TITLE,
  CAP_MATCH_ODDS,
  CAP_OTHER_MARKETS,
  CAP_SAVE_BTN_TITLE,
  CAP_SELECTED_USERS,
  CAP_UNLOCK_ALL,
  INITIAL_PAGE_NUMBER,
  INITIAL_VALUES,
  LOWER_FILLED,
  LOWER_HORIZONTAL,
  LOWER_OUTLINED,
  LOWER_SUBMIT, NUM_STR_5_ROLE,
} from "@utils/const";
import {useTheme} from "@utils/hooks/useTheme";
import {validateMessages} from "@utils/json-data";
import Checkbox from "antd/lib/checkbox";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CommonInfiniteSkroll from "@components/common-components/common-infinite-skroll";
import useWindowSize from "@utils/hooks/useWindowSize";
import {constRoute} from "@utils/route";
import {getSingleUrlParam} from "@utils/common-functions";
import styled from "styled-components";
import {io} from "socket.io-client"
import {FaIdBadge} from "react-icons/fa";
import {DownOutlined} from "@ant-design/icons";
import {isMobile} from "react-device-detect";
import {Draggable} from "drag-react";
import {BsArrowRepeat} from "react-icons/bs";
import {AiOutlineReload} from "react-icons/ai";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import moment from "moment";
import {socketUrl} from "@api/const";
import CricketCurrentPosition from "./cricket-current-position";

const CricketMarketWise = observer(() => {
  const location = useLocation();
  const eventId = getSingleUrlParam(location, "id");
  const queryMarketId = getSingleUrlParam(location, "marketId");
  const queryId = getSingleUrlParam(location, "market");

  const {width} = useWindowSize();
  const theme = useTheme();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [usersSelection, setUsersSelection] = useState(CAMEL_SELECTED_USERS);
  const [allUsersData, setAllUsersData] = useState([]);
  const navigate = useNavigate();
  const [isEditStake, setIsEditStake] = useState({
    status: false,
    val: 0,
    runnerName: "",
  })
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [notToSetAllUsersState, setNotToSetAllUsersState] = useState(false);
  const [resTotalPages, setResTotalPages] = useState(1);
  const [iframeScore, setIframeScore] = useState(null);
  const [tvScoreCard] = useState("1");
  const [isCount, setIsCount] = useState(0);
  const [liveScoreData, setLiveScoreData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(0);
  const [openBetData, setOpenBetData] = useState([]);
  const [matchBetData, setMatchBetData] = useState([]);
  const [isFirst, setIsFirst] = useState(1)
  const [marketIdsData, setMarketIdsData] = useState(null);
  const [bookMakerFancyData, setBookMakerFancyData] = useState(null);
  const [lastMarketIdData, setLastMarketIdData] = useState(null);
  const [allMarketIdData, setAllMarketIdData] = useState(null);
  const [raceStatus, setRaceStatus] = useState(null)
  const [fancyDataApi, setFancyData] = useState(null)
  const [marketIdsForProfitLoss, setMarketIdsForProfitLoss] = useState([])
  const [bookMakerForProfitLoss, setBookMakerForProfitLoss] = useState([])
  const [fancyProfitLoss, setFancyProfitLoss] = useState([])
  const [bettingFigureProfitLoss, setBettingFigureProfitLoss] = useState([])
  const [jottaKaliProfitLoss, setJottaKaliProfitLoss] = useState(null)
  const [chottaBrraProfitLoss, setChottaBrraProfitLoss] = useState(null)
  const [currentPositinProfitLoss, setCurrentPositionProfitLoss] = useState(null);
  const [currentPositionDetailData, setCurrentPositionDetailData] = useState(null);
  const [secondsValue, setSecondsValue] = useState(null);
  const [secondInUseData, setSecondInUseData] = useState(null);
  const [seriesKey, setSeriesKey] = useState('');
  const seriesKeyRef = useRef(seriesKey)

  useEffect(() => {
    seriesKeyRef.current = seriesKey
  }, [seriesKey])

  const {
    user: {
      getAllUsers,
      loadAllUsers,
      postAddBetLock,
      isLoadingAddBetLock,
      isLoadingGetAllUsers,
      getUserInfo,
      loadAllMarketTypes,
      getAllMarketTypes,
      getBetPlaceHold
    },
    bet: {
      // postPlaceBet,
      loadAllBettingFigures,
      getLoadAllBettingFiguresList,
      loadLiveStreemingData,
      loadMatchedBets,
      getMatchedBetsData,
      loadCurrentPositionDetails,
      loadEventWinnerName,
      loadUpdateBetPlaceHold,
      loadingUpdateBetPlaceHold
    },
  } = useStore(null);

  useEffect(() => {
    const intervalId = setInterval(getEventWinner, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [eventId])

  const getEventWinner = async () => {
    if (eventId) {
      const res = await loadEventWinnerName({eventId: eventId});
    }
  }

  const loadBetPlaceHold = async () => {
    const resp = await getBetPlaceHold(eventId)
    if (resp?.success) {
      const dummyArr = [];
      if (resp?.data[0]?.secondsValue === 8) {
        dummyArr?.push({value: 4, title: 'NO'})
        dummyArr?.push({value: 8, title: 'YES'})
      } else {
        dummyArr?.push({value: 4, title: 'YES'})
        dummyArr?.push({value: 8, title: 'NO'})
      }
      // console.warn('dummyArr', dummyArr)
      setSecondInUseData(dummyArr)
      // setSecondsValue(resp?.data[0]?.secondsValue)
    }
  }

  useEffect(() => {
    loadBetPlaceHold();
  }, [eventId])

  const updateBetPlaceHold = async (val) => {
    const payload = {
      secondsValue: val,
      eventId: eventId,
      sportId: 4
    }
    await loadUpdateBetPlaceHold(payload);
    loadBetPlaceHold()
  }

  useEffect(() => {
    loadAllBettingFigures();
  }, [])

  useEffect(() => {
    if (allMarketIdData?._id) loadMatchedBets(allMarketIdData?._id);
    loadCurrentPositionData();
    const intervalId = setInterval(() => {
      if (allMarketIdData?._id) loadMatchedBets(allMarketIdData?._id)
      // loadCurrentPositionData();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [allMarketIdData?._id])

  useEffect(() => {
    if (!getAllUsers) {
      if (getUserInfo?.role !== "5" && getUserInfo?.role) {
        loadAllUsers();
      }
    }
    if (!getAllMarketTypes) {
      loadAllMarketTypes();
    }
  }, [])

  const handleProfitLoss = (betsdata) => {
    let temp = JSON.parse(JSON.stringify(marketIdsData))
    if (betsdata?.length) {
      temp?.forEach((z, idx) => {
        z?.last_odds?.runners?.forEach((k, idx2) => {
          let dummy = []
          betsdata?.forEach((i) => {
            if (i?.marketId == z?.last_odds?.marketId) {
              if (i?.type == 0) {
                if (i?.runner == k?.SelectionId) {
                  dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
                } else {
                  dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
                }
              } else {
                if (i?.runner == k?.SelectionId) {
                  dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
                } else {
                  dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
                }
              }
            }
            // else{
            //   dummy.push({SelectionId:'', runnerId:'', profitVal: ''})
            // }
          });
          temp[idx]['last_odds']['runners'][idx2]['profitLoss'] = Number(dummy?.reduce((accumulator, item) => {
            return accumulator + item.profitVal
          }, 0));
        })
      })
    }
    setMarketIdsForProfitLoss(temp)
    // console.warn('temp++____++++++',temp)
  }

  // console.warn('secondInUseData', secondInUseData)

  const handleBookerProfitLoss = (data, betsData) => {
    let temp = JSON.parse(JSON.stringify(data[0]?.last_odds?.runners))
    if (betsData?.length) {
      temp?.forEach((z, idx) => {
        // z?.last_odds?.runners?.forEach((k, idx2) => {
        let dummy = []
        betsData?.forEach((i) => {
          if (i?.isfancyOrbookmaker && !i?.fancyData) {
            if (i?.type == 0) {
              if (i?.runner == z?.SelectionId) {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
              } else {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
              }
            } else {
              if (i?.runner == z?.SelectionId) {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
              } else {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
              }
            }
          }
          // else{
          //   dummy.push({SelectionId:'', runnerId:'', profitVal: ''})
          // }
        });
        temp[idx]['profitLoss'] = Number(dummy?.reduce((accumulator, item) => {
          return accumulator + item.profitVal
        }, 0));
        // })
      })
    }
    setBookMakerForProfitLoss(temp)
    // console.warn('temp++++++++++',temp)
  }

  const handleFancyProfitLoss = (data, betsData) => {
    // console.warn('datadata*****', data)
    let temp = JSON.parse(JSON.stringify(data[0]?.last_odds?.runners))
    if (betsData?.length) {
      temp?.forEach((z, idx) => {
        // z?.last_odds?.runners?.forEach((k, idx2) => {
        let dummy = []
        let dummy2 = []
        betsData?.forEach((i) => {
          if (i?.isfancyOrbookmaker && i?.fancyData) {
            if (i?.type == 1) {
              if (i?.runner == z?.SelectionId) {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
                dummy2.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
              }
            } else {
              if (i?.runner == z?.SelectionId) {
                dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
                dummy2.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
              }
            }
          }
        });
        temp[idx]['profitLoss'] = Number(dummy?.reduce((accumulator, item) => {
          return accumulator + item.profitVal
        }, 0));
        temp[idx]['profitLoss2'] = Number(dummy2?.reduce((accumulator, item) => {
          return accumulator + item.profitVal
        }, 0));
        // })
      })
    }
    setFancyProfitLoss(temp)
    // console.warn('handleFancyProfitLoss++++++++++',temp)
  }

  const handleProfitLossForBettingFigure = (data, betsData) => {
    let temp = JSON.parse(JSON.stringify(data))
    const getCurrentSession = bettingFigureHeadingSession(liveScoreData)
    // console.warn('currentSessionData===', getCurrentSession, '========')
    const filterGetMatchBetDataWithBetSession = betsData?.filter((item) => item?.betSession == getCurrentSession)
    // console.warn('hereis filter data of session, filterGetMatchBetDataWithBetSession', filterGetMatchBetDataWithBetSession)
    temp?.forEach((z, idx) => {
      let dummy = []
      if (filterGetMatchBetDataWithBetSession?.length) {
        filterGetMatchBetDataWithBetSession?.forEach((i) => {
          if (i?.runnerId?.includes("Figure")) {
            if (i?.runner == idx) {
              dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.loosingAmount})
            } else {
              dummy.push({SelectionId: z?.SelectionId, runnerId: i?.runner, profitVal: i?.maxWinningAmount})
            }
          }
        });
      }
      temp[idx]['profitLoss'] = Number(dummy?.reduce((accumulator, item) => {
        return accumulator + item.profitVal
      }, 0));
    })
    // console.warn('handleProfitLossForBettingFigure', temp)
    setBettingFigureProfitLoss(temp)
  }

  const handleProfitLossForJottaKali = (betsData) => {
    let arr = [{val: '1'}, {val: ''}];
    const getCurrentSession = bettingFigureHeadingSession(liveScoreData)
    const filterGetMatchBetDataWithBetSession = betsData?.filter((item) => item?.betSession == getCurrentSession)

    let dummy = []
    arr?.forEach((z, idx) => {
      if (filterGetMatchBetDataWithBetSession?.length) {
        filterGetMatchBetDataWithBetSession?.forEach((i) => {
          if (["JOTTA", "KALI"]?.includes(i?.runnerId)) {
            if (i?.runner == z?.val) {
              dummy.push({runnerId: z?.val, profitVal: i?.loosingAmount})
            } else {
              dummy.push({runnerId: z?.val, profitVal: i?.maxWinningAmount})
            }
          }
        })
      }
    })
    const filetrJotaProfitLoss = dummy?.filter((z) => z?.runnerId == '1')?.reduce((a, b) => a + b.profitVal, 0)
    const filterKaliProfitLoss = dummy?.filter((z) => z?.runnerId != '1')?.reduce((a, b) => a + b.profitVal, 0)
    setJottaKaliProfitLoss({JotaProfitLoss: filetrJotaProfitLoss, kaliProfitLoss: filterKaliProfitLoss});
  }

  const handleProfitLossForChottaBrra = (betsData) => {
    let arr = [{val: '1'}, {val: ''}];
    const getCurrentSession = bettingFigureHeadingSession(liveScoreData)
    const filterGetMatchBetDataWithBetSession = betsData?.filter((item) => item?.betSession == getCurrentSession)

    let dummy = []
    arr?.forEach((z, idx) => {
      if (filterGetMatchBetDataWithBetSession?.length) {
        filterGetMatchBetDataWithBetSession?.forEach((i) => {
          if (["BARA", "CHOTA"]?.includes(i?.runnerId)) {
            if (i?.runner == z?.val) {
              dummy.push({runnerId: z?.val, profitVal: i?.loosingAmount})
            } else {
              dummy.push({runnerId: z?.val, profitVal: i?.maxWinningAmount})
            }
          }
        })
      }
    })
    const filetrBrraProfitLoss = dummy?.filter((z) => z?.runnerId == '1')?.reduce((a, b) => a + b.profitVal, 0)
    const filterChottaProfitLoss = dummy?.filter((z) => z?.runnerId != '1')?.reduce((a, b) => a + b.profitVal, 0)
    setChottaBrraProfitLoss({barraProfitLoss: filetrBrraProfitLoss, chottaProfitLoss: filterChottaProfitLoss});
  }

  useEffect(() => {
    // if(getLoadAllBettingFiguresList) handleProfitLossForBettingFigure(getLoadAllBettingFiguresList)
    if (getMatchedBetsData?.length) {
      // handleProfitLoss();
      // handleProfitLossForJottaKali();
      // handleProfitLossForChottaBrra();
      // if(bookMakerFancyData) handleBookerProfitLoss(bookMakerFancyData);
      // if(fancyDataApi?.length) handleFancyProfitLoss(fancyDataApi);
      // const openBets = getMatchedBetsData?.filter((item)=>item?.createdAt < allMarketIdData?.openDate)
      // const matchBet = getMatchedBetsData?.filter((item)=>item?.createdAt >= allMarketIdData?.openDate)
      // const matchBet = getMatchedBetsData
      // setOpenBetData(openBets)
      // setMatchBetData(matchBet)
      loadCurrentPositionData();
    } else {
      setOpenBetData([])
      setMatchBetData([])
    }
  }, [getMatchedBetsData, allMarketIdData, JSON.stringify(getMatchedBetsData)])

  const loadCurrentPositionData = async () => {
    if (allMarketIdData?._id) {
      const resp = await loadCurrentPositionDetails(allMarketIdData?._id);
      if (resp?.success) {
        setCurrentPositionDetailData(resp?.results)
        if (resp?.results?.length) {
          setCurrentPositionProfitLoss(resp?.results)
          handleProfitLoss(resp?.results);
          handleProfitLossForJottaKali(resp?.results);
          if (getLoadAllBettingFiguresList) handleProfitLossForBettingFigure(getLoadAllBettingFiguresList, resp?.results)
          handleProfitLossForChottaBrra(resp?.results);
          if (bookMakerFancyData) handleBookerProfitLoss(bookMakerFancyData, resp?.results);
          if (fancyDataApi?.length) handleFancyProfitLoss(fancyDataApi, resp?.results);
        }
      }
    }
  }

  useEffect(() => {
    if (currentPositionDetailData?.length) {
      setCurrentPositionProfitLoss(currentPositionDetailData)
      handleProfitLoss(currentPositionDetailData);
      handleProfitLossForJottaKali(currentPositionDetailData);
      if (getLoadAllBettingFiguresList) handleProfitLossForBettingFigure(getLoadAllBettingFiguresList, currentPositionDetailData)
      handleProfitLossForChottaBrra(currentPositionDetailData);
      if (bookMakerFancyData) handleBookerProfitLoss(bookMakerFancyData, currentPositionDetailData);
      if (fancyDataApi?.length) handleFancyProfitLoss(fancyDataApi, currentPositionDetailData);
    }
  }, [currentPositionDetailData, bookMakerFancyData, fancyDataApi, getLoadAllBettingFiguresList, liveScoreData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  let lastMarketData = []
  const handleNewOddsData = (data) => {
    setAllMarketIdData(data)
    setRaceStatus(null)
    setIsCount((isCount) => isCount + 1);
    const filteredData = data?.marketIds?.filter((item) => item?.id == queryMarketId)
    setMarketIdsData(filteredData);
    lastMarketData = filteredData;
  }

  const handleOddsData = (data) => {
    // console.log('lastMarketData', lastMarketData)
    const temp = lastMarketData ? [...lastMarketData] : [];
    const findIndexOfEvents = temp?.findIndex((z) => z?.id == data?.data?.marketId)
    if (findIndexOfEvents >= 0) {
      temp[findIndexOfEvents]['last_odds'] = data?.data;
      const filteredData = temp?.filter((item) => item.id == queryMarketId)

      // const data = temp?.filter(item =>  )
      setMarketIdsData((marketIdsData) => {
        setLastMarketIdData(marketIdsData);
        return filteredData
      });
      lastMarketData = filteredData

    }
    setTimeout(() => {
      setLastMarketIdData({});
    }, 500);
  }

  const handleFancyBookMakerData = (data) => {
    const arr = []
    if (data?.data?.data?.t2?.length) {
      const BookMakerData = data?.data?.data?.t2;
      const bookmaker1 = BookMakerData[0]?.bm1;
      const dummyArrayBookMaker = [];
      bookmaker1?.forEach((keyItem) => {
        const AvailableToBackObj = ["1", "2", "3"].map((num) => ({
          price: Number(keyItem?.[`b${num}`]),
          // size: Number(keyItem?.[`bs${num}`]),
          size: '',
        }));
        const AvailableToLayObj = ["1", "2", "3"].map((num) => ({
          price: Number(keyItem?.[`l${num}`]),
          // size: Number(keyItem?.[`ls${num}`]),
          size: '',
        }));
        const ExchangePricesObj = {
          AvailableToBack: AvailableToBackObj,
          AvailableToLay: AvailableToLayObj,
        };
        const dummyObj = {
          ...keyItem,
          runnerName: keyItem?.nat,
          ExchangePrices: ExchangePricesObj,
          Status: keyItem?.s || "ACTIVE",
          SelectionId: keyItem?.sid
        };
        dummyArrayBookMaker.push(dummyObj);
      });
      const dummyArrayOfBM = {
        marketName: 'Bookmaker',
        last_odds: {runners: dummyArrayBookMaker},
        eventId: data?.eventId,
        eventTypeId: data?.data?.eventTypeId,
        gameId: data?.data?.gameId,
        _id: data?._id
      };
      // arr.push(dummyArrayOfBM)
      setBookMakerFancyData([dummyArrayOfBM])

    }
    if (data?.data?.data?.t3?.length) {
      const fancyData = data?.data?.data?.t3;
      const dummyArrayFancy = [];
      fancyData?.forEach((keyItem) => {
        const AvailableToBackObj = ["1", "2", "3"].map((num) => ({
          price: Number(keyItem?.[`b${num}`]),
          size: Number(keyItem?.[`bs${num}`]),
        }));
        const AvailableToLayObj = ["1", "2", "3"].map((num) => ({
          price: Number(keyItem?.[`l${num}`]),
          size: Number(keyItem?.[`ls${num}`]),
        }));
        const ExchangePricesObj = {
          AvailableToBack: AvailableToBackObj,
          AvailableToLay: AvailableToLayObj,
        };
        const dummyObj = {
          ...keyItem,
          runnerName: keyItem?.nat,
          ExchangePrices: ExchangePricesObj,
          Status: keyItem?.gstatus || "ACTIVE",
          SelectionId: keyItem?.sid
        };
        dummyArrayFancy.push(dummyObj);
      });
      const dummyArrayOfFancy = {
        marketName: 'Fancy',
        last_odds: {runners: dummyArrayFancy},
        eventId: data?.eventId,
        eventTypeId: data?.data?.eventTypeId,
        gameId: data?.data?.gameId,
        _id: data?._id
      };
      // arr.push(dummyArrayOfFancy)
      setFancyData([dummyArrayOfFancy])
    }
  }

  const parseCricketData = (score) => {
    const lastOver = score?.overs?.pop()
    return {
      eventId: score.eventId,
      seriesKey: score.seriesKey,
      score: {
        activenation1: (score.activeTeam === score.team1ShortName) ? 1 : 0,
        activenation2: (score.activeTeam === score.team2ShortName) ? 1 : 0,
        balls: lastOver?.balls ?? [],
        overScore: lastOver?.runs ?? 0,
        lastOver,
        inning: score.inning,
        dayno: "",
        comment: score?.comment,
        isfinished: "0",
        score1: `${score?.score1?.replace('/', '-')} (${score?.over1})`,
        score2: `${score?.score2?.replace('/', '-')} (${score?.over2})`,
        spnballrunningstatus: score?.result,
        spnmessage: "",
        spnnation1: score?.team1ShortName,
        spnnation2: score?.team2ShortName,
        spnreqrate1: `RRR ${score?.RRR}`,
        spnreqrate2: `RRR ${score?.RRR}`,
        spnrunrate1: `CRR ${score?.CRR}`,
        spnrunrate2: `CRR ${score?.CRR}`,
      }
    };
  }

  useEffect(() => {
    const socket = io(socketUrl, {path: "/websocket/"});
    socket.on('connect', () => {
      socket.emit('join', '#' + eventId)
      socket.on('odds', (data) => {
        handleOddsData(data);
      })
      socket.on('event_info', (data) => {
        console.log('event_info', data)
        const {cricket} = data
        if (cricket) {
          const key = data?.seriesKey || null
          if (key) {
            setSeriesKey(key)
          } else {
            setSeriesKey('UNKNOWN')
          }
          const parsedCricket = parseCricketData(cricket)
          // console.log('parsedCricket', JSON.stringify(parsedCricket))
          setLiveScoreData(parsedCricket)
        } else {
          setSeriesKey('UNKNOWN')
        }
        handleNewOddsData(data)
      })
      socket.on("inplay", (data) => {
        if (data?.eventID == eventId) setRaceStatus(data)
        // console.log('inplay=====', data);
      });
      socket.on('winnerForRacing ', (data) => {
        // console.log('this is last odds', data)
      })
    });
    socket.on("score", (data) => {
      // console.log('score======= ', data)
      const key = seriesKeyRef.current
      if (key && key === data.seriesKey) {
        setLiveScoreData(data)
      }
    });
    socket.on("cricket_score_api", (data) => {
      // console.log('score======= ', data)
      const apiEventId = data.eventId
      if (apiEventId === eventId) {
        setLiveScoreData(data)
      }
    });
    // socket.on("last_score", (data) => {
    //   // console.log('last_score', data);
    // });
    //   socket.on("fancy_event_list", (data) => {
    //   // console.log('fancy_event_list',data);
    // });
    socket.on("fancy_odds", (data) => {
      // console.log("fancy_odds==",data);
      handleFancyBookMakerData(data)
    });

    return () => {
      socket.disconnect();
      setIsCount(0);
      setBookMakerFancyData(null);
      setFancyData(null)
      setAllMarketIdData(null);
      setLastMarketIdData(null);
      setLiveScoreData(null);
      setFancyProfitLoss([]);
      setBookMakerForProfitLoss([]);
      setMarketIdsForProfitLoss([]);
    };
  }, [eventId, isRefresh])

  const handleLiveStreaming = async () => {
    const res = await loadLiveStreemingData(eventId);
    if (res?.success) setIframeScore(res?.fancyData);
  }

  useEffect(() => {
    handleLiveStreaming();
  }, [eventId]);

  useEffect(() => {
    if (notToSetAllUsersState) {
      setAllUsersData(getAllUsers);
    }
  }, [JSON.stringify(getAllUsers)]);

  useEffect(() => {
    if (allUsersData?.length) {
      if (isFirst === 1) {
        const temp = JSON.parse(JSON.stringify(allUsersData))
        const filterArray = temp?.filter((z) => z?.lockStatus === true)
        if (filterArray?.length === temp?.length) setUsersSelection(CAMEL_ALL_USERS)
        else if (filterArray?.length === 0) setUsersSelection(CAMEL_UNLOCK_ALL)
        setIsFirst(2)
      }
    }
  }, [JSON.stringify(allUsersData)])

  const tab1Data = () => {
    return (
      <div>
        <div className={style.tvWrraper}>
          <iframe
            width="100%"
            // frameBorder="0"
            height="100%"
            src={iframeScore?.streamingUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    );
  }

  const tab2Data = () => {
    return (
      <div>
        <div className={style.tvWrraperScore}>
          <iframe
            width="100%"
            height="100%"
            src={iframeScore?.scoreUrl}
            title="Live stream"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    );
  }

  const hideDropdownMenu = () => {
    setDropdownVisible(false);
  }

  const dropdownMenu = (
    <div className={theme + " " + style.dropDownContent}>
      <>
        <div
          onClick={() => {
            setModalTitle(CAP_MATCH_ODDS);
            hideDropdownMenu();
            setOpen(true);
            loadAllUsers().then((res) => {
              setResTotalPages(res?.results?.pages);
            });
          }}
        >
          <p> {CAP_MATCH_ODDS} </p>
        </div>
        <div
          onClick={() => {
            setOpen(true);
            setModalTitle(CAP_OTHER_MARKETS);
            hideDropdownMenu();
            loadAllUsers().then((res) => {
              setResTotalPages(res?.results?.pages);
            });
          }}
          className={style.otherMarkets}
        >
          <p> {CAP_OTHER_MARKETS} </p>
        </div>
      </>
    </div>
  );

  const handlelSubmit = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setAllUsersData([]);
    setPageNumber(INITIAL_PAGE_NUMBER);
    setOpen(false);
  }

  const addBetLock = async (values) => {
    const filterUser = allUsersData?.filter((item) => item?.lockStatus === 1)?.map((z) => z?.userId)
    const payload = {};
    if (modalTitle === CAP_MATCH_ODDS) {
      if (usersSelection === "allUsers") {
        payload['matchOdds'] = true;
        payload['lock'] = true;
        payload["allUsers"] = true;
        payload['matchId'] = allMarketIdData?._id;
      } else if (usersSelection === "unlockAll") {
        payload['matchOdds'] = true;
        payload['lock'] = false;
        payload["allUsers"] = true;
        payload['matchId'] = allMarketIdData?._id;
      } else {
        payload['matchId'] = allMarketIdData?._id;
        payload['allUsers'] = false;
        payload['matchOdds'] = true;
        payload['userIds'] = filterUser;
      }
    } else {
      if (usersSelection === "allUsers") {
        payload["allUsers"] = true;
        payload['lock'] = true;
        payload['matchId'] = allMarketIdData?._id
        payload['matchOdds'] = false;
      } else if (usersSelection === "unlockAll") {
        payload["allUsers"] = true;
        payload['lock'] = false;
        payload['matchId'] = allMarketIdData?._id
        payload['matchOdds'] = false;
      } else {
        payload["allUsers"] = false;
        payload['matchId'] = allMarketIdData?._id
        payload['matchOdds'] = false;
        payload['userIds'] = filterUser;
      }
    }
    const res = await postAddBetLock(payload);
    if (res) {
      loadAllUsers().then((res) => {
        if (res) {
          res?.success && setOpen(false);
        }
      });
    }
  }

  const onChangeCheckBox = (e, index) => {
    let tempArray = allUsersData.map((obj) => Object.assign({}, obj));
    if (modalTitle === CAP_MATCH_ODDS) {
      tempArray[index]["lockStatus"] = e?.target?.checked ? 1 : 0;
      setAllUsersData(tempArray);
    } else {
      tempArray[index]["lockStatus"] = e?.target?.checked ? 1 : 0;
      setAllUsersData(tempArray);
    }
  }

  const bettingFigureHeading = (data) => {
    let currentOver = null;
    let playingTeam = '';
    if (data?.score?.activenation1 == 1) {
      currentOver = Number(data?.score?.score1?.split('(')[1]?.replaceAll(')', ''));
      playingTeam = data?.score?.spnnation1;
    } else if (data?.score?.activenation2 == 1) {
      currentOver = Number(data?.score?.score2?.split('(')[1]?.replaceAll(')', ''));
      playingTeam = data?.score?.spnnation2;
    }
    let currentSession = Math.ceil(currentOver / 5);
    switch (allMarketIdData?.matchType) {
      case "TEST":
        currentSession = Math.ceil(currentOver / 10) * 10;
        return `${playingTeam} ${currentSession ? currentSession : 0} Over Figure`;
      case "ODI":
        currentSession = Math.ceil(currentOver / 5) * 5;
        return `${playingTeam} ${currentSession ? currentSession : 0} Over Figure`;
      case "T20":
        currentSession = Math.ceil(currentOver / 5) * 5;
        return `${playingTeam} ${currentSession ? currentSession : 0} Over Figure`;
      case "T10":
        currentSession = Math.ceil(currentOver / 5) * 5;
        return `${playingTeam} ${currentSession ? currentSession : 0} Over Figure`;
      default:
        return `${playingTeam} ${currentSession ? currentSession * 5 : 0} Over Figure`;
    }
// Session ${currentSession ? currentSession : 0}
  }

  const bettingFigureHeadingSession = (data) => {
    // console.warn('this function called')
    let currentOver = null;
    let playingTeam = ''
    if (data?.score?.activenation1 == 1) {
      currentOver = Number(data?.score?.score1?.split('(')[1]?.replaceAll(')', ''));
      playingTeam = data?.score?.spnnation1;
    } else if (data?.score?.activenation2 == 1) {
      currentOver = Number(data?.score?.score2?.split('(')[1]?.replaceAll(')', ''));
      playingTeam = data?.score?.spnnation2;
    }
    let currentSessionWith2ndTeam = Math.ceil(currentOver / 5);
    if (allMarketIdData?.matchType == "TEST") {
      currentSessionWith2ndTeam = liveScoreData?.score?.spnmessage ? 9 + Math.ceil(currentOver / 10) : Math.ceil(currentOver / 10)

      // setCurrentSessionData(currentSessionWith2ndTeam)
      return currentSessionWith2ndTeam;
    } else if (allMarketIdData?.matchType == "ODI") {
      currentSessionWith2ndTeam = liveScoreData?.score?.spnmessage ? 10 + Math.ceil(currentOver / 5) : Math.ceil(currentOver / 5)
      // setCurrentSessionData(currentSessionWith2ndTeam)
      return currentSessionWith2ndTeam;
    } else if (allMarketIdData?.matchType == "T20") {
      currentSessionWith2ndTeam = liveScoreData?.score?.spnmessage ? 4 + Math.ceil(currentOver / 5) : Math.ceil(currentOver / 5)
      // setCurrentSessionData(currentSessionWith2ndTeam)
      return currentSessionWith2ndTeam;
    } else if (allMarketIdData?.matchType == "T10") {
      currentSessionWith2ndTeam = liveScoreData?.score?.spnmessage ? 2 + Math.ceil(currentOver / 5) : Math.ceil(currentOver / 5)
      // setCurrentSessionData(currentSessionWith2ndTeam)
      return currentSessionWith2ndTeam;
    }

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

  const getMinutesCalculate = (timestamp) => {
    const currentTime = moment();
    const time = moment(timestamp);
    const timeDifferenceMinutes = time.diff(currentTime, 'minutes');

    return timeDifferenceMinutes <= 45;
  }

  const scoreDataHandler = (data) => {
    if (!data) return '';

    if (data?.score?.spnmessage) {
      if (data?.score?.activenation1 == 1) {
        const team1Score = parseInt(data?.score?.score2?.split('-')[0]) + 1;
        return `Target: ${team1Score}`
      } else if (data?.score?.activenation2 == 1) {
        const team2Score = parseInt(data?.score?.score1?.split('-')[0]) + 1;
        return `Target: ${team2Score}`
      }
    }
  };
  const shouldAnimateBackground: boolean = liveScoreData?.score?.spnballrunningstatus == 'Caught Out' || liveScoreData?.score?.spnballrunningstatus == '4' || liveScoreData?.score?.spnballrunningstatus == '6' || liveScoreData?.score?.spnballrunningstatus == ('Wicket!' || 'wicket') || liveScoreData?.score?.spnballrunningstatus == ('Out' || 'out');
  const sanitizedHTML = DOMPurify.sanitize(liveScoreData?.score?.comment);

  return (
    <div className={style.mainCricketWrraper}>
      {isMobile ?
        <Draggable style={{position: 'fixed', left: 'none', right: '10px', top: '52x', zIndex: 99999, cursor: 'move'}}>
          <div style={{
            display: 'flex',
            background: "#121212",
            height: 30,
            width: 30,
            opacity: '0.6',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center'
          }}><BsArrowRepeat style={{fontSize: 20, fontWeight: 'bolder', fill: 'cyan'}} onClick={() => {
            setIsCount(0);
            setIsRefresh(isRefresh + 1)
          }
          }/></div>
        </Draggable> : ''}
      {getUserInfo?.role && getUserInfo?.role !== "5" ? (
        <Modal
          open={open}
          title={modalTitle + " - " + CAP_BET_LOCKER}
          closable={false}
          onOk={handlelSubmit}
          className={theme + " " + style.betLockerModal}
          onCancel={handleCancel}
          forceRender={true}
          footer={[]}
        >
          <Form
            form={form}
            initialValues={INITIAL_VALUES}
            layout={LOWER_HORIZONTAL}
            className={style.betLockForm}
            onFinish={addBetLock}
            validateMessages={validateMessages}
          >
            <div className={style.formContainerBetLockModal}>
              <Radio.Group
                onChange={(e) => {
                  setUsersSelection(e?.target?.value);
                }}
                name="radiogroup"
                size="small"
                value={usersSelection}
                // defaultValue={usersSelection}
              >
                <Radio value={CAMEL_ALL_USERS}> {CAP_ALL_USERS} </Radio>
                <Radio value={CAMEL_UNLOCK_ALL}> {CAP_UNLOCK_ALL} </Radio>
                <Radio value={CAMEL_SELECTED_USERS}>
                  {" "}
                  {CAP_SELECTED_USERS}{" "}
                </Radio>
              </Radio.Group>

              <CustomButton
                title={CAP_CANCEL_BTN_TITLE}
                variant={LOWER_OUTLINED}
                onClick={handleCancel}
              />
              <CustomButton
                htmlType={LOWER_SUBMIT}
                title={CAP_SAVE_BTN_TITLE}
                variant={LOWER_FILLED}
                loading={isLoadingAddBetLock}
                // customClass={style.btnStyle}
              />
            </div>

            <div className={style.usersCheckBox}>
              {usersSelection === CAMEL_SELECTED_USERS &&
                allUsersData?.length &&
                allUsersData?.map((item, index) => {
                  return (
                    <Row key={index}>
                      <br/>
                      <Checkbox
                        onChange={(e) => {
                          onChangeCheckBox(e, index);
                        }}
                        checked={
                          item?.lockStatus === 1 ? true : false
                        }
                      >
                        {item?.userName}
                      </Checkbox>
                    </Row>
                  );
                })}
              <CommonInfiniteSkroll
                loading={isLoadingGetAllUsers}
                pageNumber={pageNumber}
                loadListDataApi={loadAllUsers}
                resTotalPages={resTotalPages}
                setListData={setAllUsersData}
                listData={allUsersData}
                setPageNumber={setPageNumber}
                setListDataNotToStore={setNotToSetAllUsersState}
              />
            </div>
          </Form>
        </Modal>
      ) : (
        ""
      )}
      {/*{liveScoreData?.score ?*/}
      {/*  <Row className={style.scoreWrapper} style={{marginTop: "4px"}}>*/}
      {/*    <Col span={24}*/}
      {/*         style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', rowGap: 4}}>*/}
      {/*      <div>*/}
      {/*        <div className={style.timeDetailSection}>*/}
      {/*          <span style={{display: 'flex', gap: 4}}>*/}
      {/*            <span>{liveScoreData?.score ? liveScoreData?.score?.activenation1 == 1 ? liveScoreData?.score?.spnnation1 : liveScoreData?.score?.spnnation2 : ''}</span>*/}
      {/*                  {liveScoreData?.score ? liveScoreData?.score?.activenation1 == 1 ? liveScoreData?.score?.score1 : liveScoreData?.score?.score2 : ''}*/}
      {/*          </span>*/}
      {/*          <span>{liveScoreData?.score ? liveScoreData?.score?.activenation1 == 1 ? liveScoreData?.score?.spnrunrate1 : liveScoreData?.score?.spnrunrate2 : ''}</span>*/}
      {/*          <span>{scoreDataHandler(liveScoreData)}</span>*/}
      {/*        </div>*/}
      {/*        /!* <div style={{ display: "flex", gap: "5px", alignItems:'center' }}>*/}
      {/*                  {liveScoreData?.score ? <span>This Overr: </span> : ""}*/}
      {/*                  {liveScoreData?.score?.overs[0]?.map((item, index) => {*/}
      {/*                    return <span key={index}>{item?.info}</span>;*/}
      {/*                  })}*/}
      {/*                </div> *!/*/}
      {/*        <div style={{display: 'flex',}}>*/}
      {/*          <span>{liveScoreData?.score?.spnmessage || ''}</span><span>*/}
      {/*                    /!* {liveScoreData?.score ? liveScoreData?.score?.activenation1? liveScoreData?.score?.spnreqrate1: liveScoreData?.score?.activenation2 ? liveScoreData?.score?.spnreqrate1 : '': ''} *!/*/}
      {/*          /!* {liveScoreData?.score ? liveScoreData?.score?.activenation1? liveScoreData?.score?.spnreqrate1: liveScoreData?.score?.spnreqrate2 : ''} *!/*/}
      {/*          {liveScoreData?.score && liveScoreData?.score?.activenation1 && liveScoreData?.score?.spnreqrate1 == 'RRR --' ? null : liveScoreData?.score?.spnreqrate1}*/}
      {/*                    </span>*/}
      {/*        </div>*/}
      {/*        <div style={{display: "flex", gap: "5px", alignItems: 'center'}}>*/}
      {/*          {liveScoreData?.score ? <span>Over:</span> : ""}*/}
      {/*          {liveScoreData?.score?.balls?.map((item, index) => {*/}
      {/*            return <span key={index}>{item}</span>;*/}
      {/*          })}*/}
      {/*          <span> = {liveScoreData?.score?.overScore ? liveScoreData?.score?.overScore : "0"}</span>*/}
      {/*        </div>*/}
      {/*        /!* <div style={{ display: "flex", gap: "5px", alignItems: 'center' }}>*/}
      {/*                {liveScoreData?.score ? <span>This Over: </span> : ""}*/}
      {/*                {liveScoreData?.score?.balls?.map((item, index) => {*/}
      {/*                  return (*/}
      {/*                    <div key={index}>*/}
      {/*                      <span>{item}</span>*/}
      {/*                      {liveScoreData?.score?.overScore ? liveScoreData?.score?.overScore : ""}*/}
      {/*                    </div>*/}
      {/*                  );*/}
      {/*                })}*/}
      {/*              </div>*!/*/}

      {/*      </div>*/}
      {/*      /!* <span style={{fontSize: "20px"}}>{matchStopReason?.eventId == allMarketIdsData?._id ? matchStopReason?.data?.matchStoppedReason : allMarketIdsData?.matchStoppedReason}</span> *!/*/}
      {/*      <div className={style.rightSection}>*/}
      {/*        /!* <h2 className={style.commentClass}>{liveScoreData?.score?.spnballrunningstatus ? liveScoreData?.score?.spnballrunningstatus : " "} </h2> *!/*/}
      {/*        <h2 className={`${style.commentClass} ${shouldAnimateBackground ? style.animateBackground : ''}`}>*/}
      {/*          {liveScoreData?.score?.spnballrunningstatus || " "}*/}
      {/*        </h2>*/}
      {/*        /!* <span>{liveScoreData?.score?.comment}</span> *!/*/}
      {/*        <span className={style.statusClass} dangerouslySetInnerHTML={{__html: sanitizedHTML}}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*  </Row> : ''}*/}
      {isCount === 0 ? (
        <Spin className={style.antIconClass} size="large"/>
      ) : (
        <Row className={style.mainRow} gutter={6}>
          <Col md={24} lg={16} xxl={16}>
            <div className={style.mainHeader}>
              {width < 991
                ? !(getUserInfo?.role === NUM_STR_5_ROLE) && (
                <TitleBarUpdated
                  title={<div className={theme + " " + style.betAndBookWapper}>
                    <Dropdown
                      overlay={dropdownMenu}
                      className={theme + " " + style.betLockDropDown}
                      visible={dropdownVisible}
                      onVisibleChange={(visible) => setDropdownVisible(visible)}
                      trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <CustomButton
                          customClass={style.btnStyle}
                          title={CAP_BET_LOCK_BTN_TITILE}
                          className={style.betLockBtn}
                          icon={<DownOutlined className={style.betLockIcon}/>}
                        />
                      </a>
                    </Dropdown>
                    <CustomButton customClass={style.btnStyle} title={"User Book"} onClick={() => {
                      navigate(`${constRoute?.userBookCricket}?id=${allMarketIdData?._id}&marketId=${queryMarketId}`);
                      const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
                      localStorage.setItem('userBookEvent', JSON.stringify({
                        ...otherEvents,
                        cricket: allMarketIdData?.name
                      }))
                    }}/>
                  </div>}
                />
              )
                : ""}
              <Row className={style.scoreSection}>


                {
                  ![8, 7, 10, 34, 35, 9,].includes(Number(queryId)) ?
                    <div className={style.mainScoresWrraper}>
                      <AllMatchesTable
                        isEditStake={isEditStake}
                        setIsEditStake={setIsEditStake}
                        copyDataOfFakeBets={lastMarketIdData}
                        // tableData={marketIdsData}
                        tableData={getMinutesCalculate(allMarketIdData?.openDate) ? marketIdsData?.filter((item) => !item?.marketName?.toLowerCase()?.includes('to win the toss') && item?.marketName != 'Tied Match') : marketIdsData?.filter((item) => item?.marketName != 'Tied Match')}
                        // tableData={getTimeDiff(allMarketIdData?.openDate)?.includes('ago') ?  marketIdsData?.filter((item)=>item?.marketName!='To Win The Toss'&&item?.marketName!='Tied Match'): marketIdsData?.filter((item)=>item?.marketName!='Tied Match')}
                        liveScoreData={liveScoreData}
                        liveMatchData={allMarketIdData}
                        raceStatus={raceStatus}
                        marketIdsForProfitLoss={getMinutesCalculate(allMarketIdData?.openDate) ? marketIdsForProfitLoss?.filter((item) => !item?.marketName?.toLowerCase()?.includes('to win the toss') && item?.marketName != 'Tied Match') : marketIdsForProfitLoss?.filter((item) => item?.marketName != 'Tied Match')}
                        getMatchBetsData={getMatchedBetsData}
                        currentPositinProfitLoss={currentPositinProfitLoss}
                      />
                    </div> : ""

                }

              {/* Bookmaker */}
              {bookMakerFancyData?.length &&
                (Number(queryId) == 8 || Number(queryId) === 6) ? (
                  <div className={style.mainScoresWrraper}>
                    <AllMatchesTable
                      isEditStake={isEditStake}
                      setIsEditStake={setIsEditStake}
                      copyDataOfFakeBets={lastMarketIdData}
                      tableData={bookMakerFancyData}
                      liveScoreData={liveScoreData}
                      liveMatchData={bookMakerFancyData}
                      isFancyBooker={true}
                      raceStatus={raceStatus}
                      bookMakerForProfitLoss={bookMakerForProfitLoss}
                      getMatchBetsData={getMatchedBetsData}
                      currentPositinProfitLoss={currentPositinProfitLoss}
                    />
                  </div>
                ) : (
                  ""
                )}
                 {/* Tied Match  */}
                 {marketIdsData?.filter((item) =>
                  item?.marketName?.includes("Tied Match")
                )?.length &&
                (Number(queryId) === 35 || Number(queryId) === 6) ? (
                  <div className={style.mainScoresWrraper}>
                    <AllMatchesTable
                      isEditStake={isEditStake}
                      setIsEditStake={setIsEditStake}
                      copyDataOfFakeBets={lastMarketIdData}
                      // tableData={marketIdsData}
                      tableData={
                        getMinutesCalculate(allMarketIdData?.openDate)
                          ? marketIdsData?.filter(
                              (item) =>
                                !item?.marketName
                                  ?.toLowerCase()
                                  ?.includes("to win the toss") &&
                                item?.marketName?.includes("Tied Match")
                            )
                          : marketIdsData?.filter((item) =>
                              item?.marketName?.includes("Tied Match")
                            )
                      }
                      // tableData={getTimeDiff(allMarketIdData?.openDate)?.includes('ago') ?  marketIdsData?.filter((item)=>!item?.marketName?.includes('To Win The Toss')&&item?.marketName?.includes('Tied Match')): marketIdsData?.filter((item)=>item?.marketName?.includes('Tied Match'))}
                      liveScoreData={liveScoreData}
                      liveMatchData={allMarketIdData}
                      raceStatus={raceStatus}
                      isFancyBooker={true}
                      marketIdsForProfitLoss={
                        getMinutesCalculate(allMarketIdData?.openDate)
                          ? marketIdsForProfitLoss?.filter(
                              (item) =>
                                !item?.marketName
                                  ?.toLowerCase()
                                  ?.includes("to win the toss") &&
                                item?.marketName?.includes("Tied Match")
                            )
                          : marketIdsForProfitLoss?.filter((item) =>
                              item?.marketName?.includes("Tied Match")
                            )
                      }
                      getMatchBetsData={getMatchedBetsData}
                      currentPositinProfitLoss={currentPositinProfitLoss}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/*  Fancy  */}
                {fancyDataApi?.length &&
                (Number(queryId) == 7 || Number(queryId) === 6) ? (
                  <div className={style.mainScoresWrraper}>
                    <AllMatchesTable
                      isEditStake={isEditStake}
                      setIsEditStake={setIsEditStake}
                      copyDataOfFakeBets={lastMarketIdData}
                      tableData={fancyDataApi}
                      liveScoreData={liveScoreData}
                      liveMatchData={allMarketIdData}
                      raceStatus={raceStatus}
                      isFancyBooker={true}
                      fancyProfitLoss={fancyProfitLoss}
                      getMatchBetsData={getMatchedBetsData}
                      currentPositinProfitLoss={currentPositinProfitLoss}
                    />
                  </div>
                ) : (
                  ""
                )}



              </Row>

              {/* Session Batting Area */}

              {liveScoreData == null || liveScoreData?.score == null
                ? ""
                : Number(queryId) === 9 ||
                  (Number(queryId) === 6 && (
                    <>
                      <div className={style.figureBetting}>
                        <TitleBarUpdated
                          title={
                            <span style={{ display: "flex" }}>
                              {bettingFigureHeading(liveScoreData)}
                              <span className={style.userIcon}>
                                <FaIdBadge
                                  onClick={() => {
                                    navigate(
                                      `${constRoute?.userBookCricket}?id=${allMarketIdData?._id}`
                                    );
                                    const otherEvents = JSON.parse(
                                      localStorage.getItem("userBookEvent")
                                    );
                                    localStorage.setItem(
                                      "userBookEvent",
                                      JSON.stringify({
                                        ...otherEvents,
                                        cricket: allMarketIdData?.name,
                                      })
                                    );
                                  }}
                                />
                              </span>
                            </span>
                          }
                          isRightRibbon={
                            <span className={style.zeroCommission}>
                              (0% commission)
                            </span>
                          }
                        />
                      </div>
                      <div className={style.bettingValWrapper}>
                        {getLoadAllBettingFiguresList?.map((item, index) => {
                          return (
                            <div className={style.mainWrapper}>
                              <div className={style.bettingVal}>{index}</div>
                              <div className={style.bettingVal}>
                                {item?.amount}
                              </div>
                              <div
                                className={style.bettingValBottom}
                                style={{
                                  color:
                                    bettingFigureProfitLoss &&
                                    bettingFigureProfitLoss[index]?.profitLoss >
                                      0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {Number(
                                  bettingFigureProfitLoss &&
                                    Math.round(
                                      Number(
                                        bettingFigureProfitLoss[index]
                                          ?.profitLoss
                                      )
                                    )
                                ) || ""}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ))}

              {liveScoreData == null || liveScoreData?.score == null ? (
                ""
              ) : Number(queryId) === 10 ||
                Number(queryId) === 34 ||
                Number(queryId) === 6 ? (
                <div className={style.jotaGameMain}>
                  {Number(queryId) == 10 || Number(queryId) === 6 ? (
                    // Jota kali
                    <div className={style.bothWrapper}>
                      <div className={style.jottaMain}>
                        <h1>JOTTA</h1>
                        <div className={style.jottaNewWrapper}>
                          <KaliJotaHead bg={"#FFB2AF"}>
                            <b>𝗝</b>
                          </KaliJotaHead>
                          <KaliJotaHead bg={"#8DD2F0"}>
                            <span>
                              100
                              <span
                                style={{ fontSize: "12px", color: "brown" }}
                              >
                                %
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                color:
                                  Number(jottaKaliProfitLoss?.JotaProfitLoss) >
                                  0
                                    ? "green"
                                    : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {getMatchedBetsData?.some(
                                (item) =>
                                  (item?.runnerId == "JOTTA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      )) ||
                                  (item?.runnerId == "KALI" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      ))
                              )
                                ? Math.round(
                                    Number(jottaKaliProfitLoss?.JotaProfitLoss)
                                  )
                                : ""}
                            </span>
                          </KaliJotaHead>
                        </div>
                      </div>
                      <div className={style.jottaMain}>
                        <h1>
                          KALI <span>(0% commission)</span>
                        </h1>
                        <div className={style.jottaNewWrapper}>
                          <KaliJotaHead bg={"#FFB2AF"}>
                            <b>𝗞</b>
                          </KaliJotaHead>
                          <KaliJotaHead bg={"#8DD2F0"}>
                            <span>
                              100
                              <span
                                style={{ fontSize: "12px", color: "brown" }}
                              >
                                %
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                color:
                                  Number(jottaKaliProfitLoss?.kaliProfitLoss) >
                                  0
                                    ? "green"
                                    : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {getMatchedBetsData?.some(
                                (item) =>
                                  (item?.runnerId == "KALI" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      )) ||
                                  (item?.runnerId == "JOTTA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      ))
                              )
                                ? Math.round(
                                    Number(jottaKaliProfitLoss?.kaliProfitLoss)
                                  )
                                : ""}
                            </span>
                          </KaliJotaHead>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {Number(queryId) == 10 || Number(queryId) === 6 ? (
                    // Chota bada
                    <div className={style.bothWrapperNew}>
                      <div className={style.jottaMain}>
                        <h1>CHOTA</h1>
                        <div className={style.chottaBarraWrapper}>
                          <KaliJotaHead bg={"#FFB2AF"}>
                            <b>𝗖𝗛</b>
                          </KaliJotaHead>
                          <KaliJotaHead bg={"#8DD2F0"}>
                            <span>
                              100
                              <span
                                style={{ fontSize: "12px", color: "brown" }}
                              >
                                %
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                color:
                                  Number(
                                    chottaBrraProfitLoss?.chottaProfitLoss
                                  ) > 0
                                    ? "green"
                                    : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {getMatchedBetsData?.some(
                                (item) =>
                                  (item?.runnerId == "CHOTA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      )) ||
                                  (item?.runnerId == "BARA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      ))
                              )
                                ? Math.round(
                                    Number(
                                      chottaBrraProfitLoss?.chottaProfitLoss
                                    )
                                  )
                                : ""}
                            </span>
                          </KaliJotaHead>
                        </div>
                      </div>
                      <div className={style.jottaMain}>
                        <h1>
                          BARA <span>(0% commission)</span>
                        </h1>
                        <div className={style.chottaBarraWrapper}>
                          <KaliJotaHead bg={"#FFB2AF"}>
                            <b>𝗕𝗥</b>
                          </KaliJotaHead>
                          <KaliJotaHead bg={"#8DD2F0"}>
                            <span>
                              100
                              <span
                                style={{ fontSize: "12px", color: "brown" }}
                              >
                                %
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                color:
                                  Number(
                                    chottaBrraProfitLoss?.barraProfitLoss
                                  ) > 0
                                    ? "green"
                                    : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {getMatchedBetsData?.some(
                                (item) =>
                                  (item?.runnerId == "BARA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      )) ||
                                  (item?.runnerId == "CHOTA" &&
                                    item?.betSession ==
                                      bettingFigureHeadingSession(
                                        liveScoreData
                                      ))
                              )
                                ? Math.round(
                                    Number(
                                      chottaBrraProfitLoss?.barraProfitLoss
                                    )
                                  )
                                : ""}
                            </span>
                          </KaliJotaHead>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}



{width <= 991 ? (
                  <div className={style.tabWrapper}>
                    {tvScoreCard === "1" ? tab1Data() : tab2Data()}
                  </div>
                ) : (
                  ""
                )}
            </div>
          </Col>
          <Col
            md={24}
            lg={8}
            xxl={8}
            // style={{ paddingTop: 6 }}
            className={style.mainTvWrraper}
          >
            {width > 991
              ? !(getUserInfo?.role === NUM_STR_5_ROLE) && (
                  <TitleBarUpdated
                    title={
                      <div className={theme + " " + style.betAndBookWapper}>
                        <Dropdown
                          overlay={dropdownMenu}
                          className={theme + " " + style.betLockDropDown}
                          trigger={["click"]}
                          visible={dropdownVisible}
                          onVisibleChange={(visible) =>
                            setDropdownVisible(visible)
                          }
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <CustomButton
                              title={CAP_BET_LOCK_BTN_TITILE}
                              customClass={style.btnStyle}
                              className={style.betLockBtn}
                              icon={
                                <DownOutlined className={style.betLockIcon} />
                              }
                            />
                          </a>
                        </Dropdown>
                        <CustomButton
                          customClass={style.btnStyle}
                          title={"User Book"}
                          onClick={() => {
                            navigate(
                              `${constRoute?.userBookCricket}?id=${allMarketIdData?._id}&marketId=${queryMarketId}`
                            );
                            const otherEvents = JSON.parse(
                              localStorage.getItem("userBookEvent")
                            );
                            localStorage.setItem(
                              "userBookEvent",
                              JSON.stringify({
                                ...otherEvents,
                                cricket: allMarketIdData?.name,
                              })
                            );
                          }}
                        />
                      </div>
                    }
                  />
                )
              : ""}
            {width > 991 ? (
              <div className={style.tabWrapper}>
                {tvScoreCard === "1" ? tab1Data() : tab2Data()}
              </div>
            ) : (
              ""
            )}
            <div>
              {/* <TitleBarUpdated title={`Open Bets (${openBetData?.length ? openBetData?.length : 0})`}/>  */}
              {getUserInfo?.role == "0" ? (
                <CricketCurrentPosition
                  tableData={secondInUseData}
                  updateBetPlaceHoldHandler={
                    loadingUpdateBetPlaceHold ? "" : updateBetPlaceHold
                  }
                  loadingUpdateBetPlaceHold={loadingUpdateBetPlaceHold}
                  secondsValue={secondsValue}
                />
              ) : (
                ""
              )}
            </div>
            <TitleBarUpdated
              title={
                <div className={style.fullBetListTitleBar}>
                  <span className={style.eventName}>{`Matched Bets (${
                    getMatchedBetsData?.length ? getMatchedBetsData?.length : 0
                  })`}</span>
                  <div>
                    <CustomButton
                      title="Full Bet List"
                      customClass={style.btnStyle}
                      onClick={() => {
                        navigate(
                          `${constRoute?.fullBetList}?eventId=${allMarketIdData?._id}`
                        );
                      }}
                    />
                  </div>
                </div>
              }
            />
            <OpenBetsTable tableData={getMatchedBetsData} />
          </Col>
        </Row>
      )}
    </div>
  );
});

export default CricketMarketWise;

const KaliJotaHead = styled.div<{ bg?: any }>`
  background-color: ${(p) => p?.bg};
  display: flex;
  flex-direction: column;
`;
