/* eslint-disable eqeqeq */
import {CAP_SPORT_HIGHLIGHTS} from "@components/users/const";
import type {SwitchProps} from 'antd/lib/switch';
import {
  CAP_AMOUNT,
  CAP_SEARCH,
  HASH_LINK,
  LOWER_LARGE,
} from "@utils/const";
import {Col, Modal, Row, Select, Spin, Switch, Button} from "antd";
import Search from "antd/es/input/Search";
import {observer} from "mobx-react";
import {useEffect, useState, useRef} from "react";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import {useStore} from "@stores/root-store";
import {FaPen} from "react-icons/fa";
import EditMatchModel from "./editMatchModel";
import {constRoute} from "@utils/route";
import {useNavigate} from "react-router-dom";
import {capitalizeFirstCharacter, sortCol} from "@utils/common-functions";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import ResumeModel from "./resumeModel";
import {Draggable} from 'drag-react';
import {BsArrowRepeat} from "react-icons/bs";
import {AiFillCloseCircle, AiOutlineReload} from "react-icons/ai";
import {isMobile} from "react-device-detect";
import moment from "moment";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import {GiCricketBat, GiSoccerKick, GiStopwatch, GiTennisRacket} from "react-icons/gi";
import useWindowSize from "@utils/hooks/useWindowSize";
import Table from "@components/common-components/table";
import {ConfirmationModal} from "@components/common-components/confirmation-modal";
import {socketUrl} from "@api/const";
import {io} from "socket.io-client"
import ResultModal from "./result-modal";
// import MarketModal from "./market-modal";
import {useTheme} from "@utils/hooks/useTheme";
import {ColTextCheck} from "@components/common-components/export-common-components/table-columns-text-check";
import axios from "axios";
// import axios from "axios";

const AdminDashboard = observer(() => {
  const innerWidth = useWindowSize().width
  const [allSportsHighlight, setAllSportsHighlight] = useState([]);
  const [originalAllSportsHighLight, setOriginalAllSportsHighLight] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [openConfirmationModel, setOpenConfirmationModel] = useState(false);
  const [matchOption, setMatchOption] = useState("");
  const [eventIdForIsShown, setEventIdForIsShown] = useState(null)
  const [eventUpdateMarketShown, setEventUpdateMarketShown] = useState(null)
  const [eventIdForMarkets, setEventIdForMarkets] = useState(null)
  const [eventIdBettingAllowed, setEventIdBettingAllowed] = useState(null)
  const [isFirstLoading, setIsFirstLoading] = useState(0);
  const [gameType, setGameType] = useState("Cricket");
  const [isClose, setIsClose] = useState(false);
  const [isloadFirstTime, setIsFirstLoad] = useState(0)
  const [isCloseModel, setIsCloseModal] = useState(false)
  const [openMatchCloseModal, setOpenMatchCloseModal] = useState(false)
  const [openMarketCloseModal, setopenMarketCloseModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);
  const [winnerPayload, setWinnerPayload] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('')
  const [tableData, setTableData] = useState([]);
// console.log('isCloseModel', isCloseModel)
  const theme = useTheme();
  const {
    user: {
      loadingSaveWinnerNameOfMarketId,
      LoadSaveMarketIdsDataForWinnerName,
      loadAllSportsHighLightData,
      loadSingleUser,
      loadMatchShown,
      loadupdatemarket,
      loadUpdateMarketStatusInPlay,
      deleteSport,
      activateEvent,
      refreshEvent,
      loadMatchBetAllowed
    },
    bet: {loadGetMarketsByEventIdData, loadingGetMarketsByEventIdData},
  } = useStore(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadAllSportsHighLights = async (sportId, isSearch = search) => {
    const response = await loadAllSportsHighLightData(sportId);
    if (response?.success) {
      setIsFirstLoading((isFirstLoading) => isFirstLoading + 1)
      const filterData = response?.results?.filter((z) => z?.match?.toLowerCase()?.includes(isSearch?.toLowerCase()))
      setAllSportsHighlight(filterData);
      setOriginalAllSportsHighLight(response?.results);
    } else {
      setIsFirstLoading((isFirstLoading) => isFirstLoading + 1)
      setAllSportsHighlight([])
      setOriginalAllSportsHighLight([])
    }
    setIsFirstLoad(1)
  };

  useEffect(() => {
    console.log('first use effect loadAllSportsHighLights')
    if (gameType?.toLowerCase() === 'cricket') {
      loadAllSportsHighLights('4', gameType ? search : '');
    } else if (gameType?.toLowerCase() === 'soccer') {
      loadAllSportsHighLights("1", gameType ? search : '');
    } else if (gameType?.toLowerCase() === 'greyhound') {
      loadAllSportsHighLights("4339", gameType ? search : '');
    } else if (gameType?.toLowerCase() === 'tennis') {
      loadAllSportsHighLights("2", gameType ? search : '');
    } else if (gameType?.toLowerCase() === 'horse race') {
      loadAllSportsHighLights("7", gameType ? search : '');
    } else {
      loadAllSportsHighLights('4');
    }
  }, []);
  // useEffect(()=>{

  // }, [])
  useEffect(() => {
    const socket = io(socketUrl, {path: "/websocket/"});
    if (gameType && isloadFirstTime == 1)
      socket.on('connect', () => {
        socket.emit('join', 'eventStatusChange')
        // console.log('allsfddsf', allSportsHighlight)
        socket.on('event_status', (data) => {
          const temp = [...allSportsHighlight]
          const tempOriginal = [...originalAllSportsHighLight]
          const index = temp?.findIndex((item) => item?.Id === data?.eventId)
          if (index > -1) {
            const indexOriginal = tempOriginal?.findIndex((item) => item?.Id === data?.eventId)
            temp[index]['status'] = data?.status
            tempOriginal[indexOriginal]['status'] = data?.status
            setAllSportsHighlight(temp)
            setOriginalAllSportsHighLight(tempOriginal)
          }
          console.log('event_status', data)
        })
      })
    return () => {
      socket.disconnect();
    };
  }, [gameType, isloadFirstTime])

  const onSearchUsers = (e) => {
    console.log('search:', originalAllSportsHighLight, allSportsHighlight)
    /*tmp start*/
    // const data = {
    //   status: 'CLOSED',
    //   eventId: '33077134'
    // }
    // const temp = [...allSportsHighlight]
    // const tempOriginal = [...originalAllSportsHighLight]
    // const index = temp?.findIndex((item) => item?.Id === data?.eventId)
    // const indexOriginal = tempOriginal?.findIndex((item) => item?.Id === data?.eventId)
    // if (index > -1) {
    //   temp[index]['status'] = data?.status
    //   tempOriginal[indexOriginal]['status'] = data?.status
    // }
    //
    // setAllSportsHighlight(temp)
    // setOriginalAllSportsHighLight(tempOriginal)
    // console.log('event_status', data)
    /*tmp end*/
    // setSearch(e)
    // if (e?.trim() === "") {
    //   setAllSportsHighlight(originalAllSportsHighLight)
    // } else {
    //   const filterData = originalAllSportsHighLight?.filter((z) => z?.match?.toLowerCase()?.includes(e?.toLowerCase()))
    //   setAllSportsHighlight(filterData)
    // }
  };

  // console.log('called', gameType)
  const onEdit = async (data) => {
    setEditLoading(data?._id);
    const payload = {id: data?._id};
    const res = await loadSingleUser(payload);
    if (res?.success) {
      navigate(
        `${constRoute?.userBetForm}/${res?.results?._id}`
      );
    }
    setEditLoading(null);
  };
  // const todayMatcheOption = [
  //   { key: 0, value: '1 day older' },
  //   { key: 1, value: '2 day older' },
  //   { key: 2, value: '3 day older' },
  //   { key: 3, value: '4 day older' },
  //   { key: 4, value: '5 day older' },
  //   { key: 6, value: 'More than 5 days older' },
  // ]

  const searchUserName = () => {
    return <Row gutter={[20, 20]} style={{padding: 20}}>
      <Col className={style.searchBarCol}>
        <Search
          ref={searchRef}
          placeholder={'Search By Match Name'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          enterButton={
            <div className={style.searchIcon}>
              <SearchOutlined className={style.iconSearch}/>
              {CAP_SEARCH}
            </div>
          }
          size={LOWER_LARGE}
          onSearch={onSearchUsers}
          className={style.searchBarButton}
        />
      </Col>
      {/* <Col>
          <Select
            className={style.todayMatchWrapper}
            options={todayMatcheOption}
            placeholder={"Today's Matches"}
            onChange={(e) => setMatchOption(e)}
            allowClear
          />
        </Col> */}
    </Row>
  }

  const handleNavigateFunction = (data, item) => {
    if (data?.toLowerCase() === "cricket")
      navigate(`${constRoute?.cricket}?id=${item?.Id}`);
    else if (data?.toLowerCase() === "tennis")
      navigate(`${constRoute?.tennis}?id=${item?.Id}`);
    else if (data?.toLowerCase() === "soccer")
      navigate(`${constRoute?.soccer}?id=${item?.Id}`);
    else if (data?.toLowerCase() === "grayhound")
      navigate(`${constRoute?.greyhound}?id=${item?.Id}`);
    else if (data?.toLowerCase() === "horseRace")
      navigate(`${constRoute?.horseRace}?id=${item?.Id}`);
  }

  const handleMarketStatusChange = async (checked, data) => {
    const {eventId, marketId} = data
    if (eventId && marketId) {
      console.log('handleMarketStatusChange', checked, eventId, marketId)
      const dataObj = {checked, eventId, marketId}
      const res = await loadUpdateMarketStatusInPlay(dataObj)
      console.log("handleMarketStatusChange", res);
      getMarketsByEventId()
    }
  }

  const handleChange = async (checked, id, sportId) => {
    const data = {matchId: id, status: checked};
    const res = await loadMatchShown(data);
    if (res?.success) {
      loadAllSportsHighLights(sportId);
      setEventIdForIsShown(null);
    }
  }

  const handleChangeFun = async (checked, Id, sportId) => {
    const data = {Id: Id, status: checked};
    const res = await loadupdatemarket(data);
    console.log(res, "loadupdatemarket");

    if (res?.success) {
      loadAllSportsHighLights(sportId);
      // setEventIdForIsShown(null);
      setEventUpdateMarketShown(null)
    }
  }

  const getMarketsByEventId = async () => {
    const payload = {
      id: eventIdForMarkets.Id
    };

    try {
      const res = await loadGetMarketsByEventIdData(payload);
      // console.log("GetMarketsByEventId", JSON.stringify(res));

      if (res?.success) {
        // Assuming your API response is an array of objects
        setTableData(res.data); // Update state with the fetched data
        // console.log("res.data---", res.data);

      }
    } catch (error) {
      console.error("Error GetMarketsByEvent:", error);
    }
  };

  useEffect(() => {
    if (eventIdForMarkets) {
      getMarketsByEventId();
    }
  }, [eventIdForMarkets]);

  const handleChangeOfBettingAllowed = async (checked, id, sportId) => {
    const data = {matchId: id, status: checked};
    try {
      const res = await loadMatchBetAllowed(data);
      if (res?.success) {
        loadAllSportsHighLights(sportId);
        setEventIdBettingAllowed(null);
      }
    } catch (error) {
      console.log('errr', error)
      setEventIdBettingAllowed(null);
    }
  }

  const handleDelete = async (id, sportId) => {
    const res = await deleteSport(id);
    if (res?.success) {
      loadAllSportsHighLights(sportId);
      setEventIdForIsShown(null);
    }
  }

  const handleActivateEvent = async () => {
    const res = await activateEvent(eventIdForMarkets.Id)
    console.log('handleActivateEvent', res)
    getMarketsByEventId();
  }

  const handleRefreshEvent = async (menuItem) => {
    // const res = await activateEvent(eventIdForMarkets.Id)
    let sportsId = 4

    if (menuItem?.title?.toLowerCase() === 'cricket') {
      sportsId = 4
    } else if (menuItem?.title?.toLowerCase() === 'soccer') {
      sportsId = 1
    } else if (menuItem?.title?.toLowerCase() === 'greyhound') {
      sportsId = 4339
    } else if (menuItem?.title?.toLowerCase() === 'tennis') {
      sportsId = 2
    } else if (menuItem?.title?.toLowerCase() === 'horse race') {
      sportsId = 7
    }
    const res = await refreshEvent(`${sportsId}`)
    console.log('handleRefreshEvent', menuItem, sportsId, res, gameType)
    if (gameType === menuItem?.title) {
      console.log('handleRefreshEvent reload')
      await loadAllSportsHighLights(`${sportsId}`, '')
    }
    // getMarketsByEventId();
  }
  // const onChange = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };
  const showModal = async (data) => {
    setEventIdForMarkets(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columnsData = [
    {
      title: HASH_LINK,
      render: (text, data, index) => <p>{index + 1}</p>,
    },
    // {
    //   title: "Id",
    //   dataIndex: "Id",
    //   // sorter: (a, b) => sortCol(a, b, "id"),
    //   render:(text, data, index) => <p>{data?._id}</p>
    // },
    {
      title: "Sports id",
      dataIndex: "sportID",
      // sorter: (a, b) => sortCol(a, b, "runnerName"),
      render: (text, data, index) => <p>{data?.sportID}</p>
      // render:(data)=> <span> {data[0]?.sportID} </span>,
    },
    {
      title: 'Event Id',
      dataIndex: 'eventid',
      // sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p>{data?.eventId}</p>,
    },
    {
      title: 'Event Name',
      dataIndex: 'eventname',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p> {eventIdForMarkets?.match ? eventIdForMarkets?.match : "--"}</p>,
    },
    {
      title: 'Market Id',
      dataIndex: 'marketid',
      // sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p> {data?.marketId}</p>,
    },
    {
      title: 'Market Name',
      dataIndex: 'marketname',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p> {data?.marketName ? data?.marketName : "--"}</p>,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      // sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p>{data?.volume ? data?.volume : "--"}</p>,

    },
    {
      title: 'Status',
      dataIndex: 'status',
      // sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (text, data, index) => <p> {data?.status ? data?.status : "--"}</p>,
    },
    {
      title: <div className={style.titleCenter} style={{whiteSpace: 'nowrap'}}>Status</div>,
      key: "status",
      dataIndex: "status",
      render: (_, data, index) => {
        return <>
          <p className={style.centerContent}>
            {<Switch
              checked={data?.status === 'OPEN'}
              onChange={(checked) => {
                handleMarketStatusChange(checked, data);
              }}
            />}
          </p>
        </>
      },
    },
  ];

  const columns = [
    {
      title: <div style={{width: 110}}>Date</div>,
      key: "date",
      dataIndex: "date",
      width: 160,
      sorter: (a, b) => a?.openDate - b?.openDate,
      render: (_, data) => {
        return <>
          <b
            className={`${style.dateHead}`}>{data?.openDate ? moment(new Date(data?.openDate)).format('DD-MMM-YYYY h:mm A') : ""}</b>
        </>
      },
    },
    {
      title: <div>{capitalizeFirstCharacter(gameType)}</div>,
      key: "match",
      dataIndex: "match",
      width: "40%",
      sorter: (a, b) => Number(a?.inplay) - Number(b?.inplay),
      render: (_, data) => {
        return (
          <p
            className={style.clickAble}
            onClick={() => {
              handleNavigateFunction(gameType, data);
            }}
            style={{
              color: !data?.marketIds?.length ? 'red' : '',
            }}
          >
            {data?.match}
            <span
              style={{cursor: "default"}}
              className="data-id-span"
              data-id={data?.Id}
              // Prevent click propagation to the parent p element:
              onClick={(event) => event.stopPropagation()}
            >
            {data?.Id}
          </span>
            {data?.inplay ? (
              <span className={style.activeSpan}></span>
            ) : (
              ""
            )}
            {data?.inplayFromServer ? (
              <span style={{cursor: "default"}} className={style.activeSpanServerInplay}></span>
            ) : (
              ""
            )}
          </p>
        );
      },
    },
    {
      title: <div className={style.titleCenter}>Status</div>,
      key: "status",
      dataIndex: "status",
      render: (_, data) => {
        return <>
          <div className={style.centerContent}> {data?.status || ""} {`(${data?.CompanySetStatus})` || ""}  </div>
        </>
      },
    },
    {
      title: <div className={style.titleCenter}>Type</div>,
      key: "type",
      dataIndex: "type",
      render: (_, data) => {
        return <>
          <div className={style.centerContent}>{data?.matchType ? data?.matchType : ""}</div>
        </>
      },
    },
    {
      title: <div className={style.titleCenter}>BetFair</div>,
      key: "betfair",
      dataIndex: "betfair",
      render: (_, data) => {
        return <>
          <div className={style.centerContent}>{data?.Id ? data?.Id?.length <= 8 ? 'Yes' : "No" : ''}</div>
        </>
      },
    },
    {
      title: <div className={style.titleCenter}>{CAP_AMOUNT}</div>,
      key: "amount",
      dataIndex: "amount",
      render: (_, data) => {
        return <>
          <p className={style.titleCenter}>{data?.amount || 0}</p>
        </>
      },
    },
    {
      title: <div className={style.titleCenter} style={{whiteSpace: 'nowrap'}}>Betting Allowed</div>,
      key: "betAllowed",
      dataIndex: "betAllowed",
      render: (_, data, index) => {
        return <>
          <p className={style.centerContent}>
            {<Switch
              checked={data?.betAllowed}
              loading={eventIdBettingAllowed === data?.Id ? true : false}
              onChange={(checked) => {
                setEventIdBettingAllowed(data?.Id);
                handleChangeOfBettingAllowed(checked, data?.Id, data?.sportsId);
              }}
            />}
          </p>
        </>
      },
    },
    {
      title: <div className={style.titleCenter} style={{whiteSpace: 'nowrap'}}>Is Shown</div>,
      key: "isShown",
      dataIndex: "isShown",
      render: (_, data, index) => {
        return <>
          <p className={style.centerContent}>
            {<Switch
              checked={data?.isShowed}
              disabled={data?.sportsId == "4" ? !data?.iconStatus : false}
              loading={eventIdForIsShown === data?.Id ? true : false}
              onChange={(checked) => {
                handleChange(checked, data?.Id, data?.sportsId);
                setEventIdForIsShown(data?.Id);
              }}
            />}
            {((data.sportsId === '7' || data.sportsId === '4339' ) && data.lastCheckMarket && !data.marketIds?.length)? <b>WIN:0</b> : ''}
          </p>
        </>
      },
    },
    {
      title: <div className={style.titleCenter} style={{whiteSpace: 'nowrap'}}>Comp Status</div>,
      key: "comstatus",
      dataIndex: "comStatus",
      render: (_, data, index) => {
        return <>
          <p className={style.centerContent}>
            {<Switch
              checked={data?.CompanySetStatus === "OPEN"}
              disabled={data?.sportsId == "4" ? !data?.iconStatus : false}
              loading={eventUpdateMarketShown === data?.Id ? true : false}
              onChange={(checked) => {
                handleChangeFun(checked ? "OPEN" : "CLOSED", data?.Id, data?.sportsId);
                // setEventIdForIsShown(data?.Id);
                setEventUpdateMarketShown(data?.Id)
              }}
            />}
          </p>
        </>
      },
    },
    {
      title: <div className={style.centerContent}>Actions</div>,
      key: "actions",
      render: (_, data) => {
        return (
          <div className={style.centerContent}>
            {
              gameType?.toLowerCase() === 'cricket' ? <>
                <CustomButton
                  className={style.userIconsEdit}
                  title={""}
                  onClick={() => {
                    setOpen(true);
                    setMatchData(data);
                  }}
                  icon={
                    <FaPen
                      className={
                        data?.iconStatus ? style.editBtn : style.editBtnRed
                      }
                    />
                  }
                />

                {/* <CustomButton
              title={"Markets"}
              onClick={() => {  showModal(data) }}
            /> */}

                <CustomButton
                  title={"Cancel"}
                  onClick={() => {
                    setIsClose(true);
                    setIsCloseModal(false);
                    setMatchData(data);
                  }}
                /></> : ''
            }
            <CustomButton
              title={"Markets"}
              onClick={() => {
                showModal(data)
              }}
            />
            <CustomButton
              title={"Result"}
              onClick={() => {
                setOpenMatchCloseModal(true)
                setMatchData(data);
              }}
            />
          </div>
        );
      },
    },
  ];

  const refreshHandler = () => {
    setSearch('')
    searchRef.current.blur();
    setIsFirstLoading(0);
    setAllSportsHighlight([]);
    setOriginalAllSportsHighLight([]);
    loadAllSportsHighLights('4', '');
    setGameType("Cricket")
  }

  const gameTypesArr = [
    {
      title: "Cricket",
      size: allSportsHighlight?.length || 0
    },
    {
      title: "Tennis",
      size: allSportsHighlight?.length || 0
    },
    {
      title: "Soccer",
      size: allSportsHighlight?.length || 0
    },
    {
      title: "Greyhound",
      size: allSportsHighlight?.length || 0
    },
    {
      title: "Horse Race",
      size: allSportsHighlight?.length || 0
    },
  ];
  // const handleOpenMarketsModel = ()=>{
  //   setopenMarketCloseModal(true)
  //   setIsClose(false)
  //   setIsCloseModal(false)
  // }
  const handleCancelConfirmModel = () => {
    setOpenMatchCloseModal(true)
    setIsClose(false)
    setIsCloseModal(false)
  }

  const handleSaveMarketIDSWinnerRunner = async (payload) => {
    // console.log('sdfsf', selectedOption)
    // const payload ={
    //   eventId: selectedOption?.eventId,
    //   marketId:selectedOption?.marketId,
    //   runnerId: selectedOption?.SelectionId
    // }
    // console.log('this is payload', payload)
    const res = await LoadSaveMarketIdsDataForWinnerName(payload);
    if (res?.success) {
      setIsClose(false)
      setIsCloseModal(false)
      const sport = gameType == 'Cricket' ? "4" : gameType == "Tennis" ? "1" : "2"
      await loadAllSportsHighLights(sport)
      setOpenMatchCloseModal(false)
      setSelectedOptions({})
    }
  }

  return (
    <div className={style.adminDashboardWrapper}>
      {isMobile ? <Draggable className={style.draggAbleWrapper}>
        <div><BsArrowRepeat style={{fontSize: 20, fontWeight: 'bolder', fill: 'cyan'}} onClick={() => {
          setSearch('')
          searchRef.current.blur();
          setIsFirstLoading(0);
          loadAllSportsHighLights('4', '');
        }}/></div>
      </Draggable> : ''}
      <Row>
        <TitleBarUpdated
          title={'Search Match'}
          icon={<FilterOutlined/>}
          isIcon={true}
        />
        <div className={style.searchBarButtonCard}>{searchUserName()}</div>

      </Row>
      <Row>
        <TitleBarUpdated
          title={CAP_SPORT_HIGHLIGHTS}
          icon={<FilterOutlined/>}
          isIcon={true}
          btnTitle={"Refresh"}
          isButton={true}
          clickHandler={refreshHandler}
        />
        <Col className={style.tableCard}>
          {isFirstLoading === 0 ? (
            <Spin className={style.antIconClass} size="large"/>
          ) : (
            <div className={style.gamesWrapper}>
              <Row className={style.newTitleBarRow} style={{marginTop: 10}}>
                {gameTypesArr?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      xs={12} sm={12} md={12} lg={6} xxl={6}
                      // span={6}
                      className={gameType === item?.title ? style.newTitleWrapperActive : style.newTitleWrapper}
                      onClick={async (e) => {
                        e.preventDefault()
                        setGameType(item?.title);
                        if (!(item?.title == gameType)) {
                          setSearch('')
                          searchRef.current.blur();
                        }
                        setIsFirstLoading(0);
                        if (item?.title?.toLowerCase() === 'cricket') {
                          loadAllSportsHighLights('4', item?.title == gameType ? search : '');
                        } else if (item?.title?.toLowerCase() === 'soccer') {
                          loadAllSportsHighLights("1", item?.title == gameType ? search : '');
                        } else if (item?.title?.toLowerCase() === 'greyhound') {
                          loadAllSportsHighLights("4339", item?.title == gameType ? search : '');
                        } else if (item?.title?.toLowerCase() === 'tennis') {
                          loadAllSportsHighLights("2", item?.title == gameType ? search : '');
                        } else if (item?.title?.toLowerCase() === 'horse race') {
                          loadAllSportsHighLights("7", item?.title == gameType ? search : '');
                        }
                      }}
                    >
                      <TitleBarUpdated title={<span className={style.titleHead}>{item?.title}</span>}
                                       isIcon={true}
                                       icon={item?.title === 'Soccer' ? <GiSoccerKick
                                         className={gameType === item?.title ? style.iconSelectedWrapper : style.iconWrraper}/> : item?.title === "Tennis" ?
                                         <GiTennisRacket
                                           className={gameType === item?.title ? style.iconSelectedWrapper : style.iconWrraper}/> : item?.title === "Cricket" ?
                                           <GiCricketBat
                                             className={gameType === item?.title ? style.iconSelectedWrapper : style.iconWrraper}/> :
                                           <GiStopwatch
                                             className={gameType === item?.title ? style.iconSelectedWrapper : style.iconWrraper}/>}
                                       isRightRibbon={<div
                                         className={style.sizeHead}>{gameType === item?.title ? item?.size : ''}</div>}
                      />
                      <Button size="small" type="primary" color={"white"} className={'dashboard-reload-btn'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRefreshEvent(item)
                              }}>
                        refresh
                      </Button>
                    </Col>
                  );
                })}
              </Row>
              {
                gameType === "Tennis" ? (
                  <Table
                    columns={columns?.filter((item) => item?.dataIndex !== "type")}
                    dataSource={allSportsHighlight || []}
                    style={{whiteSpace: "nowrap"}}
                  />
                ) : (
                  ""
                )
              }
              {
                gameType === "Cricket" ? (
                  <Table
                    columns={columns}
                    dataSource={allSportsHighlight || []}
                    style={{whiteSpace: "nowrap"}}
                  />
                ) : (
                  ""
                )
              }
              {
                gameType === "Soccer" ? (
                  <Table
                    columns={columns?.filter((item) => item?.dataIndex !== "type")}
                    dataSource={allSportsHighlight || []}
                    style={{whiteSpace: "nowrap"}}
                  />
                ) : (
                  ""
                )
              }
              {
                gameType === "Greyhound" ? (
                  <Table
                    columns={columns?.filter((item) => item?.dataIndex !== "type")}
                    dataSource={allSportsHighlight || []}
                    style={{whiteSpace: "nowrap"}}
                  />
                ) : (
                  ""
                )
              }
              {
                gameType == "Horse Race" ? (
                  <Table
                    columns={columns?.filter((item) => item?.dataIndex !== "type")}
                    dataSource={allSportsHighlight || []}
                    style={{whiteSpace: "nowrap"}}
                  />
                ) : (
                  ""
                )
              }
            </div>

          )
          }
        </Col>
      </Row>
      <EditMatchModel
        open={open}
        setOpen={setOpen}
        data={matchData}
        setMatchData={setMatchData}
        setIsFirstLoad={setIsFirstLoad}
        updateDataLoad={loadAllSportsHighLights}
        setOpenConfirmationModel={setOpenConfirmationModel}
      />
      <ResumeModel
        openConfirmationModel={openConfirmationModel}
        setOpenConfirmationModel={setOpenConfirmationModel}
        setOpenEditModel={setOpen}
        data={matchData}
      />
      <ConfirmationModal isConfirmDisable={!winnerPayload} loadingConfirmBtn={loadingSaveWinnerNameOfMarketId}
                         onConfirm={() => {
                           console.log('called')
                           if (isCloseModel) {
                             handleSaveMarketIDSWinnerRunner(winnerPayload)
                           } else {
                             setIsClose(false);
                             handleDelete(matchData?.Id, matchData.sportsId)
                           }
                         }} onCancel={() => {
        if (isCloseModel) {
          handleCancelConfirmModel()
        } else setIsClose(false)
      }} isOpen={isClose} modelTitle={isCloseModel ? 'Match Winner' : 'Match Cancel'} description={""}
                         warningText={isCloseModel ? "Are you sure you want to update the result?" : "Are you sure you want to Cancel the match?"}/>
      <ResultModal setIsClose={setIsClose}
        //  setSelectedOption={setSelectedOption} selectedOption={selectedOption}
                   setWinnerPayload={setWinnerPayload}
                   setSelectedOptions={setSelectedOptions}
                   selectedOptions={selectedOptions}
                   setIsCloseModal={setIsCloseModal} open={openMatchCloseModal} setOpen={setOpenMatchCloseModal}
                   data={matchData} setMatchData={setMatchData}/>
      {/* {loadingGetMarketsByEventIdData ? <Spin className={style.antIconClass} size="large" />: */}

      <Modal
        title={<div className={'title-body'}>
          <TitleBarUpdated title="Open Markets Modal"/>
          <Button type="primary" className={'title-btn'} onClick={handleActivateEvent}>
            Activate
          </Button>
        </div>}
        className={theme + " " + style.resultModal}
        closable={false}
        footer={[]}
        width={1000}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {loadingGetMarketsByEventIdData ? <div className={style.spinDiv}><Spin/></div> :
          <Table
            className={style.tableStyle}
            columns={columnsData}
            dataSource={tableData}
          />
        }
      </Modal>
      {/* } */}
    </div>
  );
});

export default AdminDashboard;
