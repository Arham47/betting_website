import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import CommonNavbar from '@components/common-components/common-navbar'
import style from "./style.module.scss"
export const AccountAndBonuses = observer(() => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.container}>
      <CommonNavbar />
      <div className={style.secondContainer}>
        <h1 className={style.hOne}>{"Accounts , Payouts & Bonuses"}</h1>
        <p>
          <span>
            <strong>1.</strong> To become an Account Holder you should first
            register on the company.
          </span>
        </p>
        <p>
          <span>
            <strong>2.</strong> A "The company Account" is an account held by an
            Account Holder, for bona fide transactions, with a strict aim to
            establish a normal commercial relationship with the company and with
            the strict purpose of conducting betting and other gaming and
            gambling transactions.
          </span>
        </p>
        <p>
          <span>
            <strong>3.</strong>The "Website" is the internet gateway accessible
            through the internet address the company/ where all current and
            relevant information regarding the company operations is published,
            and through which the Services are provided to the account holders.
          </span>
        </p>
        <p>
          <span>
            <strong>4.</strong> The rules for all Sports Betting on the company
            Sportsbook are set out under the general Help section (Sports
            Betting);
          </span>
        </p>
        <p>
          <span>
            <strong>5.</strong> The rules for each game provided by the company
            can be found on the website help section or in appropriate of each
            game.
          </span>
        </p>
        <p>
          <span>
            <strong>&nbsp;6.</strong> Bonus/ Promotions Rules are described in
            the "Promotions" part of the website, where you can see the
            conditions applied for each bonus and/or promotion. Maximum Bet
            amount you can place when you have an active casino bonus is 5€ (or
            currency equivalent) per spin on a slot game or 15% of the total
            bonus given (whichever comes first).
          </span>
        </p>
        <p>
          <span>
            <strong>7.</strong> All the provided services should be used in
            accordance with the Rules and the Set Limits.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>2. Opening Your Account</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>2.1</strong> In order to place a bet or play a game using
            our services, you will need to open an account with the Operator
            ("The company Account" or "Account").
          </span>
        </p>
        <p>
          <span>
            <strong>2.2</strong> In order to open the company Account, you can:
          </span>
        </p>
        <p>
          <span>
            <strong>2.2.1</strong> Click on Register on the Website and follow
            the on-screen instructions or
          </span>
        </p>
        <p>
          <span>
            <strong>2.2.2</strong> Open an account by such other account opening
            method as shall, from time to time may be offered by the Operator;
          </span>
        </p>
        <p>
          <span>
            <strong>2.3</strong> Your Account will either be operated by the
            Operator, or by another company in its Group for and on behalf of
            itself and/or the relevant Operator Group company with whom you have
            «signed» a contract.
          </span>
        </p>
        <p>
          <span>
            <strong>2.4</strong> When you open your account you will be asked to
            provide us with personal information, including your name and date
            of birth and appropriate contact details, including an address,
            telephone number and e-mail address ("Personal Details"). You may
            update your Personal Details from time to time by contacting
            Customer Service; or through the "My Profile" management page on the
            Website: or by such other method as shall, from time to time, may be
            offered by the Operator.
          </span>
        </p>
        <p>
          <span>
            <strong>2.5</strong> In opening your account you warrant that:
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.1</strong> You understand and accept the risk that, by
            using the Services, you may, as well as winning money, lose money;
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.2</strong> You are: (a) over 18 years of age: and (b)
            above the age at which gambling or gaming activities are legal under
            the law or jurisdiction that applies to you (the "Relevant Age");
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.3</strong> Gambling is not illegal in the territory
            where you reside;
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.4</strong> You are legally able to enter into contracts;
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.5</strong> You have not been excluded from gambling; and
          </span>
        </p>
        <p>
          <span>
            <strong>2.5.6</strong> You have not already had an Account closed by
            us under the following reasons of Collusion, Cheating, Fraud,
            Criminal Activity, Breach of the Terms of Use or at Your request
            under paragraph Responsible Gaming/Gambling.
          </span>
        </p>
        <p>
          <span>
            <strong>2.6</strong> Your account must be registered in your own,
            correct, name and personal details and it shall only be issued once
            for you and not duplicated through any other person, family,
            household, address (postal or IP), email address, Access Device or
            any environment where Access Devices are shared (e.g., schools,
            workplaces, public libraries etc), computer (or other access
            device), and/or account in respect of the Services. Any other
            accounts which you open with us, or which are beneficially owned by
            you in relation to the Services shall be "Duplicate Accounts". We
            may close any Duplicate Account (but we shall not be obliged to do
            so).
          </span>
        </p>
        <p>
          <span>If we close a Duplicate Account:</span>
        </p>
        <p>
          <span>
            <strong>2.6.1</strong> All bonuses, free bets and winnings accrued
            from such bonuses and free bets obtained using that Duplicate
            Account will be void and forfeited by you;
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>2.6.2</strong> We may, at our entire discretion, void all
            winnings and refund all deposits (less amounts in respect of void
            winnings) made in respect of that Duplicate Account and, to the
            extent not recovered by us from the relevant Duplicate Account, any
            amounts to be refunded to us by You in respect of a Duplicate
            Account may be recovered by us directly from any other of Your
            Accounts (including any other Duplicate Account); or
          </span>
        </p>
        <p>
          <span>
            <strong>2.6.3</strong> We may, at our entire discretion, allow usage
            of the Duplicate Account to be deemed valid and in this case all
            losses and stakes placed by or for you through the Duplicate Account
            shall be retained by us.
          </span>
        </p>
        <p>
          <span>
            <strong>2.6.4</strong> Due to regulatory legislation and licencing,
            players from the following jurisdictions are prohibited from
            creating accounts with the company: USA, Curacao and Malta. The
            company reserves all rights to suspend an account opened from those
            countries as well as deposits and bets placed.
          </span>
        </p>
        <p>
          <span>
            <strong>3.</strong> Management of the The company Account
          </span>
        </p>
        <p>
          <span>
            <strong>3.1</strong> The company reserves the right at its own
            discretion and at all times, to:
          </span>
        </p>
        <p>
          <span>{`a) Decline to open the company account and/or to close an existing The company Account without any explanation whatsoever;`}</span>
        </p>
        <p>
          <span>{`b) Decline to accept deposits without any explanation whatsoever;`}</span>
        </p>
        <p>
          <span>{`c) Request documents to verify: (i) the identity of the Account Holder, (ii) his/her authorization to use a specific Card and/or (iii) other facts and information provided by the Account Holder. Such request may be made at any given moment and the company reserves the right to suspend an account pending investigation;`}</span>
        </p>
        <p>
          <span>{`d) Transfer and/or license, without prior notice, data regarding an Account Holder to any other legal entity, in any country, ultimately managed and controlled by RAEEN EXCHANGE N.V , subject to the company guaranteeing that the mentioned data at all times are transferred and managed in accordance with the applicable laws, data protection acts and/or similar;`}</span>
        </p>
        <p>
          <span>{`e) Transfer and/or license, without prior notice, the rights and liabilities regarding an account holder to any other legal entity, in any country, ultimately managed and controlled by RAEEN EXCHANGE N.V.., subject to The company guaranteeing that those liabilities are being honoured;`}</span>
        </p>
        <p>
          <span>{`f) Hold and manage funds belonging to Account Holders in accordance with generally accepted guidelines for cash management regarding such funds; this may include a Financial Institution and/or a Payment Solution Provider being entrusted to hold funds in the name of and/or for the benefit of Account Holders;`}</span>
        </p>
        <p>
          <span>{`g) Forfeit and/or confiscate funds available on a The company Account and/or refuse to honour a claim, in the event that, directly or indirectly: (i) the The company Rules have been violated; and/or (ii) other unauthorised activities have occurred in connection with a betting event and/or the operation of a The company Account (such as, but not limited to, breach of the law or other regulations, breach of a third party’s rights, fraud, and cheating);`}</span>
        </p>
        <p>
          <span>{`h) Suspend and/or cancel the participation of an Account Holder in the games, promotional activities, competitions or other services, whenever The company is of the opinion that there are legitimate concerns that a The company Account is, has been, or may be used for illegal, fraudulent or dishonest practices;</span></p>
<p><span>i) Suspend and/or cancel the participation of the Account Holder in the Services, and/or forfeit and/or confiscate funds available on their The company Account if the Account Holder is found cheating, or if it is determined by The company that the Account Holder has employed or made use of a system (including machines, robots, computers, software or any other automated system) designed to defeat or capable of defeating the Client Application and/or Software.</span></p>
<p><span>The company is committed to detect and prevent software programs which are designed to enable artificial intelligence (“AI Software”) to play on ITS website(s) including but not limited to opponent-profiling, player collusion; robots, other 'cheating' software or anything else that in our reasonable opinion distorts normal game play and enables the player to have an unfair advantage over other players. You acknowledge that The company will take measures to detect and prevent the use of such programs and AI Software using methods (including but not limited to reading the list of currently running programs on a player’s computer) and the customer agrees not to use any AI Software and/or any such programs.`}</span>
        </p>
        <p>
          <span>
            <strong>3.2</strong> The company warrants at all times to:
          </span>
        </p>
        <p>
          <span>{`a) Manage funds belonging to Account Holders in a secure and appropriate manner; and/or`}</span>
        </p>
        <p>
          <span>{`b) Absorb the cost and pay the Gaming and Betting Duty, as applicable, at the Place of the Contract;`}</span>
        </p>
        <p>
          <span>{`c) Manage data regarding an Account Holder in accordance with applicable laws, data protection acts and/or similar;`}</span>
        </p>
        <p>
          <span>{`d) Not offer contingencies to customers to proceed to any fund transfer between customers’ accounts.`}</span>
        </p>
        <p>
          <span>
            <strong>3.3</strong> The company shall keep Account Holders’ funds
            separate from the company own funds in a client account held with a
            Financial Institution approved by the Regulator.
          </span>
        </p>
        <p>
          <span>
            <strong>3.4</strong> A The company Account does not accrue interest.
            The Account Holder shall not treat The company as a financial
            institution.
          </span>
        </p>
        <p>
          <span>
            <strong>3.5</strong> An Account Holder can only hold one the company
            Account at a time. In the event that this rule is breached, the
            company reserves the right to block and/or delete the superfluous
            The company Account(s) held by the Account Holder in breach of this
            clause, and reallocate all the funds to a single The company
            Account. Any bonus given to the superfluous The company Account(s)
            will be reallocated.
          </span>
        </p>
        <p>
          <span>
            <strong>3.6</strong> A The company Account is non-transferable. It
            is prohibited for players to sell, transfer or acquire accounts from
            or to other players. Funds cannot be transferred between The company
            accounts.
          </span>
        </p>
        <p>
          <span>
            <strong>3.7</strong> An Account Holder shall not allow any other
            individual, including any minor, to use or reuse its the company
            Account, access and/or use any material or information from the
            Website, accept any Prize, or access and/or participate in the
            Services.
          </span>
        </p>
        <p>
          <span>
            <strong>4. Inactive Accounts</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>4.1</strong> An "Inactive Account" is a the company Account
            which has no record of any log-in and/or log-out for a period
            exceeding six (6) consecutive months.
          </span>
        </p>
        <p>
          <span>
            <strong>4.2</strong> The company holds the right to charge or close
            the inactive accounts if:
          </span>
        </p>
        <p>
          <span>{`a) No transactions have been recorded on a The company Account for a period of 6 consecutive months; (A dormant account is an account that has not been accessed for 6 months, that has a real money balance. Once your account becomes dormant, if we have been unable to contact you, the Company has the right to close your account and`}</span>
        </p>
        <p>
          <span>{`b) The company has made reasonable efforts to contact the Account Holder of the Inactive Account but the Account Holder could not be satisfactorily located or the required payment instructions were not available.`}</span>
        </p>
        <p>
          <span>
            <strong>4.3</strong> Should an account be blocked or excluded and a
            balance is still available in the account, you shall be contacted by
            our Customer Support notifying you that a balance is still available
            in your account. You shall be requested to provide details for the
            withdrawal of such pending amounts.
          </span>
        </p>
        <p>
          <span>
            <strong>4.4</strong> Company reserves the right to charge a monthly
            fee an inactive account equal to 5 EUR (or currency equivalent) per
            month.
          </span>
        </p>
        <p>
          <span>
            <strong>4.5</strong> Any balance on an inactive account result of
            the cashback offering will be expired immediately.
          </span>
        </p>
        <p>
          <span>
            <strong>5. Chargeback</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>5.1</strong> Subject to the sub-clauses below and without
            prejudice to The company’s right to seek redress under any
            applicable legislation, regulation, enactment or policy, or under
            any other provision of the The company Rules, The company shall have
            the right to block a The company Account when a chargeback has been
            requested in relation to that The company Account.
          </span>
        </p>
        <p>
          <span>
            <strong>5.2</strong> When a chargeback has been requested, The
            company will send a "Chargeback Notice" to the Account Holder at the
            email address mentioned in the Account Holder’s details, in order to
            seek confirmation of the Account Holder’s identity and of the
            payment method used to credit to the Account Holder’s The company
            Account any funds entirely unrelated to a chargeback ("Untainted
            Funds").In the absence of confirmation by the Account Holder of the
            Account Holder’s identity and of the payment method used to credit
            Untainted Funds to the Account Holder’s, The company Account,
            following a Chargeback Notice, The company will send two written
            reminders to the Account Holder at the email available to it, each
            of which will be subject to a processing fee of fifty (50) Euros
            drawn on any Untainted Funds.
          </span>
        </p>
        <p>
          <span>
            <strong>5.3</strong> Where a The company Account has been blocked
            due to a chargeback and the Account Holder has not:a) logged in to
            the The company Account for a period of thirty (30) consecutive
            months; or b) confirmed to The company his identity and the details
            of the payment method used to credit Untainted Funds to the Account
            Holder’s The company Account and then requested a withdrawal; any
            Untainted Funds on the The company Account will be treated as they
            were funds on an Inactive Account and The company will remit the
            balance on the The company Account of the Account Holder.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>6. Closure of the company Account</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>6.1</strong> An Account Holder may close the company Account
            at any time by contacting the company’s Customer Support using the
            contact details provided in the "Help" section on the Website by
            email. Any funds in the company Account will be remitted to the
            Account Holder.
          </span>
        </p>
        <p>
          <span>
            <strong>6.2</strong> Should an existing the company Account be
            closed, any obligations already entered into will be honoured.
          </span>
        </p>
        <p>
          <span>
            <strong>6.3</strong> Account Holders who wish to recover funds held
            in a closed, blocked or excluded account are advised to contact
            Customer Support.
          </span>
        </p>
        <p>
          <span>
            <strong>6.4</strong> In case of closure of their company Account due
            to gambling addiction or fraud, an individual must not open a new
            The company Account. The company will not be liable should the
            individual succeed in opening a new account, nor for any direct or
            indirect consequential damages. The company reserves the right to
            close an account opened in breach of this rule at any point.
          </span>
        </p>
        <p>
          <span>
            <strong>6.5 Payment Rules</strong>
          </span>
        </p>
        <p>
          <span>
            Deposits to and withdrawals from the company Account shall at all
            times be made through a Financial Institution or a Payment Solution
            Provider. Procedures, Terms and Conditions, availability, and
            duration for deposits/withdrawals may vary, depending on the time
            needed for these procedures to be completed, as well as the country
            where the customer lives in and the Financial Institution that is
            used. More information is available when logged in on the Website
            under the sections "Deposit" or "Withdrawal". Regarding Yandex.Money
            Quick Payment: "Client confirms that he/she is familiarized with the
            conditions of the service "Yandex.Money Quick payment
            (https://money.yandex.ru/pay/doc.xml?offerid=default)."
          </span>
        </p>
        <p>
          <span>
            <strong>6.5.1</strong> The company holds the right to not process a
            payment if the Account Holder’s identity, age and place of residence
            and proof of funds have not been sufficiently verified.
          </span>
        </p>
        <p>
          <span>
            <strong>6.5.2</strong> The company may appoint a Payment Solution
            Provider to act, receive deposits, hold and manage funds, and/or
            expedite withdrawals, on behalf of The company.
          </span>
        </p>
        <p>
          <span>
            <strong>6.5.3</strong> The company does not accept cash funds sent
            or delivered directly to The company or a Payment Solution Provider.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>6.5.4</strong> The company will credit to the The company
            Account all funds received by The company from or on behalf of the
            Account Holder, or owned by The company to the Account Holder.
          </span>
        </p>
        <p>
          <span>
            <strong>6.5.5</strong> Method of payment/withdrawal from/to the
            company Account.
          </span>
        </p>
        <p>
          <span>
            <strong>6.6.1</strong> An Account Holder is only allowed to:
          </span>
        </p>
        <p>
          <span>{`a) Make deposits to the company Account with his personal Card or via his personal account created with one of the Financial Institutions or their licensees. If we detect account holders using funds from other account holders or 3rd parties in general (including but not limited to receiving funds from 3rd parties on their own payment methods and directly depositing them to their own the company account), we reserve the right to void any winnings and forfeit any balance (winnings and deposits) in your betting account, to terminate the Agreement and/or to suspend the provision of the Services or deactivate your account.`}</span>
        </p>
        <p>
          <span>{`b) Request withdrawals of funds held on the company Account to his personal account created with one of the Financial Institutions or their licensees.`}</span>
        </p>
        <p>
          <span>
            <strong>6.6.2</strong> An Account Holder is responsible for
            providing the company with the correct details of his personal
            account for the purpose of withdrawals from the company Account.
          </span>
        </p>
        <p>
          <span>
            <strong>6.6.3</strong> An Account Holder must not allow third
            parties to use the company Account to make deposits to or
            withdrawals from the company Account.
          </span>
        </p>
        <p>
          <span>
            <strong>6.6.4</strong> It is the Account Holder’s sole
            responsibility to ensure that he/she complies with the above
            provisions.
          </span>
        </p>
        <p>
          <span>
            <strong>6.7</strong> The company shall not accept a wager from an
            Account Holder unless a The company Account has been established in
            the name of the Account Holder and there are adequate funds in the
            company Account to cover the amount of the wager, or funds necessary
            to cover the amount of the wager are provided in an approved manner.
          </span>
        </p>
        <p>
          <span>
            <strong>6.8</strong> The company shall not deal with the credit
            balance of the company Account except:
          </span>
        </p>
        <p>
          <span>{`a) to debit from the company Account a wager made by the Account Holder or an amount the Account Holder indicates they want to wager in the course of a game they are playing or about to play;`}</span>
        </p>
        <p>
          <span>{`b) to remit funds standing to the credit of the company Account to the Account Holder, at the Account Holder’s request, in terms of regulation 37 of the Remote Gaming Regulations;`}</span>
        </p>
        <p>
          <span>{`c) to pay reasonable bank charges for deposits received and funds withdrawn; or`}</span>
        </p>
        <p>
          <span>{`d) as otherwise authorised by the Remote Gaming Regulations.`}</span>
        </p>
        <p>
          <span>
            <strong>6.9</strong> The balance of the company Account may turn
            negative in case of chargeback.
          </span>
        </p>
        <p>
          <span>
            <strong>6.10</strong> Withdrawals from the company Account are made
            through payments addressed to the Account Holder or transferred to a
            bank account held in the name of the Account Holder, as advised by
            the Account Holder. Whenever possible, the company will restrict
            withdrawals to be made only to the same account utilised by the
            Account Holder to make deposits.
          </span>
        </p>
        <p>
          <span>
            <strong>6.11</strong> Depending on the payment method chosen by the
            Account Holder, minimum and/or maximum deposit limits may apply.
          </span>
        </p>
        <p>
          <span>
            <strong>6.11.1</strong> To withdraw an amount from the account, the
            Account Holder must complete the following steps:
          </span>
        </p>
        <p>
          <span>1. Choose "Withdraw" in the Account section.</span>
        </p>
        <p>
          <span>2. Choose appropriate method of withdrawal.</span>
        </p>
        <p>
          <span>
            3. Provide the required personal data and indicate the amount.
          </span>
        </p>
        <p>
          <span>
            4. Press Confirm. A message confirming the withdrawal request will
            then appear.
          </span>
        </p>
        <p>
          <span>
            The withdrawals will be remitted only to the same account from which
            the funds originated. There can also be limitations for withdrawals.
            The identity of players must first be verified.
          </span>
        </p>
        <p>
          <span>
            <strong>6.12</strong> The company reserves the right to charge the
            Account Holder for administrative costs resulting from withdrawals
            made by the Account Holder, as indicated on the Website.
          </span>
        </p>
        <p>
          <span>
            <strong>6.13</strong> Placing a bet through the Internet may be
            illegal in the jurisdiction in which an Account Holder is resident
            and/or domiciled; if so, the Account Holder is not authorised to use
            a Card for the purpose of placing a bet.
          </span>
        </p>
        <p>
          <span>
            <strong>6.14</strong> The participation of an Account Holder in the
            Services in a jurisdiction where such participation is prohibited by
            law shall not affect any stakes or payment made to and accrued for
            the benefit of the company.
          </span>
        </p>
        <p>
          <span>
            <strong>6.15</strong> The company, or Governing Authority can
            monitor or request to review all transactions to prevent money
            laundering. All suspicious transactions detected by The company will
            be reported to the Governing Authorities.
          </span>
        </p>
        <p>
          <span>
            <strong>6.16</strong> All transactions are checked to prevent money
            laundering.
          </span>
        </p>
        <p>
          <span>
            <strong>6.17</strong> It is the sole responsibility of the Account
            Holder to pay and proceed with all necessary diligence in relation
            to taxes on any Prize, if and where applicable.
          </span>
        </p>
        <p>
          <span>
            <strong>6.18</strong> It is unlawful to deposit money from
            ill-gotten means.
          </span>
        </p>
        <p>
          <span>
            <strong>6.19</strong> With Finance / Accounting’s Department
            initiative, users may be redirected for different payment methods.
          </span>
        </p>
        <p>
          <span>
            <strong>&nbsp;</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>7. Limitation of Liability</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>7.1</strong> You enter the Website and participate in the
            Games at your own risk. The Websites and the Games are provided
            without any warranty whatsoever, whether expressed or implied.
          </span>
        </p>
        <p>
          <span>
            <strong>7.2</strong> Without prejudice to the generality of the
            preceding provision, the company, its directors, employees,
            partners, service providers:
          </span>
        </p>
        <p>
          <span>
            <strong>7.2.4</strong> Do not warrant that the software or the
            Website/Websites is/are fit for their purpose;
          </span>
        </p>
        <p>
          <span>
            <strong>7.2.5</strong> Do not warrant that the software and Website
            are free from errors;
          </span>
        </p>
        <p>
          <span>
            <strong>7.2.6</strong> Do not warrant that the Websites and/or Games
            will be accessible without interruptions;
          </span>
        </p>
        <p>
          <span>
            <strong>7.2.7</strong> Shall not be liable for any loss, costs,
            expenses or damages, whether direct, indirect, special,
            consequential, incidental or otherwise, arising in relation to your
            use of the Websites or Your participation in the Games.
          </span>
        </p>
        <p>
          <span>
            <strong>7.3</strong> You hereby agree to fully indemnify and hold
            harmless the company, its directors, employees, partners, and
            service providers for any cost, expense, loss, damages, claims and
            liabilities howsoever caused that may arise in relation to your use
            of the Website or participation in the Games.
          </span>
        </p>
        <p>
          <span>
            <strong>8. Collusion, Cheating, Fraud and Criminal Activity</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>8.1.</strong> The following practices in relation to the
            Services:
          </span>
        </p>
        <p>
          <span>{`a) abuse of bonuses or other promotions (as defined in paragraph 11.4)`}</span>
        </p>
        <p>
          <span>{`b) using unfair external factors or influences (commonly known as cheating)`}</span>
        </p>
        <p>
          <span>{`c) taking unfair advantage (as defined in paragraph 11.4);`}</span>
        </p>
        <p>
          <span>{`d) opening any Duplicate Accounts; and/or`}</span>
        </p>
        <p>
          <span>{`e) undertaking fraudulent practice or criminal activity (as defined in paragraph 11.4), constitute "Prohibited Practices" and are not permitted. We will take all reasonable steps to prevent and detect such practices and to identify the relevant players concerned if they do occur.`}</span>
        </p>
        <p>
          <span>
            <strong>8.2.</strong> You agree that you shall not participate in or
            be connected with any form of Prohibited Practice in connection with
            your access to or use of the Services.
          </span>
        </p>
        <p>
          <span>
            <strong>8.3.</strong> If:
          </span>
        </p>
        <p>
          <span>{`a) We have reasonable grounds to believe that you have participated in or have been connected with any form of Prohibited Practice (and the basis of our belief shall include the use by us of any fraud, cheating and collusion detection practices which are used in the gambling and gaming industry at the relevant time); or`}</span>
        </p>
        <p>
          <span>{`b) You have placed bets and/or played online games with any other online provider of gambling services and are suspected (as a result of such play) of any Prohibited Practice or otherwise improper activity; or`}</span>
        </p>
        <p>
          <span>{`c) We become aware that you have "charged back" or denied any of the purchases or deposits that you made to your account; or`}</span>
        </p>
        <p>
          <span>{`d) You become bankrupt or suffer analogous proceedings anywhere in the world, then, (including in connection with any suspension and/or termination of your account) we shall have the right, in respect of your account to withhold the whole or part of the balance and/or recover from the account the amount of any deposits, pay-outs, bonuses or winnings which have been affected by or are in any way attributable to any of the event(s) outlined in this paragraph.`}</span>
        </p>
        <p>
          <span>
            <strong>8.4.</strong> For the purposes of this paragraph 11:
          </span>
        </p>
        <p>
          <span>{`a) A "fraudulent practice" means any fraudulent activity engaged in by you or by any person acting on your behalf or in collusion with you, and shall include, without limitation:`}</span>
        </p>
        <p>
          <span>- fraudulent charge-backs and rake-back activity;</span>
        </p>
        <p>
          <span>
            - the use by you or any other person who was participating in the
            same game as you at any time, of a stolen, cloned or otherwise
            unauthorized credit or debit card, as a source of funds;
          </span>
        </p>
        <p>
          <span>
            - the collusion by you with others in order to gain an unfair
            advantage (including through bonus schemes or similar incentives
            offered by us);
          </span>
        </p>
        <p>
          <span>
            - any attempt to register false or misleading account information;
          </span>
        </p>
        <p>
          <span>
            - any actual or attempted act by you which is reasonably deemed by
            us to be illegal in any applicable jurisdiction, made in bad faith,
            or intended to defraud us and/or circumvent any contractual or legal
            restrictions, regardless of whether such act or attempted act
            actually causes us any damage or harm;
          </span>
        </p>
        <p>
          <span>{`b) An "unfair advantage" shall include, without limitation:`}</span>
        </p>
        <p>
          <span>
            - the exploitation of a fault, loophole or error in our or any third
            party's software used by you in connection with the Services
            (including in respect of any game);
          </span>
        </p>
        <p>
          <span>
            - the use of automated players ('bots'), or other 3rd party software
            or analysis systems; or
          </span>
        </p>
        <p>
          <span>
            - the exploitation by you, of an 'Error' as defined in paragraph 18,
            in any case either to your advantage and/or to the disadvantage of
            us or other.
          </span>
        </p>
        <p>
          <span>{`c) Bonus Abuse includes, but is not limited to:`}</span>
        </p>
        <p>
          <span>
            i. breach of terms and conditions of a bonus, free bets or any other
            promotional offer
          </span>
        </p>
        <p>
          <span>
            ii. the opening of multiple accounts to claim multiple bonuses;
          </span>
        </p>
        <p>
          <span>
            iii. all bonuses are subject to bonus use limitation based on the
            bonus engine, and, unless stated otherwise, they shouldn't be used
            more than 6 times per calendar month; if for any reason a bonus code
            is used by an individual player over the stated amount, the company
            reserves the right to further investigate bonus abusing pattern and
            deduct bonus winnings plus all 3rd-party charges arising from
            player's activity (payment fees, providers fees, etc)
          </span>
        </p>
        <p>
          <span>
            Where there is a reasonable suspicion that the Account Holder has
            committed or attempted to commit a bonus abuse, either on their own
            or as part of a group, company reserves the right to:
          </span>
        </p>
        <p>
          <span>
            i. forfeits the bonus allocated to the Account Holder and any
            winnings from that bonus, and/or
          </span>
        </p>
        <p>
          <span>
            ii. revoke, deny, or withdraw a bonus offer from the Account Holder,
            and/or
          </span>
        </p>
        <p>
          <span>iii. block an access to particular products, and/or</span>
        </p>
        <p>
          <span>
            iv. exclude the Account Holder from any future promotional offers,
            and/or
          </span>
        </p>
        <p>
          <span>
            v. terminate the Account Holder’s account with immediate effect.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>9. Closure of Your Account</strong>
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            TERMINATION OF THE TERMS OF USE CLOSURE AND TERMINATION BY YOU
          </span>
        </p>
        <p>
          <span>
            <strong>9.1</strong> Provided that Your Account does not show that a
            balance is due to us, you are entitled to close Your Account and
            terminate the Terms of Use on not less than twenty-four hours’
            notice to us at any time, by contacting us through Customer
            Services, details of which can be found in the Contact Us and Help
            section of the Website:
          </span>
        </p>
        <p>
          <span>
            <strong>9.1.1</strong> Indicating Your wish to close Your Account;
            and
          </span>
        </p>
        <p>
          <span>
            <strong>9.1.2</strong> Stating the reasons why You wish to close
            Your Account, in particular if You are doing so because of concerns
            over the level of Your use of the Services.
          </span>
        </p>
        <p>
          <span>
            We will respond to Your request, confirming closure of Your Account
            and the date on which such closure will be effective, within a
            reasonable time, provided that You continue to assume responsibility
            for all activity on Your Account until such closure has been carried
            out by us (at which point the Terms of Use shall terminate).
          </span>
        </p>
        <p>
          <span>
            <strong>9.2</strong> When You request closure of Your Account under
            paragraph 9.1, subject to paragraph 9.3, return any outstanding
            balance in Your Account to You.
          </span>
        </p>
        <p>
          <span>
            <strong>9.3</strong> Upon any termination of Your Account under this
            paragraph 9 we shall be entitled (without limiting our rights under
            paragraph 9.6) to withhold, from the repayment of the outstanding
            balance on Your Account, any funds: (a) pursuant to paragraph 8
            (Collusion, Cheating, Fraud and Criminal Activity); (b) pursuant to
            paragraph 20 (Breach of the Terms of Use); (c) as otherwise provided
            by the Terms of Use (including, as appropriate, paragraph 5.4); or
            (d)as required by law or regulation.
          </span>
        </p>
        <p>
          <span>
            <strong>9.4</strong> When repaying the outstanding balance on Your
            Account, we shall use the same method of payment which You provided
            upon registration of Your Account, or such other payment method as
            we may reasonably select.
          </span>
        </p>
        <p>
          <span>
            <strong>9.5</strong> Where You have closed Your Account, we may in
            certain circumstances be able to re-open Your Account with the same
            account details as before if You request us to do so. In such
            circumstances, while Your Account will have the same account details
            as before, it will be subject to the Terms of Use which are in force
            at the date of any such re-opening and any prior entitlements
            (including, but without limitation, to bonuses or contingent
            winnings) will no longer be valid.
          </span>
        </p>
        <p>
          <span>CLOSURE AND TERMINATION BY US</span>
        </p>
        <p>
          <span>
            <strong>9.6</strong> We are, at any time (and notwithstanding any
            other provisions contained in the Terms of Use), entitled to close
            Your Account and terminate the Terms of Use on written notice (or
            attempted notice) to You using Your Contact Details. In the event of
            any such termination by us we shall, subject to paragraph 12.7, as
            soon as reasonably practicable following a request by You, refund
            the balance of Your Account.
          </span>
        </p>
        <p>
          <span>
            <strong>9.7</strong> Where we close Your Account and terminate the
            Terms of Use pursuant to paragraph 11 (Collusion, Cheating, Fraud
            and Criminal Activity) or paragraph 20 (Breach of the Terms of Use),
            the balance of Your Account will be non-refundable and deemed to be
            forfeited by You to the extent of any claim that we may have against
            You as at the date of such closure (whether under Your Account,
            there is a Duplicate Account or anything similar). Closure of Your
            Account and Termination of the Terms of Use, other than pursuant to
            paragraphs 11 or 20 of these General Terms, will not affect any
            outstanding bets, provided that such outstanding bets are valid and
            You are not in breach of the Terms of Use in any way. For the
            avoidance of doubt, we will not credit any bonuses into Your
            Account, nor will You be entitled to any contingent winnings, at any
            time after the date on which it has been closed (whether by us
            pursuant to the Terms of Use, or in response to Your request).
          </span>
        </p>
        <p>
          <span>
            <strong>9.8</strong> The following paragraphs shall survive any
            termination of the Terms of Use: 19, 20, 21, 22, 23, 25, 26, 28, 29,
            30, 31, 32 and 34 and any other paragraphs which are required for
            the purposes of interpretation; together with any relevant sections
            of the Betting Rules, relevant Game Rules and the Additional Terms.
          </span>
        </p>
        <p>
          <span>SUSPENSION BY US</span>
        </p>
        <p>
          <span>
            <strong>9.9</strong> We shall be entitled to suspend Your Account in
            the circumstances expressly set out in the Terms of Use. Upon the
            suspension of Your Account: (a) no activity shall be permitted
            (including deposits, withdrawals, betting or gaming) until the date
            upon which it is re-activated by us; (b) no bonuses or contingent
            winnings will be credited to the Account; and (c) we shall address
            the issue that has given rise to the Account suspension with a view
            to resolving it as soon as reasonably practicable so that the
            Account can, as appropriate, either be re-activated or closed.
          </span>
        </p>
        <p>
          <span>
            <strong>9.10</strong> Company reserves the right, in its sole
            discretion, to void any winnings and forfeit any balance (winnings
            and deposits) in your betting account, to terminate the Agreement
            and/or to suspend the provision of the Services or deactivate your
            account if:
          </span>
        </p>
        <p>
          <span>
            i) we identify you have disguised, or interfered, or taken steps to
            disguise or interfere, in any way with the IP address of any Device
            used to access our Site (such as using a Virtual Private Network
            “VPN”)
          </span>
        </p>
        <p>
          <span>
            ii) it comes to our attention that the customer used forged
            documents (photos, scanned documents, screenshots etc.) during the
            verification procedure or in any point time the Agreement is active
          </span>
        </p>
        <p>
          <span>
            iii) there is a reasonable suspicion that you have committed or
            attempted to commit a bonus abuse, either on your own or as part of
            a group
          </span>
        </p>
        <p>
          <span>
            iv) you are involved in any fraudulent, collusive, fixing or other
            unlawful activity in relation to Your or third parties’
            participation or you use any software-assisted methods or techniques
            or hardware devices for Your participation in any of the services
            provided by the Company.
          </span>
        </p>
        <p>
          <span>
            <strong>9.11</strong> Company reserves the right to close down
            existing accounts without explanation. In this event, or in the
            event of an account closure by a customer the gull balance will be
            paid out unless any fraudulent (e.g., Arbitrage, etc.) behavior is
            suspected. In case of fraudulent behavior, winnings will be voided
            and deposits will be refunded after we deduct the corresponding
            administrative and transaction fees and any fees that Company is
            obliged to pay to the competent authorities due to a customer’s
            complaint. Company also reserves the right to report to the
            appropriate authorities, if any customer is involved in any form of
            suspected fraudulent behavior.
          </span>
        </p>
        <p>
          <span>
            <strong>9.12</strong> If, in the Company's sole determination, the
            Player is found to have cheated or attempted to defraud the Company,
            in any way including but not limited to game manipulation, using
            strategies (e.g Martingale, Anti-Martingale system) aimed at
            unfaithful winnings or payment fraud, or if he / she makes untrue
            and / or malicious comments with regard to the Company's operation
            in any media or forum, or if the Company suspects the Player of
            fraudulent payment, including use of stolen credit cards or any
            other fraudulent activity (including but not limited to any
            chargeback or other reversal of a payment) or prohibited
            transactions (including but not limited to money laundering), the
            Company reserves the right to publish the Player’s actions together
            with his / her identity and e-mail address, as well as to circulate
            this information to banks, credit card companies, and appropriate
            agencies. Furthermore, the Company may close any accounts and
            forfeit any account balances that the Player has with the Company
          </span>
        </p>
        <p>
          <span>
            We reserve the right to void and withhold any or all winnings made
            by any Player, where we have reasonable grounds to believe that the
            said Player is acting or has acted in liaison with an attempt to
            defraud or damage the Company and/or the Services and/or the
            Platform in any way.
          </span>
        </p>
        <p>
          <span>
            In the interest of data protection, security and avoidance of fraud,
            the Company does not permit the use of any communication channels
            included within the Services and/or the Platform to offer or promote
            any offers, products or services (whether the Player’s or a third
            party's). The Player is expressly prohibited from posting
            information or contacting our customers to offer or promote any
            offers, products or services.
          </span>
        </p>
        <p>
          <span>
            <strong>&nbsp;</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>10. Registration</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>10.1</strong> Only registered Users can participate in
            bonus-programs of the company. To register, the User must fully and
            accurately fill in the registration form.
          </span>
        </p>
        <p>
          <span>
            <strong>10.2</strong> Registration and betting are only allowed for
            people over 18 years (or the allowed age range in the given country
            from which the user has opened a deposit and made bets). Users have
            complete responsibility in terms of dealing with the legality of
            Internet gambling in the region where they live and/or for providing
            the appropriate authorities of their country with information on
            winnings. The Company reserves the right to require proof of age and
            block the User’s account before receiving the appropriate
            documentation.
          </span>
        </p>
        <p>
          <span>
            <strong>10.3</strong> All information provided during the
            registration must be accurate and complete. In particular, when
            using credit or debit cards, the cardholder’s name and surname must
            match the name and surname indicated in the registration form,
            otherwise the account will be blocked. All bets made before locking
            the account are recognized as valid.
          </span>
        </p>
        <p>
          <span>
            <strong>10.4</strong> The Company reserves the right to block the
            accounts of Users who have reported false data, as well as to deny
            them the payment of any winnings. At the request of the company the
            User must present an official document with a photograph, confirming
            his identity (a passport copy, or his National ID), proof of
            authenticity of the indicated address data and telephone and proof
            of ownership of payment method.
          </span>
        </p>
        <p>
          <span>
            <strong>10.5</strong> Each User can have only one account.
            Registered Users cannot re-register as a new client with a new name
            or a new email address. In case of violation of this rule, the
            company has the right to void all bets made by the User.
          </span>
        </p>
        <p>
          <span>
            <strong>10.6</strong> The User has no right to permit any third
            party to use their game account.
          </span>
        </p>
        <p>
          <span>
            <strong>10.7</strong> Please note that you should not send us the
            details about your credit card account or other sensitive financial
            information via an unencrypted e-mail.
          </span>
        </p>
        <p>
          <span>
            <strong>10.8</strong> The company allows all its Users to choose
            their own combination of username and password. Users should keep
            such information secret. If your username and password are entered
            correctly while accessing the site, all bets remain in force and
            cannot be cancelled or changed by the User. If you suspect that
            someone, other than you, knows your password, change it immediately
            on our website. If you have forgotten the password or a part of it,
            please click the "Forgot your password?" button at the login page
            and follow the procedure to reset it.
          </span>
        </p>
        <p>
          <span>
            <strong>10.9</strong> Users who place their bets in the company via
            a cell phone should remember that The company is not responsible for
            any loss of data in the mobile phone of the client, and is not
            responsible for any commission of mobile and internet operators. By
            registering, the client confirms that he accepts and agrees to these
            Terms.
          </span>
        </p>
        <p>
          <span>
            <strong>10.10</strong> Company reserves the right, at any time, to
            check player’s identity, without prior notice, and prior to
            processing pay-outs; Company also reserves the right to hold
            withdrawals for the time needed to check the player’s identity.
          </span>
        </p>
        <p>
          <span>
            <strong>10.10.1</strong> Please note that when cumulative deposits
            or withdrawals reach € 2,000, the player verification procedure will
            be mandatory. Verification process will require from players to
            provide documents such as, but not limited to, identity cards, bank
            cards, bank statements, source of wealth, source of funds, and
            utility bills. In case of false personal data provided by the
            players, the withdrawal can be refused and the user account can be
            terminated. The player will be informed thereof by email. In some
            cases the Company can request Selfie with ID, Selfie with ID and
            special sign, or even call or video call. When any documents are
            requested, the Account Holder must upload such documentation on
            their Account (My Profile &gt; Documents). When requesting documents
            for an account verification, any pending withdrawals will be
            cancelled.
          </span>
        </p>
        <p>
          <span>
            <strong>10.10.2</strong> Once the verification is complete, the
            Account Holder may request a new withdrawal. In the event that the
            account is not verified within thirty (30) days from the initial
            request date, the account will be frozen for gameplay and
            transactions., Where, for any reason an Account Holder refuses or is
            unable to provide us with any of the requested documents, Company
            reserves the right to suspend the account and confiscate any funds
            available.
          </span>
        </p>
        <p>
          <span>
            <strong>10.10.3</strong> Refund request may also be declined by the
            Casino if the player provides false or intentionally modified
            personal data in order to bypass the system.
          </span>
        </p>
        <p>
          <span>
            <strong>11. Currency</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>11.1</strong> Currently Users have the right to place bets
            in the following currencies: EUR, USD, AUD, CAD, NOK, GBP, RUB, NZD,
            JPY, BRL. The company reserves the right to block the reception of
            bets and operating activities in any of the indicated currencies. In
            this case, all the necessary payments on the accounts of blocked
            currency would be held in another currency equivalent at the
            interbank exchange rate for that day.
          </span>
        </p>
        <p>
          <span>
            <strong>12. The Bonus Program</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>12.1</strong> All Users’ bonuses are limited individually to
            one person, home address, telephone number and e-mail address, one
            bill of payments (such as by Card number or Skrill account), as well
            as the computer being used (including the institute, Internet club
            and other public institutions). The company has the right to refuse
            the bonus to any User or group of Users. Bonus programs are
            available only to Users who have made a deposit in real currency to
            the company account.
          </span>
        </p>
        <p>
          <span>
            <strong>12.2</strong> In case of violation of any requirement of the
            bonus programs, and also if there is any evidence of recurrent bets
            on one and the same event from a group of customers, or conspiracy,
            regardless of the result of the given bets, The company reserves the
            right to deprive these Users from a bonus and to consider the
            corresponding bets as invalid. For the purposes of protection
            against fraud the company has the right to demand a document from
            the client proving identity before transferring a bonus.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3</strong> PROMOTIONAL TERMS
          </span>
        </p>
        <p>
          <span>
            Unless otherwise stated, the following terms apply for all Bonuses,
            Free spins, Free Bets, Casino Chips and any other “promotional
            material” offered via the website, newsletters and SMS.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.1</strong> Casino ‘Welcome’ and ‘Reload’ (slots), and
            Sports ‘Welcome’ and ‘Reload’ bonuses are valid for a period of 30
            days from the time when they are credited to the players’ account.
            After the period of 30 days the aforementioned promotional materials
            expire and are not claimable or refundable.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.2</strong> Live Casino ‘Welcome’ and ‘Reload’ bonus are
            valid for a period of 14 days from the time when they are credited
            to the players’ account. After the period of 14 days the
            aforementioned promotional materials expire and are not claimable or
            refundable.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.3</strong> All Free spins, Freebets, Bonus Chips, are
            valid for a period of 7 days from the time when they are credited to
            the players’ account. After the period of 7 days the aforementioned
            promotional materials expire and are not claimable or refundable.
            Max winnings from Cashback / Loyalty Bonus are limited to five (5x)
            times the initial amount of Cashback Bonus given. Any winnings above
            that will be forfeited. Max winnings from season/special promotions
            (including, but not limited to, Christmas Bonuses, Easter Bonuses,
            Halloween Bonuses) for 200% and above Bonus threshold, are limited
            to four (4x) times the initial deposit amount. Max winnings for
            bonuses between 150% - 199% Bonus threshold, are limited to eight
            (8x) times the initial deposit amount. Max winnings for bonuses
            between 120% - 149% threshold, are limited to ten (10x) times the
            initial deposit amount. Max winnings for bonuses between 100% - 119%
            threshold, are limited to fifteen (15x) times the initial deposit
            amount. Max winnings for bonuses between 25% - 99% threshold, are
            limited to twenty (20x) times the initial deposit amount. Any
            winnings above those limits will be forfeited.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.4</strong> All Bonuses and promotional materials of
            this website come with a wagering requirement which has to be met
            before the bonus money is turned into cash:
          </span>
        </p>
        <p>
          <span>- Free spins: x20 (times twenty) the amount of winnings</span>
        </p>
        <p>
          <span>- Casino Chip: x25 (times twenty) the bonus amount</span>
        </p>
        <p>
          <span>- Freebets: x1 (times one) the amount of winnings</span>
        </p>
        <p>
          <span>
            - Sports bonus: x10 (times ten) the deposit and bonus amount
          </span>
        </p>
        <p>
          <span>
            - Casino bonus: x45 (times forty-five) the deposit and bonus amount
          </span>
        </p>
        <p>
          <span>
            - Live Casino bonus: x35 (times thirty-five) the deposit and bonus
            amount
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.5</strong> Bonuses must be wagered exclusively on valid
            games which belong to the specific game category under which the
            bonus was initially offered. For example, a Sportsbook bonus must be
            wagered exclusively on Sports, a Casino bonus exclusively on Slots,
            and a Live Casino bonus exclusively on Live Casino games.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.6</strong> Casino Bonuses (Slots) are sometimes offered
            on specific Gaming Service Providers (GSPs) or on specific slots.
            Therefore, only the wagering performed on the selected GSP’s and/or
            on specific slots will be taken into consideration towards the
            bonus’s wagering requirements.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.7</strong> The maximum amount of money that can be won
            or withdrawn via Free spins, Casino Chips and Free Bets is limited
            to 100 EUR (or the equivalent in other currencies) or three times
            its value, whichever comes first, unless otherwise stated. The
            maximum amount of money that can be won or withdraw via No-Deposit
            Bonuses is limited to 25€, or currency equivalent. All info
            regarding maximum days validity, wagering requirement, remaining
            wagering requirement can all be found under each specific bonus
            under Customer's Bonuses section.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.8</strong> For no-deposit Free spins, Casino Chips and
            Free Bets awarded to players who have not previously made a deposit,
            a minimum deposit as well as a wagering of x1 (times one) the
            deposit amount is required, before the winnings can be withdrawn.
            Loyalty Casino Bonuses, Free spins, Casino Chips and Loyalty
            Sportsbook Bonuses and Freebets can be awarded only to fully
            verified players. Only one bonus is allowed per customer, per
            household, per address, per shared computer and shared IP address,
            and per any account details like an e-mail address, bank account
            details, credit card information and payment system account number.
            Any abuse of the bonus offer will lead to the closure of the
            account.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.9</strong> The Freebets offered must be placed on
            Football with minimum odds of 2,00. Handicaps and Draw-no-bet
            markets are excluded.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.10</strong> The maximum bet amount allowed to be placed
            with bonus money in Casino is 5 EUR (or the equivalent in other
            currencies) or 15% of the total bonus amount awarded (whichever
            comes first). Any game rounds or spins exceeding the maximum bet
            amount will not count towards the bonus wagering requirements and
            any potential winnings will be forfeited.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.11</strong> If a player decides to cancel an active
            Bonus, he can do so from his account. However, all bonus money, all
            winnings and any wagered amount resulting from his betting activity
            with the bonus will be forfeited for once and for all. Bonus bets
            calculates real money first and then bonus amount.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.12</strong> Personalized offers communicated
            exclusively to a specific segment of players via E-mail or SMS are
            exclusively available for the intended recipients of the E-mail or
            SMS and for those only.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.13</strong> For personalized offers communicated via
            email or SMS, players are requested to contact our customer support
            team in order to claim the bonus providing all necessary details
            (e.g., bonus code, type of offer, recipient’s email address, etc.).
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.14</strong> In some occasions, we will provide Free
            spins in the form of a Casino bonus chip. The amount to be credited
            takes into consideration the minimum bet allowed on the specific
            slot(s). For example, 20 Free spins on NetEnt’s Guns N’ Roses video
            slot will be awarded as a 4 EUR (or currency equivalent) Casino Chip
            and it is intended to be played on the specific slot (Bonus Chip =
            Min. bet (0,20 EUR) x number of rounds (20) = 4 EUR).
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.15</strong> None of the promotional materials offered
            via this website are transferable, exchangeable or refundable. In
            the occurrence where a certain promotional material is not operable
            due to technical, geographical or legal restrictions, the company
            does not hold any responsibility and reserves the right not to
            compensate or refund players.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.16</strong> Players may be requested at any given time
            to provide all necessary KYC documents for the verification of their
            account (proof of identity, payment method(s) and residence).
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.17</strong> In case of doubt for the bonuses’ remaining
            wagering requirement, players are advised to contact our customer
            support team.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.18</strong> Wagering will not count on the following
            games. You are solely responsible not to include the following games
            within your bonus wagering:
          </span>
        </p>
        <p>
          <span>
            All Video Poker games, All Roulette games, All Quick Play games, All
            Blackjack games, Hi Lo Fever, All Baccarat games, 3 Card Poker,
            European Roulette, Blood Suckers, Blood Suckers II, The WishMaster,
            Dead or Alive, Dead or Alive II, Jack Hammer 2, Cloud Quest, Tower
            Quest, Pearls of India, Treasure Island, Eye of the Kraken and Solar
            Queen.
          </span>
        </p>
        <p>
          <span>
            Company reserves the right to forfeit winnings and any wagered
            amount if customers found that they managed to play above mentioned
            games with an active bonus.
          </span>
        </p>
        <p>
          <span>
            <strong>12.3.19</strong> We reserve the right to amend, cancel or
            terminate any of the promotions at any given time and without prior
            notice.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>13. Deposits</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>13.1</strong> The available payment methods are determined
            by the country and the currency selected during registration. A
            complete list of fees, limits on them and other items is displayed
            on the Deposits and Withdrawals page. The company reserves the right
            to change these terms and details.
          </span>
        </p>
        <p>
          <span>
            <strong>13.2</strong> When conducting any financial transactions, it
            is necessary that the name of the owner of the debit/credit card or
            bank account exactly matches the name of the owner of the
            appropriate account of the company. Otherwise, the company reserves
            the right to cancel all transactions and make a return on all bets
            made while using someone else’s account or credit/debit card.
          </span>
        </p>
        <p>
          <span>
            <strong>14. Entry of Money on Account</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>14.1</strong> If any funds have been transferred to the User
            erroneously, the User is obliged to notify the company immediately.
            Any winnings of the client arising from such an error shall be
            considered invalid, and such bets are refundable, regardless of the
            delay between the origin of the error and the time it was seen.
          </span>
        </p>
        <p>
          <span>
            <strong>14.2</strong> If the deposits to the account were made for
            any other purpose than bets, poker, casino and financial betting,
            the company (particularly in case of suspected fraud) reserves the
            right to cancel a deposit and collect from the User all costs
            incurred as a result of processing the deposit.
          </span>
        </p>
        <p>
          <span>
            <strong>14.3</strong> If the User’s deposit exceeds the bet’s
            amount, upon the client’s request for withdrawal, The company
            reserves the right to charge the User all costs incurred as a result
            of processing deposits and withdrawals.
          </span>
        </p>
        <p>
          <span>
            <strong>15. Financial Constraints</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>15.1</strong> The minimum bet on any event is the equivalent
            of 0.50 Euro in the registered currency of game account. The minimum
            bet in "Multiple" mode and the minimum bet on one version of the
            "System" is the equivalent of 0.50 Euros.
          </span>
        </p>
        <p>
          <span>
            <strong>15.2</strong> The maximum coefficient of "Multiple" bets is
            500€. "Multiple" bets, in which the coefficient of winnings exceeds
            the maximum, are calculated with a coefficient of 500€. In these
            cases, the sum of winnings should not exceed the maximum payment for
            a "Single" bet. The maximum coefficient of winnings for each version
            of the "System" is 500€. Variants of systems on which the
            coefficient of winnings exceeds the maximum, are calculated with a
            coefficient of 500€.
          </span>
        </p>
        <p>
          <span>
            <strong>15.3</strong> The maximum amount of the bet on the event
            depends on the sport and the events and is defined by the bookmaker
            network specifically for each event and each type of bet and is
            subject to change without prior written notice. The company reserves
            the right to limit the maximum bet on individual events, as well as
            the introduction and removal of specific restrictions on the
            accounts of individual Users without notice or explanation of
            reasons.
          </span>
        </p>
        <p>
          <span>
            <strong>15.4</strong> All financial limitations are applicable to
            each User/group acting together, making bets containing the same
            predictions. If the User makes a number of bets containing the same
            predictions, the total payment on these bets may be limited by the
            size of a maximum payment regulated by given limitations.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>16. Payments</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>16.1</strong> Payments are processed in a time not exceeding
            72 hours starting from the moment that the request has been approved
            by the Payments department. Before the first payment is made to the
            User via electronic payment methods (Skrill, Webmoney, Credit or
            Debit card, etc.), the client is obliged to upload an electronic
            copy of a passport of his national ID at the relevant section under
            his Profile. The company, at its own discretion, may ask from the
            client additional documents (e.g., proof of address, selfies, etc.)
            prior to their first payment. Remember that forgery is severely
            punished by law and in cases of suspicion of placing a counterfeit
            or an edited copy of the documents by electronic methods, The
            company reserves the right to send such documents to the appropriate
            regulatory authorities.
          </span>
        </p>
        <p>
          <span>
            <strong>16.2</strong> Before making the payment, the employees of
            the company will verify the correspondence of the name, surname,
            father’s name, birth dates of the client and also other data. If
            differences are found between the actual data and the data provided
            by the client, The company reserves the right to make a refund for
            all bets by the User and refuse to pay out winnings to the User
            unless they prove their identity and accuracy of entered data.
          </span>
        </p>
        <p>
          <span>
            <strong>16.3</strong> If it turns out that the User has opened
            several accounts at the company, The company reserves the right to
            refuse to pay out these accounts (except the User’s assets
            legitimately transferred to the company account, after his payment
            of a 20% fine of the total amount of deposits).
          </span>
        </p>
        <p>
          <span>
            <strong>16.4</strong> With the first request for a withdrawal the
            User must enter valid passport or Personal ID details, exactly as it
            appears on the document, in the language of the country that issued
            (or in the case of foreign documents – in English).
          </span>
        </p>
        <p>
          <span>
            <strong>16.5</strong> Group and family members should regulate
            personal relationships with each other – payments are made ONLY in
            the name of the owner of the appropriate account.
          </span>
        </p>
        <p>
          <span>
            <strong>16.6</strong> The User agrees to provide the company with
            information about his bank account from which the bets will be made
            in particular, in order to transfer his winnings.
          </span>
        </p>
        <p>
          <span>
            <strong>16.7</strong> The company is not responsible for changes in
            the number of payments related to fluctuations of currency (rate of
            exchange).
          </span>
        </p>
        <p>
          <span>
            <strong>16.8</strong> If the User has requested a withdrawal in the
            amount of 1,000 Euros or more (or the equivalent in another currency
            at the interbank rate), Company pays a commission on the transfer
            and subsequent operations of withdrawals in the given calendar
            month. Otherwise, the commission is paid to the bank by the User.
            Maximum withdrawal able amount over a 24-hour period is 1,000 Euros
            (or the equivalent in another currency at the interbank rate)
            subject to its payment provider's specific limits. For winnings over
            10,000 Euros, the payments will be done in equal monthly
            instalments.
          </span>
        </p>
        <p>
          <span>
            <strong>16.9</strong> The Company reserves the right of funds’
            withdrawal using a priority for itself method of payment for winning
            players (including credit/debit card or to the player’s bank
            account).
          </span>
        </p>
        <p>
          <span>
            <strong>16.10</strong> Before ordering the first payment, the player
            must bet 100% of the payment as a deposit of money amount at minimum
            1.50 odd. This requirement is introduced to combat fraud and "money
            laundering" by players.
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            <strong>17. Liability &amp; Withdraw Limits</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>17.1</strong> The maximum net winnings, based on licensee
            liability, in any 24-hour period per account are limited to 5000
            EURO/CAD/USD.
          </span>
        </p>
        <p>
          <span>
            <strong>17.2</strong> The maximum net winnings, based on licensee
            liability, per account are limited to 50000€.
          </span>
        </p>
        <p>
          <span>
            <strong>17.3</strong>. The maximum withdrawable amount per account
            is limited to 7000€/month (or currency equivalent), unless otherwise
            specified in the Terms &amp; Conditions of a specific promotion.
            Exceptions may be made to players with a higher VIP level, if any,
            at the Casino’s sole discretion. If a customer wins more than
            €30,000, the Casino reserves the right to divide the pay out into
            monthly instalments until the full amount is paid out. If the amount
            to be withdrawn is larger than €7.000, the remaining amounts will be
            placed back in the player’s account, to be withdrawn in the
            following month. Withdrawals (pay-outs) exceedingly more than €2.300
            will require additional verification procedures; proof of identity,
            age and place of residency. "The Company" reserves the right to
            carry such verification procedures in case of lower pay-outs. The
            Company, reserves the right to delay and/or stop the processing of
            Cash Out requests until final approval has been received for any
            outstanding Deposit transactions.
          </span>
        </p>
        <p>
          <span>
            <strong>17.4</strong> A player with 1 deposit only will be eligible
            to cash out a maximum of 15x the initial deposit amount. All further
            winnings will be removed from the account upon withdrawal request.
          </span>
        </p>
        <p>
          <span>
            <strong>17.5</strong> All progressive jackpot wins will be paid in
            full.
          </span>
        </p>
        <p>
          <span>
            <strong>17.6</strong> Money deposited in the Casino must be used for
            gaming activity. Due to this, all deposits need to be wagered at
            least three (3) times.
          </span>
        </p>
        <p>
          <span>
            <strong>17.7</strong> The maximum winnings are quoted in Euros (€)
            as a base currency in order to ensure consistency across the world
            but currency equivalents apply for actual pay-outs. In the event of
            a casino system malfunction all wagers are void.
          </span>
        </p>
        <p>
          <span>
            •A player with 1 deposit only will be eligible to cash out a maximum
            of 15x the initial deposit amount. All further winnings will be
            removed from the account upon withdrawal request.
          </span>
        </p>
        <p>
          <span>
            The maximum winnings are quoted in Euros (€) as a base currency in
            order to ensure consistency across the world but currency
            equivalents apply for actual pay-outs. In the event of a casino
            system malfunction all wagers are void.
          </span>
        </p>
        <p>
          <span>
            <strong>&nbsp;</strong>
          </span>
        </p>
        <p>
          <span>
            <strong>18. Casino Games Exclusions </strong>
          </span>
        </p>
        <p>
          <span>
            <strong>18.1.</strong> NetEnt
          </span>
        </p>
        <p>
          <span>
            <strong>18.1.1</strong> Absolute Restriction
          </span>
        </p>
        <p>
          <span>
            NetEnt will not permit NetEnt Casino Games to be supplied to any
            entity that operates in any of the below jurisdictions (irrespective
            of whether or not NetEnt Casino Games are being suppliedby the
            entity in that jurisdiction) without the appropriate licenses.
          </span>
        </p>
        <p>
          <span>
            Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark,
            Estonia, France, Italy, Latvia, Lithuania, Mexico, Portugal,
            Romania, Spain, Sweden, Switzerland, United Kingdom, United States
            of America
          </span>
        </p>
        <p>
          <span>
            <strong>18.2</strong> Blacklisted Territories
          </span>
        </p>
        <p>
          <span>
            All NetEnt Casino Games may not be offered in the following
            territories:
            Afghanistan,Albania,Algeria,Angola,Australia,Bahamas,Botswana,Belgium,Bulgaria,
            Colombia, Croatia, Czech Republic, Denmark,
            Estonia,Ecuador,Ethiopia,France,Ghana, Guyana, Hong Kong,Italy,
            Iran, Iraq, Israel, Kuwait,Latvia, Lithuania,Mexico,Namibia,
            Nicaragua, North Korea, Pakistan, Panama,
            Philippines,Portugal,Romania, Singapore, Spain, Sweden, Switzerland,
            Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia, Uganda, United
            Kingdom, United States of America, Yemen,Zimbabwe.
          </span>
        </p>
        <p>
          <span>
            <strong>18.3</strong> Blacklisted Branded Games Territories
          </span>
        </p>
        <p>
          <span>
            The followed NetEnt Braded Games have some further restrictions in
            addition to the Blacklisted Territories set out above:
          </span>
        </p>
        <p>
          <span>
            <strong>18.3.1</strong> In addition to the jurisdictions set out in
            paragraph 2, PlanetoftheApesVideoSlot must not be offered in the
            following territories: Azerbaijan, China, India, Malaysia, Qatar,
            Russia, Thailand, Turkey, Ukraine.
          </span>
        </p>
        <p>
          <span>
            <strong>18.3.2</strong> In addition to the jurisdictions set out in
            paragraph 2, Vikings Video Slot must not be offered in the following
            jurisdictions: Azerbaijan, Cambodia, Canada, China, France, India,
            Indonesia, Laos, Malaysia, Myanmar, Papua New Guinea, Qatar, Russia,
            South Korea, Thailand, Turkey, Ukraine, United States of America.
          </span>
        </p>
        <p>
          <span>
            <strong>18.3.3</strong> In addition to the jurisdictions set out in
            paragraph 2, Narcos Video Slot must not be offered in the following
            territories: Indonesia, South Korea.
          </span>
        </p>
        <p>
          <span>
            <strong>18.3.4</strong> In addition to the jurisdictions set out in
            paragraph 2, Street Fighter Video Slot must not be offered in the
            following territories: Anguilla, Antigua &amp; Barbuda, Argentina,
            Aruba, Barbados, Bahamas, Belize, Bermuda, Bolivia, Bonaire, Brazil,
            British Virgin Islands, Canada, Cayman Islands, China, Chile,
            Clipperton Island, Columbia, Costa Rica, Cuba, Curacao, Dominica,
            Dominican Republic, El Salvador, Greenland, Grenada, Guadeloupe,
            Guatemala, Guyana, Haiti, Honduras, Jamaica, Japan, Martinique,
            Mexico, Montserrat,
            NavassaIsland,Paraguay,Peru,PuertoRico,Saba,SaintBarthelemy,Saint
            Eustatius, Saint Kitts and Nevis, Saint Lucia, Saint Maarten, Saint
            Martin, Saint Pierre and Miquelon,
            SaintVincentandtheGrenadines,Suriname,TurksandCaicosIslands,UnitedStates
            of America, Uruguay, US Virgin Islands, Venezuela.
          </span>
        </p>
        <p>
          <span>
            <strong>18.3.5</strong> In addition to the jurisdictions set out in
            paragraph 2, Fashion TV Video Slot must not be offered in the
            following territories: Cuba, Jordan, Turkey, Saudi Arabia.
          </span>
        </p>
        <p>
          <span>
            <strong>18.4</strong> Universal Monsters (Frankenstein, the Bride of
            Frankenstein, Dracula, The Mummy, The Wolf Man, Creature from the
            Black Lagoon and The Invisible Man), may only be played in the
            following territories: Andorra, Armenia, Azerbaijan, Belarus, Bosnia
            and Herzegovina, Georgia, Iceland, Liechtenstein, Moldova, Monaco,
            Montenegro, Norway, Russia, San Marino, Serbia, Switzerland,
            Ukraine, Croatia, Macedonia, Turkey, Austria, Bulgaria, Cyprus,
            Czech Republic, Finland, France, Germany, Greece, Hungary, Ireland,
            Latvia, Lithuania, Luxembourg, Malta, Netherlands, Peru, Poland,
            Slovakia, Slovenia, and Sweden.
          </span>
        </p>
        <p>
          <span>
            <strong>19. Microgaming</strong>
          </span>
        </p>
        <p>
          <span>
            The citizens of some countries do not have an access to the
            Microgaming games. This list includes following countries: Belgium,
            Denmark, France, Italy, Singapore, South Africa, Spain, USA and
            United Kingdom. In addition, the partial restrictions imposed on the
            citizens of some other countries: USA, Israel, Turkey, Cuba, Iran,
            Burma, Libya, North Korea, Sudan, Syria, South Africa.
          </span>
        </p>
      </div>
    </div>
  );
});
