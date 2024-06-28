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
    top: 10,
  };

  const popUpStatus = localStorage.getItem('disclimarPopUp')
  const showModal = () => {
    setIsModalOpen(true);
  };
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
          "1. FAKE BETS ARE DELETE IMMEDIATELY.\n2. WHEN A BETFAIR RESULT HAS BEEN CHANGE THEN THE RESULT IS CHANGED.\n3. IF THE MATCH HAS A TIE, THEN THE SESSION WAS COMPLETE WITH THE WIN / LOSS APPLES OF THE ABOVE MATCH.\n4. PLEASE CHANGE YOUR PASSWORD.\n5. RESULT BETFAIR OR SESSION MARKET'S ARE APPLY ON BOOK.\n6. IN ADVANCE FANCY JUST CANCEL THE LUMBI.\n7. IN CASE OF PENDING, THE FANCY BETS WILL BE DELETED.\n8. PENALTY SCORE CAN NOT ADD ON RUINING FANCY GAME.\n9. FOR ALL CASINO PROFIT / LOSS WOULD BE 10 TIMES FOR 1. AS IF YOU WIN 100 IN ANY CASINO YOU WILL GET 1000 BALANCE. SAME APPLICABLE FOR CASE OF LOSE. " //KINDLY PLACE YOUR BETS ACCORDINGLY.
        );
        break;
      case "ar":
        setTranslatedContent(
          "1. يتم حذف الرهانات الوهمية على الفور \n2. عندما يتم تغيير نتيجة الرهان العادلة ، يتم تغيير النتيجة \n3. إذا كانت المباراة تتضمن التعادل ، فعندئذٍ تكون الجلسة قد اكتملت بتطبيقات الفوز / الخسارة في المباراة المذكورة أعلاه\n4. يرجى تغيير كلمة المرور الخاصة بك\n5. يتم تطبيق نتيجة الرهان العادل أو سوق الجلسة على الكتاب\n6. في المقدمة ، فقط ألغِ لومبي\n7. في حالة الإيقاف ، سيتم حذف رهانات التخيل \n8.درجة ركلة الجزاء لا يمكن أن تضيف على تدمير لعبة الهوى\n9. بالنسبة لجميع الكازينوهات ، سيكون الربح / الخسارة 10 مرات مقابل 1. كما لو ربحت 100 في أي كازينو ستحصل على 1000 رصيد. نفس الشيء ينطبق على الخسارة. يرجى وضع رهاناتك وفقا لذلك "
        );
        break;
      case "ur":
        setTranslatedContent(
          "1. FAKE BET FORI TORR PY DELETE KR DI JAE GE. \n2. BETFAIR RESULT CHANGE HONA PAY RESULT CHANGE HOJAEGA.\n3. MATCH TIE HOGAE TO JO SESSION COMPLETE HOGA USKI HARJET LAGU HOGI. \n4. APNA PASSWORD CHANGE KARAIN.\n5. RESULT BETFAIR OR SESSION MARKET'S BOOK PA LAGU HONGA.\n6. ADVANCE FANCY MA SRIF LUMBI CANCEL HOGI.\n7. RUKI HUI FANCY OR BHAO KI BETS DELETE HOJAINGI.\n8.PENALTY SCORE CHALU FANCY PA ADD NAHI HOGA.\n9. HER CASINO M JEET HAAR 1 KA 10 HO GI. MATLAB YE K 100 KI BET 1000 M COUNT HO GI. AGR AP PLUS HITY HO TO 1000 PLUS HO GY R AGR MINUS HOTY HO TO 1000 KA MINUS HO GY."
        );
        break;
      case "hi":
        setTranslatedContent(
          "1. नकली दांव तुरंत हटा दिए जाते हैं.\n2. जब एक बेटफेयर परिणाम बदल दिया गया है तो परिणाम बदल गया है.\n3. यदि मैच टाई होता है, तो सत्र उपरोक्त मैच की जीत/हार के साथ पूरा होगा।. \n4. कृपया अपना पासवर्ड बदलें. \n5. परिणाम बेटफ़ेयर या सत्र बाजार पुस्तक पर लागू होते हैं.\n6. एडवांस फैंसी में बस लुंबी को रद्द कर दें.\n7. रुकने की स्थिति में, फैंसी बेट्स हटा दिए जाएंगे।.\n8. पेनल्टी स्कोर फैंसी गेम को बर्बाद करने में कोई योगदान नहीं दे सकता.\n9. सभी कैसीनो के लिए लाभ/हानि 1 के लिए 10 गुना होगी। जैसे कि यदि आप किसी भी कैसीनो में 100 जीतते हैं तो आपको 1,000 बैलेंस मिलेगा। हार के लिए भी यही बात लागू होती है। कृपया तदनुसार अपना दांव लगाएं."
        );
        break;
      default:
        setTranslatedContent(
          "1. FAKE BET FORI TORR PY DELETE KR DI JAE GE. \n2. BETFAIR RESULT CHANGE HONA PAY RESULT CHANGE HOJAEGA.\n3. MATCH TIE HOGAE TO JO SESSION COMPLETE HOGA USKI HARJET LAGU HOGI. \n4. APNA PASSWORD CHANGE KARAIN.\n5. RESULT BETFAIR OR SESSION MARKET'S BOOK PA LAGU HONGA.\n6. ADVANCE FANCY MA SRIF LUMBI CANCEL HOGI.\n7. RUKI HUI FANCY OR BHAO KI BETS DELETE HOJAINGI.\n8.PENALTY SCORE CHALU FANCY PA ADD NAHI HOGA.\n9. HER CASINO M JEET HAAR 1 KA 10 HO GI. MATLAB YE K 100 KI BET 1000 M COUNT HO GI. AGR AP PLUS HITY HO TO 1000 PLUS HO GY R AGR MINUS HOTY HO TO 1000 KA MINUS HO GY."
        );
        break;
    }
  }, [translatedLang]);

  useEffect(() => {
    switch (translatedLang) {
      case "en":
        setDisclaimer("Disclaimer");
        break;
      case "ar":
        setDisclaimer("تنصل");
        break;
      case "ur":
        setDisclaimer("Disclaimer");
        break;
      case "hi":
        setDisclaimer("अस्वीकरण");
        break;
      default:
        setDisclaimer("Disclaimer");
        break;
    }
  }, [translatedLang]);

  const handleLanguageChange = (language: string) => {
    setTranslatedLang(language);
  };
console.warn('defaultLoginPage', defaultLoginPage)
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
      open={popUpStatus === 'true'}
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
              <span onClick={() => handleLanguageChange("en")}>English</span>
              <span onClick={() => handleLanguageChange("ar")}>العربية</span>
              <span onClick={() => handleLanguageChange("ur")}>اردو</span>
              <span onClick={() => handleLanguageChange("hi")}>हिन्दी</span>
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
            <p>Number 1 betting site.</p>
            </div>
        <img src={BettorIcons} className={style.iconImage} />
      </div>
    </Modal>
    </div>
  );
});

export default memo(DisclaimerPopup);
