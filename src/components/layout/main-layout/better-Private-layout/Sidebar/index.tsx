import { useState, useEffect, memo } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import style from "../../../style.module.scss";
import Logo from "@assets/icons/logo.png";
import { LOWER_DARK, UPPER_O_BET } from "@utils/const";
import { observer } from "mobx-react";
import { useMenusList } from "@utils/hooks/useMenu";
import { useTheme } from "@utils/hooks/useTheme";
import useWindowSize from "@utils/hooks/useWindowSize";
import { useBetterMenusList } from "@utils/hooks/useMenuBetter";

const SideBarBetterComponent = observer(({ collapsed, setCollapsed }: any) => {
  const theme = useTheme();
  const menusList = useBetterMenusList();
  const [activeElement, setActiveElement] = useState("");
  const [menuList, setMenuList] = useState([]);
  const location = useLocation();
  const data = useWindowSize().width;
  useEffect(() => {
    setActiveElement(location?.pathname);
  }, [location?.pathname]);

  useEffect(() => {
    setMenuList(menusList);
  }, [menusList]);

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
  }, [menuList]);

  return (
    <div className={theme}>
      <Menu
        className={style.mainMenu}
        theme={LOWER_DARK}
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[window?.location?.pathname]}
        defaultSelectedKeys={[window?.location?.pathname]}
      >
        <div className={style.brandLogo}>
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
                  menu?.link === activeElement
                    ? "ant-menu-item-selected"
                    : "ant-menu-item-back"
                }
                key={`submenu-${key1.toString()}-${key2.toString()}`}
                icon={
                  <img
                    style={{ width: "18px", height: "18px" }}
                    alt=""
                    src={menu?.icon}
                    key={menu?.icon}
                  />
                }
              >
                <NavLink
                  key={`nav-${key1.toString()}-${key2.toString()}`}
                  to={menu?.link}
                  onClick={()=>{
                    if(data<650){
                      setCollapsed(true)
                    }
                    else{setCollapsed(false)}
                  }}
                >
                  {menu?.name}
                </NavLink>
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
  );
});

export default memo(SideBarBetterComponent);
