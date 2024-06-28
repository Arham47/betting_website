import style from "./style.module.scss";
import { observer } from "mobx-react";
import { useStore } from "@stores/root-store";
import { useLocation } from "react-router";
import { useEffect } from "react";
import FastMarquee from "react-fast-marquee";
import { AiOutlineWhatsApp } from "react-icons/ai";
const Footer = observer(() => {
  const {
    user: { loadBetNews, getBetNewsData },
  } = useStore(null);
  const location = useLocation()
  const styles = { background: `linear-gradient(to right,#00c5fb, 0%, 100%)` };
  const handleFunds = async () => {
    await loadBetNews();
  };

  useEffect(() => {
    if(!getBetNewsData?.text) handleFunds();
  }, [location?.pathname]);
  return (
    <div>
      <div className={style.Footercontent} style={{ right: "0px", ...styles }}>
        <footer className={style.footerClass}>
          <FastMarquee pauseOnHover={true} speed={50}>{getBetNewsData?.text ? `${getBetNewsData?.text?.replaceAll('- Customer complain cell 24 hours', '')?.replaceAll('System under Maintenance -', '')}` : ''}</FastMarquee>
        </footer>
      </div>
    </div>
  );
});

export default Footer;
{ /*whatsapp code  <a href="https://api.whatsapp.com/send?phone=+601116869642&text=Welcome%20to%201obet.com" target="_blank" rel="noreferrer" style={{color:'green', textDecoration:'underline', paddingLeft:6}}><AiOutlineWhatsApp style={{fill:"green", paddingRight:3, fontSize:16}}/>+601116869642</a> */}