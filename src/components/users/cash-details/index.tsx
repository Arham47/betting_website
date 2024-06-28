import { observer } from "mobx-react";
import {useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import { useStore } from "@stores/root-store";
import { useTheme } from "@utils/hooks/useTheme";
import {
  CAP_AMOUNT,
  CAP_CREDIT,
  LOWER_IS_REQUIRED,
  LOWER_NUMBER,
  LOWER_TEXT,
  CAP_DESCRIPTION,
  CASH_PAYMENT,
  CAP_RS,
  CAP_CASH,
  CAP_SUBMIT,
  CAP_DEPOSITE_CASH,
  CAP_WITHDRAW_CASH,
  LOWER_SUBMIT,
  CAP_WITHDRAW,
  LABEL_COL,
  WRAPPER_COL,
  NUM_STR_0,
  LOWER_WITHDRAW,
  LOWER_DEPOSITE,
  CAMEL_AMOUNT_IN_PKR,
  CAP_DEPOSITE,
} from "@utils/const";
import { Col, Form, Modal, Row, Tabs } from "antd";
import CustomButton from "@components/common-components/custom-button";
import type { TabsProps } from "antd";
import CashDataTable from "./cashDataTable";
import { CommonInput } from "@components/common-components/input";
import CreditDataTable from "./creditDataTable";
import { useParams } from "react-router-dom";
import {
  ADD_CASH_DEPOSITE,
  ADD_USER_CREDIT,
  WITHDRAW_CASH_DEPOSITE,
  WITHDRAW_USER_CREDIT,
} from "../const";
import { useNavigate } from "react-router-dom";
import { constRoute } from "@utils/route";
import TitleBarUpdated from "../common-components/title-bar-updated";
import SupportTeamPopup from "@components/support-team-popup";

export enum InputSize {
  Small,
  Medium,
  Large,
}

const CashDetails = observer(() => {
  const { id } = useParams();
  const [tabKeys, setTabKeys] = useState("1");
  const [depositeForm] = Form.useForm();
  const [withdrawForm] = Form.useForm();
  const [cashDescription, setCashDescription] = useState("");
  const [creditDescription, setCreditDescription] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [cashWithdrawDescription, setCashWithDrawDescription] = useState("");
  const [creditWithDrawDescription, setCreditWithDrawDescription] =
    useState("");
  const [withdrawAmountError, setWithDrawAmountError] = useState(false);
  const [userCurrencyData, setUserCurrencyData] = useState(null)
  const [withDrawAmount, setWithDrawAmount] = useState("");
  const [cashAmountPkr, setCashAmountPkr] = useState(0);
  const [withDrawAmountPkr, setWithDrawAmountPkr] = useState(0);
  const [singleUserData, setSingleUserData] = useState(null)
  const [cashType, setCashType] = useState('Cash')
  const [showModal, setShowModal] = useState(null)
  const navigate = useNavigate();
const currency =  localStorage.getItem('baseCurrency')
const theme = useTheme();
  const {
    user: {
      userCashCreditOperations,
      loadingCashDepost,
      loadingWithDraw,
      loadSingleUser,
      getSingleUser,
      getLoadAllDepositData,
      getUserInfo,
      loadGetAllDeposit,
      getUserCashDepositeData,
      getUserAllCreditData,
      loadingGetCashCredit,
      loadExchangeRateData,
      // loadAllDepositStatusData,
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  let userId = getSingleUser?.userId;
  let userRole = getSingleUser?.role;
  const handleLoadExcahngeRate = async () => {
    const res = await loadExchangeRateData();
    if (res?.success) {
      const userCurrency = res?.results?.find((item) => item?.currency?.toLowerCase()===currency?.toLowerCase());
      setUserCurrencyData(userCurrency);
    }
  };
  useEffect(()=>{
if(cashAmount){
  setCashAmountPkr(Number(cashAmount)*userCurrencyData?.exchangeAmount)
} else if(creditAmount){
  setCashAmountPkr(Number(creditAmount)*userCurrencyData?.exchangeAmount)
}
if(withDrawAmount){
  setWithDrawAmountPkr(Number(withDrawAmount)*userCurrencyData?.exchangeAmount)
}
  }, [cashAmount, creditAmount, withDrawAmount, userCurrencyData?.exchangeAmount])
  useEffect(()=>{
    handleLoadExcahngeRate()
  }, [])
  const getAllDepositsData = async(userid)=>{
    const userId = Number(id)
       await loadGetAllDeposit(userid)
  }
  useEffect(() => {
    const data = { id: id };
    
    id &&
        loadSingleUser(data).then((res) => {
          if (res?.success) {
            userRole = res?.results?.role;
            userId = res?.results?.userId;
            setSingleUserData(res?.results)
           getAllDepositsData(res?.results?.userId);
          }
        });
  }, [id, tabKeys]);

  // useEffect(()=>{
  //   if(loadAllDepositStatusData==400){
  //     setShowModal(true)
  //   }

  // },[id,tabKeys
  //   // loadAllDepositStatusData
  // ])
  const tab1Data = useMemo(
    () => (
      <>
       <div className={style.userNameClass} > {getSingleUser?.userName}</div>
        <CashDataTable
          loading={loadingGetCashCredit}
          tableData={getLoadAllDepositData}
        />
      </>
    ),
    [
      getSingleUser,
      tabKeys,
      getUserAllCreditData,
      getUserCashDepositeData,
      loadingGetCashCredit,
      getLoadAllDepositData,
    ]
  );
  const tab2Data = useMemo(
    () => (
      <>
        <div className={style.userNameClass}> {getSingleUser?.userName}</div>
        <CreditDataTable
          loading={loadingGetCashCredit}
          tableData = {getLoadAllDepositData}
        />
      </>
    ),
    [
      getSingleUser,
      tabKeys,
      getUserAllCreditData,
      getUserCashDepositeData,
      loadingGetCashCredit,
    ]
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `${CAP_CASH}`,
      children: tab1Data,
    },
    {
      key: "2",
      label: `${CAP_CREDIT}`,
      children: tab2Data,
    },
  ];

  const onChange = (key: string) => {
    setTabKeys(key);
    key === '1' ? setCashType(CAP_CASH) : setCashType(CAP_CREDIT) 
  };

  const onDepositeFormSubmit = async (values) => {
    if (!creditAmount) {
      setAmountError(true);
      return;
    } else setAmountError(false);
    if (!creditAmount || !creditDescription) return;
    const payload = {
      amount: Number(cashAmountPkr) || Number(creditAmount) || 0,
      userId: Number(userId) || getSingleUser?.userId,
      description: creditDescription,
    };

    await userCashCreditOperations(payload, ADD_USER_CREDIT).then((res) => {
      if (res?.success) {
        const userID = String(userId) || String(getSingleUser?.userId);
        depositeForm.resetFields();
        // localStorage.setItem('type', 'Credit')
        navigate(`${constRoute?.ledger}/${String(id)}?type=Credit`);
      }
    });
  };
  const onDepositCashSubmit = async (values) => {
    if (!cashAmount) {
      setAmountError(true);
    } else setAmountError(false);
    if (!cashAmount || !cashDescription) return;
    const payload = {
      amount: Number(cashAmountPkr) || Number(cashAmount) || 0,
      userId: Number(userId) || getSingleUser?.userId,
      description: cashDescription,
    };
    await userCashCreditOperations(payload, ADD_CASH_DEPOSITE).then((res) => {
      if (res?.success) {
        const userID = String(userId) || String(getSingleUser?.userId);
        depositeForm.resetFields();
        // localStorage.setItem('type', 'Cash')
        navigate(`${constRoute?.ledger}/${String(id)}?type=Cash`);
      }
    });
  };

  const onWithdrawFormSubmit = async (values) => {
    if (!withDrawAmount) {
      setWithDrawAmountError(true);
    } else setWithDrawAmountError(false);
    if (!withDrawAmount || !cashWithdrawDescription) return;
    const payload = {
      amount: Number(withDrawAmountPkr) || Number(withDrawAmount) || 0,
      userId: Number(userId) || getSingleUser?.userId,
      description: cashWithdrawDescription,
    };
    await userCashCreditOperations(payload, WITHDRAW_CASH_DEPOSITE, true).then(
      (res) => {
        if (res?.success) {
          const userID = String(userId) || String(getSingleUser?.userId);
          withdrawForm.resetFields();
          // localStorage.setItem('type', 'Cash')
          navigate(`${constRoute?.ledger}/${String(id)}?type=Cash`);
        }
      }
    );
  };
  const onCreditWithdrawFormSubmit = async (values) => {
    if (!withDrawAmount) {
      setWithDrawAmountError(true);
    } else setWithDrawAmountError(false);
    if (!withDrawAmount.toString() || !creditWithDrawDescription) return;
    const payload = {
      amount: Number(withDrawAmountPkr) ||  Number(withDrawAmount) || 0,
      userId: Number(userId) || getSingleUser?.userId,
      description: creditWithDrawDescription,
    };
    await userCashCreditOperations(payload, WITHDRAW_USER_CREDIT, true).then(
      (res) => {
        if (res?.message?.includes("successful")) {
          const userID = String(userId) || String(getSingleUser?.userId);
          withdrawForm.resetFields();
          // localStorage.setItem('type', 'Credit')
          navigate(`${constRoute?.ledger}/${String(id)}?type=Credit`);
        }
      }
    );
  };
  useEffect(() => {
    setCreditAmount("");
    setCashAmount("");
    setWithDrawAmount("");
    setCashAmountPkr(0)
    setWithDrawAmountPkr(0)
    setAmountError(false);
    setWithDrawAmountError(false);
  }, [tabKeys]);
  const getDefaultValue = useCallback(() => {
    if (tabKeys === "1") {
      if (getSingleUser?.role === "5") {
        setCashDescription(
          `${CAP_CASH} ${LOWER_DEPOSITE} in ${singleUserData?.userName}`
        );
        setCashWithDrawDescription(
          `${CAP_CASH} ${LOWER_WITHDRAW} from ${singleUserData?.userName}`
        );
        return {
          deposite: `${CAP_CASH} ${LOWER_DEPOSITE} in ${singleUserData?.userName}`,
          withdraw: `${CAP_CASH} ${LOWER_WITHDRAW} from ${singleUserData?.userName}`,
        };
      } else {
        setCashDescription(
          `${CASH_PAYMENT} to ${
            singleUserData?.userName
          } from ${getUserInfo?.userName}`
        );
        setCashWithDrawDescription( `${CAP_CASH} ${LOWER_WITHDRAW} to ${
          getUserInfo?.userName
        } from ${singleUserData?.userName}`)
        return {
          forMasterPayment: `${CASH_PAYMENT} to ${
            singleUserData?.userName
          } from ${getUserInfo?.userName}`,
        };
      }
    } else {
      setCreditDescription(
        `${CAP_CREDIT} Issued to ${singleUserData?.userName}`
      );
      setCreditWithDrawDescription(
        `${CAP_CREDIT} ${CAP_WITHDRAW} from ${singleUserData?.userName}`
      );
      return {
        deposite: `${CAP_CREDIT} Issued to ${singleUserData?.userName}`,
        withdraw: `${CAP_CREDIT} ${CAP_WITHDRAW} from ${singleUserData?.userName}`,
      };
    }
  }, [
    tabKeys,
    id,
    getSingleUser,
    getUserAllCreditData,
    getUserCashDepositeData,
    userId,
    getUserInfo,
    singleUserData
  ]);
useEffect(()=>{
  getDefaultValue()
}, [getSingleUser, tabKeys, id, getDefaultValue, userId, getUserInfo, singleUserData])
console.log('loadingCashDepost', loadingCashDepost)
  return (
    
    <div className={style.mainCashWrapper}>
      <div className={style.cashContainer}>
        <div>
        {/* {showModal ? <SupportTeamPopup/> : " "}          */}
          <Row>
            <Col span={24}>
              <div className={style.tabWrapper}>
                <Tabs
                  style={{ width: "100%" }}
                  defaultActiveKey="1"
                  items={items}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Row  className={style.backgroundColorChange}>
        <Col
          // span={ 16}
          className={style.depositeCashWrapper}
        >
          <div className={style.depositeCashTable}>
            <TitleBarUpdated
              className={style.depositeTitleBar}
              title={`${CAP_DEPOSITE} ${cashType} in ${getSingleUser?.userName} Account`}
            />
            <div className={style.depositForm}>
              {tabKeys === "1" ? (
                <Form
                  onFinish={onDepositCashSubmit}
                  labelCol={LABEL_COL}
                  wrapperCol={WRAPPER_COL}
                  className={style.depositeCashForm}
                >
                  <div className={style.gapClass32}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_DESCRIPTION}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        inputType={LOWER_TEXT}
                        value={cashDescription}
                        size={InputSize.Small}
                        onChange={(e) => {
                          setCashDescription(e?.target?.value);
                        }}
                      />
                      {!cashDescription && (
                        <div className={style.colorRed}>
                          {CAP_DESCRIPTION + " " + LOWER_IS_REQUIRED}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.gapClass35}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_AMOUNT}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        label={CAP_RS}
                        isRsClass={style.labelAmount}
                        inputType={LOWER_NUMBER}
                        placeholder={NUM_STR_0}
                        size={InputSize.Small}
                        value={cashAmount}
                        className={style.amountInput}
                        onChange={(e) => setCashAmount(e?.target?.value)}
                      />
                      {amountError && (
                        <div className={style.colorRed}>{CAP_AMOUNT + " " + LOWER_IS_REQUIRED}</div>
                      )}
                      <div>
                        <b>
                        {currency?.toLowerCase()?.includes('pkr')? '':cashAmount ?`${CAMEL_AMOUNT_IN_PKR} ${cashAmountPkr}` : ''}
                        </b> </div>
                    </div>
                  </div>
                  <CustomButton loading={loadingCashDepost} disabled={loadingCashDepost} htmlType={LOWER_SUBMIT} title={CAP_SUBMIT} className={style.colorGreen}/>
                </Form>
              ) : (
                <Form
                  onFinish={onDepositeFormSubmit}
                  labelCol={LABEL_COL}
                  wrapperCol={WRAPPER_COL}
                  className={style.depositeCashForm}
                >
                  <div className={style.gapClass32}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_DESCRIPTION}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        inputType={LOWER_TEXT}
                        size={InputSize.Small}
                        value={creditDescription}
                        onChange={(e) => {
                          setCreditDescription(e?.target?.value);
                        }}
                      />
                      {!creditDescription && (
                        <div className={style.colorRed}>
                          {CAP_DESCRIPTION + " " + LOWER_IS_REQUIRED}
                        </div>
                      )}
                      
                    </div>
                  </div>
                  <div className={style.gapClass35}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_AMOUNT}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        label={CAP_RS}
                        isRsClass={style.labelAmount}
                        inputType={LOWER_NUMBER}
                        placeholder={NUM_STR_0}
                        size={InputSize.Small}
                        value={creditAmount}
                        className={style.amountInput}
                        onChange={(e) => setCreditAmount(e?.target?.value)}
                      />
                      {amountError && (
                        <div className={style.colorRed}>{CAP_AMOUNT + " " + LOWER_IS_REQUIRED}</div>
                      )}
                       <div>
                        <b>
                        {currency?.toLowerCase()?.includes('pkr')? '':creditAmount ?`${CAMEL_AMOUNT_IN_PKR} ${cashAmountPkr}` : ''}
                        </b> </div>
                    </div>
                  </div>
                  <CustomButton loading={loadingCashDepost} disabled={loadingCashDepost} htmlType={LOWER_SUBMIT} title={CAP_SUBMIT}  className={style.colorGreen}/>
                </Form>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className={style.backgroundColorChange}>
        <Col className={style.depositeCashWrapper}>
          <div className={style.depositeCashTable}>
            <TitleBarUpdated
              className={style.withdrawTitleBar}
              title={`${CAP_WITHDRAW} ${cashType} from ${getSingleUser?.userName} Account`}
            />
            <div className={style.depositForm}>
              {tabKeys === "1" ? (
                <Form
                  onFinish={onWithdrawFormSubmit}
                  labelCol={LABEL_COL}
                  wrapperCol={WRAPPER_COL}
                  className={style.depositeCashForm}
                >
                  <div className={style.gapClass32}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_DESCRIPTION}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        inputType={LOWER_TEXT}
                        size={InputSize.Small}
                        value={cashWithdrawDescription}
                        onChange={(e) => {
                          setCashWithDrawDescription(e?.target?.value);
                        }}
                      />
                      {!cashWithdrawDescription && (
                        <div className={style.colorRed}>
                          {CAP_DESCRIPTION + " " + LOWER_IS_REQUIRED}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.gapClass35}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_AMOUNT}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        label={CAP_RS}
                        size={InputSize.Small}
                        isRsClass={style.labelAmount}
                        inputType={LOWER_NUMBER}
                        value={withDrawAmount}
                        className={style.amountInput}
                        onChange={(e) => setWithDrawAmount(e?.target?.value)}
                        placeholder={NUM_STR_0}
                      />
                      {withdrawAmountError && (
                        <div className={style.colorRed}>{CAP_AMOUNT + " " + LOWER_IS_REQUIRED}</div>
                      )}
                      <div>
                        <b>
                        {currency?.toLowerCase()?.includes('pkr')? '':withDrawAmount ?`${CAMEL_AMOUNT_IN_PKR} ${withDrawAmountPkr}` : ''}
                        </b> </div>
                    </div>
                  </div>
                  <CustomButton
                    className={style.withdrawBtn}
                    htmlType={LOWER_SUBMIT}
                    title={CAP_SUBMIT}
                    loading={loadingWithDraw}
                    disabled={loadingWithDraw}
                  />
                </Form>
              ) : (
                <Form
                  onFinish={onCreditWithdrawFormSubmit}
                  labelCol={LABEL_COL}
                  wrapperCol={WRAPPER_COL}
                  className={style.depositeCashForm}
                >
                  <div className={style.gapClass32}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_DESCRIPTION}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        inputType={LOWER_TEXT}
                        size={InputSize.Small}
                        value={creditWithDrawDescription}
                        onChange={(e) => {
                          setCreditWithDrawDescription(e?.target?.value);
                        }}
                      />
                      {!creditWithDrawDescription && (
                        <div className={style.colorRed}>
                          {CAP_DESCRIPTION + " " + LOWER_IS_REQUIRED}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.gapClass35}>
                    <label>
                      <span className={style.staricColor}>*</span>
                      {CAP_AMOUNT}
                    </label>
                    <div className={style.widthpercentage}>
                      <CommonInput
                        label={CAP_RS}
                        isRsClass={style.labelAmount}
                        inputType={LOWER_NUMBER}
                        size={InputSize.Small}
                        value={withDrawAmount}
                        className={style.amountInput}
                        onChange={(e) => setWithDrawAmount(e?.target?.value)}
                        placeholder={NUM_STR_0}
                      />
                      {withdrawAmountError && (
                        <div className={style.colorRed}>{CAP_AMOUNT + " " + LOWER_IS_REQUIRED}</div>
                      )}
                      <div>
                        <b>
                        {currency?.toLowerCase()?.includes('pkr')? '': withDrawAmount ? `${CAMEL_AMOUNT_IN_PKR} ${ withDrawAmountPkr}` : ''}
                        </b> </div>
                    </div>
                  </div>
                  <CustomButton
                    className={style.withdrawBtn}
                    htmlType={LOWER_SUBMIT}
                    title={CAP_SUBMIT}
                    loading={loadingWithDraw}
                    disabled={loadingWithDraw}
                  />
                </Form>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Modal
      title={<TitleBarUpdated title="Cash Creadit Modal" />}
      className={theme + " " + style.resultModal}
      closable={false}
      footer={[]}
      width={1000}
      visible={showModal}
      // onOk={handleOk}
      onCancel={()=>{setShowModal(false)}}
      >
      <>
      <p> 1. Take screenshot and contact support team.</p>
       <p>2.Screenshot Lain ur support team say rabbta kareen</p>
      </>
     </Modal>
    </div>
  );
});
export default CashDetails;
