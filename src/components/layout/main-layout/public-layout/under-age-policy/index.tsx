import { observer } from "mobx-react";
import { memo, useEffect } from "react";
import style from "./style.module.scss";
import CommonNavbar from "@components/common-components/common-navbar";

interface Props {}
const UnderAgePolicy: React.FC<Props> = observer(({ ...props }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.mainWrapper}>
       <CommonNavbar />
      <div className={style.bodyMain}>
        <div className={style.heading}>
          <h1>Underage Policy</h1>
        </div>
        <div className="">
          <p>
            It is illegal for anyone under the age of 18 to open an account or
            gamble with 1obet. We require new members to declare that
            they are over 18 years of age and carry out age verification checks
            on all new accounts.
          </p>
          <p>
            If you are under the age of 18 years (or below the age of majority
            as stipulated in the laws of the jurisdiction applicable to you) or
            if you are not legally able to enter into a binding legal agreement
            with us, you must not use our service.
          </p>
          <p>
            If we suspect that you are or receive notification that you are
            currently under 18 years or were under 18 years (or below the age of
            majority as stipulated in the laws of the jurisdiction applicable to
            you) when you placed any bets through the service your account will
            be suspended to prevent you placing any further bets or making any
            withdrawals from your account. We will then investigate the matter,
            including whether you have been betting as an agent for, or
            otherwise on behalf, of a person under 18 years (or below the age of
            majority as stipulated in the laws of the jurisdiction applicable to
            you). If having found that you: (a) are currently; (b) were under 18
            years or below the majority age which applies to you at the relevant
            time; or (c) have been betting as an agent for or at the behest of a
            person under 18 years or below the majority age which applies:
          </p>
          <ul>
            <li>
              i. all winnings currently or due to be credited to your account
              will be retained;
            </li>
            <li>
              ii. all winnings gained from betting through the service whilst
              under age must be paid to us on demand (if you fail to comply with
              this provision we will seek to recover all costs associated with
              recovery of such sums); and/or
            </li>
            <li>
              iii. any monies deposited in your www.1obet.com account which
              are not winnings will be returned to you.
            </li>
          </ul>
          <p>
            This condition also applies to you if you are over the age of 18
            years but you are placing your bets within a jurisdiction which
            specifies a higher age than 18 years for legal betting and you are
            below that legal minimum age in that jurisdiction.
          </p>
          <p>
            In the event we suspect you are in breach of this policy or that you
            are attempting to rely on it for a fraudulent purpose, we reserve
            the right to take any action necessary in order to investigate the
            matter, including informing the relevant authorities.
          </p>
        </div>
      </div>
    </div>
  );
});

export default memo(UnderAgePolicy);
