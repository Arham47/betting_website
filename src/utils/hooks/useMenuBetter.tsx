import {
  CAP_ALL_SPORTS,
  CAP_BET_FAIR_GAMES,
  CAP_BET_LOCK,
  CAP_CURRENT_POSITIONS,
  CAP_DASHBOARD,
  CAP_POLICY,
  CAP_PRIVACY,
  CAP_RESULTS,
  CAP_ROYALSTAR_CASINO,
  CAP_TERMS_AND_CONDITIONS,
  CAP_USER,
  LOWER_DARK_HYPEN_THEME,
  LOWER_LIGHT_HYPEN_THEME,
  LOWER_THEME,
  MARKET_RULES,
} from "@utils/const";
import { constRoute } from "@utils/route";
import { useTheme } from "@utils/hooks/useTheme";
import { useEffect, useState } from "react";
import {
  greyThemeIcons,
  lightThemeIcons,
} from "@components/layout/main-layout/private-layout/Sidebar/json-data";
import { useStore } from "@stores/root-store";
import { CAMEL_ALL_MARKET_TYPES } from "@utils/const/RoutesQueryUrlParam";
import { useNavigate } from "react-router-dom";

export const useBetterMenusList = () => {
  const [menuItems, setmenuItems] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    user: {
      loadAllMarketTypes,
      getAllMarketTypes,
      loadAllSideBarMenuItem,
      getLoadSideBarMenuList,
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
    let dynamicMenuArr = [];
    dynamicMenuArr = getLoadSideBarMenuList?.map((item) => {
      return {
        name: item?.name,
        icon: (isLightThemeIcons && item?.lightIcon) || item?.darkIcon,
        selectedIcon: item?.lightIcon,
        // link: `${item?.link}?${CAMEL_ALL_MARKET_TYPES}=${JSON?.stringify(item)}`,
        link: `${item?.link}`,
        market: item?.market
      };
    });
    // dynamicMenuArr?.push({
    //   name: 'All Word Casino',
    //   icon: MenuIcon.royalStarCasino,
    //   selectedIcon: lightThemeIcons.royalStarCasino,
    //   link: constRoute.casinos,
    // },
    // {
    //   name: 'Evolution Casino',
    //   icon: MenuIcon.royalStarCasino,
    //   selectedIcon: lightThemeIcons.royalStarCasino,
    //   link: constRoute.evolutionCasino,
    // },
    // {
    //   name: 'Ezugi Casino',
    //   icon: MenuIcon.royalStarCasino,
    //   selectedIcon: lightThemeIcons.royalStarCasino,
    //   link: constRoute.ezugicasino,
    // },
    // )
    const staticMenuArr = [
      {
        _id: "6484244e33a681670a50de74",
        name: "Dashboard",
        lightIcon: "https://1obet.com/assets/light-icons/dashboard.png",
        darkIcon: "https://1obet.com/assets/dark-icons/dashboard.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/home",
      },
      {
        _id: "6484244e33a681670a50de75",
        name: "Cricket",
        lightIcon: "https://1obet.com/assets/light-icons/cricket.png",
        darkIcon: "https://1obet.com/assets/dark-icons/cricket.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/cricket",
      },
      {
        _id: "6484244e33a681670a50de76",
        name: "Tennis",
        lightIcon: "https://1obet.com/assets/light-icons/tennis.png",
        darkIcon: "https://1obet.com/assets/dark-icons/tennis.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/tennis",
      },
      {
        _id: "6484244e33a681670a50de77",
        name: "Soccer",
        lightIcon: "https://1obet.com/assets/light-icons/soccer.png",
        darkIcon: "https://1obet.com/assets/dark-icons/soccer.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/soccer",
      },
      {
        _id: "6484244e33a681670a50de78",
        name: "Horse Race",
        lightIcon: "https://1obet.com/assets/light-icons/horse-race.png",
        darkIcon: "https://1obet.com/assets/dark-icons/horse-race.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/horse-race",
      },
      {
        _id: "6484244e33a681670a50de79",
        name: "Greyhound",
        lightIcon: "https://1obet.com/assets/light-icons/greyhound.png",
        darkIcon: "https://1obet.com/assets/dark-icons/greyhound.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/greyhound",
      },
      {
        _id: "6484244e33a681670a50de7a",
        name: "Sports Book",
        lightIcon: "https://1obet.com/assets/light-icons/all-sports.png",
        darkIcon: "https://1obet.com/assets/dark-icons/all-sports.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/sports-book",
      },
      {
        _id: "6484244e33a681670a50de7b",
        name: "Ezugi Casino",
        lightIcon: "https://1obet.com/assets/light-icons/royal-casino.png",
        darkIcon: "https://1obet.com/assets/dark-icons/royal-casino.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/casino?name=ezugi",
      },
      {
        _id: "6484244e33a681670a50de7c",
        name: "Evolution Casino",
        lightIcon: "https://1obet.com/assets/light-icons/royal-casino.png",
        darkIcon: "https://1obet.com/assets/dark-icons/royal-casino.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/casino?name=evolution",
      },
      {
        _id: "6484244e33a681670a50de7d",
        name: "Betfair Games",
        lightIcon: "https://1obet.com/assets/light-icons/bet-fair-games.png",
        darkIcon: "https://1obet.com/assets/dark-icons/bet-fair-games.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/bet-fair-games",
      },
      {
        _id: "6484244e33a681670a50de7e",
        name: "All World Casino",
        lightIcon: "https://1obet.com/assets/light-icons/royal-casino.png",
        darkIcon: "https://1obet.com/assets/dark-icons/royal-casino.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/all-world-casino",
      },
      {
        _id: "6484244e33a681670a50de7f",
        name: "Current Position",
        lightIcon: "https://1obet.com/assets/light-icons/current-position.png",
        darkIcon: "https://1obet.com/assets/dark-icons/current-position.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/market/liables",
      },
      {
        _id: "6484244e33a681670a50de80",
        name: "All Sports",
        lightIcon: "https://1obet.com/assets/light-icons/all-sports.png",
        darkIcon: "https://1obet.com/assets/dark-icons/all-sports.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/all-sports",
      },
      {
        _id: "6484244e33a681670a50de81",
        name: "Result",
        lightIcon: "https://1obet.com/assets/light-icons/results.png",
        darkIcon: "https://1obet.com/assets/dark-icons/results.png",
        marketId: "tyv234543-432453343423-53423d332",
        type: 0,
        link: "/result",
      },
    ];
    let staticArrayForSideBar = [];
    staticArrayForSideBar = staticMenuArr?.map((item) => {
      return {
        name: item?.name,
        icon: (isLightThemeIcons && item?.lightIcon) || item?.darkIcon,
        selectedIcon: item?.lightIcon,
        // link: `${item?.link}?${CAMEL_ALL_MARKET_TYPES}=${JSON?.stringify(item)}`,
        link: `${item?.link}`,
      };
    });

    //   const StaticMenuArr = [
    //     {
    //       name: CAP_DASHBOARD,
    //       icon: MenuIcon.dashboard,
    //       link: constRoute.dashboard,
    //     },
    //     {
    //       name: CAP_USER,
    //       icon: MenuIcon.users,
    //       link: constRoute.users,
    //     },
    //     {
    //       name: CAP_BET_LOCK,
    //       icon: MenuIcon.betLock,
    //       link: constRoute.betLocker,
    //     },
    //     {
    //       name: CAP_CURRENT_POSITIONS,
    //       icon: MenuIcon.currentPosition,
    //       link: constRoute.currentPosition,
    //     },
    //     {
    //       name: CAP_BET_FAIR_GAMES,
    //       icon: MenuIcon.betFairGames,
    //       link: constRoute.betFairGames,
    //     },
    //     {
    //       name: CAP_ROYALSTAR_CASINO,
    //       icon: MenuIcon.royalStarCasino,
    //       link: constRoute.royalStarCasino,
    //     },
    //     {
    //       name: CAP_ALL_SPORTS,
    //       icon: MenuIcon.allSports,
    //       link: constRoute.allSports,
    //     },
    //     {
    //       name: CAP_RESULTS,
    //       icon: MenuIcon.results,
    //       link: constRoute.results,
    //     },
    //     {
    //       name: MARKET_RULES,
    //       icon: MenuIcon.marketRules,
    //       link: constRoute.marketRules,
    //     },
    //     {
    //       name: CAP_TERMS_AND_CONDITIONS,
    //       icon: MenuIcon.termsAndConditions,
    //       link: constRoute.termsAndConditions,
    //     },
    //     // {
    //     //   name: `${CAP_PRIVACY} ${CAP_POLICY}`,
    //     //   icon: MenuIcon.termsAndConditions,
    //     //   link: constRoute.privacyPolicy,
    //     // },
    //   ];

    const iteratedMenu = dynamicMenuArr?.length? dynamicMenuArr : staticArrayForSideBar;
    // const iteratedMenu = StaticMenuArr?.dynamicMenuArr.concat(betterStaticMenyArray);

    setmenuItems([
      {
        menu: iteratedMenu,
      },
    ]);
  }, [theme, getAllMarketTypes, getLoadSideBarMenuList, localStorage.getItem(LOWER_THEME)]);

  return menuItems;
};
