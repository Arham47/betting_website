import { Col, Row } from 'antd'
import React, { memo } from 'react'
import { CAP_REPORT_TYPE } from '../../const'
import style from "./style.module.scss";
import classNames from "classnames";
import { observer } from 'mobx-react';
import { useTheme } from '@utils/hooks/useTheme';
import CustomButton from '@components/common-components/custom-button';

export interface titleBarPropsTypes {
  title?: any;
  icon?: any;
  className?: string;
  isIcon?: boolean;
  iconHtml?: any;
  isHtml?:any;
  HTMLRender?: any;
  dangeriousClass?: any;
  clickHandler?:any
  isButton?:any;
  btnTitle?:any;
  btnLoading?:any;
  isRightRibbon?:any;
}
const TitleBarUpdated = observer( ( {  title, icon, className, isIcon,  iconHtml, isHtml, HTMLRender, dangeriousClass, clickHandler, isButton, btnTitle, btnLoading, isRightRibbon}: titleBarPropsTypes ) => {
  return (
    <div className={classNames(style.specialSectionHeader, className)}>
      <div className={style.specialSectionHeaderLabel}>
        <div className={style.labelIcon}>
          {isIcon ?  icon : <img src={icon} alt="" /> }
        </div>
        <div className={style.titleHead}><span>{title || ''}</span>
        {isButton ? <CustomButton
            title={btnTitle}
            onClick={() => clickHandler()}
            loading={btnLoading}
          /> : ''}
        </div>
      </div>
      <div className={style.specialSectionHeaderPromotion}>
        <div className={style.promotionLabel}>{isRightRibbon}</div>
      </div>
    </div>
  );
})

export default memo(TitleBarUpdated)