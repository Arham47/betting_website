import {observer} from "mobx-react";
import {memo, useEffect, useState} from "react";
import style from "./style.module.scss"
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import Table from "@components/common-components/table";
import Search from "antd/es/input/Search";
import {CAP_ENTRIES, CAP_SEARCH, CAP_SHOW, CAP_USER_NAME, LOWER_LARGE} from "@utils/const";
import {SearchOutlined} from "@ant-design/icons";
import {Col, Row, Spin} from "antd";
import {useStore} from "@stores/root-store";
import {ColUserOnRole} from "@components/common-components/export-common-components/table-columns-text-check";
import CustomButton from "@components/common-components/custom-button";
import BettorLedger from "./bettor-ledger"
import useWindowSize from "@utils/hooks/useWindowSize";
import moment from "moment";
import {CAMEL_CREATED_AT} from "@utils/const/TableColumns";
import BetsViewPopup from "./bets-view-popup";
import AccountSattlement from "./account-sattlement";

interface Props {
}

const AllBettors: React.FC<Props> = observer(({...props}) => {
  const [searchUser, setSearchUser] = useState('');
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [allBettors, setAllBettors] = useState(null);
  const [isOpenLedger, setIsOpenLedger] = useState(false);
  const [isOpenBetsView, setIsOpenBetsView] = useState(false);
  const [betData, setBetData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [isOpenaccountData, setIsOpenaccountData] = useState(false);
  const [bettorData, setBettorData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [entries, setEntries] = useState("10");
  const innerWidth = useWindowSize()?.width

  const {bet: {loadAllBettors, loadingAllBettors}} = useStore(null);

  const handleBettorView = (data) => {
    setIsOpenLedger(true);
    setBettorData(data)
  }

  const handleBetView = (data) => {
    setIsOpenBetsView(true);
    setBetData(data)
  }
  const accountsattelment = (data) => {
    setIsOpenaccountData(true);
    setAccountData(data)
  }

  const handleColor = (data) => {
    if (parseInt(data?.balance) != parseInt(data?.availableBalance) || parseInt(data?.clientPL) != parseInt(data?.availableBalance)) {
      return 'red'
    } else return ''
  }
  const getUsernameColor = (data) => {
    const timeDifference = Date.now() - data?.createdAt;
    if (timeDifference <= 24 * 60 * 60 * 1000) {
      return 'blue';
    } else if (timeDifference <= 48 * 60 * 60 * 1000) {
      return 'green';
    } else if (timeDifference <= 72 * 60 * 60 * 1000) {
      return 'red';
    } else {
      return '';
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: 'username',
      key: 'username',
      // sorter: (a, b) => a?.betTime - b?.betTime,
      render: (_, data) => (
        <div style={{color: getUsernameColor(data)}}>
          {`${data?.userName} (${data?.userId})  ` || '--  '}
          {`A: ${data?.data?.activeBets}     B: ${data?.data?.canceledBets}`}
        </div>
      ),
    },
    {
      title: "Parent",
      dataIndex: 'parent',
      key: 'data.parent',
      render: (_, data) => <div>{data?.data?.parent || '--'}</div>,
    },
    {
      title: "Date",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => (
        <div>
          {data?.createdAt ? moment(new Date(data.createdAt)).format('YYYY-MM-DD h:mm:ss a') : '--'}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: 'type',
      key: 'type',
      render: (_, data) => <div>{ColUserOnRole(data?.role) || '--'}</div>,
    },
    {
      title: "Credit",
      dataIndex: 'credit',
      key: 'credit',
      render: (_, data) => <div style={{color: data?.credit < 0 ? "red" : ""}}>{Math.round(data?.credit)}</div>,
    },
    {
      title: "Balance",
      dataIndex: 'balance',
      key: 'balance',
      render: (_, data) => <div
        style={{color: data?.balance < 0 ? "red" : ""}}>{Math.round(Number(data?.balance?.toString()?.replaceAll('e-', '')))}</div>,
    },
    {
      title: "Client P/L",
      dataIndex: 'client',
      key: 'client',
      render: (_, data) => <div
        style={{color: data?.clientPL < 0 ? "red" : ""}}>{Math.round(Number(data?.clientPL?.toString()?.replaceAll('e-', '')))}</div>,
    },
    {
      title: "Exposure",
      dataIndex: 'exposure',
      key: 'exposure',
      render: (_, data) => {
        const exposureValue = data?.exposure;
        const isNegative = exposureValue < 0;
        const isZero = exposureValue === 0;
        const displayValue = isZero
          ? 0
          : Math.round(Number(exposureValue?.toString()?.replaceAll('e-', '')));
        const textColor = isNegative ? "red" : "";
        const displayText = isNegative ? `${displayValue} -NEG` : `${displayValue} +NEG`;

        return (
          <div style={{color: textColor}}>
            {displayText}
          </div>
        );
      },
    }

    ,

    {
      title: "Available Balance",
      dataIndex: 'availablebalance',
      key: 'availableBalance',
      render: (_, data) => {
        const color = handleColor(data);

        return (
          <div style={{color}}>
            {data?.availableBalance < 0.1 && data?.availableBalance > -1 ? 0 : Math.round(Number(data?.availableBalance?.toString()?.replaceAll('e-', '')))}
            {color === 'red' ? <>{`>{DIFF}<`}</> : <>{`><`}</>}
            {data?.data?.availableBalance < 0.1 && data?.data?.availableBalance > -1 ? 0 : Math.round(Number(data?.data?.availableBalance?.toString()?.replaceAll('e-', '')))}
          </div>
        );
      },
    },

    {
      title: "Options",
      dataIndex: 'option',
      key: 'option',
      render: (_, data) => <div style={{display: "flex"}}>
        <CustomButton title="View" onClick={() => handleBettorView(data)}/>
        <CustomButton title="Bets" onClick={() => handleBetView(data)}/>
        <CustomButton title="Sattlement" onClick={() => accountsattelment(data)}/>
      </div>,
    },
  ];

  const getAllBettorsData = async () => {
    const queryParam = `?page=${pageNumber}&numRecords=${entries}&limit=10&username=`;
    const res = await loadAllBettors(queryParam);
    if (res?.success) {
      setAllBettors(res?.results)
      console.log(res?.results)
    }
  }
  useEffect(() => {
    getAllBettorsData()
  }, [pageNumber, entries])


  
  
  const onSearchUsers = async (e) => {
    setSearchUser(e)
    const queryParam = `?page=1&numRecords=10&limit=10&username=${e}`;
    const res = await loadAllBettors(queryParam)
    if (res?.success) {
      setAllBettors(res?.results)
    }
  };

  const searchUserName = () => {
    return <Row className={style.searchEntriesWrapper}>
      <Col>
        <div className={style.entriesData}>
          <label>{CAP_SHOW} </label>
          <select
            className={style.inputHeight}
            id="entries"
            value={entries}
            onChange={(e) => {
              setPageNumber(1);
              setEntries(e?.target?.value);
            }}
          >
            {options.map((item) => {
              return (
                <option
                  label={item?.toString()}
                  className={style.inputColor}
                >
                  {item}{" "}
                </option>
              );
            })}
          </select>
          <label> {CAP_ENTRIES}</label>
        </div>
      </Col>
      <Col className={style.searchBarCol}>
        <Search
          placeholder={CAP_USER_NAME}
          allowClear
          onChange={(e) => setSearchUser(e?.target?.value)}
          enterButton={<div className={style.searchIcon}>
            <SearchOutlined className={style.iconSearch}/>
            {CAP_SEARCH}
          </div>}
          size={LOWER_LARGE}
          onSearch={onSearchUsers}
          className={style.searchBarButton}
        />
      </Col>
    </Row>
  }

  return (
    <div className={style.mainWrapper}>
      <TitleBarUpdated title={'All bettors'} isRightRibbon={<div
        className={style.rightRibbonRecord}>{allBettors?.total ? `Total Bettors: ${allBettors?.total || ''}` : ''}</div>}/>
      <div className={style.searchBarButtunCard}>{searchUserName()}</div>
      {loadingAllBettors ? <div style={{display: 'flex', justifyContent: 'center'}}><Spin/></div> : <Table
        dataSource={allBettors?.docs}
        responseData={allBettors?.docs?.length ? allBettors?.docs : []}
        // loading={isLoadingUserBetsList}
        columns={columns}
        responseCountParam={allBettors?.total}
        setPageNumber={setPageNumber}
        style={{whiteSpace: "nowrap"}}
        queryParam={{page: pageNumber, numRecords: entries}}
      />}

      <BettorLedger open={isOpenLedger} setOpen={setIsOpenLedger} data={bettorData} setData={setBettorData}/>
      <BetsViewPopup open={isOpenBetsView} setOpen={setIsOpenBetsView} data={betData} setData={setBetData}/>
      <AccountSattlement open={isOpenaccountData} setOpen={setIsOpenaccountData} data={accountData}
                         setData={setAccountData} getAllBettor={getAllBettorsData}/>
    </div>
  );
});

export default memo(AllBettors);
 