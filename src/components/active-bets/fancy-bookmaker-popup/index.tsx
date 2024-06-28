/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import {memo, useEffect, useState} from "react";
import style from "./style.module.scss";
import {Modal} from "antd";
import {useTheme} from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import {useStore} from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import {LOWER_FILLED, LOWER_OUTLINED} from "@utils/const";
import {ConfirmationModal} from "@components/common-components/confirmation-modal";
import {Radio, Space} from 'antd';

interface Props {
  open?: any;
  setIsFancyBookmakerPopOpen?: any;
  data?: any;
  setMatchData?: any;
  setSpecificBet?: any;
}

const FancyBookmakerPopup: React.FC<Props> = observer((
  {
    open,
    setSpecificBet,
    setIsFancyBookmakerPopOpen,
    data,
    setMatchData,
    ...props
  }) => {
  // const [value, setValue] = useState(1);
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const optionArr = [
    {val: data?.eventData?.marketData?.winnerRunnerData, name: 'Confirm this market'},
    {val: '-1', name: 'Cancel this market'},
  ]
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (data?.eventData?.marketData?.winnerRunnerData) {
      const findObj = optionArr?.find((item) => item?.val == (data?.eventData?.marketData?.winnerRunnerData || data?.eventData?.marketData?.winnerInfo))
      setSelectedOption(findObj)
    }
  }, [data?.eventData?.marketData])
  const theme = useTheme();
  const {
    user: {
      LoadSaveMarketIdsDataForWinnerName,
      loadingSaveWinnerNameOfMarketId
    },
  } = useStore(null);

  const handleCancel = () => {
    setMatchData(null)
    setIsFancyBookmakerPopOpen(false)
    setSelectedOption(null);
    setSpecificBet(null)
  }

  const onChange = (e) => {
    const selectedValue = e.target.value;
    const result = optionArr?.find(option => option?.val === selectedValue);
    setSelectedOption(result);
  };

  const handleOptionChange = (id) => {
    setSelectedOption((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      val: id,
      name: optionArr?.find((item) => item?.val == id)?.name || ''
    }));
    // const result = optionArr?.find(option => option?.val == id);
    // setSelectedOption(result);
  }

  const getMarketName = (data) => {
    let marketName = ''
    data?.forEach((item) => {
      if (item?.isfancyOrbookmaker && item?.fancyData) {
        marketName = "Fancy"
      } else if (item?.isfancyOrbookmaker && item?.fancyData == null) {
        marketName = 'Bookmaker'
      } else {
        marketName = item?.runnerName;
      }
    })
    return marketName;
  };

  const saveHandler = async () => {
    const bookmakerPayload = {
      eventId: data?.eventData?.eventId,
      marketId: data?.eventData?.marketData?.marketId,
      runnerId: selectedOption?.val == '-1' ? parseInt(selectedOption?.val) : data?.eventData?.marketData?.winnerRunnerData
    }
    const fancyPayload = {
      eventId: data?.eventData?.eventId,
      marketId: data?.eventData?.marketData?.marketId,
      runnerId: selectedOption?.val == '-1' ? parseInt(selectedOption?.val) : data?.eventData?.marketData?.winnerRunnerData
    }

    if (getMarketName(data?.betsData) == 'Fancy') {
      const res = await LoadSaveMarketIdsDataForWinnerName(fancyPayload);
      if (res?.success) {
        setIsConfirmPopUp(false);
        setIsFancyBookmakerPopOpen(false);
        setSelectedOption(null)
        setSpecificBet(null)
      }
    } else {
      const res = await LoadSaveMarketIdsDataForWinnerName(bookmakerPayload);
      if (res?.success) {
        setIsConfirmPopUp(false);
        setIsFancyBookmakerPopOpen(false);
        setSelectedOption(null)
        setSpecificBet(null)
      }
    }
  }

  const handleConfirmCancel = () => {
    setIsConfirmPopUp(false);
    setIsFancyBookmakerPopOpen(true);
  }
  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title={'Fancy/Bookmaker'} isRightRibbon={<h3
          className={style.rightRibbonRecord}>{["Bookmaker"]?.some(keyword => getMarketName(data?.betsData)?.includes(keyword)) ? getMarketName(data?.betsData) : data?.betsData?.length ? data?.betsData[0]?.fancyData : ''}</h3>}/>}
        closable={false}
        onCancel={handleCancel}
        className={theme + " " + style.resultModal}
        forceRender={true}
        footer={[]}
      >
        <>

          {
            data?.eventData?.marketData == null ?
              <div>
                <span>We not have any result for this market!</span>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => handleCancel()}/>
                </div>
              </div>
              :
              <>
                {/* <Radio.Group onChange={onChange} value={selectedOption?.val}>
        <Space direction="vertical"> */}



                {optionArr?.map((option, index) => (
                  <div key={index}>

                    <label>

                 
                      <input
                        type="radio"
                        name={option?.name}
                        value={option?.val}
                        checked={selectedOption?.val == option?.val}
                        onChange={() => handleOptionChange(option?.val)}
                      />
                      {option?.name}
                    </label>
                  </div>
                ))}
                {/* </Space>
      </Radio.Group> */}

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                  <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => handleCancel()}/>
                  <CustomButton title="Save" variant={LOWER_FILLED} customClass={style.btnStyleOne} onClick={() => {
                    if (selectedOption) {
                      setIsConfirmPopUp(true);
                      setIsFancyBookmakerPopOpen(false);
                    }
                  }}/>
                </div>
              </>
          }
        </>
      </Modal>
      <ConfirmationModal modelTitle="Fancy/Bookmaker Bets" isOpen={isConfirmPopUp} onCancel={handleConfirmCancel}
                         isConfirmDisable={loadingSaveWinnerNameOfMarketId}
                         loadingConfirmBtn={loadingSaveWinnerNameOfMarketId} onConfirm={saveHandler}/>
    </div>
  );
});

export default memo(FancyBookmakerPopup);
