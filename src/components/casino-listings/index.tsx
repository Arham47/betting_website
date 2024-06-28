import {observer} from "mobx-react";
import {memo, useEffect, useState} from "react";
import style from "./style.module.scss"
import Table from "@components/common-components/table";
import {Spin} from "antd";
import {useStore} from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import {ConfirmationModal} from "@components/common-components/confirmation-modal";
import CasinoModify from "./casino-modify";
import {isNull} from "lodash";
import moment from "moment/moment";

interface Props {
  open?: any,
  setOpen?: any,
  data?: any;
  setData?: any;
}

const CasinoListings: React.FC<Props> = observer(({open, setOpen, data, setData, ...props}) => {
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [singleBetId, setSingleBetId] = useState(null);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [allBettors, setAllBettors] = useState(null);
  const [fancyData, setFancyData] = useState(null);
  const [isOpenFancyModal, setIsOpenFancyModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [entries, setEntries] = useState("100");
  const {
    bet: {cancelSingleBet, loadingSingleBetCancel},
  } = useStore(null);

  const {bet: {loadCasinoLists, loadingCasinoLists}} = useStore(null);

  const fancyModifyOpen = (data) => {
    setIsOpenFancyModal(true);
    setFancyData(data)
  }

  const handleConfirmCancel = () => {
    setIsConfirmPopUp(false);
    setOpen(true);
  }

  const saveHandler = async () => {
    console.log(singleBetId)
    const payload = {
      betId: singleBetId,
      type: 'casino'
    }
    const res = await cancelSingleBet(payload);
    if (res?.success) {
      setIsConfirmPopUp(false)
    }
  }

  const columns = [
    {
      title: "Bet ID",
      dataIndex: 'betId',
      key: 'betId',
      render: (_, data) => (
        <div>{data._id}</div>
      ),
    },
    {
      title: "Game ID",
      dataIndex: 'game_id',
      key: 'game_id',
      render: (_, data) => (
        <div>{data.game_id}</div>
      ),
    },
    {
      title: "Round ID",
      dataIndex: 'round_id',
      key: 'round_id',
      render: (_, data) => (
        <div>{data.round_id}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: 'action',
      key: 'action',
      render: (_, data) => (
        <div>{data.action}</div>
      ),
    },
    {
      title: "Bet Amount",
      dataIndex: 'amount',
      key: 'amount',
      render: (_, data) => (
        <div>{data.amount}</div>
      ),
    },
    {
      title: "Bet Time",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => (
        <div>{data.createdAt ? `${moment(data.createdAt).format('YYYY/MM/DD HH:mm:ss')}` : '--'}</div>
      ),
    },
    {
      title: "User",
      dataIndex: 'userDetails.userName',
      key: 'userDetails.userName',
      render: (_, data) => (
        <div>{data?.userDetails?.userName}</div>
      ),
    },
    {
      title: "Transaction",
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (_, data) => (
        <div>{data.transaction_id}</div>
      ),
    },
    {
      title: "Options",
      dataIndex: 'option',
      key: 'option',
      render: (_, data) => <div style={{display: "flex"}}>
        <CustomButton title="Modify" onClick={() => fancyModifyOpen(data)}/>
        <CustomButton title="Cancel" onClick={() => {
          setIsConfirmPopUp(true);
          setSingleBetId(data?._id);
        }}/>
      </div>,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const params = new URLSearchParams(new URLSearchParams(window.location.hash.replace("#/casino-listings?", "")));
      console.log(params.get("eventId"));
      getAllBettorsData(params);
    }, 60 * 1000); // Run every 1 second

    // Clean up function
    return () => {
      clearInterval(interval);
    };
  }, []); // Run once on component mount


  useEffect(() => {
    const params = new URLSearchParams(new URLSearchParams(window.location.hash.replace("#/casino-listings?", "")));
    console.log(params.get("eventId"));
    getAllBettorsData(params);
  }, [pageNumber, entries]); // Include 'entries' in the dependency array


  const getAllBettorsData = async (params) => {
    let queryParam = "";
    console.log(params);
    if (isNull(params.get("eventId"))) {
      queryParam = `?page=${pageNumber}&limit=${entries}`; // Use 'entries' for the limit
    } else {
      queryParam = `?page=${pageNumber}&limit=${entries}&eventId=${params.get("eventId")}`; // Also use 'entries' here
    }
    const res = await loadCasinoLists(queryParam);
    if (res?.status) {
      setAllBettors(res);
    }
  }

  return (
    <div className={style.mainWrapper}>
      {loadingCasinoLists
        ? <div style={{display: 'flex', justifyContent: 'center'}}><Spin/></div>
        : <Table
          dataSource={allBettors?.results}
          responseData={allBettors?.results?.length ? allBettors?.results : []}
          // loading={isLoadingUserBetsList}
          columns={columns}
          responseCountParam={allBettors?.total}
          setPageNumber={setPageNumber}
          style={{whiteSpace: "nowrap"}}
          queryParam={{page: pageNumber, numRecords: entries}}
        />}
      <CasinoModify open={isOpenFancyModal} setOpen={setIsOpenFancyModal} data={fancyData}
                    setData={setFancyData}/>
      <ConfirmationModal modelTitle="Cancel Single Bet" isOpen={isConfirmPopUp} onCancel={handleConfirmCancel}
                         loadingConfirmBtn={loadingSingleBetCancel} onConfirm={saveHandler}/>
    </div>
  );
});

export default memo(CasinoListings);
