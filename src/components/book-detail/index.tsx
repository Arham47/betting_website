import { observer } from "mobx-react";
import { memo, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import JustifyDark from "@assets/icons/justify-icon-dark.png";
import JustifyWhite from "@assets/icons/justify-icon.png";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import Checkbox from "antd/lib/checkbox";
import {
  CAMEL_USER_NAME,
  CAP_AMOUNT,
  CAP_HIDE_ZERO_AMOUNTS,
  CAP_NAME, 
  CAP_SUBMIT, 
  CAP_TOTAL,
  DASH,
  DOUBLE_DASH,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
} from "@utils/const";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTheme } from "@utils/hooks/useTheme";
import Table from "@components/common-components/table"; 
import { useStore } from "@stores/root-store";
import { Col, Row, Tooltip } from "antd";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import CustomButton from "@components/common-components/custom-button";
import { constImages } from "@utils/images";
import { FilterOutlined } from "@ant-design/icons";
import { FaCalendarAlt }  from "react-icons/fa";
import { BsFillCalendarFill } from "react-icons/bs";
import { formatLargeNumber, numberWithCommas } from "@utils/common-functions";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { TfiAlignJustify } from "react-icons/tfi";
import { CAP_REPORT_TYPE } from "@components/users/const";
import moment from "moment";
import { constRoute } from "@utils/route";
import useWindowSize from "@utils/hooks/useWindowSize";
const BookDetail = observer(() => {
  const {
    user: {loadingReportMarketWiseReportData, getBookDetail1MarketWiseReportData, loadMarketWiseReportDataOfBookDetail, loadingSportsWiseBookDetailReport, loadBookDetailReport1, getAllSportsWiseBookDetail1Data, laodBookDetailSportsWiseReport, getFinalSheetReport, getUserInfo },
  } = useStore(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isShowTableData, setIsShowTableData] = useState(false)
  const [positiveValueData, setPositiveValueData] = useState([]);
  const [bookDatailMinusValue, setBookDetailMinusValue] = useState([])
  const [bookDetailPositiveValue, setBookDetailPositiveValue] = useState([])
  const [showTables , setShowTables] = useState(0);
  const [sportWiseReport , setSportWiseReport] = useState(null);
  const [eventName, setEventName] = useState('')
  const [showReportTables , setShowReportTables] = useState(0);
  const startDateFormate = moment(startDate).format('YYYY-MM-DD');
  const endDateFormate = moment(endDate).format('YYYY-MM-DD');
  const [sportsId, setSportsId] = useState('')
  const [marketWiseReportData, setMarketWiseReportData] =useState([])
  useEffect(() => {
    setPositiveValueData(getFinalSheetReport?.positiveClients);
  }, [JSON.stringify(getFinalSheetReport?.positiveClients)]);
  const innerWidth = useWindowSize().width;
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  // const columns = useMemo(
  //   () => [
  //     {
  //       title: CAP_NAME,
  //       dataIndex: CAMEL_USER_NAME,
  //       render: (_, data) => (
  //         <Tooltip title={data.userName}>
  //           <p>{data.userName || DOUBLE_DASH}</p>
  //         </Tooltip>
  //       ),
  //     },
  //     {
  //       title: CAP_AMOUNT,
  //       render: (_, data) => <div><p>{formatLargeNumber(data?.clientPL) || 0}</p></div>,
  //     },
  //   ],
  //   [getFinalSheetReport]
  // );
  const theme = useTheme();
  const [justifyIcon, setJustifyIcon] = useState(null);
  useEffect(() => {
    if (localStorage.getItem(LOWER_THEME) === LOWER_LIGHT_HYPEN_THEME) {
      setJustifyIcon(JustifyDark);
    } else {
      setJustifyIcon(JustifyWhite);
    }
  }, [localStorage.getItem(LOWER_THEME), theme]);
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      const filterData = getFinalSheetReport?.positiveClients?.filter(
        (i) => i?.clientPL !== 0 
      );
      setPositiveValueData(filterData);
    } else {
      setPositiveValueData(getFinalSheetReport?.positiveClients);
    }
  };

  const BookDetailDiv = useMemo(
    () => (
          <TitleBarUpdated title={`${getUserInfo?.userName || ''} Book Detail`}
          isIcon={true} icon={<TfiAlignJustify />}
          isRightRibbon={ <div className={style.finalSheetCheckBoxDiv}>
          <Checkbox onChange={handleCheckboxChange} />
          <label style={{width:innerWidth>380 ? 136 : 80}}  className={style.finalSheetCheckBoxLable}>
            {CAP_HIDE_ZERO_AMOUNTS}
          </label>
        </div>}
          />
    ),
    [
      localStorage.getItem(LOWER_THEME),
      theme,
      JSON.stringify(getFinalSheetReport?.positiveClients),
      innerWidth
    ]
  );
const handleSubmit = async()=>{
  setIsShowTableData(true)
}



//under
const columns =[ 
  {
    title: CAP_NAME,
    dataIndex: CAMEL_USER_NAME,
    render: (_, data) => (
      <div>
        <div className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
          setShowTables(1);
          setSportWiseReport(data);
          sportWiseReportHandler(data);
          setShowReportTables(0);
        }}>{data.name || DOUBLE_DASH}</div>
      </div>
    ),
  },
  {
    title: CAP_AMOUNT,
    render: (_, data) => <p >{numberWithCommas(Math.round(data?.amount))}</p>,
  },
]
const columnsNegative =[ 
  {
    title: CAP_NAME,
    dataIndex: CAMEL_USER_NAME,
    render: (_, data) => (
      <div>
        <div className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
          setShowTables(1);
          setSportWiseReport(data);
          sportWiseReportHandler(data);
          setShowReportTables(0);
        }}>{data.name || DOUBLE_DASH}</div>
      </div>
    ),
  },
  {
    title: CAP_AMOUNT,
    render: (_, data) => <div style={{color: 'red'}}>{numberWithCommas(Math.round(data?.amount))}</div>,
  },
]
const sportColumns =[ 
  {
    title: 'Event',
    dataIndex: 'event',
    render: (_, data) => (<div>
        <div className={style.clickAble} style={{cursor:'pointer'}} onClick={() => {
           setShowReportTables(1);
           marketReportHandler(data)
           setEventName(data?.name)
        }}>{data?.name || DOUBLE_DASH}</div>
        </div>
    ),
  },
  {
    title: CAP_AMOUNT,
    render: (_, data) => <div style={{color: data?.amount> 0 ? '':'red' }}>{numberWithCommas(Math.round(data?.amount))}</div>,
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
        sportsId: sportsId,
        userName: sportWiseReport?.name,
      };
       localStorage.setItem('bookDetailMarketShare', JSON.stringify(newData))
          openNewWindow(`${constRoute.bookDetailedport}`)
    }} className={style.clickAble}>
        {data?.name || DOUBLE_DASH}
        </div>
    ),
  },
  {
    title: CAP_AMOUNT,
    render: (_, data) => <p style={{color: data?.amount> 0 ? '':'red' }}>{numberWithCommas(Math.round(data?.amount))}</p>,
  },
]
const openNewWindow = (route) => {
  const newWindow =  window.open(`${window.location.href.replaceAll("/book-detail",`${constRoute.bookDetailedport}`)}`,"_blank", 'width=520,height=600,resizable,scrollbars');
  // const newWindow = window.open(window.location.href.replaceAll('/daily-report', '/Reports/MarketShares'), '_blank');
  localStorage.setItem('currentLink', route)
  newWindow.focus();
};
const marketReportHandler = async(data) => { 
  setSportsId(data?._id)
  const payload = {startDate : startDateFormate, endDate: endDateFormate, id:data?.userId, sportsId:data?._id};
 const res =  await loadMarketWiseReportDataOfBookDetail(payload);
 if(res?.success){
  setMarketWiseReportData(res?.results)
 }
}
const sportWiseReportHandler = async(data) => {
  const payload = {startDate : startDateFormate, endDate: endDateFormate, id:data?._id};
  await laodBookDetailSportsWiseReport(payload);
}
const submitHandler = async() => {
  const data = {startDate : startDateFormate, endDate: endDateFormate}
const res =await loadBookDetailReport1(data)
if(res?.success){
const filterArrayOfMinus = res?.results?.filter((item)=> item?.amount<0)
const filterArrayForPositive =  res?.results?.filter((item)=>item?.amount>=0)
setBookDetailMinusValue(filterArrayOfMinus)
setBookDetailPositiveValue(filterArrayForPositive)
}
}
useEffect(()=>{
  submitHandler()
}, [])
console.log('loadingSportsWiseBookDetailReport', loadingSportsWiseBookDetailReport)
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
        <div className={style.mainContaierofInput} >
        <DateTimePicker
        calendarIcon={
          <FaCalendarAlt className={style.calenderIcon} style={{fontSize: '20px'}}/>
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
      }
          value={endDate}
          format="MM-dd-yyyy HH:mm aa"
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
        />
        <CustomButton title={CAP_SUBMIT} customClass={style.btnStyle} onClick={() => submitHandler()}/>
    </div>
    </div>
      </div>
         <TitleBarUpdated 
            title={CAP_REPORT_TYPE}
            icon={<TfiAlignJustify /> }
            isIcon={true}
            />
      <Row className={style.mainTableDiv}>
        <Col lg={7} md={10} sm={24} className={style.gridOne} style={{width:'100%'}}>
          <Table
            className={style.positiveClient}
            columns={columns}
            loading={false}
            dataSource={bookDetailPositiveValue}
            checkPagination={false}
            footer={() => {
              return (
              <div className={style.footerTotal}>
                  <h3>{CAP_TOTAL}</h3>
                  <h3>
                    { numberWithCommas(Math.round(bookDetailPositiveValue?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}
                  </h3>
              </div>
              );
            }}
          />
        </Col>
        <Col lg={7} md={10} sm={24} className={style.gridTwo} style={{width:'100%'}}>
          <Table
            className={style.negativeClient}
            columns={columnsNegative}
            loading={false}
            dataSource={bookDatailMinusValue}
            checkPagination={false}
            footer={() => {
              return (
                <div className={style.footerTotal}>
                  <h3>{CAP_TOTAL}</h3>
                  <h3>
                  { numberWithCommas(Math.round(bookDatailMinusValue?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}                    </h3>
                </div>
              );
            }}
          />
        </Col>
       {showTables === 1 && <Col lg={9} md={24} sm={24} style={{width:'100%'}} className={getAllSportsWiseBookDetail1Data?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)<0 ?  style.gridThree : style.gridThreePositive}>
        <TitleBarUpdated 
            title={`${sportWiseReport?.name} - Sportwise Report` || ''}
            icon={<TfiAlignJustify /> }
            isIcon={true}
            />
      <Table
            className={style.negativeClient}
            columns={sportColumns}
            loading={false}
            dataSource={getAllSportsWiseBookDetail1Data}
            checkPagination={false}
            footer={() => {
              return (
                <div className={style.footerTotal} style={{background:getAllSportsWiseBookDetail1Data?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)>0 ? '#085845' : '#F86C6B'}}>
                  <h3>{CAP_TOTAL}</h3>
                  <h3>
                  { numberWithCommas(Math.round(getAllSportsWiseBookDetail1Data?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}                    </h3>
              </div>
              );
            }}
          />
        </Col>}
      </Row>
      <Row className={style.mainTableDiv}>
        <Col span={7}></Col>
        <Col span={7}></Col>
       {showReportTables === 1 && <Col sm={24} md={24} lg={9} style={{width:'100%'}}>
        <TitleBarUpdated 
            title={eventName || ''}
            icon={<TfiAlignJustify /> }
            isIcon={true}
            />
      <Table
            className={style.negativeClient}
            columns={marketReportColumn}
            loading={false}
            dataSource={marketWiseReportData}
            checkPagination={false}
          />
        </Col>}
      </Row>
    </div>
  </div>
    
  );
}); 

export default memo(BookDetail);
