import { CAMEL_HORSE_RACE, CAP_ACCOUNT, CAP_ACTIVE, CAP_ALL, CAP_CANCELLED, CAP_CASINO, CAP_CRICKET, CAP_EDIT, CAP_GREYHOUND, CAP_HORSE_RACE, CAP_LARGE, CAP_SETTLED, CAP_SOCCER, CAP_TENNIS, CAP_USER, CAP_VOIDED, LOWER_ACTIVE, LOWER_ALL, LOWER_CANCELLED, LOWER_CASINO, LOWER_CRICKET, LOWER_GREYHOUND, LOWER_SETTLED, LOWER_SOCCER, LOWER_TENNIS, LOWER_VOIDED } from "@utils/const";
import { constRoute } from "@utils/route";
import {
  BOOK_DETAIL,
  BOOK_DETAIL_2,
  CAP_BETS,
  CAP_COMMISSION_REPORT,
  CAP_CURRENT_POSITION,
  CAP_DAILY_PL,
  CAP_DAILY_REPORT,
  CAP_FINAL_SHEET,
  CAP_LEDGER,
  CAP_PROFIT_LOSS,
  CAP_REPORT_BY_MARKET,
} from "../const";

export const HeaderBtnList = [
  {
    btnTitle: BOOK_DETAIL,
    loading: false,
    path: constRoute?.bookDetail,
  },
  {
    btnTitle: BOOK_DETAIL_2,
    loading: false,
    path: constRoute?.bookDetail2,
  },
  {
    btnTitle: CAP_DAILY_PL,
    loading: false,
    path: constRoute?.dailyPl,
  },
  {
    btnTitle: CAP_DAILY_REPORT,
    loading: false,
    path: constRoute?.dailyReport,
  },
  {
    btnTitle: CAP_FINAL_SHEET,
    loading: false,
    path: constRoute?.finalSheet,
  },
  {
    btnTitle: CAP_ACCOUNT,
    loading: false,
    path: constRoute?.users,
  },
  {
    btnTitle: CAP_COMMISSION_REPORT,
    loading: false,
    path: constRoute?.commissionReport,
  },
  // {
  //   btnTitle: CAP_REPORT_BY_MARKET,
  //   loading: false,
  //   path: constRoute?.reportByMarket,
  // },
];

export const AddBetsBtn = [
  {
    btnTitle: CAP_EDIT + " " + CAP_USER,
    loading: false,
    path: constRoute?.userBetForm,
  },
  {
    btnTitle: CAP_LEDGER,
    loading: false,
    path: constRoute?.ledger,
  },
  {
    btnTitle: CAP_BETS,
    loading: false,
    path: constRoute?.betsList,
  },
  {
    btnTitle: CAP_PROFIT_LOSS,
    loading: false,
    path: constRoute?.profiltLoss,
  },
  {
    btnTitle: CAP_CURRENT_POSITION,
    loading: false,
    path: constRoute?.currentPosition,
  },
];
export const ColumnForReport = [
  "#",
  "Sports",
  "Description",
  "Amount",
  "Balance",
];

export const optionMarketTypes = [
  {
    key: '',
    value: CAP_ALL,
  },
  {
    key: '1',
    value: CAP_SOCCER,
  },
  {
    key: '2',
    value: CAP_TENNIS,
  },
  {
    key: '4',
    value: CAP_CRICKET,
  },
  {
    key: '7',
    value: CAP_HORSE_RACE,
  },
  {
    key: '6',
    value: CAP_CASINO,
  },
  {
    key: '4339',
    value: CAP_GREYHOUND,
  },
];

export const filterUserBetsOptions = [
  {
    key: '1',
    value: CAP_ACTIVE,
  },
  {
    key: '0',
    value: CAP_SETTLED,
  },
  {
    key: LOWER_VOIDED,
    value: CAP_VOIDED,
  },
  {
    key: LOWER_CANCELLED,
    value: CAP_CANCELLED,
  },
]
export const entriesDropdown = [
  {
    key: 10,
    value: 10,
  },
  {
    key: 100,
    value: 100,
  },
  {
    key: 250,
    value: 250,
  },
  {
    key: 500,
    value: 500,
  },
  {
    key: 1000,
    value: 1000,
  },
]

