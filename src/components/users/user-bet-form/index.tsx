/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import { Checkbox, Col, Empty, Form, Radio, Row } from "antd";
import HeaderButtons from "@components/users/common-components/header-buttons";
import { AddBetsBtn } from "@components/users/json-data";
import {
  CAMEL_ON_BLUR,
  CAP_PASSWORD,
  CAP_SUBMIT,
  INITIAL_VALUES,
  LOWER_BASIC,
  LOWER_HORIZONTAL,
  LOWER_PASSWORD,
  CAMEL_ISACTIVE,
  LOWER_SUBMIT,
  LOWER_TEXT,
  CAP_NOTES,
  CAP_COMMISSION,
  CAP_USERDOMAIN,
  CAP_PHONE,
  CAMEL_CAN_SETTLE_PL,
  CAP_BETTING_ALLOWED,
  CAP_CURRENCY,
  CAP_MAX_BET_SIZES,
  CAP_MIN,
  LOWER_IS_REQUIRED,
  LOWER_PHONE,
  UPPER_ID,
  CAP_TYPE,
  CAP_USER_NAME,
  LOWER_TEXT_AREA,
  LOWER_USER_NAME,
  LOWER_CURRENCY,
  LOWER_NOTES,
  LOWER_COMMISSION,
  CAMEL_USERDOMAIN,
  CAMEL_USER_TYPE,
  LOWER_EMAIL,
  LOWER_CHECKED,
  CAP_CAN_SETTLE_PL,
  CAMEL_BETTING_ALLOWED,
  CAP_REFERENCE,
  LOWER_REFERENCE,
  LOWER_ONE_O_BET_DOT_COM,
  DOUBLE_DASH,
  CAP_EDIT,
  CAP_CREATE_NEW,
  CAP_USER,
  LOWER_NUMBER,
  CAMEL_DOWN_LINE_SHARE,
  CAP_SHARE,
  LOWER_SHARE,
  NUM_STR_0,
  NUM_STR_5_ROLE,
  LOWER_MUST_BE_BETWEEN,
  CAP_UPDATE,
  CAP_ACCEPT_BTN_TITLE,
  CAP_CANCEL_BTN_TITLE,
  NUM_STR_0_ROLE,
  CAP_USER_CURRENCY,
} from "@utils/const";
import { CommonInput } from "@components/common-components/input";
import CustomButton from "@components/common-components/custom-button";
import FooterLogos from "@components/footer-logos";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@stores/root-store";
import { constRoute } from "@utils/route";
import { roleNameTypeUserList, validateMessages } from "@utils/json-data";
import { CAP_DOWNLINE, NUM_85, UPPER_PKR } from "../const";
import { getUserOnRole } from "@utils/common-functions";
import { ConfirmationModal } from "@components/common-components/confirmation-modal";
import { CommonSelect } from "@components/common-components/select";
import { notification } from "@utils/notifications";
import TitleBarUpdated from "../common-components/title-bar-updated";

const UsersBetSizes = observer(() => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(null);
  const [singleUserData, setSingleUserData] = useState(null);
  const [isDownlineShare, setIsDownlineShare] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showPassWord, setShowPassword] = useState('')
  const [betSizeData, setBetSizeData] = useState([]);
  const [userCurrency, setUserCurrency] = useState([]);
  const [singleUserId, setSingleUserId] = useState(null)
  const SINGLE_USER_NAME = singleUserData?.userName || DOUBLE_DASH;

  const [userInfoData, setUserInfoData] = useState(null);
  const [loadingCreateUser, setLoadingCreateUser] = useState(false);
  const {
    user: {
      createUser,
      isLoadingCreateUser,
      getSingleUser,
      getUserInfo,
      loadAllUsers,
      updateUser,
      isLoadingUpdateUser,
      checkValidateUser,
      isLoadingCheckValidation,
      loadAllBetSizeData,
      onUpdateBetAmountData,
      loadExchangeRateData,
      loadingUpdateBetAmount,
      loadSingleUser
    },
  } = useStore(null);
  const MAX_ALLOWED_DOWNLINE_SHARE = (getUserInfo?.downLineShare || 85)-1;
  console.log('MAX_ALLOWED_DOWNLINE_SHARE', MAX_ALLOWED_DOWNLINE_SHARE)
  const handleGetAllBetSizeData = async () => {
    const userId = singleUserId;
    const res = await loadAllBetSizeData(Number(userId));
    if (res?.success) {
      console.log("results", res?.results);
      
      const result = res?.results?.map((item) => {
        return {
          ...item,
          maxAmount: item?.limit_max_amount?.toString(),
          amount: item?.amount?.toString(),
          minAmount: item?.minAmount?.toString(),
          ExpAmount: item?.ExpAmount?.toString(),
        };
      });
      setBetSizeData(result);
    }
  };
  useEffect(() => {
    if(id){
      loadSingleUserData()
    }
  },[id])

  useEffect(() => {
    if (typeof isLoadingCreateUser === 'boolean' && !isLoadingCreateUser) {
      setLoadingCreateUser(false)
      console.log('isLoadingCreateUser', isLoadingCreateUser, false)
    } else {
      console.log('isLoadingCreateUser', isLoadingCreateUser, true)
    }
  },[isLoadingCreateUser])


  const loadSingleUserData = async() => {
    const res = await loadSingleUser({id});
    if(res?.success){
      setSingleUserId(res?.results?.userId)
      setSingleUserData(res?.results)
    }
  }
  const handleLoadExcahngeRate = async () => {
    const res = await loadExchangeRateData();
    if (res?.success) {
      const userCurrencyData = res?.results?.filter((item) => {        
        if(item.currency === 'PKR') return { key: item?.currency, value: item?.currency };
      });
      userCurrencyData?.unshift({key: 'PKR', value: 'PKR'})
      setUserCurrency(userCurrencyData);
    }
  };
  useEffect(() => {
    form.setFieldValue("isActive", true);
    handleLoadExcahngeRate();
    if (singleUserId) {
      handleGetAllBetSizeData();
    }
  }, [singleUserId]);
  const onSubmit = useCallback(async (values) => {
    setLoadingCreateUser(true)
    if (id) {
      const payload = {
        role: values.userType,
        password: values?.password || "",
        userName: values?.username?.trim(),
        reference: values?.reference || "",
        phone: values?.phone || "",
        notes: values?.notes || "",
        isActive: values.isActive,
        bettingAllowed: values?.bettingAllowed,
        canSettlePL: values?.canSettlePL,
        downLineShare: values?.downLineShare,
        id: singleUserId,
      };
      const res = await updateUser(payload);
      res.success &&
      form.setFieldValue("password", '');
      setShowPassword('')
      loadAllUsers()
      // .then((res) => {
      // res?.success && navigate(constRoute.users);
      // });
    } else {
      const payloadValidation = { userName: values?.username };
      const isUserExist = await checkValidateUser(payloadValidation);
      const confirmUser = isUserExist?.errors[0]?.msg?.status === 1;
      if (!confirmUser) {
        const payload = {
          role: values.userType,
          password: values?.password,
          userName: values?.username?.trim(),
          reference: values?.reference || "",
          phone: values?.phone,
          notes: values?.notes || "",
          isActive: values.isActive,
          downLineShare: values?.downLineShare,
          commission: values?.commission,
          bettingAllowed: values?.bettingAllowed,
          canSettlePL: values?.canSettlePL,
          baseCurrency: values?.currency,
        };
        const res = await createUser(payload);
        res.success &&
        loadAllUsers().then((res) => {
        res?.success && navigate(constRoute.users);
        });
      } else {
        setOpenConfirmModal(true);
        setFormValues(values);
      }
    }
  }, [singleUserId]);

  const onConfirmCreateUser = async () => {
    const payload = {
      role: formValues?.userType,
      password: formValues?.password,
      userName: formValues?.username?.trim(),
      reference: formValues?.reference || "",
      phone: formValues?.phone,
      notes: formValues?.notes || "",
      isActive: formValues.isActive,
      downLineShare: formValues?.downLineShare,
      commission: formValues?.commission,
      bettingAllowed: formValues?.bettingAllowed,
      canSettlePL: formValues?.canSettlePL,
      baseCurrency: formValues?.currency,
    };
    const res = await createUser(payload);
    res.success &&
      loadAllUsers().then((res) => {
        res?.success && navigate(constRoute.users);
      });
  };
  const checkValueIncreasedORNot = () => {
    const isValid = betSizeData?.every(
      (item) => Number(item?.amount) <= Number(item?.limit_max_amount)
    );
    return !isValid;
  };
  const roleTypeOptions = useMemo(
    () => roleNameTypeUserList,
    [roleNameTypeUserList]
  );
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
const handleUserTypeChange = ()=>{
  if(getUserInfo?.role=='0') return '1'
  else if(getUserInfo?.role=='1') return '2'
  else if(getUserInfo?.role=='2') return '3'
  else if(getUserInfo?.role=='3') return '4'
  else if(getUserInfo?.role=='4') return '5'
}
useEffect(()=>{
  console.log('called1111111111111')
  if (!(getUserInfo?.role=='4')) {
    setIsDownlineShare(true);
  } else {
    setIsDownlineShare(false);
  }
  form.setFieldsValue({
    userType: handleUserTypeChange(),
    downLineShare: ''

  })
  // if(values?.target.value == '5')form.setFieldValue('downLineShare', '');
}, [getUserInfo])
  useEffect(() => {
    if (id) {
      setSingleUserData(getSingleUser);
      form.setFieldsValue({
        phone: getSingleUser?.phone,
        reference: getSingleUser?.reference,
        notes: getSingleUser?.notes,
        bettingAllowed: getSingleUser?.bettingAllowed,
        canSettlePL: getSingleUser?.canSettlePL,
        isActive: getSingleUser?.isActive,
        currency: getSingleUser?.baseCurrency,
        
      });

      if (!(getSingleUser?.role === NUM_STR_5_ROLE)) {
        setIsDownlineShare(true);
      } else {
        setIsDownlineShare(false);
      }
    } else {
      form.setFieldValue(LOWER_CURRENCY, UPPER_PKR);
    }
    // });
  }, [id, getSingleUser?._id, singleUserId]);

  useEffect(() => {
    setUserInfoData(getUserInfo);
  }, [getUserInfo]);

  const headerButtonUserBets = useMemo(
    () => (
      <div className={style.betsBtnMainContainer}>
        <div className={style.betsBtnMain}>
          <Col xxl={16} xl={16} lg={14} md={12} sm={12} xs={24}>
            <HeaderButtons
              className={style.addBetsizeLoginBtn}
              btnList={AddBetsBtn}
              navigateId={id || ''}
            />
          </Col>
          <Col xxl={8} xl={8} lg={10} md={12} sm={12} xs={24}>
            <h2 className={style.userName}> {userInfoData?.userName} </h2>
          </Col>
        </div>
      </div>
    ),
    [singleUserData, userInfoData, singleUserId, getSingleUser, id]
  );

  const onClickRadioBtns = useCallback((values) => {
    if (!(values?.target.value === NUM_STR_5_ROLE)) {
      setIsDownlineShare(true);
    } else {
      setIsDownlineShare(false);
    }
    if(values?.target.value == '5')form.setFieldValue('downLineShare', '');
  }, []);
  const handleUpdateBetSizeData = async () => {
    const findvalue = betSizeData?.find((item) => Number(item?.amount) <= 0);
    if (findvalue?._id) {
      notification.error("Each Match Amount Should Be Greater Then Zero ");
      return;
    }
    const betSizeUpdateData = betSizeData?.map((item) => {
      return { _id: item?._id, amount: Number(item?.amount),minAmount: Number(item?.minAmount),ExpAmount: Number(item?.ExpAmount) };
    });
    const payload = {
       betSizes: betSizeUpdateData,
       userId: singleUserId
     };
    const res = await onUpdateBetAmountData(payload);
    if (res?.success) {
      navigate(constRoute.users);
    }
  };

  const handleChangepass = (e)=>{
    setShowPassword(e?.target?.value)
  }
  const userForm = useMemo(
    () => (
      <Col
        xxl={12}
        xl={12}
        md={24}
        sm={24}
        xs={24}
        className={style.usersDiv}
      >
        <div className={style.userFormStyle}>
        <TitleBarUpdated
            
              title={`${
                (id && CAP_EDIT + " Client - " + SINGLE_USER_NAME) ||
                CAP_CREATE_NEW + " " + CAP_USER
              } `}
            />
          <Form
            form={form}
            name={LOWER_BASIC}
            initialValues={INITIAL_VALUES}
            labelCol={{ xxl: 12, lg: 12, md: 12, xs: 12 }}
            wrapperCol={{ xxl: 12, lg: 12, md: 12, xs: 12 }}
            layout={LOWER_HORIZONTAL}
            validateMessages={validateMessages}
            onFinish={onSubmit}
            className={style.userBetForm}
          >
            
           
            {id && (
              <Form.Item
                label={UPPER_ID}
                className={style.formItemStyle}
                validateTrigger={[CAMEL_ON_BLUR]}
              >
                <span className={style.editITwo}>
                  {singleUserId || DOUBLE_DASH}
                </span>
              </Form.Item>
            )}

            <Form.Item
              label={CAP_USER_NAME}
              name={LOWER_USER_NAME}
              className={style.formItemStyle}
              validateTrigger={[CAMEL_ON_BLUR]}
              rules={[
                {
                  required: id ? false : true,
                },
              ]}
            >
              {(id && (
                <span className={style.editITwo}> {SINGLE_USER_NAME} </span>
              )) || (
                <CommonInput
                  inputType={LOWER_TEXT}
                  onFocus={() =>
                    form.setFields([{ name: LOWER_EMAIL, errors: [] }])
                  }
                />
              )}
            </Form.Item>
            {id && (
              <>
                <Form.Item
                  label={CAP_TYPE}
                  className={style.formItemStyle}
                  validateTrigger={[CAMEL_ON_BLUR]}
                >
                  <span className={style.editITwo}>
                    {getUserOnRole(singleUserData?.role)?.name || DOUBLE_DASH}
                  </span>
                </Form.Item>
                <Form.Item
                  label={CAP_CURRENCY}
                  name={LOWER_CURRENCY}
                  className={style.formItemStyle}
                  validateTrigger={[CAMEL_ON_BLUR]}
                >
                  <span className={style.editITwo}>Rs. </span>
                </Form.Item>
              </>
            )}
             {id && (
              <Form.Item
                label={CAP_USER_CURRENCY}
                className={style.formItemStyle}
                validateTrigger={[CAMEL_ON_BLUR]}
              >
                <span className={style.editITwo}>
                  {singleUserData?.baseCurrency || DOUBLE_DASH}
                </span>
              </Form.Item>
            )}
            <Form.Item
              className={style.formItemStyle}
              label={CAP_PASSWORD}
              name={LOWER_PASSWORD}
              rules={[
                {
                  required: id ? false : true,
                },
              ]}
            >
              <CommonInput
                inputType={LOWER_PASSWORD}
                className={style.editITwo}
                onChange={(e)=>handleChangepass(e)}
              />
            </Form.Item> 
            {!id&&showPassWord?.length<8  ?<Form.Item className={style.passwordSuggestion} label={""}>
              <span className={style.passwordSuggestionMsg}>
                {" "}
                Password must be 8 characters.
              </span>
            </Form.Item> :showPassWord?.length<8 && showPassWord? <Form.Item className={style.passwordSuggestion} label={""}>
              <span className={style.passwordSuggestionMsg}>
                {" "}
                Password must be 8 characters.
              </span>
            </Form.Item>: ''}
            {!id && userInfoData?.role >= 0 && userInfoData?.role < 5 && (
              <Form.Item
                name={CAMEL_USER_TYPE}
                label={CAP_TYPE}
                className={style.formItemStyle}
                rules={[
                  {
                    required: true,
                    message: CAP_TYPE + " " + LOWER_IS_REQUIRED,
                  },
                ]}
              >
                <Radio.Group
                  onChange={onClickRadioBtns}
                  className={style.marginGap}
                >
                  {roleTypeOptions?.length &&
                    roleTypeOptions?.map((item, index) => {
                      if (item.role >= userInfoData?.role + 1) {
                        return (
                          <Radio key={index} value={item?.role}>
                            {item?.name}
                          </Radio>
                        );
                      }
                      return null;
                    })}
                </Radio.Group>
              </Form.Item>
            )}
             {!id && isDownlineShare && (
              <Form.Item
                label={`${CAP_DOWNLINE} ${CAP_SHARE}`}
                name={CAMEL_DOWN_LINE_SHARE}
                className={style.formItemStyle}
                rules={[
                  {
                    required: true,
                    max: Number(MAX_ALLOWED_DOWNLINE_SHARE),
                    message: `${CAP_DOWNLINE} ${LOWER_SHARE} ${LOWER_MUST_BE_BETWEEN} ${1} and ${MAX_ALLOWED_DOWNLINE_SHARE}`,
                  },
                ]}
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  min={"1"}
                  max={MAX_ALLOWED_DOWNLINE_SHARE.toString()}
                />
              </Form.Item>
            )}
            <Form.Item
              label={CAP_PHONE}
              name={LOWER_PHONE}
              className={style.formItemStyle}
              validateTrigger={[CAMEL_ON_BLUR]}
            >
              <CommonInput className={style.editITwo} inputType={LOWER_TEXT} />
            </Form.Item>
            <Form.Item
              label={CAP_REFERENCE}
              name={LOWER_REFERENCE}
              className={style.formItemStyle}
              validateTrigger={[CAMEL_ON_BLUR]}
            >
              <CommonInput inputType={LOWER_TEXT} className={style.editITwo} />
            </Form.Item>
            {!id&&<Form.Item
              label={CAP_USER_CURRENCY}
              name={LOWER_CURRENCY}
              className={style.formItemStyle}
              validateTrigger={[CAMEL_ON_BLUR]}
            >
              <CommonSelect className={style.editITwo} data={userCurrency} />
            </Form.Item>}
            <Form.Item
              label={CAP_NOTES}
              name={LOWER_NOTES}
              className={style.formItemStyle}
            >
              <CommonInput
                className={style.addBetsTextArea}
                name={LOWER_TEXT_AREA}
                inputType={LOWER_TEXT_AREA}
              />
            </Form.Item>
            {id && getUserInfo?.role !== 5 && (
              <>
                <Form.Item
                  label={CAP_COMMISSION}
                  name={LOWER_COMMISSION}
                  className={style.formItemStyle}
                  validateTrigger={[CAMEL_ON_BLUR]}
                  rules={[
                    {
                      message: CAP_MIN + " " + CAP_COMMISSION + " is 2.00",
                    },
                  ]}
                >
                  <CommonInput
                    inputType={LOWER_TEXT}
                    className={style.editITwo}
                    placeholder="2.00"
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item
                  label={CAP_USERDOMAIN}
                  name={CAMEL_USERDOMAIN}
                  className={style.formItemStyle}
                  validateTrigger={[CAMEL_ON_BLUR]}
                >
                  <CommonInput
                    inputType={LOWER_TEXT}
                    className={style.editITwo}
                    disabled={true}
                    placeholder={`1 ( ${LOWER_ONE_O_BET_DOT_COM} ) `}
                  />
                </Form.Item>

                <Form.Item
                  label={CAP_BETTING_ALLOWED}
                  name={CAMEL_BETTING_ALLOWED}
                  className={style.formItemStyle}
                  valuePropName={LOWER_CHECKED}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item
                  label={CAP_CAN_SETTLE_PL}
                  name={CAMEL_CAN_SETTLE_PL}
                  className={style.formItemStyle}
                  valuePropName={LOWER_CHECKED}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
              </>
            )}
            <Form.Item
              label={'Is Active'}
              name={CAMEL_ISACTIVE}
              className={style.formItemStyle}
              valuePropName={LOWER_CHECKED}
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <div className={style.bothSubmitBtnJustify}>
            <CustomButton
              className={style.submitBtn_one}
              customClass={style.btnStyle}
              htmlType={LOWER_SUBMIT}
              title={(id && CAP_UPDATE) || CAP_SUBMIT}
              disabled={loadingCreateUser}
              loading={
                isLoadingUpdateUser ||
                isLoadingCreateUser ||
                // loadingCreateUser ||
                isLoadingCheckValidation
              }
            />
            </div>
          </Form>
        </div>
      </Col>
    ),
    [
      singleUserData,
      isLoadingCreateUser,
      isLoadingUpdateUser,
      userInfoData,
      SINGLE_USER_NAME,
      isDownlineShare,
      userCurrency,
      showPassWord,
      singleUserId,
      getSingleUser,
      loadingCreateUser,
      getSingleUser?._id
    ]
  );
  const handleChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["amount"] = e?.target?.value?.toString();
    }
    setBetSizeData(tempBetSize);
    
  };
  // minimun amount handle 
  const minimumHandleChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["minAmount"] = e?.target?.value?.toString();
    }
    setBetSizeData(tempBetSize);
  };

   // Exp amount handle 
   const expHandleChange = (e, id) => {
    const tempBetSize = [...betSizeData];
    const findId = tempBetSize?.findIndex((item) => item?._id === id);
    if (findId > -1) {
      tempBetSize[findId]["ExpAmount"] = e?.target?.value?.toString();
    }
    setBetSizeData(tempBetSize);
  };
  const betSizesForm = useMemo(
    () => (
      <Col
        xxl={12}
        xl={12}
        lg={24}
        md={24}
        sm={24}
        xs={24}
        className={style.betSizesDiv} 
      > 
        <div className={style.formStyleBetSizes}>
          <TitleBarUpdated title={CAP_MAX_BET_SIZES} />
          <h1 style={{textAlign:"center",color:"#51a551"}}> <strong style={{color:"#9d9d9d"}}>  Add </strong>the  Actual<strong style={{color:"#9d9d9d"}}> Ammount</strong> of Min,Max and Expure <strong style={{color:"#9d9d9d"}}> Amount </strong> </h1>
          {betSizeData?.length ? (
            <div style={{marginTop:20}}>
              {betSizeData?.map((item, index) => {
                return (
                  <div>
                    <div key={index} className={style.gapClass32}>
                      <label style={{ width: "13%" }} className={style.AllSportHeading}>
                        <span className={style.staricColor}>*</span>
                        {item?.name}
                      </label>
                      <div className={style.widthpercentage} style={{display:"flex"}}>
                      <div>
                      <CommonInput
                          className={`${Number(item?.minAmount) < Number(item?.limit_minAmount)? style.BorderColrRed: style.commonInputHeight}`}
                          inputType={LOWER_NUMBER}
                          value={item?.minAmount?.toString()}
                          onChange={(e) => {
                            minimumHandleChange(e, item?._id);
                          }}
                        />
                        <div
                        className={style.TotalMaxAmount}
                          style={{
                            color:
                              Number(item?.minAmount) < Number(item?.limit_minAmount)
                                ? "red"
                                : "",
                                whiteSpace:"nowrap",
                          }}
                        >
                          Min Amnt: {item?.limit_minAmount}
                        </div>
                      </div>
                      <div>
                      <CommonInput
                          className={`${Number(item?.amount) > Number(item?.limit_max_amount)? style.BorderColrRed: style.commonInputHeight}`}
                          inputType={LOWER_NUMBER}
                          value={item?.amount?.toString()}
                          onChange={(e) => {
                            handleChange(e, item?._id);
                          }}
                        />
                        <div
                        className={style.TotalMaxAmount}
                          style={{
                            color:
                              Number(item?.amount) > Number(item?.limit_max_amount)
                                ? "red"
                                : "",
                                whiteSpace:"nowrap"
                          }}
                        >
                          Max Amnt: {item?.limit_max_amount}
                        </div>
                      </div>
                      <div>
                      <CommonInput
                          className={`${Number(item?.ExpAmount) > Number(item?.limit_ExpAmount)? style.BorderColrRed: style.commonInputHeight}`}
                          inputType={LOWER_NUMBER}
                          value={item?.ExpAmount?.toString()}
                          onChange={(e) => {
                            expHandleChange(e, item?._id);
                          }}
                        />
                        <div
                        className={style.TotalMaxAmount}
                          style={{
                            color:
                              Number(item?.ExpAmount) > Number(item?.limit_ExpAmount)
                                ? "red"
                                : "",
                                whiteSpace:"nowrap"
                          }}
                        >
                          Exp Amnt: {item?.limit_ExpAmount}
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })}
             <div className={style.bothSubmitBtnJustify} style={{paddingBottom:20}}>
             <CustomButton
                className={style.submitBtn_2}
                htmlType={LOWER_SUBMIT}
                title={CAP_SUBMIT}
                customClass={style.btnStyle}
                loading={loadingUpdateBetAmount}
                disabled={checkValueIncreasedORNot() || loadingUpdateBetAmount}
                onClick={() => handleUpdateBetSizeData()}
              />
             </div>
            </div>
          ) : (
            <div style={{marginTop:20}}>
              <Empty className={style.emptyBox}/>
            </div>
          )}
        </div>
        
      </Col>
    ),
    [betSizeData]
  );
  const onCancel = () => {
    setOpenConfirmModal(false);
  };
  return (
    <div className={style.betsBody}>
      <ConfirmationModal
        title={"This user already exist"}
        confirmBtnTitle={CAP_ACCEPT_BTN_TITLE}
        cancelBtnTitle={CAP_CANCEL_BTN_TITLE}
        description={`user name already exist do you want to delete existing user?`}
        onCancel={onCancel}
        isOpen={openConfirmModal}
        onConfirm={onConfirmCreateUser}
        loadingConfirmBtn={isLoadingCreateUser}
        
      />
      {id ? headerButtonUserBets: ''}
      <div className={style.mainDiv}>
        <Row gutter={10}>   
          {userForm}
          {!(getUserInfo?.role === NUM_STR_0_ROLE && getUserInfo?.id === id) &&
            id &&
            betSizesForm}
        </Row>

      </div>
      <FooterLogos className={style.userBetFormFooter} />
    </div>
  );
});

export default memo(UsersBetSizes);
