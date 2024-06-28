import { observer } from "mobx-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import {Col, Form, Radio, Row } from "antd";
import {
  CAMEL_ON_BLUR,
  CAP_PASSWORD,
  CAP_SUBMIT,
  INITIAL_VALUES,
  LOWER_BASIC,
  LOWER_HORIZONTAL,
  LOWER_PASSWORD,
  LOWER_SUBMIT,
  LOWER_TEXT,
  CAP_NOTES,
  CAP_COMMISSION,
  CAP_USERDOMAIN,
  CAP_PHONE,
  CAP_CURRENCY,
  CAP_MAX_BET_SIZES,
  CAP_MIN,
  LOWER_IS_REQUIRED,
  LOWER_PHONE,
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
  NUM_STR_0_ROLE,
  CAP_USER_CURRENCY,
} from "@utils/const";
import { CommonInput } from "@components/common-components/input";
import CustomButton from "@components/common-components/custom-button";
import { useParams } from "react-router-dom";
import { useStore } from "@stores/root-store";
import { roleNameTypeUserList, validateMessages } from "@utils/json-data";
import { CAP_DOWNLINE, NUM_85, UPPER_PKR } from "../const";
import { getUserOnRole } from "@utils/common-functions";
import { CommonSelect } from "@components/common-components/select";
import TitleBarUpdated from "../common-components/title-bar-updated";

const Profile = observer(() => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const [singleUserData, setSingleUserData] = useState(null);
  const [isDownlineShare, setIsDownlineShare] = useState(false);
  const [showPassWord, setShowPassword] = useState('')
  const [betSizeData, setBetSizeData] = useState([]);
  const [userCurrency, setUserCurrency] = useState([]);
  const [singleUserId, setSingleUserId] = useState(null)

  const SINGLE_USER_NAME = singleUserData?.userName || DOUBLE_DASH;
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, []);
  const [userInfoData, setUserInfoData] = useState(null);
  const {
    user: {
      isLoadingCreateUser,
      getSingleUser,
      getUserInfo,
      updateUser,
      isLoadingUpdateUser,
      isLoadingCheckValidation,
      loadAllBetSizeData,
      loadExchangeRateData,
      loadSingleUser,
    },
  } = useStore(null);
  useEffect(() => {
    loadSingleUserData()
  },[])
  const loadSingleUserData = async() => {
    const res = await loadSingleUser({id});
    if(res?.success){
      setSingleUserId(res?.results?.userId)
      setSingleUserData(res?.results)
    }
  }
  const MAX_ALLOWED_DOWNLINE_SHARE = getUserInfo?.downLineShare || NUM_85;
  const handleGetAllBetSizeData = async () => {
    const userId = singleUserId;
    const res = Number(singleUserId) && await loadAllBetSizeData(Number(userId));
    if (res?.success) {
      const result = res?.results?.map((item) => {
        return {
          ...item,
          maxAmount: item?.maxAmount?.toString(),
          amount: item?.amount?.toString(),
        };
      });
      setBetSizeData(result);
    }
  };
  const handleLoadExcahngeRate = async () => {
    const res = await loadExchangeRateData();
    if (res?.success) {
      const userCurrencyData = res?.results?.map((item) => {
        return { key: item?.currency, value: item?.currency };
      });
      userCurrencyData?.unshift({key: 'PKR', value: 'PKR'})
      setUserCurrency(userCurrencyData);
    }
  };
  useEffect(() => {
    form.setFieldValue("isActive", true);
    handleLoadExcahngeRate();
    if (singleUserData) {
      handleGetAllBetSizeData();
    }
  }, [singleUserData]);
  const onSubmit = useCallback(async (values) => {
    if (id) {
      const payload = {
        role: values.userType,
        password: values?.password || "",
        userName: values?.username,
        reference: values?.reference || "",
        phone: values?.phone || "",
        notes: values?.notes || "",
        isActive: values.isActive,
        bettingAllowed: values?.bettingAllowed,
        canSettlePL: values?.canSettlePL,
        downLineShare: values?.downLineShare,
        id: singleUserId,
      };
       await updateUser(payload);
    }
  }, [singleUserData]);
  const roleTypeOptions = useMemo(
    () => roleNameTypeUserList,
    [roleNameTypeUserList]
  );
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
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
  }, [id, singleUserId]);

  useEffect(() => {
    setUserInfoData(getUserInfo);
  }, [getUserInfo]);
  const onClickRadioBtns = useCallback((values) => {
    if (!(values?.target.value === NUM_STR_5_ROLE)) {
      setIsDownlineShare(true);
    } else {
      setIsDownlineShare(false);
    }
  }, []);
  const handleChangepass = (e)=>{
    setShowPassword(e?.target?.value)
  }
  const userForm = useMemo(
    () => (
      <Col
        xxl={12}
        xl={12}
        lg={12}
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
              </>
            )}
             {id && (
              <Form.Item
                label={CAP_CURRENCY}
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
             
            <Form.Item
              label={CAP_PHONE}
              name={LOWER_PHONE}
              className={style.formItemStyle}
              validateTrigger={[CAMEL_ON_BLUR]}
            >
              <CommonInput className={style.editITwo} inputType={LOWER_TEXT} />
            </Form.Item>
            {!id && isDownlineShare && (
              <Form.Item
                label={`${CAP_DOWNLINE} ${CAP_SHARE}`}
                name={CAMEL_DOWN_LINE_SHARE}
                className={style.formItemStyle}
                rules={[
                  {
                    required: true,
                    max: Number(MAX_ALLOWED_DOWNLINE_SHARE),
                    message: `${CAP_DOWNLINE} ${LOWER_SHARE} ${LOWER_MUST_BE_BETWEEN} ${NUM_STR_0} and ${MAX_ALLOWED_DOWNLINE_SHARE}`,
                  },
                ]}
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  min={"0"}
                  max={MAX_ALLOWED_DOWNLINE_SHARE.toString()}
                />
              </Form.Item>
            )}
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
              </>
            )}
           <div className={style.submitBtnJustify}>
           <CustomButton
              className={style.submitBtn_one}
              customClass={style.btnStyle}
              htmlType={LOWER_SUBMIT}
              title={(id && CAP_UPDATE) || CAP_SUBMIT}
              loading={
                isLoadingUpdateUser ||
                isLoadingCreateUser ||
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
      showPassWord
    ]
  );
  const betSizesForm = useMemo(
    () => (
      <Col
        xxl={12}
        xl={12}
        lg={12}
        md={24}
        sm={24}
        xs={24}
        className={style.betSizesDiv}
      >
        <div className={style.formStyleBetSizes}>
          <TitleBarUpdated title={CAP_MAX_BET_SIZES} />
          {betSizeData?.length ? (
            <div style={{marginTop:20}}>
              {betSizeData?.map((item, index) => {
                return (
                  <div>
                    <div key={index} className={style.gapClass32}>
                      <label style={{ width: "15%", textTransform:"capitalize" }}>
                        <span className={style.staricColor}>*</span>
                        {item?.name}
                      </label>
                      <div className={style.widthpercentage}>
                        <CommonInput
                        readOnly={true}
                          inputType={LOWER_NUMBER}
                          value={item?.amount?.toString()}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
    ),
    [betSizeData]
  );

  return (
    <div className={style.betsBody}>
      <div className={style.mainDiv}>
        <Row gutter={10}>
          {userForm}
          {!(getUserInfo?.role === NUM_STR_0_ROLE && getUserInfo?.id === id) &&
            id &&
            betSizesForm}
        </Row>
      </div>
    </div>
  );
});

export default memo(Profile);
