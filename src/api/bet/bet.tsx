import { getAuthorizationHeader } from "../common-utils";
import axios from "axios";
import {
  SetAsianDashboardUrl,
  UpdateBettingFiguresUrl,
  battorsListUrl,
  betsViewUrl,
  bettorsLedgerUrl,
  cancelSingleBetUrl,
  cricketTenissSoccerDataUrl,
  currentPositionDetailsUrl,
  dashBoardGameForCategoryUrl,
  deleteFakeBet,
  fancyListUrl,
  figureBettingBetPlaceUrl,
  gameCategoryUrl,
  getAddSelectedCasinoGameUrl,
  getAllBetFairGames,
  getAllCasinoGamesListUrl,
  getAllDashboardGames,
  getAllGammesResultsUrl,
  getAllSelectedAsianGameUrl,
  getAllSelectedCasinos,
  getBetterDashBoardGamesUrl,
  getBettingFiguresUrl,
  getCasinoGameListByCategoryUrl,
  getEventWinnerNameUrl,
  getFakeBetCountsUrl,
  getFakeBetRatesUrl,
  getFakeBetsDataOddsUrl,
  getFakeBetsDataUrl,
  getGameByCategoryNameUrl,
  getGameDataOFProfitLossUrl,
  getGameListIframeLinkUrl,
  getLoadMarketIdsDataUrl,
  getMarketsByEventIdUrl,
  getMatchSettlementUrl,
  getMatchedBetsUrl,
  getProfitLossDataUrl,
  getSaveGameForDashboardUrl,
  getSessionScoreUrl,
  getUserBetsListUrl,
  getWaitingBetsForManuelUrl,
  liveTvDataUrl,
  liveTvGetAsianTablesUrl,
  postCasinoSelectedGameListUrl,
  postPlaceBetUrl,
  setFancyStore,
  setSessionScoreUrl,
  sportBookUrl,
  sportsBookLinkDirectUrl,
  sportsBookLinkUrl,
  updateBetPlaceHoldUrl,
  updateFakeBetListUrl,
  userAccountSattleUrl, casinoListUrl, setCasinoAmountUrl
} from "../const";
import { BaseApi } from "../baseApi";

class BetApi extends BaseApi {
  postPlaceBet = async (data) => {
    try {
      const response = await axios.post(postPlaceBetUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getBetFairGames = async () => {
    try {
      const response = await axios.get(getAllBetFairGames, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBetRatesData = async (id) => {
    try {
      const response = await axios.get(`${getFakeBetRatesUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBettingFigures = async () => {
    try {
      const response = await axios.get(`${getBettingFiguresUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getLiveTvData = async (id) => {
    try {
      const response = await axios.get(`${liveTvDataUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateBettingFirurs = async (data) => {
    try {
      const response = await axios.post(`${UpdateBettingFiguresUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  postFigureBettingBetPlace = async (data) => {
    try {
      const response = await axios.post(`${figureBettingBetPlaceUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getFakeBetsCount = async () => {
    try {
      const response = await axios.get(`${getFakeBetCountsUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllCasinoCategoriesGames = async () => {
    try {
      const response = await axios.get(getAllCasinoGamesListUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllFakeBetsData = async () => {
    try {
      const response = await axios.get(getFakeBetsDataUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllFakeBetsOddsForFake = async (id, sportsId) => {
    try {
      const response = await axios.get(`${getFakeBetsDataOddsUrl}/${id}/${sportsId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllFakeBetsOdds = async () => {
    try {
      const response = await axios.get(getFakeBetsDataUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getCasinoGameListByCategory = async (id) => {
    try {
      const response = await axios.get(`${getCasinoGameListByCategoryUrl}?_id=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  postUserBetsList = async (data) => {
    try {
      const response = await axios.post(`${getUserBetsListUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateFakeBetList = async (id) => {
    try {
      const response = await axios.post(`${updateFakeBetListUrl}/${id}`, {}, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  postSelectedGames = async (data) => {
    try {
      const response = await axios.post(`${postCasinoSelectedGameListUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllSelectedCasinos = async (payload) => {
    try {
      const response = await axios.post(getAllSelectedCasinos, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllSelectedAsianGame = async (payload) => {
    try {
      const response = await axios.post(getAllSelectedAsianGameUrl, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAddSelectedCasinoGame = async (payload) => {
    try {
      const response = await axios.post(getAddSelectedCasinoGameUrl, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getSelectedGamesForDashboard = async (pageSize) => {
    try {
      const response = await axios.get(`${getAllSelectedCasinos}?numRecords=${pageSize}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getGameListIFrameLink = async (data) => {
    try {
      const response = await axios.post(`${getGameListIframeLinkUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadAllSaveGameForDashboard = async (data) => {
    try {
      const response = await axios.post(`${getSaveGameForDashboardUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllDashboardGames = async () => {
    try {
      const response = await axios.get(getAllDashboardGames, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllBetterDashBoardGames = async (isMobile) => {
    try {
      const response = await axios.get(`${getBetterDashBoardGamesUrl}?isMobile=${isMobile}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCricketTenissSoccerGame = async () => {
    try {
      const response = await axios.get(`${cricketTenissSoccerDataUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMatchSettlements = async () => {
    try {
      const response = await axios.get(getMatchSettlementUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDashBoardGameByCategory = async (payload) => {
    try {
      const response = await axios.post(dashBoardGameForCategoryUrl, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadMarketIdsDataGet = async (payload) => {
    try {
      const response = await axios.post(getLoadMarketIdsDataUrl, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  getGameByCategoryName = async (categoryName) => {
    try {
      const response = await axios.get(`${getGameByCategoryNameUrl}?category=${categoryName}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  deleteFakeBet = async (data) => {
    try {
      const response = await axios.delete(`${deleteFakeBet}/Id${data.Id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMatchedBets = async (id) => {
    try {
      const response = await axios.get(`${getMatchedBetsUrl}?id=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCurrentPositionDetails = async (id) => {
    try {
      const response = await axios.get(`${currentPositionDetailsUrl}?matchId=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSportsBookIframeLink = async () => {
    try {
      const response = await axios.get(sportsBookLinkUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getProfitLossResult = async (id) => {
    try {
      const response = await axios.get(`${getProfitLossDataUrl}?userId=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getLoadProfitLossDataOfGame = async (data) => {
    try {
      const response = await axios.get(`${getGameDataOFProfitLossUrl}?sportsId=${data?.id}&userId=${data?.userId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getSportsBookIframeLinkDirect = async () => {
    try {
      const response = await axios.get(sportsBookLinkDirectUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadGameCategoryData = async () => {
    try {
      const response = await axios.get(`${gameCategoryUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllMatchResult = async (gameId) => {
    try {
      const response = await axios.post(getAllGammesResultsUrl, gameId, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadSportBookData = async (data) => {
    try {
      const response = await axios.post(sportBookUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getEventWinnerName = async (data) => {
    try {
      const response = await axios.post(getEventWinnerNameUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getWaitingBetsForManuel = async () => {
    try {
      const response = await axios.get(getWaitingBetsForManuelUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSessionScore = async (data) => {
    try {
      const response = await axios.get(`${getSessionScoreUrl}?eventId=${data?.eventId}&sessionNo=${data?.sessionNo}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  setSessionScore = async (data) => {
    try {
      const response = await axios.post(setSessionScoreUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  cancelSingleBetData = async (data) => {
    try {
      const response = await axios.post(cancelSingleBetUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllBettors = async (queryParam) => {
    try {
      const response = await axios.get(`${battorsListUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getFancyLists = async (queryParam) => {
    try {
      const response = await axios.get(`${fancyListUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getCasinoLists = async (queryParam) => {
    try {
      const response = await axios.get(`${casinoListUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getBettorLedger = async (data) => {
    try {
      const response = await axios.get(`${bettorsLedgerUrl}?userId=${data?.id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getBetView = async (data) => {
    try {
      const response = await axios.get(`${betsViewUrl}?userId=${data?.id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };


  updateBetPlaceHold = async (data) => {
    try {
      const response = await axios.put(`${updateBetPlaceHoldUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  postUserAccountSattle = async (data) => {
    try {
      const response = await axios.post(`${userAccountSattleUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  setFancyStore = async (data) => {
    try {
      const response = await axios.post(`${setFancyStore}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  setCasinoAmount = async (data) => {
    try {
      const response = await axios.post(`${setCasinoAmountUrl}`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  liveTvGetAsianTables = async () => {
    try {
      const response = await axios.get(liveTvGetAsianTablesUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMarketsByEventIdData = async (Id) => {
    try {
      const response = await axios.get(`${getMarketsByEventIdUrl}/${Id.id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  saveAsianDashboard = async (data) => {
    try {
      const response = await axios.post(SetAsianDashboardUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

}

export default BetApi;
