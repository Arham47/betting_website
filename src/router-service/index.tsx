import { constRoute } from "@utils/route";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@components/dashboard/index";
import UserList from "@components/users/user-list";
import CricketList from "@components/users/cricket-list";
import SoccerList from "@components/users/soccer-list";
import TennisList from "@components/users/tennis-list";
import UserBetSizes from "@components/users/user-bet-form";
import BetLocker from "@components/bet-locker";
import CashDetails from "@components/users/cash-details";
import FinalSheet from "@components/final-sheet";
import Setting from "@components/setting";
import { LedgerReport } from "@components/users/cash-details/ledger-report";
import { LedgerCash } from "@components/users/cash-details/ledger-cash";
import { LedgerCredit } from "@components/users/cash-details/ledger-credit";


import AdminDashboard from "@components/admin-screens/dashboard";
import { useStore } from "@stores/root-store";
import DailyReport from "@components/daily-report";
import { observer } from "mobx-react";
import DailyPl from "@components/daily-pl";
import AboutUs from "@components/layout/main-layout/public-layout/about-us";
import SelfExclusionPolicy from "@components/layout/main-layout/public-layout/self-exclusion-policy";
import Kyc from "@components/layout/main-layout/public-layout/kyc";
import { BetsList } from "@components/users/user-bet-form/bets-list";
import { ProfitLossReport } from "@components/users/profit-loss/profitLossReport";
import { CurrentPosition } from "@components/users/current-Position/currentPosition";
import { TermsAndCondtion } from "@components/TermsandCondition";
import { PrivacyPolicy } from "@components/privacyPolicy";
import { CurrentPositionSideBar } from "@components/side-bar-current-position";
import CommissionReport from "@components/common-components/commission-report";
import BookDetail2 from "@components/book-detail-2";
import BookDetail from "@components/book-detail";
import Casinos from "@components/casinos";
import { CasinoGames } from "@components/casinoGames";
import FakeBets from "@components/fake-bets";
import GameCategories from "@components/gameCategories";
import SelectedDashboardGame from "@components/SelectedDashboardGame";
import ReportByMarket from "@components/report-by-market";
import EzugiCategory from "@components/ezugiCategory";
import Profile from "@components/users/profile";
import ReportsDailyPlNew from "@components/daily-pl/reportsDailyPlNew";
import { SettlementUserDetal } from "@components/users/settlement-page/settlementUserDetail";
import AccountStatement from "@components/accountStatement";
import DigitRate from "@components/digit-rate";
import AdminCricketOdds from "@components/admin-screens/admin-cricket-odds";
import AdminTennisOdds from "@components/admin-screens/admin-tennis-odds";
import { FullBetListData } from "@components/admin-screens/full-bet-lists-page";
import AdminSoccerOdds from "@components/admin-screens/admin-soccer-odds";
import { ResponsibleGames } from "@components/layout/main-layout/public-layout/responsible-game";
import { DisputeResolution } from "@components/layout/main-layout/public-layout/dispurte-Resolution";
import { AccountAndBonuses } from "@components/layout/main-layout/public-layout/accounts-and-bonuses";
import UnderAgePolicy from "@components/layout/main-layout/public-layout/under-age-policy";
import FairnessRng from "@components/layout/main-layout/public-layout/fairness-rng";
import AdminHorseRaceOdds from "@components/admin-screens/admin-horseRace-odds";
import AdminGreyhoundOdds from "@components/admin-screens/admin-greyhound-odds";
import { ViewFakeBetsOfOddsDataAfterAndBefore } from "@components/fake-bets/viewFakeBetsOddsData";
import SportsBook from "@components/sports-book";
import { UserBookDetail } from "@components/common-components/userBookDetail";
import BetfairGames from "@components/betfair-games";
import MatchSettlement from "@components/matchSettlement";
import { Aml } from "@components/layout/main-layout/public-layout/aml";
import { RulesRegulation } from "@components/layout/main-layout/public-layout/rules-regulation";
import DailyPlUpdated from "@components/daily-pl-updated/daily-pl-updated";
import ProfitLossDetail from "@components/daily-pl-updated/profit-loss-detail";
import LoginUserHistory from "@components/admin-screens/login-user-history";
import LoginUser from "@components/admin-screens/login-user";
import BookDetailDetailPage from "@components/book-detail-detail-page";
import { UserBookDetailSoccer } from "@components/common-components/userBookDetailSoccer";
import { UserBookDetailHorse } from "@components/common-components/userBookDetailHorse";
import { UserBookDetailGreyHound } from "@components/common-components/userBookDetailGreyHound";
import { UserBookDetailCricket } from "@components/common-components/userBookDetailCricket";
import AsianGames from "@components/asian-games";
import ActiveBets from "@components/active-bets";
import FinalSheet2 from "@components/final-sheet-2";
import AllBettors from "@components/all-bettors";
import Statement from "@components/users/cash-details/statement";
import StatementDetails from "@components/users/cash-details/statementDetails";
import Asiangames from "@components/asiangames";
import SelectedDashOneobetCasino from "@components/SelectedDashOneobetCasino";
import OneOBetCasino from "@components/one-o-bet-casino";
import CricketMarketWise from "@components/admin-screens/admin-cricket-market-wise";
import SoccerMarketWise from "@components/admin-screens/admin-soccer-market-wise";
import OpenMarkets from "@components/open-markets";
import FancyListings from "@components/fancy-listings";
import CasinoListings from "@components/casino-listings";
import { SportsHighlight } from "@components/SportsHighlight";

import { LedgerReportTwo } from "@components/users/cash-details/ledger-report-two";
const Routing = observer(() => {
  const {
    user: { getUserInfo },
  } = useStore(null);

  ////////////////////////////////////////// Note Note Note NOte //////////////////////////////////////////
  // In this file always use formator with [TYPESCRIPT AND JAVASCRIPT LANGUAGE FEATURE]
  ////////////////////////////////////////// Note Note Note NOte //////////////////////////////////////////

  return (
    <>
      <Routes>
        <Route path={constRoute?.dashboard} element={localStorage.getItem('adminToken') ? (getUserInfo?.role === "0" ? <AdminDashboard /> : getUserInfo?.role > "0" && getUserInfo?.role < "5" ? <Dashboard /> : "") : ""} />
        <Route path={constRoute?.aboutUs} element={<AboutUs />} />
        <Route path={constRoute?.selfExclusionPolicy} element={<SelfExclusionPolicy />} />
        <Route path={constRoute?.KYC} element={<Kyc />} />
        <Route path={constRoute?.setting} element={<Setting />} />
        <Route path={constRoute?.betLocker} element={<BetLocker />} />
        <Route path={constRoute?.finalSheet} element={<FinalSheet2 />} />
        <Route path={constRoute?.finalSheet2} element={<FinalSheet />} />
        <Route path={constRoute?.dailyReport} element={<DailyReport />} />
        <Route path={constRoute?.dailyPl} element={<DailyPl />} />
        <Route path={constRoute?.bookDetail2} element={<BookDetail2 />} />
        <Route path={constRoute?.fakeBets} element={<FakeBets />} />
        <Route path={`${constRoute?.userBetForm}`} element={<UserBetSizes />} />
        <Route path={`${constRoute?.userBetForm}/:id`} element={<UserBetSizes />} />
        <Route path={constRoute?.users} element={<UserList />} />
        <Route path={constRoute?.cricketMatch} element={<CricketList />} />
        <Route path={constRoute?.soccerMatch} element={<SoccerList />} />
        <Route path={constRoute?.tennisMatch} element={<TennisList />} />
        <Route path={`${constRoute?.cash}/:id`} element={<CashDetails />} />
        <Route path={`${constRoute?.ledger}/:id`} element={<LedgerReport />} />
        <Route path={`${constRoute?.ledgerCash}`} element={<LedgerCash />} />
        <Route path={`${constRoute?.ledgerCredit}`} element={<LedgerCredit />} />


        <Route path={`${constRoute?.ledgerTwo}/:id`} element={<LedgerReportTwo />} />
        <Route path={`${constRoute?.cricket}`} element={<AdminCricketOdds />} />
        <Route path={`${constRoute?.soccer}`} element={<AdminSoccerOdds />} />
        <Route path={`${constRoute?.sportsHighlight}`} element={<SportsHighlight/>} /> 

        <Route path={`${constRoute?.greyhound}`} element={<AdminGreyhoundOdds />} />
        <Route path={`${constRoute?.tennis}`} element={<AdminTennisOdds />} />
        <Route path={`${constRoute?.horseRace}`} element={<AdminHorseRaceOdds />} />
        <Route path={constRoute?.dailyReport} element={<DailyReport />} />
        <Route path={`${constRoute?.betsList}/:id`} element={<BetsList />} />
        <Route path={`${constRoute?.betFairGames}`} element={<BetfairGames />} />
        <Route path={`${constRoute?.profiltLoss}/:id`} element={<ProfitLossReport />} />
        <Route path={`${constRoute?.currentPosition}/:id`} element={<CurrentPosition />} />
        <Route path={`${constRoute?.termsAndConditions}`} element={<TermsAndCondtion />} />
        <Route path={`${constRoute?.privacyPolicy}`} element={<PrivacyPolicy />} />
        <Route path={`${constRoute?.sideBarCurrentPosition}`} element={<CurrentPositionSideBar />} />
        <Route path={`${constRoute?.commissionReport}`} element={<CommissionReport />} />
        <Route path={`${constRoute?.bookDetail}`} element={<BookDetail />} />
        <Route path={`${constRoute?.casinos}`} element={<Casinos />} />
        <Route path={`${constRoute?.asianGame}`} element={<Asiangames />} />
        <Route path={`${constRoute?.casinoGames}`} element={<CasinoGames />} />
        <Route path={`${constRoute?.ezugicasino}`} element={<EzugiCategory />} />
        <Route path={`${constRoute?.evolutionCasino}`} element={<GameCategories />} />
        <Route path={`${constRoute?.dashboardGame}`} element={<SelectedDashboardGame />} />
        <Route path={constRoute.reportByMarket} element={<ReportByMarket />} />
        <Route path={`${constRoute.profile}/:id`} element={<Profile />} />
        <Route path={`${constRoute.reportMarketShare}`} element={<ReportsDailyPlNew />} />
        <Route path={`${constRoute.dailyReportMarketShare}`} element={<DailyPlUpdated />} />
        <Route path={`${constRoute.bookDetailedport}`} element={<BookDetailDetailPage />} />
        <Route path={`${constRoute.profitLossDetail}`} element={<ProfitLossDetail />} />

        <Route path={`${constRoute.settlement}`} element={<SettlementUserDetal />} />
        <Route path={`${constRoute.accountStatement}`} element={<AccountStatement />} />
        <Route path={`${constRoute.digitRate}`} element={<DigitRate />} />
        <Route path={`${constRoute.fullBetList}`} element={<FullBetListData />} />
        <Route path={`${constRoute?.responsibleGame}`} element={<ResponsibleGames />} />
        <Route path={`${constRoute?.disputeResoultion}`} element={<DisputeResolution />} />
        <Route path={`${constRoute?.accountBalance}`} element={<AccountAndBonuses />} />
        <Route path={`${constRoute?.rulesRegulation}`} element={<RulesRegulation />} />
        <Route path={`${constRoute?.underAgePolicy}`} element={<UnderAgePolicy />} />
        <Route path={`${constRoute?.aml}`} element={<Aml />} />
        <Route path={`${constRoute?.fairnessAndRNG}`} element={<FairnessRng />} />
        <Route path={`${constRoute?.viewFakeBet}`} element={<ViewFakeBetsOfOddsDataAfterAndBefore />} />
        <Route path={`${constRoute?.sportsBook}`} element={<SportsBook />} />
        <Route path={`${constRoute?.userBook}`} element={<UserBookDetail />} />
        <Route path={`${constRoute?.userBookSoccer}`} element={<UserBookDetailSoccer />} />
        <Route path={`${constRoute?.userBookHorse}`} element={<UserBookDetailHorse />} />
        <Route path={`${constRoute?.userBookGreyHound}`} element={<UserBookDetailGreyHound />} />
        <Route path={`${constRoute?.userBookCricket}`} element={<UserBookDetailCricket />} />
        <Route path={`${constRoute?.matchSettlement}`} element={<MatchSettlement />} />
        <Route path={`${constRoute?.loginUser}`} element={<LoginUser />} />
        <Route path={`${constRoute?.loginHistory}`} element={<LoginUserHistory />} />
        <Route path={`${constRoute?.asianGames}`} element={<AsianGames />} />
        <Route path={`${constRoute?.activeBets}`} element={<ActiveBets />} />
        <Route path={`${constRoute?.allBettors}`} element={<AllBettors />} />
        <Route path={`${constRoute?.statement}`} element={<Statement />} />
        <Route path={`${constRoute?.statementDetail}`} element={<StatementDetails />} />
        <Route path={`${constRoute?.oneOBetCasinoDash}`} element={<SelectedDashOneobetCasino />} />
        <Route path={`${constRoute?.oneOBetCasino}`} element={<OneOBetCasino />} />
        <Route path={`${constRoute?.cricketMarketWise}`} element={<CricketMarketWise />} />
        <Route path={`${constRoute?.soccerMarketWise}`} element={<SoccerMarketWise />} />
        <Route path={`${constRoute?.openMarkets}`} element={<OpenMarkets />} />

        <Route path={`${constRoute?.fancyListings}`} element={<FancyListings />} />
        <Route path={`${constRoute?.casinoListings}`} element={<CasinoListings />} />

      </Routes>
    </>
  );
});
export default memo(Routing);
