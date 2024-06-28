import { observer } from "mobx-react";
import style from "./style.module.scss";
import { CommonInput } from "@components/common-components/input";
import { useEffect, useState } from "react";
import CustomButton from "@components/common-components/custom-button";
import { useStore } from "@stores/root-store";
import { useLocation} from "react-router-dom";
import { formatLargeNumber, getSingleUrlParam } from "@utils/common-functions";
import { Alert } from "antd";
import TitleBarUpdated from "../common-components/title-bar-updated";
export const SettlementUserDetal = observer(() => {
  const [description, setDescription] = useState('P/L to Cash transfer')
  const [amount, setAmount] = useState(null)
  const [availAmount, setAvailAmount]= useState(null)
  const location = useLocation()
  const [showAlert, setShowAlert] = useState(false)
const id = getSingleUrlParam(location, 'id')
  const {
    user: {
      getSettlementData,
      loadSettlePlAccountData,
      loadingSettlePlAccount,
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleGetSettlement = async()=>{
    const res=  await getSettlementData(id)
    if(res?.success){
      setAvailAmount(res?.results)
      setAmount(0.00)
    }
  }
  useEffect(()=>{
   if(id) handleGetSettlement()
    localStorage.setItem('currentLink', `/users`)
  }, [id])
  const handleSubmit =async()=>{
    const numberAmount =  amount ? Math.abs(Number(amount)) : 0
    
    if(numberAmount > Math.abs(availAmount)) {
      setShowAlert(true)
      return;
    } else{
      console.log(" ============ numberAmount ", numberAmount);
      const payload={
        id,
        description,
        amount: numberAmount
      }
    await loadSettlePlAccountData(payload)
    setShowAlert(false)
    handleGetSettlement()
    
    }
  }
  return (
    <div className={style.mainWrapper}>
      <TitleBarUpdated title={"Settle P/L Account"} />
      <div className={style.cardWrapperInput}>
      {showAlert ? <div className={style.marginTop}>
       <Alert
      message={`Max Amount to Transfer is: ${formatLargeNumber(availAmount, 1)?.toString()?.replace('.0', '') || 0 }`}
      type="error"
    /> 
        </div>: ''}
      <div className={style.marginTop}>
        <div>
          <label><b>Amount</b> </label>
          <div style={{marginTop:"0.5rem"}}>
          <CommonInput className={style.amountInput} placeholder="0.00" value={amount} onChange={(e)=>{
            setAmount(e?.target?.value)
          }} />
          </div>
          <div>Max Amount to Transfer: {formatLargeNumber(availAmount, 1)?.toString()?.replace('.0', '') || 0 } Rs.</div>
        </div>
      </div>
      <div className={style.marginTop}>
        <div>
          <label><b>Description</b></label>
          <div style={{marginTop:"0.5rem"}}>
          <CommonInput value={description} className={style.amountInput} onChange={(e)=>setDescription(e?.target?.value)}/></div>
        </div>
      </div>
      <div  style={{marginTop: '10px', marginBottom:'1rem'}}>
      <CustomButton title="Submit" onClick={handleSubmit} loading={loadingSettlePlAccount} disabled={loadingSettlePlAccount}
      />
      </div>
    </div>
    </div>
  );
});
