import { observer } from "mobx-react-lite";
import { memo } from "react";
import style from "./style.module.scss"

const CommingSoonPage = observer(() => {



  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <h1>
          Website
          <br />
          Coming Soon
        </h1>
        <p>We Will Launch as soon as Possible.</p>
      </div>
    </div>
  );
});

export default memo(CommingSoonPage);