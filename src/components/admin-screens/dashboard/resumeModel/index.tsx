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
  data?: any;
  updateDataLoad?: any;
  openConfirmationModel?: boolean;
  setOpenConfirmationModel?: any;
  setOpenEditModel?: any;
}
const ResumeModel: React.FC<ModalHandle> = observer(
  ({ data, setOpenEditModel, setOpenConfirmationModel, openConfirmationModel }) => {
    const {
      user: { updateMatchStopReasonOrResumeData, loadingUpdateMatchStopOrResumeReason },
    } = useStore(null);
    const theme = useTheme();
    const handleCancel = () => {
      setOpenEditModel(true);
      setOpenConfirmationModel(false);
    };
    const handleSubmit = async() => {
      const payload={
        _id: data?._id,
        updateType: "resumed",
        matchResumedStatus: true
      }
    const res =  await updateMatchStopReasonOrResumeData(payload)
    if(res?.success){
      setOpenConfirmationModel(false)
      setOpenEditModel(false)
    }

    };
    const onCancel = () => {
      setOpenEditModel(true);
      setOpenConfirmationModel(false);
    };
    return (
      <>
        <Modal
          open={openConfirmationModel}
          closable={true}
          className={classNames(theme, style.antModalPlaceBet)}
          onCancel={handleCancel}
          footer={
            <div className={style.footerBtnWrapper}>
              <CustomButton
                onClick={onCancel}
                variant={LOWER_OUTLINED}
                title={"Cancel"}
                disabled={loadingUpdateMatchStopOrResumeReason}
              />
              <CustomButton
                onClick={handleSubmit}
                variant={LOWER_FILLED}
                title={"Submit"}
                loading={loadingUpdateMatchStopOrResumeReason}
                disabled={loadingUpdateMatchStopOrResumeReason}
              />
            </div>
          }
        >
          <div>
            <p className={style.descriptionClass}>
              {" "}
              {"Are you sure do you want to resume the match?"}{" "}
            </p>
          </div>
        </Modal>
      </>
    );
  }
);

export default memo(ResumeModel);
