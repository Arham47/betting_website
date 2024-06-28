import { constRoute } from "@utils/route";
import {
  Badge,
  Drawer,
  DrawerProps,
  Dropdown,
  Menu,
  Row,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  FunctionOutlined,
  BellOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import useWindowSize from "@utils/hooks/useWindowSize";
import style from "../../../style.module.scss";
import { observer } from "mobx-react";
import { BiDotsVerticalRounded, BiStats } from "react-icons/bi";
import { MdCasino } from "react-icons/md";
import {
  CAP_HELLO,
  LOWER_DARK_HYPEN_THEME,
  LOWER_THEME,
  LOWER_TOKEN,
  UPPER_O_BET,
} from "@utils/const";
import useFitText from "use-fit-text";
import { useStore } from "@stores/root-store";
import {
  formatLargeNumber,
  getUserOnRole,
  numberWithCommas,
  onLogOutClearAll,
} from "@utils/common-functions";
import ToggleTheme from "./toggle-theme";
import { useTheme } from "@utils/hooks/useTheme";
import { GiAbstract013, GiGamepad } from "react-icons/gi";
import { AiOutlineHistory } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
const Header = observer(({ setCollapsed, buttonRef, openSubMenu }: any) => {
  const { fontSize, ref } = useFitText();
  const navigate = useNavigate();
  const innerWidth = useWindowSize().width;
  const [countFakeBet, setCountFakeBet] = useState(null);
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now());
  const theme = useTheme();
  const {
    user: { getUserInfo, loadSingleUser },
    bet: { loadCountOfFakeBetsData },
  } = useStore(null);
  const onLogout = () => {
    onLogOutClearAll(navigate);
    localStorage.setItem("logoutStatus", "true");
  };
  const data = useWindowSize().width;
  const userSpecificHeight = getUserInfo?.role === "0" ? { height: "625px" } : { height: "170px" }

  // const refreshSession = async () => {
  //   // const resp = await refreshTokenApi();
  //   // if (resp?.success) {
  //   setLastRefreshTime(Date.now());
  //   // }
  //   // console.warn('refresh api call');
  // };

  // useEffect(() => {
  //   const activityTimer = setInterval(() => {
  //     const currentTime = Date.now();
  //     // console.warn('currentTime - lastRefreshTime', currentTime - lastRefreshTime);
  //     // Check if the user has been inactive for 15 minutes
  //     if (currentTime - lastRefreshTime >= 900000) {
  //       refreshSession();
  //     }
  //   }, 5000); // Check every 5 second

  //   return () => clearInterval(activityTimer);
  // }, [lastRefreshTime]);

  const playNotificationSound = () => {
    const audio = new Audio('https://soundboardguy.com/wp-content/uploads/2021/04/Android-Sound-Effect-Meme.mp3');
    audio.play();
  }
  useEffect(() => {
    if (data < 650) {
      if (openSubMenu) setCollapsed(false);
      else setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [data, openSubMenu]);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate(constRoute.login);
    }
  }, []);
  const handleGetCountOfFakeBet = async () => {
    const res = await loadCountOfFakeBetsData();
    setCountFakeBet((countFakeBet) => {
      if (res?.results?.totalFakeBets > countFakeBet) playNotificationSound()
      return res?.results?.totalFakeBets
    });
  };
  // useEffect(() => {
  //   const interval = getUserInfo?.role === '0' ? setInterval(() => {handleGetCountOfFakeBet();}, 5000) : null;
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  const dropdownMenu = (
    <div className={style.dropdownMenuItem}>
      <Menu className="nav-dropdown">
        <Menu.Item
          onClick={async () => {
            const payload = { id: getUserInfo?._id };
            const res = await loadSingleUser(payload);
            onClose();
            if (res?.success) {
              navigate(
                `${constRoute?.profile}/${res?.results?._id}`
              );
            }
            localStorage.setItem('currentLink', `${constRoute?.profile}/${res?.results?._id}`);
          }}

        >
          <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
            <UserOutlined />
            Profile
          </div>
        </Menu.Item>
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.setting);
              navigate(constRoute?.setting);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <SettingOutlined />
              Setting
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.fakeBets);
              navigate(constRoute.fakeBets);
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <FunctionOutlined />
              Fake Bet
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.fancyListings);
              navigate(constRoute.fancyListings);
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <FunctionOutlined />
              Fancy Listings
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.casinoListings);
              navigate(constRoute.casinoListings);
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <FunctionOutlined />
              Casino Active Bets
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.casinoGames);
              navigate(constRoute.casinoGames);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiAbstract013 />
              Casino Games
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.cricketMatch);
              navigate(constRoute.cricketMatch);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiAbstract013 />
              Cricket Matches
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.soccerMatch);
              navigate(constRoute.soccerMatch);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiAbstract013 />
              Soccer Matches
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.tennisMatch);
              navigate(constRoute.tennisMatch);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiAbstract013 />
              Tennis Matches
            </div>
          </Menu.Item>
        ) : ''}

        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.dashboardGame);
              navigate(constRoute.dashboardGame);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <MdCasino />
              Dashboard Games
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute.digitRate);
              navigate(constRoute.digitRate);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiAbstract013 />
              Digit rate
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute?.matchSettlement)
              navigate(constRoute?.matchSettlement);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <GiGamepad style={{ fontSize: '20px' }} />
              Match Settlement
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              localStorage.setItem('currentLink', constRoute?.oneOBetCasinoDash)
              navigate(constRoute?.oneOBetCasinoDash);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <MdCasino />
              1obet Dashboard Games
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              navigate(constRoute?.loginUser);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <AiOutlineHistory style={{ fontSize: '20px' }} />
              Login History
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              navigate(constRoute?.openMarkets);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <FileMarkdownOutlined style={{ fontSize: '20px' }} />
              Open Markets
            </div>
          </Menu.Item>
        ) : ''}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              navigate(constRoute?.activeBets);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <BiStats style={{ fontSize: '20px' }} />
              Active Bets
            </div>
          </Menu.Item>
        ) : ''}
        {/* <Menu.Item onClick={()=>navigate(constRoute.finalSheet2)}>
      <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
        <BiStats style={{fontSize: '20px'}}  />
        fs
        </div>
      </Menu.Item> */}
        {getUserInfo?.role === "0" ? (
          <Menu.Item
            onClick={() => {
              onClose();
              navigate(constRoute?.allBettors);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
              <BsFillPersonFill style={{ fontSize: '20px' }} />
              All Bettors
            </div>
          </Menu.Item>
        ) : ''}
        <Menu.Item onClick={onLogout}>
          <div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
            <LogoutOutlined />
            Logout
          </div>
        </Menu.Item>

      </Menu>
    </div>
  );
  const styles = { background: `linear-gradient(to right,#00c5fb, 0%, 100%)` };
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("right");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (innerWidth > 920) {
      onClose();
    }
  }, [innerWidth]);
  return (
    <div>
      <div
        className={style.headerContainer}
        style={{ right: "0px", ...styles }}
      >
        <Drawer
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          width={235}
          className={`${theme} ${style.drawerWrapper}`}
          contentWrapperStyle={userSpecificHeight}
          key={placement}
        >
          <div className={style.themeBtnContaienrForSideDrawe}>
            <ToggleTheme onCloseDrawer={onClose} />
            {getUserInfo?.role === '0' ? countFakeBet > 0 ? (
              <div className={style.badgeColor} onClick={() => {
                onClose()
                navigate(constRoute.fakeBets);
              }}>
                <Badge count={countFakeBet}>
                  <BellOutlined
                    className={
                      localStorage.getItem(LOWER_THEME) ===
                        LOWER_DARK_HYPEN_THEME
                        ? style.belIconLight
                        : style.belIconDark
                    }
                    style={{ fontSize: 18, marginRight: 6 }}
                  />
                </Badge>
              </div>
            ) : (
              <BellOutlined
                className={
                  localStorage.getItem(LOWER_THEME) === LOWER_DARK_HYPEN_THEME
                    ? style.belIconLight
                    : style.belIconDark
                }
                style={{ fontSize: 18, marginRight: 6, cursor: 'pointer' }}
                onClick={() => {
                  onClose()
                  navigate(constRoute.fakeBets);
                }}
              />
            ) : ''}
          </div>
          <div className={style.menuForSideDrawer}>{dropdownMenu}</div>
        </Drawer>
        <div className={style.welcomeBox}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MenuOutlined className={style.menuOutlined} ref={buttonRef} />
            <Link className={style.welcomeText} to={constRoute.dashboard}>
              <div
                ref={ref}
                className={style.textContainer}
                onClick={() =>
                  localStorage.setItem("currentLink", constRoute.dashboard)
                }
              >
                {innerWidth > 420 ? 'Welcome to ' : ''}1<i>{UPPER_O_BET}</i>
              </div>
            </Link>
          </div>
          <div className={style.userRole}>
            <h1>{getUserOnRole(getUserInfo?.role).name}</h1>
          </div>
          <ul className={style.rightMenuHeader}>
            <div className={style.themeBtnContaienr}>
              {innerWidth > 920 && <ToggleTheme />}
            </div>
            {/* {getUserInfo?.role==='0'? '': <div className={style.BLDivContainer}>
              <span className={style.Lspan}>
                L: {formatLargeNumber(getUserInfo?.exposure, 1)?.toString()?.replace('.0', '') || 0}
              </span>
              <span className={style.Bspan}>
                B:{" "}
                {formatLargeNumber(getUserInfo?.availableBalance, 1)?.toString()?.replace('.0', '') || 0}
               
              </span>
            </div>} */}
            {innerWidth <= 920 ? <div className={style.BLDivContainer}>
              <span className={style.Bspan}>
                {getUserInfo?.userName || CAP_HELLO + "!"}
              </span>
            </div> : ''}


            {innerWidth > 920 && (
              <>
                <li className={style.bellIconLi} onClick={() => {
                  onClose()
                  navigate(constRoute.fakeBets);
                }}>
                  {getUserInfo?.role === '0' ? countFakeBet > 0 ? (
                    <div className={style.badgeColor}>
                      <Badge count={countFakeBet}>
                        <BellOutlined
                          className={
                            // localStorage.getItem(LOWER_THEME) ===
                            // LOWER_DARK_HYPEN_THEME
                            //   ? style.belIconLight
                            //   : style.belIconDark
                            style.belIconLight
                          }
                          style={{ fontSize: 18, marginRight: 6, cursor: 'pointer' }}
                        />
                      </Badge>
                    </div>
                  ) : (
                    <BellOutlined
                      className={
                        // localStorage.getItem(LOWER_THEME) ===
                        // LOWER_DARK_HYPEN_THEME
                        //   ? style.belIconLight
                        //   : style.belIconDark
                        style.belIconLight
                      }
                      style={{ fontSize: 18, marginRight: 6 }}
                    />
                  ) : ''}
                </li>
                <li className={style.userProfileDropDownContainer}>
                  <Row className={style.userProfileDropDownWrapper}>
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
                </li>
              </>
            )}
            {innerWidth <= 920 && (
              <span style={{ fontSize: 20 }} onClick={() => showDrawer()}>
                <BiDotsVerticalRounded style={{ fill: '#fff' }} />
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Header;