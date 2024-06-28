import { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "@stores/root-store";
import style from "./style.module.scss";
import { Empty, Spin } from "antd";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
export const RulesRegulation = observer(() => {
  const {
    setting: {
      getRulesRegulation,
      loadingRulesRegulation,
      loadRulesRegulation,
      
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleLoadRulesAndRegulation = async () => {
  await loadRulesRegulation();
};
useEffect(() => {
  handleLoadRulesAndRegulation();
}, []);
  return (
    <div className={style.wrapper}>
      <TitleBarUpdated
        title={"Rules Regulation"}
      />
      {loadingRulesRegulation ? (  
        <div style={{display:'flex', justifyContent:'center', marginTop:10}}>
          <Spin className={style.antIconClass} size="large" />{" "}
        </div>
      ) : (
        getRulesRegulation ?  <div
          className={style.htmlContent}
          dangerouslySetInnerHTML={{ __html: getRulesRegulation }}

        />
        : 
        <div className={style.emptyClass} style={{marginTop: '10px'}}>
        <Empty/>
        </div>
      )}
    </div>
  );
});
