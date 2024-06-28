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
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";

interface Props {}
const LoginUser: React.FC<Props> = observer(({ ...props }) => {
  const {
    user: {loadAllUsers, loadingGetAllUsers, getAllUsers,  getAllUserTotal, loadUserLoginActivitLogs, loadingUserLoginActivitLogs, getUserInfo, getUserLoginActivityData }
  } = useStore(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate()
  useEffect(()=>{
    loadAllUsers()
  }, [pageNumber])

  // useEffect(() => {
  //   if(getUserInfo?.userId)loadUserLoginActivitLogs(getUserInfo?.userId)
  // },[])
  const columns = [
    {
      title: "S No",
      render: (_, data, idx) => <div>{idx+1}</div>,
    }, 
    {
      title: "User Name",
      render: (_, data) => <div className={style.clickAble} onClick={()=> navigate(`${constRoute?.loginHistory}?id=${data?.userId}`)}>{data?.userName || '-'}</div>,
    },
    {
      title: "User Type",
      render: (_, data) => <div>{ColUserOnRole(data?.role)}</div>,
    }, 
  ];
  return (
    <div className={style.mainWrapper}>
      <Row style={{marginBottom:10}}>
        <TitleBarUpdated  title={'All User'}/>
      </Row>
      {loadingUserLoginActivitLogs ? <Spin className={style.spinWrapper} />:<Table
       checkPagination={false} 
        dataSource={getAllUsers}
         columns={columns}
         loading={loadingGetAllUsers}
         responseCountParam={getAllUserTotal?.toString()}
         setPageNumber={setPageNumber}
         queryParam={{ page: pageNumber, numRecords: '10' }}/>
         }
    </div>
  );
});

export default memo(LoginUser);
 