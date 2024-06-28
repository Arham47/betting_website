import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Radio, Row, Col, Spin } from "antd";
import CustomButton from "@components/common-components/custom-button";
import style from "./style.module.scss";
import Table from "@components/common-components/table";
import {
  getSingleUrlParam,
  getvalidDateDMY,
  numberWithCommas,
} from "@utils/common-functions";
import { generateExcel } from "@utils/common-functions";
import * as _ from "lodash";
import { useStore } from "@stores/root-store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  fetchUserForDealerWithDepositedCash,
  fetchUserForDealerWithDepositedCredit,
} from "../../../../reduxStore/slices/adminSlice";
// import Tablee from "@components/Table/Tablee";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
import {
  CAP_ACCOUNT_LEDGER,
  CAP_CASH,
  CAP_ENTRIES,
  CAP_SEARCH,
  CAP_SHOW,
  CAP_SUBMIT,
} from "@utils/const";
import { observer } from "mobx-react";
import { useLocation, useParams } from "react-router-dom";
import { notification } from "@utils/notifications";
import { useTheme } from "@utils/hooks/useTheme";
import { AddBetsBtn, ColumnForReport } from "@components/users/json-data";
import {
  AMOUNT,
  BALANCE,
  DATE,
  DESCRIPTION,
  EXCEL,
  PDF,
  PRINT,
  REPORT_FILTER,
} from "@components/users/const";
import { ColTextCheck } from "@components/common-components/export-common-components/table-columns-text-check";
import HeaderButtons from "@components/users/common-components/header-buttons";
import {
  CAMEL_AMOUNT,
  CAMEL_CREATED_AT,
  CAMEL_DESCRIPTION,
} from "@utils/const/TableColumns";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt } from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import useWindowSize from "@utils/hooks/useWindowSize";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { Pagination } from "antd";
import { constRoute } from "@utils/route";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "reduxStore/store";

// import DepositCashTable from "@components/dashboard/deposit-and-cash-table/DepositCashTable";

interface RootState {
  adminSlice: {
    depositedCash: any;
    depositedCredit: any;
  };
}
export const LedgerCredit = observer(() => {
  const [radioValue, setRadioValue] = useState(1);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState("10");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [callApi, setCalledApi] = useState(false);
  const { state } = useLocation();
  const [singleUserId, setSingleUserId] = useState(null);
  const [singleUserData, setSingleUserData] = useState(null);
  const location = useLocation();
  const type = getSingleUrlParam(location, "type");
  //new table data
  const data = useWindowSize().width;
  const [isShowData, setIsShowData] = useState([]);
  const [isSorting, setIsSorting] = useState("ace");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust timeout as needed or replace with real data fetching logic
  }, []);

  const {
    user: {
      loadGetDetailLedgerDetail,
      getAllLedgerListData,
      getLoadingLedgerDetal,
      getSingleUser,
      loadSingleUser,
      getLedgerDetailTotalRecords,
      getUserInfo,
      hanldeSortedData,
    },
  } = useStore(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSearch("");
    setPageNumber(1);
    setEntries("10");
    setCalledApi(false);

    // if (id) loadSingleUserData();
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { depositedCash, depositedCredit } = useSelector(
    (state: RootState) => state.adminSlice
  );

  const loadSingleUserData = async () => {
    const res = await loadSingleUser({ id });
    if (res?.success) {
      setSingleUserId(res?.results?.userId);
      setSingleUserData(res?.results);
    }
  };

  const getCashDepositLedgerData = () => {
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (startDate <= endDate) {
        const payload = {
          startDate: firstDate.toISOString(), // Convert Date to string
          endDate: lastDate.toISOString(), // Convert Date to string
          numRecords: entries, 
          page: pageNumber,
          searchValue: search,
        };
        dispatch(fetchUserForDealerWithDepositedCredit(payload)); // Dispatch the Redux action
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
      }
    } else {
      if (startDate <= endDate || !endDate) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
      }
    }
  };
  useEffect(() => {
    getCashDepositLedgerData();
 }, [JSON.stringify(entries), pageNumber, callApi, search, singleUserId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const columns = [
    {
      title: "#",
      key: "hash",
      render: (text, data, index) => (
        <p>{data?.commissionFrom || data?.userId || "--"}</p>
      ),
    },
    {
      title: DATE,
      dataIndex: CAMEL_CREATED_AT,
      key: "date",
      render: (_, data) => {
        return (
          <p>
            {" "}
            {data?.date
              ? moment(new Date(data?.date)).format("YYYY-MM-DD h:mm:ss a")
              : "--"}
          </p>
        );
      },
    },
    {
      title: "Bet Date",
      dataIndex: "betDate",
      key: "date",
      render: (_, data) => {
        return (
          <p>
            {" "}
            {data?.betTime
              ? moment(new Date(data?.betTime)).format("YYYY-MM-DD h:mm:ss a")
              : "--"}
          </p>
        );
      },
    },
    {
      title: "Betting Id",
      dataIndex: "bettingId",
      key: "bettingId",
      render: (_, data) => {
        return (
          <>
            {/* <p style={{margin: 0}}> {data?.betType ? `Type: ${data?.betType}` : ''}</p> */}
            <p
              style={{
                margin: 0,
                color:
                  data?.betType == 0 ? "rgb(13 136 189)" : "rgb(255 64 71)",
              }}
            >
              {" "}
              {data?.betId || "--"}
            </p>
          </>
        );
      },
    },

    {
      title: DESCRIPTION,
      dataIndex: CAMEL_DESCRIPTION,
      key: "description",
      render: ColTextCheck,
    },
    {
      title: "Date",
      dataIndex: "betDateTime",
      key: "date",
      render: (_, data) => {
        return (
          <p>
            {" "}
            {data?.betDateTime
              ? moment(new Date(data?.betDateTime)).format(
                  "YYYY-MM-DD h:mm:ss a"
                )
              : "--"}
          </p>
        );
      },
    },
    {
      title: "Bet Date",
      dataIndex: "betDate",
      key: "date",
      render: (_, data) => {
        return (
          <p>
            {" "}
            {data?.betTime
              ? moment(new Date(data?.betTime)).format("YYYY-MM-DD h:mm:ss a")
              : "--"}
          </p>
        );
      },
    },
    {
      title: AMOUNT,
      dataIndex: CAMEL_AMOUNT,
      key: "amount",
      render: ColTextCheck,
    },
    {
      title: BALANCE,
      dataIndex: "maxWithdraw",
      key: "maxwithdraw",
      render: ColTextCheck,
    },
  ];
  const headings = [
    ["Company Name:", "1OBET", "Date:", getvalidDateDMY(new Date())],
  ];

  const getSportName = (sportsId) => {
    switch (sportsId) {
      case "1":
        return "Soccer";
      case "2":
        return "Tennis";
      case "4":
        return "Cricket";
      case "6":
        return "Eu casino";
      case "7":
        return "HorseRace";
      case "8":
        return "Asian Casino";
      case "4339":
        return "Grayhound";
      default:
        return "--";
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    // setSearchUser('')
    setPageNumber(page);
    // setIsChangePagination(true);
    // setParams({ ...params, page, numRecords: pageSize });
  };
  const handleExcelFileDownload = () => {
    const data_array = depositedCredit.docs.map((item, index) => ({
      ..._.pick(
        {
          "#": index + 1,
          Description: item?.description,
          Amount: item?.amount,
          Balance: item?.balance,
        },
        ColumnForReport
      ),
    }));
    generateExcel(
      `Ledger Report ${getvalidDateDMY(new Date())}`,
      "Ledger Report",
      "Report",
      "Report",
      "1oBet",
      headings,
      ColumnForReport,
      data_array
    );
  };
  const handleDownloadPdf = () => {
    const data_array = depositedCredit.docs.map((item, index) => ({
      ..._.pick(
        {
          "#": index + 1,
          // Sports: getSportName(item?.sportsId),
          Description: item?.description,
          Amount: item?.amount,
          Balance: item?.balance,
        },
        ColumnForReport
      ),
    }));
    const dataForPdf = [];
    if (data_array?.length) {
      data_array.map((item) => {
        const arr = [];
        const keys = Object.keys(item);
        keys.map((key) => {
          if (item[key]?.toString()) arr.push(item[key]);
          else arr.push(" ");
          return null;
        });
        dataForPdf.push(arr);
        return null;
      });
    }
    const doc = new jsPDF();
    const text = "1OBet";
    const fontSize = 16;
    const textWidth = doc.getTextDimensions(text, { fontSize }).w;
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 10);
    doc.setFontSize(16);
    doc.setFont("bold");
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, {
      head: [ColumnForReport],
      body: dataForPdf,
      showHead: "firstPage",
    });

    doc.save("Ledgers_Report.pdf");
  };
  const handlePrint = () => {
    const table = `<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background-color: #f8f8f8;
    font-weight: bold;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  td {
    padding: 8px;
  }

        </style>
        <table >
          <thead >
            <tr style=" border-radius: 5px;">
              <th style=" width:5%;">#</th>
              <th style="width:25%;">Sports</th>
              <th style="width:45%;">Description</th>
              <th style="width:15%;">Amount</th>
              <th style="width:10%;">Balance<th>
            </tr>
          </thead>
          <tbody>
          ${depositedCredit.docs.map((item, index) => {
              return `<tr key={index}>
            <td style="width:5%; align-item: center">${index + 1}</td>
            <td style="width:45%; align-item: center">${item?.description}</td>
            <td style="width:15%; align-item: center">${item?.amount}</td>
            <td style="width:10%; align-item: center">${item?.balance}</td>
          </tr>`;
            })
            .join("")}  
          </tbody>
        </table>
      `;
    const heading = `<div style="color:blue;font-size:46px; display: flex; justify-content: center; margin-bottom: 20px"> 1OBET </div>`;
    const newWindow = window.open();
    newWindow.document.write(heading);
    newWindow.document.write(table);
    newWindow.print();
  };

  const handleSubmit = () => {
    // Set loading state to true when handleSubmit is called
    setLoading(true);
  
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (firstDate.getTime() <= lastDate.getTime()) {
        console.log(
          "Dispatching action to fetch user with deposited credit..."
        );
        dispatch(
          fetchUserForDealerWithDepositedCredit({
            startDate: firstDate.toISOString(),
            endDate: lastDate.toISOString(),
            numRecords: "10",
            page: 1,
            searchValue: "", // Add an empty string as searchValue
          })
        )
          .then((action) => {
            console.log("Action dispatched:", action);
            // Check action.payload for data
            if (action.payload) {
              console.log("Data fetched successfully:", action.payload);
            } else {
              console.log("No data fetched.");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        setPageNumber(1);
        setCalledApi((callApi) => !callApi);
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        setLoading(false); // Toggle loading state back to false
        return;
      }
    } else {
      if (startDate <= endDate || !endDate) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        setLoading(false); // Toggle loading state back to false
        return;
      }
      setPageNumber(1);
      setCalledApi((callApi) => !callApi);
    }
  
    // Toggle loading state back to false after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setPageNumber(1);
    setSearch(e?.target?.value);
  };

  const openNewWindow = (isAdmin, route) => {
    if (isAdmin) {
      const newWindow = window.open(
        `${window.location.href.replaceAll(`/ledger/${id}`, "/statement")}`,
        "_blank",
        "width=520,height=600,resizable,scrollbars"
      );
      localStorage.setItem("currentLink", route);
      newWindow.focus();
    } else {
      const newWindow = window.open(
        `${window.location.href.replaceAll(
          `/ledger/${id}`,
          "/statement-detail"
        )}`,
        "_blank",
        "width=520,height=600,resizable,scrollbars"
      );
      localStorage.setItem("currentLink", route);
      newWindow.focus();
    }
  };
  const headerButtonUserBets = useMemo(
    () => (
      <div className={style.betsBtnMainContainer}>
        <div className={style.betsBtnMain}>
          <Col xxl={16} xl={16} lg={14} md={12} sm={12} xs={24}>
            <HeaderButtons
              className={style.addBetsizeLoginBtn}
              btnList={AddBetsBtn}
              navigateId={id}
            />
          </Col>
          <Col xxl={8} xl={8} lg={10} md={12} sm={12} xs={24}>
            <h2 className={style.userName}> {getUserInfo?.userName} </h2>
          </Col>
        </div>
      </div>
    ),
    [getUserInfo]
  );
  useEffect(() => {
    const ids = getAllLedgerListData?.map((item) => item?._id);
    setIsShowData(ids);
  }, [getAllLedgerListData, data]);
  const handleSessionOver = (session, matchType) => {
    if (session && matchType) {
      switch (matchType) {
        case "T20":
          return session <= 4
            ? `${session * 5} over`
            : `${(session - 4) * 5} over`;
        case "T10":
          return session <= 2
            ? `${session * 5} over`
            : `${(session - 2) * 5} over`;
        case "TEST":
          return session <= 9
            ? `${session * 10} over`
            : `${(session - 9) * 10} over`;
        case "ODI":
          return session <= 10
            ? `${session * 5} over`
            : `${(session - 10) * 5} over`;
        default:
          return 0;
      }
    } else {
      return "";
    }

    // if(session && session <=10){
    // return `${session*5} over`
    // }else if(session && session >10){
    // return `${(session-10)*5} over`
    // }else{
    //   return ''
    // }
  };

  //--------------table Sorting funcion--------------
  const handleSorting = () => {
    const temp = JSON.parse(JSON.stringify(getAllLedgerListData));
    let sortedData = [];
    if (isSorting == "ace")
      sortedData = temp?.sort((a, b) => a?.date - b?.date);
    else if (isSorting == "dsc")
      sortedData = temp?.sort((a, b) => b?.date - a?.date);
    else sortedData = temp;
    hanldeSortedData(sortedData);
  };

  useEffect(() => {
    handleSorting();
  }, [isSorting]);
  return (
    <Wrapper>
      {/* {state?.showButton && <Row>{headerButtonUserBets}</Row>} */}
      <TitleBarUpdated
        title={REPORT_FILTER}
        isIcon={true}
        icon={<TfiAlignJustify />}
        isRightRibbon={
          <div style={{ fontSize: "12px" }} className={style.ledgerReportData}>
            {singleUserData?.userName || ""}
          </div>
        }
      />

      {/* date section */}
      <FlexWrapper className={style.mainWrapper}>
        <div className={style.flexAndGapClass}>
          <DateTimePicker
            calendarIcon={
              <FaCalendarAlt
                className={style.calenderIcon}
                style={{ fontSize: "20px" }}
              />
            }
            value={startDate}
            format="MM-dd-yyyy h:mm aa"
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
          />
          <DateTimePicker
            calendarIcon={
              <FaCalendarAlt
                className={style.calenderIcon}
                style={{ fontSize: "20px" }}
              />
            }
            value={endDate}
            format="MM-dd-yyyy h:mm aa"
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
          />
          <CustomButton
            disabled={getLoadingLedgerDetal}
            title={CAP_SUBMIT}
            customClass={style.btnStyle}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </FlexWrapper>

      {/* title section */}
      <TitleBarUpdated
        title={
          <span>
            <span>
              <b style={{ color: "#fff" }}>{CAP_CASH} </b>
            </span>{" "}
            <small style={{ color: "#fff" }}> - {CAP_ACCOUNT_LEDGER}</small>{" "}
          </span>
        }
      />

      {/* col and search */}

      <FlexWrapperSpaceBetween>
        <FlexWrapperNoGap>
          {/* here col showmwnt */}

          <FlexWrapper isGap={true}>
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
            <div className={style.FlexClass}>
              <FlexWrapperNoGap className={style.gapClass}>
                <CustomButton
                  customClass={style.btnStyle}
                  title={PRINT}
                  onClick={() => handlePrint()}
                />
                <CustomButton
                  title={EXCEL}
                  customClass={style.btnStyle}
                  onClick={() => handleExcelFileDownload()}
                />
                <CustomButton
                  title={PDF}
                  customClass={style.btnStyle}
                  onClick={() => {
                    handleDownloadPdf();
                  }}
                />
              </FlexWrapperNoGap>
            </div>
          </FlexWrapper>
        </FlexWrapperNoGap>

        {/* here search section */}
        <div className={style.entriesData}>
          <label>{CAP_SEARCH}: </label>
          <input
            value={search}
            className={style.inputHeight}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </FlexWrapperSpaceBetween>
      {/* <div>
        <Table
          className={style.tableStyle}
          responseData={
            getAllLedgerListData?.length ? getAllLedgerListData : []
          }
          loading={getLoadingLedgerDetal}
          columns={getUserInfo?.role=='0' ? columns : columns?.filter((item)=>item?.key!='bettingId')}
          responseCountParam={getLedgerDetailTotalRecords?.toString()}
          setPageNumber={setPageNumber}
          queryParam={{ page: pageNumber, numRecords: entries }}
        /> 
      </div> */}

<div
        className={style.tableContainer}
      >
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Deposit Date</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
      <tr>
      <td colSpan={4} style={{ textAlign: "center" }}>
        <div style={{ marginTop: "20px" }}>
          <Spin tip="Loading..." />
        </div>
      </td>
    </tr>
            ) : depositedCredit.docs && depositedCredit.docs.length > 0 ? (
              depositedCredit.docs.map((item, index) => (
                <tr key={index}>
                  <td>{item?.description}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item?.deposits.toFixed(2)}</td>
                  <td>{item?.balance.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  No record found
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
});
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
const Wrapper = styled.div`
  padding: 10px;
  @media screen and (max-width: 650px) {
    padding: 4px;
  }
`;
const FlexWrapper = styled.div<{ isGap?: boolean }>`
  display: flex;
  gap: ${(p) => (p?.isGap ? "25px" : "20px")};
  align-items: center;
  flex-wrap: wrap;
`;
const FlexWrapperSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 10px 15px;
  margin: 10px;
  gap: 20px;
  flex-wrap: wrap;
`;

const FlexWrapperNoGap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
