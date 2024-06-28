import { observer } from "mobx-react";
import { memo, useState } from "react";
import style from "./style.module.scss";
import { Modal } from "antd";
import type { RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
// import TitleBar from "@components/users/common-components/title-bar";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

interface Props {
  open?: any;
  setReasonModalOpen?: any;
  setConformModal?:any;
  reasonHandler?:any;
}
const ReasonsModal: React.FC<Props> = observer(
  ({ open, setReasonModalOpen,setConformModal, reasonHandler, ...props }) => {
    const options = [
      { value: 1, label: 'Rain' },
      { value: 2, label: 'Bad Light' },
      { value: 3, label: 'Toss Delayed' },
      { value: 4, label: 'Bad Weather' },
      { value: 5, label: 'Bad Crowed' },
      { value: 6, label: 'Pitch' },
      { value: 7, label: 'Flood' },
      { value: 8, label: 'Unknown' },
    ];
      const [selectedOption, setSelectedOption] = useState(options[0]);
    const theme = useTheme();

    const saveHandler = () => {
      setConformModal(true);
      reasonHandler({id:open?.id, selectedOption});
      setReasonModalOpen({...open, modal:false});
    }

    const onChange = (e) => {
      const selectedValue = parseInt(e.target.value, 10);
      const selectedOption = options?.find(option => option.value === selectedValue);
      setSelectedOption(selectedOption);
    };
   
    return (
      <div className={style.mainWrapper}>
        <Modal
          open={open?.modal}
          title={<TitleBarUpdated title="Reasons"/>}
          closable={false}
          // onOk={handlelSubmit}
          className={theme + " " + style.resultModal}
          // onCancel={handleCancel}
          forceRender={true}
          footer={[]}
        >
           <Radio.Group onChange={onChange} value={selectedOption.value}>
            <Space direction="vertical">
              {options.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              title="Cancel"
              variant={LOWER_OUTLINED}
              onClick={() => setReasonModalOpen({...open, modal:false})}
              customClass={style.btnStyle}
            />
            <CustomButton
              title="Save"
              variant={LOWER_FILLED}
              customClass={style.btnStyleOne}
              onClick={saveHandler}
            />
          </div>
        </Modal>
      </div>
    );
  }
);

export default memo(ReasonsModal);
