import { types } from "mobx-state-tree";

export const userInfoModel = types.model({
  adminId: types.maybeNull(types.string),
  balance: types.maybeNull(types.number),
  bettingAllowed: types.maybeNull(types.boolean),
  canSettlePL: types.maybeNull(types.boolean),
  createdAt: types.maybeNull(types.number),
  createdBy: types.maybeNull(types.number),
  downLineShare: types.maybeNull(types.number),
  isActive: types.maybeNull(types.boolean),
  masterId: types.maybeNull(types.string),
  credit: types?.maybeNull(types.number),
  exposure: types?.maybeNull(types.number),
  availableBalance: types.maybeNull(types.number),
  clientPL: types?.maybeNull(types.number),
  parentId: types.maybeNull(types.string),
  notes: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
  passwordChanged: types.maybeNull(types.boolean),
  phone: types.maybeNull(types.string),
  reference: types.maybeNull(types.string),
  role: types.maybeNull(types.union(types.string, types.number)),
  status: types.maybeNull(types.number),
  betLockStatus: types.maybeNull(types.boolean),
  matchOddsStatus: types.maybeNull(types.boolean),
  token: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  userName: types.maybeNull(types.string),
  id: types.maybeNull(types.string),
  baseCurrency: types.maybeNull(types.string),
  remoteId: types.maybeNull(types.number),
  _id: types.maybeNull(types.string),
});

export const oversModel = types.model({
  team: types.maybeNull(types.string),
  over: types.maybeNull(types.number),
  total: types.maybeNull(types.number),
})

export const cricketModel = types.model({
  _id: types.maybeNull(types.string),
  Title: types.maybeNull(types.string),
  eventId: types.maybeNull(types.string),
  timestamp: types.maybeNull(types.number),
  seriesFullName: types.maybeNull(types.string),
  venueName: types.maybeNull(types.string),
  state: types.maybeNull(types.string),
  over1: types.maybeNull(types.string),
  over2: types.maybeNull(types.string),
  score1: types.maybeNull(types.string),
  score2: types.maybeNull(types.string),
  team1Name: types.maybeNull(types.string),
  team2Name: types.maybeNull(types.string),
  team1Flag: types.maybeNull(types.string),
  team2Flag: types.maybeNull(types.string),
  seriesKey: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  res: types.maybeNull(types.string),
  overs: types.maybeNull(types.array(oversModel)),
})

export const scoreModel = types.model({
  _id: types.maybeNull(types.string),
  eventId: types.maybeNull(types.string),
  sportsId: types.maybeNull(types.string),
  scoreKey: types.maybeNull(types.string),
  data: types.frozen(),
})

export const marketTypesModel = types.model({
  createdAt: types.maybeNull(types.number),
  marketId: types.maybeNull(types.union(types.string, types.number)),
  name: types.maybeNull(types.string),
  status: types.maybeNull(types.number),
  subMarketId: types.maybeNull(types.union(types.string, types.number)),
  Id: types.maybeNull(types.number),
});

export const allMarketTypesModel = types.model({
  createdAt: types.maybeNull(types.number),
  marketId: types.maybeNull(types.union(types.string, types.number)),
  name: types.maybeNull(types.string),
  link: types.maybeNull(types.string),
  darkIcon: types.maybeNull(types.string),
  lightIcon: types.maybeNull(types.string),
  status: types.maybeNull(types.number),
  _id: types.maybeNull(types.string),
  subMarkets: types.maybeNull(types.array(marketTypesModel)),
  Id:  types.maybeNull(types.string),
  marketName: types.maybeNull(types.string),

  // status: types.maybeNull(types.number)
});
export const allSideBarMenuModel = types.model({
  marketId: types.maybeNull(types.union(types.string, types.number)),
  darkIcon: types.maybeNull(types.string),
  lightIcon: types.maybeNull(types.string),
  link: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  _id: types.maybeNull(types.string),
  type: types.maybeNull(types.number),
  market: types.maybeNull(types.number),
})
export const userCashDepositeDataModel = types.model({
  balance: types.maybeNull(types.number),
  credit: types.maybeNull(types.number),
  maxWithdraw: types.maybeNull(types.number),
});

export const userAllCreditDataModel = types.model({
  availableBalance: types.maybeNull(types.number),
  credit: types.maybeNull(types.number),
  creditLimit: types.maybeNull(types.number),
});

export const _id_model = types.model({
  betSession: types.maybeNull(types.number),
  marketId: types.maybeNull(types.string),
  matchId: types.maybeNull(types.string),
  roundId: types.maybeNull(types.string)
});

export const cashDepositLedgerDataModel = types.model({
  description: types.maybeNull(types.string),
  amount: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
  createdAt: types.maybeNull(types.string),
  betTime: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  maxWithdraw: types.maybeNull(types.number),
  commissionFrom: types.maybeNull(types.number),
  date: types.maybeNull(types.number),
  betId: types.maybeNull(types.string),
  betType: types.maybeNull(types.number),
  betDateTime: types.maybeNull(types.number),
  // _id: types.maybeNull(types.string),
  // _id: types.maybeNull(types.array(_id_model)),
  _id: types.maybeNull(types.union(types.string, _id_model)),
  marketId: types.maybeNull(types.string),
  betSession: types.maybeNull(types.number),
  matchType: types.maybeNull(types.string),
  sportsId: types.maybeNull(types.string),
  cashOrCredit: types.maybeNull(types.string),
  originalId: types.maybeNull(types.string),
  roundId: types.maybeNull(types.string),
  matchId: types.maybeNull(types.string),
});

export const cashDepositLedgerDataModel2 = types.model({
  description: types.maybeNull(types.string),
  amount: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
  createdAt: types.maybeNull(types.string),
  betTime: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  maxWithdraw: types.maybeNull(types.number),
  commissionFrom: types.maybeNull(types.number),
  date: types.maybeNull(types.number),
  betId: types.maybeNull(types.string),
  betType: types.maybeNull(types.number),
  betDateTime: types.maybeNull(types.number),
  _id: types.maybeNull(types.string),


  // _id: types.union(types.string),
  marketId: types.maybeNull(types.string),
  betSession: types.maybeNull(types.number),
  matchType: types.maybeNull(types.string),
  sportsId: types.maybeNull(types.string),
  cashOrCredit: types.maybeNull(types.string),
  originalId: types.maybeNull(types.string),
  roundId: types.maybeNull(types.string),
});

const negativeClientsModel = types.model({
  userName: types.maybeNull(types.string),
  clientPL: types.maybeNull(types.number),
  userId: types.maybeNull(types.number)

});

const positiveClientsModel = types.model({
  userName: types.maybeNull(types.string),
  clientPL: types.maybeNull(types.number),
  userId: types.maybeNull(types.number)

});









export const userFinalSheetDataModal = types.model({
  negativeClients: types.maybeNull(types.array(negativeClientsModel)),
  positiveClients: types.maybeNull(types.array(positiveClientsModel)),
  totalNegativeClientPL: types.maybeNull(types.number),
  totalPositiveClientPL: types.maybeNull(types.number),
});
export const loadBalanceModal = types.model({
  balanceUpline: types.maybeNull(types.number),
  cash: types.maybeNull(types.number),
  creditRecieved: types.maybeNull(types.number),
  creditRemaining: types.maybeNull(types.number),
  plDownline: types.maybeNull(types.number),
  users: types.maybeNull(types.number)
})
export const exchangeListModel = types.model({
  _id: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.number),
  currency: types.maybeNull(types.string),
  exchangeAmount:  types.maybeNull(types.number),
  updatedAt:  types.maybeNull(types.number)


})
export const betFundsModel =  types.model({
  activeBets: types.maybeNull(types.number),
  available: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
  credit: types.maybeNull(types.number),
  liable: types.maybeNull(types.number),
})
export const betNewsDataModel = types.model({
  betSizes:  types.maybeNull(types.string),
  text: types.maybeNull(types.string)

})
export const allDepositModel =types.model({
  availableBalance: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
  credit:types.maybeNull(types.number),
  creditLimit: types.maybeNull(types.number),
  maxWithdraw: types.maybeNull(types.number),
  _id: types.maybeNull(types.string),
  // status:types.maybeNull(types.number)
})

export const dailyPlDataModel =types.model({
  amount: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  userName: types.maybeNull(types.string)
})
export const BookDetail2Model =types.model({
  amount: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  _id: types.maybeNull(types.string)
})

export const getAllPLSportsWiseReportModel = types.model({
  amount: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  _id: types.maybeNull(types.string)
})

export const getAllMarketReportModel = types.model({
  amount: types.maybeNull(types.number),
  Date: types.maybeNull(types.string),
  date: types.maybeNull(types.number),
  Event: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  _id:  types.maybeNull(types.string),

})

export const getCommissionReportModel = types.model({
  amount: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  userName: types.maybeNull(types.string),
  _id: types.maybeNull(types.number),
  name:  types.maybeNull(types.string)

})

export const getAllSidebarSubMenuListModel = types.model({
  Id: types.maybeNull(types.string),
  Name: types.maybeNull(types.string)
})

export const getEventsByReportModel = types.model({
  Id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  competitionId: types.maybeNull(types.string),
  competitionName: types.maybeNull(types.string),
  hasFancy: types.maybeNull(types.boolean),
  inplay: types.maybeNull(types.boolean),
  isPremium: types.maybeNull(types.boolean),
  openDate: types.maybeNull(types.number),
  sport: types.maybeNull(types.string),
  sportsId: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  timezone: types.maybeNull(types.string),

})

const locationDataModel = types.model({
  city: types.maybeNull(types.string),
  country: types.maybeNull(types.string),
  latitude: types.maybeNull(types.number),
  longitude: types.maybeNull(types.number),
  region: types.maybeNull(types.string),

})

export const userLoginActivityDataModel = types.model({
  createdAt: types.maybeNull(types.number),
  ipAddress: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  userName: types.maybeNull(types.string),
  _id: types.maybeNull(types.string),
  locationData: types.maybeNull(locationDataModel)
})