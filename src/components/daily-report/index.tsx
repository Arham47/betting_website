import { observer } from "mobx-react";
import { memo,  useEffect,  useState } from "react";
import style from "./style.module.scss";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import {
  CAMEL_USER_NAME,
  CAP_AMOUNT,
  CAP_NAME,
  CAP_SUBMIT,
  CAP_TOTAL,
  DOUBLE_DASH,
} from "@utils/const";
import { Col, Row } from "antd";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
import { useStore } from "@stores/root-store";
import { constImages } from "@utils/images";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import moment from "moment";
import { numberWithCommas } from "@utils/common-functions";
import { constRoute } from "@utils/route";
import { FilterOutlined } from "@ant-design/icons";
import { CAP_REPORT_TYPE } from "@components/users/const";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const DailyReport = observer(() => {
  const {
    user: { loadDailyReport, loadingGetDailyReport, allSportsWiseDailyReportData, loadingGetSportsWiseDailyReport, getUserInfo,
      loadDailyReportSportsWiseReport,loadMarketDailyReport, loadingReportMarketReport, getAllMarketDailyReportData
}, 

  } = useStore(null);
  console.log('getUserInfo', getUserInfo)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateFormate = moment(startDate).format('YYYY-MM-DD');
  const endDateFormate = moment(endDate).format('YYYY-MM-DD');
  const [dailyPLForMinus, setDailyPlForMinus] = useState([])
  const [dailyPlForPositive, setDailyPlForPositive] = useState([])
  const [showTables , setShowTables] = useState(0);
  const [showReportTables , setShowReportTables] = useState(0);
  const [sportWiseReport , setSportWiseReport] = useState(null);
  const [eventName, setEventName] = useState('')
  const [sportsId, setSportsId] = useState('')
  const sportWiseReportHandler = async(data) => {
    const payload = {startDate : startDateFormate, endDate: endDateFormate, id:data?._id};
    await loadDailyReportSportsWiseReport(payload);
  }
  const marketReportHandler = async(data) => { 
    setSportsId(data?._id)
    const payload = {startDate : startDateFormate, endDate: endDateFormate, id:data?.userId, sportsId:data?._id};
    await loadMarketDailyReport(payload);
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const columns =[ 
    {
      title: CAP_NAME,
      dataIndex: CAMEL_USER_NAME,
      render: (_, data) => (
        <div>
          <div className={getUserInfo?.createdBy==data?._id ? '' : style.clickAble} style={{cursor:'pointer'}} onClick={() => {
            if(getUserInfo?.createdBy==data?._id) return;
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
  const openNewWindow = (route) => {
    const newWindow =  window.open(`${window.location.href.replaceAll("/daily-report",'/Reports/MarketShares')}`,"_blank", 'width=520,height=600,resizable,scrollbars');
    // const newWindow = window.open(window.location.href.replaceAll('/daily-report', '/Reports/MarketShares'), '_blank');
    localStorage.setItem('currentLink', route)
    newWindow.focus();
  };

  const columnsNegative =[ 
    {
      title: CAP_NAME,
      dataIndex: CAMEL_USER_NAME,
      render: (_, data) => (
        <div>
          <div className={getUserInfo?.createdBy==data?._id ? '' : style.clickAble} style={{cursor:'pointer'}} onClick={() => {
          if(getUserInfo?.createdBy==data?._id) return;
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
      render: (_, data) => <p style={{color: data?.amount> 0 ? '':'red' }}>{numberWithCommas(Math.round(data?.amount))}</p>,
    },
  ]
  const submitHandler = async() => {
    const data = {startDate : startDateFormate, endDate: endDateFormate}
 const res =  await loadDailyReport(data)
 if(res?.success){
  const filterArrayOfMinus = res?.results?.filter((item)=> item?.amount<0)
  const filterArrayForPositive =  res?.results?.filter((item)=>item?.amount>=0)
  setDailyPlForMinus(filterArrayOfMinus)
  setDailyPlForPositive(filterArrayForPositive)
 }
  }
  useEffect(()=>{
    submitHandler()
  }, [])
  console.warn('getAllMarketDailyReportData', getAllMarketDailyReportData)
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
              loading={loadingGetDailyReport}
              dataSource={dailyPlForPositive}
              checkPagination={false}
              footer={() => {
                return (
                <div className={style.footerTotal}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                      { numberWithCommas(Math.round(dailyPlForPositive?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}
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
              loading={loadingGetDailyReport}
              dataSource={dailyPLForMinus}
              checkPagination={false}
              footer={() => {
                return (
                  <div className={style.footerTotal}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                    { numberWithCommas(Math.round(dailyPLForMinus?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}                    </h3>
                  </div>
                );
              }}
            />
          </Col>
         {showTables === 1 && <Col lg={9} md={24} sm={24} style={{width:'100%'}} className={allSportsWiseDailyReportData?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)<0 ?  style.gridThree : style.gridThreePositive}>
          <TitleBarUpdated 
              title={`${sportWiseReport?.name} - Sportwise Report` || ''}
              icon={<TfiAlignJustify /> }
              isIcon={true}
              />
        <Table
              className={style.negativeClient}
              columns={sportColumns}
              loading={loadingGetSportsWiseDailyReport}
              dataSource={allSportsWiseDailyReportData}
              checkPagination={false}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:allSportsWiseDailyReportData?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0)>0 ? '#085845' : '#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                    { numberWithCommas(Math.round(allSportsWiseDailyReportData?.map((item) => item?.amount)?.reduce((a, b) => { return a + b}, 0) || 0))}                    </h3>
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
              loading={loadingReportMarketReport}
              dataSource={getAllMarketDailyReportData}
              checkPagination={false}
            />
          </Col>}
        </Row>
      </div>
    </div>
  );
});

export default memo(DailyReport);
