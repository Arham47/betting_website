import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss"
import navLogo from "@assets/icons/logo.png";

interface Props {}
const CommonNav: React.FC<Props> = observer(({ ...props }) => {
  return (
    <div className={style.mainContainer}>
        <div className={style.container}>
            <img src={navLogo} alt="bdg" className={style.navImg} />
            <h1>1OBET</h1>
        </div>
  
    </div>
  );
});

export default memo(CommonNav);
 