import { observer } from "mobx-react";
import React, { memo,useEffect, useState} from "react";
import style from "./style.module.scss";
import { Col, Row, Spin } from "antd";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { DeleteOutlined, CheckCircleFilled, EyeOutlined  } from "@ant-design/icons";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import { unixTimestamp } from "@utils/common-functions";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const FakeBets = observer(() => {
  const {
    bet: {
      loadAllFakeBetsDataList,
      loadingFakeBets,
      getLoadAllFakeBetsData,
      loadDeleteFakeBet,
      updateDataOfFakeBets,
    },
  } = useStore(null);
  
  const [selectedId, setSelectedId] = useState(null)
  const [selectedIdUpdate, setSelectedIdUpdate] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const columns = [
    {
      title: 'User',
      render: (_, data) => <p>{data.userId}</p>,
    },
      {
        title: 'Bet Time',
        render: (_, data) => <p>{unixTimestamp(data?.createdAt)}</p>,
      },
      
      {
        title: 'Amount',
        render: (_, data) => <p>{data.betAmount}</p>,
      },
      {
        title: <p style={{textAlign:'center'}}>Action</p>,
        render: (_, data) => (
          <div className={style.delBtnWrapper}>
           {selectedId === data?._id ?  
            <Spin
              className={style.antIconClassEdit}   
            />
              : <CustomButton
              className={style.BtnList}
              onClick={async() => {
                setSelectedId(data?._id)
                await loadDeleteFakeBet(data?._id);
                setSelectedId(null)
                handleFakeBetsApi();
              }}
              customClass={style.btnStyle}
              icon={<DeleteOutlined />}
            />}
            {selectedIdUpdate === data?._id ?  
            <Spin
              className={style.antIconClassEdit}
            />
              : <CustomButton
              className={style.BtnListUpdate}
              onClick={async() => {
                setSelectedIdUpdate(data?._id)
                await updateDataOfFakeBets(data?._id)
                setSelectedIdUpdate(null)
                handleFakeBetsApi();
              }}
              customClass={style.btnStyle}
              icon={<CheckCircleFilled  />}
         
         />}
          
            <CustomButton
              className={style.btnListView}
              onClick={async() => {
                navigate(
                  `${constRoute?.viewFakeBet}?id=${data?._id}&sportsId=${data?.sportsId}`
                );
              }}
              customClass={style.btnStyle}
              icon={<EyeOutlined  />}
            />
          </div>
        ),
      },
    ];

    const handleFakeBetsApi = async()=>{
     await loadAllFakeBetsDataList()
    }
    useEffect(()=>{
      handleFakeBetsApi()
    }, [])
  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <Row className={style.mainTableDiv}>
        <TitleBarUpdated title={'Fake Bets Report'} className={style.fakeBetTitleBar}/>
            <Col span={8} className={style.gridOne}>
            <Table
              className={style.positiveClient}
              columns={columns}
              loading={loadingFakeBets}
              dataSource={getLoadAllFakeBetsData}
              checkPagination={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default memo(FakeBets);