/* eslint-disable eqeqeq */
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import CustomButton from "@components/common-components/custom-button";
import style from "./style.module.scss";
import Table from "@components/common-components/table";
import { numberWithCommas, sortCol, unixTimestamp } from "@utils/common-functions";
import * as _ from "lodash";
import { useStore } from "@stores/root-store";
import moment from "moment";
import {
  CAP_AMOUNT,
  CAP_BET_HISTORY,
  CAP_ENTRIES,
  CAP_SEARCH,
  CAP_SHOW,
  CAP_SUBMIT,
  DOUBLE_DASH,
  HASH_LINK,
  LOWER_ACTIVE,
  LOWER_ALL,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
} from "@utils/const";
import { observer } from "mobx-react";
import {useParams } from "react-router-dom";
import { notification } from "@utils/notifications";
import { useTheme } from "@utils/hooks/useTheme";
import { AddBetsBtn, filterUserBetsOptions, optionMarketTypes } from "@components/users/json-data";
import { ColTextCheck } from "@components/common-components/export-common-components/table-columns-text-check";
import { constImages } from "@utils/images";
import HeaderButtons from "@components/users/common-components/header-buttons";
import {
  CAMEL_BET_AMOUNT,
  CAMEL_BET_RATE,
  CAMEL_CREATED_AT,
  CAP_EVENT,
  CAP_PLACED,
  CAP_POSITIONS,
  CAP_PRICE,
  CAP_RUNNER,
  LOWER_EVENT,
  LOWER_POSITION,
  LOWER_RUNNER,
} from "@utils/const/TableColumns";
import { CommonSelect } from "@components/common-components/select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { FilterOutlined } from "@ant-design/icons";
import "react-clock/dist/Clock.css";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaCalendarAlt }  from "react-icons/fa";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { colorList } from "@utils/json-data";

export const BetsList = observer(() => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState("10");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [callApi, setCalledApi] = useState(false);
  const [singleUserId, setSingleUserId] = useState(null)
  const [marketId, setMarketId] = useState('')
  const [status, setStatus]= useState('1')
  const [isfirstLoading, setIsFirstLoading] = useState(true)

  const {
    user: { getUserInfo, loadSingleUser },
    bet: { postUserBetsList, getUserBets, getUserBetsTotal, isLoadingUserBetsList },
  } = useStore(null);
  useEffect(() => {
 if(singleUserId)   getUserBetsList();
 const intervalId = setInterval(()=>{
  if(singleUserId)   getUserBetsList();
 }, 2000);
 return () => {
   clearInterval(intervalId);
 };
  }, [JSON.stringify(entries), pageNumber, callApi, search, singleUserId]);
  useEffect(() => {
    loadSingleUserData()
  },[])
  const loadSingleUserData = async() => {
    const res = await loadSingleUser({id});
    if(res?.success){
      setSingleUserId(res?.results?.userId)
    }
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const getUserBetsList = async () => {
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (startDate <= endDate) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    } else {
      if (startDate <= endDate || !endDate) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    }
    const payload = {
      userId: singleUserId,
      startDate: moment(startDate).format("YYYY-MM-DD")+ ' 00:00:00 AM' || "",
      endDate: moment(endDate).format("YYYY-MM-DD")+ ' 11:59:59 PM' || "",
      numRecords: Number(entries),
      page: pageNumber,
      searchValue: search,
      status: Number(status),
      sportsId: marketId,
    };
    await postUserBetsList(payload);
    setIsFirstLoading(false)
  };
  const handleSportName = (data) => {
      if(data?.sportsId == 1){
        return "Soccer"
      }else if(data?.sportsId == 2){
        return "Tennis"
      }else if(data?.sportsId == 4){
        return "Cricket"
      }else if(data?.sportsId == 7){
        return "Horse"
      }else if(data?.sportsId == 4339){
        return "Greyhound"
      }
    
  }


  const columns = [
    {
      title: HASH_LINK,
      key: 'hashLink',
      render: (text, data, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Sports Name',
      key: 'sportsname',
      render: (text, data, index) => <SportsWrapper colordyn= {colorList[index]}>{handleSportName(data) || '--'}</SportsWrapper>,
    },
    {
      title: CAP_EVENT,
      dataIndex: LOWER_EVENT,
      key: 'event',
      sorter: (a, b) => sortCol(a, b, LOWER_EVENT),
      render: ColTextCheck,
    },
    {
      title: 'Runner Name',
      dataIndex: 'runnerName',
      key: 'runnerName',
      sorter: (a, b) => sortCol(a, b, 'runnerName'),
      render: ColTextCheck,
    },
    // {
    //   title: 'Time',
    //   dataIndex: 'time',
    //   sorter: (a, b) => sortCol(a, b, 'runnerName'),
    //   render: (text, data) => <p>{data?.betTime ? moment(data?.betTime).format('hh:mm A') : "--"}</p>,
    // },
    {
      title: CAP_PRICE,
      dataIndex: CAMEL_BET_RATE,
      key: 'price',
      sorter: (a, b) => a?.betRate - b?.betRate,
      render: (_, data)=>{
        return <p>{data?.betRate|| ''}</p>
      },
    },
    {
      title: CAP_POSITIONS,
      dataIndex: LOWER_POSITION,
      key: 'position',
      sorter: (a, b) => a?.position - b?.position,
      render: (_, data)=>{
        return <p className={data?.position< 0 ? style.redColorPosition : ''}>{numberWithCommas(Math.round(data?.position||0))}</p>
      },
    },
    {
      title: CAP_AMOUNT,
      dataIndex: CAMEL_BET_AMOUNT,
      key: 'amount',
      sorter:  (a, b) => a?.betAmount - b?.betAmount,
      render: ColTextCheck,
    },
    {
      title: CAP_PLACED,
      dataIndex: CAMEL_CREATED_AT,
      key: 'createdAt',
      sorter: (a, b) => a?.betTime - b?.betTime,
      render: (text, data) => <p> {data?.betTime ? moment(new Date(data?.betTime)).format('YYYY-MM-DD hh:mm:ss a') :'--'}</p>,
    },
    {
      title: 'Rates Record',
      dataIndex: 'ratesRecord',
      key: 'ratesRecord',
      render: (text, data)=>{
        return <p style={{margin: 0, padding: 0, display: 'flex', gap: '8px'}}>{
          data?.ratesRecord?.length ?   data?.ratesRecord?.map((item)=>{
         return    <p style={{margin: 0}}>{item}</p>
          }): '--'
        }</p>
      }
    }
  ];

  const handleSubmit = () => {
    
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (firstDate.getTime() <= lastDate.getTime()) {
        setIsFirstLoading(true)
        setPageNumber(1);
        setCalledApi((callApi) => !callApi);
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    } else {
      if (startDate <= endDate || !endDate) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
      setIsFirstLoading(true)
      setPageNumber(1);
      setCalledApi((callApi) => !callApi);
    }

  };
  const handleChange = (e) => {
    setSearch(e?.target?.value);
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
  const  rowClassName = (record, index) => {
        if(record?.type===1){
          if(record?.isfancyOrbookmaker && record?.fancyData){
            return style.BackRow;
          }else {
            return style.redrow;
          }
        }else{
          if(record?.isfancyOrbookmaker && record?.fancyData){
            return style.redrow
          }else {
            return style.BackRow
          }
        }

      };
  return (
    <Wrapper>
       <Row>{headerButtonUserBets}</Row>
       <TitleBarUpdated title={CAP_BET_HISTORY} isIcon={true} icon={<TfiAlignJustify/>}/>
      <div className={style.mainWrapper}>
        <div className={style.flexAndGapClass}>
          <div style={{minWidth: '150px', maxWidth: '150px'}}>
          <CommonSelect
            className={style.commonSelectBox}
            data={optionMarketTypes}
            defaultValue={LOWER_ALL}
            onChange={(e)=>{
              console.log('e', e)
              setMarketId(e)}}
          />
          </div>
          <div style={{minWidth: '150px', maxWidth: '150px'}}>
          <CommonSelect
            className={style.commonSelectBox}
            data={filterUserBetsOptions}
            defaultValue={LOWER_ACTIVE}
            onChange={(e)=>setStatus(e)}

          />
          </div>
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
          disabled={isfirstLoading}
          loading={isfirstLoading}
          title={CAP_SUBMIT}
          customClass={style.btnStyle}
          onClick={() => {
            handleSubmit();
          }}
        />
        </div>
      </div>
      <TitleBarUpdated  title={`${CAP_BET_HISTORY} (${getUserInfo?.userName})`} icon={<TfiAlignJustify/>} isIcon={true}/>
      <FlexWrapper className={style.mainWrapper}>
        <FlexWrapperSpaceBetween>
          <FlexWrapperNoGap>
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
            </FlexWrapper>
          </FlexWrapperNoGap>
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

        <Table
          className={style.tableStyle}
          responseData={getUserBets?.length ?  getUserBets : []}
          loading={isfirstLoading}
          columns={getUserInfo?.role=='0'? columns:  columns?.filter((item)=> item?.key!='ratesRecord')}
          responseCountParam={getUserBetsTotal?  getUserBetsTotal?.toString(): '0'}
          setPageNumber={setPageNumber}
          queryParam={{ page: pageNumber, numRecords: entries }}
          rowClassName={rowClassName}

        />
      </FlexWrapper>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 10px;
   @media screen and (max-width:650px) {
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
const SportsWrapper = styled.p<{ colordyn?: any }>`
color: ${(p) => (p?.colordyn) ? `${p?.colordyn} !important` : ''}
`;