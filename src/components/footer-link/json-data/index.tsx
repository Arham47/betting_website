import {
  CAP_ABOUT_US,
  CAP_ACCOUNT_AND_BONUSES,
  CAP_DISPUTE_RESOLUTION,
  CAP_FAIRNESS_AND, 
  CAP_POLICY,
  CAP_PRIVACY,
  CAP_RESPONSIBLE_GAMING,
  CAP_RULES_AND_REGULATIONS,
  CAP_SELF,
  CAP_TERMS_AND_CONDITIONS,
  CAP_UNDERAGE,
  LOWER_EXCLUSION,
  UPPER_AML,
  UPPER_KYC, 
  UPPER_RNG,
} from "@utils/const";
import { constRoute } from "@utils/route";

export const footerLinkList = [
  {
    title: CAP_PRIVACY + CAP_POLICY,
    screen: constRoute?.privacyPolicy
  },
  {
    title: CAP_TERMS_AND_CONDITIONS,
    screen: constRoute?.termsAndConditions

  },
  {
    title: CAP_RULES_AND_REGULATIONS,
    screen: constRoute?.rulesRegulation

  },
  {
    title: UPPER_KYC,
    screen: constRoute?.KYC

  },
  {
    title: CAP_RESPONSIBLE_GAMING,
    screen: constRoute?.responsibleGame

  },
  {
    title: CAP_ABOUT_US,
    screen: constRoute?.aboutUs

  },
  {
    title: CAP_SELF + LOWER_EXCLUSION + CAP_POLICY,
    screen: constRoute?.selfExclusionPolicy

  },
 
  {
    title: CAP_UNDERAGE + CAP_POLICY,
    screen: constRoute?.underAgePolicy

  },
  {
    title: CAP_DISPUTE_RESOLUTION,
    screen: constRoute?.disputeResoultion

  },
  {
    title: UPPER_AML,
    screen: constRoute?.aml

  },
  {
    title: CAP_FAIRNESS_AND + UPPER_RNG,
    screen: constRoute?.fairnessAndRNG

  },
  {
    title: CAP_ACCOUNT_AND_BONUSES,
    screen: constRoute?.accountBalance
  },
];