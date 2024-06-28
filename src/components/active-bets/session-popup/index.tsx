import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Checkbox, Empty, InputNumber, Modal, Spin } from "antd";
import { useTheme } from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CommonInput } from "@components/common-components/input";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { ConfirmationModal } from "@components/common-components/confirmation-modal";
interface Props {
    open?:any;
    setIsSessionPopOpen?:any;
    data?:any;
    setMatchData?:any;
    setSpecificBet?: any;
}
const SessionPopup: React.FC<Props> = observer(({ open, setIsSessionPopOpen, setSpecificBet, data, setMatchData, ...props }) => {
    const [inputVal, setInputVal] = useState(null)
    const [sessionScore, setSessionScore] = useState(null);
    const [isChecked, setIsChecked] = useState(null);
    const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
    const theme = useTheme();
    const {
      bet: {
        loadSessionScore,
        postSessionScore,
        loadingPostSessionScore
      },
    } = useStore(null);
    const getMarketName = (data) => {
      console.log('this is called', data)
      let marketName = ''
      data?.forEach((item) => {
        if(item?.isfancyOrbookmaker && item?.fancyData){
          marketName = "Fancy"
        }else if(item?.isfancyOrbookmaker && item?.fancyData == null){
          marketName = 'Bookmaker'
        }else{
          marketName = item?.runnerName;
        }
      })
      console.log('runner name')
      return marketName;
    };
  
    const handleGetMarketData = async()=>{
      // console.warn('datadata', data?.betsData?.find((item) => item)?.betSession)
        if(data?.eventData?.eventId && data?.betsData[0]?.betSession){
        const payload = {
          eventId: data?.eventData?.eventId,
          sessionNo: data?.betsData?.length ? data?.betsData[0]?.betSession : ''
        }
        const res = await loadSessionScore(payload)
        setSessionScore(res?.result)
        }
    }
      useEffect(()=>{
        handleGetMarketData()
      }, [data])
    
    const handleCancel = ()=>{
      setMatchData(null)
      setIsSessionPopOpen(false)
      setInputVal(null);
      setIsChecked(false)
      setSpecificBet(null)
    }

    const onChange = (e: CheckboxChangeEvent) => {
      console.log(`checked = ${e.target.checked}`);
      if(e.target.checked){
        setInputVal(-1)
      }
      setIsChecked(e.target.checked)
    };

    const onChangeInput = (event) => {
      // console.warn('eventevent', e.target.value)
      const inputValue = event.target.value;
      const numericValue = inputValue?.replace(/[^0-9]/g, '');
  
      setInputVal(numericValue);
    };
    const saveHandler = async() => {
      console.warn('sessionScore', sessionScore)
      const payload = {
        eventId:sessionScore?.eventId, 
        sessionNo: sessionScore?.sessionNo, 
        score: isChecked ? -1 : parseInt(inputVal)
      }
      const res = await postSessionScore(payload);
      if(res?.success){
        setIsConfirmPopUp(false);
        setIsSessionPopOpen(false);
        setInputVal(null)
        setSpecificBet(null)
      }
    }

    const handleConfirmCancel = () => {
      setIsConfirmPopUp(false);
      setIsSessionPopOpen(true);
    }
    console.log('getMarketName(data?.betsData)?.include', ['KALI', 'JOTA', 'CHOTA', 'BARA', "Fancy", "Bookmaker"]?.some(keyword => getMarketName(data?.betsData)?.includes(keyword)))
  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title={`Session No ${data?.betsData?.length ? data?.betsData[0]?.betSession : ''}`} isRightRibbon={<h3 className={style.rightRibbonRecord}>{getMarketName(data?.betsData)?.includes('Figure') ? 'FIGURE BETS' : ['KALI', 'JOTTA', 'CHOTA', 'BARA', "Fancy", "Bookmaker"]?.some(keyword => getMarketName(data?.betsData)?.includes(keyword))? getMarketName(data?.betsData)+ ' BETS': ''}</h3>}/>}
        closable={false}
        onCancel={handleCancel}
        className={theme + " " + style.resultModal}
        forceRender={true}
        footer={[]}
      >
        <>
        {false ? <Spin className={style.antIconClass} size="large" />:
        <>
        <div style={{marginBottom:10}}>
        <CommonInput value={inputVal} onChange={onChangeInput}/>
        </div>
       <Checkbox checked={isChecked} onChange={onChange}>Cancel session</Checkbox>
       <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
            <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => handleCancel()} />
            <CustomButton title="Save" variant={LOWER_FILLED} customClass={style.btnStyleOne} onClick={() => {
              setIsConfirmPopUp(true);
              setIsSessionPopOpen(false);
              }}/>
        </div>
        </>
        }
        </>
      </Modal>
      <ConfirmationModal isConfirmDisable={loadingPostSessionScore} loadingConfirmBtn={loadingPostSessionScore}  modelTitle="Session Bets" isOpen={isConfirmPopUp} onCancel={handleConfirmCancel} onConfirm={saveHandler}/>
    </div>
  );
});

export default memo(SessionPopup);
