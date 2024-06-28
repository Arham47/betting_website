import ToggleTheme from "@components/layout/main-layout/private-layout/header/toggle-theme";
import {useStore} from "@stores/root-store";
import {Spin, TabsProps, Tooltip} from "antd";
import {
  LOWER_LOGIN_PAGE_ONE,
  LOWER_LOGIN_PAGE_THREE,
  LOWER_LOGIN_PAGE_TWO,
  CAP_CHANGE_MAX_BET_SIZES,
  DATA_NOT_FOUND,
  CAP_CHANGE_TERMS_AND_CONDITION,
  NUM_STR_1,
  NUM_STR_2,
  NUM_STR_3,
  NUM_STR_4,
  NUM_STR_5,
  CAP_THEME_SETTing,
  CAP_ChANGE_PRIVACY,
  CAP_TERMS_AND_CONDITIONS_CHANGE,
  CAP_UPDATE_BETSIZE,
  CAP_UPDATE_CURRENCY,
  CAP_CHANGE_DEFAULT_LOGIN,
  CAP_CHANGE_DEFAULT_THEME,
  NUM_STR_0_ROLE,
  CAP_UPDATE,
} from "@utils/const";
import {CAP_SUBMIT, LOWER_NUMBER} from "@utils/const";
import {Col, Row, Tabs, Select} from "antd";
import {observer} from "mobx-react";
import {memo, useMemo, useState, useRef, useEffect} from "react";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import loginBgOne from "@assets/images/login-bg-dark2.webp";
import loginBgTwo from "@assets/images/blue-login-bg.webp";
import loginBgThree from "@assets/images/grey-login-bg.webp";
import {CommonInput} from "@components/common-components/input";
import {notification} from "@utils/notifications";
import {LoadingOutlined} from "@ant-design/icons";
import ConfirmationModel from "./confirmationModel";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import {CommonSelect} from "@commonComponents/select";

const Setting = observer(() => {
  const {
    user: {loadExchangeRateData, updateExchangeAmountData, getUserInfo, loadingExchangeRate},
    setting: {
      getLoadingTermsAndTermsAndCondition,
      loadingRulesAndRegulations,
      getLoadingPrivacyPolicy,
      onLoadRuleRegulation,
      onUpdatePrivacyPolicy,
      onUpdateTermsAndcondition,
      loadTermsAndCondition,
      loadRulesRegulation,
      loadPrivacyPolicy,
      isLoadingForPrvacyPolicy,
      isLoadingTermsAndCondition,
      updateDefaultLoginPage,
      onUpdateBetSizes,
      getLoadingBetSizes,
      loadBetSizeUrl,
      loadDefaultSettings,
      getDefaultSettings,
      isLoadingChangeLoginPage,
      loadingGetDefaultBetSizes,
      loadingRulesRegulation,
      loadSportsBookGame,
      loadingSportsBook,
      loadCasinoGames,
      loadingCasinoGame,
      loadEuropeanCasino,
      europeanCasinoLoading,
      onUpdateSetting,
      loadSettings,
      getSettingCricket,
    },
  } = useStore(null);

  const [acitveLoginBgImg, setAcitveLoginBgImg] =
    useState("");
  const [activeLoginPageLoading, setActiveLoginPageLoading] = useState("");
  const [content, setContent] = useState("");
  const [betSizeData, setBetSizeData] = useState(null);
  const [exchangeData, setExchangeData] = useState(null);
  const [contentTerms, setContentTerms] = useState("");
  const [rulesRegulation, setRulesRegulation] = useState("");
  const [openConfirmationModel, setOpenConfirmationModel] = useState(false)
  const [isSportBook, setIsSportBook] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0)
  const [europeanCasino, setEuropeanCasino] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [editorState3, setEditorState3] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const editorRef = useRef(null);
  const termsRef = useRef(null);
  const ruleregRef = useRef(null);

  useEffect(() => {
    if (!getDefaultSettings) {
      loadDefaultSettings();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (getDefaultSettings?.length > 0) {
      setAcitveLoginBgImg(getDefaultSettings[0]?.defaultLoginPage)
    }
  }, [getDefaultSettings])

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorRef.current.getEditorState().getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setContent(htmlContent);
  };
  const handleTermsEditorStateChange = (editorState: EditorState) => {
    setEditorState2(editorState);
    const contentState = termsRef.current.getEditorState().getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setContentTerms(htmlContent);
  };
  const handleRulesRagulationEditor = (editorState: EditorState) => {
    setEditorState3(editorState);
    const contentState = ruleregRef.current.getEditorState().getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setRulesRegulation(htmlContent);
  };

  const changeDefaultThemeCard = useMemo(
    () => (
      <div className={style.changeDefaultThemeContainer}>
        <TitleBarUpdated
          title={CAP_CHANGE_DEFAULT_THEME}
          className={style.titleBar1}
        />
        <div className={style.changeDefaultThemeCard}>
          <ToggleTheme isChangeTheme={true}/>
        </div>
      </div>
    ),
    []
  );
  const changeDefaultLoginPageFunc = async (loginPage) => {
    setActiveLoginPageLoading(loginPage);
    const payload = {
      _id: getDefaultSettings[0]?._id,
      defaultLoginPage: loginPage,
    };
    await updateDefaultLoginPage(payload).then((res) => {
      if (res?.success) {
        setAcitveLoginBgImg(loginPage);
        loadDefaultSettings()
      }
    });
  };

  const changeDefaultLoginPage = useMemo(
    () => (
      <div className={style.changeDefaultLoginPageContainer}>
        <TitleBarUpdated
          title={CAP_CHANGE_DEFAULT_LOGIN}
          className={style.titleBar1}
        />
        <div className={style.changeDefaultLoginPageCard}>
          <Row gutter={5}>
            <Col className={style.defaultLoginPageCol} xs={8}>
              <div
                className={`${
                  (acitveLoginBgImg === LOWER_LOGIN_PAGE_ONE &&
                    style.cardImgActive) ||
                  style.cardImg
                }`}
                onClick={() => {
                  changeDefaultLoginPageFunc(LOWER_LOGIN_PAGE_ONE);
                }}
              >
                {((activeLoginPageLoading === LOWER_LOGIN_PAGE_ONE) &&
                  isLoadingChangeLoginPage && <Spin/>) || (
                  <img src={loginBgOne} alt="login-page"/>
                )}
              </div>
            </Col>
            <Col className={style.defaultLoginPageCol} xs={8}>
              <div
                className={`${
                  (acitveLoginBgImg === LOWER_LOGIN_PAGE_THREE &&
                    style.cardImgActive) ||
                  style.cardImg
                }`}
                onClick={() => {
                  changeDefaultLoginPageFunc(LOWER_LOGIN_PAGE_THREE);
                }}
              >
                {(activeLoginPageLoading === LOWER_LOGIN_PAGE_THREE &&
                  isLoadingChangeLoginPage && <Spin/>) || (
                  <img src={loginBgThree} alt="login-page"/>
                )}
              </div>
            </Col>
            <Col className={style.defaultLoginPageCol} xs={8}>
              <div
                className={`${
                  (acitveLoginBgImg === LOWER_LOGIN_PAGE_TWO &&
                    style.cardImgActive) ||
                  style.cardImg
                }`}
                onClick={() => {
                  changeDefaultLoginPageFunc(LOWER_LOGIN_PAGE_TWO);
                }}
              >
                {(activeLoginPageLoading === LOWER_LOGIN_PAGE_TWO &&
                  isLoadingChangeLoginPage && <Spin/>) || (
                  <img src={loginBgTwo} alt="login-page"/>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    ),
    [acitveLoginBgImg, isLoadingChangeLoginPage]
  );
  const handleGetDefaultBetSizes = async () => {
    const res = await loadBetSizeUrl();
    if (res?.success) {
      const result = res?.results?.map((item) => {
        return {...item, maxAmount: item?.maxAmount?.toString()};
      });
      setBetSizeData(result);
    }
  };

  const handleLoadExchangeRateData = async () => {
    const res = await loadExchangeRateData();
    if (res?.success) {
      const updateFilterData = res?.results?.map((item) => {
        return {
          currency: item?.currency,
          exchangeAmount: item?.exchangeAmount,
          _id: item?._id,
        };
      });
      setExchangeData(updateFilterData);
    }
  };

  const handleSubmitForm = async () => {
    const findvalue = betSizeData?.find((item) => Number(item?.maxAmount) <= 0);
    if (findvalue?._id) {
      notification.error(" Against All Game value should be greater then zero");
      return;
    } else {
      const data = betSizeData?.map((item) => {
        return {
          _id: item?._id,
          maxAmount: Number(item?.maxAmount),
          minAmount: Number(item?.minAmount),
          ExpAmount: Number(item?.ExpAmount)
        };
      });
      const payload = {betLimits: data};
      const res = await onUpdateBetSizes(payload);
      if (res?.success) {
        handleGetDefaultBetSizes();
      }
    }
  };
  const handleUpdateExchangeData = async () => {
    const findvalue = exchangeData?.find(
      (item) => Number(item?.exchangeAmount) <= 0
    );
    if (findvalue?._id) {
      notification.error("Every Currency value Should be Greater Then zero");
      return;
    } else {
      const data = exchangeData?.map((item) => {
        return {
          _id: item?._id,
          exchangeAmount: Number(item?.exchangeAmount),
          currency: item?.currency,
        };
      });
      const payload = {exchangeRates: data};
      const res = await updateExchangeAmountData(payload);
      if (res?.success) {
        handleLoadExchangeRateData();
      }
    }
  };
  const handleTermAndConditiion = async () => {
    const payload = {termAndConditionsContent: contentTerms};
    await onUpdateTermsAndcondition(payload);
  };
  const handleRuleRegulation = async () => {
    const payload = {rules: rulesRegulation}; //backend key requeired
    await onLoadRuleRegulation(payload);
  };

  const handleChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["maxAmount"] = e?.target?.value;
    }
    setBetSizeData(tempBetSize);
  };

  const handleMinChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["minAmount"] = e?.target?.value;
    }
    setBetSizeData(tempBetSize);
  };

  const handleExpChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["ExpAmount"] = e?.target?.value;
    }
    setBetSizeData(tempBetSize);
  };

  const handleExchangeAmountChange = (e, id) => {
    const tempBetSize = [...exchangeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["exchangeAmount"] = e?.target?.value;
    }
    setBetSizeData(tempBetSize);
  };
  const handlePrivacy = async () => {
    const payload = {privacyPolicyContent: content};
    await onUpdatePrivacyPolicy(payload);
  };
  const handleSportBook = async () => {
    const res = await loadSportsBookGame()
    if (res?.success) setOpenConfirmationModel(false)
  }
  const handleCasinoGame = async () => {
    const res = await loadCasinoGames()
    if (res?.success) setOpenConfirmationModel(false)
  }

  const handleEuropeanCasino = async () => {
    const res = await loadEuropeanCasino()
    if (res?.success) setOpenConfirmationModel(false)
  }
  const tab1Data = () => {
    return (
      <div className={style.backgroundColrThemeSetting}>
        <Row gutter={10} style={{gap: '40px'}}>
          <Col xxl={10} xl={10} lg={12} md={14} sm={16} xs={24}>
            {changeDefaultThemeCard}
          </Col>
          <Col xxl={10} xl={10} lg={12} md={14} sm={16} xs={24}>
            {changeDefaultLoginPage}
          </Col>
        </Row>
      </div>
    );
  };
  const tab2Data = () => {
    return getLoadingPrivacyPolicy ? (
      <div style={{width: '100%'}}>
        <Spin className={style.antIconClass} size="large"/>{" "}
      </div>
    ) : (
      <>
        <div className={style.marginTopClass}/>
        <TitleBarUpdated title={CAP_ChANGE_PRIVACY}/>
        <div className={style.wrappercontent}>
          <Editor
            ref={editorRef}
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            wrapperClassName={style.editorwrapper}
            editorClassName={style.editocontent}

          />
        </div>
        <div className={style.marginTopClassOne}>
          <CustomButton
            title={CAP_UPDATE}
            customClass={style.btnStyle}
            className={style.marginTopClass}
            loading={isLoadingForPrvacyPolicy}
            disabled={isLoadingForPrvacyPolicy}
            onClick={() => {
              handlePrivacy();
            }}
          /></div>
      </>
    );
  };
  const tab3Data = () => {
    return getLoadingTermsAndTermsAndCondition ? (
      <div style={{width: '100%'}}>
        <Spin className={style.antIconClass} size="large"/>{" "}
      </div>
    ) : (
      <>
        <div className={style.marginTopClass}/>
        <>
          <TitleBarUpdated
            title={CAP_CHANGE_TERMS_AND_CONDITION}
            className={style.titleBar1}
          />
          <div className={style.wrappercontent}>
            <Editor
              ref={termsRef}
              editorState={editorState2}
              onEditorStateChange={handleTermsEditorStateChange}
              wrapperClassName={style.editorwrapper}
              editorClassName={style.editocontent}
            />
          </div>
          <div className={style.marginTopClassOne}>
            <CustomButton
              className={style.marginTopClass}
              title={CAP_UPDATE}
              customClass={style.btnStyle}
              loading={isLoadingTermsAndCondition}
              disabled={isLoadingTermsAndCondition}
              onClick={() => {
                handleTermAndConditiion();
              }}
            /></div>
        </>
      </>
    );
  };
  const tab4Data = () => {
    return loadingGetDefaultBetSizes ? <div style={{width: '100%'}}>
      <Spin className={style.antIconClass} size="large"/>{" "}
    </div> : betSizeData?.length ? (
      <div className={style.formStyleBetSizes}>
        <TitleBarUpdated
          title='Change Min - Max Bet Sizes'
          // className={style.titleBar1}
        />
        <div style={{margin: '10px 0px'}}>
          <h1 className={style.MaxHeadingStyle}></h1>

          {betSizeData?.map((item, index) => {
            return (
              <div key={index} className={style.gapClass32}>
                <label className={style.widthClass}>
                  <span className={style.staricColor}>*</span>
                  {item?.name}
                </label>
                <div className={style.widthpercentage}>
                  <Tooltip title="Minimum Amount">
                    <div>
                      <CommonInput
                        inputType={LOWER_NUMBER}
                        value={item?.minAmount}
                        onChange={(e) => {
                          handleMinChange(e, item?._id);
                        }}
                      />
                    </div>
                  </Tooltip>

                  <Tooltip title="Maximum Amount">
                    <div>
                      <CommonInput
                        inputType={LOWER_NUMBER}
                        value={item?.maxAmount}
                        onChange={(e) => {
                          handleChange(e, item?._id);
                        }}
                      />
                    </div>
                  </Tooltip>

                  <Tooltip title="Exp Amount">
                    <div>
                      <CommonInput
                        inputType={LOWER_NUMBER}
                        value={item?.ExpAmount}
                        onChange={(e) => {
                          handleExpChange(e, item?._id);
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
        <CustomButton
          className={style.submitBtn_2}
          onClick={() => {
            handleSubmitForm();
          }}
          title={CAP_SUBMIT}
          customClass={style.btnStyle}
          loading={getLoadingBetSizes}
          disabled={getLoadingBetSizes}
        />
      </div>
    ) : (
      <div className={style.noRecord}>{DATA_NOT_FOUND}</div>
    );
  };
  const tab5Data = () => {
    return loadingExchangeRate ? <div style={{width: '100%'}}>
      <Spin className={style.antIconClass} size="large"/>{" "}
    </div> : exchangeData?.length ? (
      <div className={style.formStyleForExchangeAmount}>
        <TitleBarUpdated title={CAP_UPDATE_CURRENCY}/>
        <div style={{margin: '10px 0px'}}>
          {exchangeData?.map((item, index) => {
            return (
              <div key={index} className={style.gapClass32}>
                <label className={style.widthClass}>
                  <span className={style.staricColor}>*</span>
                  {item?.currency}
                </label>
                <div className={style.widthpercentage}>
                  <CommonInput
                    inputType={LOWER_NUMBER}
                    value={item?.exchangeAmount}
                    onChange={(e) => {
                      handleExchangeAmountChange(e, item?._id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <CustomButton
          className={style.submitBtn_2}
          onClick={() => {
            handleUpdateExchangeData();
          }}
          title={CAP_SUBMIT}
          customClass={style.btnStyle}
          loading={getLoadingBetSizes}
          disabled={getLoadingBetSizes}
        />
      </div>
    ) : (
      <div className={style.noRecord}>{DATA_NOT_FOUND}</div>
    );
  };
  const tab6Data = () => {
    return loadingRulesRegulation ? (
      <div style={{width: '100%'}}>
        <Spin className={style.antIconClass} size="large"/>{" "}
      </div>
    ) : (
      <>
        <div className={style.marginTopClass}/>
        <>
          <TitleBarUpdated
            title={"Rules and Regulation"}
            className={style.titleBar1}
          />
          <div className={style.wrappercontent}>
            <Editor
              ref={ruleregRef}
              editorState={editorState3}
              onEditorStateChange={handleRulesRagulationEditor}//new
              wrapperClassName={style.editorwrapper}
              editorClassName={style.editocontent}
            />
          </div>
          <div className={style.marginTopClassOne}>
            <CustomButton
              className={style.marginTopClass}
              title={CAP_UPDATE}
              customClass={style.btnStyle}
              loading={loadingRulesAndRegulations}
              disabled={loadingRulesAndRegulations}
              onClick={() => {
                handleRuleRegulation();
              }}
            />
          </div>
        </>
      </>
    );
  };
  const tab7Data = () => {
    return <>
      <TitleBarUpdated title={'Third Party APIS'}/>
      <div className={style.thirdPartyAPi}>
        <CustomButton title="Sports Book" onClick={() => {
          setOpenConfirmationModel(true);
          setIsSportBook(true)
        }}/>
        <CustomButton title="Asian Casino" onClick={() => {
          setOpenConfirmationModel(true);
          setIsSportBook(false)
        }}/>
        <CustomButton title="European Casino" onClick={() => {
          setOpenConfirmationModel(true);
          setEuropeanCasino(true)
        }}/>
      </div>
    </>
  }

  const cricketScorecardOptions = [
    {
      value: 'SCORE',
      label: 'Score(103.76.123.249)',
    }, {
      value: 'SESSION',
      label: 'Session Provider(142.93.36.1)',
    }
  ]

  const handleChangeCricketScorecard = async (data) => {
    console.log('handleChangeCricketScorecard', data)
    const payload = {
      kind: 'UPDATE_CRICKET_SCORECARD',
      settingKey: 'CRICKET_SCORECARD_SOURCE',
      settingValue: data,
    }
    const res = await onUpdateSetting(payload)
    const loadSettingPayload = {
      kind: 'GET_CRICKET_SCORECARD',
      settingKey: 'CRICKET_SCORECARD_SOURCE',
    }
    await loadSettings(loadSettingPayload)
  }

  const tab8Data = () => {
    return <>
      <TitleBarUpdated title={'Source of Cricket Scorecard'}/>
      <div className={style.thirdPartyAPi}>
        <Select className={style.cricketScoreSelect} options={cricketScorecardOptions}
                onSelect={handleChangeCricketScorecard} value={getSettingCricket?.settingValue}/>
      </div>
    </>
  }
  // const settingTabs: TabsProps["items"] = [
  //   {
  //     key: NUM_STR_1,
  //     label: CAP_THEME_SETTing,
  //     children: tab1Data(),
  //   },
  //   {
  //     key: NUM_STR_2,
  //     label: CAP_ChANGE_PRIVACY,
  //     children: tab2Data(),
  //   },
  //   {
  //     key: NUM_STR_3,
  //     label: CAP_TERMS_AND_CONDITIONS_CHANGE,
  //     children: tab3Data(),
  //   },
  //   {
  //     key: NUM_STR_4,
  //     label: CAP_UPDATE_BETSIZE,
  //     children: tab4Data(),
  //   },
  //   {
  //     key: NUM_STR_5,
  //     label: CAP_UPDATE_CURRENCY,
  //     children: tab5Data(),
  //   },
  //   {
  //     key: '6',
  //     label: "Rules and Regulations",
  //     children: tab6Data(),
  //   },
  //   {
  //     key: '7',
  //     label: "Third Party Api",
  //     children: tab7Data(),
  //   }
  // ];
  const settingBtns = [
    {
      key: NUM_STR_1,
      label: CAP_THEME_SETTing,
      children: tab1Data(),
    },
    {
      key: NUM_STR_2,
      label: CAP_ChANGE_PRIVACY,
      children: tab2Data(),
    },
    {
      key: NUM_STR_3,
      label: CAP_TERMS_AND_CONDITIONS_CHANGE,
      children: tab3Data(),
    },
    {
      key: NUM_STR_4,
      label: CAP_UPDATE_BETSIZE,
      children: tab4Data(),
    },
    {
      key: NUM_STR_5,
      label: CAP_UPDATE_CURRENCY,
      children: tab5Data(),
    },
    {
      key: '6',
      label: "Rules and Regulations",
      children: tab6Data(),
    },
    {
      key: '7',
      label: "Third Party Api",
      children: tab7Data(),
    },
    {
      key: '8',
      label: "Cricket Scorecard",
      children: tab8Data(),
    }
  ];
  const handleRenderData = (ind) => {
    return settingBtns[ind]?.children;
  }

  const onChange = async (key: String) => {
    if (key === NUM_STR_2) {
      const res = await loadPrivacyPolicy();
      if (res?.success) {
        const blocksFromHtml = convertFromHTML(
          res?.results?.privacyPolicyContent
        );
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
        editorRef.current.focusEditor();
      }
    } else if (key === NUM_STR_3) {
      const res = await loadTermsAndCondition();
      if (res?.success) {
        const blocksFromHtml = convertFromHTML(
          res?.results?.termAndConditionsContent
        );
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setEditorState2(EditorState.createWithContent(contentState));
        termsRef.current.focusEditor();
      }
    } else if (key === NUM_STR_4) {
      handleGetDefaultBetSizes();
    } else if (key === NUM_STR_5) {
      handleLoadExchangeRateData();
    } else if (key === '6') {
      const res = await loadRulesRegulation();// related aoi call
      if (res?.success) {
        const blocksFromHtml = convertFromHTML(
          res?.results?.rules
        );
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setEditorState3(EditorState.createWithContent(contentState));
        ruleregRef.current.focusEditor();
      }
    } else if (key === '8') {
      const payload = {
        kind: 'GET_CRICKET_SCORECARD',
        settingKey: 'CRICKET_SCORECARD_SOURCE',
      }
      await loadSettings(payload)
    }
  }

  return (
    <div className={style.settingPageContainer}>
      <>
        <Row gutter={20}>
          {getUserInfo?.role === NUM_STR_0_ROLE && (
            <div className={style.allTabsWrraper}>
              {settingBtns?.map((item, index) => {
                return <div className={index === activeBtn ? style.cBtn : style.deActiveCBtn} onClick={() => {
                  onChange(item?.key);
                  setActiveBtn(index);
                }}>{item?.label}</div>
              })}
              {/* <Tabs
              className={style.tabsWrraper}
              defaultActiveKey={NUM_STR_1}
              items={settingTabs}
              onChange={onChange}
            /> */}
            </div>)}
        </Row>
        {getUserInfo?.role === NUM_STR_0_ROLE ? <Row style={{marginTop: 15}} gutter={20}>
          {handleRenderData(activeBtn)}
        </Row> : ''}
      </>
      <ConfirmationModel open={openConfirmationModel} setOpen={setOpenConfirmationModel}
                         handleSubmit={europeanCasino ? handleEuropeanCasino : isSportBook ? handleSportBook : handleCasinoGame}
                         loading={europeanCasino ? europeanCasinoLoading : isSportBook ? loadingSportsBook : loadingCasinoGame}/>
    </div>
  );
});

export default memo(Setting);
