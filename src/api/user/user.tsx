import { getAuthorizationHeader } from "../common-utils";
import axios from "axios";
import {
  addCashDepositUrl,
  addUserCreditUrl,
  allCashCreditDepositLedgerDataUrl,
  allCashDepositLedgerDataUrl,
  baseUrl,
  betFundsUrl,
  betNewsUrl,
  cashCreditLedgerDataUrl,
  cashDepositLedgerDataUrl,
  getLedgerDetailsUrl,
  createAddBetLockUrl,
  createAddBetSizesUrl,
  getAllBetSizeDataUrl,
  getAllCashDepositsUrl,
  getAllMarketTypesUrl,
  getAllDepositDataUrl,
  getAllSportsHighLightUrl,
  getAllUsersUrl,
  getExchangeRatesUrl,
  getFinalReport,
  getLoadBalanceUrl,
  getLoadUserActiveAndInActiveUrl,
  getLoadUserDeActiveUrl,
  getSingleUserUrl,
  getUserAllCreditsUrl,
  loadUserBalanceUrl,
  postCheckValidationUrl,
  postPlaceBetUrl,
  serachUsersUrl,
  updateAllMarketTypesUrl,
  updateBetAmountDataUrl,
  updateExchangeAmountUrl,
  updateUserUrl,
  withDrawCashDepositUrl,
  withdrawUserCreditUrl,
  getAllSideBarMenuUrl,
  getDailyPl,
  dailyPLSportsWiseReport,
  dailyPlMarketsReports,
  getCommissionReport,
  getDailyReportUrl,
  dailyReportSportsWiseReport,
  getSettlementDataUrl,
  sportsWiseCommissionReport,
  MarketWiseCommissionReport,
  bookDetail2DataUrl,
  getCurrentPositionDataUrl,
  listCompetitions,
  listInplayEvents,
  listEventsBySport,
  listOddsAPI,
  listOfRaceAPIUrl,
  updateMatchTypeUrl,
  racesMarketListUrl,
  searchSingleUserUrl,
  updateMatchUrl,
  settleMatchUrl,
  setMatchShowUrl,
  deleteSportUrl,
  MatchWiseDailyReportUrl,
  dailyMatchWiseReportDatailedUrl,
  dailyPlMatchWiseReportDatailedUrl,
  dailyMatchWiseprofitLose,
  userLoginActivitLogsUrl,
  getBookDetailReportUrl,
  bookDetailSportsWiseReportUrl,
  BookDetailMarketWiseReportUrl,
  BookDetailMatchWiseReportDetailDataUrl,
  setMatchBetAllowedUrl,
  sessionFigureUrl,
  updateSessionScoreUrl,
  fullBookModelDataUrl,
  saveMarketIDSWinnerRunnerUrl,
  getFinalReport2Url,
  deleteUserUrl,
  marketPositionsUrl,
  marketSharesUrl,
  getBetPlaceHoldUrl,
  getCurrentPositionDataUrl2,
  getHighlight,
  getAllCricketsUrl,
  updatemarketstatusUrl,
  getLedgerDetails2Url, updateMarketStatusInPlayUrl, activateEventUrl, refreshEventUrl, getAllSoccerUrl, getAllTennisUrl, getDealerDepositedCash, getDealerDepositedCredit
} from "../const";
import { BaseApi } from "../baseApi";
import { ADD_CASH_DEPOSITE, ADD_USER_CREDIT, GET_ALL_CASH_CREDITS, GET_ALL_CREDITS, WITHDRAW_CASH_DEPOSITE, WITHDRAW_USER_CREDIT } from "@components/users/const";
import { CAMEL_MARKET_ID_PARAM_KEY, CAMEL_USER_ID } from "@utils/const";

class UserApi extends BaseApi {
  onUserLogin = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  onCreateUser = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}register`, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDealerDepositedCash = async (data) => {
    try {
      const response = await axios.post(`${getDealerDepositedCash}`, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDealerDepositedCredit= async (data) => {
    try {
      const response = await axios.post(`${getDealerDepositedCredit}`, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onSettlePlAccount = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}settlePLAccount`, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getCurrentUserDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}getCurrentUser`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSingleUser = async (data) => {
    try {
      const response = await axios.post(getSingleUserUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onUserActive = async (data) => {
    try {
      const response = await axios.post(getLoadUserActiveAndInActiveUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onUserDeActive = async (data) => {
    try {
      const response = await axios.post(getLoadUserDeActiveUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllUsers = async (queryParam) => {
    try {
      const response = await axios.get(`${getAllUsersUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllCrickets = async (queryParam) => {
    try {
      const response = await axios.get(`${getAllCricketsUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllSoccer = async (queryParam) => {
    try {
      const response = await axios.get(`${getAllSoccerUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllTennis = async (queryParam) => {
    try {
      const response = await axios.get(`${getAllTennisUrl}${queryParam}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  postLoadUserBalance = async (data) => {
    try {
      const response = await axios.post(loadUserBalanceUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  searchUsers = async (data) => {
    try {
      const response = await axios.post(serachUsersUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadFullBookDetail = async (data) => {
    try {
      const response = await axios.post(fullBookModelDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  searchSingleUser = async (data) => {
    try {
      const response = await axios.post(searchSingleUserUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  updateUser = async (data) => {
    try {
      const response = await axios.post(updateUserUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadBalance = async (userId) => {
    try {
      const response = await axios.get(`${getLoadBalanceUrl}?${CAMEL_USER_ID}=${userId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  deleteUserDetails = async (id: Number) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}/`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  postAddBetSizes = async (data) => {
    try {
      const response = await axios.post(createAddBetSizesUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  postAddBetLock = async (data) => {
    try {
      const response = await axios.post(createAddBetLockUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  cashCreditOperations = async (data, exactApi) => {
    const verifyWhichAPi = (item) => {
      switch (item) {
        case ADD_CASH_DEPOSITE:
          return addCashDepositUrl;
        case WITHDRAW_CASH_DEPOSITE:
          return withDrawCashDepositUrl;
        case ADD_USER_CREDIT:
          return addUserCreditUrl;
        case WITHDRAW_USER_CREDIT:
          return withdrawUserCreditUrl;
        default:
          break;
      }
    };
    try {
      const response = await axios.post(verifyWhichAPi(exactApi), data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUserCashCredits = async (id, exactApi) => {
    const verifyUserGetCreditApi = (item) => {
      switch (item) {
        case GET_ALL_CREDITS:
          return getUserAllCreditsUrl;
        case GET_ALL_CASH_CREDITS:
          return getAllCashDepositsUrl;
        default:
          break;
      }
    };
    try {
      const response = await axios.get(`${verifyUserGetCreditApi(exactApi)}?${CAMEL_USER_ID}=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAllMarketTypes = async () => {
    try {
      const response = await axios.get(getAllMarketTypesUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllBetSizeData = async (id) => {
    try {
      const response = await axios.get(`${getAllBetSizeDataUrl}?${CAMEL_USER_ID}=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadMatchShownSet = async (data) => {
    try {
      const response = await axios.get(`${setMatchShowUrl}?matchId=${data?.matchId}&status=${data?.status}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadupdatemarketstatus = async (data) => {
    try {
      const response = await axios.get(`${updatemarketstatusUrl}?Id=${data?.Id}&status=${data?.status}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadUpdateMarketStatusInPlaySet = async (data) => {
    try {
      const response = await axios.post(updateMarketStatusInPlayUrl,data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  loadMatchBetAllowedSet = async (data) => {
    try {
      const response = await axios.get(`${setMatchBetAllowedUrl}?matchId=${data?.matchId}&status=${data?.status}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadingSessionFigureBetting = async (data) => {
    try {
      const response = await axios.get(`${sessionFigureUrl}?eventId=${data}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  onCashDepositLadger = async (data) => {
    try {
      const response = await axios.post(cashDepositLedgerDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onGetLedgerDetails = async (data) => {
    try {
      const response = await axios.post(getLedgerDetailsUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onGetLedgerDetails2 = async (data) => {
    try {
      const response = await axios.post(getLedgerDetails2Url, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onUpdateBetAmount = async (data) => {
    try {
      const response = await axios.post(updateBetAmountDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  // onAllCashDepositLadger = async (id, startDate, endDate) => {
  //   try {
  //     const response = await axios.get(`${allCashDepositLedgerDataUrl}?userId=${id}&startDate=${startDate}&endDate=${endDate}`, {
  //       headers: { Authorization: getAuthorizationHeader() },
  //       cancelToken: this.cancelToken,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  onAllCashDepositLadger = async (data) => {
    try {
      const response = await axios.post(allCashDepositLedgerDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onCreditDepositLadger = async (data) => {
    try {
      const response = await axios.post(cashCreditLedgerDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onAllCreditDepositLadger = async (data) => {
    try {
      const response = await axios.post(allCashCreditDepositLedgerDataUrl, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateAllMarketTypes = async (data) => {
    try {
      const response = await axios.post(updateAllMarketTypesUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getFinalSheetData = async () => {
    try {
      const response = await axios.get(getFinalReport, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getFinalSheetData2 = async () => {
    try {
      const response = await axios.get(getFinalReport2Url, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCurrentPositionData = async (data) => {
    try {
      const response = await axios.get(`${getCurrentPositionDataUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCurrentPositionData2 = async (data) => {
    try {
      const response = await axios.get(`${getCurrentPositionDataUrl2}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };


  getHighlight2 = async (data) => {
    try {
      const response = await axios.get(`${getHighlight}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getExchangesRates = async () => {
    try {
      const response = await axios.get(getExchangeRatesUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllSportsHighLightData = async (sportId: string) => {
    try {
      const response = await axios.get(`${getAllSportsHighLightUrl}?sport=${sportId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  deleteSport = async (id: string) => {
    try {
      const response = await axios.get(`${deleteSportUrl}?eventId=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  activateEvent = async (id: string) => {
    try {
      const response = await axios.get(`${activateEventUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  refreshEvent = async (id: string) => {
    try {
      const response = await axios.get(`${refreshEventUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  checkValidateUser = async (data) => {
    try {
      const response = await axios.post(postCheckValidationUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadSaveMarketIdsWinnerName = async (data) => {
    console.log('this is called')
    try {
      const response = await axios.post(saveMarketIDSWinnerRunnerUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateMatchTypeDataPost = async (data) => {
    try {
      const response = await axios.post(updateMatchTypeUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateMatchStopedOrResumeMatch = async (data) => {
    try {
      const response = await axios.post(updateMatchUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateSessionScoreData = async (data) => {
    try {
      const response = await axios.post(updateSessionScoreUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateMatchResults = async (data) => {
    try {
      const response = await axios.post(settleMatchUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateExChangeAmount = async (data) => {
    try {
      const response = await axios.post(updateExchangeAmountUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBetsFunds = async () => {
    try {
      const response = await axios.get(betFundsUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBetNews = async (id) => {
    try {
      const response = await axios.get(`${betNewsUrl}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllDepositData = async (id) => {
    try {
      const response = await axios.get(`${getAllDepositDataUrl}?userId=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAllSideBarMenu = async () => {
    try {
      const response = await axios.get(getAllSideBarMenuUrl, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getDailyPlData = async (data) => {
    try {
      const response = await axios.get(`${getDailyPl}?startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookDetail2 = async (data) => {
    try {
      const response = await axios.get(`${bookDetail2DataUrl}?startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDailyReport = async (data) => {
    try {
      const response = await axios.get(`${getDailyReportUrl}?startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookDettailData1 = async (data) => {
    try {
      const response = await axios.get(`${getBookDetailReportUrl}?startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookDetail2WithSportsId = async (data) => {
    try {
      const response = await axios.get(`${getDailyReportUrl}?startDate=${data?.startDate}&endDate=${data?.endDate}&sportId=${data?.sportId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  loadGetSettlement = async (id) => {
    try {
      const response = await axios.get(`${getSettlementDataUrl}?id=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getDailyPLSportsWiseReport = async (data) => {
    try {
      const response = await axios.get(`${dailyPLSportsWiseReport}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDailyReportSportsWiseReport = async (data) => {
    try {
      const response = await axios.get(`${dailyReportSportsWiseReport}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookDetail1SportsWiseData = async (data) => {
    try {
      const response = await axios.get(`${bookDetailSportsWiseReportUrl}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookDetail2MatchWiseReport = async (data) => {
    try {
      const response = await axios.get(`${MatchWiseDailyReportUrl}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}&sportsId=${data?.sportId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDailyReportSportsWiseReportPost = async (data) => {
    const payload = {
      marketIds: data?.marketId
    }
    try {
      const response = await axios.post(`${dailyPLSportsWiseReport}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}`, payload, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMarketReport = async (data) => {
    try {
      const response = await axios.get(`${dailyPlMarketsReports}?userId=${data?.id}&sportsId=${data?.sportsId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getDailyReportMarket = async (data) => {
    try {
      const response = await axios.get(`${MatchWiseDailyReportUrl}?userId=${data?.id}&sportsId=${data?.sportsId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  getBookDetailMarketWiseData = async (data) => {
    try {
      const response = await axios.get(`${BookDetailMarketWiseReportUrl}?userId=${data?.id}&sportsId=${data?.sportsId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCommissionReport = async (data) => {
    try {
      const response = await axios.get(`${getCommissionReport}?startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSportsWiseCommissionReport = async (data) => {
    try {
      const response = await axios.get(`${sportsWiseCommissionReport}?userId=${data?.id}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getDailyReportMatchWiseDetailedReport = async (data) => {
    try {
      const response = await axios.get(`${dailyMatchWiseReportDatailedUrl}?userId=${data?.id}&matchId=${data?.matchId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMarketPositions = async (data) => {
    try {
      const response = await axios.post(`${marketPositionsUrl}`,data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMarketShare = async (data) => {
    try {
      const response = await axios.get(`${marketSharesUrl}?userId=${data?.userId}&marketId=${data?.marketId ? data?.marketId : "none"}&depositId=${data?.depositId}&roundId=${data?.roundId}&sportsId=${data?.sportsId}&matchId=${data?.matchId}&betSession=${data?.betSession}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getDailyPlReportMatchWiseDetailedReport = async (data) => {
    try {
      const response = await axios.get(`${dailyPlMatchWiseReportDatailedUrl}?userId=${data?.id}&matchId=${data?.matchId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getBookReportMatchWiseDetailedData = async (data) => {
    try {
      const response = await axios.get(`${BookDetailMatchWiseReportDetailDataUrl}?userId=${data?.id}&matchId=${data?.matchId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getLoadDailyMatchWiseprofitLose = async (data) => {
    try {
      const response = await axios.get(`${dailyMatchWiseprofitLose}?userId=${data?.id}&matchId=${data?.matchId}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getMarketWiseCommissionReport = async (data) => {
    try {
      const response = await axios.get(`${MarketWiseCommissionReport}?userId=${data?.id}&sportsId=${data?.sportsId}&startDate=${data?.startDate}&endDate=${data?.endDate}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getInPlayData = async (data) => {
    try {
      const response = await axios.get(`${listEventsBySport}?inplay=${data}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getEventsBySport = async (data) => {
    try {
      const response = await axios.get(`${listEventsBySport}?id=${data}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getRaceListData = async (data) => {
    try {
      const response = await axios.get(`${listOfRaceAPIUrl}/${data}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getSideBarSubMenuList = async (id) => {
    try {
      const response = await axios.get(`${listCompetitions}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };


  getListOddsAPI = async (id) => {
    try {
      const response = await axios.get(`${listOddsAPI}?ids=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getRaceMarketAPI = async (id) => {
    try {
      const response = await axios.get(`${racesMarketListUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUserLoginActivitLogs = async (query) => {
    try {
      const response = await axios.get(`${userLoginActivitLogsUrl}/${query}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  deleteUser = async (id) => {
    try {
      const response = await axios.get(`${deleteUserUrl}?id=${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  loadBetPlaceHold = async (id) => {
    try {
      const response = await axios.get(`${getBetPlaceHoldUrl}/${id}`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  // getUserLoginHistoryByIp = async (ip) => {
  //   try {
  //     const response = await axios.get(`${userLoginActivitLogsUrl}/?id=${ip}`, {
  //       headers: { Authorization: getAuthorizationHeader() },
  //       cancelToken: this.cancelToken,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

}

export default UserApi;
