import { Spin } from "antd";
import style from "./style.module.scss";

const WholePageLoader = () => {
  return (
    <div className={style.spinnerContainer}>
      <Spin className={style.spinnerWholePage}></Spin>
    </div>
  );
};

export default WholePageLoader;
