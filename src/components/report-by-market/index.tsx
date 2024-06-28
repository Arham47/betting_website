import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import ReportTypeHeaderBtns from "@components/common-components/report-type-header-btns";
import {
  CAP_SUBMIT,
} from "@utils/const";
import Table from "@components/common-components/table";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import CustomButton from "@components/common-components/custom-button";
import moment from "moment";
import { FilterOutlined } from "@ant-design/icons";
import { TfiAlignJustify } from "react-icons/tfi";
import styled from "styled-components";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const ReportByMarket = observer(() => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const newColumns = [
    {
      title: "",
      children: [
        {
          title: "",
          render: (_, data) => <div style={{display:'flex', justifyContent:'flex-start', fontSize:'bold'}}><p style={{fontWeight:'bold'}}>Grand total</p></div>,
        },
      ],
    },
    {
      title: <p>Clients</p>,
      children: [
        {
          title: "",
        },
        {
          title: <p style={{textAlign:'center'}}>Win</p>,
          dataIndex: "win",
          key: "win",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>Comm</p>,
          dataIndex: "comm",
          key: "comm",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>P&L</p>,
          dataIndex: "pl",
          key: "pl",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: "",
        },
      ],
    },
    {
      title: "Master",
      children: [
        {
          title: "",
        },
        {
          title: <p style={{textAlign:'center'}}>Win</p>,
          dataIndex: "win",
          key: "win",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>Comm</p>,
          dataIndex: "comm",
          key: "comm",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>P&L</p>,
          dataIndex: "pl",
          key: "pl",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: "",
        },
      ],
    },
    {
      title: "Upline",
      children: [
        {
          title: "",
        },
        {
          title: <p style={{textAlign:'center'}}>Win</p>,
          dataIndex: "win",
          key: "win",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>Comm</p>,
          dataIndex: "comm",
          key: "comm",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: <p style={{textAlign:'center'}}>P&L</p>,
          dataIndex: "pl",
          key: "pl",
          render: (_, data) => <div><p>0</p></div>,
        },
        {
          title: "",
        },
      ],
    },
  ];

  const submitHandler = async() => {
    if(startDate <= endDate){
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const timeDiff = date2.getTime() - date1.getTime();
      setTotalDays(Math.floor(timeDiff / (1000 * 3600 * 24)));
    }else{
      setTotalDays(1)
    }
  }

  const allHandler = () => {
    if (startDate <= endDate) {
      const today = new Date();
      const twoYearsBeforeToday = new Date(today);
      twoYearsBeforeToday.setFullYear(today.getFullYear() - 2);
      const timeDiff = today.getTime() - twoYearsBeforeToday.getTime();
      const totalDaysFromTwoYearsBefore = Math.floor(timeDiff / (1000 * 3600 * 24));
      setStartDate(twoYearsBeforeToday);
      setEndDate(today)
      setTotalDays(totalDaysFromTwoYearsBefore)
    }
  }

  return (
    <div>
      <div className={style.mainContainer}>
        <ReportTypeHeaderBtns />
           <TitleBarUpdated 
              title={'Report Filter'}
              icon={<FilterOutlined /> }
              isIcon={true}
              />
        <div className={style.dateSection}>
          <div className={style.flexAndGapClass}>
            <div className={style.mainContaierofInput}>
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
              <CustomButton customClass={style.btnStyle} onClick={() => submitHandler()} title={CAP_SUBMIT} />
              <CustomButton customClass={style.btnStyle} onClick={() => allHandler()} title={"All"} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
           <TitleBarUpdated 
              title={moment(endDate).format("MM-DD-YYYY")}
              icon={<TfiAlignJustify /> }
              isIcon={true}
              />
        </div>
        <div  className={style.newTableWrapper}>
          <AntTableWrapper dataSource={[{}]} columns={newColumns} />
          <div className={style.valuesWrapper}>
          {(totalDays > 0) && Array(totalDays).fill(totalDays)?.map((item, index) => {
            return <span key={index}>
              {index+1}
            </span>
          })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(ReportByMarket);
const AntTableWrapper = styled(Table)`
.ant-table-container table>thead>tr:first-child >*:first-child {
  border-start-start-radius: 0px !important;
}
.ant-table-container table>thead>tr:first-child >*:last-child {
  border-start-end-radius: 0px !important;
}
`;