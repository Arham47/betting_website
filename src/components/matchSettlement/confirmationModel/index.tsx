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
  setConformModal?: any;
  confirmationPayload?:any;
  handleMatchSettlementData?:any;
}

const ConformationModel: React.FC<ModalHandle> = observer(({handleMatchSettlementData,  open, setConformModal, confirmationPayload}) => {
  const {
    user: { updateMatchStopReasonOrResumeData, updateMatchResults, loadingUpdateMatchStopOrResumeReason },
  } = useStore(null);
    const theme = useTheme();
    const handleCancel = () => {
      // setOpenEditModel(true);
      // setOpenConfirmationModel(false);
    };
    const reasonHandler = async() => {
      const payload={_id: confirmationPayload?.data?.id, updateType:'stopped', matchStoppedReason:confirmationPayload?.data?.selectedOption?.label};
      const res = await updateMatchStopReasonOrResumeData(payload);
      if(res?.success) handleMatchSettlementData();
    };

    const resultHandler = async() => {
      if (confirmationPayload?.data?.selectedOption?.runnerName === "Draw") {
        const payload = { _id: confirmationPayload?.data?.id, draw: true};
        const res = await updateMatchResults(payload);
        if (res?.success) handleMatchSettlementData();

      } else {
        const payload = {_id: confirmationPayload?.data?.id, winner: confirmationPayload?.data?.selectedOption?.SelectionId};
        const res = await updateMatchResults(payload);
        if (res?.success) handleMatchSettlementData();
      }
    };

    const handleSubmit = async() => {
      setConformModal(false);
      (confirmationPayload?.type === "reason") ? reasonHandler() : resultHandler();
    };

    const onCancel = () => {
      // setOpenEditModel(true);
      setConformModal(false);
    };
    return (
      <>
        <Modal
          open={open}
          closable={true}
          className={classNames(theme, style.antModalPlaceBet)}
          onCancel={handleCancel}
          footer={
            <div className={style.footerBtnWrapper}>
              <CustomButton
                onClick={onCancel}
                variant={LOWER_OUTLINED}
                title={"Cancel"}
                // disabled={loadingUpdateMatchStopOrResumeReason}
              />
              <CustomButton
                onClick={handleSubmit}
                variant={LOWER_FILLED}
                title={"Submit"}
                customClass={style.btnStyle}
                // loading={loadingUpdateMatchStopOrResumeReason}
                // disabled={loadingUpdateMatchStopOrResumeReason}
              />
            </div>
          }
        >
          <div>
            <p className={style.descriptionClass}>
              {"Are you sure do you want to update the match?"}{" "}
            </p>
          </div>
        </Modal>
      </>
    );
  }
);

export default memo(ConformationModel);
