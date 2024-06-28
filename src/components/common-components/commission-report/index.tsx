import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
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
import { Col,  Row, Tooltip } from "antd";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import moment from "moment";
import { useStore } from "@stores/root-store";
import { numberWithCommas } from "@utils/common-functions";
import { FilterOutlined } from "@ant-design/icons";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const CommissionReport = observer(() => {
  const {
    user: { loadCommissionReport, getCommissionReportData, loadingCommissionReport, loadSportsWiseReportForCommission, getAllSportsWiseCommissionData, loadingAllSportsWiseCommissionReport, loadMarketWiseCommissionReport, getAllMarketWiseCommissionReportData }
  } = useStore(null);
  const [showSecondTable, setShowSecondTable] = useState(0);
  const [showThirdTable, setShowThirdTable] = useState(0);
  const [commissionReportUserData, setCommissionReportUserData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateFormate = moment(startDate).format('YYYY-MM-DD');
  const endDateFormate = moment(endDate).format('YYYY-MM-DD');
  const [sportsName, setSportsName] = useState(null)
  const sportWiseReportHandler = async(data) => {
    const payload = {startDate : startDateFormate, endDate: endDateFormate, id:data?._id};
    await loadSportsWiseReportForCommission(payload);
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const columns = [
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <Tooltip title={data?.name}>
            <p className={style.userNameHead} onClick={() => {
              setShowSecondTable(1);
              setShowThirdTable(0);
              sportWiseReportHandler(data);
              setCommissionReportUserData(data);
            }}>{data?.name || DOUBLE_DASH}</p>
          </Tooltip>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <div><p className={style.amountHead}>{numberWithCommas(Math.round(data?.amount))}</p></div>,
      },
    ];

    const sportWiseColumns = [
      {
        title: CAP_NAME,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <Tooltip title={data?.userName}>
            <p className={style.userNameHead} onClick={() => {
              setShowThirdTable(1);
              setSportsName(data)
              marketWiseHander(data)
            }}>{data?.name || DOUBLE_DASH}</p>
          </Tooltip>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <div><p className={style.amountHead}>{numberWithCommas(Math.round(data?.amount))}</p></div>,
      },
    ];

    const marketWiseColumns = [
      {
        title: <div style={{textTransform: 'capitalize'}}>{sportsName?.name||''}</div>,
        dataIndex: CAMEL_USER_NAME,
        render: (_, data) => (
          <Tooltip title={data?.userName}>
            <p>{data?.name || DOUBLE_DASH}</p>
          </Tooltip>
        ),
      },
      {
        title: CAP_AMOUNT,
        render: (_, data) => <div><p className={style.amountHead}>{numberWithCommas(Math.round(data?.amount))}</p></div>,
      },
    ];

  const submitHandler = async() => {
    const payload = {startDate: startDateFormate, endDate: endDateFormate}
    await loadCommissionReport(payload)
  }
  const marketWiseHander =async(data)=>{
    const marketPayload = {startDate : startDateFormate, endDate: endDateFormate, id:commissionReportUserData?._id, sportsId:data?._id};
    await loadMarketWiseCommissionReport(marketPayload)

  }
  useEffect(()=>{
    submitHandler()
  }, [])
  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <ReportTypeHeaderBtns />
           <TitleBarUpdated 
              title={'Report Filter'}
              icon={<FilterOutlined /> }
              isIcon={true}
              />
        <div className={style.dateSection}> 
        <div className={style.flexAndGapClass}>
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
          <CustomButton title={CAP_SUBMIT} onClick={() => submitHandler()} customClass={style.btnStyle}/>
      </div> 
        </div>
           <TitleBarUpdated 
              title={'Commission Report'}
              icon={<TfiAlignJustify /> }
              isIcon={true}
              />
        <Row className={style.mainTableDiv}>
          <Col lg={12} md={24} sm={24} className={style.gridOne}  style={{width:'100%'}}>
            <TitleBarUpdated title={`All Commission goes to As per share (Auto Commission)`}/>
            <Table
              className={style.positiveClient}
              columns={columns}
              checkPagination={false}
              loading={loadingCommissionReport}
              dataSource={getCommissionReportData}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{width:'100%'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                    {numberWithCommas(
                        Math.round(getCommissionReportData
                          ?.map((item) => item?.amount)
                          ?.reduce((a, b) => {
                            return a + b;
                          }, 0) || 0)
                      )}
                    </h3>
                  </div>
                );
              }}
            />
          </Col>
       {showSecondTable === 1 ? <Col lg={11} md={24} sm={24} className={style.gridTwo}   style={{width:'100%'}}>
        <TitleBarUpdated icon={<TfiAlignJustify/>} isIcon={true} title={commissionReportUserData?.name || ''}/>
        <Table
              className={style.negativeClient}
              columns={sportWiseColumns}
              checkPagination={false}
              loading={loadingAllSportsWiseCommissionReport}
              dataSource={getAllSportsWiseCommissionData}
              footer={() => {
                return (
                  <div className={style.footerTotal} style={{background:getAllSportsWiseCommissionData?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0)>0 ? "#085845" :'#F86C6B'}}>
                    <h3>{CAP_TOTAL}</h3>
                    <h3>
                    {numberWithCommas(
                      Math.round(getAllSportsWiseCommissionData?.map((item) => item?.amount)?.reduce((a, b) => {return a + b;}, 0) || 0)
                      )}
                    </h3>
                  </div>
                );
              }}
            />
            {/* *************************** */}
            {showThirdTable ?
            <div style={{marginTop: '10px'}}>
             <Table
             className={style.negativeClient}
              columns={marketWiseColumns}
              checkPagination={false}
              loading={loadingAllSportsWiseCommissionReport}
              dataSource={getAllMarketWiseCommissionReportData}
                          /></div> : ''}
          </Col> : ''}
        </Row>
      </div>

    </div>
  );
});

export default memo(CommissionReport);
