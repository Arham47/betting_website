import { observer } from "mobx-react";
import { memo, useState } from "react";
import style from "./style.module.scss";
import { Modal } from "antd";
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import CustomButton from "@components/common-components/custom-button";
import { LOWER_FILLED, LOWER_OUTLINED } from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
// import TitleBar from "@components/users/common-components/title-bar";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
interface Props {
    open?:any;
    setResultModalOpen?:any;
    setConformModal?:any;
    resultHandler?:any;
}
const ResultModal: React.FC<Props> = observer(({open, setResultModalOpen, setConformModal,resultHandler, ...props }) => {
  const optionsDel = open?.runners?.length ? [...open?.runners]?.concat([{SelectionId:0, runnerName:'Draw'}]) : [{SelectionId:0, runnerName:'Draw'}];
    const [selectedOption, setSelectedOption] = useState(optionsDel[0]);
    const theme = useTheme();

    const onChange = (e) => {
      const selectedValue = e.target.value;
      const selectedOption = optionsDel?.find(option => option?.SelectionId === selectedValue);
      setSelectedOption(selectedOption);
    };
    
    const saveHandler = () => {
      setConformModal(true)
      resultHandler({id:open?.id ,selectedOption});
      setResultModalOpen({...open, modal:false});
    }

  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open?.modal}
        title={<TitleBarUpdated title="Announce Winner"/>}
        closable={false}
        // className={stryle.modelStyle}
        // onOk={handlelSubmit}
        className={theme + " " + style.resultModal}
        // onCancel={handleCancel}
        forceRender={true}
        footer={[]}
      >
         <Radio.Group onChange={onChange} value={selectedOption?.SelectionId}>
        <Space direction="vertical">
          {optionsDel.map((option, index) => (
            <Radio key={index} value={option?.SelectionId}>
              {option?.runnerName}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
        <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
            <CustomButton title="Cancel" variant={LOWER_OUTLINED} onClick={() => setResultModalOpen({...open, modal:false})}  customClass={style.btnStyle}/>
            <CustomButton title="Save" variant={LOWER_FILLED} customClass={style.btnStyleOne} onClick={saveHandler}/>
        </div>
      </Modal>
    </div>
  );
});

export default memo(ResultModal);
