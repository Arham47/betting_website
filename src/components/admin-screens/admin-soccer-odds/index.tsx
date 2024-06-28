/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "@stores/root-store";
import { Col, Dropdown, Form, Modal, Radio, Row, Spin } from "antd";
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
  LOWER_SUBMIT,
  NUM_STR_5_ROLE,
} from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import { validateMessages } from "@utils/json-data";
import Checkbox from "antd/lib/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import CommonInfiniteSkroll from "@components/common-components/common-infinite-skroll";
import useWindowSize from "@utils/hooks/useWindowSize";
import { constRoute } from "@utils/route";
import { getSingleUrlParam } from "@utils/common-functions";
import {io} from "socket.io-client"
import { DownOutlined } from "@ant-design/icons";
import { Draggable } from "drag-react";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { socketUrl } from "@api/const";
const AdminSoccerOdds = observer(() => {
  const location = useLocation();
  const eventId = getSingleUrlParam(location, "id");
  const { width } = useWindowSize();
  const theme = useTheme();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [usersSelection, setUsersSelection] = useState(CAMEL_SELECTED_USERS);
  const [allUsersData, setAllUsersData] = useState([]);
  const [isEditStake, setIsEditStake] = useState({
    status: false,
    val: 0,
    runnerName: "",
  });
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [notToSetAllUsersState, setNotToSetAllUsersState] = useState(false);
  const [resTotalPages, setResTotalPages] = useState(1);
  const [iframeScore, setIframeScore] = useState(null);
  const navigate = useNavigate();
  const [tvScoreCard] = useState("1");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(0);
  const [openBetData , setOpenBetData] = useState([]);
  const [matchBetData, setMatchBetData]=useState([]);
  const [isCount, setIsCount] = useState(0);
  const [isFirst, setIsFirst] = useState(1)
  const [marketIdsData, setMarketIdsData] = useState(null);
  const [lastMarketIdData, setLastMarketIdData] = useState(null);
  const [allMarketIdData, setAllMarketIdData] = useState(null);
  const [liveScoreData, setLiveScoreData] = useState(null)
  const [raceStatus, setRaceStatus] =  useState(null)
  const [marketIdsForProfitLoss, setMarketIdsForProfitLoss] = useState([])
  const [winnerName, setWinnerName] = useState('')
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
    },
    bet: {
      loadLiveStreemingData,
      loadMatchedBets,
      getMatchedBetsData,
      loadCurrentPositionDetails,
      loadEventWinnerName
    },
  } = useStore(null);

  useEffect(() => {
    const intervalId = setInterval(getEventWinner, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [eventId])

  const getEventWinner = async() => {
   if(eventId){
    const res = await loadEventWinnerName({eventId: eventId});
    if(res?.success){
      setWinnerName(res?.result?.winner)
    }
  }
}

  const handleProfitLoss = (betsData) => {
    console.warn('betsData?.lengt', betsData?.length)
    let temp = JSON.parse(JSON.stringify(marketIdsData))
    if(betsData?.length){
      temp?.forEach((z, idx) => {
        z?.last_odds?.runners?.forEach((k, idx2) => {
          let dummy = []
          betsData?.forEach((i) => {
            if(i?.marketId == z?.last_odds?.marketId ){
              if(i?.type == 0){
                if(i?.runner == k?.SelectionId){
                  dummy.push({SelectionId:z?.SelectionId, runnerId:i?.runner, profitVal: i?.loosingAmount})
                }else{
                  dummy.push({SelectionId:z?.SelectionId, runnerId:i?.runner, profitVal: i?.maxWinningAmount})
                }
              }else{
                if(i?.runner == k?.SelectionId){
                  dummy.push({SelectionId:z?.SelectionId, runnerId:i?.runner, profitVal: i?.maxWinningAmount})
                }else{
                  dummy.push({SelectionId:z?.SelectionId, runnerId:i?.runner, profitVal: i?.loosingAmount})
                }
              }
            }
            // else{
            //   dummy.push({SelectionId:'', runnerId:'', profitVal: ''})
            // }
        });
        temp[idx]['last_odds']['runners'][idx2]['profitLoss'] = Number(dummy?.reduce((accumulator, item) => {return accumulator + item.profitVal}, 0));
        })
      })
    }
    setMarketIdsForProfitLoss(temp)
    console.warn('temp+++++++------+++',temp)
  }

  // useEffect(()=>{
  //   // if (getMatchedBetsData?.length){ 
  //     // handleProfitLoss();
  //     // const openBets = getMatchedBetsData?.filter((item)=>item?.createdAt < allMarketIdData?.openDate)
  //     // const matchBet = getMatchedBetsData?.filter((item)=>item?.createdAt >= allMarketIdData?.openDate)
  //     // const matchBet = getMatchedBetsData;
  //     // setOpenBetData(openBets)
  //     // setMatchBetData(matchBet)
  //   // }
  //     },[getMatchedBetsData, allMarketIdData])
  useEffect(() => {
    if (!getAllUsers) {
      if (getUserInfo?.role !== "5" && getUserInfo?.role) {
        loadAllUsers();
      }
    }
    if (!getAllMarketTypes) {
      loadAllMarketTypes();
    }
  }, []);
  let lastMarketData = []
  const handleNewOddsData = (data) => {
    setAllMarketIdData(data)
    setRaceStatus(null)
    setIsCount((isCount) => isCount + 1);
    setMarketIdsData(data?.marketIds);
    lastMarketData= data?.marketIds
  }
  const handleOddsData = (data) => {
    // console.log('lastMarketData', lastMarketData)
    const temp = lastMarketData ? [...lastMarketData] : [];
    const findIndexOfEvents =  temp?.findIndex((z)=>z?.id == data?.marketId)
    if(findIndexOfEvents>=0){
       temp[findIndexOfEvents]['last_odds'] =  data?.data;
        setMarketIdsData((marketIdsData) => {
          setLastMarketIdData(marketIdsData);
          return temp
        });
        lastMarketData= temp
       
    }
    setTimeout(() => {
      setLastMarketIdData({});
        }, 500);  
  }
  useEffect(() => {
    const socket = io(socketUrl, { path: "/websocket/" });
    socket.on('connect', () => {
      socket.emit('join', '#'+eventId)
            socket.on('odds', (data) => {
              console.log('data', data)
              handleOddsData(data);
      })
      socket.on('event_info', (data) => {
        console.log('event_info', data)
       handleNewOddsData(data)
  })
  socket.on('winnerForRacing ', (data)=>{
    console.log('this is last odds', data)
    })
    });
    socket.on("score", (data) => {
      // console.log('score', data);
      setLiveScoreData(data)
    });
    socket.on("inplay", (data) => {
      if(data?.eventID==eventId) setRaceStatus(data)
      // console.log('inplay===========', data);
    });
    // socket.on("last_score", (data) => {
    //   console.log('last_score', data);
    // });
      return () => {
        socket.disconnect(); 
        setIsCount(0);
        setAllMarketIdData(null);
        setLastMarketIdData(null);
        setLiveScoreData(null);
        setMarketIdsForProfitLoss([]);
  };
    }, [eventId, isRefresh]);
  
  const handleLiveStreaming = async () => {
    const res = await loadLiveStreemingData(eventId);
    if (res?.success) setIframeScore(res?.fancyData);
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
useEffect(() => {
  if(allMarketIdData?._id) loadMatchedBets(allMarketIdData?._id);
  loadCurrentPositionData();
  const intervalId = setInterval(()=>{
    if(allMarketIdData?._id) loadMatchedBets(allMarketIdData?._id)
    loadCurrentPositionData();
  }, 2000);
  return () => {
    clearInterval(intervalId);
  };
}, [allMarketIdData?._id]);
const loadCurrentPositionData = async() => {
  if(allMarketIdData?._id) {
   const resp = await loadCurrentPositionDetails(allMarketIdData?._id);
   if(resp?.success){
    if(resp?.results.length){
      handleProfitLoss(resp?.results)
    }
   }
  }
}
  useEffect(() => {
    handleLiveStreaming();
  }, [eventId]);
  useEffect(() => {
    if (notToSetAllUsersState) {
      setAllUsersData(getAllUsers);
    }
  }, [JSON.stringify(getAllUsers)]);
  useEffect(()=>{ 
    if(allUsersData?.length){
      if(isFirst===1){
      const temp = JSON.parse(JSON.stringify(allUsersData))
      const filterArray =  temp?.filter((z)=>z?.lockStatus===true)
      if(filterArray?.length===temp?.length) setUsersSelection(CAMEL_ALL_USERS)
      else if(filterArray?.length===0) setUsersSelection(CAMEL_UNLOCK_ALL)
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
            allowFullScreen = {true}
          ></iframe>
        </div>
      </div>
    );
  };
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
  };
  const hideDropdownMenu = () => {
    setDropdownVisible(false);
  };
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
  };

  const handleCancel = () => {
    setAllUsersData([]);
    setPageNumber(INITIAL_PAGE_NUMBER);
    setOpen(false);
  };
  const addBetLock = async (values) => {
    const filterUser = allUsersData?.filter((item)=>item?.lockStatus===1)?.map((z)=>z?.userId)
    const payload = {};
    if (modalTitle === CAP_MATCH_ODDS) {
      if (usersSelection === "allUsers") {
        payload['matchOdds'] =true;
        payload['lock'] = true;
        payload["allUsers"] = true;
        payload['matchId'] = allMarketIdData?._id;
      } else if (usersSelection === "unlockAll") {
        payload['matchOdds'] =true;
        payload['lock'] = false;
        payload["allUsers"] = true;
        payload['matchId'] = allMarketIdData?._id;
      } else {
        payload['matchId'] =  allMarketIdData?._id;
        payload['allUsers'] = false;
        payload['matchOdds'] =true;
        payload['userIds'] = filterUser;
      }
    } else {
      if (usersSelection === "allUsers") {
        payload["allUsers"] = true;
        payload['lock'] = true;
        payload['matchId'] = allMarketIdData?._id
        payload['matchOdds'] = false;
      } else if(usersSelection === "unlockAll") {
        payload["allUsers"] = true;
        payload['lock'] = false;
        payload['matchId'] = allMarketIdData?._id
        payload['matchOdds'] = false;
      }  else {
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
  };

  const onChangeCheckBox = (e, index) => {
    let tempArray = allUsersData.map((obj) => Object.assign({}, obj));
    if (modalTitle === CAP_MATCH_ODDS) {
      tempArray[index]["lockStatus"] = e?.target?.checked ? 1 : 0;
      setAllUsersData(tempArray);
    } else {
      tempArray[index]["lockStatus"] = e?.target?.checked ? 1 : 0;
      setAllUsersData(tempArray);
    }
  };
  return (
    <div className={style.mainCricketWrraper}>
       {isMobile ? <Draggable style={{ position: 'fixed', left:'none', right: '10px', top: '52px', zIndex: 99999 , cursor: 'move'}}>
        <div style={{display:'flex', background:"#121212", height:30, width:30, opacity:'0.6', borderRadius:'50%', justifyContent:'center', alignItems:'center'}}><BsArrowRepeat style={{fontSize:20,fontWeight:'bolder', fill:'cyan'}} onClick={() => {
          setIsCount(0);
          setIsRefresh(isRefresh+1)}}/></div>
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
                      <br />
                      <Checkbox
                        onChange={(e) => {
                          onChangeCheckBox(e, index);
                        }}
                        checked={
                          item?.lockStatus ===1  ? true : false
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
      {isCount === 0 ? (
        <Spin className={style.antIconClass} size="large" />
      ) : (
        <Row gutter={6} className={style.mainRow}>
          <Col md={24} lg={16} xxl={16}>
            <div className={style.mainHeader}>
              {width < 991
                ? !(getUserInfo?.role === NUM_STR_5_ROLE) && (
                  <TitleBarUpdated 
                  title={<div className={theme + " " + style.betAndBookWapper}>
                  <Dropdown
                    overlay={dropdownMenu}
                    className={theme + " " + style.betLockDropDown}
                    trigger={["click"]}
                    visible={dropdownVisible}
                    onVisibleChange={(visible) => setDropdownVisible(visible)}
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
                  <CustomButton customClass={style.btnStyle} title = {"User Book"} onClick={()=> {
                    navigate(`${constRoute?.userBookSoccer}?.id=${allMarketIdData?._id}`);
                    const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
                    localStorage.setItem('userBookEvent', JSON.stringify({...otherEvents, soccer:allMarketIdData?.name}))
                    }}/>
                </div>}
                  />
                  )
                : ""}
              <Row className={style.scoreSection}>
                {width <= 991 ? (
                  <div className={style.tabWrapper}>
                    {tvScoreCard === "1" ? tab1Data() : tab2Data()}
                  </div>
                ) : (
                  ""
                )}

                <div className={style.mainScoresWrraper}>
                  <AllMatchesTable
                    isEditStake={isEditStake}
                    setIsEditStake={setIsEditStake}
                    copyDataOfFakeBets={lastMarketIdData}
                    tableData={marketIdsData}
                    scoreData={liveScoreData}
                    liveMatchData={allMarketIdData}
                    raceStatus={raceStatus}
                    marketIdsForProfitLoss={marketIdsForProfitLoss}
                    winnerName={winnerName}
                    getMatchBetsData={getMatchedBetsData}
                  />
                </div>
              </Row>
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
                  title={<div className={theme + " " + style.betAndBookWapper}>
                  <Dropdown
                    overlay={dropdownMenu}
                    className={theme + " " + style.betLockDropDown}
                    trigger={["click"]}
                    visible={dropdownVisible}
                    onVisibleChange={(visible) => setDropdownVisible(visible)}
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
                  <CustomButton customClass={style.btnStyle} title = {"User Book"} onClick={()=> {
                    navigate(`${constRoute?.userBookSoccer}?id=${allMarketIdData?._id}`);
                    const otherEvents = JSON.parse(localStorage.getItem('userBookEvent'));
                    localStorage.setItem('userBookEvent', JSON.stringify({...otherEvents, soccer:allMarketIdData?.name}))
                    }}/>
                </div>}
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
            {/* <div>
              <TitleBarUpdated title={`Open Bets (${openBetData?.length ? openBetData?.length : 0})`} />
              <OpenBetsTable tableData={openBetData} />
            </div> */}
            <TitleBarUpdated 
            title={<div className={style.fullBetListTitleBar}>
            <span className={style.eventName}>{`Matched Bets (${getMatchedBetsData?.length ? getMatchedBetsData?.length : 0})`}</span>
            <div>
              <CustomButton
                title="Full Bet List"
                customClass={style.btnStyle}
                onClick={() => {
                  navigate(`${constRoute?.fullBetList}?eventId=${allMarketIdData?._id}`);
                }}
              />
            </div>
          </div>}
            />
            <OpenBetsTable tableData={getMatchedBetsData} />
          </Col>
        </Row>
      )}
    </div>
  );
});

export default AdminSoccerOdds;
