import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Col, DatePicker, Row } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
import CustomButton from "@components/common-components/custom-button";
import style from "./style.module.scss";
import Table from "@components/common-components/table";
import { sortCol, unixTimestamp } from "@utils/common-functions";
import * as _ from "lodash";
import { useStore } from "@stores/root-store";
import moment from "moment";
import {
  CAP_AMOUNT,
  CAP_BET_HISTORY,
  CAP_END_DATE,
  CAP_ENTRIES,
  CAP_SEARCH,
  CAP_SHOW,
  CAP_START_DATE,
  CAP_SUBMIT,
  DOUBLE_DASH,
  HASH_LINK,
  LOWER_ACTIVE,
  LOWER_ALL,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
} from "@utils/const";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { notification } from "@utils/notifications";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useTheme } from "@utils/hooks/useTheme";
// import TitleBar from "@components/users/common-components/title-bar";
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

export const BetsList = observer(() => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState("10");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { id } = useParams();
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [filterIcon, setFilterIcon] = useState(null);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [callApi, setCalledApi] = useState(false);
  const {
    user: { getUserInfo },
    bet: { postUserBetsList, getUserBets, isLoadingUserBetsList },
  } = useStore(null);
  useEffect(() => {
    getUserBetsList();
  }, [JSON.stringify(entries), pageNumber, callApi, search]);

  const getUserBetsList = async () => {
    const firstDate = new Date(startDate?.date);
    const lastDate = new Date(endDate?.date);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (startDate?.date <= endDate?.date) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    } else {
      if (startDate?.date <= endDate?.date || !endDate?.date) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    }
    const payload = {
      userId: id,
      startDate: startDate?.date?.toString() || "",
      endDate: endDate?.date?.toString() || "",
      numRecords: entries,
      page: pageNumber,
      searchValue: search,
    };
    await postUserBetsList(payload);
  };

  const getAllCashDepositLedgerData = async () => {
    const firstDate = new Date(startDate?.date);
    const lastDate = new Date(endDate?.date);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (startDate?.date <= endDate?.date) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    } else {
      if (startDate?.date <= endDate?.date || !endDate?.date) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    }
    const payload = {
      userId: Number(id),
      startDate: startDate?.date?.toString() || "",
      endDate: endDate?.date?.toString() || "",
      searchValue: search,
    };
    await postUserBetsList(payload);
  };

  useEffect(() => {
    if (localStorage.getItem(LOWER_THEME) === LOWER_LIGHT_HYPEN_THEME) {
      setFilterIcon(constImages?.menuOutlinedBlackIcon);
    } else {
      setFilterIcon(constImages?.menuOutlinedWhiteIcon);
    }
  }, [localStorage.getItem(LOWER_THEME), theme]);
  useEffect(() => {
    getAllCashDepositLedgerData();
  }, [search]);
  const handelStatrDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    const formatedDate = moment(dateString).format("YYYY-MM-DD");
    if (dateString) setStartDate({ value: date, date: formatedDate });
    else setStartDate(null);
  };
  const handelEndDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    const formatedDate = moment(dateString).format("YYYY-MM-DD");
    if (dateString) setEndDate({ value: date, date: formatedDate });
    else setEndDate(null);
  };
  const onOk = () => {};
  const columns = [
    {
      title: HASH_LINK,
      render: (text, data, index) => <div>{index + 1}</div>,
    },
    {
      title: CAP_EVENT,
      dataIndex: LOWER_EVENT,
      sorter: (a, b) => sortCol(a, b, LOWER_EVENT),
      render: ColTextCheck,
    },

    {
      title: CAP_RUNNER,
      dataIndex: LOWER_RUNNER,
      sorter: (a, b) => sortCol(a, b, LOWER_RUNNER),
      render: ColTextCheck,
    },
    {
      title: CAP_PRICE,
      dataIndex: CAMEL_BET_RATE,
      sorter: (a, b) => sortCol(a, b, CAMEL_BET_RATE),
      render: ColTextCheck,
    },
    {
      title: CAP_POSITIONS,
      dataIndex: LOWER_POSITION,
      sorter: (a, b) => sortCol(a, b, LOWER_POSITION),
      render: ColTextCheck,
    },
    {
      title: CAP_AMOUNT,
      dataIndex: CAMEL_BET_AMOUNT,
      sorter: (a, b) => sortCol(a, b, CAMEL_BET_AMOUNT),
      render: ColTextCheck,
    },
    {
      title: CAP_PLACED,
      dataIndex: CAMEL_CREATED_AT,
      sorter: (a, b) => sortCol(a, b, CAMEL_CREATED_AT),
      render: (text) => <> {unixTimestamp(text) || DOUBLE_DASH}</>,
    },
  ];

  const handleSubmit = () => {
    const firstDate = new Date(startDate?.date);
    const lastDate = new Date(endDate?.date);
    if (firstDate.getTime() && lastDate.getTime()) {
      if (firstDate.getTime() <= lastDate.getTime()) {
        setPageNumber(1);
        setCalledApi((callApi) => !callApi);
        getAllCashDepositLedgerData();
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
    } else {
      if (startDate?.date <= endDate?.date || !endDate?.date) {
      } else {
        notification.error("Start Date Must be less or Equal to End Date");
        return;
      }
      setPageNumber(1);
      setCalledApi((callApi) => !callApi);
      getAllCashDepositLedgerData();
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

  return (
    <Wrapper>
      <Row>{headerButtonUserBets}</Row>

      {/* <TitleBar
        icon={filterIcon}
        isHtml={true}
        HTMLRender={`<div class=${style.colorClass}>${CAP_BET_HISTORY}</div>`}
        className={style.titleBar}
      /> */}
      <FlexWrapper className={style.mainWrapper}>
        <div className={style.flexAndGapClass}>
          <CommonSelect
            className={style.commonSelectBox}
            data={optionMarketTypes}
            defaultValue={LOWER_ALL}
          />
          <CommonSelect
            className={style.commonSelectBox}
            data={filterUserBetsOptions}
            defaultValue={LOWER_ACTIVE}
          />
          <DatePicker
            placeholder={CAP_START_DATE}
            locale={locale}
            className={style.datePicker}
            suffixIcon={<img src={constImages?.calanderBlackIcon} />}
            onChange={handelStatrDateChange}
            allowClear
            onOk={onOk}
          />
          <DashFont> - </DashFont>
          <DatePicker
            placeholder={CAP_END_DATE}
            allowClear
            className={style.datePicker}
            suffixIcon={<img src={constImages?.calanderBlackIcon} />}
            onChange={handelEndDateChange}
            onOk={onOk}
          />
        </div>
        <CustomButton
          disabled={isLoadingUserBetsList}
          title={CAP_SUBMIT}
          customClass={style.btnStyle}
          onClick={() => {
            handleSubmit();
          }}
        />
      </FlexWrapper>
      {/* <TitleBar
        isHtml={true}
        icon={filterIcon}
        HTMLRender={`<div class=${style.colorClass}>${CAP_BET_HISTORY} (${getUserInfo?.userName})</div>`}
        className={style.titleBar}
      /> */}
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
          responseData={getUserBets?.length ? getUserBets : []}
          loading={isLoadingUserBetsList}
          columns={columns}
          responseCountParam={getUserBets?.length?.toString()}
          setPageNumber={setPageNumber}
          queryParam={{ page: pageNumber, numRecords: entries }}
        />
      </FlexWrapper>
    </Wrapper>
  );
});
const DashFont = styled.div`
  font-size: 25px;
`;
const Wrapper = styled.div`
  padding: 10px;
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
const DatePickerWrapper = styled(DatePicker)`
  .ant-picker-dropdown {
    .ant-picker-panel-container {
      overflow: scroll;
      max-width: 300px;
      max-height: 250px;
    }
  }
`;
