import {getAuthorizationHeader} from "../common-utils";
import axios from "axios";

import {BaseApi} from "../baseApi";
import {
  addEuCasinoGameDetailsUrl,
  casinoDatailUrl,
  getAllRuleUrl,
  getDefaultBetSizesUrl,
  getDefaultSettingsUrl,
  getPrivayPolicyUrl, getSettingsUrl,
  getSportsBookUrl,
  getTermsAndConditionURl,
  privacyPolicyUrl,
  rulesAndRegulationUrl,
  termAndConditionUrl,
  updateBetSizesUrl,
  updateSettingUrl,
  updateThemeUrl
} from "@api/const";
import {updateLoginPageUrl} from "@api/const";

class SettingApi extends BaseApi {

  updateTheme = async (data) => {
    try {
      const response = await axios.post(updateThemeUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updatePrivacyPolicy = async (data) => {
    try {
      const response = await axios.post(privacyPolicyUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateTermandCondition = async (data) => {
    try {
      const response = await axios.post(termAndConditionUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateRuleRegulation = async (data) => {
    try {
      const response = await axios.post(rulesAndRegulationUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateDefaultBetSizes = async (data) => {
    try {
      const response = await axios.post(updateBetSizesUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updateSetting = async (data) => {
    try {
      const response = await axios.post(updateSettingUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  onLoadTermsAndCondition = async () => {
    try {
      const response = await axios.get(getTermsAndConditionURl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onLoadSportsBook = async () => {
    try {
      const response = await axios.get(getSportsBookUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  onLoadGetDefaultBetSizes = async () => {
    try {
      const response = await axios.get(getDefaultBetSizesUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onLoadPrivacyPolicy = async () => {
    try {
      const response = await axios.get(getPrivayPolicyUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onLoadRulesRegulation = async () => {
    try {
      const response = await axios.get(getAllRuleUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  changeLoginPage = async (data) => {
    try {
      const response = await axios.post(updateLoginPageUrl, data, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  onLoadCasinoGames = async () => {
    try {
      const response = await axios.get(casinoDatailUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  onLoadEuropeanCasino = async () => {
    try {
      const response = await axios.get(addEuCasinoGameDetailsUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getDefaultSettings = async () => {
    try {
      const response = await axios.get(getDefaultSettingsUrl, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getSettings = async (payload) => {
    try {
      const response = await axios.post(getSettingsUrl, payload, {
        headers: {Authorization: getAuthorizationHeader()},
        cancelToken: this.cancelToken,
      })

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SettingApi;
