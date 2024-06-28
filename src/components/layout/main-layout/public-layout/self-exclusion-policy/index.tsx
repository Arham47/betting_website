import { observer } from "mobx-react";
import { memo, useEffect } from "react";
import style from "./style.module.scss";
import CommonNavbar from "@components/common-components/common-navbar";

interface Props {}
const SelfExclusionPolicy: React.FC<Props> = observer(({ ...props }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.mainContainer}>
      <CommonNavbar />
      <div className={style.container}>
        <h1 className={style.hOne}>Self-exclusion Policy</h1>
        <div className={style.listStyle}>
          <ul>
            If you feel you are at risk of developing a gambling problem or
            believe you currently have a gambling problem, please consider using
            Self-Exclusion which prevents you gambling with Bet99 for a
            specified period of 6 months, 1 year, 2 years, 5 years or
            permanently.
          </ul>
          <ul>
            If you want to stop playing for other reasons, please consider a
            Time-Out or using Account Closure.
          </ul>
          <h1 className={style.hOneTag}>What happens when you self-exclude?</h1>
          <ul>
            During a period of Self-Exclusion you will not be able to use your
            account for betting, although you will still be able to login and
            withdraw any remaining balance. It will not be possible to re-open
            your account for any reason, and Bet99 will do all it can to detect
            and close any new accounts you may open.
          </ul>
          <h1 className={style.hOneTag}>Next steps</h1>
          <ul>
            Whilst we will remove you from our marketing databases, we also
            suggest that you remove Bet99 from your notifications and
            delete/uninstall all Bet99 apps, downloads and social media links.
            You may also wish to consider installing software that blocks access
            to gambling websites, click here for more information.
          </ul>
          <ul>
            We recommend that you seek support from a problem gambling support
            service to help you deal with your problem.
          </ul>
          <ul>
            You can self-exclude your account in the My Gambling Controls
            section of Members by choosing Self-Exclusion.
          </ul>
          <h1 className={style.hOneTag}>Self-Exclusion Notice</h1>
          <ul>
            Should you opt to self-exclude from Bet99, we strongly recommend
            that you seek exclusion from all other gambling operators you have
            an account with.
          </ul>
          <ul>
            You can self-exclude by contacting other gambling operators directly
            or you can exclude from other licensed operators by completing a
            Self-Exclusion Notice form.
          </ul>
          <ul>
            Once completed the Self-Exclusion Notice form should be submitted to
            the nominated site, sports bookmaker or betting exchange operator.
          </ul>
         
        </div>
      </div>
    </div>
  );
});

export default memo(SelfExclusionPolicy);
