// import TitleBar from "@components/users/common-components/title-bar";
import {
  CAP_CANCEL_BTN_TITLE,
  CAP_CONFIRM_BTN_TITLE,
  CAP_USER,
  LOWER_FILLED,
  LOWER_IS_ALREADY_EXIST,
  LOWER_OUTLINED,
  SEN_THIS_ACTION_CONNOT_BE_UNDONE,
} from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import classNames from "classnames";
import { Modal } from "antd";
import React from "react";
import CustomButton from "../custom-button";
import style from "./style.module.scss";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface ModalPropsTypes {
  setIsOpen?: (value) => void;
  title?: string;
  confirmBtnTitle?: string;
  cancelBtnTitle?: string;
  description?: string;
  warningText?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  loadingConfirmBtn?: boolean;
  onCancel?: (value) => void;
  modelTitle?: any;
  isConfirmDisable?:any;
}
export const ConfirmationModal: React.FC<ModalPropsTypes> = ({
  onConfirm,
  isOpen,
  onCancel,
  modelTitle,
  warningText = SEN_THIS_ACTION_CONNOT_BE_UNDONE,
  description = "",
  confirmBtnTitle = CAP_CONFIRM_BTN_TITLE,
  cancelBtnTitle = CAP_CANCEL_BTN_TITLE,
  loadingConfirmBtn = false,
  isConfirmDisable,
}) => {
  const theme = useTheme();
  return (
    <Modal
      onCancel={onCancel}
      closable={false}
      open={isOpen}
      title={
        <TitleBarUpdated title={modelTitle} />
      }
      className={classNames(theme, style.confirmationModal)}
      footer={
        <div className={style.footerBtnWrapper}>
          <CustomButton
            onClick={onCancel}
            variant={LOWER_OUTLINED}
            title={cancelBtnTitle}
          />
          <CustomButton
            onClick={onConfirm}
            variant={LOWER_FILLED}
            title={confirmBtnTitle}
            loading={loadingConfirmBtn}
            disabled={isConfirmDisable}
          />
        </div>
      }
    >
      <div className={style.modalBodyContent}>
        <p> {description} </p>
        <p className={style.warningText}> {warningText} </p>
      </div>
    </Modal>
  );
};
