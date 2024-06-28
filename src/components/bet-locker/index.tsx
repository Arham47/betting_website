import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import Checkbox from "antd/es/checkbox";
import FooterLogos from "@components/footer-logos";
import { useStore } from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { Empty } from "antd";
const BetLocker = observer(() => {
  const [allMarketTypesData, setAllMarketTypesData] = useState([]);
  const [blockedMarkets, setBlockedMarket] = useState([])
  const [blockedSubMarkets, setBlockeSubMarkets] = useState([])
  const {
    user: {
      loadAllMarketTypes,
      updateAllMarketTypes,
      isLoadingUpdateBetLocker,
      loading,
      loadingbetLocker,
    },
  } = useStore(null);
  const handleLoadAllMarket =  async()=>{
    const res = await  loadAllMarketTypes();
    if(res?.success){
      setBlockedMarket(res?.results?.blockedMarkets)
      setBlockeSubMarkets(res?.results?.blockedSubMarkets)
      const data = [...res?.results?.markets]
      setAllMarketTypesData(data)
    }
  }
  useEffect(() => {
    handleLoadAllMarket()
  }, []);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleCheckAllCheckBox = (e?: any, index?: any, Id?:string) => {
    const tmpAllMarketTypes =  JSON.parse(JSON.stringify(allMarketTypesData));;
    const temp = tmpAllMarketTypes[index];
    if (temp?.status > 0) {
      tmpAllMarketTypes[index]["status"] = 0;
    } else {
      tmpAllMarketTypes[index]["status"] = 1;
    }
    setAllMarketTypesData(tmpAllMarketTypes);
    let tempBlockedMarket = [...blockedMarkets]
      const data = tempBlockedMarket?.find((z) => z === Id);
      if(data){
        const filterData = tempBlockedMarket?.filter((z) => z !== Id);
        tempBlockedMarket = filterData;
        setBlockedMarket(filterData);
      }else{
        setBlockedMarket([...tempBlockedMarket, Id]);
        tempBlockedMarket = [...tempBlockedMarket, Id];
      }

  };
  const handleCheckBox = (index?: any, idx?: any, Id?:any) => {
    const tmpAllMarketTypes = JSON.parse(JSON.stringify(allMarketTypesData));
    if (tmpAllMarketTypes[index]["subMarkets"][idx]["status"] === 0) {
      tmpAllMarketTypes[index]["subMarkets"][idx]["status"] = 1;
    } else {
      tmpAllMarketTypes[index]['subMarkets'][idx]['status'] = 0;
    }
    const parentObj = tmpAllMarketTypes[index];
    tmpAllMarketTypes[index] = parentObj;
    setAllMarketTypesData(tmpAllMarketTypes);
    let tempBlockedMarket = [...blockedSubMarkets]
    const data = tempBlockedMarket?.find((z) => z === Id);
    if(data){
      const filterData = tempBlockedMarket?.filter((z) => z !== Id);
      tempBlockedMarket = filterData;
      setBlockeSubMarkets(filterData);
    }else{
      setBlockeSubMarkets([...tempBlockedMarket, Id]);
      tempBlockedMarket = [...tempBlockedMarket, Id];
    }
  };
  console.log(blockedSubMarkets)
  const onUpdateBetLocker = () => {
    console.log('blockedMarkets', blockedMarkets, 'submarket', blockedSubMarkets)
    const payload = {
      blocked : {
        subMarkets : blockedSubMarkets,
        markets: blockedMarkets
    }
    };
    updateAllMarketTypes(payload).then((res) => {
      res?.success && handleLoadAllMarket();
    });
  };
  const betLockCheckBoxes = () => (
    <div className={style.mainBetLockDiv}>
      {!loadingbetLocker ?( (
       allMarketTypesData?.length  ?
        <>
          {allMarketTypesData?.map((item, index) => {
            return (
              <div key={index} style={{textTransform:'capitalize'}}>
                <Checkbox
                  onChange={(e) => handleCheckAllCheckBox(e, index, item?.Id)}
                  checked={item?.status || false}
                >
                  <span style={{fontWeight:'bold'}}>{item?.marketName}</span>
                </Checkbox>
                {item?.subMarkets?.map((ite, idx) => {
                  return (
                    <div className={style.childCheckbox}>
                      <Checkbox
                        onChange={(e) => {
                          handleCheckBox(index, idx, ite?.Id);
                        }}
                        checked={ite?.status > 0 ? true : false}
                      >
                        {ite?.name}
                      </Checkbox>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div>
            <CustomButton
              title={"Save"}
              onClick={onUpdateBetLocker}
              customClass={style.btnStyle}
              loading={isLoadingUpdateBetLocker}
            />
          </div>
        </>
        :
        <div  className={style.emptyClass} style={{marginTop: '10px'}}>
        <Empty/> 
        </div>
      )) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );


  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <div>
        <div>
          <TitleBarUpdated 
            title={'Allowed Market Types'}
            className={style.belockTitleBar}
            />
        </div>
        {
        betLockCheckBoxes() 
        }
        </div>
       {allMarketTypesData?.length ?  <FooterLogos className={style.betLocksFooter} />: ''}
      </div>
    </div>
  );
});

export default memo(BetLocker);
