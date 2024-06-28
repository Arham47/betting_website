import { observer } from "mobx-react";
import { memo, useEffect } from "react";
import style from "./style.module.scss";
import CommonNavbar from "@components/common-components/common-navbar";
import { UPPER_KYC } from "@utils/const";

interface Props {}
const KYC: React.FC<Props> = observer(({ ...props }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.mainContainer}>
      <CommonNavbar />
      <div className={style.container}>
        <h1 className={style.hOne}>{UPPER_KYC}</h1>
        <div className={style.listStyle}>
          <ul>
            To maintain the highest level of security, we require all our
            members to provide us with certain documentation in order to
            validate their accounts.
          </ul>
          <ul>
            Please note that the identification procedures shall be done before
            a cardholder starts operating and using services of our merchants.
          </ul>
          <h1 className={style.hOneTag}>What happens when you self-exclude?</h1>
          <ul>
            During a period of Self-Exclusion you will not be able to use your
            account for betting, although you will still be able to login and
            withdraw any remaining balance. It will not be possible to re-open
            your account for any reason, and <u>1oBet</u> will do all it can to detect
            and close any new accounts you may open.
          </ul>
          <h1 className={style.hOneTag}>
            Why do I need to provide documentation?
          </h1>
          <ul>There are several reasons:</ul>
          <ul>
            We are committed to providing a socially responsible platform for
            online gaming. All of our members must be 18 or older and we are
            bound by our licensing agreement to verify this.
          </ul>

          <ul>
            Secondly, as a respected online and global company it is in our
            interests to guarantee maximum security on all transactions.
          </ul>
          <ul>
            this.Thirdly, our payment processors require that our policies are
            in line with international banking standards. A proven business
            relationship with each and every member is mandatory for the
            protection of all parties. Our licensing agreement also obliges us
            to comply with
          </ul>
          <ul>
            Finally, by ensuring that your account details are absolutely
            correct, the inconvenience of 'missing payments' can be avoided. It
            can take weeks (and sometimes months) to trace, recall and resend
            using the correct information. This lengthy process also results in
            additional fees from our processors.
          </ul>
          <h1 className={style.hOneTag}>
            WHAT DOCUMENTS DO I NEED TO PROVIDE?
          </h1>
          <ul>PROOF OF ID:</ul>
          <ul>
            A color copy of a valid government issued form of ID (Driver's
            License, Passport, State ID or Military ID)
          </ul>
          <h1 className={style.hOneTag}>PROOF OF ADDRESS:</h1>
          <ul>A copy of a recent utility bill showing your address</ul>
          <ul>
            Note: If your government Id shows your address, you do not need to
            provide further proof of address.
          </ul>
          <ul>
            Additional documentation might be required depending on the
            withdrawal method you choose
          </ul>

          <h1 className={style.hOneTag}>
            When do I need to provide these documents?
          </h1>
          <ul>
            We greatly appreciate your cooperation in providing these at your
            earliest possible convenience to avoid any delays in processing your
            transactions. We must be in receipt of the documents before any cash
            transactions can be sent back to you. Under special circumstances we
            may require the documents before further activity (deposits and
            wagering) can take place on your account
          </ul>
          <ul>
            Please understand, if we do not have the required documents on file,
            your pending withdrawals will be cancelled and credited back to your
            account. You will be notified when this happens via the notification
            system
          </ul>
          <h1 className={style.hOneTag}>
            How can I Email you these documents?
          </h1>
          <ul>
            Please scan your documents, or take a high quality digital camera
            picture, save the images as jpegs, then email us using our official
            email.
          </ul>
          <h1 className={style.hOneTag}>
            How do I know my documents are safe with you?
          </h1>
          <ul>
            The security of your documentation is of paramount importance. All
            files are protected with the highest level of encryption at every
            step of the review process. All documentation received is treated
            with the utmost respect and confidentiality
          </ul>
          <ul>
            We’d like to thank you for your cooperation in helping us make
            1obet.com a safer place to play. As always, if you have any
            questions about this policy, or anything else, don’t hesitate to
            contact us using the contact us links on this page.
          </ul>
          <br />
        </div>
      </div>
    </div>
  );
});

export default memo(KYC);
