import { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "@stores/root-store";
import style from "./style.module.scss";
import { Empty, Spin } from "antd";
import { CAP_POLICY, CAP_PRIVACY } from "@utils/const";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
export const PrivacyPolicy = observer(() => {
  const {
    setting: {
      getPrivacyPolicyContent,
      getLoadingPrivacyPolicy,
      loadPrivacyPolicy,
      loadingGetPrivacyPolicy
    },
  } = useStore(null);
  const handlePrivacyPolicy = async () => {
    await loadPrivacyPolicy();
  };
  useEffect(() => {
    handlePrivacyPolicy();
  }, []);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.wrapper}>
       <TitleBarUpdated
          title={`${CAP_PRIVACY} ${CAP_POLICY}`}
        />
      {loadingGetPrivacyPolicy ? (
        <div>
          <Spin className={style.antIconClass} size="large" />{" "}
        </div>
      ) : (
        getPrivacyPolicyContent ? <div
          className={style.htmlContent}
          dangerouslySetInnerHTML={{ __html: getPrivacyPolicyContent || "" }}
        />
        : 
        <div className={style.emptyClass} style={{marginTop: '10px'}}>
        <Empty/>
        </div>
      )}
    </div>
  );
});
