import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss"
import Table from "@components/common-components/table";
import { Col, Row, Spin } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { CAP_SEARCH, LOWER_LARGE } from "@utils/const";
import { useStore } from "@stores/root-store";
import moment from "moment";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { ColUserOnRole } from "@components/common-components/export-common-components/table-columns-text-check";
import { getSingleUrlParam } from "@utils/common-functions";
import { useLocation } from "react-router-dom";

interface Props {}
const LoginHistory: React.FC<Props> = observer(({ ...props }) => {
  const {
    user: {loadUserLoginActivitLogs, loadingUserLoginActivitLogs, getUserInfo, getUserLoginActivityData }
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const location = useLocation()
  const userId = getSingleUrlParam(location ,'id')
  // const [pageNumber, setPageNumber] = useState(1);
  // useEffect(()=>{
  //   loadAllUsers()
  // }, [pageNumber])
const handleUserLoginHistoryData=async(query)=>{
await loadUserLoginActivitLogs(query)
}
  useEffect(() => {
    const query = `?id=${userId}`
    if(userId)handleUserLoginHistoryData(query)
  },[userId])
  const columns = [
    {
      title: "S No",
      render: (_, data, idx) => <div>{idx}</div>,
    }, 
    {
      title: "User Name",
      render: (_, data) => <div className={style.clickAble} onClick={()=>{
        const query = `?id=${data?.userId}`
        handleUserLoginHistoryData(query)
      }}>{data?.userName || '-'}</div>,
    },
    // {
    //   title: "User Creator",
    //   render: (_, data) => <div>-</div>,
    // }, 
    {
      title: "Login Date/Time",
      render: (_, data) => <div>{moment(data?.createdAt).format("MM-DD-YYYY hh:mm")}</div>,
    },
    {
      title: "IP Address",
      render: (_, data) => <div  className={style.clickAble} onClick={()=>{
        const query = `?ip=${data?.ipAddress}`
        handleUserLoginHistoryData(query)
      }}>{data?.ipAddress || ''}</div>,
    }, 
    {
      title: "Location",
      render: (_, data) => <div>{data?.locationData?.city || '-'}</div>,
    },
    {
      title: "Country",
      render: (_, data) => <div>{data?.locationData?.country || '-'}</div>,
    }, 
  ];
  return (
    <div className={style.mainWrapper}>
      <Row style={{marginBottom:10}}>
        <TitleBarUpdated  title={'Login User History'}/>
        
      </Row>
      {loadingUserLoginActivitLogs ? <Spin className={style.spinWrapper} />:<Table
       checkPagination={false} 
        dataSource={getUserLoginActivityData}
         columns={columns}
         />
         }
    </div>
  );
});

export default memo(LoginHistory);
 