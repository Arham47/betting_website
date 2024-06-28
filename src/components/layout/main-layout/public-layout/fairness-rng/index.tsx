import { observer } from "mobx-react";
import { memo, useEffect } from "react";
import style from "./style.module.scss";
import CommonNavbar from "@components/common-components/common-navbar";

interface Props {}
const FairnessAndRNG: React.FC<Props> = observer(({ ...props }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.mainWrapper}>
      <CommonNavbar />
      <div className={style.bodyMain}>
        <div className={style.heading}>
          <h1>Fairness & RNG Testing Methods</h1>
        </div>
        <div>
          <div>
            <p>
              <span>
                One of our main concerns as an online gaming operator is to
                uphold fair gaming.
              </span>
              <br />
              <br />
              <span>
                All online products provided by RAEEN EXCHANGE N.V. are supplied
                by licensed companies with approved status from Curaçao eGaming
                Authorities.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span>
                With the exception of sports betting and live casino games, in
                order to ensure the integrity of the casino games, a Random
                Number Generator (RNG) is always used to determine the random
                outcome of such games.
              </span>
              <br />
              <br />
              <span>
                This is a standard industry system which ensures consistently
                random results which has also been extensively tested by running
                and analyzing thousands of game rounds. The randomness of the
                RNG provides a credible and fair gaming environment.
              </span>
            </p>
            <p>
              <span>
                The Return to Player (RTP) value is a theoretical calculation of
                the expected percentage of wagers that a specific game will
                return to player after a significant amount of plays (e.g.
                hundreds of million game plays). While every single game play is
                unpredictable and it is possible to win a big amount or lose
                your bet, the average return of a specific game in the long run
                will approach the Theoretical RTP value.
              </span>
              <br />
              <br />
              <span>
                We are monitoring the players’ payout ratio on a regular basis
                and we cooperate with gambling regulatory authorities to ensure
                our compliance with the legislation of relevant jurisdictions.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(FairnessAndRNG);
