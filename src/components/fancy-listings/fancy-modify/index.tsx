import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Form, Modal, Spin } from "antd";
import { useTheme } from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import useWindowSize from "@utils/hooks/useWindowSize";
import { CommonInput } from "@components/common-components/input";
import { CAP_SUBMIT, LOWER_BASIC, LOWER_NUMBER, LOWER_SUBMIT } from "@utils/const";
import CustomButton from "@components/common-components/custom-button";
import Table from "@components/common-components/table";
interface Props {
  open?: any;
  setOpen?: any;
  data?: any;
  setData?: any;
}
const FancyModify: React.FC<Props> = observer(
  ({ open, setOpen, data, setData, ...props }) => {
    const theme = useTheme();
    const [form] = Form.useForm();
    const innerWidth = useWindowSize()?.width;
    const {
      bet: { setFancyStore, submitFancyStore },
    } = useStore(null);


    const handleCancel = () => {
      setData(null);
      setOpen(false);

    };
    useEffect(() => {
      form.setFieldValue("resultData", data?.resultData || "0");

    }, [data]);
    const onSubmit = async (value) => {
      const payload = {
        betId: data?._id,
        resultData: value?.resultData
      };
      const res = await setFancyStore(payload);
      if (res?.success) {
        setData(null);
        setOpen(false);
      }
    }

    return (
      <div className={style.mainWrapper}>
        <Modal
          open={open}
          title={
            <TitleBarUpdated
              title={"Modify Fancy Data"}
              isButton={true}
              btnTitle={"Close"}
              clickHandler={handleCancel}
            />
          }
          closable={false}
          onCancel={handleCancel}
          width={innerWidth >= 400 ? 800 : "auto"}
          style={{ height: 300 }}
          className={theme + " " + style.resultModal}
          forceRender={true}
          footer={[]}
        >
          <div>
            <Form
              form={form}
              name={LOWER_BASIC}
              className={style.userBetForm}
              onFinish={onSubmit}
              layout={'vertical'}
            >
              <Form.Item
                className={style.formItemStyle}
                label="Result Data"
                name="resultData"
              >
                <CommonInput
                  inputType={LOWER_NUMBER}
                  className={style.editITwo}
                // onChange={(e)=>handleChangepass(e)}
                />
              </Form.Item>
              <CustomButton
                className={style.submitBtn_one}
                htmlType={LOWER_SUBMIT}
                title={CAP_SUBMIT}
                loading={
                  submitFancyStore
                }
              />
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
);

export default memo(FancyModify);
