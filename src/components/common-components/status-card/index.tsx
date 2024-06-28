import { observer } from "mobx-react";
import React, { memo } from "react";
import { Card, Col, Row } from "antd";
import style from "./style.module.scss";
import useWindowSize from "@utils/hooks/useWindowSize";
import { numberWithCommas, truncate } from "@utils/common-functions";
import classNames from "classnames";

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
  item?:any;
}

export interface items {
  icon: string;
  label: string;
  value: number | string;
}

const StatusCard = observer(({item, title, icon, className, isIcon, isRightRibbon}: titleBarPropsTypes) => {
const { width } = useWindowSize()

  return (
    // <Card className={style.statusCardContainer}>
    //   <Row gutter={ width < 765 && 40 || 10 } className={style.statusCardRow} >
    //     <Col md={11} xxl={8} className={style.iconColContainer} >
    //       <div className={style.iconContainer}>
    //         <img src={item?.icon} alt="card icon" />
    //       </div>
    //     </Col>
    //     <Col md={10} xxl={16} className={style.cardTextContainer}>
    //       <p>{item?.label || "-"}</p>
    //       <span > {numberWithCommas(item?.value?.toFixed(1)|| 0)} </span> 
    //     </Col>
    //   </Row>
    // </Card>
    <div className={classNames(style.specialSectionHeader, className)}>
      <div className={style.specialSectionHeaderLabel}>
        <div className={style.labelIcon}>
          {item?.icon}
        </div>
        <div className={style.titleHead}><span>{item?.label || '-'}</span>
        </div>
      </div>
      <div className={style.specialSectionHeaderPromotion}>
        <div className={style.promotionLabel}>{numberWithCommas(Number(item?.value?.toString()?.replaceAll('e-', ''))?.toFixed(2)?.toString()?.replace('.00', '')|| 0)}</div>
      </div>
    </div>
  );
});

export default memo(StatusCard);
