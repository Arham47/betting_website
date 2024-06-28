import { cast, flow, types } from "mobx-state-tree";
import { betApi } from "../../api";
import { toJS } from "mobx";
import { catchError } from "@utils/common-functions";
import { notification } from "@utils/notifications";
import { allCasinoCategoryModel, allSelectedCasinosModel, betFairDataModel, betsModel, fakeBetsModel, figuresBettingModel, getGameModel, loadDashoboardGamesModal, loadGameListModel, matchBetEventModel, matchedBetsDataModel } from "@stores/store-utils/bet";

export const bet = types
  .model({
    userBets: types.maybeNull(types.array(betsModel)),
    userBetsTotal: types.maybeNull(types.number),
    loadingPlaceBet: types.maybeNull(types.optional(types.boolean, false)),
    loadingBettingFigursData: types.maybeNull(types.optional(types.boolean, false)),
    loadingBetFairGames: types.maybeNull(types.optional(types.boolean, false)),
    loadingDataForBetSlipsData: types.maybeNull(types.optional(types.boolean, false)),
    loadingGameDataProfitLoss: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllSportsData: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllBettors: types.maybeNull(types.optional(types.boolean, false)),
    loadingFancyLists: types.maybeNull(types.optional(types.boolean, false)),
    loadingCasinoLists: types.maybeNull(types.optional(types.boolean, false)),
    loadingBettorLedger: types.maybeNull(types.optional(types.boolean, false)),
    loadingBetsview: types.maybeNull(types.optional(types.boolean, false)),
    loadingUpdateBetPlaceHold: types.maybeNull(types.optional(types.boolean, false)),
    loadingOneOBetCasinos: types.maybeNull(types.optional(types.boolean, false)),
    loadingSaveAsianDashboard: types.maybeNull(types.optional(types.boolean, false)),
    loadingWaitingBetsForManuel: types.maybeNull(types.optional(types.boolean, false)),
    loadingPostSessionScore: types.maybeNull(types.optional(types.boolean, false)),
    loadingSingleBetCancel: types.maybeNull(types.optional(types.boolean, false)),
    loadingGameCategoryData: types.maybeNull(types.optional(types.boolean, false)),
    loadingBetRates: types.maybeNull(types.optional(types.boolean, false)),
    loadingProfitLoss: types.maybeNull(types.optional(types.boolean, false)),
    loadingBettingFigures: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetDashBoardGames: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllCasinoGameesCategory: types.maybeNull(types.optional(types.boolean, false)),
    loadingFakeBets: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllFakeBetsOddsData: types.maybeNull(types.optional(types.boolean, false)),
    loadingDashboadGameForSlider: types.maybeNull(types.optional(types.boolean, true)),
    loadingGetMarketsByEventIdData: types.maybeNull(types.optional(types.boolean, true)),
    loadingBetterDashBoardGames: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetGameByCategoryName: types.maybeNull(types.optional(types.boolean, false)),
    loadingUserBetsList: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllCasinoGameList: types.maybeNull(types.optional(types.boolean, false)),
    loadingPostSelectedGames: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllSelectedCasinos: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllSelectedAsianGame: types.maybeNull(types.optional(types.boolean, false)),
    loadingAddCasinoGameDetail: types.maybeNull(types.optional(types.boolean, false)),
    loadingMatchSettlementData: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetMarketIdsData: types.maybeNull(types.optional(types.boolean, false)),
    loadingGameListIframLink: types.maybeNull(types.optional(types.boolean, false)),
    deleteFakeBetLoading: types.maybeNull(types.optional(types.boolean, false)),
    loadingForDashboardGameSave: types.maybeNull(types.optional(types.boolean, false)),
    betFairData: types.maybeNull(betFairDataModel),
    allSelectedCasinos: types.maybeNull(types.array(allSelectedCasinosModel)),
    loadAllCasinoCategorList: types.maybeNull(types.array(allCasinoCategoryModel)),
    loadAllGameListDataModel: types.maybeNull(types.array(loadGameListModel)),
    loadDashoboardGames: types.maybeNull(types.array(loadDashoboardGamesModal)),
    loadGameIFrameData:  types.maybeNull(getGameModel),
    loadAllGameByCategoryNameList: types.maybeNull(types.array(loadGameListModel)),
    loadAllFakeBetsDataListData: types.maybeNull(types.array(fakeBetsModel)),
    loadAllBettingFiguresList: types.maybeNull(types.array(figuresBettingModel)),
    matchedBetsData: types.maybeNull(types.array(matchedBetsDataModel)),
    matchedBetEvent: types.maybeNull(types.array(matchBetEventModel)),
    loadUserAccountSat:types.maybeNull(types.optional(types.boolean, false)),
    submitFancyStore:types.maybeNull(types.optional(types.boolean, false)),
    submitCasinoAmount:types.maybeNull(types.optional(types.boolean, false)),

  })
  .views((self) => ({
    get isLoadingPlaceBet() {
      return self.loadingPlaceBet;
    },
    get getMatchedBetsData() {
      return toJS(self.matchedBetsData);
    },
    get getMatchedBetEvent(){
      return toJS(self.matchedBetEvent)
    },
    get betFairGames() {
      return toJS(self.betFairData);
    },
    get allSelectedCasinosData() {
      return toJS(self.allSelectedCasinos);
    },
    get getAllCasinoGameCategory(){
      return toJS(self.loadAllCasinoCategorList)
    },
    get getloadDashoboardGames(){
      return toJS(self.loadDashoboardGames)
    },
    get getUserBets() {
      return toJS(self.userBets);
    },
    get getUserBetsTotal (){
      return toJS(self.userBetsTotal)
     },
    get isLoadingUserBetsList() {
      return self.loadingUserBetsList;
    },
    get getLoadGameListByCategory(){
      return self.loadAllGameListDataModel;
    },
    get getGameListIframeLinkData(){
      return toJS(self.loadGameIFrameData);
    },
    get getLoadAllBettingFiguresList(){
      return toJS(self.loadAllBettingFiguresList)
    },
    get getLoadAllGameByCategoryNameList(){
      return toJS(self.loadAllGameByCategoryNameList)
    },
    get getLoadAllFakeBetsData(){
      return toJS(self.loadAllFakeBetsDataListData)
    }
  }))
  .actions((self) => {
    const postPlaceBet = flow(function* (user: any) {
      let response = null;
      self.loadingPlaceBet = true;
      try {
        const res = yield betApi.postPlaceBet(user);
        if (res?.success) {
          notification.success(res?.message);
        }
        response = res;
      } catch (error) {
        self.loadingPlaceBet = false;
        response = error?.response?.data?.errors;
        catchError(error, "postPlaceBet");
      } finally {
        self.loadingPlaceBet = false;
        return response;
      }
    });

    const loadBetFairGames = flow(function* (navigate = null) {
      self.loadingBetFairGames = true;
      let response = null;
      try {
        self.loadingBetFairGames = true;
        const res = yield betApi.getBetFairGames();
        response = res;
        self.betFairData = res;
      } catch (error) {
        catchError(error, "loadBetFairGames");
        response = error.response;
      } finally {
        self.loadingBetFairGames = false;
        return response;
      }
    });
    const loadAllBetRatesData = flow(function* (id) {
      self.loadingBetRates = true;
      let response = null;
      try {
        self.loadingBetRates = true;
        const res = yield betApi.getBetRatesData(id);
        response = res;
      } catch (error) {
        catchError(error, "loadBetFairGames");
        response = error.response;
      } finally {
        self.loadingBetRates = false;
        return response;
      }
    });
    const loadAllBettingFigures = flow(function* () {
      self.loadingBettingFigures = true;
      let response = null;
      try {
        self.loadingBettingFigures = true;
        const res = yield betApi.getBettingFigures();
        response = res;
        if(res?.success){
          self.loadAllBettingFiguresList = res?.data
        }
      } catch (error) {
        catchError(error, "loadAllBettingFigures");
        response = error.response;
      } finally {
        self.loadingBettingFigures = false;
        return response;
      }
    });
    const loadLiveStreemingData = flow(function* (id) {
      let response = null;
      try {
          const res = yield betApi.getLiveTvData(id);
        response = res;
      } catch (error) {
        catchError(error, "loadLiveStreemingData");
        response = error.response;
      } finally {
        return response;
      }
    });
    const updateBettingFigursData = flow(function* (data: any) {
      let response = null;
      self.loadingBettingFigursData = true;
      try {
        const res = yield betApi.updateBettingFirurs(data);
        if (res?.success) {
          notification.success(res?.message);
        }
        response = res;
      } catch (error) {
        catchError(error, "updateBettingFigursData");
      } finally {
        self.loadingBettingFigursData = false;
        return response;
      }
    });
    const postFigureBetPlaceData = flow(function* (data: any) {
      let response = null;
      self.loadingBettingFigursData = true;
      try {
        const res = yield betApi.postFigureBettingBetPlace(data);
        if (res?.success) {
          notification.success(res?.message);
        }
        response = res;
      } catch (error) {
        self.loadingBettingFigursData = false;
        catchError(error, "postFigureBetPlaceData");
      } finally {
        self.loadingBettingFigursData = false;
        return response;
      }
    });
    const loadCountOfFakeBetsData = flow(function* () {
      self.loadingBetRates = true;
      let response = null;
      try {
        self.loadingBetRates = true;
        const res = yield betApi.getFakeBetsCount();
        response = res;
      } catch (error) {
        catchError(error, "loadCountOfFakeBetsData");
        response = error.response;
      } finally {
        self.loadingBetRates = false;
        return response;
      }
    });
    const loadAllCasinoCategoryGames = flow(function* (navigate = null) {
      self.loadingAllCasinoGameesCategory = true;
      let response = null;
      try {
        self.loadingAllCasinoGameesCategory = true;
        const res = yield betApi.getAllCasinoCategoriesGames();
        response = res;
        self.loadAllCasinoCategorList = res?.results
      } catch (error) {
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingAllCasinoGameesCategory = false;
        return response;
      }
    });
    const loadAllFakeBetsDataList = flow(function* (navigate = null) {
      self.loadingFakeBets = true;
      let response = null;
      try {
        self.loadingFakeBets = true;
        const res = yield betApi.getAllFakeBetsData();
        response = res;
        self.loadAllFakeBetsDataListData = res?.results
      } catch (error) {
        catchError(error, "loadAllFakeBetsDataList");
        response = error.response;
      } finally {
        self.loadingFakeBets = false;
        return response;
      }
    });
    const loadAllFakeBetsOddsData = flow(function* (id, sportsId, navigate = null) {
      self.loadingAllFakeBetsOddsData = true;
      let response = null;
      try {
        self.loadingAllFakeBetsOddsData = true;
        const res = yield betApi.getAllFakeBetsOddsForFake(id, sportsId);
        response = res;
        // self.loadAllFakeBetsDataListData = res?.results
      } catch (error) {
        catchError(error, "loadAllFakeBetsDataList");
        response = error.response;
      } finally {
        self.loadingAllFakeBetsOddsData = false;
        return response;
      }
    });

    const loadAllCasinoGameListByCategory = flow(function* (id) {
      self.loadingAllCasinoGameList = true;
      let response = null;
      try {
        self.loadingAllCasinoGameList = true;
        const res = yield betApi.getCasinoGameListByCategory(id);
        response = res;
        if(res?.success){
          self.loadAllGameListDataModel = res?.results;
        }
      } catch (error) {
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingAllCasinoGameList = false;
        return response;
      }
    });

    const postUserBetsList = flow(function* (
      data 
    ) {
      self.loadingUserBetsList = true;
      let response = null;
      try {
        const res = yield betApi.postUserBetsList(data);
        response = res;
        self.userBets = res?.results?.docs;
        self.userBetsTotal = res?.results?.total;
        // self.userBets = res?.results;
      } catch (error) {
        self.userBets = null;
        self.userBetsTotal =0
        catchError(error, "postUserBetsList");
        response = error.response;
      } finally {
        self.loadingUserBetsList = false;
        return response;
      }
    });
    const updateDataOfFakeBets = flow(function* (
      id 
    ) {
      let response = null;
      try {
        const res = yield betApi.updateFakeBetList(id);
        response = res;
        if(res?.success) notification.info(res?.message);
      } catch (error) {
        catchError(error, "updateDataOfFakeBets");
        response = error.response;
      } finally {
        return response;
      }
    });
    const postCasinoSelectedGames = flow(function* (
      data 
    ) {
      self.loadingPostSelectedGames = true;
      let response = null;
      try {
        const res = yield betApi.postSelectedGames(data);
        response = res;
        if(res?.success) notification.success(res?.message);
      } catch (error) {
        catchError(error, "postCasinoSelectedGames");
        response = error.response;
      } finally {
        self.loadingPostSelectedGames = false;
        return response;
      }
    });

    const loadAllSelectedCasinos = flow(function* (payload) {
      self.loadingAllSelectedCasinos = true;
      let response = null;
      try {
        self.loadingAllSelectedCasinos = true;
        const res = yield betApi.getAllSelectedCasinos(payload);
        response = res;
        self.allSelectedCasinos = res?.results;
      } catch (error) {
        self.loadingAllSelectedCasinos = false;
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingAllSelectedCasinos = false;
        return response;
      }
    });
    const loadAllSelectedAsianGames = flow(function* (payload) {
      self.loadingAllSelectedAsianGame = true;
      let response = null;
      try {
        self.loadingAllSelectedAsianGame = true;
        const res = yield betApi.getAllSelectedAsianGame(payload);
        response = res;
        // self.allSelectedCasinos = res?.results;
      } catch (error) {
        self.loadingAllSelectedAsianGame = false;
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingAllSelectedAsianGame = false;
        return response;
      }
    });
    const loadAddCasinoGameDetailsData = flow(function* (payload) {
      self.loadingAddCasinoGameDetail = true;
      let response = null;
      try {
        self.loadingAddCasinoGameDetail = true;
        const res = yield betApi.getAddSelectedCasinoGame(payload);
        response = res;
        self.allSelectedCasinos = res?.results;
      } catch (error) {
        self.loadingAddCasinoGameDetail = false;
        catchError(error, "loadAddCasinoGameDetailsData");
        response = error.response;
      } finally {
        self.loadingAddCasinoGameDetail = false;
        return response;
      }
    });
    const loadSelectedDashBoardGames = flow(function* (pageSize) {
      self.loadingAllSelectedCasinos = true;
      let response = null;
      try {
        self.loadingAllSelectedCasinos = true;
        const res = yield betApi.getSelectedGamesForDashboard(pageSize);
        response = res;
        self.allSelectedCasinos = res?.results;
      } catch (error) {
        self.loadingAllSelectedCasinos = false;
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingAllSelectedCasinos = false;
        return response;
      }
    });
    const loadGetMatchSettlements = flow(function* () {
      self.loadingMatchSettlementData = true;
      let response = null;
      try {
        const res = yield betApi.getMatchSettlements();
        response = res;
      } catch (error) {
        self.loadingMatchSettlementData = false;
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingMatchSettlementData = false;
        return response;
      }
    });
    const loadGetMarketIDSData = flow(function* (data) {
      self.loadingGetMarketIdsData = true;
      let response = null;
      try {
        const res = yield betApi.loadMarketIdsDataGet(data);
        response = res;
      } catch (error) {
        self.loadingGetMarketIdsData = false;
        catchError(error, "loadCasinoCategoryGames");
        response = error.response;
      } finally {
        self.loadingGetMarketIdsData = false;
        return response;
      }
    });
    const loadGetDashBoardGames = flow(function* (payload) {
      self.loadingGetDashBoardGames = true;
      let response = null;
      try {
        const res = yield betApi.getDashBoardGameByCategory(payload);
        response = res;
      } catch (error) {
        self.loadingGetDashBoardGames = false;
        catchError(error, "loadGetDashBoardGames");
        response = error.response;
      } finally {
        self.loadingGetDashBoardGames = false;
        return response;
      }
    });
     const loadGetGameListIframeLink = flow(function* (data) {
      self.loadingGameListIframLink = true;
      let response = null;
      try {
        self.loadingGameListIframLink = true;
        const res = yield betApi.getGameListIFrameLink(data);
        response = res;
        if(res?.success){
          self.loadGameIFrameData =res?.results
        }
       
      } catch (error) {
        catchError(error, "loadGetGameListIframeLink");
        response = error.response;
      } finally {
        self.loadingGameListIframLink = false;
        return response;
      }
    });
    const loadSaveGameFortheDashBoardGameList = flow(function* (data, isButtonClick=false) {
     if(isButtonClick) self.loadingForDashboardGameSave = true;
      let response = null;
      try {
        const res = yield betApi.loadAllSaveGameForDashboard(data);
        response = res;  
        if(res?.success&&isButtonClick) notification.success(res?.message);
      } catch (error) {
        catchError(error, "loadSaveGameFortheDashBoardGameList");
        response = error.response;
      } finally {
        self.loadingForDashboardGameSave = false;
        return response;
      }
    });
    const loadAllDashboardGames = flow(function* () {
      self.loadingDashboadGameForSlider = true;
      let response = null;
      try {
        self.loadingDashboadGameForSlider = true;
        const res = yield betApi.getAllDashboardGames();
        response = res;
        self.loadDashoboardGames =res?.results
      } catch (error) {
        catchError(error, "loadAllDashboardGames");
        response = error.response;
      } finally {
        self.loadingDashboadGameForSlider = false;
        return response;
      }
    });

    const loadGetMarketsByEventIdData = flow(function* (Id) {
      self.loadingGetMarketsByEventIdData = true;
      let response = null;
      try {
        self.loadingGetMarketsByEventIdData = true;
        const res = yield betApi.getMarketsByEventIdData(Id);
        response = res;
        self.loadDashoboardGames =res?.results
      } catch (error) {
        catchError(error, "loadGetMarketsByEventIdData");
        response = error.response;
      } finally {
        self.loadingGetMarketsByEventIdData = false;
        return response;
      }
    });

    const loadAllBetterDashBoardGames = flow(function* (isMobile) {
      self.loadingBetterDashBoardGames = true;
      let response = null;
      try {
        self.loadingBetterDashBoardGames = true;
        const res = yield betApi.getAllBetterDashBoardGames(isMobile);
        response = res;
       self.loadingBetterDashBoardGames = false
      } catch (error) {
        self.loadingBetterDashBoardGames = false;
        catchError(error, "loadAllBetterDashBoardGames");
        response = error.response;
      } finally {
        self.loadingBetterDashBoardGames = false;
        return response;
      }
    });
    const loadCricektTenissSoccerGamesData = flow(function* () {
      let response = null;
      try {
        const res = yield betApi.getCricketTenissSoccerGame();
        response = res;
      } catch (error) {
        catchError(error, "loadCricektTenissSoccerGamesData");
        response = error.response;
      } finally {
        return response;
      }
    });
    const loadAllGameByCategoryName = flow(function* (gameCategory) {
      self.loadingGetGameByCategoryName = true;
      let response = null;
      try {
        self.loadingGetGameByCategoryName = true;
        const res = yield betApi.getGameByCategoryName(gameCategory);
        response = res;
        self.loadAllGameByCategoryNameList =res?.results
      } catch (error) {
        catchError(error, "loadAllGameByCategoryName");
        response = error.response;
      } finally {
        self.loadingGetGameByCategoryName = false;
        return response;
      }
    });

    const loadDeleteFakeBet = flow(function* (id) {
      try {
        self.deleteFakeBetLoading = true;
        const res = yield betApi.deleteFakeBet(id);
        if(res?.success) notification.info(res?.message);
      } catch (error) {
        catchError(error);
      } finally {
        self.deleteFakeBetLoading = false;
      }
    });

    const loadMatchedBets = flow(function* (id) {
      self.loadingDataForBetSlipsData = true;
      let response = null;
      try {
        const res = yield betApi.getMatchedBets(id);
        response = res;
        self.matchedBetsData = res?.data;
        self.matchedBetEvent = res?.events;
      } catch (error) {
        catchError(error, "loadMatchedBets");
        response = error.response;
      } finally {
        self.loadingDataForBetSlipsData = false;
        return response;
      }
    });

    const loadCurrentPositionDetails = flow(function* (id) {
      // self.loadingDataForBetSlipsData = true;
      let response = null;
      try {
        const res = yield betApi.getCurrentPositionDetails(id);
        response = res;
        // self.matchedBetsData = res?.data;
        // self.matchedBetEvent = res?.events;
      } catch (error) {
        catchError(error, "loadCurrentPositionDetails");
        response = error.response;
      } finally {
        // self.loadingDataForBetSlipsData = false;
        return response;
      }
    });

    const loadProfitLossData = flow(function* (id) {
      self.loadingProfitLoss = true;
      let response = null;
      try {
        self.loadingProfitLoss = true;
        const res = yield betApi.getProfitLossResult(id);
        response = res;
      } catch (error) {
        catchError(error, "loadProfitLossData");
        response = error.response;
      } finally {
        self.loadingProfitLoss = false;
        return response;
      }
    });
    const loadGameDataOfProfitLoss = flow(function* (data) {
      self.loadingGameDataProfitLoss = true;
      let response = null;
      try {
        self.loadingGameDataProfitLoss = true;
        const res = yield betApi.getLoadProfitLossDataOfGame(data);
        response = res;
      } catch (error) {
        catchError(error, "loadGameDataOfProfitLoss");
        response = error.response;
      } finally {
        self.loadingGameDataProfitLoss = false;
        return response;
      }
    });
    const loadSportsBookData = flow(function* () {
      let response = null;
      try {
        const res = yield betApi.getSportsBookIframeLink();
        response = res;
      } catch (error) {
        catchError(error, "loadSportsBookData");
        response = error.response;
      } finally {
        return response;
      }
    });
    const loadSportsBookDataDirect = flow(function* () {
      let response = null;
      try {
        const res = yield betApi.getSportsBookIframeLinkDirect();
        response = res;
      } catch (error) {
        catchError(error, "loadSportsBookDataDirect");
        response = error.response;
      } finally {
        return response;
      }
    });
    const getGamesCateGoryData = flow(function* () {
      self.loadingGameCategoryData = true;
      let response = null;
      try {
        const res = yield betApi.loadGameCategoryData();
        response = res;
      } catch (error) {
        catchError(error, "getGamesCateGoryData");
        response = error.response;
      } finally {
        self.loadingGameCategoryData = false;
        return response;
      }
    });
    const loadAllSportsResultsData = flow(function* (payload) {
      self.loadingAllSportsData = true;
      let response = null;
      try {
        const res = yield betApi.getAllMatchResult(payload);
        response = res;
      } catch (error) {
        catchError(error, "loadAllSportsResultsData");
        response = error.response;
      } finally {
        self.loadingAllSportsData = false;
        return response;
      }
    });

    const loadSportBook = flow(function* (payload) {
      // self.loadingAllSportsData = true;
      let response = null;
      try {
        const res = yield betApi.loadSportBookData(payload);
        response = res;
      } catch (error) {
        catchError(error, "loadAllSportsResultsData");
        response = error.response;
      } finally {
        // self.loadingAllSportsData = false;
        return response;
      }
    });

    const loadEventWinnerName = flow(function* (payload) {
      // self.loadingAllSportsData = true;
      let response = null;
      try {
        const res = yield betApi.getEventWinnerName(payload);
        response = res;
      } catch (error) {
        catchError(error, "loadEventWinnerName");
        response = error.response;
      } finally {
        // self.loadingAllSportsData = false;
        return response;
      }
    });

    const loadWaitingBetsForManuel = flow(function* () {
      self.loadingWaitingBetsForManuel = true;
      let response = null;
      try {
        const res = yield betApi.getWaitingBetsForManuel();
        response = res;
      } catch (error) {
        catchError(error, "loadWaitingBetsForManuel");
        response = error.response;
      } finally {
        self.loadingWaitingBetsForManuel = false;
        return response;
      }
    });
    
    const loadSessionScore = flow(function* (data) {
      // self.loadingAllSportsData = true;
      let response = null;
      try {
        const res = yield betApi.getSessionScore(data);
        response = res;
      } catch (error) {
        catchError(error, "loadSessionScore");
        response = error.response;
      } finally {
        // self.loadingAllSportsData = false;
        return response;
      }
    });

    const postSessionScore = flow(function* (data) {
      self.loadingPostSessionScore = true;
      let response = null;
      try {
        const res = yield betApi.setSessionScore(data);
        response = res;
      } catch (error) {
        catchError(error, "postSessionScore");
        response = error.response;
      } finally {
        self.loadingPostSessionScore = false;
        return response;
      }
    });

    const cancelSingleBet = flow(function* (data) {
      let response = null;
      self.loadingSingleBetCancel = true;
      try {
        const res = yield betApi.cancelSingleBetData(data);
        response = res;
        if(res?.success) notification.success(res?.message);
      } catch (error) {
        catchError(error, "cancelSingleBet");
        response = error.response;
      } finally {
        self.loadingSingleBetCancel = false;
        return response;
      }
    });

    const loadAllBettors = flow(function* (queryParam) {
      self.loadingAllBettors = true;
      let response = null;
      try {
        const res = yield betApi.getAllBettors(queryParam);
        response = res;
      } catch (error) {
        catchError(error, "loadAllBettors");
        response = error.response;
      } finally {
        self.loadingAllBettors = false;
        return response;
      }
    });

    const loadFancyLists = flow(function* (queryParam) {
      self.loadingFancyLists = true;
      let response = null;
      try {
        const res = yield betApi.getFancyLists(queryParam);
        response = res;
      } catch (error) {
        catchError(error, "loadFancyLists");
        response = error.response;
      } finally {
        self.loadingFancyLists = false;
        return response;
      }
    });

    const loadCasinoLists = flow(function* (queryParam) {
      self.loadingCasinoLists = true;
      let response = null;
      try {
        const res = yield betApi.getCasinoLists(queryParam);
        response = res;
      } catch (error) {
        catchError(error, "loadCasinoLists");
        response = error.response;
      } finally {
        self.loadingCasinoLists = false;
        return response;
      }
    });

    const loadBettorLedger = flow(function* (queryParam) {
      self.loadingBettorLedger = true;
      let response = null;
      try {
        const res = yield betApi.getBettorLedger(queryParam);
        response = res;
      } catch (error) {
        catchError(error, "loadBettorLedger");
        response = error.response;
      } finally {
        self.loadingBettorLedger = false;
        return response;
      }
    });
    

    const loadBetsview = flow(function* (id) {
      self.loadingBetsview = true;
      let response = null;
      try {
        const res = yield betApi.getBetView(id);
        response = res;
      } catch (error) {
        catchError(error, "getBetView");
        response = error.response;
      } finally {
        self.loadingBetsview = false;
        return response;
      }
    });


    const loadUserAccountSattle = flow(function* (data) {
      self.loadUserAccountSat = true;
      let response = null;
      try {
        const res = yield betApi.postUserAccountSattle(data);
        response = res;
      } catch (error) {
        catchError(error, "loadUserAccountSattle");
        response = error.response;
      } finally {
        self.loadUserAccountSat = false;
        return response;
      }
    });

    const setFancyStore = flow(function* (data) {
      self.submitFancyStore = true;
      let response = null;
      try {
        const res = yield betApi.setFancyStore(data);
        response = res;
      } catch (error) {
        catchError(error, "setFancyStore");
        response = error.response;
      } finally {
        self.submitFancyStore = false;
        return response;
      }
    });

    const setCasinoAmount = flow(function* (data) {
      self.submitCasinoAmount = true;
      let response = null;
      try {
        const res = yield betApi.setCasinoAmount(data);
        response = res;
      } catch (error) {
        catchError(error, "setCasinoAmount");
        response = error.response;
      } finally {
        self.submitCasinoAmount = false;
        return response;
      }
    });

    const loadUpdateBetPlaceHold = flow(function* (data) {
      self.loadingUpdateBetPlaceHold = true;
      let response = null;
      try {
        const res = yield betApi.updateBetPlaceHold(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        catchError(error, "loadUpdateBetPlaceHold");
        response = error.response;
      } finally {
        self.loadingUpdateBetPlaceHold = false;
        return response;
      }
    });
    
    const loadoneOBetCasinos = flow(function* () {
      self.loadingOneOBetCasinos = true;
      let response = null;
      try {
        self.loadingOneOBetCasinos = true;
        const res = yield betApi.liveTvGetAsianTables();
        response = res;
        // self.allSelectedCasinos = res?.results;
      } catch (error) {
        self.loadingOneOBetCasinos = false;
        catchError(error, "loadoneOBetCasinos");
        response = error.response;
      } finally {
        self.loadingOneOBetCasinos = false;
        return response;
      }
    });

    const loadSaveAsianDashboard = flow(function* (data) {
      self.loadingSaveAsianDashboard = true;
      let response = null;
      try {
        self.loadingSaveAsianDashboard = true;
        const res = yield betApi.saveAsianDashboard(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingSaveAsianDashboard = false;
        catchError(error, "loadSaveAsianDashboard");
        response = error.response;
      } finally {
        self.loadingSaveAsianDashboard = false;
        return response;
      }
    });
    
    // getAllSelectedCasinos
    return {
      loadAllSelectedCasinos,
      postPlaceBet,
      loadBetFairGames,
      postUserBetsList,
      loadAllCasinoCategoryGames,
      postCasinoSelectedGames,
      loadAllCasinoGameListByCategory,
      loadGetGameListIframeLink,
      loadAllDashboardGames,
      loadAllGameByCategoryName,
      loadSaveGameFortheDashBoardGameList,
      loadAllFakeBetsDataList,
      loadDeleteFakeBet, 
      loadAllBetRatesData,
      updateDataOfFakeBets,
      loadCountOfFakeBetsData,
      loadAllBettingFigures,
      updateBettingFigursData,
      postFigureBetPlaceData,
      loadLiveStreemingData,
      loadAllFakeBetsOddsData,
      loadMatchedBets,
      loadAllBetterDashBoardGames,
      loadSelectedDashBoardGames,
      loadGetMatchSettlements,
      loadGetDashBoardGames,
      getGamesCateGoryData,
      loadAllSportsResultsData,
      loadCricektTenissSoccerGamesData,
      loadSportsBookData,
      loadSportsBookDataDirect,
      loadProfitLossData,
      loadGameDataOfProfitLoss,
      loadCurrentPositionDetails,
      loadGetMarketIDSData,
      loadSportBook,
      loadEventWinnerName,
      loadWaitingBetsForManuel,
      loadSessionScore,
      postSessionScore,
      cancelSingleBet,
      loadAllBettors,
      loadBettorLedger,
      loadAllSelectedAsianGames,
      loadAddCasinoGameDetailsData,
      loadUpdateBetPlaceHold,
      loadBetsview,
      loadUserAccountSattle,
      loadoneOBetCasinos,
      loadSaveAsianDashboard,
      loadGetMarketsByEventIdData,
      loadFancyLists,
      loadCasinoLists,
      setCasinoAmount,
      setFancyStore
    };
  });

export function initBet() {
  return bet.create({});
}
