import { types } from "mobx-state-tree";

export const betsModel = types.model({
  betAmount: types.maybeNull(types.number),
  betRate: types.maybeNull(types.number),
  createdAt: types.maybeNull(types.number),
  event: types.maybeNull(types.string),
  loosingAmount: types.maybeNull(types.number),
  marketId: types.maybeNull(types.string),
  matchId: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  position: types.maybeNull(types.number),
  returnAmount: types.maybeNull(types.number),
  runner: types.maybeNull(types.string),
  status: types.maybeNull(types.number),
  subMarketId: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  winningAmount: types.maybeNull(types.number),
  _id: types.maybeNull(types.string),
  _v: types.maybeNull(types.number),
  runnerName: types.maybeNull(types.string),
  sportsId: types.maybeNull(types.string),
  betTime: types.maybeNull(types.number),
  type: types.maybeNull(types.number),
  ratesRecord: types.maybeNull(types.array(types.number)),
  fancyData: types.maybeNull(types.string),
  isfancyOrbookmaker: types.maybeNull(types.boolean),

});
export const allCasinoCategoryModel = types.model({
  _id: types.maybeNull(types.string),
  category: types.maybeNull(types.string),
  status: types.maybeNull(types.number)
})



export const betPlace = types.model({
  sampleKey: types.maybeNull(types.number),
});

const resultsModel = types.model({
  _id: types.maybeNull(types.string),
  type: types.maybeNull(types.number),
  title: types.maybeNull(types.string),
  createdAt: types.maybeNull(types.number),
  imgUrl: types.maybeNull(types.string),
});


export const betFairDataModel = types.model({
  message: types.maybeNull(types.string),
  results: types.maybeNull(types.array(resultsModel)),

});
export const loadGameListModel = types.model({
  category: types.maybeNull(types.string),
  featurebuySupported: types.maybeNull(types.boolean),
  freeroundsSupported: types.maybeNull(types.boolean),
  gamename: types.maybeNull(types.string),
  hasJackpot: types.maybeNull(types.boolean),
  id: types.maybeNull(types.string),
  idHash: types.maybeNull(types.string),
  idHashParent: types.maybeNull(types.string),
  idParent: types.maybeNull(types.string),
  image: types.maybeNull(types.string),
  imageBackground: types.maybeNull(types.string),
  imageBw: types.maybeNull(types.string),
  imageFilled: types.maybeNull(types.string),
  image_portrait: types.maybeNull(types.string),
  imagePreview: types.maybeNull(types.string),
  imageSquare: types.maybeNull(types.string),
  licence: types.maybeNull(types.string),
  mobile: types.maybeNull(types.boolean),
  name: types.maybeNull(types.string),
  new: types.maybeNull(types.string),
  playForFunSupported: types.maybeNull(types.boolean),
  plays: types.maybeNull(types.string),
  position: types.maybeNull(types.string),
  provider: types.maybeNull(types.string),
  providerName: types.maybeNull(types.string),
  rtp: types.maybeNull(types.string),
  subcategory: types.maybeNull(types.string),
  system: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  _id: types.maybeNull(types.string)

})


export const allSelectedCasinosModel = types.model({
  _id: types.maybeNull(types.string),
  category: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  games: types.maybeNull(types.array(loadGameListModel))
})
export const getGameModel = types.model({
  currency: types.maybeNull(types.string),
  gamesessionId: types.maybeNull(types.string),
  response: types.maybeNull(types.string),
})


export const loadDashoboardGamesModal = types.model({
  _id: types.maybeNull(types.string),
  category: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  games: types.maybeNull(types.array(loadGameListModel))
})
export const fakeBetsModel = types.model({
_id: types.maybeNull(types.string),
betAmount: types.maybeNull(types.number),
betRate: types.maybeNull(types.number),
event: types.maybeNull(types.string),
createdAt: types.maybeNull(types.number),
userId: types.maybeNull(types.number),
sportsId: types.maybeNull(types.string)
})
export const figuresBettingModel = types.model({
  _id: types.maybeNull(types.string),
  amount: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  })

  export const eventModel = types.model({
    name: types.maybeNull(types.string),
    openDate: types.maybeNull(types.number)
  })

export const matchedBetsDataModel = types.model({
  bettor: types.maybeNull(types.string),
  master: types.maybeNull(types.string),
  runner: types.maybeNull(types.string),
  runnerId: types.maybeNull(types.string),
  marketId: types.maybeNull(types.string),
  size: types.maybeNull(types.number),
  price: types.maybeNull(types.number),
  event: types.maybeNull(types.array(eventModel)),
  createdAt: types.maybeNull(types.number),
  type: types.maybeNull(types.number),
  fancyData: types.maybeNull(types.string),
  fancyRate: types.maybeNull(types.number),
  isfancyOrbookmaker: types.maybeNull(types.boolean),
  subMarketId: types.maybeNull(types.string),
  betSession: types.maybeNull(types.number)
})
export const matchBetEventModel = types.model({
  name: types.maybeNull(types.string),
  openDate: types.maybeNull(types.number)
})