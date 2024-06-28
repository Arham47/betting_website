import { Button, Col, Row } from "antd";
import { observer } from "mobx-react";
import style from "./style.module.scss";
import RollingSlots from "@assets/images/rolling-slots.png"; 
import BcGames from "@assets/images/bc-games.png";
import MarkupGaming from "@assets/images/markup-gaming.png";
import GamblingCommission from "@assets/images/gambling-commission.png";
import Casino from "@assets/images/888-casino.png";
import SpinPalace from "@assets/images/spin-palace.png";
import Barcrest from "@assets/images/barcrest.png";
import classNames from "classnames";
import VirqinGames from "@assets/images/virqin-games.png";
import CasinoWorld from "@assets/images/casino-world.png";
import PaddyPowerGames from "@assets/images/paddypower-games.png";
import React, { memo } from "react";
import FastMarquee from "react-fast-marquee";


export interface betLockerProps {
  title?: string;
  icon?: string;
  className?: string; 
}
const FooterLogos = observer(({className }: betLockerProps ) => {
  return (
    // <Row>
    <div className={style.footerBackgroundColor}>
   <FastMarquee speed={50} pauseOnHover pauseOnClick>
      <div className={classNames(style.betsFooter, className)}> 
    
    <div className={style.footerDiv} >
      <Button className={style.footerbtn}>
        <img src={RollingSlots} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={BcGames} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}> 
        <img src={MarkupGaming} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={GamblingCommission} className={style.footerImg}  />
      </Button>
      <Button className={style.footerbtn}>
        <img src={Casino} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={SpinPalace} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={Barcrest} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={VirqinGames} className={style.footerImg} />
      </Button>

      <Button className={style.footerbtn}>
        <img src={CasinoWorld} className={style.footerImg} />
      </Button>
      <Button className={style.footerbtn}>
        <img src={PaddyPowerGames} className={style.footerImg} />
      </Button>
    </div>
  </div>
  </FastMarquee>
  </div>
    // </Row>
  );
}); 

export default memo(FooterLogos);
