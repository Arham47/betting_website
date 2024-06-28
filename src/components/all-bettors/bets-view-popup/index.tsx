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
const BetsViewPopup: React.FC<Props> = observer(({open, setOpen, data, setData, ...props }) => {
    const theme = useTheme();
    const innerWidth = useWindowSize()?.width
    const [bettorData, setBettorData] = useState(null)
    const {
      bet: {loadBetsview,loadingBetsview},
    } = useStore(null);

    useEffect(() => {
      if(data?.userId) getSingleBettorLedger()
    },[data])

    const getSingleBettorLedger = async() => {
      const payload = {
        id : data?.userId
      } 
      const res = await loadBetsview(payload);
      // console.log("response",res);
      
      if(res?.status){
        setBettorData(res?.results)
      }
    }
    const handleCancel = ()=>{
      setData(null)
      setOpen(false)
      setBettorData([])
    }
    const filteredData = bettorData?.filter((bet) => {
      return bet?.calculateExp;
      // if(bet?.calculateExp){
      //   return bet
      //    }
    })
    console.log("filteredData===", filteredData);
    const expAmount = filteredData?.length && filteredData?.reduce((total, data) => total + (data?.exposureAmount || 0), 0);
    const expAmountTotal = Number(expAmount?.toFixed(2));

    const columns = [
      {
        title: 'B_ID',
        key: 'id',
        render: (_, data) => <p>{(data?._id || 0)}</p>,
      },
      {
        title: 'B_Sports ID',
        key: 'sportsId',
        render: (_, data) => <p>{(data?.sportsId || 0)}</p>,
      },
      {
        title: 'B_Market ID',
        key: 'marketId',
        render: (_, data) => <p>{(data?.marketId || 0)}</p>,
      },
      {
        title: 'B_Wining Amt',
        key: 'winningAmount',
        render: (_, data) => <p>{(data?.winningAmount || 0)}</p>,
      },
      {
        title: 'B_Loosing Amt',
        key: 'loosingAmount',
        render: (_, data) => <p>{(data?.loosingAmount || 0)}</p>,
      },   
      // {
      //   title: `Position (Total): ${bettorData?.reduce((total, data) => total + (data?.position || 0), 0)}`,
      //   key: 'position',
      //   render: (_, data) => <p>{(data?.position)}</p>,
      // }
      
      // {
      //   title: `Position (Total): ${bettorData?.reduce((total, data) => total + Math.abs(data?.position || 0), 0)}`,
      //   key: 'position',
      //   render: (_, data) => <p>{Math.abs(data?.position)}</p>,
      // }
      {
        title: `B_Position (Total): ${bettorData?.reduce((total, data) => {
          const position = data?.position || 0;
          if (position < 0) {
            return total + Math.abs(position);
          }
          return total + position;
        }, 0)}`,
        key: 'position',
        render: (_, data) => <p>{(data?.position)}</p>,
      }
      ,
    
      {
        title: `D_Bfor Cal Exp`,
        key: 'beforecalexp',        
        render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
          return <div key={index}>
            {item?.UserPrevexposure}
          </div>
        })
           || 0)}</p>,
      },
      {
        title: `D_After Cal Exp`,
        key: 'aftercalexp',
        render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
          return <div key={index}>
            {item?.UpdatedExposure}
          </div>
        })
           || 0)}</p>,
      },
      {
        title: `B_Exp_Amt (Total): ${expAmountTotal}`,
        key: 'exposureAmount',
        render: (_, data) => (
          <p>{data?.calculateExp === 'Yes' ? expAmountTotal : (data?.exposureAmount || 0)}</p>
        ),
      },
      // {
      //   title: `B_Exp_Amt (Total): ${expAmountTotal}`,
      //   key: 'exposureAmount',
      //   render: (_, data) => <p>{(data?.exposureAmount || 0)}</p>,
      // },
      {
        title: 'B_Cal_Exp',
        key: 'calculateExp',
        render: (_, data) => (
          <p style={{ backgroundColor: data?.calculateExp ? 'yellow' : 'inherit' }}>
            {(data?.calculateExp ? 'Yes' : 'No')}
          </p>
        ),
      },      
      // {
      //   title: 'B_Cal_Exp',
      //   key: 'calculateExp',
      //   render: (_, data) => (
      //     <p style={{ backgroundColor: data?.calculateExp ? 'yellow' : 'inherit' }}>
      //       {(data?.calculateExp ? 'Yes' : 'No')}
      //     </p>
      //   ),
      // },
      {
        title: 'B_Is Exp Calculated ',
        key: 'iscalculatedExp',
        render: (_, data) => <p>{(data?.iscalculatedExp ? 'Yes': 'No')}</p>,
      },
      {
        title: `D_Usr Bal BFTrans`,
        key: 'UserBalanceBFTrans',        
        render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
          return <div key={index}>
            {item?.UserBalanceBFTrans}
          </div>
        })
           || 0)}</p>,
      },
      {
        title: `D_Usr Bal AFTrans`,
        key: 'UserBalanceAFTrans',        
        render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
          return <div key={index}>
            {item?.UserBalanceAFTrans}
          </div>
        })
           || 0)}</p>,
      },
      // {
      //   title: `Usr Avail Bal BFTrans`,
      //   key: 'userAvailableBalanceBFTrans',        
      //   render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
      //     return <div key={index}>
      //       {item?.userAvailableBalanceBFTrans}
      //     </div>
      //   })
      //      || 0)}</p>,
      // },
      {
        title: `D_Usr Avail Bal BFTrans`,
        key: 'userAvailableBalanceBFTrans',        
        render: (_, data) => (
          <p>
            {data?.multipeResponse?.map((item, index) => (
              <div key={index}>
                {/* {item?.userAvailableBalanceBFTrans} */}
                {item?.userAvailableBalanceBFTrans !== undefined && !Number.isNaN(item.userAvailableBalanceBFTrans) ? Number(item.userAvailableBalanceBFTrans).toFixed(2): ''}
              </div>
            )) || 0}
          </p>
        ),
      }
      
      ,
      {
        title: `D_Usr Avail Bal AFTrans`,
        key: 'userAvailableBalanceAFTrans',        
        render: (_, data) => <p>{(data?.multipeResponse?.map((item,index)=>{
          return <div key={index}>
            {/* {item?.availableBalance} */}
            {item?.availableBalance !== undefined && !Number.isNaN(item.availableBalance) ? Number(item.availableBalance).toFixed(2): ''}
          </div>
        })
           || 0)}</p>,
      },
      {
        title: 'B_(Runner - Amount)',
        key: 'runnersPositionon',
        render: (_, data) => <p style={{display:"flex",gap:"10px"}}>{data?.runnersPosition.map((item, index) => {
          return <div key={index}>
           ({ item?.runner } , {item?.amount || 0}) 
          </div>
        })}</p>,
      }
   
    ];

  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title={'Bets List'} isButton={true} btnTitle={'Close'} clickHandler={handleCancel}/>}
        closable={false}
        onCancel={handleCancel}
        width={innerWidth>=500 ? 1300 : 'auto'}
        style={{height:300}}
        className={theme + " " + style.resultModal}
        forceRender={true}
        footer={[]}
      >
       <div>
       {loadingBetsview? <div className={style.spinDiv}> <Spin /> </div>:
         <Table
         className={style.tableStyle}
         dataSource={bettorData?.length ?  bettorData : []}
         loading={false}
         columns={columns}
       />
       } 
     
       </div>

      </Modal>
    </div>
  );
});

export default memo(BetsViewPopup);
