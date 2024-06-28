/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Modal, Spin } from "antd";
import { useTheme } from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import moment from "moment";
import Table from "@components/common-components/table";
import useWindowSize from "@utils/hooks/useWindowSize";
interface Props {
    open?:any;
    setOpen?:any;
    data?:any;
    setData?:any;
}
const BettorLedger: React.FC<Props> = observer(({open, setOpen, data,setData, ...props }) => {
    const theme = useTheme();
    const innerWidth = useWindowSize()?.width
    const [bettorData, setBettorData] = useState(null)
    const {
      bet: {loadBettorLedger,loadingBettorLedger},
    } = useStore(null);

    useEffect(() => {
      // console.warn('bettorData', data)
      if(data?.userId) getSingleBettorLedger()
    },[data])

    const getSingleBettorLedger = async() => {
      const payload = {
        id : data?.userId
      } 
      const res = await loadBettorLedger(payload);
      // console.warn('res', res)
      if(res?.success){
        setBettorData(res?.result)
      }
    }
    const handleCancel = ()=>{
      setData(null)
      setOpen(false)
      setBettorData([])
    }
    const columns = [
      {
        title: 'Date',
        key: 'date',
        render: (_, data) => <p>{moment(data?.date)?.format("DD/MM/YY h:m:s A")}</p>,
      },
      {
        title: 'Amount',
        key: 'amount',
        render: (_, data) => <p>{Math.round(data?.amount)}</p>,
      },
      {
        title: 'Balance',
        key: 'balance',
        render: (_, data) => <p>{Math.round(data?.balance)}</p>,
      },
      {
        title: 'Available Balance',
        key: 'availableBalance',
        render: (_, data) => <p>{Math.round(data?.availableBalance)}</p>,
      },
      {
        title: 'Max Withdraw',
        key: 'maxWithdraw',
        render: (_, data) => <p>{Math.round(data?.maxWithdraw)}</p>,
      },
      {
        title: 'Cash',
        key: 'cash',
        render: (_, data) => <p>{Math.round(data?.cash)}</p>,
      },
      {
        title: 'Credit',
        key: 'credit',
        render: (_, data) => <p>{Math.round(data?.credit)}</p>,
      },
       {
        title: 'credit Remaining',
        key: 'creditRemaining',
        render: (_, data) => <p>{Math.round(data?.creditRemaining)}</p>,
      },
        {
        title: 'Description',
        key: 'description',
        render: (_, data) => <p>{data?.description || ''}</p>,
      }
    ];

  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title={'Bettor Ledger List'} isButton={true} btnTitle={'Close'} clickHandler={handleCancel}/>}
        closable={false}
        onCancel={handleCancel}
        width={innerWidth>=500 ? 1000 : 'auto'}
        style={{height:300}}
        className={theme + " " + style.resultModal}
        forceRender={true}
        footer={[]}
      >
       <div>
        
       
       {loadingBettorLedger? <div className={style.spinDiv}> <Spin /> </div>:
       <Table
          className={style.tableStyle}
          dataSource={bettorData?.length ?  bettorData : []}
          loading={false}
          columns={columns}
          // // responseCountParam={getUserBetsTotal?  getUserBetsTotal?.toString(): '0'}
          // // setPageNumber={setPageNumber}
          // // queryParam={{ page: pageNumber, numRecords: entries }}
          // rowClassName={rowClassName}
        />
        }
       </div>

      </Modal>
    </div>
  );
});

export default memo(BettorLedger);
