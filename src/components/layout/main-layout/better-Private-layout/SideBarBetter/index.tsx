import { useState, useEffect } from "react";
import { Drawer, DrawerProps, Menu } from "antd";
import { useLocation } from "react-router-dom";
import style from "../../../style.module.scss";
import Logo from "@assets/icons/logo.png";
import { LOWER_DARK, UPPER_O_BET } from "@utils/const";
import { observer } from "mobx-react";
import { useTheme } from "@utils/hooks/useTheme";
import useWindowSize from "@utils/hooks/useWindowSize";
import {
  LOWER_THEME,
} from "@utils/const";
import { constRoute } from "@utils/route";
import { useBetterMenusList } from "@utils/hooks/useMenuBetter";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { notification } from "@utils/notifications";

const SideBarBetterComponent = observer(
  ({ collapsed, setCollapsed, open, setOpen }: any) => {
    const {
      user: { loadEventsBySport },
      bet: {loadSportsBookData}
    } = useStore(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const menusList = useBetterMenusList();
    const [activeElement, setActiveElement] = useState("");
    const [menuList, setMenuList] = useState([]);
    const location = useLocation();
    const [isEventBySportsData, setEventsBySportsData] = useState(null)
    const innerWidth = useWindowSize().width;
    const [raceList, setRaceList] = useState(null);
    const [placement] = useState<DrawerProps["placement"]>("left");
    const [menuMarket, setMenuMarket] = useState(null);
    const [gameName, setGameName] = useState("");
    const pathname = location.pathname;
    const search = location.search;
    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
      setRaceList([]);
      setEventsBySportsData([])
    };
    useEffect(() => {
      setActiveElement(`${pathname}${search}`);
    }, [location?.pathname, localStorage.getItem("currentLink")]);
    useEffect(() => {
      setMenuList(menusList);
    }, [menusList, theme, localStorage.getItem(LOWER_THEME)]);

    useEffect(() => {
      menuList?.map((item) => {
        item?.menu?.map((menuItem, index) => {
          if (menuItem?.name === "role not allowed add here") {
            item.menu.splice(index, 1);
          }
          return null;
        });
        return null;
      });
    }, [menuList, theme, localStorage.getItem(LOWER_THEME)]);
const menuHandler = async(menu) => {
  if (menu?.market) {
    setMenuMarket(menu?.market);
    setGameName(menu?.name);
    showDrawer();
    if (menu?.market === 7 || menu?.market === 4339) {
      const res = await loadEventsBySport(menu?.market);
      if (res?.success) {
        setRaceList(res?.results);
      }
    } else {
    const response =   await loadEventsBySport(menu?.market);
    if(response?.success){
      if(menu.market===4){
          const filterArray =  response?.results?.filter((item)=> item?.iconStatus===true)
          setEventsBySportsData(filterArray)
      } else setEventsBySportsData(response?.results)
    }
    }
  } else {
    localStorage.setItem("currentLink", menu?.link);
    navigate(`${menu?.link}`);
  }
  if (innerWidth < 650) {
    if (menu?.market) setCollapsed(false);
    else setCollapsed(true);
  } else {
    setCollapsed(false);
  }
}
    return (
      <>
        <div className={theme}>
          <Menu
            className={style.mainMenu}
            theme={LOWER_DARK}
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={[window?.location?.pathname]}
            defaultSelectedKeys={[window?.location?.pathname]}
          >
            <div className={style.brandLogo} onClick={()=>{
               localStorage.setItem("currentLink", constRoute.dashboard)
              navigate(constRoute.dashboard)}}>
              <img src={Logo} alt="Logo" />
              <h1>
                1<i>{UPPER_O_BET}</i>
              </h1>
            </div>

            {menuList?.map((val, key1) => {
              const element = val?.menu?.map((menu, key2) => {
                return (
                  <Menu.Item
                    className={
                      menu?.link === activeElement ||
                      `${menu?.link}${search}` === activeElement
                        ? "ant-menu-item-selected"
                        : "ant-menu-item-back"
                    }
                    key={`submenu-${key1.toString()}-${key2.toString()}`}
                    onClick={() => menuHandler(menu)}
                    icon={
                      <img
                        className={style.animationClass}
                        style={{ width: "18px", height: "18px" }}
                        alt=""
                        src={
                            menu?.selectedIcon
                        }
                        key={menu?.icon}
                      />
                    }
                  >
                    <div
                      key={`nav-${key1.toString()}-${key2.toString()}`}
                      onClick={async () => {menuHandler(menu)}}
                    >
                      {menu?.name}
                    </div>
                  </Menu.Item>
                );
              });
              return (
                <>
                  <p className={style.menuTitle}> MAIN MENU </p>
                  {element}
                </>
              );
            })}
          </Menu>
        </div>
        <Drawer
          title={`All ${gameName}`}
          placement={placement}
          closable={false}
          onClose={onClose}
          className={`${theme} ${style.sideBarDrawer}`}
          width={300}
          open={open}
          key={placement}
          contentWrapperStyle={{ marginLeft: innerWidth > 650 ? 250 : 100 }}
        >
          {menuMarket === 4339 || menuMarket ===7
            ? raceList?.length
              ? raceList?.map((item, index) => {
                  return (
                    <div
                      className={style.newMenu}
                      onClick={() => {
                        if(item?.marketIds?.length){
                          if(menuMarket === 7){
                            localStorage.setItem(
                              "currentLink",
                              `${constRoute?.horseRace}?id=${item?.marketIds[0]}&matchId=${item?.matchId}`
                            );
                            navigate(
                              `${constRoute?.horseRace}?id=${item?.marketIds[0]}&matchId=${item?.matchId}`
                            );
                          }else {
                            localStorage.setItem(
                              "currentLink",
                              `${constRoute?.greyhound}?id=${item?.marketIds[0]}&matchId=${item?.matchId}`
                            );
                            navigate(
                              `${constRoute?.greyhound}?id=${item?.marketIds[0]}&matchId=${item?.matchId}`
                            );
                          }
                        onClose();
                      }}
                    }
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                        <div className={style.spanOne}>{`${moment(
                          item?.openDate
                        ).format("hh:mm a")} - ${item?.venue || ''} (${
                          item?.countryCode
                        })`}</div>
                        <div
                          className={item?.inplay ? style.inplayActive : ""}
                        ></div>
                      </div>
                    </div>
                  );
                })
              : ""
            : isEventBySportsData?.length
            ? isEventBySportsData?.map((item, index) => {
                if (!item?.name) return '';
                else {
                  return (
                    <div
                      className={style.newMenu}
                      onClick={() => {
                        if (menuMarket === 4) {
                          localStorage.setItem(
                            "currentLink",
                            `${constRoute?.cricket}?id=${item?.Id}`
                          );
                          navigate(`${constRoute?.cricket}?id=${item?.Id}`);
                        } else if (menuMarket === 2) {
                          localStorage.setItem(
                            "currentLink",
                            `${constRoute?.tennis}?id=${item?.Id}`
                          );
                          navigate(`${constRoute?.tennis}?id=${item?.Id}`);
                        } else if (menuMarket === 1) {
                          localStorage.setItem(
                            "currentLink",
                            `${constRoute?.soccer}?id=${item?.Id}`
                          );
                          navigate(`${constRoute?.soccer}?id=${item?.Id}`);
                        }
                        onClose();
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                        <div className={style.spanOne}>{item?.name}</div>
                        <div
                          className={item?.inplay ? style.inplayActive : ""}
                        ></div>
                      </div>
                    </div>
                  );
                }
              })
            : ""}
        </Drawer>
      </>
    );
  }
);

export default SideBarBetterComponent;
