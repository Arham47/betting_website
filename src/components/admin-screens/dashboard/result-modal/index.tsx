import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Empty, Modal, Spin } from "antd";
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
// import TitleBar from "@components/users/common-components/title-bar";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import { FaTrophy } from "react-icons/fa";
interface Props {
    open?:any;
    setOpen?: any;
    setResultModalOpen?:any;
    setConformModal?:any;
    resultHandler?:any;
    data?:any;
    setMatchData?: any;
    setIsCloseModal?: any;
    // selectedOption?: any;
    // setSelectedOption?: any;
    setIsClose?: any;
    setWinnerPayload?:any;
    selectedOptions?:any;
    setSelectedOptions?:any;
}
const ResultModal: React.FC<Props> = observer(({setIsClose, selectedOptions, setSelectedOptions, setWinnerPayload, setIsCloseModal, data, setMatchData, open, setOpen, setResultModalOpen, setConformModal,resultHandler, ...props }) => {
  // const optionsDel = open?.runners?.length ? [...open?.runners]?.concat([{SelectionId:0, runnerName:'Draw'}]) : [{SelectionId:0, runnerName:'Draw'}];
    // const [selectedOption, setSelectedOption] = useState(null);
    const [optionsData, setOptionsData] = useState(null)
    const theme = useTheme();
    const {
      bet: {
        loadGetMatchSettlements,
        loadingMatchSettlementData,
        loadGetMarketIDSData,
        loadingGetMarketIdsData,
      },
    } = useStore(null);
    const handleGetMarketData = async()=>{
        if(data?.Id){
        const payload = {
          eventId: data?.Id
        }
        const res = await loadGetMarketIDSData(payload)
        if(res?.results){
          const data = res?.results;
          // const dummyArray =[]
          data?.forEach((k) => {
            k?.runners?.forEach((item) => {
              if(item?.SelectionId === k?.winnerInfo){
                setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [k?.marketName]: k?.winnerInfo,
              }));
              }
            })
          })
  
           setOptionsData(data);
          //  console.log('options', options)
        }
        }
    }
      useEffect(()=>{
        handleGetMarketData()
      }, [data])
    
    // const saveHandler = () => {
    //   setIsCloseModal(true)
    //   setOpen(false)
    //   setIsClose(true)
    // }
    const handleCancel = ()=>{
      setMatchData(null)
      setOpen(false);
      setSelectedOptions({});
    }

 

    // const onChange = (marketId, e) => {
    //   const selectedValue = e.target.value;
    //   console.warn('selectedValue', selectedValue)
    //   optionsData?.forEach(option => {
    //     if(option?.marketId === marketId){
    //       option?.runners?.forEach((k) => {
    //         if(k?.customId === selectedValue){
    //           console.warn('okkkkkkkkk', {...k, marketId: marketId})
    //           setSelectedOption(k);
    //         }
    //       })
    //     }
    //   })
    //   // setSelectedOption(selectedOption);
    // };



    const handleOptionChange = (market, selectionID) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [market?.marketName]: selectionID,
        [market?.marketName+'marketId'] : market?.marketId,
      }));
    };
    const newSaveHandler = (market) => {
      if(market?.marketId === selectedOptions[market?.marketName+'marketId']){
        const payload = {
          runnerId:selectedOptions[market?.marketName],
          eventId:market?.eventId,
          marketId:selectedOptions[market?.marketName+'marketId']
        }
        setWinnerPayload(payload);
        setIsCloseModal(true)
        setOpen(false)
        setIsClose(true)
      }
    }

    // const isTypeComplete = (type) => {
    //   return selectedOptions[type] !== undefined;
    // };
  
    // const allTypesComplete = () => {
    //   for (const option of optionsData) {
    //     if (!isTypeComplete(option.type)) {
    //       return false;
    //     }
    //   }
    //   return true;
    // };

  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title="Announce Winner"/>}
        closable={false}
        onCancel={handleCancel}
        // className={stryle.modelStyle}
        // onOk={handlelSubmit}
        className={theme + " " + style.resultModal}
        // onCancel={handleCancel}
        forceRender={true}
        footer={[]}
      >
        <>
        {loadingGetMarketIdsData ? <Spin className={style.antIconClass} size="large" />:
       
        <>
       {optionsData?.length ? optionsData?.map((market) => {
        // console.warn('market', market)
        return <div key={market.marketId}>
        <h5> {market?.marketName}</h5>
        {market?.runners?.map((option) => (
            <div key={option?.SelectionId}>

              
              <label>
                <input
                  type="radio"
                  name={option?.marketName}
                  value={option?.SelectionId}
                  checked={selectedOptions[market?.marketName] === option?.SelectionId}
                  onChange={() => handleOptionChange(market, option?.SelectionId)}
                />
                {option?.runnerName}{selectedOptions[market?.marketName] === option?.SelectionId ? <FaTrophy className={style.trophyColor}/> : ''}
              </label>
            </div>
          ))}
          <div style={{display:'flex', justifyContent:'flex-end', gap:4}} className={style.bothBtnWrapper}>
          <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => handleCancel()}  customClass={style.canCelBtn}/>
          <CustomButton disabled={!optionsData?.length} title="Save" variant={LOWER_FILLED} customClass={style.btnStyleOne} onClick={() => newSaveHandler(market)}/>
          </div>
        {/* <Radio.Group onChange={(e) => onChange(market?.marketId, e)} value={selectedOption?.customId}>
        <Space direction="vertical">
          {market?.runners?.map((option, index) => (
            <Radio key={index} value={option?.customId}>
              {option?.runnerName}
            </Radio>
          ))}
        </Space>
      </Radio.Group> */}
      </div>
      })
      :
      <Empty className={style.emptyBox}/>
    }
        <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
            {/* <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => handleCancel()}  customClass={style.btnStyle}/>
            <CustomButton disabled={!optionsData?.length} title="Save" variant={LOWER_FILLED} customClass={style.btnStyleOne} onClick={saveHandler}/> */}
        </div></>}
        </>
      </Modal>
    </div>
  );
});

export default memo(ResultModal);
