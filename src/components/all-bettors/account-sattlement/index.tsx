import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Form, Modal, Spin } from "antd";
import { useTheme } from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import useWindowSize from "@utils/hooks/useWindowSize";
import { CommonInput } from "@components/common-components/input";
import { CAP_SUBMIT, LOWER_BASIC, LOWER_NUMBER, LOWER_SUBMIT } from "@utils/const";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
interface Props {
  open?: any;
  setOpen?: any;
  data?: any;
  setData?: any;
  getAllBettor?:any;
}
const AccountSattlement: React.FC<Props> = observer(
  ({ open, setOpen, data, setData,getAllBettor, ...props }) => {
    const theme = useTheme();
    const [form] = Form.useForm();
    const innerWidth = useWindowSize()?.width;
    const {
      bet: { loadUserAccountSattle,loadUserAccountSat},
    } = useStore(null);

   
    const handleCancel = () => {
      setData(null);
      setOpen(false);

    };

    // console.log("userData",data);
    useEffect(() => {
      form.setFieldValue("availableBalance", data?.availableBalance || "0");
      form.setFieldValue("balance", data?.balance || "0");
      form.setFieldValue("exposure", data?.exposure || "0");
      form.setFieldValue("balance", data?.balance || "0");
      form.setFieldValue("clientPL", data?.clientPL || "0");
      
    }, [data]);
const onSubmit = async(value)=>{
  const payload = {
    userId: data?.userId,
    exposure: value?.exposure,
    availableBalance: value?.availableBalance,
    balance: value?.balance,
    clientPL: value?.clientPL,
    
  };
  const res = await loadUserAccountSattle(payload);
  if (res?.success) {
        setData(null);
        setOpen(false);
        getAllBettor()
      }
  // console.log("payload",payload);
}

  const firstColumn = [
    {
      title:'Sports',
      key:'sport',
      render:(_,data) => <div>{data?.name}</div>
    },
    {
      title:'CalculateExp Sum',
      key:'sport',
      render:(_,data) => <div>10</div>
    }
  ]
  const secondColumn = [
    {
      title:'Parents',
      key:'parents',
      render:(_,data) => <div>{data?.name}</div>
    },
    {
      title:'Exposure',
      key:'exposure',
      render:(_,data) => <div>211,490</div>
    },
    {
      title:'AvlBalance',
      key:'avlbalance',
      render:(_,data) => <div>433,500</div>
    },
     {
      title:'Balance',
      key:'balance',
      render:(_,data) => <div>410,620</div>
    },
    {
      title:'Sattlement',
      key:'sattlement',
      render:(_,data) => <div>
        <CustomButton title="Adjustment"/>
      </div>
    }
  ]
  
    return (
      <div className={style.mainWrapper}>
        <Modal
          open={open}
          title={
            <TitleBarUpdated
              title={" Account Sattlement "}
              isButton={true}
              btnTitle={"Close"}
              clickHandler={handleCancel}
            />
          }
          closable={false}
          onCancel={handleCancel}
          width={innerWidth >= 400 ? 800 : "auto"}
          style={{ height: 300 }}
          className={theme + " " + style.resultModal}
          forceRender={true}
          footer={[]}
        >
          <div>
            <Form
              form={form}
              name={LOWER_BASIC}
              // labelCol={{ xxl: 8, lg: 8, md: 8, xs: 12 }}
              // wrapperCol={{ xxl: 8, lg: 8, md: 8, xs: 12 }}
              className={style.userBetForm}
              onFinish={onSubmit}
              layout={'vertical'}
            >            
              <Form.Item
                className={style.formItemStyle}
                label="Exposure"
                name="exposure"
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  className={style.editITwo}
                  // onChange={(e)=>handleChangepass(e)}
                />
              </Form.Item>
              <Form.Item
                className={style.formItemStyle}
                label="Available Bal"
                name="availableBalance"
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  className={style.editITwo}
                  // onChange={(e)=>handleChangepass(e)}
                />
              </Form.Item>
              <Form.Item
                className={style.formItemStyle}
                label="Balance"
                name="balance"
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  className={style.editITwo}
                  // onChange={(e)=>handleChangepass(e)}
                />
              </Form.Item>
              <Form.Item
                className={style.formItemStyle}
                label="Client PL"
                name="clientPL"
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  className={style.editITwo}
                  // onChange={(e)=>handleChangepass(e)}
                />
              </Form.Item>
              <CustomButton
              className={style.submitBtn_one}
              htmlType={LOWER_SUBMIT}
              title={CAP_SUBMIT}
              loading={
                loadUserAccountSat
              }
            />
            </Form>
          </div>
          <div style={{marginTop:10}}>
            <Table dataSource={[{name:"Tennis"},{name:"Soccer"}]} columns={firstColumn}/>
          </div>
          <div style={{marginTop:10}}>
            <Table dataSource={[{name:"Devis"},{name:"Steve"}]} columns={secondColumn}/>
          </div>
        </Modal>
      </div>
    );
  }
);

export default memo(AccountSattlement);
