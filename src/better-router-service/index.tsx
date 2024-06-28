import { constRoute } from "@utils/route";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import AboutUs from "@components/layout/main-layout/public-layout/about-us";
import SelfExclusionPolicy from "@components/layout/main-layout/public-layout/self-exclusion-policy";
import Kyc from "@components/layout/main-layout/public-layout/kyc";
import { TermsAndCondtion } from "@components/TermsandCondition";
import { PrivacyPolicy } from "@components/privacyPolicy";
import { ResponsibleGames } from "@components/layout/main-layout/public-layout/responsible-game";
import { DisputeResolution } from "@components/layout/main-layout/public-layout/dispurte-Resolution";
import { AccountAndBonuses } from "@components/layout/main-layout/public-layout/accounts-and-bonuses";
import UnderAgePolicy from "@components/layout/main-layout/public-layout/under-age-policy";
import FairnessRng from "@components/layout/main-layout/public-layout/fairness-rng";
import { Aml } from "@components/layout/main-layout/public-layout/aml";
import { RulesRegulation } from "@components/layout/main-layout/public-layout/rules-regulation";
const BetterRouting = observer(() => {

////////////////////////////////////////// Note Note Note NOte //////////////////////////////////////////
  // In this file always use formator with [TYPESCRIPT AND JAVASCRIPT LANGUAGE FEATURE]
////////////////////////////////////////// Note Note Note NOte //////////////////////////////////////////

  return (
    <>
      <Routes>
        <Route path={constRoute?.aboutUs} element={<AboutUs />} />
        <Route path={constRoute?.selfExclusionPolicy} element={<SelfExclusionPolicy />} />
        <Route path={constRoute?.KYC} element={<Kyc/>} />        
        <Route path={`${constRoute?.termsAndConditions}`} element={<TermsAndCondtion />} />
        <Route path={`${constRoute?.privacyPolicy}`} element={<PrivacyPolicy />} />
        <Route path={`${constRoute?.responsibleGame}`} element={<ResponsibleGames />} />
        <Route path={`${constRoute?.disputeResoultion}`} element={<DisputeResolution />} />
        <Route path={`${constRoute?.accountBalance}`} element={<AccountAndBonuses/>} />
        <Route path={`${constRoute?.rulesRegulation}`} element={<RulesRegulation />} />  
        <Route path={`${constRoute?.underAgePolicy}`} element={<UnderAgePolicy />} />  
        <Route path={`${constRoute?.aml}`} element={<Aml />} />  
        <Route path={`${constRoute?.fairnessAndRNG}`} element={<FairnessRng />} />
      </Routes>
    </>
  );
});
export default memo(BetterRouting);
