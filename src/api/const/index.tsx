// export const baseUrl = "https://.0.139:3000/api/"; //// stepinsolution
// export const baseUrl = "https://192.168.100.101:3000/api/"; //// wateen
// export const baseUrl = "http://192.168.1.5:3000/api/"; //// ethernet
// export const baseUrl = "https://1obet.com:3000/api/"; //// Live for live server
// export const baseUrl = "https://1obet.com:3000/api/"; //// Live for live server
// export const baseUrl = "https://server.1obet.net:3000/api/"; //// Live for live server
// export const baseUrl = "https://server.1obet.net/api/" // previous live server URl
// export const baseUrl = "https://production.1obet.net/api/" // update Live server Url
// export const baseUrl = "https://api.bookofblack.com/api/" // update Dev server Url
// export const baseUrl = "https://dev.1obet.net/api/"
// export const baseUrl = "http://192.168.100.153:3000/api/"; //// Live for live server
// export const baseUrl = "http://192.168.71.198:3000/api/"; // azam server
// export const baseUrl = "https://server.1obet.net:3000/api/"; //// Live for new  live server

// export const baseUrl = process.env.REACT_APP_API_URI || `http://localhost:4000/api/`
export const baseUrl = process.env.REACT_APP_API_URI || `https://production.1obet.net/api/`

// export const baseUrl = "https://api.bookofblack.com/api/"

export const baseUrlFiles = "baseUrl";

// export const baseUrl = "http://server.1obet.com:4000/api/"; //// Live 
//socket's url
// export const socketUrl = process.env.REACT_APP_SOCKET_URI || `http://localhost:4000/`
export const socketUrl = process.env.REACT_APP_SOCKET_URI || `http://production.1obet.net/`

// export const socketUrl = "https://test.bookofblack.com/"
export const oneobetCasinoUrl = "https://1obet.com/assets/asian_casino_2/"

//////// Users URLs ////////
export const getAllUsersUrl = `${baseUrl}getAllUsers`
export const getAllCricketsUrl = `${baseUrl}listCricket`
export const getAllSoccerUrl = `${baseUrl}list-soccer`
export const getAllTennisUrl = `${baseUrl}list-tennis`
export const editTennisUrl = `${baseUrl}edit-tennis`
export const editSoccerUrl = `${baseUrl}edit-soccer`
export const editCricketsUrl = `${baseUrl}editCricket`
export const deleteCricketsUrl = `${baseUrl}delete-cricket`
export const deleteSoccerUrl = `${baseUrl}delete-soccer`
export const deleteTennisUrl = `${baseUrl}delete-tennis`
export const serachUsersUrl = `${baseUrl}searchUsers`
export const fullBookModelDataUrl = `${baseUrl}fancy_full_book`
export const searchSingleUserUrl = `${baseUrl}searchSingleUser`
export const updateUserUrl = `${baseUrl}updateUser`
export const getSingleUserUrl = `${baseUrl}getSingleUser`
export const loadUserBalanceUrl = `${baseUrl}loadUserBalance`
export const createAddBetSizesUrl = `${baseUrl}addBetSizes`
export const createAddBetLockUrl = `${baseUrl}addBetLock`
export const getAllMarketTypesUrl = `${baseUrl}getAllMarketTypes`
export const updateAllMarketTypesUrl = `${baseUrl}addAllowedMarketTypes`
export const addCashDepositUrl = `${baseUrl}addCashDeposit`
export const withDrawCashDepositUrl = `${baseUrl}withDrawCashDeposit`
export const addUserCreditUrl = `${baseUrl}addCredit`
export const withdrawUserCreditUrl = `${baseUrl}withdrawCredit`
export const getUserAllCreditsUrl = `${baseUrl}getAllCredits`
export const getAllCashDepositsUrl = `${baseUrl}getAllCashDeposits`
export const getFinalReport = `${baseUrl}getFinalReport`
export const getFinalReport2Url = `${baseUrl}tesTingsheet`
export const getCurrentPositionDataUrl = `${baseUrl}getCurrentPosition`
export const getCurrentPositionDataUrl2 = `${baseUrl}getCurrentPosition2`
export const getHighlight = `${baseUrl}gethighlights`

export const postCheckValidationUrl = `${baseUrl}checkValidation`
export const saveMarketIDSWinnerRunnerUrl = `${baseUrl}saveMarketIDSWinnerRunner`
export const cashCreditLedgerDataUrl = `${baseUrl}cashCreditLedger`
export const cashDepositLedgerDataUrl = `${baseUrl}cashDepositLedger`
export const allCashDepositLedgerDataUrl = `${baseUrl}GetAllCashDepositLedger`
export const allCashCreditDepositLedgerDataUrl = `${baseUrl}GetAllCashCreditLedger`
export const getAllSportsHighLightUrl = `${baseUrl}getAllSportsHighlight`
export const deleteSportUrl = `${baseUrl}setCloseEventWithCancelBet`
export const activateEventUrl = `${baseUrl}activate-event`
export const refreshEventUrl = `${baseUrl}admin-dashboard/fetch-events`
export const getLoadBalanceUrl = `${baseUrl}getClientList`
export const getLoadUserActiveAndInActiveUrl = `${baseUrl}activeUser`
export const getLoadUserDeActiveUrl = `${baseUrl}deactiveUser`
export const getAllBetSizeDataUrl = `${baseUrl}getAllBetSizes`
export const setMatchShowUrl = `${baseUrl}setMatchShow`
export const updatemarketstatusUrl =`${baseUrl}updatemarketstatus`
export const updateMarketStatusInPlayUrl =`${baseUrl}update-market-status-in-play`
export const setMatchBetAllowedUrl = `${baseUrl}setBattingDisabled`
export const sessionFigureUrl = `${baseUrl}sessionList`
export const updateBetAmountDataUrl = `${baseUrl}updateBetSizes`
export const getExchangeRatesUrl = `${baseUrl}GetExchangeRates`
export const updateExchangeAmountUrl = `${baseUrl}updateDefaultExchange`
export const betFundsUrl = `${baseUrl}betFunds`
export const betNewsUrl = `${baseUrl}betsNews`
export const getLedgerDetailsUrl = `${baseUrl}getLedgerDetails`
export const getLedgerDetails2Url = `${baseUrl}getLedgerDetails2`
export const getAllDepositDataUrl = `${baseUrl}getAllDeposits`
export const getAllSideBarMenuUrl = `${baseUrl}getSideBarMenu`
export const getDailyPl = `${baseUrl}getDailyPLReport`
export const bookDetail2DataUrl = `${baseUrl}bookDetail2Report`
export const getDailyReportUrl = `${baseUrl}getDailyReport`
export const getBookDetailReportUrl = `${baseUrl}bookDetailReport`
export const MatchWiseDailyReportUrl = `${baseUrl}dailyMatchWiseReports`
export const BookDetailMarketWiseReportUrl = `${baseUrl}bookDetailMatchWiseReports`
export const getSettlementDataUrl = `${baseUrl}getSettlement`
export const dailyPLSportsWiseReport = `${baseUrl}dailyPlSportWiseReports`
export const dailyPlMarketsReports = `${baseUrl}dailyPLMatchWiseReport`
export const getCommissionReport = `${baseUrl}getCommissionReport`
export const sportsWiseCommissionReport = `${baseUrl}SportWiseCommissionReport`
export const dailyMatchWiseReportDatailedUrl = `${baseUrl}dailyMatchWiseDetailedReports`
export const marketPositionsUrl = `${baseUrl}marketPositions`
export const marketSharesUrl = `${baseUrl}marketShares`
export const dailyPlMatchWiseReportDatailedUrl = `${baseUrl}dailyPLMatchWiseDetailedReport`
export const BookDetailMatchWiseReportDetailDataUrl = `${baseUrl}bookDetailMatchWiseDetailedReports`
export const dailyMatchWiseprofitLose = `${baseUrl}dailyMatchWiseprofitLose`
export const MarketWiseCommissionReport = `${baseUrl}MatchWiseCommissionReport`
export const listCompetitions = `${baseUrl}listCompetitions`
export const updateMatchTypeUrl = `${baseUrl}updateMatchType`
export const updateMatchUrl = `${baseUrl}updateMatch`
export const updateSessionScoreUrl = `${baseUrl}updateSessionScore`
export const settleMatchUrl = `${baseUrl}SettleMatch`
export const getDealerDepositedCash = `${baseUrl}getdeopsitDetailsCash`
export const getDealerDepositedCredit = `${baseUrl}getdepositDetailsCredit`
export const listInplayEvents = `${baseUrl}listInplayEvents`
export const listEventsBySport = `${baseUrl}listEventsBySport`
export const listOddsAPI = `${baseUrl}listOddsAPI`
export const racesMarketListUrl = `${baseUrl}racesMarketList`
export const userLoginActivitLogsUrl = `${baseUrl}userLoginActivitLogs`
export const deleteUserUrl = `${baseUrl}delete-user`
export const getBetPlaceHoldUrl = `${baseUrl}getBetPlaceHold`



export const listOfRaceAPIUrl = `${baseUrl}racesAPI`
export const dailyReportSportsWiseReport = `${baseUrl}dailySportsWiseReport`
export const bookDetailSportsWiseReportUrl = `${baseUrl}bookDetailSportsWiseReport`
//////// Recharges URLs ////////
export const getAllRechargesUrl = `${baseUrl}getAllRecharges`

//////// Setting URLs ////////
export const updateThemeUrl = `${baseUrl}updateDefaultTheme`
export const privacyPolicyUrl = `${baseUrl}addPrivacyPolicy`
export const termAndConditionUrl = `${baseUrl}addTermsAndConditions`
export const rulesAndRegulationUrl = `${baseUrl}addRules`
export const getTermsAndConditionURl = `${baseUrl}GetAllTermsAndConditions`
export const getPrivayPolicyUrl = `${baseUrl}GetAllPrivacyPolicy`
export const getAllRuleUrl = `${baseUrl}GetRule`
export const updateLoginPageUrl = `${baseUrl}updateDefaultLoginPage`
export const updateBetSizesUrl = `${baseUrl}updateDefaultBetSizes`
export const updateSettingUrl = `${baseUrl}update-setting`
export const getSettingsUrl = `${baseUrl}get-setting`
export const getDefaultBetSizesUrl = `${baseUrl}getDefaultBetSizes`
export const getDefaultSettingsUrl = `${baseUrl}getDefaultSettings`
export const getSportsBookUrl = `${baseUrl}sportsBook`
export const casinoDatailUrl = `${baseUrl}getAsianCasinoGames`
export const addEuCasinoGameDetailsUrl = `${baseUrl}addEuCasinoGameDetails`


//////// Betting ////////
export const postPlaceBetUrl = `${baseUrl}placeBet`
export const getAllBetFairGames = `${baseUrl}GetAllBetFairGames`
export const getUserBetsListUrl = `${baseUrl}getUserBets`
export const getAllCasinoGamesListUrl = `${baseUrl}getAllCasinoCategories`
export const postCasinoSelectedGameListUrl = `${baseUrl}addSelectedCasinoCategories`
export const getCasinoGameListByCategoryUrl = `${baseUrl}getCategoryCasinoGames`
export const postCasinoGamesListUrl = `${baseUrl}getAllGamesList`
export const getGameListIframeLinkUrl = `${baseUrl}getGame`
export const getGameByCategoryNameUrl = `${baseUrl}getGamesByName`
export const getSaveGameForDashboardUrl = `${baseUrl}addSelectedDashboardGames`
export const getFakeBetsDataUrl = `${baseUrl}FakeBetsList`
export const getProfitLossDataUrl = `${baseUrl}profitLose`
export const getGameDataOFProfitLossUrl = `${baseUrl}EventWiseprofitLose`
export const getFakeBetRatesUrl = `${baseUrl}getBetRates`
export const getFakeBetsOddsDataUrl = `${baseUrl}reviewFakeBet`
// export const updateFakeBetListUrl = `${baseUrl}updateFakeBet`
export const updateFakeBetListUrl = `${baseUrl}approvedFakeBet`
export const getFakeBetCountsUrl = `${baseUrl}countFakeBets`
export const getBettingFiguresUrl = `${baseUrl}getBettingFigures`
export const UpdateBettingFiguresUrl = `${baseUrl}UpdateBettingFigures`
export const figureBettingBetPlaceUrl = `${baseUrl}placeFigureBets`
export const liveTvDataUrl = `${baseUrl}liveTv`
export const getFakeBetsDataOddsUrl = `${baseUrl}reviewFakeBet`
// export const getCasinoGameListByCategoryUrl = `${baseUrl}getSelectedCasinoGames`
export const getAllSelectedCasinos = `${baseUrl}getAllSelectedCasinos`
export const getAllSelectedAsianGameUrl = `${baseUrl}getListAsianGames`
export const getAddSelectedCasinoGameUrl = `${baseUrl}addCasinoGameDetails`
export const getAllDashboardGames = `${baseUrl}getDashboardGames`
export const deleteFakeBet = `${baseUrl}deleteFakeBet`
export const getMatchedBetsUrl = `${baseUrl}getMatchedBets`
export const currentPositionDetailsUrl = `${baseUrl}currentPositionDetails`
export const getBetterDashBoardGamesUrl = `${baseUrl}bettorDashboardGames`
export const getMatchSettlementUrl = `${baseUrl}getAllMatchSettlements `
export const dashBoardGameForCategoryUrl = `${baseUrl}getSelectedGamesBySearch`
export const getLoadMarketIdsDataUrl = `${baseUrl}getMarketIDSData`
export const gameCategoryUrl = `${baseUrl}getSelectedGamesCategories`
export const cricketTenissSoccerDataUrl = `${baseUrl}bettorDashboardGames2`
export const sportsBookLinkUrl = `${baseUrl}sportsBook`
export const sportsBookLinkDirectUrl = `${baseUrl}sportsBookDirect`
// Results Api
export const getAllGammesResultsUrl = `${baseUrl}getAllGamesResults`
export const sportBookUrl = `${baseUrl}user_book`
export const getEventWinnerNameUrl = `${baseUrl}getEventWinnerName`
export const getWaitingBetsForManuelUrl = `${baseUrl}getWaitingBetsForManuel`
export const getSessionScoreUrl = `${baseUrl}getSessionScore`
export const setSessionScoreUrl = `${baseUrl}setSessionScore`
export const cancelSingleBetUrl = `${baseUrl}cancelSingleBet`
export const battorsListUrl = `${baseUrl}battors-list`
export const fancyListUrl = `${baseUrl}GetAllBets`
export const casinoListUrl = `${baseUrl}casino-bets`
export const bettorsLedgerUrl = `${baseUrl}user-latest-ledger`
export const updateBetPlaceHoldUrl = `${baseUrl}updateBetPlaceHold`
export const betsViewUrl = `${baseUrl}SingleUserAllBets`
export const userAccountSattleUrl = `${baseUrl}userAccountSettlement`
export const setFancyStore = `${baseUrl}set-fancy-score`
export const setCasinoAmountUrl = `${baseUrl}set-casino-amount`
export const liveTvGetAsianTablesUrl = `${baseUrl}getAsianTables`
export const SetAsianDashboardUrl = `${baseUrl}SetAsianDashboard`
export const getMarketsByEventIdUrl = `${baseUrl}getMarketsByEventId`









