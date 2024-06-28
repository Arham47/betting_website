/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CAP_SEARCH_USER } from "../const";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { FaFileInvoice, FaPen } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import {
  fetchUserForDealerWithDepositedCash,
  fetchUserForDealerWithDepositedCredit,
} from "../../../reduxStore/slices/adminSlice";
// import Tablee from "@components/Table/Tablee";
import AllUserTable from "../all-user-table";
import {
  CAMEL_CREDIT_RECEIVED,
  CAMEL_CREDIT_REMAINING,
  CAMEL_USER_ID,
  CAP_ACCOUNT_LEDGER,
  CAP_ACTIVE,
  CAP_BALANCE_UPLINE,
  CAP_CASH,
  CAP_CASH_SLASH_CREDIT,
  CAP_EDIT,
  CAP_IN_ACTIVE,
  CAP_LEDGER,
  CAP_LOAD_BALANCE,
  CAP_NEW_USER,
  CAP_PL_DOWNLINE,
  CAP_SEARCH,
  CAP_SETTLE_ACCOUNT,
  CAP_USERS,
  CAP_USER_NAME,
  INITIAL_PAGE_NUMBER,
  LOWER_LARGE,
} from "@utils/const";
import { useStore } from "@stores/root-store";
import { formatLargeNumber, numberWithCommas } from "@utils/common-functions";
import { useTheme } from "@utils/hooks/useTheme";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import Table from "@components/common-components/table";
import { jsonDataForLoadBalance } from "@utils/json-data";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import TitleBarUpdated from "../common-components/title-bar-updated";

const UserList = observer(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [getUserName, setGetUserName] = useState("");
  const [isLoadBalanceShow, setIsLoadBalanceShow] = useState(true);
  const [loadBalanceTotal, setLoadBalanceTotal] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [loadBalanceLoading, setLoadBalanceLoading] = useState(false);
  const {
    user: {
      getAllUsers,
      LoadUserBalance,
      getLoadBalanceLoading,
      getLoadBalanceData,
      loadAllUsers,
      getUserInfo,
    },
  } = useStore(null);

  // @ts-ignore
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedDataType, setSelectedDataType] = useState(null); // Default to null
  const [ledgerWindow, setLedgerWindow] = useState(null);

  // const toggleTable = (dataType) => {
  //   setSelectedDataType(dataType);
  // };

  const toggleTable = () => {
    if (ledgerWindow && !ledgerWindow?.closed) {
      ledgerWindow.location.href = `${window.location.href.replaceAll(
        "/users",
        constRoute.ledgerCash
      )}`;
      ledgerWindow.focus();
      dispatchFetchAction(); // Dispatch action here if ledger window is already open
    } else {
      const newWindow = window.open(
        `${window.location.href.replaceAll("/users", constRoute.ledgerCash)}`,
        "_blank",
        "width=520,height=600,resizable,scrollbars"
      );
  
      newWindow.focus();
      setLedgerWindow(newWindow);
      dispatchFetchAction(); // Dispatch action here if new ledger window is opened
    }
  };
  
  const dispatchFetchAction = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    dispatch(
      fetchUserForDealerWithDepositedCash({
        startDate: formattedDate,
        endDate: formattedDate, 
        numRecords: "10",
        page: 1,
        searchValue: "",
      }) as any
    );
  };
  

  const creditData = () => {
    if (ledgerWindow && !ledgerWindow?.closed) {
      // If ledger window is already open, focus on it
      ledgerWindow.location.href = `${window.location.href.replaceAll(
        "/users",
        constRoute.ledgerCredit
      )}`;
      ledgerWindow.focus();
  
      // Dispatch the action
      dispatchFetchCreditData();
    } else {
      // If ledger window is not open, open a new one
      const newWindow = window.open(
        `${window.location.href.replaceAll("/users", constRoute.ledgerCredit)}`,
        "_blank",
        "width=520,height=600,resizable,scrollbars"
      );
  
      newWindow.focus();
      setLedgerWindow(newWindow);
      // setSelectedDataType(dataType);
  
      // Dispatch the action after the new window is opened
      dispatchFetchCreditData();
    }
  };
  
  const dispatchFetchCreditData = () => {
    // Dispatch the fetchUserForDealerWithDepositedCredit action
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    dispatch(
      fetchUserForDealerWithDepositedCredit({
        startDate: formattedDate,
        endDate: formattedDate,
        numRecords: "10",
        page: 1,
        searchValue: "",
      }) as any
    );
  };
  
  useEffect(() => {
    setIsLoadBalanceShow(true);
    let totalValueOfCredit,
      totalBalanceValue,
      totalClientPL,
      totalValueOFExposure,
      totalAvailBalance;
    if (getAllUsers?.length) {
      totalValueOfCredit = getAllUsers.reduce(
        (credit, currentValue) => credit + currentValue.credit,
        0
      );
      totalBalanceValue = getAllUsers
        ?.filter((z) => z?.role != 0)
        ?.reduce(
          (balance, currentValue) =>
            balance +
            Number(currentValue.balance?.toString()?.replaceAll("e-", "")),
          0
        );
      totalClientPL = getAllUsers
        ?.filter((z) => z?.role != 0)
        ?.reduce(
          (clientPL, currentValue) =>
            clientPL +
            Number(currentValue.clientPL?.toString()?.replaceAll("e-", "")),
          0
        );
      totalValueOFExposure = getAllUsers.reduce(
        (exposure, currentValue) =>
          exposure +
          Number(currentValue.exposure?.toString()?.replaceAll("e-", "")),
        0
      );
      totalAvailBalance = getAllUsers.reduce(
        (availableBalance, currentValue) =>
          availableBalance +
          Number(
            currentValue.availableBalance?.toString()?.replaceAll("e-", "")
          ),
        0
      );
    }
    setLoadBalanceTotal({
      Total: "",
      credit: totalValueOfCredit || 0,
      type: "",
      balance: totalBalanceValue || 0,
      clientPL: totalClientPL || 0,
      exposure: totalValueOFExposure || 0,
      availableBalance: totalAvailBalance || 0,
      share: "",
    });
  }, [getAllUsers]);

  const columns = [
    {
      title: CAMEL_CREDIT_RECEIVED,
      render: (_, data) =>
        getUserInfo?.role === "0" ? (
          <div
            className="dynamicColorOnHover"
            style={{ color: data?.creditRecieved >= 0 ? "" : "red" }}
          >
            {Math.round(data?.creditRecieved) == 0
              ? "N/A"
              : numberWithCommas(Math.round(data?.creditRecieved))}
          </div>
        ) : (
          <div
            className="dynamicColorOnHover"
            style={{ color: data?.creditRecieved >= 0 ? "" : "red" }}
          >
            {numberWithCommas(Math.round(data?.creditRecieved))}
          </div>
        ),
    },
    {
      title: (
        <div
          className="creditRemainingButton"
        >
          {CAMEL_CREDIT_REMAINING}
        </div>
      ),
      render: (_, data) =>
        getUserInfo?.role === "0" ? (
          <div
            className="dynamicColorOnHover"
          onClick={creditData}

            style={{
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: 12,
              color: data?.creditRemaining >= 0 ? "" : "red",
            }}
          >
            {Math.round(data?.creditRemaining) == 0
              ? "N/A"
              : numberWithCommas(Math.round(data?.creditRemaining))}
          </div>
        ) : (
          <div
          onClick={creditData}

            className="dynamicColorOnHover"
            style={{ 
              cursor: "pointer",
              textDecoration: "underline",
              color: data?.creditRemaining >= 0 ? "" : "red" }}
          >
            {numberWithCommas(Math.round(data?.creditRemaining))}
          </div>
        ),
    },
    {
      title: (
        <div
          className="creditRemainingButton"
        >
          {CAP_CASH}
        </div>
      ),
      render: (_, data) =>
        getUserInfo?.role === "0" ? (
          <div
            className="dynamicColorOnHover"
            onClick={() => toggleTable()}

            style={{
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: 12,
              color: data?.cash >= 0 ? "" : "red",
            }}
          >
            {Math.round(data?.cash) == 0
              ? "N/A"
              : numberWithCommas(Math.round(data?.cash))}
          </div>
        ) : (
          <div
            className="dynamicColorOnHover"
            onClick={() => toggleTable()}
            
            style={{ 
              cursor: "pointer",
              textDecoration: "underline",
              color: data?.cash >= 0 ? "" : "red" }}
          >
            {numberWithCommas(Math.round(data?.cash))}
          </div>
        ),
    },
    {
      title: CAP_PL_DOWNLINE,
      render: (_, data) => (
        <div
          className="dynamicColorOnHover"
          style={{ color: data?.plDownline >= 0 ? "" : "red" }}
        >
          {numberWithCommas(Math.round(data?.plDownline))}
        </div>
      ),
    },
    {
      title: CAP_BALANCE_UPLINE,
      render: (_, data) => (
        <div
          className="dynamicColorOnHover"
          style={{ color: data?.balanceUpline >= 0 ? "" : "red" }}
        >
          {numberWithCommas(Math.round(data?.balanceUpline))}
        </div>
      ),
    },
    {
      title: CAP_USERS,
      render: (_, data) => (
        <div className="dynamicColorOnHover">
          {numberWithCommas(data?.users || 0)}
        </div>
      ),
    },
  ];

  const onSearchUsers = useCallback(
    async (e) => {
      setSearchUser(e);
      setPageNumber(1);
      const userIds = userId || getUserInfo?.userId;
      console.log("userId", userId, "========", userIds);
      const queryParam = `?page=1&numRecords=100&limit=100&username=${e}&${CAMEL_USER_ID}=${userIds}&sortValue=userName&sort=1`;
      if (getUserInfo?.userId) await loadAllUsers(queryParam);
    },
    [getUserInfo?.userId, userId]
  );

  const handleLoadBalance = async () => {
    console.log("users");
    // setSearchUser('')
    setLoadBalanceLoading(true);
    if (userId >= 0 || getUserInfo?.userId >= 0) {
      const userIds = userId || getUserInfo?.userId;
      const queryParam = `?page=${pageNumber}&numRecords=100&limit=100&${CAMEL_USER_ID}=${userIds}&sortValue=userName&sort=1`;
      await loadAllUsers(queryParam);
      const result = await LoadUserBalance(userIds);
      if (result?.success) {
        setIsLoadBalanceShow(false);
      }
      setLoadBalanceLoading(false);
    }
  };

  const searchUserName = useMemo(
    () => (
      <Row>
        <Col span={1}></Col>
        <Col className={style.searchBarCol}>
          <Search
            placeholder={CAP_USER_NAME}
            // allowClear
            onChange={(e) => setSearchUser(e?.target?.value)}
            enterButton={
              <div className={style.searchIcon}>
                <SearchOutlined className={style.iconSearch} />
                {CAP_SEARCH}
              </div>
            }
            size={LOWER_LARGE}
            onSearch={onSearchUsers}
            className={style.searchBarButton}
          />
        </Col>
      </Row>
    ),
    [getUserInfo, userId]
  );

  const clientListCol = useMemo(
    () => (
      <Col lg={24} xl={8}>
        <Row gutter={5} className={style.buttonContainerClientDetails}>
          <div className={style.displayFlex}>
            <Col>
              <CustomButton
                onClick={() => navigate(constRoute?.userBetForm)}
                title={CAP_NEW_USER}
                className={style.buttonText}
              />
            </Col>
            <Col>
              <CustomButton
                icon={<FaFileInvoice className={style.ledgerClass} />}
                title={CAP_ACCOUNT_LEDGER}
                onClick={async () => {
                  navigate(`${constRoute?.ledger}/${getUserInfo?._id}`, {
                    state: { isLoginUser: true },
                  });
                }}
                className={style.buttonText}
              />
            </Col>
          </div>
        </Row>
      </Col>
    ),
    [getUserInfo]
  );

  const clientListCardButtonCol = useMemo(
    () => (
      <Col lg={24} xl={16} className={style.UseBtns}>
        <div className={style.btnContainers}>
          <CustomButton
            className={style.BtnList}
            title={CAP_CASH_SLASH_CREDIT}
            btnFontSize={true}
            customClass={style.btnStyle}
            icon={<div className={style.cashSlashBtn}>C</div>}
          />
          <CustomButton
            className={style.BtnList}
            title={CAP_EDIT}
            customClass={style.btnStyle}
            btnFontSize={true}
            icon={<FaPen className={style.editBtn} />}
          />
          <CustomButton
            className={style.BtnList}
            title={CAP_LEDGER}
            customClass={style.btnStyle}
            btnFontSize={true}
            icon={<div className={style.ledgerBtn}>L</div>}
          />
          <CustomButton
            className={style.BtnList}
            title={CAP_ACTIVE}
            customClass={style.btnStyle}
            btnFontSize={true}
            icon={<div className={style.activeBtn}>A</div>}
          />
          <CustomButton
            className={style.BtnList}
            title={CAP_IN_ACTIVE}
            customClass={style.btnStyle}
            btnFontSize={true}
            icon={<div className={style.inActiveBtn}>D</div>}
          />
          <CustomButton
            className={style.BtnList}
            customClass={style.btnStyle}
            btnFontSize={true}
            title={CAP_SETTLE_ACCOUNT}
            icon={<div className={style.settingBtn}>S</div>}
          />
        </div>
      </Col>
    ),
    []
  );

  return (
    <div className={style.userListMainContainer}>
      <div className={style.userListContainer}>
        <ReportTypeHeaderBtns />
        <TitleBarUpdated
          title={CAP_SEARCH_USER}
          icon={<FilterOutlined className={style.filterIcon} />}
          isIcon={true}
        />
        <div className={style.searchBarButtunCard}>{searchUserName}</div>
        <div className={style.clientAndTableCardContainer}>
          <TitleBarUpdated
            title={
              (getUserName || getUserInfo?.userName) +
              " - Clients List | Default"
            }
          />
          <Table
            className={style.negativeClient}
            dataSource={
              getLoadBalanceData?.length
                ? getLoadBalanceData
                : jsonDataForLoadBalance
            }
            columns={columns}
            checkPagination={false}
          />
          <Row className={style.usersicone}>
            {clientListCol}
            {clientListCardButtonCol}
          </Row>
          {isLoadBalanceShow && (
            <TitleBarUpdated
              isButton={true}
              btnTitle={CAP_LOAD_BALANCE}
              clickHandler={handleLoadBalance}
              btnLoading={loadBalanceLoading}
            />
          )}
          <div className={style.allUserTablesIcons}>
            <AllUserTable
              setUserId={setUserId}
              setGetUserName={setGetUserName}
              setIsLoadBalanceShow={setIsLoadBalanceShow}
              isLoadBalanceShow={isLoadBalanceShow}
              loadBalanceTotal={loadBalanceTotal}
              searchUser={searchUser}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              setSearchUser={setSearchUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(UserList);
