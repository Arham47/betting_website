/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import {
  CAMEL_USER_NAME,
  CAP_AMOUNT,
  CAP_EVENT,
  CAP_HIDE_ZERO_AMOUNTS,
  CAP_NAME,
  CAP_SUBMIT,
  CAP_TOTAL,
  DOUBLE_DASH,
  LOWER_EVENT,
} from "@utils/const";
import { Checkbox, Col, Row } from "antd";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
import { useStore } from "@stores/root-store";
import { constImages } from "@utils/images";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import moment from "moment";
import * as _ from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatLargeNumber, numberWithCommas } from "@utils/common-functions";
import { getvalidDateDMY } from "@utils/common-functions";
import { generateExcel } from "@utils/common-functions";
import { CAP_REPORT_TYPE } from "@components/users/const";
import { FilterOutlined } from "@ant-design/icons";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { constRoute } from "@utils/route";
import useWindowSize from "@utils/hooks/useWindowSize";

interface Props {}
const BookDetail2: React.FC<Props> = observer(({ ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateFormate = moment(startDate).format("YYYY-MM-DD");
  const endDateFormate = moment(endDate).format("YYYY-MM-DD");
  const [dailyPLForMinus, setDailyPlForMinus] = useState([])
  const [dailyPlForPositive, setDailyPlForPositive] = useState([])
  const ColumnForReport = ["Name", "Amount"];
  const [showTables , setShowTables] = useState(0);
  const [sportWiseReport , setSportWiseReport] = useState(null);
  const [showReportTables , setShowReportTables] = useState(0);
  const [sportsData, setSportsData] = useState(null)
  const [sportsAndUserWiseData, setSportsWiseAndUserWiseData] = useState([])
  const [lastTableData, setLastTableData] = useState(null)
   const [isChecked, setIsChecked] = useState(false)
   const innerWidth = useWindowSize().width
  const {
    user: {
      loadBookDetail2Data,
      getBookDetailDataList2,
      loadingGetBookDetail2,
      getUserInfo,
      loadBookDatil2ApiDataWithSportId,
      loadingBookDetailSportWiseData,
      loadBookDetailMatchWiseData,
      loadingBookMatchWiseReport
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const columns = [
    {
      title: CAP_EVENT,
      dataIndex: LOWER_EVENT,
      render: (_, data) => (
        <div className={style.clickAble} onClick={()=>{
          setShowTables(1);
          setSportsData(data)
          setLastTableData({title:null, isShow:false})
          handleBookDetailApiData(data?._id)}}> {data?.name || DOUBLE_DASH}</div>
      ),
    },
    {
      title: CAP_AMOUNT,
      render: (_, data) => <p style={{ color: data?.amount > 0 ? "" : "red" }} >{numberWithCommas(Math.round(data?.amount || 0))}</p >,
    },
  ];
  const submitHandler = async () => {
    const data = { startDate: startDateFormate, endDate: endDateFormate };
    await loadBookDetail2Data(data);
  };
  useEffect(()=>{
    submitHandler()
  }, [])
  const handleDownloadPdf = () => {
    const data_array = getBookDetailDataList2?.map((item, index) => ({
      ..._.pick(
        {
          Name: item?.name,
          Amount: numberWithCommas(item?.amount),
        },
        ColumnForReport
      ),
    }));
    const dataForPdf = [];
    if (data_array?.length) {
      data_array?.map((item) => {
        const arr = [];
        const keys = Object.keys(item);
        keys?.map((key) => {
          if (item[key]?.toString()) arr.push(item[key]);
          else arr.push(" ");
          return null;
        });
        dataForPdf.push(arr);
        return null;
      });
    }
    const doc = new jsPDF();
    const text = `1OBet ${getUserInfo?.userName}`;
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

    doc.save("BookDetail2.pdf");
  };
  const handleExcelFileDownload = () => {
    const headings = [[`${getUserInfo?.userName}  Detail`]];
    const data_array = getBookDetailDataList2?.map((item, index) => ({
      ..._.pick(
        {
          Name: item?.name,
          Amount: numberWithCommas(item?.amount),
        },
        ColumnForReport
      ),
    }));
    generateExcel(
      `BookDetail2 Report ${getvalidDateDMY(new Date())}`,
      "Ledger Report",
      "Report",
      "Report",
      "1oBet",
      headings,
      ColumnForReport,
      data_array
    );
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
                  <th style=" width:25%;">#</th>
                  <th style="width:55%;">Name</th>
                  <th style="width:20%;">Amount</th>
                </tr>
              </thead>
              <tbody>
              ${getBookDetailDataList2
                ?.map((item, index) => {
                  return `<tr key={index}>
                <td style="width:5%; align-item: center">${index + 1}</td>
                <td style="width:45%; align-item: center">${item?.name}</td>
                <td style="width:50%; align-item: center">${numberWithCommas(item?.amount)}</td>
              </tr>`;
                })
                .join("")}  
              </tbody>
            </table>
      `;
    const heading = `<div style="color:gray;font-size:30px; display: flex; justify-content: center; margin-bottom: 20px"> ${getUserInfo?.userName} Detatil </div>`;
    const newWindow = window.open();
    newWindow.document.write(heading);
    newWindow.document.write(table);
    newWindow.print();
  };
  const handleBookDetailApiData = async(sportId)=>{
  const data = {startDate : startDateFormate, endDate: endDateFormate, sportId:sportId}
  const res =  await loadBookDatil2ApiDataWithSportId(data)
  const filterArrayOfMinus = res?.results?.filter((item)=> item?.amount<0)
  const filterArrayForPositive =  res?.results?.filter((item)=>item?.amount>=0)
  setDailyPlForMinus(filterArrayOfMinus)
  setDailyPlForPositive(filterArrayForPositive)
  }
  const columnWithUserName =[ 
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, data) => (
        <div>
          <div className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
            setSportWiseReport(data);
            bookdetailMatchWiseReportData(data);
            setShowReportTables(0);
            setLastTableData({title:data?.name, isShow:true})
          }}>{data.name || DOUBLE_DASH}</div>
        </div>
      ),
    },
    {
      title: CAP_AMOUNT,
      render: (_, data) => <div style={{color:data?.amount>=0 ? '#00b181' : 'red'}}>{numberWithCommas(Math.round(data?.amount || 0))}</div>,
    },
  ]
  const marketReportColumn =[ 
    {
      title: 'Date',
      dataIndex: 'date',
      render: (_, data) => (<p>
          {moment(data?.date).format('YYYY-MM-DD h:mm A') || DOUBLE_DASH}
          </p>
      ),
    },
    {
      title: 'Event',
      dataIndex: 'event',
      render: (_, data) => (<div onClick={()=>{
        const newData = {
          Data: data,
          sportsData: sportsData,
          userName: sportWiseReport?.name,
          description:data?.name
        };
         localStorage.setItem('marketShareData', JSON.stringify(newData))
            openNewWindow(`${constRoute?.reportMarketShare}`)
      }} className={style.clickAble}>
          {data?.name || DOUBLE_DASH}
          </div>
      ),
    },
    {
      title: CAP_AMOUNT,
      render: (_, data) => <p style={{color: data?.amount> 0 ? '':'red' }}>{numberWithCommas(Math.round(data?.amount || 0))}</p>,
    },
  ]
  const openNewWindow = (route) => {
    const newWindow =  window.open(`${window.location.href.replaceAll("/book-detail2",'/Reports/MarketShares')}`,"_blank", 'width=520,height=600,resizable,scrollbars');
    // const newWindow = window.open(window.location.href.replaceAll('/daily-report', '/Reports/MarketShares'), '_blank');
    localStorage.setItem('currentLink', route)
    newWindow.focus();
  };

  const bookdetailMatchWiseReportData = async(data)=>{
    const payload = {startDate : startDateFormate, endDate: endDateFormate, id: data?._id, sportId: sportsData?._id};
   const res =  await loadBookDetailMatchWiseData(payload);
   if(res?.success){
    setSportsWiseAndUserWiseData(res?.results)
   }
  }
  const handleCheckboxChange = (e) => {
    setIsChecked(e?.target?.checked)
    // if (e.target.checked === true) {
    //   const filterData = getFinalSheetReport?.positiveClients?.filter(
    //     (i) => i?.clientPL !== 0 
    //   );
    //   setPositiveValueData(filterData);
    // } else {
    //   setPositiveValueData(getFinalSheetReport?.positiveClients);
    // }
  }
  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <ReportTypeHeaderBtns />
           <TitleBarUpdated 
              title={CAP_REPORT_TYPE}
              icon={<FilterOutlined /> }
              isIcon={true}
              />
        <div className={style.dateSection}>
          <div className={style.flexAndGapClass}>
            <div className={style.mainContaierofInput}>
              <DateTimePicker
                calendarIcon={
                  <FaCalendarAlt className={style.calenderIcon} style={{fontSize: '20px'}}/>
                // <img src={constImages?.calanderBlackIcon} />
              }
                value={startDate}
                format="MM-dd-yyyy HH:mm aa"
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
              <DateTimePicker
                calendarIcon={
                  <FaCalendarAlt className={style.calenderIcon} style={{fontSize: '20px'}}/>
                // <img src={constImages?.calanderBlackIcon} />
              }
                value={endDate}
                format="MM-dd-yyyy HH:mm aa"
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
              />
              <CustomButton
            title={CAP_SUBMIT}
            customClass={style.btnStyle}
            onClick={() => submitHandler()}
          />
            </div>
          </div>
          
        </div>
            <TitleBarUpdated 
              title={getUserInfo?.userName}
              icon={<TfiAlignJustify /> }
              isIcon={true}
              />
        <Row>
        <div className={style.btnDiv}>
              <CustomButton
                title="Print "
                customClass={style.btnStyle}
                onClick={() => handlePrint()}
              />
              <CustomButton
                title="Excel "
                customClass={style.btnStyle}
                onClick={() => handleExcelFileDownload()}
              />
              <CustomButton
                title="PDF "
                customClass={style.btnStyle}
                onClick={() => handleDownloadPdf()}
              />
            </div>
        </Row>
        <Row gutter={[10, 10]} className={style.mainTableDiv}>
          <Col lg={8} md={10} sm={24} xs={24} className={style.gridOne}>
            <TitleBarUpdated  isIcon={true} icon={<TfiAlignJustify />} title={getUserInfo?.userName}/>
            <Table
              className={style.totalTable}
              columns={columns}
              checkPagination={false}
              loading={loadingGetBookDetail2}
              dataSource={getBookDetailDataList2}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:getBookDetailDataList2?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0)>=0 ? '#085845' : '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      {numberWithCommas(
                       Math.round(getBookDetailDataList2?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0) || 0)
                      )}
                    </h3>
                  </div>
                );
              }}
            />
          </Col>
          {(showTables == 1) ? <Col md={24} lg={16} sm={24} xs={24}>
            <TitleBarUpdated title={sportsData?.name}
              isIcon={true} icon={<TfiAlignJustify />}
              isRightRibbon={ <div className={style.finalSheetCheckBoxDiv}>
              <Checkbox onChange={handleCheckboxChange} />
              <label style={{width:innerWidth>380 ? 136 : 80, fontSize: '12px'}} className={style.finalSheetCheckBoxLable}>
                {CAP_HIDE_ZERO_AMOUNTS}
              </label>
        </div>}
          />
          <Row gutter={[10, 10]}>
          <Col lg={12} md={12}  sm={24} xs={24} className={style.gridOne} style={{width:'100%'}}>
            <Table
              className={style.positiveClient}
              columns={columnWithUserName}
              loading={loadingBookDetailSportWiseData}
              dataSource={isChecked ? dailyPlForPositive?.filter((item)=>item?.amount!=0): dailyPlForPositive}
              checkPagination={false}
              footer={() => {
                return (
                <div className={style.footerTotal} style={{background:dailyPlForPositive?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)>=0 ?'#085845' : '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      { numberWithCommas(Math.round(dailyPlForPositive?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}
                    </h3>
                </div>
                );
              }}
            />
          </Col>
          <Col lg={12} md={12}  sm={24} xs={24} className={style.gridTwo} style={{width:'100%'}}>
            <Table
              className={style.negativeClient}
              columns={columnWithUserName}
              loading={loadingBookDetailSportWiseData}
              dataSource={isChecked ? dailyPLForMinus?.filter((item)=>item?.amount!=0):dailyPLForMinus}
              checkPagination={false}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:dailyPLForMinus?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)>=0 ?'#085845' : '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                    { numberWithCommas(Math.round(dailyPLForMinus?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))} </h3>
                  </div>
                );
              }}
            />
          </Col>
          </Row>
          </Col> : ''}
        </Row>
        {lastTableData?.isShow ? <Row style={{justifyContent:'flex-end', marginTop:10}}>
        <Col lg={8} md={24} xs={24} sm={24}>
            <TitleBarUpdated  isIcon={true} icon={<TfiAlignJustify />} title={`${lastTableData?.title} / ${sportsData?.name}`}/>
            <Table
              className={style.totalTable}
              columns={marketReportColumn}
              checkPagination={false}
              loading={loadingBookMatchWiseReport}
              dataSource={sportsAndUserWiseData}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:getBookDetailDataList2?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0)>=0 ? '#085845' : '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      {numberWithCommas(
                       Math.round(sportsAndUserWiseData?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0) || 0)
                      )}
                    </h3>
                  </div>
                );
              }}
            />
          </Col>
          </Row> : ''}
      </div>
    </div>
  );
});

export default memo(BookDetail2);
