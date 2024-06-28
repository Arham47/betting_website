import { memo, useEffect, useState, useRef } from "react";
import BetterRouting from "../../../../../src/better-router-service"
import { observer } from "mobx-react";
import style from "../../style.module.scss";
import { Layout } from "antd";
import classNames from "classnames";
import { useStore } from "@stores/root-store";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@utils/hooks/useTheme";
import useWindowSize from "@utils/hooks/useWindowSize";
import HeaderBetter from "./header";
import SideBarBetter from "./SideBarBetter";
const PrivateLayoutBetter = observer(() => {
  const { Sider, Content } = Layout;
  const data = useWindowSize().width;
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

const popupRef = useRef(null)
const buttonRef = useRef(null)
  const {
    user: { loadUserInfo },
  } = useStore(null);
  useEffect(() => {
      loadUserInfo(navigate);
  }, [location?.pathname]);
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
  useEffect(() => {
    if(location.pathname === '/related-games'){
      setCollapsed(true);
    }
  },[location.pathname])
  return (
    <div className={theme}  >
      <Layout className={style.layoutSetting} >
        <Sider
          onFocus={() => setCollapsed(false)}
          style={{position:"fixed", zIndex:5}}
          className={
            !collapsed
              ? classNames(style.mobileHide, style.sidebarSetting)
              : classNames(style.mobileshow, style.sidebarSetting)
          }
          collapsible
          collapsed={collapsed}
         
          ref={popupRef}
        >
          <SideBarBetter collapsed={collapsed}  setCollapsed={setCollapsed}  open={open} setOpen={setOpen}/>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 0 : data < 650 ? 0 : 250 /* Set the appropriate sidebar width */ }}>
          <HeaderBetter buttonRef={buttonRef} setCollapsed={setCollapsed} collapsed={collapsed} openSubMenu={open} />
          <Content className={style.routingPagesContainer}>
            <BetterRouting />
          </Content>
          {/* <Footer/> */}
        </Layout>
      </Layout>
    </div>
  );
});
export default memo(PrivateLayoutBetter);
