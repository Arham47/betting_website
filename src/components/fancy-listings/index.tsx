import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss"
import Table from "@components/common-components/table";
import { Spin } from "antd";
import { useStore } from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import { ConfirmationModal } from "@components/common-components/confirmation-modal";
import useWindowSize from "@utils/hooks/useWindowSize";
import FancyModify from "./fancy-modify";
import { isNull } from "lodash";
import moment from "moment";

interface Props {
  open?: any,
  setOpen?: any,
  data?: any;
  setData?: any;
}

const FancyListings: React.FC<Props> = observer(({ open, setOpen, data, setData, ...props }) => {
  const [searchUser, setSearchUser] = useState('');
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [singleBetId, setSingleBetId] = useState(null);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [allBettors, setAllBettors] = useState(null);
  const [isOpenLedger, setIsOpenLedger] = useState(false);
  const [isOpenBetsView, setIsOpenBetsView] = useState(false);
  const [betData, setBetData] = useState(null);
  const [fancyData, setFancyData] = useState(null);
  const [isOpenFancyModal, setIsOpenFancyModal] = useState(false);
  const [bettorData, setBettorData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [entries, setEntries] = useState("10");
  const innerWidth = useWindowSize()?.width
  const {
    bet: { cancelSingleBet, loadingSingleBetCancel },
  } = useStore(null);
  const handleCancel = () => {
    setData(null)
    setOpen(false)
  }

  const { bet: { loadFancyLists, loadingFancyLists } } = useStore(null);

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
      betId: singleBetId
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
      title: "Market ID",
      dataIndex: 'marketId',
      key: 'marketId',
      render: (_, data) => (
        <div>{data.marketId}</div>
      ),
    },
    {
      title: "User ID",
      dataIndex: 'userId',
      key: 'userId',
      render: (_, data) => (
        <div>{data.userId}</div>
      ),
    },
    {
      title: "Dealer",
      dataIndex: 'userParent.userName',
      key: 'userParent.userName',
      render: (_, data) => (
        <div>{data.userParent.userName}</div>
      ),
    },
    {
      title: "User Name",
      dataIndex: 'userDetails.userName',
      key: 'userDetails.userName',
      render: (_, data) => (
        <div>{data.userDetails.userName}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: 'status',
      key: 'status',
      render: (_, data) => (
        <div>{data.status}</div>
      ),
    },
    {
      title: "Bet Amount",
      dataIndex: 'betAmount',
      key: 'betAmount',
      render: (_, data) => (
        <div>{data.betAmount}</div>
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
      title: "Fancy Data",
      dataIndex: 'fancyData',
      key: 'fancyData',
      render: (_, data) => (
        <div>{data.fancyData}</div>
      ),
    },
    {
      title: "Event",
      dataIndex: 'event',
      key: 'event',
      render: (_, data) => (
        <div>{data.event}</div>
      ),
    },
    {
      title: "Runner Name",
      dataIndex: 'runnerName',
      key: 'runnerName',
      render: (_, data) => (
        <div>{data.runnerName}</div>
      ),
    },
    {
      title: "Event ID",
      dataIndex: 'eventId',
      key: 'eventId',
      render: (_, data) => (
        <div>{data.eventId}</div>
      ),
    },
    {
      title: "Options",
      dataIndex: 'option',
      key: 'option',
      render: (_, data) => <div style={{ display: "flex" }}>
        <CustomButton title="Modify" onClick={() => fancyModifyOpen(data)} />
        <CustomButton title="Cancel" onClick={() => {
          setIsConfirmPopUp(true);
          setSingleBetId(data?._id);
        }} />
      </div>,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const params = new URLSearchParams(new URLSearchParams(window.location.hash.replace("#/fancy-listings?", "")));
      console.log(params.get("eventId"));
      getAllBettorsData(params);
    }, 180*1000);

    // Clean up function
    return () => {
      clearInterval(interval);
    };
  }, []); // Run once on component mount


  useEffect(() => {
    const params = new URLSearchParams(new URLSearchParams(window.location.hash.replace("#/fancy-listings?", "")));
    console.log(params.get("eventId"));
    getAllBettorsData(params);
  }, [pageNumber, entries]);


  const getAllBettorsData = async (params) => {
    let queryParam = "";
    console.log(params);
    if (isNull(params.get("eventId"))) {
      queryParam = `?page=${pageNumber}&limit=10`;
    } else {
      queryParam = `?page=${pageNumber}&limit=10&eventId=${params.get("eventId")}`;
    }
    const res = await loadFancyLists(queryParam);
    if (res?.status) {
      setAllBettors(res);
    }
  }

  return (
    <div className={style.mainWrapper}>
      {loadingFancyLists ? <div style={{ display: 'flex', justifyContent: 'center' }}><Spin /></div> : <Table
        dataSource={allBettors?.results}
        responseData={allBettors?.results?.length ? allBettors?.results : []}
        // loading={isLoadingUserBetsList}
        columns={columns}
        responseCountParam={allBettors?.total}
        setPageNumber={setPageNumber}
        style={{ whiteSpace: "nowrap" }}
        queryParam={{ page: pageNumber, numRecords: entries }}
      />}
      <FancyModify open={isOpenFancyModal} setOpen={setIsOpenFancyModal} data={fancyData}
        setData={setFancyData} />
      <ConfirmationModal modelTitle="Cancel Single Bet" isOpen={isConfirmPopUp} onCancel={handleConfirmCancel} loadingConfirmBtn={loadingSingleBetCancel} onConfirm={saveHandler} />
    </div>
  );
});

export default memo(FancyListings);
