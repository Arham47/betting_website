import { observer } from "mobx-react";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import loginLogo from "@assets/icons/logo-2.png";
import loginCoin from "@assets/icons/default-logo.webp";
import loginCoin2 from "@assets/icons/logo2.webp";
import betFair from "@assets/images/betfair-footer-img.png";
import CustomButton from "@components/common-components/custom-button";
import {
  CAMEL_ON_BLUR,
  CAP_LOGO,
  INITIAL_VALUES,
  LOWER_BASIC,
  LOWER_EMAIL,
  LOWER_IS_REQUIRED,
  LOWER_OFF,
  UPPER_OUR_POLICIES,
  CAP_USER_NAME,
  LOWER_TEXT,
  CAP_PASSWORD,
  LOWER_PASSWORD,
  LOWER_SUBMIT,
  CAP_LOGIN,
  LOWER_DARK,
  LOWER_LOGIN_PAGE_ONE,
  CAMEL_DEFAULT_LOGIN_PAGE,
  LOWER_LOGIN_PAGE_TWO,
  LOWER_LOGIN_PAGE_THREE,
  LOWER_THEME,
  LOWER_TOKEN,
} from "@utils/const";
import {Form } from "antd";
import { CommonInput } from "@components/common-components/input";
import DarkUserLogo from "@assets/icons/dark-user-logo.png";
import DarkLock from "@assets/icons/dark-lock.png";
import LoginFooterLogo from "@assets/images/login-footer-image2.webp";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import { validateMessages } from "@utils/json-data";
import { useTheme } from "@utils/hooks/useTheme";
import FooterLink from "@components/footer-link";
import { constRoute } from "@utils/route";
import styled from "styled-components";
import { footerLinkList } from "@components/footer-link/json-data";

export enum InputSize {
  Small,
  Medium,
  Large,
}
const Login = observer(() => {
  const footerLinkListMemoized = useMemo(() => footerLinkList, []);
  const theme = useTheme();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [defaultLoginPage, setDefaultLoginPage] = useState(
    localStorage?.getItem(CAMEL_DEFAULT_LOGIN_PAGE)
  );
  const {
    user: { onUserLoginInfo, isLoadingLogin },
    setting: { loadDefaultSettings, getDefaultSettings },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  useLayoutEffect(() =>  {
    if (localStorage.getItem('adminToken')) {
      navigate(constRoute.dashboard);
    }
    loadDefaultSettings().then(({ success, results }) => {
      if (success) {
        const [defaultLoginPage, defaultThemeName] = results;
        localStorage.setItem(LOWER_THEME, defaultThemeName?.defaultThemeName);
        localStorage.setItem("updateTheme", defaultThemeName?.defaultThemeName);
        localStorage.setItem(CAMEL_DEFAULT_LOGIN_PAGE, defaultLoginPage?.defaultLoginPage);
        setDefaultLoginPage(defaultLoginPage?.defaultLoginPage);
      }
    });
  }, []);
  const onLogin = useCallback((values) => {
    localStorage.removeItem('logoutStatus');
    localStorage.setItem('disclimarPopUp', 'true');
    const data = {
    password: values?.password,
    userName: values?.email?.trim(),
    isAdmin:true,
    };
    onUserLoginInfo(data, navigate);
    const camelDefaultLoginPage = localStorage.getItem(CAMEL_DEFAULT_LOGIN_PAGE);
    if (!camelDefaultLoginPage) {
    localStorage.setItem(CAMEL_DEFAULT_LOGIN_PAGE, LOWER_LOGIN_PAGE_ONE);
    setDefaultLoginPage(LOWER_LOGIN_PAGE_ONE);
    } else {
    setDefaultLoginPage(camelDefaultLoginPage);
    }
    }, []);
    const getExactLoginPageStyle = useCallback(() => {
      switch (defaultLoginPage) {
        case LOWER_LOGIN_PAGE_TWO:
          return style.loginPageContainerTwo;
        case LOWER_LOGIN_PAGE_THREE:
          return style.loginPageContainerThree;
        default:
          return style.loginPageContainerOne;
      }
    }, [defaultLoginPage]);

    const dynamicLogo = useCallback(() => {
      switch (defaultLoginPage) {
        case LOWER_LOGIN_PAGE_TWO:
          return loginCoin2;
        case LOWER_LOGIN_PAGE_THREE:
          return loginCoin;
        default:
          return loginCoin;
      }
    }, [defaultLoginPage]);

  const LoginForm = () => (
    <LoginPanelForm
      form={form}
      name={LOWER_BASIC}
      initialValues={INITIAL_VALUES}
      onFinish={onLogin}
      autoComplete={LOWER_OFF}
      validateMessages={validateMessages}
      className={style.loginPanelForm}
    >
      <Form.Item
        name={LOWER_EMAIL}
        className={`emailFormItem`}
        validateTrigger={[CAMEL_ON_BLUR]}
        rules={[
          {
            required: true,
            message: CAP_USER_NAME + " " + LOWER_IS_REQUIRED,
          },
        ]}
      >
        <CommonInput
          placeholder={CAP_USER_NAME}
          inputType={LOWER_TEXT}
          className={`loginInputFields`}
          variant={LOWER_DARK}
          size={InputSize.Medium}
          prefix={<img src={DarkUserLogo} alt="" />}
          onFocus={() => form.setFields([{ name: LOWER_EMAIL, errors: [] }])}
        />
      </Form.Item>
      <Form.Item
        className={`passwordFormItem`}
        name={LOWER_PASSWORD}
        rules={[
          {
            required: true,
            message: CAP_PASSWORD + " " + LOWER_IS_REQUIRED,
          },
        ]}
      >
        <CommonInput
          inputType={LOWER_PASSWORD}
          variant={LOWER_DARK}
          className={`loginInputFields`}
          prefix={<img src={DarkLock} alt="" />}
          placeholder={CAP_PASSWORD}
          size={InputSize.Medium}
          onInput={(e) => {
            e.target.value = e.target.value.trim();
          }}
        />
      </Form.Item>
      <Form.Item>
        <LoginBtnWrapper
          className={style.loginBtn}
          htmlType={LOWER_SUBMIT}
          loading={isLoadingLogin}
          title={CAP_LOGIN}
        />
      </Form.Item>
    </LoginPanelForm>
  );

  return (
    <div className={theme}>
      <MainWrapper className={getExactLoginPageStyle()}>
        <LoginPageWrapper className={style.loginPageWrapper}>
          <LogoLogin className={style.logoLogin} src={loginLogo} alt={CAP_LOGO} />
          {LoginForm()}
          <CoinLogoContainer className={style.coinLogoContainer}>
            <img src={dynamicLogo()} alt={CAP_LOGO} />
          </CoinLogoContainer>
          <CustomButton
            title={UPPER_OUR_POLICIES}
            className={style.ourPoliciesBtn}
            onClick={() => {
              navigate(constRoute?.privacyPolicy);
            }}
          />
        </LoginPageWrapper>
        <FooterWidthWrapper className={style.footerWidth}>
            <FooterLink
            footerlinklist={footerLinkListMemoized}
            footerClass={'footerLinks'}
          />
        </FooterWidthWrapper>
        <FooterSection className={style.footerSection}>
          <div className={'footerLogos'}>
            <img
              src={LoginFooterLogo}
              alt={"BellIconDark Img"}
              className={'loginImageOne'}
            />
            <img
              src={betFair}
              alt={"BellIconDark Img"}
              className={'loginImageTwo'}
            />
          </div>
        </FooterSection>
      </MainWrapper>
    </div>
  );
});

export default memo(Login);

const MainWrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
background-repeat: repeat;
background-size: cover;
align-items: center;
`;

const LoginPageWrapper = styled.div`
width: 365px; 
height: 800px;
border: 0px solid black;
margin: 20px 0px;
padding: 0px 20px;
background-repeat: no-repeat;
background-size: cover;
box-shadow: 0px 4px 34px rgba(0, 0, 0, 0.1);
border-radius: 27px;
`;

const LogoLogin = styled.img`
margin-top: 10px;
margin-left: -15px;
width: 75px;
height: auto;
margin-bottom: 50px;
`;

const CoinLogoContainer = styled.div`
height: 291px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
img {
  width: 88%;
  height: auto;
}
`;
const LoginPanelForm =styled(Form)`
padding: 0px;
color: white;
.emailFormItem {
  color: #fff !important;
  .loginInputFields {
    border-radius: 5px;
    .ant-input{
      color: white !important;
    }
  }
}

.passwordFormItem {
  .loginInputFields {
    .ant-input {
      border-radius: 5px;
      color: white !important;
    }

  .ant-input:placeholder-shown {
      color: white !important;
    }
  }
}
`
const LoginBtnWrapper = styled(CustomButton)`
border-radius: 10px;
border: 0px;
width: 100%;
//height: 42px;
display: flex;
justify-content: center;
align-items: center;

div {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  color: white;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
}

div:hover {
  color: white;
}
`
const FooterWidthWrapper = styled.div`
min-width: 100%;
     .footerLinks {
      background-color: #222a3c;
      min-width: 100%;
      opacity: 80%;
      text-align: center;
      a {
        color: white;
      }
      :hover{
        text-decoration: underline;
      }
    }
`
const FooterSection = styled.div`
  width: 100%;
  display: flex;
  opacity: 70%;
  justify-content: center;
  background-color: #222a3c;
  .footerLogos {
    height: auto;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;

    .loginImageOne {
      min-width: 120px;
      height: auto;
      cursor: pointer;

    }
    .loginImageTwo {
      min-width: auto;
      height: 40px;
      margin: auto;
      cursor: pointer;
    }
    @media screen and (min-width: 425px) {
      .loginImageTwo {
        height: 35px;
      }
    }
  }
`
