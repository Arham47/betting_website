import React, { memo, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { observer } from "mobx-react";
import CustomButton from "@components/common-components/custom-button";
import style from "./style.module.scss";
import { useTheme } from "@utils/hooks/useTheme";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
// import TitleBar from "@components/users/common-components/title-bar";
import { useStore } from "@stores/root-store";
import { CommonSelect } from "@components/common-components/select";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import styled from "styled-components";
import {  GiCricketBat } from "react-icons/gi";
interface ModalHandle {
  open?: boolean;
  setOpen?: any;
  data?: any;
  updateDataLoad?: any;
  openConfirmationModel?: boolean;
  setOpenConfirmationModel?: any;
  setIsFirstLoad: any;
  setMatchData:any;
}
const EditMatchsModelsData: React.FC<ModalHandle> = observer(
  ({setMatchData, setIsFirstLoad,setOpenConfirmationModel, setOpen, open, data, updateDataLoad }) => {
    const theme = useTheme();
    const {
      user: {loadSessionFigureBetting,  loadMatchBetAllowed},
    } = useStore(null);
    const {
      user: {loadingUpdateSessionFigureData, updateMatchTypeData, updateSessionFigureScoreData, updateMatchStopReasonOrResumeData, loadingUpdateMatchStopOrResumeReason },
    } = useStore(null);

    const [cricketRadioButton, setCricketRadioButton] = useState(
      data?.matchType
    );
    console.log('data', data)
    const [singleSessionData, setSingleSessionData] = useState(null)
    const [matchStopReason, setMatchStopReason] = useState('')
    const [selectCancelResult, setSelectCancelResult] = useState('')
    const [sessionData, setSession] = useState([])
     const [isClickSession, setIsClickSession] =  useState(false)
     const [score, setScore] = useState('')
    const handleLoadSession=async(id)=>{
      const res = await loadSessionFigureBetting(id)
      if(res?.success){
        setSession(res?.results)
      }
      console.log('called', res)
    }
    useEffect(() => {
      setCricketRadioButton(data?.matchType);
      setMatchStopReason(data?.matchStoppedReason)
      setSelectCancelResult(data?.matchCanceledStatus? 'Yes': 'No')
     if(data?.Id) handleLoadSession(data?.Id)
    }, [JSON.stringify(data)]);
    const handleCancel = () => {
      setOpen(false);
      setSelectCancelResult('')
      setMatchStopReason('')
      setMatchData(null)
      setSession([])
      setScore('')
      setIsClickSession(false)
      setSingleSessionData(null)
    };
    const onChange = (e: RadioChangeEvent) => {
      setCricketRadioButton(e.target.value);
    };
    const handleClick = async () => {
      setIsFirstLoad(0)
      if(cricketRadioButton === 'un-match'){
        const payload = {
          _id: data?._id,
          matchType: '',
          iconStatus: false,
          eventId: data?.Id
        };
        await updateMatchTypeData(payload);
        updateDataLoad('4');
        handleCancel();
      }else {
        const payload = {
          _id: data?._id,
          matchType: cricketRadioButton,
          iconStatus: true,
          eventId: data?.Id
        };
        await updateMatchTypeData(payload);
        updateDataLoad('4');
        handleCancel();
      }
    };
    const optionMatchStop = [
      {
        key: "Rain",
        value: "Rain",
      },
      {
        key: "Bad Light",
        value: "Bad Light",
      },
      {
        key: 'Toss Delayed',
        value: 'Toss Delayed'
      },
      {
        key: "Bad Weather",
        value: "Bad Weather",
      },
      {
        key: "Bad Crowed",
        value: "Bad Crowed",
      },
      {
        key: "Pitch",
        value: "Pitch",
      },
      {
        key: "Flood",
        value: "Flood",
      },
      {
        key: "Temp Suspended ",
        value: "Temp Suspended",
      },
      {
        key: "Innings Break",
        value: "Innings Break",
      },
      {
        key: "Stopped",
        value: "Stopped",
      },
      {
        key: "Unknown",
        value: "Unknown",
      },
    ];
    const cancelResult = [
      {
        key: "Yes",
        value: "yes",
      },
      {
        key: "No",
        value: "No",
      },
    ];
    const handleMatchStopReason = async()=>{
      setIsFirstLoad(0)
      let payload = {
      };
      if(selectCancelResult && !matchStopReason){
        payload={
          _id: data?._id,
          updateType: "canceled",
          matchCanceledStatus:selectCancelResult==='Yes' ? true: false
        }
      }else if(matchStopReason){
       payload={
        _id: data?._id,
        updateType: 'stopped',
        matchStoppedReason: matchStopReason || '',
        matchCanceledStatus:selectCancelResult==='Yes' ? true: false
      }
    }
     const res =  await updateMatchStopReasonOrResumeData(payload)
     if(res?.success){
      updateDataLoad('4');
      setOpenConfirmationModel(false)
      setOpen(false)
      setSelectCancelResult('')
      setMatchStopReason('')
      
     }
    }
    const handleUpdateSession = async()=>{
      const payload = {
        "eventId": singleSessionData?.eventId,
        "session" : singleSessionData?.sessionNo,
        "score" : score
      }
  const res =    await updateSessionFigureScoreData(payload)
  if(res?.success){
    updateDataLoad('4');
    setOpenConfirmationModel(false)
    setOpen(false)
  }     
    }
    return (
      <>
        <Modal
          open={open}
          closable={true}
          className={`${theme} ${style.antModalPlaceBet}`}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <div style={{ marginTop: "30px" }}>
            <h2 className={style.matchWrapper}>{data?.match}</h2>
              <TitleBarUpdated title="Match Type" />
            </div> 
            <div className={style.centerClassWithMargin}>
              <Radio.Group onChange={onChange} value={cricketRadioButton}>
                <Radio value={"TEST"}>Test</Radio>
                <Radio value={"ODI"}>ODI</Radio>
                <Radio value={"T20"}>T20</Radio>
                <Radio value={"T10"}>T10</Radio>
                <Radio value={"un-match"}>Un Match</Radio>
              </Radio.Group>
            </div>
            <div className={style.centerClassWithMargin}>
              <CustomButton
                title={"Update"}
                disabled={!cricketRadioButton}
                onClick={() => {
                  handleClick();
                }}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <TitleBarUpdated title="Match Stop Reason" />
            </div>
            <div
              className={style.centerClassWithMargin}
            >
              <CommonSelect
                className={style.commonSelectBox}
                data={optionMatchStop}
                defaultValue={''}
                value={matchStopReason}
                onChange={(e) => setMatchStopReason(e)}
                isModel = {true}
                allowClear                
              />
            </div>
            <div className={style.centerClassWithMargin} style={{gap: '15px'}}>
              <CustomButton
                title={"Update"}
                // customClass={style.btnStyle}
                className={style.updateBtn}
                disabled={!matchStopReason}
                onClick={() => {
                  handleMatchStopReason();
                }}
              />
              <CustomButton
                title={"Resume The Match"}
                // customClass={style.btnStyle}
                onClick={() => {
                  setOpen(false)
                  setOpenConfirmationModel(true)
                }}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <TitleBarUpdated title="Cancel Result / Match" />
            </div>
            <div
              className={style.centerClassWithMargin}
            >
              <CommonSelect
                className={style.commonSelectBox}
                data={cancelResult}
                value={selectCancelResult}
                defaultValue={''}
                onChange={(e) => setSelectCancelResult(e)}
                isModel = {true}
                allowClear
              />
            </div>
            <div className={style.centerClassWithMargin}>
              <CustomButton
                title={"Update"}
                // customClass={style.btnStyle}
                disabled={!selectCancelResult}
                onClick={() => {
                  handleMatchStopReason();
                }}
              />
            </div>
            {sessionData?.length ?
<>
            <TitleBarUpdated title="Session Scores" />
            {isClickSession? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop:'10px'}}>
             <label>Score:</label> <Input value={score} style={{width: '50%'}} onChange={(e)=>setScore(e?.target?.value)}/>
              <CustomButton title={'Update'} loading={loadingUpdateSessionFigureData} onClick={()=>handleUpdateSession()}/>
            </div>: ''
          }
            <div style={{ marginTop: "20px" }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px',flexWrap: 'wrap'}}>
           {sessionData?.map((item, index)=>  <div onClick={()=>{
            setSingleSessionData(item)
            setScore(item?.score?.toString())
            setIsClickSession(true)}} key={index} className={style.chottaBarraWrapper}>
                      <SessionScore bg={"#FFB2AF"}  >
                        {/* <div>Session</div> */}
                        <div>{` ${item?.sessionNo}`}</div>
                     
                      </SessionScore>
                      <SessionScore bg={"#8DD2F0"} >
                      <div>Score </div>
                      <div style={{display: 'flex', alignItems: 'center'}}>{` ${item?.score}`}<span><GiCricketBat className={style.iconForTable} /></span></div>
                      </SessionScore>
                    </div>
           ) }
              </div>
              </div></>
              : ''}
          </div>
        </Modal>
      </>
    );
  }
);

export default memo(EditMatchsModelsData);
const SessionScore = styled.div<{ bg?: any }>`
  background-color: ${(p) => p?.bg};
  display:flex;
  flex-direction:column;

`;