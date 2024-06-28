import{ useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import { useStore } from "@stores/root-store";
import { Spin } from "antd";
import { getSingleUrlParam } from "@utils/common-functions";
import { useLocation } from "react-router";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

export const FullBetListData = observer(() => {
  const {
    bet: {
      loadMatchedBets,
      getMatchedBetsData,
      loadingDataForBetSlipsData
    },
  } = useStore(null);
  const location = useLocation();
  const [isfirstLoading, setIsFirstLoading] = useState(true)
  const eventId = getSingleUrlParam(location, 'eventId')
const handleLoadMatchBet = async()=>{
  await loadMatchedBets(eventId);
  setIsFirstLoading(false)
}
  useEffect(() => {
    loadMatchedBets(eventId);
    const intervalId = setInterval(()=>{
      handleLoadMatchBet();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [eventId]);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleColorsClass = (item) => {
  if(item?.type===1){
    if(item?.isfancyOrbookmaker && item?.fancyData){
      return style.highlightedOtherRow
    }else {
      return style.highlightedPinkRow
    }
  }else{
    if(item?.isfancyOrbookmaker && item?.fancyData){
      return style.highlightedPinkRow
    }else {
      return style.highlightedOtherRow
    }
  }
}
  return (
    <div className={style.mainWrapper}>
{isfirstLoading ? <Spin className={style.antIconClass} size="large" /> :<>

<TitleBarUpdated title={`UnMatched (0)`} isButton={true} btnTitle={'Refresh'} clickHandler={async()=>await loadMatchedBets(eventId)}/>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <th className={style.widthClassHead}>Runner</th>
            <th className={style.widthClassHead}>Price</th>
            <th className={style.widthClassHead}>Size</th>
            <th className={style.widthClassHead}>Customer</th>
            <th className={style.widthClassHead}>Dealer</th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <TitleBarUpdated title={`Matched (${getMatchedBetsData?.length})`}/>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <th className={style.widthClassHead}>Runner</th>
            <th className={style.widthClassHead}>Price</th>
            <th className={style.widthClassHead}>Size</th>
            <th className={style.widthClassHead}>Customer</th>
            <th className={style.widthClassHead}>Dealer</th>
          </thead>
          <tbody>
            {getMatchedBetsData?.sort((a,b)=>b.createdAt-a.createdAt)?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={handleColorsClass(item)}
                >
                  <td className={style.widthClass}>{item?.runnerId}</td>
                  <td className={style.widthClass}>{item?.price}</td>
                  <td className={style.widthClass}>{item?.size}</td>
                  <td className={style.widthClass}>{item?.bettor}</td>
                  <td className={style.widthClass}>{item?.master}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </>
}
    </div>
  );
});
