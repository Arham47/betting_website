import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import Table from "@components/common-components/table";
import { Col, Input, Row } from "antd";
import CustomButton from "@components/common-components/custom-button";
import { useStore } from "@stores/root-store";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface Props {}
const DigitRate: React.FC<Props> = observer(({ ...props }) => {
  const [figursBetting, setFiguresBetting] = useState([])
  const {
    bet: { loadAllBettingFigures, loadingBettingFigures, updateBettingFigursData },
  } = useStore(null);
  const handleGetAllBettingFigures = async()=>{
    const res =  await loadAllBettingFigures();
    if(res?.success){
      setFiguresBetting(res?.data)
    }
  }
  useEffect(() => {
    handleGetAllBettingFigures()
  }, []);
  
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleInputChange = (index: number, value: string, data?: any) => {
    const tempData = [...figursBetting];
    tempData[index] = { ...data, amount: value };
    setFiguresBetting(tempData);
  };
  const updateHandler = async() => {
    const updatepayload = figursBetting?.map((item)=>{
      return {_id: item?._id, amount: Number(item?.amount)}
    })
    const payload = {figures: updatepayload}
    
    await updateBettingFigursData(payload)
    handleGetAllBettingFigures()
  };
  const columns = [
    {
      title: "",
      render: (_, data, index) => <p>{index+1}</p>,
    },
    {
      title: "",
      render: (_, data, index) => {
        return <p>{data?.name}</p>;
      },
    },
    {
      title: "",
      width: "40%",
      render: (_, data, index) => {
       return  <div style={{margin:'0px -8px'}}>
          <Input
            value={data?.amount?.toString()}
            onChange={(e) => handleInputChange(index, e?.target?.value, data)}
            type="number"
            style={{borderRadius:0}}
          />
        </div>
      },
    },
  ];
  
  return (
    <div className={style.mainWrapper}
    >
      <Row>
        <Col lg={12} md={20} sm={24} style={{width:'100%'}}>
          <TitleBarUpdated title="Digit Rates"/>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={20} sm={24} className={style.tableWrapper} style={{width:'100%'}}>
          <Table
            className={""}
            dataSource={figursBetting}
            columns={columns}
            checkPagination={false}
            showHeader={false}
            loading={loadingBettingFigures}
          />
        </Col>
      </Row>
      <div style={{padding: '10px'}}>
      <CustomButton title="Update" onClick={updateHandler}/>
      </div>
    </div>
  );
});

export default memo(DigitRate);
