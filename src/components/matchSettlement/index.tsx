import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss"
import { Row, Spin } from "antd";
import { GiCricketBat, GiHorseHead, GiHound, GiSoccerKick, GiStopwatch, GiTennisRacket } from "react-icons/gi";
import MatchesDetailTable from "./matchesDetailTable";
import CustomButton from "@components/common-components/custom-button";
import ResultModal from "./result-modal";
import ReasonsModal from "./reasons-modal";
import { useStore } from "@stores/root-store";
import moment from "moment";
import ConfirmationModel from "./confirmationModel";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

interface Props {}
const MatchSettlement: React.FC<Props> = observer(({ ...props }) => {
  const [gameType, setGameType] = useState("Cricket");
  const [resultModalOpen, setResultModalOpen] = useState(null);
  const [reasonModalOpen, setReasonModalOpen] = useState(null);
  const [matchSettlementData, setMatchSettlementData] = useState(null)
  const [conformModal, setConformModal] = useState(false);
  const [confirmationPayload, setConfirmationPayload] = useState(null); 
  const [dateSortOrder, setDateSortOrder] = useState(''); 
  const {
    bet: {
      loadGetMatchSettlements,
      loadingMatchSettlementData
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleMatchSettlementData = async ()=>{
    const res = await loadGetMatchSettlements()
    if(res?.success){
      setMatchSettlementData(res?.results)
    }
  }
  useEffect(()=>{
 handleMatchSettlementData()
  }, [])
  const gameTypesArr = [
    {
      title: "Cricket",
    },
    {
      title: "Tennis",
    },
    {
      title: "Soccer",
    },
    {
      title: "Horse Race",
    },
    {
      title: "Greyhound",
    },
  ];

  const columns = [
    {
      title: <div style={{display:'flex', justifyContent:'center'}}>Date</div>,
      dataIndex:gameType,
      width: 100,
      sorter: (a, b) => {
        const dateA = new Date(a.openDate);
        const dateB = new Date(b.openDate);
        return dateA.getTime() - dateB.getTime();
      },
      sortOrder: dateSortOrder,
      render: (_, data) => {
        console.log(data)
        return<>
         <p>
        {moment(data?.openDate)?.format('YYYY-MM-DD hh:mm:ss a')}
         </p>
         </>
      },
    },
    {
      title: gameType,
      render: (_, data) => {
        return (
          <div
            className="dynamicColorOnHover"
            style={{ cursor: "pointer" }}
          >
            <span className={`${style.cricketTitles} dynamicColorOnHover`}>{data?.name || ''}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      render: (_, data) => {
        return (
          <div
            className="dynamicColorOnHover"
          >
            <span className={`${style.cricketTitles} dynamicColorOnHover`}>{data?.status || ''}</span>
          </div>
        );
      },
    },
    {
      title: <div style={{display:'flex', justifyContent:'center'}}>Actions</div>,
      width:200,
      render: (_, data) => {
        return (
          <div
            className="dynamicColorOnHover"
            style={{display:'flex', justifyContent:'center', gap:6}}
          >
            
            <CustomButton  onClick={() => setResultModalOpen({id:data?._id, runners:data?.oddsData || [], modal:true})} title="Result" />
            <CustomButton  onClick={() => setReasonModalOpen({id:data?._id, modal:true})} title="Reason" />
          </div>
        );
      },
    }
  ];

  const reasonHandler = (data) => {
    setConfirmationPayload({type:'reason',data})
  }

  const resultHandler = (data) => {
    setConfirmationPayload({type:'result',data})
  }
  const handleSortChange = (columnKey, sortOrder) => {
    setDateSortOrder(sortOrder);
  };
  return (
    <div className={style.mainWrapper}>
          <div className={style.gamesWrapper}>
            <Row className={style.mainRow}>
              {gameTypesArr?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={gameType === item?.title ? style.eventsTabsActive : style.eventsTabs}
                    onClick={async () => {
                      setGameType(item?.title);
                    }}
                  >
                    <TitleBarUpdated title={<span className={style.titleHead}>{item?.title || ''}</span>} isIcon={true} 
                    icon={ item?.title==='Soccer'? <GiSoccerKick className={gameType === item?.title ? style.iconSelectedWrapper :   style.iconWrraper }/> : item?.title==="Tennis" ? <GiTennisRacket className={gameType === item?.title ? style.iconSelectedWrapper :   style.iconWrraper  }/> : item?.title==="Cricket" ? <GiCricketBat className={gameType === item?.title ? style.iconSelectedWrapper:  style.iconWrraper}/> : item?.title==="Greyhound" ? <GiHound className={gameType === item?.title ? style.iconSelectedWrapper:  style.iconWrraper}/> : <GiHorseHead className={gameType === item?.title ? style.iconSelectedWrapper:  style.iconWrraper}/>}
                    />
                  </div>
                );
              })}
            </Row>
          </div>
         {loadingMatchSettlementData ? <Spin className={style.antIconClass} size="large" /> :
          <>
          {gameType === "Tennis" ? (
            <MatchesDetailTable
              columns={columns}
              dateSortOrder={dateSortOrder}
              onChange={(pagination, filters, sorter) =>
                handleSortChange(sorter.field, sorter.order)
              }
              tableData={matchSettlementData?.tennis}
                            
            />
          ) : (
            ""
          )}
          {gameType === "Cricket" ? (
            <MatchesDetailTable
            columns={columns}
            dateSortOrder={dateSortOrder}
            onChange={(pagination, filters, sorter) =>
                handleSortChange(sorter.field, sorter.order)
              }
              tableData={[{name:'pak vs india'}]}
            />
          ) : (
            ""
          )}
          {gameType === "Soccer" ? (
            <MatchesDetailTable
            columns={columns}
            dateSortOrder={dateSortOrder}
            onChange={(pagination, filters, sorter) =>
                handleSortChange(sorter.field, sorter.order)
              }
              tableData={matchSettlementData?.soccer}
            />
          ) : (
            ""
          )}
          {gameType === "Horse Race" ? (
            <MatchesDetailTable
            columns={columns}
            dateSortOrder={dateSortOrder}
            onChange={(pagination, filters, sorter) =>
                handleSortChange(sorter.field, sorter.order)
              }
              tableData={matchSettlementData?.horseRace}
            />
          ) : (
            ""
          )}
            {gameType === "Greyhound" ? (
            <MatchesDetailTable
            columns={columns}
            dateSortOrder={dateSortOrder}
            onChange={(pagination, filters, sorter) =>
                handleSortChange(sorter.field, sorter.order)
              }
              tableData={matchSettlementData?.greyhound}
            />
          ) : (
            ""
          )}
          </>
          }
          <ResultModal resultHandler={resultHandler} open={resultModalOpen} setResultModalOpen={setResultModalOpen} setConformModal={setConformModal}/>
          <ReasonsModal reasonHandler={reasonHandler} open={reasonModalOpen} setReasonModalOpen={setReasonModalOpen} setConformModal={setConformModal}/>
          <ConfirmationModel confirmationPayload={confirmationPayload} open={conformModal} setConformModal={setConformModal} handleMatchSettlementData={handleMatchSettlementData}/>
    </div>
  );
});

export default memo(MatchSettlement);
 