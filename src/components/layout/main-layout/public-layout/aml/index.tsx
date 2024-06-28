import { useEffect } from "react";
import { observer } from "mobx-react";
import style from "./style.module.scss";
import { Spin } from "antd";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
export const Aml = observer(() => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  return (
    <div className={style.wrapper}>
       <TitleBarUpdated
          title={`AML`}
          className={style.titleBar1}
        />
      {false ? (
        <div>
          <Spin className={style.antIconClass} size="large" />{" "}
        </div>
      ) : (
        <span>no data</span>
      )}
    </div>
  );
});
