/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Empty, Modal, Spin } from "antd";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import { FaTrophy } from "react-icons/fa";
import { truncate } from "@utils/common-functions";
import useWindowSize from "@utils/hooks/useWindowSize";
interface Props {
    open?:any;
    setOpen?: any;
    setResultModalOpen?:any;
    setConformModal?:any;
    resultHandler?:any;
    data?:any;
    setMatchData?: any;
    setIsCloseModal?: any;
    setIsClose?: any;
    setWinnerPayload?:any;
    selectedOptions?:any;
    setSelectedOptions?:any;
    setSpecificBet?:any;
}
const ResultModal: React.FC<Props> = observer(({setIsClose, selectedOptions, setSpecificBet, setSelectedOptions, setWinnerPayload, setIsCloseModal, data, setMatchData, open, setOpen, setResultModalOpen, setConformModal,resultHandler, ...props }) => {
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
    const innerWidth = useWindowSize().width
        const handleGetMarketData = async()=>{
        if(data?.eventData?.eventId){
        const payload = {
          eventId: data?.eventData?.eventId
        }
        const res = await loadGetMarketIDSData(payload)
        if(res?.results){
          let dummy = [];
          const marketData = res?.results?.filter((item) => item?.marketId === data?.eventData?.marketData?.marketId);
          console.warn('marketData', marketData)
          marketData?.forEach((k) => {
            k?.runners?.forEach((item) => {
              if(item?.runnerName == k?.winnerInfo || item?.SelectionId == k?.winnerRunnerData){
                setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [k?.marketName]: item?.SelectionId,
                // [market?.marketName]: selectionID,
                [k?.marketName+'marketId'] : k?.marketId,
              }));
              }else if(k?.winnerInfo === -1){
                setSelectedOptions((prevSelectedOptions) => ({
                  ...prevSelectedOptions,
                  [k?.marketName]: k?.winnerInfo,
                  [k?.marketName+'marketId'] : k?.marketId,
                }));
              }
            })
            const runnersData = [...k?.runners]
            runnersData?.push({runnerName:'Cancel Market', marketName:k?.marketName, SelectionId:-1})
            dummy?.push({...k, runners:runnersData})
          })
           setOptionsData(dummy);
        }
        }
    }
      useEffect(()=>{
        handleGetMarketData()
      }, [data])
    
    const handleCancel = ()=>{
      setMatchData(null)
      setOpen(false);
      setSelectedOptions({});
      setSpecificBet(null)
    }

    const handleOptionChange = (market, selectionID) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [market?.marketName]: selectionID,
        [market?.marketName+'marketId'] : market?.marketId,
      }));
    };
    const newSaveHandler = (market) => {
      // console.warn('this is called', selectedOptions, 'market?.marketId', market?.marketId, 'selectedOptions[market?.marketName+', selectedOptions[market?.marketName+'marketId'], 'market?.marketName', market?.marketName, 'market?.marketName', market)
      // console.warn('second console',market?.marketId == selectedOptions[market?.marketName],'=========', market?.marketName, 'selectedOptions[market?.marketName]', selectedOptions[market?.marketName] )
      if(market?.marketId == selectedOptions[market?.marketName+'marketId'] || market?.marketId == selectedOptions[market?.marketName]){
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
        title={<TitleBarUpdated title="Announce Winner" isRightRibbon={<h3 className={style.rightRibbonRecord}>{innerWidth>=500 ? truncate(data?.eventData?.marketData?.marketName ||'', 23) : data?.eventData?.marketData?.marketName ||'' }</h3>}/>}
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
                  checked={selectedOptions[market?.marketName] == option?.SelectionId}
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
