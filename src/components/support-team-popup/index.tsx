import { observer } from "mobx-react";
import { memo, useCallback, useEffect, useState } from "react";
import style from "./style.module.scss";
import {Modal } from "antd";
import BettorIcons from "@assets/images/bettor-dashboard-icons.png";
import CustomButton from "@components/common-components/custom-button";
import { CAMEL_DEFAULT_LOGIN_PAGE, CAP_CANCELLED, CAP_CLOSE_BTN_TITLE, LOWER_LOGIN_PAGE_THREE, LOWER_LOGIN_PAGE_TWO, LOWER_SUBMIT } from "@utils/const";

interface Props {}
const DisclaimerPopup: React.FC<Props> = observer(({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [translatedContent, setTranslatedContent] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [translatedLang, setTranslatedLang] = useState("");
    const [defaultLoginPage, setDefaultLoginPage] = useState(
    localStorage?.getItem('theme')
  );

  const modalStyle = {
    // top: 10,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const popUpStatus = localStorage.getItem('disclimarPopUp')
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    localStorage.removeItem('disclimarPopUp')
  };

  useEffect(() => {
    switch (translatedLang) {
      case "en":
        setTranslatedContent(
          "1. Take screenshot and contact support team.\n2. Screenshot Lain ur support team say rabbta kareen"
        );                  
        break;
      default:
        setTranslatedContent(
          "1. Take screenshot and contact support team.\n2. Screenshot Lain ur support team say rabbta kareen"
        );
        break;
    }
  }, [translatedLang]);

  useEffect(() => {
    switch (translatedLang) {
      case "en":
        setDisclaimer("Disclaimer");       
        break;
      default:
        setDisclaimer("Disclaimer");
        break;
    }
  }, [translatedLang]);

  const handleLanguageChange = (language: string) => {
    setTranslatedLang(language);
  };
// console.warn('defaultLoginPage', defaultLoginPage)
  const getExactModalStyle = useCallback(() => {
    switch (defaultLoginPage) {
      case 'grey-theme':
        return style.modelClassTwo;
      case 'dark-theme':
        return style.modelClassThree;
      default:
        return style.modelClass;
    }
  }, [defaultLoginPage]);

  return (
    <div className={style.container}>
    <Modal
      title=""
      // open={popUpStatus === 'true'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className={getExactModalStyle()}
      style={modalStyle}
    >
      <div className={style.mainContainer}>
        <div className={style.btnWrapper}>
          <h3 dangerouslySetInnerHTML={{ __html: disclaimer }} />
          <p className={style.btns}>
            <p className={style.btns}>
              <span onClick={() => handleLanguageChange("en")}>{}</span>
            </p>
          </p>
        </div>

        <div>
          <p
            className={style.content}
            dangerouslySetInnerHTML={{ __html: translatedContent }}
          />
        </div>
        <div className={style.buttonDiv}>
        <CustomButton
              className={style.submitBtn_one}
              // customClass={style.btnStyle}
              title={CAP_CLOSE_BTN_TITLE}  
              onClick={handleCancel}                  
            />
            {/* <p></p> */}
            </div>
        {/* <img src={BettorIcons} className={style.iconImage} /> */}
      </div>
    </Modal>
    </div>
  );
});

export default memo(DisclaimerPopup);
