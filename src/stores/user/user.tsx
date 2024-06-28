import { cast, flow, types } from "mobx-state-tree";
import { userApi } from "../../api";
import { notification } from "../../utils/notifications";
import { constRoute } from "@utils/route";
import { catchError, onLogOutClearAll } from "@utils/common-functions";
import { CAMEL_DEFAULT_LOGIN_PAGE, CAMEL_ISBETTER, INITIAL_QUERY_PARAM, LOWER_LOGIN_PAGE_TWO, LOWER_THEME, LOWER_TOKEN } from "@utils/const";
import {
  userInfoModel,
  cricketModel,
  scoreModel,
  userCashDepositeDataModel,
  userAllCreditDataModel,
  allMarketTypesModel,
  cashDepositLedgerDataModel,
  userFinalSheetDataModal,
  loadBalanceModal,
  exchangeListModel,
  betFundsModel,
  betNewsDataModel,
  allDepositModel,
  allSideBarMenuModel,
  dailyPlDataModel,
  getAllPLSportsWiseReportModel,
  getAllMarketReportModel,
  getCommissionReportModel,
  BookDetail2Model,
  getAllSidebarSubMenuListModel,
  getEventsByReportModel,
  userLoginActivityDataModel,
  cashDepositLedgerDataModel2,
} from "@stores/store-utils/user";
import { GET_ALL_CASH_CREDITS, GET_ALL_CREDITS } from "@components/users/const";
import { toJS } from "mobx";

export const user = types
  .model({
    userInfo: types.maybeNull(userInfoModel),
    allUsers: types.maybeNull(types.array(userInfoModel)),
    allCrickets: types.maybeNull(types.array(cricketModel)),
    allSoccer: types.maybeNull(types.array(scoreModel)),
    allTennis: types.maybeNull(types.array(scoreModel)),
    allUserTotal: types.maybeNull(types.number),
    allCricketTotal: types.maybeNull(types.number),
    allSoccerTotal: types.maybeNull(types.number),
    allTennisTotal: types.maybeNull(types.number),
    allMarketTypes: types.maybeNull(types.array(allMarketTypesModel)),
    originalAllMarket: types.maybeNull(types.array(allMarketTypesModel)),
    blockedMarkets: types.maybeNull(types.array(types.string)),
    blockedSubMarkets: types.maybeNull(types.array(types.number)),
    singleUser: types.maybeNull(userInfoModel),
    loading: types.optional(types.boolean, false),
    loadingbetLocker: types.optional(types.boolean, false),
    loadingGetAllUsers: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetAllCrickets: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetAllSoccer: types.maybeNull(types.optional(types.boolean, false)),
    loadingGetAllTennis: types.maybeNull(types.optional(types.boolean, false)),
    loadingAllBetSizeData: types.optional(types.boolean, false),
    loadingupdatemarket: types.optional(types.boolean, false),
    loadinSessionFigureBetting: types.optional(types.boolean, false),
    loadingCheckValidation: types.maybeNull(
      types.optional(types.boolean, false)
    ),
    loadingLogin: types.optional(types.boolean, false),
    loadingCreatUser: types.maybeNull(types.boolean),
    loadingCashDepositLedger: types.maybeNull(
      types.optional(types.boolean, false)
    ),
    loadingLedgerDetailData: types.maybeNull(
      types.optional(types.boolean, false)
    ),
    loadingLedgerDetailData2: types.maybeNull(
      types.optional(types.boolean, false)
    ),
    loadingCreditDepositLedger: types.maybeNull(
      types.optional(types.boolean, false)
    ),
    loadingSearchUser: types.optional(types.boolean, false),
    loadingForFullBook:types.optional(types.boolean, false),
    loadingUpdateBetAmount: types.optional(types.boolean, false),
    loadingAddBetSizes: types.optional(types.boolean, false),
    loadingAddBetLock: types.optional(types.boolean, false),
    loadingGetFinalSheet: types.optional(types.boolean, false),
    loadingGetFinalSheet2: types.optional(types.boolean, false),
    loadingCurrentPositonData: types.optional(types.boolean, false),
    loadingGetDailyPl: types.optional(types.boolean, false),
    loadingGetBookDetail2: types.optional(types.boolean, false),
    loadingGetDailyReport: types.optional(types.boolean, false),
    loadingBookdetailData: types.optional(types.boolean, false),
    loadingBookDetailSportWiseData: types.optional(types.boolean, false),
    loadingGetSettlementData: types.optional(types.boolean, false),
    loadingGetSportsWiseReport: types.optional(types.boolean, false),
    loadingGetSportsWiseDailyReport: types.optional(types.boolean, false),
    loadingSportsWiseBookDetailReport:  types.optional(types.boolean, false),
    loadingBookMatchWiseReport: types.optional(types.boolean, false),
    loadingPlMarketReport: types.optional(types.boolean, false),
    loadingCommissionReport: types.optional(types.boolean, false),
    loadingReportMarketReport: types.optional(types.boolean, false),
    loadingReportMarketWiseReportData: types.optional(types.boolean, false),
    loadingExchangeRate: types.optional(types.boolean, false),
    loadingUpdateUser: types.maybeNull(types.boolean),
    loadingUpdateBetLocker: types.maybeNull(types.boolean),
    loadingSaveWinnerNameOfMarketId: types.optional(types.boolean, false),
    loadingPostCashCredit: types.maybeNull(types.boolean),
    loadingCashDepost:  types.optional(types.boolean, false),
    loadingWithDraw:  types.optional(types.boolean, false),
    loadingCreateUserBalance: types.optional(types.boolean, false),
    loadingGetCashCredit: types.optional(types.boolean, false),
    loadingGetAllMarketTypes: types.optional(types.boolean, false),
    loadingExchangeAmountData: types.optional(types.boolean, false),
    loadingUpdateMatchStopOrResumeReason: types.optional(types.boolean, false),
    loadingUpdateSessionFigureData: types.optional(types.boolean, false),
    loadingBetsFunds: types.optional(types.boolean, true),
    loadingBetNews: types.optional(types.boolean, false),
    loadingAllDeposit: types.optional(types.boolean, false),
    loadingSettlePlAccount: types.maybeNull(types.boolean),
    loadingAllSideBarMenuItem: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
    userCashDepositeData: types.maybeNull(userCashDepositeDataModel),
    userAllCreditData: types.maybeNull(userAllCreditDataModel),
    getAllSideBarMenuList: types.maybeNull(types.array(allSideBarMenuModel)),
    cashDepositLedgerDataList: types.maybeNull(
      types.array(cashDepositLedgerDataModel)
    ),
    ledgerDetailDataList: types.maybeNull(
      types.array(cashDepositLedgerDataModel)
    ),
    ledgerDetailDataList2: types.maybeNull(
      types.array(cashDepositLedgerDataModel2)
    ),
    allSportsHighlightsData: types.maybeNull(types.string),
    creditDepositLedgerDataList: types.maybeNull(
      types.array(cashDepositLedgerDataModel)
    ),
    cashDepositLedgerTotalData: types.maybeNull(types.number),
    ledgerDetailTotal: types.maybeNull(types.number),
    ledgerDetailTotal2: types.maybeNull(types.number),
    creditDepositLedgerTotalData: types.maybeNull(types.number),
    allCashDepositLedgerDataList: types.maybeNull(
      types.array(cashDepositLedgerDataModel)
    ),
    allCreditCashDepositLedgerDataList: types.maybeNull(
      types.array(cashDepositLedgerDataModel)
    ),
    highlightLoading: types.maybeNull(types.optional(types.boolean, true)),
    userFinalSheetData: types.maybeNull(userFinalSheetDataModal),
    loadingBalanceLoading: types.optional(types.boolean, false),
    loadBalanceData: types.maybeNull(types.array(loadBalanceModal)),
    loadExchangeDataList: types.maybeNull(types.array(exchangeListModel)),
    allBetSizeListData: types.maybeNull(types.string),
    loadBetFundsData: types.maybeNull(betFundsModel),
    loadBetNewsData: types.maybeNull(betNewsDataModel),
    loadAllDeposit: types.maybeNull(types.array(allDepositModel)),
    // loadAllDepositStatus:types.maybeNull(types.number),
    getAllDailyPl: types.maybeNull(types.array(dailyPlDataModel)),
    getAllDailyReport: types.maybeNull(types.array(dailyPlDataModel)),
    getAllPLSportsWiseReport: types.maybeNull(types.array(getAllPLSportsWiseReportModel)),
    getAllPLSportsWiseDailyReport: types.maybeNull(types.array(getAllPLSportsWiseReportModel)),
    getAllSPortsWiseBookDetail: types.maybeNull(types.array(getAllPLSportsWiseReportModel)),
    getAllMarketReport: types.maybeNull(types.array(getAllMarketReportModel)),
    getCommissionReport: types.maybeNull(types.array(getCommissionReportModel)),
    getAllSportsWiseCommissionReport: types.maybeNull(types.array(getAllPLSportsWiseReportModel)),
    loadingAllSportsWiseCommissionReport: types.optional(types.boolean, false),
    loadingDailyMatchWiseReportData: types.optional(types.boolean, false),
    loadingMarketPositions: types.optional(types.boolean, false),
    loadingMarketShare: types.optional(types.boolean, false),
    loadingPlDailyMatchWiseReportData: types.optional(types.boolean, false),
    loadingBookDetailMatchWiseReportData: types.optional(types.boolean, false),
    loadingUserLoginActivitLogs: types.optional(types.boolean, false),
    loadingDeleteUser: types.optional(types.boolean, false),
    loadingGetBetPlaceHold: types.optional(types.boolean, false),
    getAllMarketWiseCommissionReport: types.maybeNull(types.array(getAllMarketReportModel)),
    getBookDetail2DataList: types.maybeNull(types.array(BookDetail2Model)),
    getAllMarketDailyReport: types.maybeNull(types.array(getAllMarketReportModel)),
    getBookDetailMarketWiseReportData: types.maybeNull(types.array(getAllMarketReportModel)),
    getAllSidebarSubMenuList: types.maybeNull(types.array(getAllSidebarSubMenuListModel)),
    getEventsByReport: types.maybeNull(types.array(getEventsByReportModel)),
    userLoginActivityData: types.maybeNull(types.array(userLoginActivityDataModel)),

  })
  .views((self) => ({
    get getUserInfo() {
      return toJS(self.userInfo);
    },
    // get loadAllDepositStatusData(){
    //   return toJs(self.loadAllDepositStatus);
    // },
    get getUserLoginActivityData() {
      return toJS(self.userLoginActivityData);
    },
    get getblockedMarkets() {
      return toJS(self.blockedMarkets)
    },
    get getBlockedSubMarkets() {
      return toJS(self.blockedSubMarkets)
    },
    get getEventsByReportData() {
      return toJS(self.getEventsByReport);
    },
    get getAllSidebarSubMenuListData() {
      return toJS(self.getAllSidebarSubMenuList);
    },
    get getAllMarketWiseCommissionReportData() {
      return toJS(self.getAllMarketWiseCommissionReport);
    },
    get getAllSportsWiseCommissionData() {
      return toJS(self.getAllSportsWiseCommissionReport);
    },
    get getCommissionReportData() {
      return toJS(self.getCommissionReport);
    },
    get getAllMarketReportData() {
      return toJS(self.getAllMarketReport);
    },
    get getAllMarketDailyReportData() {
      return toJS(self.getAllMarketDailyReport);
    },
    get allPLSportsWiseReportData() {
      return toJS(self.getAllPLSportsWiseReport);
    },
    get allSportsWiseDailyReportData() {
      return toJS(self.getAllPLSportsWiseDailyReport);
    },
    get getPlData() {
      return toJS(self.getAllDailyPl);
    },
    get getBookDetailDataList2() {
      return toJS(self.getBookDetail2DataList);
    },
    get getAllUsers() {
      return toJS(self.allUsers);
    },
    get getAllCrickets() {
      return toJS(self.allCrickets);
    },
    get getAllSoccer() {
      return toJS(self.allSoccer);
    },
    get getAllTennis() {
      return toJS(self.allTennis);
    },
    get getAllCricketTotal() {
      return toJS(self.allCricketTotal);
    },
    get getAllSoccerTotal() {
      return toJS(self.allSoccerTotal);
    },
    get getAllTennisTotal() {
      return toJS(self.allTennisTotal);
    },
    get getAllUserTotal() {
      return toJS(self.allUserTotal)
    },
    get getFinalSheetReport() {
      return toJS(self.userFinalSheetData);
    },
    get getSingleUser() {
      return toJS(self.singleUser);
    },
    get getAllMarketTypes() {
      return toJS(self.allMarketTypes);
    },
    get getOriginalAllMarketTypes() {
      return toJS(self.originalAllMarket)
    },
    get isLoading() {
      return self.loading;
    },
    get getBetFundsData() {
      return toJS(self.loadBetFundsData)
    },
    get getBetNewsData() {
      return toJS(self.loadBetNewsData)
    },
    get isLoadingGetAllUsers() {
      return toJS(self.loadingGetAllUsers);
    },
    get isLoadingGetAllCrickets() {
      return toJS(self.loadingGetAllCrickets);
    },
    get isLoadingGetAllSoccer() {
      return toJS(self.loadingGetAllSoccer);
    },
    get isLoadingGetAllTennis() {
      return toJS(self.loadingGetAllTennis);
    },
    get isLoadingCheckValidation() {
      return toJS(self.loadingCheckValidation);
    },
    get isLoadingUpdateBetLocker() {
      return self.loadingUpdateBetLocker;
    },
    get isLoadingLogin() {
      return self.loadingLogin;
    },
    get isLoadingCreateUser() {
      return self.loadingCreatUser;
    },
    get isLoadingCreateUserBalance() {
      return self.loadingCreateUserBalance;
    },
    get isLoadingSearchUser() {
      return self.loadingSearchUser;
    },
    get isLoadingUpdateUser() {
      return self.loadingUpdateUser;
    },
    get isLoadingAddBetSizes() {
      return self.loadingAddBetSizes;
    },
    get isLoadingAddBetLock() {
      return self.loadingAddBetLock;
    },
    get getUserCashDepositeData() {
      return toJS(self.userCashDepositeData);
    },
    get getUserAllCreditData() {
      return toJS(self.userAllCreditData);
    },
    get isLoadingGetAllMarketTypes() {
      return toJS(self.loadingGetAllMarketTypes);
    },
    get getCashDepositLedgerDataList() {
      return toJS(self.cashDepositLedgerDataList);
    },
    get getLoadingCashDepositLedger() {
      return toJS(self.loadingCashDepositLedger);
    },
    get getLoadingCredithDepositLedger() {
      return toJS(self.loadingCreditDepositLedger);
    },
    get getCreditDepositLedgerDataList() {
      return toJS(self.creditDepositLedgerDataList);
    },
    get getCashDepositLedgerTotalData() {
      return toJS(self.cashDepositLedgerTotalData);
    },
    get getCreditDepositLedgerTotalData() {
      return toJS(self.creditDepositLedgerTotalData);
    },
    get getAllCashDepositLedgerDataList() {
      return toJS(self.allCashDepositLedgerDataList);
    },
    get getAllCreditCashDepositLedgerDataList() {
      return toJS(self.allCreditCashDepositLedgerDataList);
    },
    get getAllSportsHighLightsData() {
      return toJS(self.allSportsHighlightsData);
    },
    get getAllSportsWiseBookDetail1Data (){
      return toJS(self.getAllSPortsWiseBookDetail)
    },
    get getHighlidhtedLoading() {
      return toJS(self.highlightLoading);
    },
    get getLoadBalanceLoading() {
      return toJS(self.loadingBalanceLoading)
    },
    get getLoadBalanceData() {
      return toJS(self.loadBalanceData)
    },
    get getLoadExchangeDataList() {
      return toJS(self.loadExchangeDataList)
    },
    get getAllBetSizeData() {
      return toJS(self.allBetSizeListData)
    },
    get getAllLedgerListData() {
      return toJS(self.ledgerDetailDataList)
    },
    get getAllLedgerListData2() {
      return toJS(self.ledgerDetailDataList2)
    },
    get getLedgerDetailTotalRecords() {
      return toJS(self.ledgerDetailTotal)
    },
    get getLedgerDetailTotalRecords2() {
      return toJS(self.ledgerDetailTotal2)
    },
    get getBookDetail1MarketWiseReportData(){
      return toJS(self.getBookDetailMarketWiseReportData)
    },
    get getLoadingLedgerDetal() {
      return toJS(self.loadingLedgerDetailData)
    },
    get getLoadingLedgerDetal2() {
      return toJS(self.loadingLedgerDetailData2)
    },
    get getLoadAllDepositData() {
      return toJS(self.loadAllDeposit)
    },
    get getLoadSideBarMenuList() {
      return toJS(self.getAllSideBarMenuList)
    }
  }))
  .actions((self) => {
    const onUserLoginInfo = flow(function* (data, navigate) {
      self.loadingLogin = true;
      try {
        const res = yield userApi.onUserLogin(data);
        if (res?.success) {
          // localStorage.removeItem(LOWER_TOKEN);
          localStorage.setItem('adminToken', res?.token);
          localStorage.setItem('adminRole', res?.role);
          localStorage.setItem('userId', res?.userId);
          // localStorage.getItem()
          if (!localStorage.getItem(LOWER_THEME)) {
            localStorage.setItem(LOWER_THEME, res?.defaultTheme);
          }
          console.log(res)
          localStorage.setItem(CAMEL_DEFAULT_LOGIN_PAGE, res?.defaultLoginPage);
          // notification.success(res?.message);
          let resLoadUser = yield loadUserInfo();
          if (resLoadUser.success) {
            navigate(`${constRoute.dashboard}`);
          }
        }
      } catch (error) {
        catchError(error, "onUserLoginInfo");
      } finally {
        self.loadingLogin = false;
      }
    });

    const createUser = flow(function* (data) {
      self.loadingCreatUser = true;
      let response = null;
      try {
        const res = yield userApi.onCreateUser(data);
        response = res;
        if (res?.success) {
          notification.success("User created successfully");
        }
      } catch (error) {
        catchError(error, "createUser");
      } finally {
        self.loadingCreatUser = false;
        return response;
      }
    });
    const loadSettlePlAccountData = flow(function* (data) {
      self.loadingSettlePlAccount = true;
      let response = null;
      try {
        const res = yield userApi.onSettlePlAccount(data);
        response = res;

        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        catchError(error, "loadSettlePlAccountData");
      } finally {
        self.loadingSettlePlAccount = false;
        return response;
      }
    });

    const cashDepositLedgerData = flow(function* (data) {
      self.loadingCashDepositLedger = true;
      self.cashDepositLedgerDataList = null;
      try {
        const res = yield userApi.onCashDepositLadger(data);
        self.cashDepositLedgerDataList = res?.results?.docs;
        self.cashDepositLedgerTotalData = res?.results?.total;
        self.loadingCashDepositLedger = false;
      } catch (error) {
        catchError(error, "Ledger");
        self.loadingCashDepositLedger = false;
      }
    });

    

    const loadGetDetailLedgerDetail2 = flow(function* (data) {
      self.loadingLedgerDetailData2 = true;
      self.ledgerDetailDataList2 = null;
      try {
        const res = yield userApi.onGetLedgerDetails2(data);
        self.ledgerDetailDataList2 = res?.results?.docs;
        self.ledgerDetailTotal2 = res?.results?.total;
        self.loadingLedgerDetailData2 = false;
      } catch (error) {
        catchError(error, "loadGetDetailLedgerDetail2");
        self.loadingLedgerDetailData2 = false;
      }
    });
    const loadGetDetailLedgerDetail = flow(function* (data) {
      self.loadingLedgerDetailData = true;
      self.ledgerDetailDataList = null;
      try {
        const res = yield userApi.onGetLedgerDetails(data);
        self.ledgerDetailDataList = res?.results?.docs;
        self.ledgerDetailTotal = res?.results?.total;
        self.loadingLedgerDetailData = false;
      } catch (error) {
        catchError(error, "loadGetDetailLedgerDetail");
        self.loadingLedgerDetailData = false;
      }
    });



    const onUpdateBetAmountData = flow(function* (data) {
      self.loadingUpdateBetAmount = true;
      self.cashDepositLedgerDataList = null;
      let response = null;
      try {
        const res = yield userApi.onUpdateBetAmount(data);
        if (res?.success) {
          response = res
          notification.success(res?.message)
        }
        self.loadingUpdateBetAmount = false;
      } catch (error) {
        catchError(error, "updateBetAmount");
        self.loadingUpdateBetAmount = false;
      } finally {
        return response;
      }
    });
    const allCashDepositLedgerData = flow(function* (data) {
      self.allCashDepositLedgerDataList = null;
      try {
        const res = yield userApi.onAllCashDepositLadger(data);
        self.allCashDepositLedgerDataList = res?.results;
      } catch (error) {
        catchError(error, "Ledger");
      }
    });
    const CreditDepositLedgerData = flow(function* (data) {
      self.loadingCreditDepositLedger = true;
      self.creditDepositLedgerDataList = null;
      try {
        const res = yield userApi.onCreditDepositLadger(data);
        self.creditDepositLedgerDataList = res?.results?.docs;
        self.creditDepositLedgerTotalData = res?.results?.total;
        self.loadingCreditDepositLedger = false;
      } catch (error) {
        catchError(error, "Ledger");
        self.loadingCreditDepositLedger = false;
      }
    });
    const allCreditDepositLedgerData = flow(function* (data) {
      self.allCreditCashDepositLedgerDataList = null;
      try {
        const res = yield userApi.onAllCreditDepositLadger(data);
        self.allCreditCashDepositLedgerDataList = res?.results;
      } catch (error) {
        catchError(error, "Ledger");
      }
    });
    const createLoadUserBalance = flow(function* (data) {
      self.loadingCreateUserBalance = true;
      let response = null;
      try {
        const res = yield userApi.postLoadUserBalance(data);
        response = res;
        if (res?.success) {
          notification.success("User balance loaded successfully");
        }
      } catch (error) {
        catchError(error, "createLoadUserBalance");
      } finally {
        self.loadingCreateUserBalance = false;
        return response;
      }
    });

    const searchUsers = flow(function* (data) {
      self.loadingSearchUser = true;
      let response = null;
      try {
        const res = yield userApi.searchUsers(data);
        response = res;
        self.allUsers = res?.results?.docs;
        self.allUserTotal = res?.total;
        if (res?.success && res?.results?.docs?.length > 0) {
          notification.info(res?.message);
        }
      } catch (error) {
        catchError(error, "searchUsers");
      } finally {
        self.loadingSearchUser = false;
        return response;
      }
    });
    const loadFullBookDetailData = flow(function* (data) {
      self.loadingForFullBook = true;
      let response = null;
      try {
        const res = yield userApi.loadFullBookDetail(data);
        response = res;
      } catch (error) {
        catchError(error, "loadFullBookDetailData");
      } finally {
        self.loadingForFullBook = false;
        return response;
      }
    });

    const searchSingleUser = flow(function* (data) {
      // self.loadingSearchUser = true;
      let response = null;
      try {
        const res = yield userApi.searchSingleUser(data);
        response = res;
        // self.allUsers = res?.results?.docs;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        catchError(error, "searchSingleUser");
      } finally {
        // self.loadingSearchUser = false;
        return response;
      }
    });

    const loadUserInfo = flow(function* (navigate = null) {
      self.loading = true;
      let response = null;
      try {
        self.loading = true;
        const res = yield userApi.getCurrentUserDetails();
        response = res;
        self.userInfo = res?.results;
      } catch (error) {
        catchError(error, "loadUserInfo");
        response = error.response;
        if (response?.status === 404) {
          onLogOutClearAll(navigate);
        }
      } finally {
        self.loading = false;
        return response;
      }
    });
    const updateLoadBalanceValue = (value?: any) => {
      self.loadBalanceData = value;
    }

    const loadAllUsers = flow(function* (queryParam = INITIAL_QUERY_PARAM) {
      console.log('loadAllUsers')
      self.loadingGetAllUsers = true;
      let response = null;
      try {
        const res = yield userApi.getAllUsers(queryParam);
        response = cast(res);
        self.allUsers = res?.results?.docs;
        self.allUserTotal = res?.total;
        const dummayArray = [{
          balanceUpline: 0,
          cash: 0,
          creditRecieved: 0,
          creditRemaining: 0,
          plDownline: 0,
          users: Number(res?.results?.total) || 0
        }]
        updateLoadBalanceValue(dummayArray)
      } catch (error) {
        self.allUsers = null
        catchError(error, "loadAllUsers");
      } finally {
        self.loadingGetAllUsers = false;
        return response;
      }
    });

    const loadAllCrickets = flow(function* (queryParam = INITIAL_QUERY_PARAM) {
      self.loadingGetAllCrickets = true;
      let response = null;
      try {
        const res = yield userApi.getAllCrickets(queryParam);
        response = cast(res);
        self.allCrickets = res?.results;
        self.allCricketTotal = res?.total;
      } catch (error) {
        self.allCrickets = null
        catchError(error, "loadAllUsers");
      } finally {
        self.loadingGetAllCrickets = false;
        return response;
      }
    });

    const loadAllSoccer = flow(function* (queryParam = INITIAL_QUERY_PARAM) {
      self.loadingGetAllSoccer = true;
      let response = null;
      try {
        const res = yield userApi.getAllSoccer(queryParam);
        response = cast(res);
        self.allSoccer = res?.results;
        self.allSoccerTotal = res?.total;
      } catch (error) {
        self.allSoccer = null
        catchError(error, "loadAllSoccer");
      } finally {
        self.loadingGetAllSoccer = false;
        return response;
      }
    });

    const loadAllTennis = flow(function* (queryParam = INITIAL_QUERY_PARAM) {
      self.loadingGetAllSoccer = true;
      let response = null;
      try {
        const res = yield userApi.getAllTennis(queryParam);
        response = cast(res);
        self.allTennis = res?.results;
        self.allTennisTotal = res?.total;
      } catch (error) {
        self.allSoccer = null
        catchError(error, "loadAllTennis");
      } finally {
        self.loadingGetAllTennis = false;
        return response;
      }
    });

    const updateUser = flow(function* (data) {
      let response = null;
      self.loadingUpdateUser = true;
      try {
        const res = yield userApi.updateUser(data);
        response = res;
        if (res?.success) {
          notification.info("User Updated Successfully");
        }
      } catch (error) {
        catchError(error, "updateUser");
      } finally {
        self.loadingUpdateUser = false;
        return response;
      }
    });
    const LoadUserBalance = flow(function* (userId) {
      let response = null;
      self.loadingBalanceLoading = true;
      try {
        const arrayForLoadBalance = [] as any;
        const res = yield userApi.loadBalance(userId);
        if (res?.success) {
          response = res;
          arrayForLoadBalance.push(res?.results)
          self.loadBalanceData = arrayForLoadBalance;
        }
      } catch (error) {
        catchError(error, "loadUserBalance");
      } finally {
        self.loadingBalanceLoading = false;
        return response;
      }
    });

    const loadSingleUser = flow(function* (data) {
      self.loadingCreatUser = true;
      let response = null;
      try {
        const res = yield userApi.getSingleUser(data);
        response = res;
        self.singleUser = res?.results;
      } catch (error) {
        catchError(error, "loadSingleUser");
      } finally {
        self.loadingCreatUser = false;
        return response;
      }
    });
    const hanldeSortedData = (data)=>{
      self.ledgerDetailDataList =  data;
    }
    const hanldeSortData = (data)=>{
      self.ledgerDetailDataList2 =  data;
    }
    const loadUserActiveAndInActive = flow(function* (data) {
      let response = null;
      try {
        const res = yield userApi.onUserActive(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message)
        }
      } catch (error) {
        catchError(error, "userActiveAndInActive");
      } finally {
        return response;
      }
    });
    const loadUserDeActive = flow(function* (data) {
      let response = null;
      try {
        const res = yield userApi.onUserDeActive(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message)
        }
      } catch (error) {
        catchError(error, "userDeActive");
      } finally {
        return response;
      }
    });

    const deleteUserDetails = flow(function* (id) {
      try {
        self.loading = true;
        const res = yield userApi.deleteUserDetails(id);
        notification.info("User Deleted Successfully");
      } catch (error) {
        catchError(error);
      } finally {
        self.loading = false;
      }
    });

    const postAddBetSizes = flow(function* (data) {
      self.loadingAddBetSizes = true;
      let response = null;
      try {
        const res = yield userApi.postAddBetSizes(data);
        response = res;
        if (res?.success) {
          notification.info("Bet Sizes Added Successfully");
        }
      } catch (error) {
        catchError(error, "postAddBetSizes");
      } finally {
        self.loadingAddBetSizes = false;
        return response;
      }
    });

    const postAddBetLock = flow(function* (data) {
      self.loadingAddBetLock = true;
      let response = null;
      try {
        const res = yield userApi.postAddBetLock(data);
        response = res;
        if (res?.success) {
          notification.info("Bet Lock Added Successfully");
        }
      } catch (error) {
        catchError(error, "postAddBetLock");
      } finally {
        self.loadingAddBetLock = false;
        return response;
      }
    });

    const userCashCreditOperations = flow(function* (data, checkApi: string, isWithDraw=false) {
      
      if(isWithDraw) self.loadingWithDraw= true
      else self.loadingCashDepost = true;
      // self.loadingCashDepost =  true;
      let response = null;
      try {
        const res = yield userApi.cashCreditOperations(data, checkApi);
        response = res;
        if (res?.success) {
          notification.success("Transaction Successfully");
        }
      } catch (error) {
        catchError(error, "userCashCreditOperations");
      } finally {
        self.loadingPostCashCredit = false;
        self.loadingCashDepost = false;
        self.loadingWithDraw= false
        return response;
      }
    });

    const getUserCashCredits = flow(function* (
      userId: String,
      checkApi: string
    ) {
      self.loadingGetCashCredit = true;
      const saveApiDataInModel = (type, data) => {
        switch (type) {
          case GET_ALL_CASH_CREDITS:
            return (self.userCashDepositeData = data);
          case GET_ALL_CREDITS:
            return (self.userAllCreditData = data);
          default:
            break;
        }
      };
      let response = null;
      try {
        const res = yield userApi.getUserCashCredits(userId, checkApi);
        response = res;
        response && saveApiDataInModel(checkApi, response?.results);
      } catch (error) {
        if (checkApi === GET_ALL_CASH_CREDITS) saveApiDataInModel(checkApi, { balance: 0, credit: 0, maxWithdraw: 0 });
        else saveApiDataInModel(checkApi, { availableBalance: 0, credit: 0, creditLimit: 0 });
        catchError(error, "getUserCashCredits");
      } finally {
        self.loadingGetCashCredit = false;
        return response;
      }
    });

    const loadAllMarketTypes = flow(function* () {
      self.loadingbetLocker = true;
      let response = null;
      try {
        self.loadingbetLocker = true;
        const res = yield userApi.getAllMarketTypes();
        response = res;
        self.blockedMarkets = res?.results?.blockedMarkets;
        self.blockedSubMarkets = res?.results?.blockedSubMarkets;
        self.allMarketTypes = res?.results?.markets;
        self.originalAllMarket = res?.results?.markets;
      } catch (error) {
        catchError(error, "loadAllMarketTypes");
      } finally {
        self.loadingbetLocker = false;
        return response;
      }
    });
    const loadAllBetSizeData = flow(function* (id) {
      self.loadingAllBetSizeData = true;
      let response = null;
      try {
        self.loadingAllBetSizeData = true;
        const res = yield userApi.getAllBetSizeData(id);
        response = res;
        if (res?.success) {
          self.allBetSizeListData = JSON.stringify(res?.results)
        }
      } catch (error) {
        catchError(error, "loadAllBetSizeData");
      } finally {
        self.loadingAllBetSizeData = false;
        return response;
      }
    });
    
    const loadupdatemarket = flow(function* (id) {
      // self.loadingAllBetSizeData = true;
      let response = null;
      try {
        // self.loadingAllBetSizeData = true;
        const res = yield userApi.loadupdatemarketstatus(id);
        response = res;
        // if(res?.success){
        //   self.allBetSizeListData =  JSON.stringify(res?.results)
        // }
      } catch (error) {
        catchError(error, "loadupdatemarket");
      } finally {
        self.loadingupdatemarket = false;
        return response;
      }
    });

    const loadUpdateMarketStatusInPlay = flow(function* (id) {
      // self.loadingAllBetSizeData = true;
      let response = null;
      try {
        // self.loadingAllBetSizeData = true;
        const res = yield userApi.loadUpdateMarketStatusInPlaySet(id);
        response = res;
        // if(res?.success){
        //   self.allBetSizeListData =  JSON.stringify(res?.results)
        // }
      } catch (error) {
        catchError(error, "loadUpdateMarketStatus");
      } finally {
        self.loadingupdatemarket = false;
        return response;
      }
    });

    const loadMatchShown = flow(function* (id) {
      // self.loadingAllBetSizeData = true;
      let response = null;
      try {
        // self.loadingAllBetSizeData = true;
        const res = yield userApi.loadMatchShownSet(id);
        response = res;
        // if(res?.success){
        //   self.allBetSizeListData =  JSON.stringify(res?.results)
        // }
      } catch (error) {
        catchError(error, "loadMatchShown");
      } finally {
        self.loadingAllBetSizeData = false;
        return response;
      }
    });
    const loadMatchBetAllowed = flow(function* (id) {
      // self.loadingAllBetSizeData = true;
      let response = null;
      try {
        // self.loadingAllBetSizeData = true;
        const res = yield userApi.loadMatchBetAllowedSet(id);
        response = res;
        // if(res?.success){
        //   self.allBetSizeListData =  JSON.stringify(res?.results)
        // }
      } catch (error) {
        catchError(error, "loadMatchBetAllowed");
      } finally {
        self.loadingAllBetSizeData = false;
        return response;
      }
    });
    const loadSessionFigureBetting = flow(function* (id) {
      self.loadingAllBetSizeData = true;
      let response = null;
      try {
        // self.loadingAllBetSizeData = true;
        const res = yield userApi.loadingSessionFigureBetting(id);
        response = res;
        // if(res?.success){
        //   self.allBetSizeListData =  JSON.stringify(res?.results)
        // }
      } catch (error) {
        catchError(error, "loadSessionFigureBetting");
      } finally {
        self.loadinSessionFigureBetting = false;
        return response;
      }
    });


    const loadFinalSheet = flow(function* () {
      self.loadingGetFinalSheet = true;
      let response = null;
      try {
        const res = yield userApi.getFinalSheetData();
        response = res;
        self.userFinalSheetData = response?.results;
      } catch (error) {
        catchError(error, "loadFinalSheet");
      } finally {
        self.loadingGetFinalSheet = false;
      }
    });
    const loadFinalSheet2 = flow(function* () {
      self.loadingGetFinalSheet2 = true;
      let response = null;
      try {
        const res = yield userApi.getFinalSheetData2();
        response = res;
        // self.userFinalSheetData = response?.results;
      } catch (error) {
        catchError(error, "loadFinalSheet2");
      } finally {
        self.loadingGetFinalSheet2 = false;
        return response;
      }
    });

    const loadCurrentPositonData = flow(function* (data) {
      self.loadingCurrentPositonData = true;
      let response = null;
      try {
        const res = yield userApi.getCurrentPositionData(data);
        response = res;
      } catch (error) {
        catchError(error, "loadCurrentPositonData");
      } finally {
        self.loadingCurrentPositonData = false;
        return response;
      }
    });
    const loadCurrentPositonData2 = flow(function* (data) {
      self.loadingCurrentPositonData = true;
      let response = null;
      try {
        const res = yield userApi.getCurrentPositionData2(data);
        response = res;
      } catch (error) {
        catchError(error, "loadCurrentPositonData");
      } finally {
        self.loadingCurrentPositonData = false;
        return response;
      }
    });

    const loadGetHighlight2 = flow(function* (data) {
      self.loadingCurrentPositonData = true;
      let response = null;
      try {
        const res = yield userApi.getHighlight2(data);
        response = res;
      } catch (error) {
        catchError(error, "loadGetHighlight");
      } finally {
        self.loadingCurrentPositonData = false;
        return response;
      }
    });
    const loadExchangeRateData = flow(function* () {
      self.loadingExchangeRate = true;
      let response = null;
      try {
        const res = yield userApi.getExchangesRates();
        response = res;
        self.loadExchangeDataList = res?.results;
      } catch (error) {
        self.loadingExchangeRate = false;
        catchError(error, "loadExchangeData");
      } finally {
        self.loadingExchangeRate = false;
        return response
      }
    });
    const loadAllSportsHighLightData = flow(function* (sportId?: string) {
      self.highlightLoading = true;
      let response = null
      try {
        const res = yield userApi.getAllSportsHighLightData(sportId);
        // const stringFyHighlightData = JSON.stringify(res?.results);
        // self.allSportsHighlightsData = stringFyHighlightData;
        response = res;
      } catch (error) {
        catchError(error, "loadSportsHighlights");
      } finally {
        self.highlightLoading = false;
        return response;
      }
    });
    const deleteSport = flow(function* (id?: string) {
      // self.highlightLoading = true;
      let response = null
      try {
        const res = yield userApi.deleteSport(id);
        response = res;
        notification.success(res?.message);
      } catch (error) {
        catchError(error, "loadSportsHighlights");
      } finally {
        // self.highlightLoading = false;
        return response;
      }
    });

    const activateEvent = flow(function* (id?: string) {
      // self.highlightLoading = true;
      let response = null
      try {
        const res = yield userApi.activateEvent(id);
        response = res;
        notification.success(res?.message);
      } catch (error) {
        catchError(error, "loadSportsHighlights");
      } finally {
        // self.highlightLoading = false;
        return response;
      }
    });

    const refreshEvent = flow(function* (id?: string) {
      // self.highlightLoading = true;
      let response = null
      try {
        const res = yield userApi.refreshEvent(id);
        response = res;
        notification.success(res?.message);
      } catch (error) {
        catchError(error, "refreshEvent");
      } finally {
        // self.highlightLoading = false;
        return response;
      }
    });

    const LoadSaveMarketIdsDataForWinnerName = flow(function* (data) {
      let response = null;
      self.loadingSaveWinnerNameOfMarketId = true;
      try {
        const res = yield userApi.loadSaveMarketIdsWinnerName(data);
        response = res;
        if (res.success) {
          notification.info("Bet Locker Updated Successfully");
        }
      } catch (error) {
        catchError(error, "LoadSaveMarketIdsDataForWinnerName");
      } finally {
        self.loadingSaveWinnerNameOfMarketId = false;
        return response;
      }
    });

    const updateAllMarketTypes = flow(function* (data) {
      let response = null;
      self.loadingUpdateBetLocker = true;
      try {
        const res = yield userApi.updateAllMarketTypes(data);
        response = res;
        if (res.success) {
          notification.info("Bet Locker Updated Successfully");
        }
      } catch (error) {
        catchError(error, "updateUser");
      } finally {
        self.loadingUpdateBetLocker = false;
        return response;
      }
    });

    const checkValidateUser = flow(function* (user: any) {
      let response = null;
      self.loadingCheckValidation = true;
      try {
        const res = yield userApi.checkValidateUser(user);
        response = res;
      } catch (error) {
        response = error?.response?.data?.errors;
        // catchError(error, "checkValidateUser");
      } finally {
        self.loadingCheckValidation = false;
        return response;
      }
    });
    const updateMatchTypeData = flow(function* (data: any) {
      let response = null;
      self.loadingExchangeAmountData = true;
      try {
        const res = yield userApi.updateMatchTypeDataPost(data);
        response = res;
        if (res?.success)
          notification.success(res?.message)
      } catch (error) {
        catchError(error, "updateMatchTypeData");
      } finally {
        self.loadingExchangeAmountData = false;
        return response;
      }
    });
    const updateMatchStopReasonOrResumeData = flow(function* (data: any) {
      let response = null;
      self.loadingUpdateMatchStopOrResumeReason = true;
      try {
        const res = yield userApi.updateMatchStopedOrResumeMatch(data);
        response = res;
        if (res?.success)
          notification.success(res?.message)
      } catch (error) {
        catchError(error, "updateMatchStopReasonOrResumeData");
      } finally {
        self.loadingUpdateMatchStopOrResumeReason = false;
        return response;
      }
    });
    const updateSessionFigureScoreData = flow(function* (data: any) {
      let response = null;
      self.loadingUpdateSessionFigureData = true;
      try {
        const res = yield userApi.updateSessionScoreData(data);
        response = res;
        if (res?.success)
          notification.success(res?.message)
      } catch (error) {
        catchError(error, "updateSessionFigureScoreData");
      } finally {
        self.loadingUpdateSessionFigureData = false;
        return response;
      }
    });
    const updateMatchResults = flow(function* (data: any) {
      let response = null;
      // self.loadingUpdateMatchStopOrResumeReason = true;
      try {
        const res = yield userApi.updateMatchResults(data);
        response = res;
        if (res?.success)
          notification.success(res?.message)
      } catch (error) {
        catchError(error, "updateMatchResults");
      } finally {
        // self.loadingUpdateMatchStopOrResumeReason = false;
        return response;
      }
    });

    const updateExchangeAmountData = flow(function* (user: any) {
      let response = null;
      self.loadingExchangeAmountData = true;
      try {
        const res = yield userApi.updateExChangeAmount(user);
        response = res;
        if (res?.success)
          notification.success(res?.message)
      } catch (error) {
        catchError(error, "updateExchangeAmount");
      } finally {
        self.loadingExchangeAmountData = false;
        return response;
      }
    });
    const loadBetFunds = flow(function* () {
      self.loadingBetsFunds = true;
      let response = null;
      try {
        const res = yield userApi.getBetsFunds();
        response = res
        self.loadBetFundsData = res?.results;
        self.loadingBetsFunds = false;
      } catch (error) {
        catchError(error, "loadBetFunds");
      } finally {
        self.loadingBetsFunds = false;
        return response
      }
    });
    const loadBetNews = flow(function* (id?: string) {
      self.loadingBetNews = true;
      let response = null;
      try {
        const res = yield userApi.getBetNews(id);
        response = res
        self.loadBetNewsData = res?.results;
        self.loadingBetNews = false;
      } catch (error) {
        catchError(error, "loadBetNews");
      } finally {
        self.loadingBetNews = false;
        return response
      }
    });
    const loadGetAllDeposit = flow(function* (id) {
      self.loadingAllDeposit = true;
      let response = null;
      try {
        const res = yield userApi.getAllDepositData(id);
        response = res
        const data = [res?.results] as any
        self.loadAllDeposit = data
        // self.loadAllDepositStatus= res?.results?.status;
        self.loadingAllDeposit = false;
      } catch (error) {
        self.loadAllDeposit = [{
          availableBalance: 0,
          balance: 0,
          credit: 0,
          creditLimit: 0,
          maxWithdraw: 0,
          _id: '',
          // status:null,
        }] as any
        catchError(error, "loadGetAllDeposit");
      } finally {
        self.loadingAllDeposit = false;
        return response;
      }
    });
    const loadAllSideBarMenuItem = flow(function* () {
      self.loadingAllSideBarMenuItem = true;
      let response = null;
      try {
        const res = yield userApi.getAllSideBarMenu();
        self.getAllSideBarMenuList = res?.results
        response = res
      } catch (error) {
        catchError(error, "loadAllSideBarMenuItem");
      } finally {
        self.loadingAllSideBarMenuItem = false;
        return response;
      }
    });

    const loadDailyPl = flow(function* (data) {
      self.loadingGetDailyPl = true;
      let response = null;
      try {
        const res = yield userApi.getDailyPlData(data);
        response = res;
        // self.getAllDailyPl = response?.results;
      } catch (error) {
        self.getAllDailyPl = null;
        catchError(error, "loadDailyPl");
      } finally {
        self.loadingGetDailyPl = false;
        return response;
      }
    });

    const loadBookDetail2Data = flow(function* (data) {
      self.loadingGetBookDetail2 = true;
      let response = null;
      try {
        const res = yield userApi.getBookDetail2(data);
        response = res;
        self.getBookDetail2DataList = response?.results;
      } catch (error) {
        self.getBookDetail2DataList = null;
        catchError(error, "loadBookDetail2Data");
      } finally {
        self.loadingGetBookDetail2 = false;
        return response;
      }
    });
    const loadDailyReport = flow(function* (data) {
      self.loadingGetDailyReport = true;
      let response = null;
      try {
        const res = yield userApi.getDailyReport(data);
        response = res;
        self.getAllDailyReport = response?.results;
      } catch (error) {
        self.getAllDailyReport = null;
        catchError(error, "loadDailyReport");
      } finally {
        self.loadingGetDailyReport = false;
        return response;
      }
    });
    const loadBookDetailReport1 = flow(function* (data) {
      self.loadingBookdetailData = true;
      let response = null;
      try {
        const res = yield userApi.getBookDettailData1(data);
        response = res;
        // self.getAllDailyReport = response?.results;
      } catch (error) {
        self.getAllDailyReport = null;
        catchError(error, "loadDailyReport");
      } finally {
        self.loadingBookdetailData = false;
        return response;
      }
    });
    const loadBookDatil2ApiDataWithSportId = flow(function* (data) {
      self.loadingBookDetailSportWiseData = true;
      let response = null;
      try {
        const res = yield userApi.getBookDetail2WithSportsId(data);
        response = res;
        // self.getAllDailyReport = response?.results;
      } catch (error) {
        self.getAllDailyReport = null;
        catchError(error, "loadBookDatil2ApiDataWithSportId");
      } finally {
        self.loadingBookDetailSportWiseData = false;
        return response;
      }
    });
    const getSettlementData = flow(function* (id) {
      self.loadingGetSettlementData = true;
      let response = null;
      try {
        const res = yield userApi.loadGetSettlement(id);
        response = res;
      } catch (error) {
        catchError(error, "getSettlementData");
      } finally {
        self.loadingGetSettlementData = false;
        return response;
      }
    });

    const loadDailyPLSportsWiseReport = flow(function* (data) {
      self.loadingGetSportsWiseReport = true;
      let response = null;
      try {
        const res = yield userApi.getDailyPLSportsWiseReport(data);
        response = res;
        // self.getAllPLSportsWiseReport = response?.results;
      } catch (error) {
        self.getAllPLSportsWiseReport = null;
        catchError(error, "loadDailyPLSportsWiseReport");
      } finally {
        self.loadingGetSportsWiseReport = false;
        return response;
      }
    });
    const loadDailyPLSportsWiseReportPost = flow(function* (data) {
      self.loadingGetSportsWiseReport = true;
      let response = null;
      try {
        const res = yield userApi.getDailyReportSportsWiseReportPost(data);
        response = res;
        // self.getAllPLSportsWiseReport = response?.results;
      } catch (error) {
        self.getAllPLSportsWiseReport = null;
        catchError(error, "loadDailyPLSportsWiseReport");
      } finally {
        self.loadingGetSportsWiseReport = false;
        return response
      }
    });
    const loadDailyReportSportsWiseReport = flow(function* (data) {
      self.loadingGetSportsWiseDailyReport = true;
      let response = null;
      try {
        const res = yield userApi.getDailyReportSportsWiseReport(data);
        response = res;
        self.getAllPLSportsWiseDailyReport = response?.results;
      } catch (error) {
        self.getAllPLSportsWiseDailyReport = null;
        catchError(error, "loadDailyReportSportsWiseReport");
      } finally {
        self.loadingGetSportsWiseDailyReport = false;
        return response;
      }
    });
    const laodBookDetailSportsWiseReport = flow(function* (data) {
      self.loadingSportsWiseBookDetailReport = true;
      let response = null;
      try {
        const res = yield userApi.getBookDetail1SportsWiseData(data);
        response = res;
        self.getAllSPortsWiseBookDetail = response?.results;
      } catch (error) {
        self.loadingSportsWiseBookDetailReport = false;
        self.getAllSPortsWiseBookDetail = null;
        catchError(error, "laodBookDetailSportsWiseReport");
      } finally {
        self.loadingSportsWiseBookDetailReport = false;
        return response;
      }
    });
    const loadBookDetailMatchWiseData = flow(function* (data) {
      self.loadingBookMatchWiseReport = true;
      let response = null;
      try {
        const res = yield userApi.getBookDetail2MatchWiseReport(data);
        response = res;
        // self.getAllPLSportsWiseDailyReport = response?.results;
      } catch (error) {
        self.getAllPLSportsWiseDailyReport = null;
        catchError(error, "loadBookDetailMatchWiseData");
      } finally {
        self.loadingBookMatchWiseReport = false;
        return response;
      }
    });

    const loadMarketReport = flow(function* (data) {
      self.loadingPlMarketReport = true;
      let response = null;
      try {
        const res = yield userApi.getMarketReport(data);
        response = res;
        self.getAllMarketReport = response?.results;
      } catch (error) {
        self.getAllMarketReport = null;
        catchError(error, "loadMarketReport");
      } finally {
        self.loadingPlMarketReport = false;
      }
    });

    const loadCommissionReport = flow(function* (data) {
      self.loadingCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getCommissionReport(data);
        response = res;
        self.getCommissionReport = response?.results;
      } catch (error) {
        self.getCommissionReport = null;
        catchError(error, "loadCommissionReport");
      } finally {
        self.loadingCommissionReport = false;
      }
    });
    const loadMarketDailyReport = flow(function* (data) {
      self.loadingReportMarketReport = true;
      let response = null;
      try {
        const res = yield userApi.getDailyReportMarket(data);
        response = res;
        self.getAllMarketDailyReport = response?.results;
      } catch (error) {
        self.getAllMarketDailyReport = null;
        catchError(error, "loadMarketDailyReport");
      } finally {
        self.loadingReportMarketReport = false;
      }
    });
    const loadMarketWiseReportDataOfBookDetail = flow(function* (data) {
      self.loadingReportMarketWiseReportData = true;
      let response = null;
      try {
        const res = yield userApi.getBookDetailMarketWiseData(data);
        response = res;
        self.getBookDetailMarketWiseReportData = response?.results;
      } catch (error) {
        self.getBookDetailMarketWiseReportData = null;
        catchError(error, "loadMarketWiseReportDataOfBookDetail");
      } finally {
        self.loadingReportMarketWiseReportData = false;
        return response;
      }
    });

    const loadSportsWiseReportForCommission = flow(function* (data) {
      self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getSportsWiseCommissionReport(data);
        response = res;
        self.getAllSportsWiseCommissionReport = response?.results;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadSportsWiseReportForCommission");
      } finally {
        self.loadingAllSportsWiseCommissionReport = false;
      }
    });
    const loadDailyMatchWiseDetailedData = flow(function* (data) {
      self.loadingDailyMatchWiseReportData = true;
      let response = null;
      try {
        const res = yield userApi.getDailyReportMatchWiseDetailedReport(data);
        response = res;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadDailyMatchWiseDetailedData");
      } finally {
        self.loadingDailyMatchWiseReportData = false;
        return response;
      }
    });

    const loadMarketPositions = flow(function* (data) {
      self.loadingMarketPositions = true;
      let response = null;
      try {
        const res = yield userApi.getMarketPositions(data);
        response = res;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadMarketPositions");
      } finally {
        self.loadingMarketPositions = false;
        return response;
      }
    });
    const loadMarketShare = flow(function* (data) {
      self.loadingMarketShare = true;
      let response = null;
      try {
        const res = yield userApi.getMarketShare(data);
        response = res;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadMarketShare");
      } finally {
        self.loadingMarketShare = false;
        return response;
      }
    });

    const loadDailyPlMatchWiseDetailedData = flow(function* (data) {
      self.loadingPlDailyMatchWiseReportData = true;
      let response = null;
      try {
        const res = yield userApi.getDailyPlReportMatchWiseDetailedReport(data);
        response = res;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadDailyPlMatchWiseDetailedData");
      } finally {
        self.loadingPlDailyMatchWiseReportData = false;
        return response;
      }
    });
    const loadMarketMatchWiseDetailedData = flow(function* (data) {
      self.loadingBookDetailMatchWiseReportData = true;
      let response = null;
      try {
        const res = yield userApi.getBookReportMatchWiseDetailedData(data);
        response = res;
      } catch (error) {
        // self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadMarketMatchWiseDetailedData");
      } finally {
        self.loadingBookDetailMatchWiseReportData = false;
        return response;
      }
    });

    const loadDailyMatchWiseprofitLose = flow(function* (data) {
      // self.loadingPlDailyMatchWiseReportData = true;
      let response = null;
      try {
        const res = yield userApi.getLoadDailyMatchWiseprofitLose(data);
        response = res;
      } catch (error) {
        self.getAllSportsWiseCommissionReport = null;
        catchError(error, "loadDailyMatchWiseprofitLose");
      } finally {
        // self.loadingPlDailyMatchWiseReportData = false;
        return response;
      }
    });

    const loadMarketWiseCommissionReport = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getMarketWiseCommissionReport(data);
        response = res;
        self.getAllMarketWiseCommissionReport = response?.results;
      } catch (error) {
        self.getAllMarketWiseCommissionReport = null;
        catchError(error, "loadMarketWiseCommissionReport");
      } finally {
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });

    const loadInPlayData = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getInPlayData(data);
        response = res;
        // self.getAllMarketWiseCommissionReport = response?.results;
      } catch (error) {
        catchError(error, "loadInPlayData");
      } finally {
        return response;
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });
    const loadSideBarSubMenuList = flow(function* (marketId) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getSideBarSubMenuList(marketId);
        response = res;
        self.getAllSidebarSubMenuList = response?.results;
      } catch (error) {
        catchError(error, "loadSideBarSubMenuList");
      } finally {
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });
    const loadEventsBySport = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getEventsBySport(data);
        response = res;
        self.getEventsByReport = response?.results;
      } catch (error) {
        catchError(error, "loadEventsBySport");
      } finally {
        return response;
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });
    const loadAllRaceApiData = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getRaceListData(data);
        response = res;
        // self.getEventsByReport = response?.results;
      } catch (error) {
        catchError(error, "loadAllRaceApiData");
      } finally {
        return response
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });


    const loadListOddsAPI = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getListOddsAPI(data);
        response = res;
        // self.getAllMarketWiseCommissionReport = response?.results;
      } catch (error) {
        catchError(error, "loadListOddsAPI");
      } finally {
        return response;
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });

    const loadRaceMarketAPI = flow(function* (data) {
      // self.loadingAllSportsWiseCommissionReport = true;
      let response = null;
      try {
        const res = yield userApi.getRaceMarketAPI(data);
        response = res;
        // self.getAllMarketWiseCommissionReport = response?.results;
      } catch (error) {
        catchError(error, "loadListOddsAPI");
      } finally {
        return response;
        // self.loadingAllSportsWiseCommissionReport = false;
      }
    });

     const loadUserLoginActivitLogs = flow(function* (data) {
      self.loadingUserLoginActivitLogs = true;
      let response = null;
      try {
        const res = yield userApi.getUserLoginActivitLogs(data);
        response = res;
        self.userLoginActivityData = response?.results;
      } catch (error) {
        catchError(error, "loadListOddsAPI");
      } finally {
        self.loadingUserLoginActivitLogs = false;
        return response;
      }
    });

    const deleteSpecificUser = flow(function* (id) {
      let response = null;
      try {
        self.loadingDeleteUser = true;
        const res = yield userApi.deleteUser(id);
        response = res;
        notification.info("User Deleted Successfully");
      } catch (error) {
        catchError(error);
      } finally {
        self.loadingDeleteUser = false;
        return response;
      }
    });

        const getBetPlaceHold = flow(function* (id) {
          let response = null;
          try {
            self.loadingGetBetPlaceHold = true;
            const res = yield userApi.loadBetPlaceHold(id);
            response = res;
          } catch (error) {
            catchError(error);
          } finally {
            self.loadingGetBetPlaceHold = false;
            return response;
          }
        });
    

    return {
      onUserLoginInfo,
      loadUserInfo,
      deleteUserDetails,
      updateUser,
      createUser,
      searchUsers,
      loadAllUsers,
      createLoadUserBalance,
      loadSingleUser,
      postAddBetSizes,
      userCashCreditOperations,
      getUserCashCredits,
      loadAllMarketTypes,
      cashDepositLedgerData,
      updateAllMarketTypes,
      CreditDepositLedgerData,
      loadFinalSheet,
      checkValidateUser,
      allCashDepositLedgerData,
      allCreditDepositLedgerData,
      loadAllSportsHighLightData,
      deleteSport,
      activateEvent,
      loadAllCrickets,
      loadAllSoccer,
      loadAllTennis,
      postAddBetLock,
      LoadUserBalance,
      updateLoadBalanceValue,
      loadUserActiveAndInActive,
      loadUserDeActive,
      loadAllBetSizeData,
      onUpdateBetAmountData,
      loadExchangeRateData,
      updateExchangeAmountData,
      loadBetFunds,
      loadBetNews,
      loadGetDetailLedgerDetail,
      loadGetDetailLedgerDetail2,
      loadGetAllDeposit,
      loadAllSideBarMenuItem,
      loadDailyPl,
      loadDailyPLSportsWiseReport,
      loadMarketReport,
      loadCommissionReport,
      loadDailyReport,
      loadDailyReportSportsWiseReport,
      loadMarketDailyReport,
      getSettlementData,
      loadSettlePlAccountData,
      loadSportsWiseReportForCommission,
      loadMarketWiseCommissionReport,
      loadBookDetail2Data,
      loadCurrentPositonData,
      loadCurrentPositonData2,
      loadGetHighlight2,
      loadSideBarSubMenuList,
      loadInPlayData,
      loadEventsBySport,
      loadListOddsAPI,
      loadAllRaceApiData,
      updateMatchTypeData,
      loadRaceMarketAPI,
      searchSingleUser,
      updateMatchStopReasonOrResumeData,
      updateMatchResults,
      loadMatchShown,
      loadupdatemarket,
      loadUpdateMarketStatusInPlay,
      loadDailyPLSportsWiseReportPost,
      loadDailyMatchWiseDetailedData,
      loadMarketPositions,
      loadMarketShare,
      loadDailyPlMatchWiseDetailedData,
      loadDailyMatchWiseprofitLose,
      loadUserLoginActivitLogs,
      loadBookDatil2ApiDataWithSportId,
      loadBookDetailMatchWiseData,
      loadBookDetailReport1,
      laodBookDetailSportsWiseReport,
      loadMarketWiseReportDataOfBookDetail,
      loadMarketMatchWiseDetailedData,
      loadMatchBetAllowed,
      updateSessionFigureScoreData,
      loadSessionFigureBetting,
      loadFullBookDetailData,
      LoadSaveMarketIdsDataForWinnerName,
      loadFinalSheet2,
      deleteSpecificUser,
      getBetPlaceHold,
      hanldeSortedData,
      hanldeSortData,
      refreshEvent,
    };
  });

export function initUser() {
  return user.create({});
}
