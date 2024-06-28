import {useEffect, useState, useRef } from "react";
import Routing from "../../../../router-service";
import { observer } from "mobx-react";
import style from "../../style.module.scss";
import Header from "./header";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import classNames from "classnames";
import { useStore } from "@stores/root-store";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@utils/hooks/useTheme";
import Footer from "@components/layout/Footer";
import useWindowSize from "@utils/hooks/useWindowSize";
import {LOAD_USER_INFO_INTERVAL} from '@utils/constants.js'

const PrivateLayout = observer(() => {
  const { Sider, Content } = Layout;
  const data = useWindowSize().width;
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
const popupRef = useRef(null)
const buttonRef = useRef(null)
  const {
    user: { loadUserInfo, getUserInfo },
  } = useStore(null);

  useEffect(() => {
    loadUserInfo(navigate);
    let intervalId = null;
    if(!(location?.pathname === '/user-bet-form')){
      intervalId = setInterval(()=>loadUserInfo(navigate), LOAD_USER_INFO_INTERVAL);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [location?.pathname, location.search]);
  useEffect(() => {
    function handleClickOutside(event) {
      if(buttonRef.current&&(buttonRef.current.contains(event?.target) )){
        setCollapsed((collapsed)=>!collapsed);
      }
      else if (popupRef.current&&(!popupRef.current.contains(event?.target) ) ) {
        if(data<650 && !open){
          setCollapsed(true);}
        else {
          setCollapsed((collapsed)=>{
            if(collapsed===true) return true
            else return false
          })}
      }
      
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [popupRef, data, open]);
  return (
    <div className={theme}  >
      <Layout className={style.layoutSetting} >
        <Sider
          onFocus={() => setCollapsed(false)}
          style={{position: "fixed", zIndex:5}}
          className={
            !collapsed
              ? classNames(style.mobileHide, style.sidebarSetting)
              : classNames(style.mobileshow, style.sidebarSetting)
          }
          collapsible
          collapsed={collapsed}
         
          ref={popupRef}
        >
          <Sidebar collapsed={collapsed}  setCollapsed={setCollapsed} open={open} setOpen={setOpen}/>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 0 : data < 650 ? 0 : 250 /* Set the appropriate sidebar width */}}>
          <Header buttonRef={buttonRef} setCollapsed={setCollapsed} collapsed={collapsed} openSubMenu={open} />
          <Content className={style.routingPagesContainer}>
            <Routing />
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </div>
  );
});
export default PrivateLayout;
