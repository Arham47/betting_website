import React, { memo } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import style from "./style.module.scss";
import { useTheme } from "@utils/hooks/useTheme";
import classNames from "classnames";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { useStore } from "@stores/root-store";
interface ModalHandle {
  open?: boolean;
  setOpen?: any;
  confirmationPayload?:any;
  handleSubmit?:any;
  loading?:any;
}

const ConformationModel: React.FC<ModalHandle> = observer(({handleSubmit,  open, setOpen, loading}) => {
    const theme = useTheme();
    const onCancel = () => {
      setOpen(false);
    };
    return (
      <>
        <Modal
          open={open}
          closable={true}
          className={classNames(theme, style.antModalPlaceBet)}
          onCancel={onCancel}
          footer={
            <div className={style.footerBtnWrapper}>
              <CustomButton
                onClick={onCancel}
                variant={LOWER_OUTLINED}
                title={"Cancel"}
              />
              <CustomButton
                onClick={handleSubmit}
                variant={LOWER_FILLED}
                title={"Submit"}
                // customClass={style.btnStyle}
                loading={loading}
              />
            </div>
          }
        >
          <div>
            <p className={style.descriptionClass}>
              {"Are you sure do you want to update the Game?"}{" "}
            </p>
          </div>
        </Modal>
      </>
    );
  }
);

export default memo(ConformationModel);
