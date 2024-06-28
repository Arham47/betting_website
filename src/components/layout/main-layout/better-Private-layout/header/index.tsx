import { constRoute } from "@utils/route";
import { Card, Drawer, DrawerProps, Dropdown, Menu, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DownOutlined, 
  MenuOutlined,
} from "@ant-design/icons";
import useWindowSize from "@utils/hooks/useWindowSize";
import style from "../../../style.module.scss";
import { observer } from "mobx-react";
import { Popover, Button } from "antd";
import ProfileImage from "@assets/images/profile-image.png";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {
  CAP_HELLO,
  LOWER_TOKEN,
} from "@utils/const";
import useFitText from "use-fit-text";
import { resetStore, useStore } from "@stores/root-store";
import { formatLargeNumber, getUserOnRole, onLogOutClearAll } from "@utils/common-functions";
import FastMarquee from "react-fast-marquee";
import ToggleTheme from "./toggle-theme";
import { useTheme } from "@utils/hooks/useTheme";

const HeaderBetter = observer(({ setCollapsed, buttonRef, openSubMenu }: any) => {
  const { fontSize, ref } = useFitText();
  const navigate = useNavigate();
  const theme = useTheme();
  const innerWidth = useWindowSize().width;
  const location = useLocation();
  const {
    user: { getUserInfo, loadSingleUser, loadBetNews, getBetNewsData },
  } = useStore(null);
  const onLogout = () => {
    onLogOutClearAll(navigate)
    localStorage.setItem('logoutStatus', 'true')
  };
  const data = useWindowSize().width;
  useEffect(() => {
    if (data < 650) {
      if(openSubMenu)setCollapsed(false);
     else  setCollapsed(true);
    }
    else{
      setCollapsed(false)
    }
  }, [data, openSubMenu]);
  const handleFunds = async () => {
     await loadBetNews();
  };
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate(constRoute.login);
    }
  }, []);
  useEffect(() => {
    if(!getBetNewsData?.text)  handleFunds();
  }, [location?.pathname]);

  const dropdownMenu = (
    <Menu className="nav-dropdown">
      <Menu.Item 
      onClick={()=>{
        onClose();
        navigate(`${constRoute?.ledger}/${String(getUserInfo?._id)}`);
      }}
      >
        {/* <UserOutlined style={{ marginRight: "5px" }} /> */ }
        Statement
      </Menu.Item>
      <Menu.Item  onClick={()=>{
        onClose();
        navigate(`${constRoute.betterResults}`);
      }}>
        {/* <UserOutlined style={{ marginRight: "5px" }} /> */}
        Result
      </Menu.Item>
      <Menu.Item 
      onClick={()=>{
        onClose();
        navigate(`${constRoute?.customerProfitLoss}/${getUserInfo._id}`, {state: {isShowButton: true}})
      }}
      >
        {/* <UserOutlined style={{ marginRight: "5px" }} /> */}
        Profit Loss
      </Menu.Item>
      <Menu.Item
      onClick={()=>{
        onClose();
        navigate(`${constRoute?.customerBetList}/${getUserInfo._id}`, {state: {isShowButton: true}})
      }}
      >
        {/* <UserOutlined style={{ marginRight: "5px" }} /> */}
        Bet History
      </Menu.Item>
      <Menu.Item
        onClick={async () => {
            const payload = { id: getUserInfo?._id };
            const res = await loadSingleUser(payload);
            if (res?.success) {
              onClose();
              navigate(
                `${constRoute?.profile}/${res?.results?._id}`
              );
            }
        }}
      >
        {/* <UserOutlined style={{ marginRight: "5px" }} /> */}
        Profile
      </Menu.Item>
     {/* {getUserInfo?.role === '0' && <Menu.Item
        onClick={() => {
          navigate(constRoute?.setting);
        }}
      >
        <SettingOutlined style={{ marginRight: "5px" }} />
        Setting
      </Menu.Item>} */}
      <Menu.Item onClick={onLogout}>
        {/* <LogoutOutlined style={{ marginRight: "5px" }} /> */}
        Logout
      </Menu.Item>
    </Menu>
  );

  const styles = { background: `linear-gradient(to right,#00c5fb, 0%, 100%)` };

  const notificationsContent = () => {
    return (
      <Card
        title="Notifications"
        extra={<a href="#">Mark all as read</a>}
        className={style.notificationCard}
      >
        <div className={style.mainDiv}>
          <div className={style.notificationProfile}>
            <div className={style.notificationImage}>
              <div className={style.avator}>
                <img src={ProfileImage} alt={"Profile Img"} />
              </div>
              <div>
                <div className={style.employeeName}>
                  Corina McCoy
                  <p>punch in for today.</p>
                </div>
              </div>
            </div>
            <div className={style.punchTime}>20 seconds ago</div>
          </div>
          <div className={style.notificationProfile}>
            <div className={style.notificationImage}>
              <div className={style.avator}>
                <img src={ProfileImage} alt={"Profile Img"} />
              </div>
              <div>
                <div className={style.employeeName}>
                  Corina McCoy
                  <p>punch in for today.</p>
                </div>
              </div>
            </div>
            <div className={style.punchTime}>20 seconds ago</div>
          </div>
        </div>
      </Card>
    );
  };
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(innerWidth > 850){onClose()}
  }, [innerWidth]);

  return (
    <div>
      <div
        className={style.headerContainer}
        style={{ flexWrap: 'wrap', right: "0px", ...styles }}
      >
        {/* Logo */}
        <Drawer
          // title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          width={200}
          className={`${theme} ${style.drawerWrapper}`} 
          contentWrapperStyle={{ maxHeight:'100vh'}}
          key={placement}
        >
          <div className={style.themeBtnContaienrForSideDrawe}>
            <ToggleTheme onCloseDrawer={onClose}/>
            <Popover
              content={notificationsContent}
              placement="bottomRight"
              trigger="click"
              overlayClassName="noti-wrapper"
            >
              {/* <Button
                type="text"
                shape="circle"
                icon={<BellOutlined className={(localStorage.getItem(LOWER_THEME)  === LOWER_DARK_HYPEN_THEME) ? style.belIcon : ''} style={{fontSize:18}}/>}
              /> */}
              {/* <BellOutlined className={(localStorage.getItem(LOWER_THEME)  === LOWER_DARK_HYPEN_THEME) ? style.belIconLight : style.belIconDark} style={{fontSize:18, marginRight:6}}/> */}
            </Popover>
          </div>
          <div
            className={style.menuForSideDrawer}
          >
            {dropdownMenu}
          </div>
        </Drawer>
        <div className={style.welcomeBox}>
        <div style={{display:'flex', alignItems:'center'}}>
        <MenuOutlined
            className={style.menuOutlined}
            ref={buttonRef}
          />
          {innerWidth > 400 ? <Link className={style.welcomeText} to={constRoute.dashboard}>
            <div ref={ref} className={style.textContainer} onClick={() => localStorage.setItem('currentLink', constRoute.dashboard)}>
             DashBoard
            </div>
          </Link>:''}
        </div>
        <div className={style.userRole}>
            <h1>{getUserOnRole(getUserInfo?.role).name}</h1>
          </div>
                  {/* Header Menu */}
        <ul className={style.rightMenuHeader}>
          <div className={style.themeBtnContaienr}>
           {innerWidth > 850 &&  <ToggleTheme />}
          </div>
          <div className={style.BLDivContainer}>
            <span className={style.Lspan}>
              L: 
              {formatLargeNumber(getUserInfo?.exposure, 1)?.toString()?.replace('.0', '') || 0}
              {/* // numberWithCommas(getUserInfo?.exposure?.toFixed(1) || 0)} */}
            </span>
            <span className={style.Bspan}>
              B:{formatLargeNumber(getUserInfo?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
               {/* {numberWithCommas(getUserInfo?.availableBalance?.toFixed(1) || 0)} */}
            </span>
          </div>
          {/* <li className={style.bellIconLi}>
          <Button
            type="text"
            shape="circle"
            icon={<img src={SettingLight} />}
          />
        </li> */}
        {innerWidth > 850 && <>
        <Popover
          content={notificationsContent}
          placement="bottomRight"
          trigger="click"
          overlayClassName="noti-wrapper"
        >
          <li className={style.bellIconLi}>
            {/* <Button
              type="text"
              shape="circle"
              icon={<BellOutlined className={(localStorage.getItem(LOWER_THEME)  === LOWER_DARK_HYPEN_THEME) ? style.belIcon : ''} style={{fontSize:18}}/>}
            /> */}
            {/* <BellOutlined className={(localStorage.getItem(LOWER_THEME)  === LOWER_DARK_HYPEN_THEME) ? style.belIconLight : style.belIconDark} style={{fontSize:18, marginRight:6}}/> */}
          </li>
        </Popover>
        <li className={style.userProfileDropDownContainer}>
          <Row className={style.userProfileDropDownWrapper}>
            {/* <div className={style.ProfileImageLogo}>
            <Tooltip title={getUserInfo?.userName || CAP_HELLO + "!"}>
              <img src={""} />
            </Tooltip>
          </div> */}
            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="header-dropdown">
                  <span className={style.profileUserNameText}>
                    {" "}
                    {getUserInfo?.userName || CAP_HELLO + "!"} 
                  </span>
                  <span className="mobile">
                    <i className="fa fa-ellipsis-v" />
                  </span>
                  <DownOutlined className={style.profileUserNameText} />
                </Space>
              </a>
            </Dropdown>
          </Row>
        </li></>}
          {innerWidth <= 850 && (
            <span style={{fontSize:20}} onClick={() => showDrawer()}>
              <BiDotsVerticalRounded style={{fill: '#fff'}}/>
            </span>
          )}
        </ul>
        </div>

        <div className={style.betterTextMarquee}>
          <FastMarquee speed={50}><span style={{marginRight: '40px'}}>{getBetNewsData?.text ? `${getBetNewsData?.text} Customer complain cell 24 hour 00970503703617` : ''}</span></FastMarquee>
        </div>



      </div>
    </div>
  );
});

export default HeaderBetter;
