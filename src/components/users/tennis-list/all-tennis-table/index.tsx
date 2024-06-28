/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import style from "./style.module.scss";
import {useStore} from "@stores/root-store";
import {
  INITIAL_NUM_RECORDS,
  LOWER_NUM_RECORDS_PARAM_KEY,
  LOWER_PAGE_PARAM_KEY,

  CAP_TITLE,
  CAP_EVENTID,
  CAP_OPTIONS,
  CAP_LIVE,
  CAP_START_DATE,
  CAP_SERIES_FULL_NAME,
  CAP_MATCH_FULL_NAME, CAP_SHOW, CAP_ENTRIES, CAP_USER_NAME, CAP_SEARCH,
} from "@utils/const";
import {Col, Row, Spin} from "antd";
import useWindowSize from "@utils/hooks/useWindowSize";
import styled from "styled-components";
import {Pagination} from "antd";
import moment from "moment";
import CustomButton from "@components/common-components/custom-button";
import {constRoute} from "@utils/route";
import {FaPen} from "react-icons/fa";
import {Modal} from "antd";
import {useTheme} from "@utils/hooks/useTheme";
import axios from "axios";
import {editTennisUrl} from "@api/const";
import {getAuthorizationHeader} from "@api/common-utils";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";

interface TennisTable {
  isLoadBalanceShow?: boolean;
  pageNumber?: any;
  setPageNumber?: any;
}

const AllTennisTable: React.FC<TennisTable> = observer(
  ({
     isLoadBalanceShow,
     pageNumber,
     setPageNumber,
   }) => {
    const defaultParams = {
      numRecords: 100,
      page: 1,
    };
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [numRecords, setNumRecords] = useState(defaultParams.numRecords);
    const [editItem, setEditItem] = useState(null)
    const [eventId, setEventId] = useState("")
    const [isShowData, setIsShowData] = useState([]);
    const [params, setParams] = useState(defaultParams);
    const [options] = useState([10, 100, 250, 500, 1000]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [entries, setEntries] = useState("10");

    const handleCancel = () => {
      setOpen(false)
      setEditItem(null)
      setEventId(null)
    }

    const handleChangeEventId = (data) => {
      setEventId(data)
    }

    const handleUpdateCricket = async () => {
      const submitData = {
        _id: editItem._id,
        eventId: eventId
      }

      await axios.post(editTennisUrl, submitData, {
        headers: {Authorization: getAuthorizationHeader()},
      });

      setOpen(false)
      setEditItem(null)
      setEventId(null)

      fetDataonPageNumber();
    }

    useEffect(() => {
      if (!open) {
        setEditItem(null)
        setEventId(null)
      }
    }, [open])

    const {
      user: {
        getAllTennis,
        getAllTennisTotal,
        loadAllTennis,
        isLoadingGetAllTennis,
      },
    } = useStore(null);
    const data = useWindowSize().width;

    useEffect(() => {
      setIsShowData([]);
    }, [getAllTennis]);

    const fetDataonPageNumber = async () => {
      const pageSize = entries
      const search = searchKeyword
      const tmpQueryParam = `?${LOWER_PAGE_PARAM_KEY}=${pageNumber}&${LOWER_NUM_RECORDS_PARAM_KEY}=${pageSize}&keyword=${search}`;
      const res = await loadAllTennis(tmpQueryParam);
    };

    useEffect(() => {
      fetDataonPageNumber();
    }, [pageNumber]);

    const handlePaginationChange = (page, pageSize) => {
      setPageNumber(page);
      setParams({...params, page, numRecords: pageSize});
    };
    useEffect(() => {
      if (!isLoadBalanceShow) {
        setIsShowData([]);
        // setIsShowData(data);
        setIsShowData([]);
      }
    }, [isLoadBalanceShow]);

    const onEdit = async (rowData) => {
      const newWindow = window.open(`${window.location.href.replaceAll("/users", constRoute.userBetForm)}/${rowData?._id?.toString()}`, "_blank", 'width=520,height=600,resizable,scrollbars');
    }

    const showTeam = (item) => {
      return (
        <>
          <div className={'cricket-body'}><img className={'cricketImgWrapper'} src={item.team1Flag}/>{item?.team1Name}
          </div>
          <div className={'cricket-body'}><img className={'cricketImgWrapper'} src={item.team2Flag}/>{item?.team2Name}
          </div>
        </>
      )
    }

    const showDateTime = (item) => {
      if(item.state === 'live') return 'live'
      const targetDateTime = item.timestamp
      const now = new Date();
      const targetDate = new Date(targetDateTime);
      // @ts-ignore
      const diffTime = targetDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log('item', item.seriesKey, diffTime)

      if (diffTime < 0){
        return targetDate.toLocaleString();
      }
      if (diffDays <= 1) {
        // Within 1 day - display remaining hours
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHours} : ${diffMinutes} remaining`;
      } else {
        // More than 1 day - display the date and time
        return targetDate.toLocaleString();
      }
    }

    const showHomeScore = (scores) => {
      return `${scores[0]} ${scores[1]} ${scores[2]} ${scores[3]} ${scores[4]} ${scores[5]}`
    }

    const showAwayScore = (scores) => {
      return `${scores[6]} ${scores[7]} ${scores[8]} ${scores[9]} ${scores[10]} ${scores[11]}`
    }

    const searchForm = () => {
      return <Row className={style.searchEntriesWrapper}>
        <Col>
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
        </Col>
        <Col className={style.searchBarCol}>
          <Search
            placeholder={CAP_USER_NAME}
            allowClear
            onChange={(e) => setSearchKeyword(e?.target?.value)}
            enterButton={<div className={style.searchIcon}>
              <SearchOutlined className={style.iconSearch}/>
              {CAP_SEARCH}
            </div>}
            size='middle'
            onSearch={onSearch}
            className={style.searchBarButton}
          />
        </Col>
      </Row>
    }

    const onSearch = async (e) => {
      setSearchKeyword(e)
      await fetDataonPageNumber()
    }

    return (
      <div className={style.allUsersTable}>
        <div className={style.searchBarButtunCard}>{searchForm()}</div>
        <table className={style.newtable}>
          <thead>
          <tr className={style.theadUnColor}>
            <th className={style.width9}>{CAP_EVENTID}</th>
            <th className={style.width9}>{CAP_START_DATE}</th>
            <th className={style.width9}>Home Name</th>
            <th className={style.width9}>Home Score</th>
            <th className={style.width9}>Away Name</th>
            <th className={style.width9}>Away Score</th>
            <th className={style.width9}>Key</th>
            <th className={style.width20}>{CAP_OPTIONS}</th>
          </tr>
          </thead>
          <tbody>
          {isLoadingGetAllTennis ? (
            <td
              style={{border: "none"}}
              colSpan={data >= 1095 ? 9 : data >= 885 ? 7 : data >= 450 ? 3 : 5}
            >
              {" "}
              <Spin className={style.antIconClass} size="large"/>
            </td>
          ) : getAllTennis?.length ? (
            getAllTennis?.map((item, index) => {
              return (
                <>
                  {" "}
                  <tr key={index}>
                    <td className={`${style.width9}`}>{item?.eventId ? item.eventId : "--"}</td>
                    <td className={`${style.width9} cricket-date`}>
                      {item?.data?.openTime ? item?.data?.openTime : "--"}
                    </td>
                    <td className={style.width9}>{item?.data?.home}</td>
                    <td className={style.width9}>{showHomeScore(item?.data?.scoreList)}</td>
                    <td className={style.width9}>{item?.data?.away}</td>
                    <td className={style.width9}>{showAwayScore(item?.data?.scoreList)}</td>
                    <td className={style.width9}>{item?.data?.scoreKey}</td>
                    <td className={style.width9}>
                      <div style={{display: "flex", justifyContent: "center"}}>
                        <CustomButton
                          className={style.userIconsEdit}
                          title={""}
                          onClick={() => {
                            setOpen(true)
                            setEditItem(item)
                          }}
                          icon={<FaPen className={style.editBtn}/>}
                        />
                      </div>
                    </td>
                  </tr>
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
        {getAllTennis?.length ? (
          <PaginationStyled
            onChange={handlePaginationChange}
            total={getAllTennisTotal || 10}
            pageSize={numRecords}
            current={pageNumber}
            className={style.paginationClass}
          />
        ) : (
          ""
        )}

        <Modal
          open={open}
          closable={false}
          onCancel={handleCancel}
          className={theme + " " + style.resultModal}
          forceRender={true}
          footer={[]}
        >
          <div>
            <div style={{textAlign: "center"}}>
              <span style={{fontSize: 20, fontWeight: 600}}>Edit EventId</span>
            </div>
            <div style={{display: "flex", marginTop: 20}}>
              <span style={{fontSize: 16, marginRight: 20}}>EventId</span>
              <input
                onChange={(e) => handleChangeEventId(e.target.value)}
                style={{border: "none", width: "100%"}}
                value={eventId || ""}
              />
            </div>
            <div style={{display: "flex", gap: "20px", justifyContent: "center", marginTop: 20}}>
              <button onClick={handleUpdateCricket} style={{
                borderRadius: "6px",
                background: "#00B181",
                padding: "4px 12px",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "18px"
              }}>
                Save
              </button>
              <button onClick={handleCancel} style={{
                borderRadius: "6px",
                background: "red",
                padding: "4px 12px",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "18px"
              }}>Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
);

export default AllTennisTable;

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
