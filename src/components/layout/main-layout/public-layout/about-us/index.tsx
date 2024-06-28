import { observer } from "mobx-react";
import { memo, useEffect } from "react";
import style from "./style.module.scss";
import CommonNavbar from "@components/common-components/common-navbar";
import { CAP_ABOUT_US } from "@utils/const";

interface Props {}
const AboutUs: React.FC<Props> = observer(({ ...props }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.mainContainer}> 
      <CommonNavbar />
      <div className={style.container}>
        <h1 className={style.hOne}>{CAP_ABOUT_US}</h1>
        <div className={style.listStyle}>
        <ul>
          <li>
            1oBet Group is one of the upcoming providers for online gaming
            entertainment across Sports Betting, Online and Live Casino
            operating in the emerging and the regulated markets.
          </li>
        </ul>
        <ul>
          <li>
            We aim to utilize the latest technologies to provide innovative and
            interactive gaming experiences in a secure environment.
          </li>
        </ul>

        <ul>
          <li>
            <b>
              We are innovative, ambitious and passionate about what we do. We
              do it in a credible and responsible way, always aiming for the
              top.
            </b>
          </li>
        </ul>
        <ul>
          <li>
            We only operate in regulated markets where we hold the appropriate
            licenses. We take our responsibilities to customers and our other
            stakeholders seriously and place great emphasis on working to a
            ‘compliance first’ model across the business.
          </li>
        </ul>
        <ul>
          <li>
            Dedicated Customer Service Team: We are here for you every step of
            the way with dedicated customer service managers standing by to
            provide you with a 24/7 top notch customer care service, handling
            any issues quickly and efficiently.
          </li>
        </ul>
        <ul>
          <li>
            <b>
              We have integrated best and secured payment methods on our site
              and a transaction process that is quick, easy enabling our players
              to cash out their winnings quickly and securely.
            </b>
          </li>
        </ul>
        <ul>
          <li>
            Our customers also have peace of mind, knowing that when it’s time
            to collect, they are betting with a well-known reputable company.
          </li>
        </ul>
        <ul>
          We have integrated best and secured payment methods on our site and a
          transaction process that is quick, easy enabling our players to cash
          out their winnings quickly and securely.
        </ul>
    
        </div>
      </div>
      </div>
  );
});

export default memo(AboutUs);
