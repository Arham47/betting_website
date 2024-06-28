/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import style from "./style.module.scss";
import {useStore} from "@stores/root-store";
// import DepositCashTable from "@components/dashboard/deposit-and-cash-table/DepositCashTable";
import {
  CAMEL_USER_ID,
  CAP_AVAILABLE_BALANCE,
  CAP_BALANCE,
  CAP_CLIENT_PL,
  CAP_CREDIT,
  CAP_EXPOSURE,
  CAP_OPTIONS,
  CAP_SHARE,
  CAP_TYPE,
  CAP_USER_NAME,
  DOUBLE_DASH,
  INITIAL_NUM_RECORDS,
  INITIAL_PAGE_NUMBER,
  LOWER_NUM_RECORDS_PARAM_KEY,
  LOWER_PAGE_PARAM_KEY,
} from "@utils/const";
import {Tooltip, Spin} from "antd";
import {
  ColUserOnRole,
} from "@components/common-components/export-common-components/table-columns-text-check";
import CustomButton from "@components/common-components/custom-button";
import {useLocation, useNavigate} from "react-router-dom";
import {constRoute} from "@utils/route";
import {jsonDataForLoadBalance} from "@utils/json-data";
import {
  LoadingOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import useWindowSize from "@utils/hooks/useWindowSize";
import styled from "styled-components";
import {Pagination} from "antd";
import {FaPen} from "react-icons/fa";
import {formatLargeNumber, getSingleUrlParam, numberWithCommas} from "@utils/common-functions";
import {BiTrash} from "react-icons/bi";
import {ConfirmationModal} from "@components/common-components/confirmation-modal";

interface UserTable {
  setUserId?: any;
  setIsLoadBalanceShow?: any;
  setGetUserName?: any;
  isLoadBalanceShow?: boolean;
  loadBalanceTotal?: any;
  searchUser?: any;
  pageNumber?: any;
  setPageNumber?: any;
  setSearchUser?: any;
}

const AllUsersTable: React.FC<UserTable> = observer(
  ({
     setUserId,
     setIsLoadBalanceShow,
     setGetUserName,
     loadBalanceTotal,
     isLoadBalanceShow,
     searchUser,
     pageNumber,
     setPageNumber,
     setSearchUser
   }) => {
    const navigate = useNavigate();
    const tableRef = useRef(null);
    const defaultParams = {
      numRecords: 10,
      page: 1,
    };

    const [numRecords, setNumRecords] = useState(100);
    const [resLoadUser, setResLoadUser] = useState(null);
    const [isChildrenUser, setIsChildrenUser] = useState(false);
    const [userIDData, setUserIDData] = useState(null);
    const [editLoading, setEditLoading] = useState(null);
    const [isShowData, setIsShowData] = useState([]);
    const [params, setParams] = useState(defaultParams);
    const [editUserWindow, setEditUserWidow] = useState(null);
    const [ledgerWindow, setLedgerWindow] = useState(null);
    const [canshWindow, setCashWindow] = useState(null)
    const [settlementWindow, setSetlementWindow] = useState(null)
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    // const [isChangePagincation, setIsChangePagination] = useState(true);
    const [loadingActiveInActive, setLoadingForActiveInActive] = useState("");
    const location = useLocation();
    const getUserIdParam = getSingleUrlParam(location, 'userId')
    const {
      user: {
        getAllUsers,
        getAllUserTotal,
        loadAllUsers,
        loadSingleUser,
        isLoadingGetAllUsers,
        updateLoadBalanceValue,
        loadUserActiveAndInActive,
        loadUserDeActive,
        getUserInfo,
        deleteSpecificUser,
        loadingDeleteUser
      },
    } = useStore(null);
    const data = useWindowSize().width;
    // useEffect(() => {
    //   console.log('this is called1111111111111111111')
    //   const fetchData = async () => {
    //     const res = await loadAllUsers();
    //     setResLoadUser(res);
    //   };
    //   fetchData();
    //   return () => {
    //     setIsChildrenUser(false);
    //   };
    // }, []);
    useEffect(() => {
      setIsShowData([]);
    }, [getAllUsers]);

    const fetDataOnPageNumber = async () => {
      const isUserId = userIDData || getUserIdParam || getUserInfo?.userId
      const tmpQueryParam = `?${
        (`${CAMEL_USER_ID}=${isUserId}`) || ""
      }&${LOWER_PAGE_PARAM_KEY}=${pageNumber}&${LOWER_NUM_RECORDS_PARAM_KEY}=${numRecords}&sortValue=userName&sort=1`;
      if (isUserId) {
        const res = await loadAllUsers(tmpQueryParam);
        setResLoadUser(res);
      }
    };

    useEffect(() => {
      fetDataOnPageNumber();
    }, [pageNumber, getUserInfo?.userId, getUserIdParam]);

    const onEdit = async (rowData) => {
      // setEditLoading(rowData?._id);
      // const data = { id: rowData?._id };
      // const res = await loadSingleUser(data);
      // if (res?.success) {
      // navigate(
      //   `${constRoute?.userBetForm}/${rowData?._id?.toString()}`
      // );
      // if (editUserWindow&& !editUserWindow?.closed) {
      //   editUserWindow.location.href = `${window.location.href.replaceAll("/users",constRoute.userBetForm)}/${rowData?._id?.toString()}`;
      //   editUserWindow.focus();
      // }else{
      const newWindow = window.open(`${window.location.href.replaceAll("/users", constRoute.userBetForm)}/${rowData?._id?.toString()}`, "_blank", 'width=520,height=600,resizable,scrollbars');
      // setEditUserWidow(newWindow);
      // }
      // setEditLoading(null);
    }
    const onClickUserName = async (userId) => {
      setUserIDData(userId);
      setIsChildrenUser(true);
      const querryParam = `?${CAMEL_USER_ID}=${userId}&${LOWER_PAGE_PARAM_KEY}=${1}&${LOWER_NUM_RECORDS_PARAM_KEY}=${numRecords}`;
      const res = await loadAllUsers(querryParam);
      setResLoadUser(res);
    };
    const checkDataFind = (item) => {
      return isShowData?.find((z) => z === item?._id);
    };
    const handlePaginationChange = (page, pageSize) => {
      // setSearchUser('')
      setPageNumber(page);
      // setIsChangePagination(true);
      setParams({...params, page, numRecords: pageSize});
    };
    useEffect(() => {
      if (!isLoadBalanceShow) {
        setIsShowData([]);
        const data = getAllUsers?.map((item) => {
          return item?._id;
        });
        setIsShowData(data);
      }
    }, [isLoadBalanceShow]);
    const handleSettleMent = (item) => {
      if (settlementWindow && !settlementWindow?.closed) {
        settlementWindow.location.href = `${window.location.href.replaceAll("/users", constRoute.settlement)}?id=${item?._id?.toString()}`;
        settlementWindow.focus();
      } else {
        const newWindow = window.open(
          `${window.location.href.replaceAll(
            "/users",
            constRoute.settlement
          )}?id=${item?._id}`,
          "_blank",
          'width=520,height=600,resizable,scrollbars'
        );
        setSetlementWindow(newWindow);
        newWindow.focus();

      }

      // const newWindow = window.open(
      //   `${window.location.href.replaceAll(
      //     "/users",
      //     constRoute.settlement
      //   )}?id=${item?._id}`,
      //   "_blank",
      //   'width=520,height=600,resizable,scrollbars'
      // );
    };

    const handleDeleteUser = async (data) => {
      setIsOpenConfirm(true)
      setDeleteUserId(data?.userId);
    }
    const confirmHandler = async () => {
      const res = await deleteSpecificUser(deleteUserId)
      if (res?.success) {
        setDeleteUserId(null);
        fetDataOnPageNumber();
        setIsOpenConfirm(false);
      }
    }
    const handleConfirmCancel = () => {
      setIsOpenConfirm(false);
      setDeleteUserId(null);
    }
    const cashHandler = (id) => {
      if (canshWindow && !canshWindow?.closed) {
        canshWindow.location.href = `${window.location.href.replaceAll("/users", constRoute.cash)}/${id?.toString()}`;
        canshWindow.focus();
      } else {
        // if(canshWindow){
        //   canshWindow.close()
        // }
        const newWindow = window.open(`${window.location.href.replaceAll("/users", constRoute.cash)}/${id}`, "_blank", 'width=520,height=600,resizable,scrollbars');
        newWindow.focus();
        setCashWindow(newWindow)
      }
      ;
    }
    const ledgerHandler = (id) => {
      if (ledgerWindow && !ledgerWindow?.closed) {
        ledgerWindow.location.href = `${window.location.href.replaceAll("/users", constRoute.ledger)}/${id?.toString()}`;
        ledgerWindow.focus();
      } else {

        const newWindow = window.open(`${window.location.href.replaceAll("/users", constRoute.ledger)}/${id}`, "_blank", 'width=520,height=600,resizable,scrollbars');
        newWindow.focus();
        setLedgerWindow(newWindow)
      }
    };

    const ledgerHandlerTwo = (id) => {
      if (ledgerWindow && !ledgerWindow?.closed) {
        ledgerWindow.location.href = `${window.location.href.replaceAll("/users", constRoute.ledgerTwo)}/${id?.toString()}`;
        ledgerWindow.focus();
      } else {

        const newWindow = window.open(`${window.location.href.replaceAll("/users", constRoute.ledgerTwo)}/${id}`, "_blank", 'width=520,height=600,resizable,scrollbars');
        newWindow.focus();
        setLedgerWindow(newWindow)
      }
    };

    return (
      <div className={style.allUsersTable}>
        <table className={style.newtable}>
          <thead>
          {!isLoadBalanceShow && (
            <tr className={style.theadColor}>
              <th className={style.width16} style={{textAlign: 'left'}}>
                <div className={style.colorClass}> Total:</div>
              </th>
              <th className={style.width9}>
                {" "}
                <div className={style.colorClass}>{""}</div>
              </th>
              {data >= 450 && data < 885 ? (
                <th className={style.width9}>
                  <div className={style.colorClass} style={{color: loadBalanceTotal?.credit >= 0 ? '' : 'red'}}>
                    {" "}
                    {formatLargeNumber(loadBalanceTotal?.credit, 1)?.toString()?.replace('.0', '') || 0}
                  </div>
                </th>
              ) : data >= 885 && data < 1095 ? (
                <>
                  {" "}
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.credit >= 0 ? '' : 'red'}}>
                      {" "}
                      {formatLargeNumber(loadBalanceTotal?.credit, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.balance >= 0 ? '' : 'red'}}>
                      {" "}
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.balance, 1)?.toString()?.replace('.0', '') : '--'}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.clientPL >= 0 ? '' : 'red'}}>
                      {" "}
                      {formatLargeNumber(loadBalanceTotal?.clientPL, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass}> {""}</div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.exposure >= 0 ? '' : 'red'}}>
                      {" "}
                      {(loadBalanceTotal?.exposure < 1 && loadBalanceTotal?.exposure > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.exposure, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                </>
              ) : data >= 1095 ? (
                <>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.credit >= 0 ? '' : 'red'}}>
                      {" "}
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.credit, 1)?.toString()?.replace('.0', '') : '--'}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.balance >= 0 ? '' : 'red'}}>
                      {" "}
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.balance, 1)?.toString()?.replace('.0', '') : '--'}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.clientPL >= 0 ? '' : 'red'}}>
                      {" "}
                      {formatLargeNumber(loadBalanceTotal?.clientPL, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass}> {""}</div>
                  </th>
                  <th className={style.width9}>
                    <div className={style.colorClass} style={{color: loadBalanceTotal?.exposure >= 0 ? '' : 'red'}}>
                      {" "}
                      {(loadBalanceTotal?.exposure < 1 && loadBalanceTotal?.exposure > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.exposure, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                  <th className={style.width10}>
                    <div className={style.colorClass}
                         style={{color: loadBalanceTotal?.availableBalance >= 0 ? '' : 'red'}}>
                      {" "}
                      {(loadBalanceTotal?.availableBalance < 0.1 && loadBalanceTotal?.availableBalance > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
                    </div>
                  </th>
                  <th className={style.width20}>
                    <div className={style.colorClass}> {""}</div>
                  </th>
                </>
              ) : (
                ""
              )}
            </tr>
          )}
          {data >= 1095 && !isLoadBalanceShow ? (
            ""
          ) : data >= 885 && !isLoadBalanceShow ? (
            <tr>
              {" "}
              <ul className={style.paddingLeft22}>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_AVAILABLE_BALANCE}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10}
                        style={{color: loadBalanceTotal?.availableBalance >= 0 ? '' : 'red'}}>
                      {(loadBalanceTotal?.availableBalance < 0.1 && loadBalanceTotal?.availableBalance > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
              </ul>
            </tr>
          ) : data >= 450 && !isLoadBalanceShow ? (
            <tr>
              {" "}
              <ul className={style.paddingLeft22}>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_BALANCE}:</b>{" "}
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.balance >= 0 ? '' : 'red'}}>
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.balance, 1)?.toString()?.replace('.0', '') : '--'}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_CLIENT_PL}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.clientPL >= 0 ? '' : 'red'}}>
                      {formatLargeNumber(loadBalanceTotal?.clientPL, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_EXPOSURE}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.exposure >= 0 ? '' : 'red'}}>
                      {(loadBalanceTotal?.exposure < 1 && loadBalanceTotal?.exposure > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.exposure, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_AVAILABLE_BALANCE}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10}
                        style={{color: loadBalanceTotal?.availableBalance >= 0 ? '' : 'red'}}>
                      {(loadBalanceTotal?.availableBalance < 0.1 && loadBalanceTotal?.availableBalance > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
              </ul>
            </tr>
          ) : data > 250 && !isLoadBalanceShow ? (
            <tr>
              {" "}
              <ul className={style.paddingLeft22}>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_CREDIT}:</b>{" "}
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.credit >= 0 ? '' : 'red'}}>
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.credit, 1)?.toString()?.replace('.0', '') : '--'}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_BALANCE}:</b>{" "}
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.balance >= 0 ? '' : 'red'}}>
                      {loadBalanceTotal?.role != 0 ? formatLargeNumber(loadBalanceTotal?.balance, 1)?.toString()?.replace('.0', '') : '--'}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_CLIENT_PL}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.clientPL >= 0 ? '' : 'red'}}>
                      {formatLargeNumber(loadBalanceTotal?.clientPL, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_EXPOSURE}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10} style={{color: loadBalanceTotal?.exposure >= 0 ? '' : 'red'}}>
                      {(loadBalanceTotal?.exposure < 1 && loadBalanceTotal?.exposure > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.exposure, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
                <li className={style.listStyleFont14}>
                    <span>
                      <b>{CAP_AVAILABLE_BALANCE}:</b>
                    </span>{" "}
                  <span className={style.paddingLeft10}
                        style={{color: loadBalanceTotal?.availableBalance >= 0 ? '' : 'red'}}>
                      {(loadBalanceTotal?.availableBalance < 0.1 && loadBalanceTotal?.availableBalance > -1) ? 0 : formatLargeNumber(loadBalanceTotal?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
                    </span>
                </li>
              </ul>
            </tr>
          ) : (
            ""
          )}
          <tr className={style.theadUnColor}>
            <th className={style.width16} style={{textAlign: 'left'}}>{CAP_USER_NAME}</th>
            <th className={style.width9}>{CAP_TYPE}</th>
            {data >= 450 && data < 885 ? (
              <>
                <th className={style.width9}>{CAP_CREDIT}</th>
              </>
            ) : data >= 885 && data < 1095 ? (
              <>
                {" "}
                <th className={style.width9}>{CAP_CREDIT}</th>
                <th className={style.width9}>{CAP_BALANCE}</th>
                <th className={style.width9}>{CAP_CLIENT_PL}</th>
                <th className={style.width9}>{CAP_SHARE}</th>
                <th className={style.width9}>{CAP_EXPOSURE}</th>
              </>
            ) : data >= 1095 ? (
              <>
                <th className={style.width9}>{CAP_CREDIT}</th>
                <th className={style.width10}>{CAP_BALANCE}</th>
                <th className={style.width10}>{CAP_CLIENT_PL}</th>
                <th className={style.width10}>{CAP_SHARE}</th>
                <th className={style.width10}>{CAP_EXPOSURE}</th>
                <th className={style.width10}>{CAP_AVAILABLE_BALANCE}</th>
                <th className={style.width20}>{CAP_OPTIONS}</th>
              </>
            ) : (
              ""
            )}
          </tr>
          </thead>
          <tbody>
          {isLoadingGetAllUsers ? (
            <td
              style={{border: "none"}}
              colSpan={data >= 1095 ? 9 : data >= 885 ? 7 : data >= 450 ? 3 : 5}
            >
              {" "}
              <Spin className={style.antIconClass} size="large"/>
            </td>
          ) : getAllUsers?.length ? (
            getAllUsers?.map((item, index) => {
              return (
                <>
                  {" "}
                  <tr key={index}>
                    <td className={style.onlyWidth16}>
                      <div className={style.userNameWrapper}>
                        <div
                          onClick={async () => {
                            if (!(item?.role === "5")) {
                              // setIsChangePagination(false);
                              // setSearchUser('')
                              setPageNumber(1);
                              setIsLoadBalanceShow(true);
                              updateLoadBalanceValue(jsonDataForLoadBalance);

                              await onClickUserName(item?.userId);
                              setUserId(item?.userId);
                              setGetUserName(item?.userName);
                            }
                          }}
                        >
                          <Tooltip
                            className={
                              (!(item?.role === "5") && style.clickAble) ||
                              style.unClickAble
                            }
                            title={item?.userName}
                          >
                            {item?.userName || ''} {item?.remoteId ? `(${item?.remoteId})` : ''}
                          </Tooltip>
                        </div>
                        {data < 1095 ? <div className={style.tooltipWrraper} onClick={() => {
                          const data = isShowData?.find(
                            (z) => z === item?._id
                          );
                          if (data) {
                            const filterData = isShowData?.filter(
                              (z) => z !== item?._id
                            );
                            setIsShowData(filterData);
                          } else {
                            setIsShowData([...isShowData, item?._id]);
                          }
                        }}>
                          <InfoCircleFilled
                            style={{fontSize: "15px"}}

                          />
                        </div> : ''}
                      </div>
                    </td>
                    <td className={style.width9}>
                      {ColUserOnRole(item?.role)}
                    </td>
                    {data >= 450 && data < 885 ? (
                      <td className={style.width9}
                          style={{color: item?.credit >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(item?.credit, 1)?.toString()?.replace('.0', '') : '--'}</td>
                    ) : data >= 885 && data < 1095 ? (
                      <>
                        <td className={style.width9}
                            style={{color: item?.credit >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(item?.credit, 1)?.toString()?.replace('.0', '') : '--'}</td>
                        <td className={style.width9}
                            style={{color: item?.balance >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(item?.balance, 1)?.toString()?.replace('.0', '') : '--'}</td>
                        <td className={style.width9}
                            style={{color: item?.clientPL >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(Number(item?.clientPL?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}</td>
                        <td className={style.width9} style={{color: item?.downLineShare >= 0 ? '' : 'red'}}>
                          {formatLargeNumber(item?.downLineShare, 1)?.toString()?.replace('.0', '') || 0}
                        </td>
                        <td className={style.width9} style={{color: item?.exposure >= 0 ? '' : 'red'}}>
                          {(item?.exposure < 1 && item?.exposure > -1) ? 0 : formatLargeNumber(Number(item?.exposure?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                        </td>
                      </>
                    ) : data >= 1095 ? (
                      <>
                        <td className={style.width9}
                            style={{color: item?.credit >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(item?.credit, 1)?.toString()?.replace('.0', '') : ''}</td>
                        <td className={style.width10}
                            style={{color: item?.balance >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(Number(item?.balance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}</td>
                        <td className={style.width10}
                            style={{color: item?.clientPL >= 0 ? '' : 'red'}}>{item?.role != 0 ? formatLargeNumber(Number(item?.clientPL?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}</td>
                        <td className={style.width10} style={{color: item?.downLineShare >= 0 ? '' : 'red'}}>
                          {formatLargeNumber(item?.downLineShare, 1)?.toString()?.replace('.0', '') || 0}
                        </td>
                        <td className={style.width10} style={{color: item?.exposure >= 0 ? '' : 'red'}}>
                          {(item?.exposure < 1 && item?.exposure > -1) ? 0 : formatLargeNumber(Number(item?.exposure?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                        </td>
                        <td className={style.width10} style={{color: item?.availableBalance >= 0 ? '' : 'red'}}>
                          {(item?.availableBalance < 0.1 && item?.availableBalance > -1) ? 0 : formatLargeNumber(Number(item?.availableBalance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                        </td>
                        <td className={style.width20}>
                          <div className={style.userIcons}>
                            <CustomButton
                              className={style.userIconsCash}
                              title={""}
                              onClick={async () => {
                                if (item?._id) {
                                  const data = {id: item?._id};
                                  await loadSingleUser(data);
                                  localStorage.setItem(
                                    "baseCurrency",
                                    item?.baseCurrency
                                  );
                                  // navigate(
                                  //   `${constRoute?.cash}/${item?._id}`
                                  // );
                                  cashHandler(item?._id)
                                }
                              }}
                              icon={<p className={style.cashSlashBtn}>C</p>}
                            />
                            {editLoading === item?._id ? (
                              <Spin
                                className={style.antIconClassEdit}
                              />
                            ) : (
                              <CustomButton
                                className={style.userIconsEdit}
                                title={""}
                                onClick={() => onEdit(item)}
                                icon={<FaPen className={style.editBtn}/>}
                              />
                            )}{getUserInfo?.role !== "5" ?
                            <CustomButton
                              className={style.userIconsLedger}
                              title={""}
                              onClick={async () => {
                                if (item?._id) {
                                  // const data = { id: item?._id };
                                  // const res = await loadSingleUser(data);
                                  // localStorage.setItem("type", "");
                                  // navigate(
                                  //   `${
                                  //     constRoute?.ledger
                                  //   }/${item?._id}`
                                  // );
                                  ledgerHandler(item?._id);
                                }
                              }}
                              icon={<p className={style.ledgerBtn}>L</p>}
                            /> : ''}
                            {getUserInfo?.role === "0" ? <CustomButton
                              className={style.userIconsLedger}
                              title={""}
                              onClick={async () => {
                                if (item?._id) {
                                  // const data = { id: item?._id };
                                  // const res = await loadSingleUser(data);
                                  // localStorage.setItem("type", "");
                                  // navigate(
                                  //   `${
                                  //     constRoute?.ledger
                                  //   }/${item?._id}`
                                  // );
                                  ledgerHandlerTwo(item?._id);
                                }
                              }}
                              icon={<p className={style.ledgerBtn}>LL</p>}
                            /> : ''}
                            {loadingActiveInActive === item?._id ? (
                              <Spin
                                className={style.antIconClassEdit}
                              />
                            ) : item?.isActive ? (
                              <CustomButton
                                className={style.userIconsInActive}
                                title={""}
                                icon={<p className={style.inActiveBtn}>D</p>}
                                onClick={async () => {
                                  setLoadingForActiveInActive(item?._id);
                                  const payload = {id: item?._id};
                                  const res = await loadUserDeActive(payload);
                                  if (res?.success) {
                                    setLoadingForActiveInActive(null);
                                    await fetDataOnPageNumber()
                                  } else {
                                    setLoadingForActiveInActive(null);
                                  }
                                }}
                              />
                            ) : (
                              <CustomButton
                                className={style.userIconsActive}
                                title={""}
                                icon={<p className={style.activeBtn}>A</p>}
                                onClick={async () => {
                                  setLoadingForActiveInActive(item?._id);
                                  const payload = {id: item?._id};
                                  const res = await loadUserActiveAndInActive(
                                    payload
                                  );
                                  if (res?.success) {
                                    setLoadingForActiveInActive(null);
                                    await fetDataOnPageNumber()
                                  } else {
                                    setLoadingForActiveInActive(null);
                                  }
                                }}
                              />
                            )}
                            {item?.role === "5" ? '' : <CustomButton
                              className={style.userIconsSetting}
                              title={""}
                              icon={<p className={style.settingBtn}>S</p>}
                              onClick={() => handleSettleMent(item)}
                            />}
                            {getUserInfo?.role === "0" ? <CustomButton
                              className={style.userIconsSetting}
                              title={""}
                              icon={<BiTrash className={style.deleteBtn}/>}
                              onClick={() => handleDeleteUser(item)}
                            /> : ''}
                          </div>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                  {isShowData?.find((z) => z === item?._id) && data < 450 ? (
                    <tr>
                      {" "}
                      <ul className={style.paddingLeft22}>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_CREDIT}: </span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.credit >= 0 ? '' : 'red'}}>
                              {item?.role != 0 ? formatLargeNumber(item?.credit, 1)?.toString()?.replace('.0', '') : '--'}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_BALANCE}: </span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.balance >= 0 ? '' : 'red'}}>
                              {item?.role != 0 ? formatLargeNumber(Number(item?.balance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_CLIENT_PL}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.clientPL >= 0 ? '' : 'red'}}>
                              {item?.role != 0 ? formatLargeNumber(Number(item?.clientPL?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_SHARE}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.downLineShare >= 0 ? '' : 'red'}}>
                              {formatLargeNumber(item?.downLineShare, 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_EXPOSURE}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.exposure >= 0 ? '' : 'red'}}>
                              {(item?.exposure < 1 && item?.exposure > -1) ? 0 : formatLargeNumber(Number(item?.exposure?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_AVAILABLE_BALANCE}:</span>{" "}
                          <span className={style.paddingLeft10}
                                style={{color: item?.availableBalance >= 0 ? '' : 'red'}}>
                              {(item?.availableBalance < 0.1 && item?.availableBalance > -1) ? 0 : formatLargeNumber(Number(item?.availableBalance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <div> {CAP_OPTIONS}:</div>
                            {"   "}
                            <div
                              style={{display: "flex"}}
                              className={style.userIcons}
                            >
                              <CustomButton
                                className={style.userIconsCash}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    const data = {id: item?._id};
                                    await loadSingleUser(data);
                                    localStorage.setItem(
                                      "baseCurrency",
                                      item?.baseCurrency
                                    );
                                    // navigate(
                                    //   `${constRoute?.cash}/${item?._id}`
                                    // );
                                    cashHandler(item?._id)
                                  }
                                }}
                                icon={<p className={style.cashSlashBtn}>C</p>}
                              />
                              {editLoading === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsEdit}
                                  title={""}
                                  onClick={() => onEdit(item)}
                                  icon={<FaPen className={style.editBtn}/>}
                                />
                              )}
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandler(item?._id)
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>L</p>}
                              />
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandlerTwo(item?._id)
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>LL</p>}
                              />
                              {loadingActiveInActive === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : item?.isActive ? (
                                <CustomButton
                                  className={style.userIconsInActive}
                                  title={""}
                                  icon={
                                    <p className={style.inActiveBtn}>D</p>
                                  }
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res = await loadUserDeActive(
                                      payload
                                    );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsActive}
                                  title={""}
                                  icon={<p className={style.activeBtn}>A</p>}
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res =
                                      await loadUserActiveAndInActive(
                                        payload
                                      );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              )}
                              {item?.role === "5" ? '' : <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<p className={style.settingBtn}>S</p>}
                                onClick={() => handleSettleMent(item)}
                              />}
                              {getUserInfo?.role === "0" ? <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<BiTrash className={style.deleteBtn}/>}
                                onClick={() => handleDeleteUser(item)}
                              /> : ''}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </tr>
                  ) : isShowData?.find((z) => z === item?._id) &&
                  data < 885 ? (
                    <tr>
                      {" "}
                      <ul className={style.paddingLeft22}>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_BALANCE}: </span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.balance >= 0 ? '' : 'red'}}>
                              {item?.role != 0 ? formatLargeNumber(Number(item?.balance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_CLIENT_PL}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.clientPL >= 0 ? '' : 'red'}}>
                              {item?.role != 0 ? formatLargeNumber(Number(item?.clientPL?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') : '--'}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_SHARE}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.downLineShare >= 0 ? '' : 'red'}}>
                              {formatLargeNumber(item?.downLineShare, 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_EXPOSURE}:</span>{" "}
                          <span className={style.paddingLeft10} style={{color: item?.exposure >= 0 ? '' : 'red'}}>
                              {(item?.exposure < 1 && item?.exposure > -1) ? 0 : formatLargeNumber(Number(item?.exposure?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_AVAILABLE_BALANCE}:</span>{" "}
                          <span className={style.paddingLeft10}
                                style={{color: item?.availableBalance >= 0 ? '' : 'red'}}>
                              {(item?.availableBalance < 0.1 && item?.availableBalance > -1) ? 0 : formatLargeNumber(Number(item?.availableBalance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <div> {CAP_OPTIONS}:</div>
                            {"   "}
                            <div
                              style={{display: "flex"}}
                              className={style.userIcons}
                            >
                              <CustomButton
                                className={style.userIconsCash}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    const data = {id: item?._id};
                                    await loadSingleUser(data);
                                    localStorage.setItem(
                                      "baseCurrency",
                                      item?.baseCurrency
                                    );
                                    // navigate(
                                    //   `${constRoute?.cash}/${item?._id}`
                                    // );
                                    cashHandler(item?._id)
                                  }
                                }}
                                icon={<p className={style.cashSlashBtn}>C</p>}
                              />
                              {editLoading === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsEdit}
                                  title={""}
                                  onClick={() => onEdit(item)}
                                  icon={<FaPen className={style.editBtn}/>}
                                />
                              )}
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandler(item?._id);
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>L</p>}
                              />
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandlerTwo(item?._id);
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>LL</p>}
                              />
                              {loadingActiveInActive === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : item?.isActive ? (
                                <CustomButton
                                  className={style.userIconsInActive}
                                  title={""}
                                  icon={
                                    <p className={style.inActiveBtn}>D</p>
                                  }
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res = await loadUserDeActive(
                                      payload
                                    );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsActive}
                                  title={""}
                                  icon={<p className={style.activeBtn}>A</p>}
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res =
                                      await loadUserActiveAndInActive(
                                        payload
                                      );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              )}
                              {item?.role === "5" ? '' : <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<p className={style.settingBtn}>S</p>}
                                onClick={() => handleSettleMent(item)}
                              />}
                              {getUserInfo?.role === "0" ? <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<BiTrash className={style.deleteBtn}/>}
                                onClick={() => handleDeleteUser(item)}
                              /> : ''}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </tr>
                  ) : isShowData?.find((z) => z === item?._id) &&
                  data < 1095 ? (
                    <tr>
                      {" "}
                      <ul className={style.paddingLeft22}>
                        <li className={style.listStyleFont14}>
                          <span>{CAP_AVAILABLE_BALANCE}:</span>{" "}
                          <span className={style.paddingLeft10}
                                style={{color: item?.availableBalance >= 0 ? '' : 'red'}}>
                              {(item?.availableBalance < 0.1 && item?.availableBalance > -1) ? 0 : formatLargeNumber(Number(item?.availableBalance?.toString()?.replaceAll('e-', '')), 1)?.toString()?.replace('.0', '') || 0}
                            </span>
                        </li>
                        <li className={style.listStyleFont14}>
                          <div className={style.listStyleOption}>
                            <div> {CAP_OPTIONS}:</div>
                            {"   "}
                            <div
                              style={{display: "flex"}}
                              className={style.userIcons}
                            >
                              <CustomButton
                                className={style.userIconsCash}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    const data = {id: item?._id};
                                    await loadSingleUser(data);
                                    localStorage.setItem(
                                      "baseCurrency",
                                      item?.baseCurrency
                                    );
                                    // navigate(
                                    //   `${constRoute?.cash}/${item?._id}`
                                    // );
                                    cashHandler(item?._id)
                                  }
                                }}
                                icon={<p className={style.cashSlashBtn}>C</p>}
                              />
                              {editLoading === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsEdit}
                                  title={""}
                                  onClick={() => onEdit(item)}
                                  icon={<FaPen className={style.editBtn}/>}
                                />
                              )}
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandler(item?._id);
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>L</p>}
                              />
                              <CustomButton
                                className={style.userIconsLedger}
                                title={""}
                                onClick={async () => {
                                  if (item?._id) {
                                    // const data = { id: item?._id };
                                    // const res = await loadSingleUser(data);
                                    localStorage.setItem("type", "");
                                    // navigate(
                                    //   `${
                                    //     constRoute?.ledger
                                    //   }/${item?._id}`
                                    // );
                                    ledgerHandlerTwo(item?._id);
                                  }
                                }}
                                icon={<p className={style.ledgerBtn}>LL</p>}
                              />
                              {loadingActiveInActive === item?._id ? (
                                <Spin
                                  className={style.antIconClassEdit}
                                />
                              ) : item?.isActive ? (
                                <CustomButton
                                  className={style.userIconsInActive}
                                  title={""}
                                  icon={
                                    <p className={style.inActiveBtn}>D</p>
                                  }
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res = await loadUserDeActive(
                                      payload
                                    );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              ) : (
                                <CustomButton
                                  className={style.userIconsActive}
                                  title={""}
                                  icon={<p className={style.activeBtn}>A</p>}
                                  onClick={async () => {
                                    setLoadingForActiveInActive(item?._id);
                                    const payload = {id: item?._id};
                                    const res =
                                      await loadUserActiveAndInActive(
                                        payload
                                      );
                                    if (res?.success) {
                                      setLoadingForActiveInActive(null);
                                      await fetDataOnPageNumber()
                                    } else {
                                      setLoadingForActiveInActive(null);
                                    }
                                  }}
                                />
                              )}
                              {item?.role === "5" ? '' : <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<p className={style.settingBtn}>S</p>}
                                onClick={() => handleSettleMent(item)}
                              />}
                              {getUserInfo?.role == "0" ? <CustomButton
                                className={style.userIconsSetting}
                                title={""}
                                icon={<BiTrash className={style.deleteBtn}/>}
                                onClick={() => handleDeleteUser(item)}
                              /> : ''}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </tr>
                  ) : (
                    ""
                  )}
                </>
              );
            })
          ) : (
            <td
              style={{border: "none"}}
              colSpan={data >= 1095 ? 9 : data >= 885 ? 7 : data >= 450 ? 3 : 5}
            >
              <div className={style.noRecordClass}>No Records</div>
            </td>
          )}
          </tbody>
        </table>


{/* <DepositCashTable /> */}





        {getAllUsers?.length ? (
          <PaginationStyled
            onChange={handlePaginationChange}
            total={getAllUserTotal || 10}
            pageSize={numRecords}
            current={pageNumber}
            className={style.paginationClass}
          />
        ) : (
          ""
        )}
        <ConfirmationModal modelTitle="Delete User" isOpen={isOpenConfirm} onCancel={handleConfirmCancel}
                           isConfirmDisable={loadingDeleteUser} onConfirm={confirmHandler}/>
        {/* </>} */}
      </div>
    );
  }
);

export default AllUsersTable;
const PaginationStyled = styled(Pagination)`
  margin: 12px 25px;
  text-align: right;
  margin-top: 10px;
  // border-top: 1px solid #e8e8e8 !important;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;

  .ant-pagination-item {
    min-width: 25px !important;
    height: 25px !important;
  }

  .ant-pagination-item-active {
    height: 30px !important;
  }

  .ant-pagination-prev {
    width: 25px !important;
    height: 25px !important;
  }

  .ant-pagination-next {
    width: 25px !important;
    height: 25px !important;
  }

  .ant-pagination-disabled {
    min-width: 25px !important;
    height: 25px !important;
  }

  .ant-pagination-item-link span svg {
    display: flex;
    margin-bottom: 2px;
    align-items: center;
    justify-content: center;
  }

  .ant-pagination-prev {
    min-width: 25px !important;
    max-height: 25px !important;
  }

  .ant-pagination-next {
    min-width: 25px !important;
    max-height: 25px !important;
  }

  .ant-pagination-options {
    height: 25px;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    margin-right: 15px;
  }
`;
