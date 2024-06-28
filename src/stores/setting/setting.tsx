import {flow, types} from "mobx-state-tree";
import {toJS} from "mobx";
import {catchError} from "@utils/common-functions";
import {CAMEL_DEFAULT_LOGIN_PAGE, LOWER_THEME} from "@utils/const";
import {settingApi} from "@api";
import {notification} from "@utils/notifications";
import {betSizeModel, defaultSettingsModel} from "@stores/store-utils/setting";


export const setting = types
  .model({
    selectedTheme: types.optional(types.maybeNull(types.string), localStorage.getItem(LOWER_THEME)),
    selectedLoginPage: types.optional(types.maybeNull(types.string), localStorage.getItem(CAMEL_DEFAULT_LOGIN_PAGE)),
    defaultSettings: types.maybeNull(types.array(defaultSettingsModel)),
    settingCricket: types.maybeNull(types.frozen()),
    loadingChangeTheme: types.optional(types.boolean, false),
    loadingTermsAndCondition: types.optional(types.boolean, false),
    loadingGetTermsAndCondition: types.optional(types.boolean, false),
    loadingSportsBook: types.optional(types.boolean, false),
    loadingCasinoGame: types.optional(types.boolean, false),
    europeanCasinoLoading: types.optional(types.boolean, false),
    loadingGetDefaultSettings: types.optional(types.boolean, false),
    loadingSettings: types.optional(types.boolean, false),
    loadingGetPrivacyPolicy: types.optional(types.boolean, false),
    loadingPrivacyPolicy: types.optional(types.boolean, false),
    loadingRulesRegulation: types.optional(types.boolean, false),
    privacyPolicyContent: types.maybeNull(types.string),
    rulesRegulationContent: types.maybeNull(types.string),
    termsAndConditionContent: types.maybeNull(types.string),
    loadingChangeLoginPage: types.optional(types.boolean, false),
    loadingAddTermsAndCondition: types.optional(types.boolean, false),
    loadingRulesAndRegulations: types.optional(types.boolean, false),
    loadingUpdateBetSize: types.optional(types.boolean, false),
    loadingUpdateSetting: types.optional(types.boolean, false),
    loadingAddPrivacyPolicy: types.optional(types.boolean, false),
    loadingGetDefaultBetSizes: types.optional(types.boolean, false),
    defaultBetSizeList: types.maybeNull(types.array(betSizeModel))
  })
  .views((self) => ({
    get getDefaultSettings() {
      return toJS(self.defaultSettings);
    },
    get getSelectedTheme() {
      return toJS(self.selectedTheme);
    },
    get getLoadingTermsAndTermsAndCondition() {
      return toJS(self.loadingTermsAndCondition);
    },
    get getLoadingPrivacyPolicy() {
      return toJS(self.loadingPrivacyPolicy);
    },
    get getPrivacyPolicyContent() {
      return toJS(self.privacyPolicyContent);
    },
    get getRulesRegulation() {
      return toJS(self.rulesRegulationContent);
    },
    get getTermsAndConditionsContent() {
      return toJS(self.termsAndConditionContent);
    },
    get getSelectedLoginPage() {
      return toJS(self.selectedLoginPage);
    },
    get isLoadingChangeLoginPage() {
      return toJS(self.loadingChangeLoginPage);
    },
    get isLoadingForPrvacyPolicy() {
      return toJS(self.loadingAddPrivacyPolicy);
    },
    get isLoadingTermsAndCondition() {
      return toJS(self.loadingAddTermsAndCondition);
    },
    get getLoadingBetSizes() {
      return toJS(self.loadingUpdateBetSize)
    },
    get isLoadingGetDefaultSettings() {
      return toJS(self.loadingGetDefaultSettings)
    },
    get getDefaultBetSizeList() {
      return toJS(self.defaultBetSizeList)
    },
    get getSettingCricket() {
      return toJS(self.settingCricket)
    },
  }))

  .actions((self) => {
    const changeTheme = flow(function* (data) {
      let response = null
      try {
        self.selectedTheme = data
        response = data
        yield data
      } catch (error) {
        catchError(error, "changeTheme");
      } finally {
        return response
      }
    });

    const updateDefaultTheme = flow(function* (data) {
      self.loadingChangeTheme = true;
      let response = null;
      try {
        const res = yield settingApi.updateTheme(data);
        response = res;
        if (res?.success) {
          notification.success("Default theme has been settled for all types of users");
        }
      } catch (error) {
        catchError(error, "updateDefaultTheme");
      } finally {
        self.loadingChangeTheme = false;
        return response;
      }
    });

    const onUpdatePrivacyPolicy = flow(function* (data) {
      self.loadingAddPrivacyPolicy = true;
      let response = null;
      try {
        const res = yield settingApi.updatePrivacyPolicy(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingAddPrivacyPolicy = false;
        catchError(error, "privacyPolicy");
      } finally {
        self.loadingAddPrivacyPolicy = false;
        return response;
      }
    });

    const onUpdateTermsAndcondition = flow(function* (data) {
      self.loadingAddTermsAndCondition = true;
      let response = null;
      try {
        const res = yield settingApi.updateTermandCondition(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingAddTermsAndCondition = false;
        catchError(error, "termAndCondition");
      } finally {
        self.loadingAddTermsAndCondition = false;
        return response;
      }
    });

    const onLoadRuleRegulation = flow(function* (data) {
      self.loadingRulesAndRegulations = true;
      let response = null;
      try {
        const res = yield settingApi.updateRuleRegulation(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingRulesAndRegulations = false;
        catchError(error, "RuleRegulation");
      } finally {
        self.loadingRulesAndRegulations = false;
        return response;
      }
    });

    const onUpdateBetSizes = flow(function* (data) {
      self.loadingUpdateBetSize = true;
      let response = null;
      try {
        const res = yield settingApi.updateDefaultBetSizes(data);
        response = res;
        if (res?.success) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingUpdateBetSize = false;
        catchError(error, "updateBetSizes");
      } finally {
        self.loadingUpdateBetSize = false;
        return response;
      }
    });

    const onUpdateSetting = flow(function* (data) {
      self.loadingUpdateSetting = true;
      let response = null;
      try {
        const res = yield settingApi.updateSetting(data);
        response = res;
        if (res?.status) {
          notification.success(res?.message);
        }
      } catch (error) {
        self.loadingUpdateSetting = false;
        catchError(error, "onUpdateSetting");
      } finally {
        self.loadingUpdateSetting = false;
        return response;
      }
    });

    const loadTermsAndCondition = flow(function* (navigate = null) {
      self.loadingGetTermsAndCondition = true;
      let response = null;
      self.termsAndConditionContent = null
      try {
        self.loadingGetTermsAndCondition = true;
        const res = yield settingApi.onLoadTermsAndCondition();
        response = res;
        if (res?.success) {
          self.termsAndConditionContent = res?.results?.termAndConditionsContent;
        }
      } catch (error) {
        self.loadingGetTermsAndCondition = false;
        catchError(error, "loadTermsAndCondition");
        response = error.response;
      } finally {
        self.loadingGetTermsAndCondition = false;
        return response;
      }
    });

    const loadSportsBookGame = flow(function* (navigate = null) {
      self.loadingSportsBook = true;
      let response = null;
      try {
        const res = yield settingApi.onLoadSportsBook();
        response = res;
        if (res?.success) {
          notification.success(res?.message)
        }
      } catch (error) {
        self.loadingSportsBook = false;
        catchError(error, "loadSportsBookGame");
      } finally {
        self.loadingSportsBook = false;
        return response;
      }
    });

    const loadCasinoGames = flow(function* (navigate = null) {
      self.loadingCasinoGame = true;
      let response = null;
      try {
        const res = yield settingApi.onLoadCasinoGames();
        response = res;
        if (res?.success) {
          notification.success(res?.message)
        }
      } catch (error) {
        self.loadingCasinoGame = false;
        catchError(error, "loadCasinoGames");
      } finally {
        self.loadingCasinoGame = false;
        return response;
      }
    });

    const loadEuropeanCasino = flow(function* (navigate = null) {
      self.europeanCasinoLoading = true;
      let response = null;
      try {
        const res = yield settingApi.onLoadEuropeanCasino();
        response = res;
        if (res?.success) {
          notification.success(res?.message)
        }
      } catch (error) {
        self.europeanCasinoLoading = false;
        catchError(error, "europeanCasino");
      } finally {
        self.europeanCasinoLoading = false;
        return response;
      }
    });

    const loadBetSizeUrl = flow(function* (navigate = null) {
      self.loadingGetDefaultBetSizes = true;
      let response = null;
      self.termsAndConditionContent = null
      try {
        const res = yield settingApi.onLoadGetDefaultBetSizes();
        response = res;
        if (res?.success) {
          self.defaultBetSizeList = res?.results;
        }
      } catch (error) {
        self.loadingGetDefaultBetSizes = false;
        catchError(error, "getDefaultBetSizes");
        response = error.response;
      } finally {
        self.loadingGetDefaultBetSizes = false;
        return response;
      }
    });

    const loadPrivacyPolicy = flow(function* (navigate = null) {
      self.loadingGetPrivacyPolicy = true;
      let response = null;
      self.privacyPolicyContent = null
      try {
        self.loadingGetPrivacyPolicy = true;
        const res = yield settingApi.onLoadPrivacyPolicy();
        response = res;
        if (res?.success) {
          self.privacyPolicyContent = res?.results?.privacyPolicyContent;
        }
      } catch (error) {
        self.loadingGetPrivacyPolicy = false;
        catchError(error, "loadPrivacyPolicy");
        response = error.response;
      } finally {
        self.loadingGetPrivacyPolicy = false;
        return response;
      }
    });

    const loadRulesRegulation = flow(function* (navigate = null) {
      self.loadingRulesRegulation = true;
      let response = null;
      self.rulesRegulationContent = null
      try {
        self.loadingRulesRegulation = true;
        const res = yield settingApi.onLoadRulesRegulation();
        response = res;
        if (res?.success) {
          self.rulesRegulationContent = res?.results?.rules;
        }
      } catch (error) {
        self.loadingRulesRegulation = false;
        catchError(error, 'loadRulesRegulation');
        response = error.response;
      } finally {
        self.loadingRulesRegulation = false;
        return response;
      }
    });

    const updateDefaultLoginPage = flow(function* (data) {
      self.loadingChangeLoginPage = true;
      let response = null;
      try {
        const res = yield settingApi.changeLoginPage(data);
        response = res;
        // self.selectedLoginPage = res
        if (res?.success) {
          notification.success("Default login page has been settled for all types of users");
        }
      } catch (error) {
        catchError(error, "updateDefaultLoginPage");
      } finally {
        self.loadingChangeLoginPage = false;
        return response;
      }
    });

    const loadDefaultSettings = flow(function* () {
      self.loadingGetDefaultSettings = true;
      let response = null;
      try {
        const res = yield settingApi.getDefaultSettings();
        response = res;
        if (res?.success) {
          self.defaultSettings = res?.results;
          localStorage.setItem(CAMEL_DEFAULT_LOGIN_PAGE, res?.results[0]?.defaultLoginPage)
        }
      } catch (error) {
        catchError(error, "loadDefaultSettings");
        response = error.response;
      } finally {
        self.loadingGetDefaultSettings = false;
        return response;
      }
    });

    const loadSettings = flow(function* (payload) {
      self.loadingSettings = true;
      let response = null;
      try {
        const res = yield settingApi.getSettings(payload);
        response = res;
        if (res?.status) {
          if (res?.kind === 'GET_CRICKET_SCORECARD') {
            self.settingCricket = res?.results
          }
        }
      } catch (error) {
        catchError(error, "loadSettings");
        response = error.response;
      } finally {
        self.loadingSettings = false;
        return response;
      }
    });

    return {
      changeTheme,
      updateDefaultTheme,
      onUpdatePrivacyPolicy,
      onUpdateTermsAndcondition,
      loadTermsAndCondition,
      loadPrivacyPolicy,
      updateDefaultLoginPage,
      onUpdateBetSizes,
      onUpdateSetting,
      loadBetSizeUrl,
      loadDefaultSettings,
      onLoadRuleRegulation,
      loadRulesRegulation,
      loadSportsBookGame,
      loadCasinoGames,
      loadEuropeanCasino,
      loadSettings,
    };
  });

export function initSetting() {
  return setting.create({});
}
