/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useRef, useState } from "react";
import style from "./style.module.scss"
import { CAP_EVENT, CAP_SEARCH, LOWER_EVENT, LOWER_LARGE } from "@utils/const";
import { CAMEL_BET_RATE } from "@utils/const/TableColumns";
import Table from "@components/common-components/table";
import { useStore } from "@stores/root-store";
import { Empty, Spin } from "antd";
import CustomButton from "@components/common-components/custom-button";
import ResultModal from "./result-modal";
import { ConfirmationModal } from "@components/common-components/confirmation-modal";
import SessionPopup from "./session-popup";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router-dom";
import FancyBookmakerPopup from "./fancy-bookmaker-popup";
import { sortCol } from "@utils/common-functions";
import { AiFillEye } from "react-icons/ai";
import TotalBetsDataModal from "./total-Bets-Data"
import { Draggable } from "drag-react";
import { BsArrowRepeat } from "react-icons/bs";
import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { CommonInput } from "@components/common-components/input";

interface Props {
}

const ActiveBets: React.FC<Props> = observer(({ ...props }) => {
  const {
    bet: { loadWaitingBetsForManuel },
    user: { LoadSaveMarketIdsDataForWinnerName, loadingSaveWinnerNameOfMarketId }
  } = useStore(null);
  const [betsData, setBetsData] = useState(null)
  const [originalBetsData, setOriginalBetsData] = useState(null)
  const [isClose, setIsClose] = useState(false);
  const [winnerPayload, setWinnerPayload] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCloseModel, setIsCloseModal] = useState(false)
  const [openMatchCloseModal, setOpenMatchCloseModal] = useState(false)
  const [matchData, setMatchData] = useState(null);
  const [isSessionPopOpen, setIsSessionPopOpen] = useState(false)
  const [isFancyBookmakerPopOpen, setIsFancyBookmakerPopOpen] = useState(false)
  const [isLoading, setIsLoadng] = useState(true)
  const [openBetsModel, setOpenBetsModal] = useState(false)
  const [totalBetsData, setTotalBetsData] = useState(null)
  const [specificBet, setSpecificBet] = useState(null)
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    loadWaitingBetsForManuelData();
    const intervalId = setInterval(loadWaitingBetsForManuelData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [searchVal])
  console.log('betsData', betsData)
  const loadWaitingBetsForManuelData = async (isSearch = searchVal) => {
    let res = await loadWaitingBetsForManuel();
    if (res?.success) {
      setIsLoadng(false)
      const dummy = [];
      for (const item in res?.results) {
        dummy.push({ eventData: res?.results[item]?.eventData, betsData: res?.results[item]?.bets })
      }
      const filterData = dummy?.filter((z) => z?.eventData?.eventName?.toLowerCase()?.includes(isSearch?.toLowerCase()))
      setBetsData(filterData)
      setOriginalBetsData(dummy)
    }
    console.warn('res', res)
  }

  const getMarketName = (data) => {
    // console.log('this is called', data)
    let marketName = ''
    data?.forEach((item) => {
      if (item?.isfancyOrbookmaker && item?.fancyData) {
        marketName = "Fancy"
      } else if (item?.isfancyOrbookmaker && item?.fancyData == null) {
        marketName = 'Bookmaker'
      } else {
        if (item?.runnerName == 'KALI' || item?.runnerName == "JOTTA") {
          marketName = `JOTTA / KALI`
        } else if (item?.runnerName == 'CHOTA' || item?.runnerName == "BARA") {
          marketName = `CHOTA / BARA`
        } else {
          marketName = item?.runnerName;
        }
      }
    })
    // console.log('runner name')
    return marketName;
  };

  // const getTotalBetAmount = (data) => {
  //   let totalBetAmount = null
  //   data?.forEach((item) => {
  //     totalBetAmount += parseInt(item?.betAmount)
  //   })
  //   return totalBetAmount;
  // }

  const profitLossCalculate = (data, eventData) => {
    const isFancy = getMarketName(data) == "Fancy";
    if (isFancy) {
      // const fancyRunnerTotalAmounts = {};
      // // const filterUsersData = data?.filter((k) => k?.calculateExp === true);
      // // const getRunnerName = item?.runnerName?.replace(/\s+/g, "");
      const filterBackBets = data?.filter((k) => k?.type === 0);
      const filterLayBets = data?.filter((k) => k?.type === 1);
      const backWinAmount = filterBackBets?.reduce((acc, item) => (acc + item?.winningAmount), 0);
      const backLossAmount = filterBackBets?.reduce((acc, item) => (acc + item?.loosingAmount), 0);
      const layWinAmount = filterLayBets?.reduce((acc, item) => (acc + item?.winningAmount), 0);
      const layLossAmount = filterLayBets?.reduce((acc, item) => (acc + item?.loosingAmount), 0);
      const arr = [{
        runner: data?.length ? data[0]?.fancyData : '',
        win: parseInt(backWinAmount) + parseInt(layWinAmount),
        loss: parseInt(backLossAmount) + parseInt(layLossAmount)
      }]
      return arr;
    } else {
      const filterUsersData = data?.filter((k) => k?.calculateExp === true);
      const runnerTotalAmounts = {};
      const runnersPositionData = filterUsersData?.map(
        (z) => z?.runnersPosition
      );
      runnersPositionData?.flat()?.forEach((item) => {
        const runnerId = item?.runner;
        const amount = item?.amount;

        if (!runnerTotalAmounts[runnerId]) {
          runnerTotalAmounts[runnerId] = 0;
        }
        runnerTotalAmounts[runnerId] += amount;
      });
      const result = Object.entries(runnerTotalAmounts).map(
        ([runner, amount]) => ({ runner: parseInt(runner), amount })
      );
      return result?.length ? result : [];
    }
  };
  const handleNavigateEvent = (data, eventData) => {
    data?.forEach((i) => {
      if (i?.sportsId == '1') {
        navigate(`${constRoute?.soccer}?id=${eventData?.eventId}`)
      } else if (i?.sportsId == '2') {
        navigate(`${constRoute?.tennis}?id=${eventData?.eventId}`)
      } else if (i?.sportsId == '4') {
        navigate(`${constRoute?.cricket}?id=${eventData?.eventId}`)
      } else if (i?.sportsId == '7') {
        navigate(`${constRoute?.horseRace}?id=${i?.marketId}&eId=${eventData?.eventId}&matchId=${i?.matchId}`)
      } else {
        navigate(`${constRoute?.greyhound}?id=${i?.marketId}&eId=${eventData?.eventId}&matchId=${i?.matchId}`)
      }
    })
  }

  const handleSportName = (data) => {
    if (data?.length) {
      if (data[0]?.sportsId == 1) {
        return "Soccer"
      } else if (data[0]?.sportsId == 2) {
        return "Tennis"
      } else if (data[0]?.sportsId == 4) {
        return "Cricket"
      } else if (data[0]?.sportsId == 7) {
        return "Horse"
      } else if (data[0]?.sportsId == 4339) {
        return "Greyhound"
      }
    }
  }

  const getRunnerName = (runnerId, runnerData) => {
    let runnerName = null
    if (runnerData?.length) {
      runnerData?.forEach((item) => {
        if (item?.SelectionId == runnerId) {
          runnerName = item?.runnerName
        }
      })
      return runnerName
    } else {
      return runnerId
    }
  };

  const getRunnerNameForJKCB = (runnerId, betsData) => {
    let runnerName = null
    betsData?.forEach((item) => {
      if (item?.runnerName == 'KALI' || item?.runnerName == "JOTTA") {
        if (runnerId == 0) {
          runnerName = 'KALI'
        } else if (runnerId == 1) {
          runnerName = 'JOTTA'
        }
      } else if (item?.runnerName == 'CHOTA' || item?.runnerName == "BARA") {
        if (runnerId == 0) {
          runnerName = 'CHOTA'
        } else if (runnerId == 1) {
          runnerName = 'BARA'
        }
      }
    })
    return runnerName
  }
  const colorList = [
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
    '#8b4513', '#2e8b57', '#9932cc', '#556b2f', '#8b008b',
    '#FA370D', '#4b0082', '#A66603', '#8a2be2', '#a0522d',
    '#800000', '#44A603', '#0C73A6', '#900C3F', '#A61403',
    '#0CA678', '#800080', '#008080', '#0FC000', '#20b2aa', '#FF5733',
    '#10A8B0',
  ];
  const handleCheckResult = (data) => {
    // console.warn('resulllllllll', data)
  }

  const calculateSession = (betData) => {
    // console.log('calculateSession: ', betData)
    const data = betData?.betsData
    const sessionData = data?.sort((a, b) => b?.betSession - a?.betSession)
    if (!sessionData) return ``
    if (sessionData[0].matchType === "ODI") {
      if (sessionData[0]?.betSession > 10) {
        return `2nd Inning ${(sessionData[0]?.betSession - 10) * 5} Overs Session`;
      }
      return `1st Inning ${sessionData[0]?.betSession * 5} Overs Session`;
    }
    if (sessionData[0].matchType === "T20") {
      if (sessionData[0]?.betSession > 4) {
        return `2nd Inning ${(sessionData[0]?.betSession - 4) * 5} Overs Session`;
      }
      return `1st Inning ${sessionData[0]?.betSession * 5} Overs Session`;
    }
    if (sessionData[0].matchType === "T10") {
      if (sessionData[0]?.betSession > 2) {
        return `2nd Inning ${(sessionData[0]?.betSession - 2) * 5} Overs Session`;
      }
      return `1st Inning ${sessionData[0]?.betSession * 5} Overs Session`;
    }
    if (sessionData[0].matchType === "TEST") {
      return `${sessionData[0]?.betSession * 10} Overs Session`;
    }

  }

  const calculateSessionInfo = (betData) => {
    const data = betData?.betsData
    let sessionData = data?.sort((a, b) => b?.betSession - a?.betSession)
    if (!sessionData) return ``
    sessionData = sessionData[0]
    return <>
      <p style={{ color: 'green' }}>(scrap score: {sessionData?.session?.scrap_session_score})</p>
      <p style={{ color: 'blue' }}>(api score: {sessionData?.session?.api_session_score})</p>
    </>
  }

  const isThreeBetsExist = (data) => {

    const users = [];
    const userBets = {}
    data?.forEach((item, index) => {
      if (users?.findIndex((i) => i === item?.userId) === -1) {
        users?.push(item?.userId)
      }
    })
    users?.forEach((item2) => {
      userBets[item2] = data?.filter((userBets) => userBets?.userId === item2)
    })
    return Object.values(userBets)?.some(
      (array: any[]) => (array as any[])?.filter((i) => i?.type == 0)?.length >= 3 || (array as any[])?.filter((i) => i?.type == 1)?.length >= 3
    );
  }
  const columns = [
    {
      title: "Sport",
      dataIndex: 'sport',
      sorter: (a, b) => Number(a?.betsData[0]?.sportsId) - Number(b?.betsData[0]?.sportsId),
      render: (_, data, index) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <b style={{ color: colorList[index] }}>{handleSportName(data?.betsData) || '--'}</b>
          {data?.eventData?.marketData?.winnerInfo ? "" :
            <span className={style.checkResultHead} style={{ color: '#00b181', whiteSpace: 'nowrap' }}
              onClick={() => handleCheckResult(data)}>Check Result</span>}
        </div>

      ),
    },
    {
      title: CAP_EVENT,
      dataIndex: LOWER_EVENT,
      sorter: (a, b) => Number(a?.eventData?.eventId) - Number(b?.eventData?.eventId),
      render: (_, data) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={style.eventNameHandler} style={{
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            color: data?.eventData?.marketData?.winnerInfo === -1 ? 'red' : '#00b181'
          }}
            onClick={() => handleNavigateEvent(data?.betsData, data?.eventData)}>{data?.eventData?.eventName || '--'}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div>{data?.eventData?.eventId ? <a href={`#/fancy-listings?eventId=${data?.eventData?.eventId}`}>{data?.eventData?.eventId}</a> : "---"}</div>
            <div>{`${data?.eventData?.marketData?.marketId ? `(${data?.eventData?.marketData?.marketId})` : ''}`}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Market Name',
      dataIndex: 'marketName',
      // sorter: (a, b) => sortCol(a, b, 'runnerName'),
      render: (_, data) => {
        // const getSessionData = data?.betsData?.map((item) => item?.betSession);
        // const sessionUnique = getSessionData.filter((value, index, self) => {
        //   return self.indexOf(value) === index;
        // });
        // console.log('sessionUnique', sessionUnique)

        return <div style={{
          whiteSpace: 'nowrap',
          background: data?.eventData?.marketData?.manuelClose ? 'lightgreen' : '',
          fontWeight: data?.eventData?.marketData?.manuelClose ? 'bold' : '',
          color: isThreeBetsExist(data?.betsData) ? 'red' : ""
        }}>{getMarketName(data?.betsData)?.includes('Figure') ?
          <div>Figure ({calculateSession(data)}){calculateSessionInfo(data)}</div> :
          ['KALI', "JOTTA", 'CHOTA', 'BARA']?.some(keyword => getMarketName(data?.betsData)?.includes(keyword)) ?
            <div>{getMarketName(data?.betsData)} ({calculateSession(data)}){calculateSessionInfo(data)}</div> :
            ['KALI', "JOTTA", 'CHOTA', 'BARA', "Fancy", "Bookmaker"]?.some(keyword => getMarketName(data?.betsData)?.includes(keyword)) ?
              getMarketName(data?.betsData) :
              data?.eventData?.marketData?.marketName}
          <span style={{ color: 'green', paddingLeft: '7px' }}>{getMarketName(data?.betsData)?.includes('Bookmaker') ? data?.eventData?.marketData?.winnerInfo ? `(Winner:${data?.eventData?.marketData?.winnerInfo})` : '' : ""}</span>
        </div>
      },
    },
    {
      title: "Total bets",
      sorter: (a, b) => Number(a?.betsData?.length) - Number(b?.betsData?.length),
      render: (_, data) => <p style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: isThreeBetsExist(data?.betsData) ? 'red' : ""
      }}>{data?.betsData?.length || ''} <span style={{ paddingLeft: '5px', cursor: 'pointer', marginTop: '4px' }}
        onClick={() => {
          setOpenBetsModal(true);
          setTotalBetsData(data?.betsData)
        }}>< AiFillEye className={style.eyeIcon} /></span></p>,
    },
    {
      title: 'Profit / Loss',
      dataIndex: CAMEL_BET_RATE,
      // sorter: (a, b) => a?.betRate - b?.betRate,
      render: (_, data) => {
        // console.log('data', data)
        return <>
          <div style={{ display: 'flex', gap: 10 }}>
            {profitLossCalculate(data?.betsData, data?.eventData)?.length ? profitLossCalculate(data?.betsData, data?.eventData)?.slice(0, 6)?.map((z, key) => (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "0px 4px",
                background: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? 'lightgreen' : ''
              }}>
                <b
                  style={{
                    whiteSpace: 'nowrap',
                    color: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? '#121212' : ""
                  }}
                >
                  {
                    data?.eventData
                      ? `${['KALI', "JOTTA", 'CHOTA', 'BARA']?.some(keyword => getMarketName(data?.betsData)?.includes(keyword))
                        ? getRunnerNameForJKCB(z?.runner, data?.betsData)
                        : getRunnerName(z?.runner, data?.eventData?.marketData?.runners)}`
                      : z?.runner
                  }
                  <span style={{ color: 'rgb(1 149 249)', paddingLeft: '10px' }}>
                    {getMarketName(data?.betsData) == "Fancy"
                      ? data?.eventData?.marketData?.winnerInfo
                        ? `(Score:${data?.eventData?.marketData?.winnerInfo})`
                        : ''
                      : ''
                    }
                  </span>
                </b>

                {getMarketName(data?.betsData) == "Fancy" ?
                  <span style={{ color: 'red', whiteSpace: 'nowrap' }} key={key}>-{Math.round(Number(z?.win))} / <span
                    style={{ color: 'green' }}>{Math.round(Number(z?.loss))}</span></span>
                  :
                  <span style={{ color: Number(z?.amount) >= 0 ? 'red' : 'green', whiteSpace: 'nowrap' }}
                    key={key}>{Number(z?.amount) >= 0 ? -Math.round(Number(z?.amount)) : Math.round(Number(z?.amount))?.toString()?.replaceAll('-', '')}</span>
                }
                {/* <span style={{color:Number(z?.amount)>=0 ? 'green' : 'red', whiteSpace:'nowrap'}} key={key}>{Math.round(Number(z?.amount))}</span> */}
              </div>
            )) : ""}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {profitLossCalculate(data?.betsData, data?.eventData)?.length > 6 ? profitLossCalculate(data?.betsData, data?.eventData?.marketData?.runners)?.slice(6, 12)?.map((z, key) => (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "0px 4px",
                background: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? 'lightgreen' : ''
              }}>
                <b
                  style={{
                    whiteSpace: 'nowrap',
                    color: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? '#121212' : ""
                  }}
                >
                  {data?.eventData ? getRunnerName(z?.runner, data?.eventData?.marketData?.runners) : z?.runner}
                  <span style={{ color: 'rgb(1 149 249)', paddingLeft: '10px' }}>
                    {
                      getMarketName(data?.betsData) == "Fancy"
                        ? data?.eventData?.marketData?.winnerInfo
                          ? `(Score:${data?.eventData?.marketData?.winnerInfo})`
                          : ''
                        : ''
                    }
                  </span>
                </b>
                {getMarketName(data?.betsData) == "Fancy" ?
                  <span style={{ color: 'red', whiteSpace: 'nowrap' }} key={key}>-{Math.round(Number(z?.win))} / <span
                    style={{ color: 'green' }}>{Math.round(Number(z?.loss))}</span></span>
                  :
                  <span style={{ color: Number(z?.amount) >= 0 ? 'red' : 'green', whiteSpace: 'nowrap' }}
                    key={key}>{Number(z?.amount) >= 0 ? -Math.round(Number(z?.amount)) : Math.round(Number(z?.amount))?.toString()?.replaceAll('-', '')}</span>
                }
              </div>
            )) : ""}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {profitLossCalculate(data?.betsData, data?.eventData)?.length > 12 ? profitLossCalculate(data?.betsData, data?.eventData)?.slice(12, 18)?.map((z, key) => (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "0px 4px",
                background: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? 'lightgreen' : ''
              }}>
                <b style={{
                  whiteSpace: 'nowrap',
                  color: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? '#121212' : ""
                }}>{data?.eventData ? getRunnerName(z?.runner, data?.eventData?.marketData?.runners) : z?.runner}<span
                  style={{
                    color: 'rgb(1 149 249)',
                    paddingLeft: '10px'
                  }}>{getMarketName(data?.betsData) == "Fancy" ? data?.eventData?.marketData?.winnerInfo ? `(Score:${data?.eventData?.marketData?.winnerInfo})` : '' : ''}</span></b>
                {getMarketName(data?.betsData) == "Fancy" ?
                  <span style={{ color: 'red', whiteSpace: 'nowrap' }} key={key}>-{Math.round(Number(z?.win))} / <span
                    style={{ color: 'green' }}>{Math.round(Number(z?.loss))}</span></span>
                  :
                  <span style={{ color: Number(z?.amount) >= 0 ? 'red' : 'green', whiteSpace: 'nowrap' }}
                    key={key}>{Number(z?.amount) >= 0 ? -Math.round(Number(z?.amount)) : Math.round(Number(z?.amount))?.toString()?.replaceAll('-', '')}</span>
                }
              </div>
            )) : ""}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {profitLossCalculate(data?.betsData, data?.eventData)?.length > 18 ? profitLossCalculate(data?.betsData, data?.eventData)?.slice(18, 24)?.map((z, key) => (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "0px 4px",
                background: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? 'lightgreen' : ''
              }}>
                <b style={{
                  whiteSpace: 'nowrap',
                  color: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? '#121212' : ""
                }}>{data?.eventData ? getRunnerName(z?.runner, data?.eventData?.marketData?.runners) : z?.runner}<span
                  style={{
                    color: 'rgb(1 149 249)',
                    paddingLeft: '10px'
                  }}>{getMarketName(data?.betsData) == "Fancy" ? data?.eventData?.marketData?.winnerInfo ? `(Score:${data?.eventData?.marketData?.winnerInfo})` : '' : ''}</span></b>
                {getMarketName(data?.betsData) == "Fancy" ?
                  <span style={{ color: 'red', whiteSpace: 'nowrap' }} key={key}>-{Math.round(Number(z?.win))} / <span
                    style={{ color: 'green' }}>{Math.round(Number(z?.loss))}</span></span>
                  :
                  <span style={{ color: Number(z?.amount) >= 0 ? 'red' : 'green', whiteSpace: 'nowrap' }}
                    key={key}>{Number(z?.amount) >= 0 ? -Math.round(Number(z?.amount)) : Math.round(Number(z?.amount))?.toString()?.replaceAll('-', '')}</span>
                }
              </div>
            )) : ""}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {profitLossCalculate(data?.betsData, data?.eventData)?.length > 24 ? profitLossCalculate(data?.betsData, data?.eventData)?.slice(24, 30)?.map((z, key) => (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "0px 4px",
                background: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? 'lightgreen' : ''
              }}>
                <b style={{
                  whiteSpace: 'nowrap',
                  color: data?.eventData?.marketData?.winnerInfo === getRunnerName(z?.runner, data?.eventData?.marketData?.runners) ? '#121212' : ""
                }}>{data?.eventData ? getRunnerName(z?.runner, data?.eventData?.marketData?.runners) : z?.runner}<span
                  style={{
                    color: 'rgb(1 149 249)',
                    paddingLeft: '10px'
                  }}>{getMarketName(data?.betsData) == "Fancy" ? data?.eventData?.marketData?.winnerInfo ? `(Score:${data?.eventData?.marketData?.winnerInfo})` : '' : ''}</span></b>
                {getMarketName(data?.betsData) == "Fancy" ?
                  <span style={{ color: 'red', whiteSpace: 'nowrap' }} key={key}>-{Math.round(Number(z?.win))} / <span
                    style={{ color: 'green' }}>{Math.round(Number(z?.loss))}</span></span>
                  :
                  <span style={{ color: Number(z?.amount) >= 0 ? 'red' : 'green', whiteSpace: 'nowrap' }}
                    key={key}>{Number(z?.amount) >= 0 ? -Math.round(Number(z?.amount)) : Math.round(Number(z?.amount))?.toString()?.replaceAll('-', '')}</span>
                }
              </div>
            )) : ""}
          </div>
        </>
      },
    },
    {
      title: "Action",
      dataIndex: 'action',
      // sorter: (a, b) => a?.position - b?.position,
      render: (_, data, index) => {
        return <CustomButton
          title={"Result"}
          className={specificBet === index ? style.resultBtn : ''}
          onClick={() => {
            if (['Figure', 'KALI', 'JOTTA', 'CHOTA', 'BARA']?.some(keyword => getMarketName(data?.betsData)?.includes(keyword))) {
              setIsSessionPopOpen(true)
              setMatchData(data);
              setSpecificBet(index)
              // } else if (getMarketName(data?.betsData) == "Fancy" || getMarketName(data?.betsData)?.includes('Bookmaker')) {
            } else if (getMarketName(data?.betsData) == "Fancy") {
              setIsFancyBookmakerPopOpen(true)
              setMatchData(data);
              setSpecificBet(index)
            } else {
              setOpenMatchCloseModal(true)
              setMatchData(data);
              setSpecificBet(index)
            }
          }}
        />
      },
    }
  ];
  console.warn('betsData', betsData)
  const handleCancelConfirmModel = () => {
    setOpenMatchCloseModal(true)
    setIsClose(false)
    setIsCloseModal(false)
  }

  const handleSaveMarketIDSWinnerRunner = async (payload) => {
    const res = await LoadSaveMarketIdsDataForWinnerName(payload);
    if (res?.success) {
      loadWaitingBetsForManuelData();
      setIsClose(false)
      setIsCloseModal(false)
      // const sport = gameType=='Cricket' ? "4": gameType=="Tennis" ? "1": "2"
      setOpenMatchCloseModal(false)
      setSelectedOptions({})
      setSpecificBet(null)
    }
  }
  const handleBetsSearch = (e) => {
    // setSearchVal(e);
    if (e?.trim() === "") {
      setBetsData(originalBetsData)
    } else {
      const filterData = originalBetsData?.filter((z) => z?.eventData?.eventName?.toLowerCase()?.includes(e?.toLowerCase()))
      setBetsData(filterData)
    }
  };

  return (
    <div className={style.mainWrapper}>
      <div className={style.searchWrapper}>
        {/* <Search
            ref={searchRef}
            placeholder={'Search By Event Name'}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            allowClear
            enterButton={
              <div className={style.searchIcon}>
                <SearchOutlined className={style.iconSearch} />
                {CAP_SEARCH}
              </div>
            }
            size={LOWER_LARGE}
            onSearch={handleBetsSearch}
            className={style.searchBarButton}
          /> */}
        <CommonInput
          ref={searchRef}
          placeholder={'Search By Event Name'}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <Draggable style={{
        position: 'fixed',
        left: 'none',
        right: '10px',
        top: '52x',
        zIndex: 99999,
        cursor: 'move',
        marginBottom: '10px'
      }}>
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
          setSearchVal('')
          loadWaitingBetsForManuelData('')
          setIsLoadng(true);
        }
        } /></div>
      </Draggable>
      {isLoading ? <Spin style={{ display: 'flex', justifyContent: 'center' }} /> : <Table
        className={style.tableStyle}
        dataSource={betsData}
        columns={columns}
        checkPagination={false}
      />}
      <ResultModal setIsClose={setIsClose}
        setWinnerPayload={setWinnerPayload}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        setSpecificBet={setSpecificBet}
        setIsCloseModal={setIsCloseModal} open={openMatchCloseModal} setOpen={setOpenMatchCloseModal}
        data={matchData} setMatchData={setMatchData} />
      <ConfirmationModal isConfirmDisable={!winnerPayload}
        loadingConfirmBtn={loadingSaveWinnerNameOfMarketId}
        onConfirm={() => {
          if (isCloseModel) {
            handleSaveMarketIDSWinnerRunner(winnerPayload)
          } else {
            setIsClose(false);
            // handleDelete(matchData?.Id, matchData.sportsId)
          }
        }} onCancel={() => {
          if (isCloseModel) {
            handleCancelConfirmModel()
          } else setIsClose(false)
        }} isOpen={isClose} modelTitle={isCloseModel ? 'Match Winner' : 'Match Cancel'} description={""}
        warningText={isCloseModel ? "Are you sure you want to update the result?" : "Are you sure you want to Cancel the match?"} />
      <SessionPopup setSpecificBet={setSpecificBet} setMatchData={setMatchData} data={matchData} open={isSessionPopOpen}
        setIsSessionPopOpen={setIsSessionPopOpen} />

      <FancyBookmakerPopup setSpecificBet={setSpecificBet} setMatchData={setMatchData} data={matchData}
        open={isFancyBookmakerPopOpen} setIsFancyBookmakerPopOpen={setIsFancyBookmakerPopOpen} />
      <TotalBetsDataModal loadWaitingBetsForManuelData={loadWaitingBetsForManuelData} open={openBetsModel}
        setOpen={setOpenBetsModal} data={totalBetsData} setData={setTotalBetsData} />
    </div>
  );
});

export default memo(ActiveBets);
