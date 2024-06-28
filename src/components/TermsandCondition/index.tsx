import { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "@stores/root-store";
import style from "./style.module.scss";
import { Empty, Spin } from "antd";
import { CAP_TERMS_AND_CONDITIONS } from "@utils/const";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

export const TermsAndCondtion = observer(() => {
  const {
    setting: {
      getTermsAndConditionsContent,
      loadingGetTermsAndCondition,
      loadTermsAndCondition,
    },
  } = useStore(null);
  const handleLoadTermsAndConditions = async () => {
    await loadTermsAndCondition();
  };
  useEffect(() => {
    handleLoadTermsAndConditions();
  }, []);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.wrapper}>
       <TitleBarUpdated
          title={CAP_TERMS_AND_CONDITIONS}
        />
      {loadingGetTermsAndCondition ? (
        <div>
          <Spin className={style.antIconClass} size="large" />{" "}
        </div>
      ) : (
        getTermsAndConditionsContent ? <div
          className={style.htmlContent}
          dangerouslySetInnerHTML={{
            __html: getTermsAndConditionsContent || "",
          }}
        />
        : 
        <div className={style.emptyClass} style={{marginTop: '10px'}}>
        <Empty/>
        </div> 
      )}
    </div>
  );
});
