import {
  // CAP_ALL_SPORTS,
  // CAP_BET_FAIR_GAMES,
  // CAP_BET_LOCK,
  // CAP_CURRENT_POSITIONS,
  // CAP_DASHBOARD,
  // CAP_POLICY,
  // CAP_PRIVACY,
  // CAP_RESULTS,
  // CAP_ROYALSTAR_CASINO,
  // CAP_TERMS_AND_CONDITIONS,
  // CAP_USER,
  LOWER_DARK_HYPEN_THEME,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
  // MARKET_RULES,
} from "@utils/const";
import { constRoute } from "@utils/route";
import { useTheme } from "@utils/hooks/useTheme";
import { useEffect, useState } from "react";
import {
  greyThemeIcons,
  lightThemeIcons,
} from "@components/layout/main-layout/private-layout/Sidebar/json-data";
import { useStore } from "@stores/root-store";
// import { CAMEL_ALL_MARKET_TYPES } from "@utils/const/RoutesQueryUrlParam";
import { useNavigate } from "react-router-dom";
// import { truncate } from "lodash";
// import { observer } from "mobx-react";

export const useMenusList = () => {
  const [menuItems, setmenuItems] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    user: {
      loadAllMarketTypes,
      loadAllSideBarMenuItem,
      getAllMarketTypes,
      getLoadSideBarMenuList,
      getUserInfo,
    },
  } = useStore(null);

  useEffect(() => {
    // loadAllMarketTypes();
    if (!getLoadSideBarMenuList?.length) loadAllSideBarMenuItem();
  }, []);

  useEffect(() => {
    const isLightThemeIcons =
      localStorage.getItem(LOWER_THEME) === LOWER_LIGHT_HYPEN_THEME ||
      localStorage.getItem(LOWER_THEME) === LOWER_DARK_HYPEN_THEME;

    const MenuIcon = isLightThemeIcons ? lightThemeIcons : greyThemeIcons;

    const dynamicMenuArr = getLoadSideBarMenuList?.map((item) => {
      return {
        name: item?.name,
        icon: (isLightThemeIcons && item?.lightIcon) || item?.darkIcon,
        selectedIcon: item?.lightIcon,
        market: item?.market,
        // link: `${item?.link}?${CAMEL_ALL_MARKET_TYPES}=${JSON?.stringify(item)}`,
        link: `${item?.link}`,
      };
    });
    const staticMenuArr = [
      {
          "_id": "6484244e33a681670a50de82",
          "name": "Dashboard",
          "lightIcon": "https://1obet.com/assets/light-icons/dashboard.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/dashboard.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/home"
      },
      {
          "_id": "6484244e33a681670a50de83",
          "name": "Users",
          "lightIcon": "https://1obet.com/assets/light-icons/users.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/users.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/users"
      },
      {
          "_id": "6484244e33a681670a50de84",
          "name": "Current Position",
          "lightIcon": "https://1obet.com/assets/light-icons/current-position.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/current-position.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/market/liables"
      },
      {
          "_id": "6484244e33a681670a50de85",
          "name": "Reports",
          "lightIcon": "https://1obet.com/assets/light-icons/current-position.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/current-position.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/reports"
      },
      {
          "_id": "6484244e33a681670a50de86",
          "name": "Bet Lock",
          "lightIcon": "https://1obet.com/assets/light-icons/betlock.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/betlock.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/bet-lock"
      },
      {
          "_id": "6484244e33a681670a50de87",
          "name": "Cricket",
          "lightIcon": "https://1obet.com/assets/light-icons/cricket.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/cricket.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/cricket"
      },
      {
          "_id": "6484244e33a681670a50de88",
          "name": "Tennis",
          "lightIcon": "https://1obet.com/assets/light-icons/tennis.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/tennis.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/tennis"
      },
      {
          "_id": "6484244e33a681670a50de89",
          "name": "Soccer",
          "lightIcon": "https://1obet.com/assets/light-icons/soccer.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/soccer.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/soccer"
      },
      {
          "_id": "6484244e33a681670a50de8a",
          "name": "Horse Race",
          "lightIcon": "https://1obet.com/assets/light-icons/horse-race.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/horse-race.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "market": 7,
          "link": "/horse-race"
      },
      {
          "_id": "6484244e33a681670a50de8b",
          "name": "Greyhound",
          "lightIcon": "https://1obet.com/assets/light-icons/greyhound.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/greyhound.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "market": 4339,
          "link": "/greyhound"
      },
      {
          "_id": "6484244e33a681670a50de8c",
          "name": "Sports Book",
          "lightIcon": "https://1obet.com/assets/light-icons/all-sports.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/all-sports.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/sports-book"
      },
      {
          "_id": "6484244e33a681670a50de8d",
          "name": "Ezugi Casino",
          "lightIcon": "https://1obet.com/assets/light-icons/royal-casino.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/royal-casino.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/casino?name=ezugi"
      },
      {
          "_id": "6484244e33a681670a50de8e",
          "name": "Evolution Casino",
          "lightIcon": "https://1obet.com/assets/light-icons/royal-casino.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/royal-casino.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/casino?name=evolution"
      },
      {
          "_id": "6484244e33a681670a50de8f",
          "name": "Betfair Games",
          "lightIcon": "https://1obet.com/assets/light-icons/bet-fair-games.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/bet-fair-games.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/bet-fair-games"
      },
      {
          "_id": "6484244e33a681670a50de90",
          "name": "All World Casino",
          "lightIcon": "https://1obet.com/assets/light-icons/royal-casino.png",
          "darkIcon": "https://1obet.com/assets/dark-icons/royal-casino.png",
          "marketId": "tyv234543-432453343423-53423d332",
          "type": 1,
          "link": "/all-world-casino"
      }
  ]
    const StaticArrayData = staticMenuArr?.map((item) => {
      return {
        name: item?.name,
        icon: (isLightThemeIcons && item?.lightIcon) || item?.darkIcon,
        selectedIcon: item?.lightIcon,
        market: item?.market,
        // link: `${item?.link}?${CAMEL_ALL_MARKET_TYPES}=${JSON?.stringify(item)}`,
        link: `${item?.link}`,
      };
    });

    // const StaticMenuArr = [
    //   {
    //     name: CAP_DASHBOARD,
    //     icon: MenuIcon.dashboard,
    //     selectedIcon: lightThemeIcons.dashboard,
    //     link: constRoute.dashboard,
    //   },
    //   {
    //     name: CAP_USER,
    //     icon: MenuIcon.users,
    //     selectedIcon: lightThemeIcons.users,
    //     link: constRoute.users,
    //   },
    //   {
    //     name: CAP_BET_LOCK,
    //     icon: MenuIcon.betLock,
    //     link: constRoute.betLocker,
    //     selectedIcon: lightThemeIcons.betLock,
    //   },
    //   {
    //     name: CAP_CURRENT_POSITIONS,
    //     icon: MenuIcon.currentPosition,
    //     selectedIcon: lightThemeIcons.currentPosition,
    //     link: constRoute.sideBarCurrentPosition,
    //   },
    //   {
    //     name: CAP_BET_FAIR_GAMES,
    //     icon: MenuIcon.betFairGames,
    //     selectedIcon: lightThemeIcons.betFairGames,
    //     link: constRoute.betFairGames,
    //   },
    //   {
    //     name: CAP_ROYALSTAR_CASINO,
    //     icon: MenuIcon.royalStarCasino,
    //     selectedIcon: lightThemeIcons.royalStarCasino,
    //     link: constRoute.royalStarCasino,
    //   },
    //   {
    //     name: CAP_ALL_SPORTS,
    //     icon: MenuIcon.allSports,
    //     selectedIcon: lightThemeIcons.allSports,
    //     link: constRoute.allSports,
    //   },
    //   {
    //     name: CAP_RESULTS,
    //     icon: MenuIcon.results,
    //     selectedIcon: lightThemeIcons.results,
    //     link: constRoute.results,
    //   },
    //   {
    //     name: MARKET_RULES,
    //     icon: MenuIcon.marketRules,
    //     selectedIcon: lightThemeIcons.marketRules,
    //     link: constRoute.marketRules,
    //   },
    //   {
    //     name: CAP_TERMS_AND_CONDITIONS,
    //     icon: MenuIcon.termsAndConditions,
    //     selectedIcon: lightThemeIcons.termsAndConditions,
    //     link: constRoute.termsAndConditions,
    //   },
    //   // {
    //   //   name: `${CAP_PRIVACY} ${CAP_POLICY}`,
    //   //   icon: MenuIcon.termsAndConditions,
    //   //   link: constRoute.privacyPolicy,
    //   // },

    // ];
    // if (getUserInfo?.role === "0") {
    //   dynamicMenuArr?.push({
    //     name: "Casino Games",
    //     icon: MenuIcon.royalStarCasino,
    //     selectedIcon: lightThemeIcons.royalStarCasino,
    //     link: constRoute.casinoGames,
    //   });
    // }
    // if (getUserInfo?.role === "0") {
    //   StaticArrayData?.push({
    //     name: "Casino Games",
    //     icon: MenuIcon.royalStarCasino,
    //     selectedIcon: lightThemeIcons.royalStarCasino,
    //     link: constRoute.casinoGames,
    //   });
    // }
    // const iteratedMenu = StaticMenuArr?.concat(dynamicMenuArr);
    const iteratedMenu =  dynamicMenuArr?.length ? dynamicMenuArr
      : StaticArrayData;
    setmenuItems([
      {
        menu: iteratedMenu,
      },
    ]);
  }, [theme, getAllMarketTypes, getLoadSideBarMenuList,  localStorage.getItem(LOWER_THEME)]);

  return menuItems;
};
