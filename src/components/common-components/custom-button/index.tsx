import React, { memo } from "react";
import { Button } from "antd";
import style from "./style.module.scss";
import { ButtonType, ButtonShape, ButtonHTMLType } from "antd/lib/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import classNames from "classnames";
import useFitText from "use-fit-text";
import { LOWER_OUTLINED } from "@utils/const";
import { useTheme } from "@utils/hooks/useTheme";
import { observer } from "mobx-react";

export interface buttonProps {
  className?: string;
  customClass?:any;
  block?: boolean;
  danger?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  variant?: string;
  htmlType?: ButtonHTMLType;
  icon?: React.ReactNode;
  loading?: boolean;
  endData?: any;
  startData?: any;
  shape?: ButtonShape;
  size?: SizeType;
  target?: string;
  type?: ButtonType;
  title?: string;
  onClick?: any;
  btnFontSize?:boolean;
}

const CustomButton = observer((props: buttonProps) => {
  const { fontSize, ref } = useFitText();
  const theme = useTheme();

  return (
    <div className={theme}>
      <Button
        className={classNames(
          props.variant === LOWER_OUTLINED
            ? style.outLinedCommonButton
            : style.filledCommonButton,
          props.className
        )}
        block={props.block}
        danger={props.danger}
        disabled={props.disabled || props.loading}
        ghost={props.ghost}
        href={props.href}
        htmlType={props.htmlType}
        icon={props.icon}
        loading={props.loading}
        shape={props.shape}
        size={props.size}
        target={props.target}
        type={props.type}
        onClick={props.onClick}
      >
        <div ref={ref} style={{ fontSize: props?.btnFontSize?'80%' :  fontSize }} className={props?.customClass ? props?.customClass : style.textContainer}>
          {props.startData || ""} {props.title} {props.endData || ""}
        </div>
      </Button>
    </div>
  );
});

export default CustomButton;
