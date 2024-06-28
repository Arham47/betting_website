import { Row } from "antd";
import { observer } from "mobx-react";
import style from "./style.module.scss";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { constRoute } from "@utils/route";

interface FooterProps {
  footerClass?: any; 
  footerlinklist?: any;
  footerTextGlobal?: any;
}

const FooterLinks: React.FC<FooterProps> = observer(
  ({ footerlinklist = [], footerClass , footerTextGlobal}) => {
    return (
      <Row>
        <div className={footerClass ? footerClass : style.footerStyle}>
          <div className={footerTextGlobal? footerTextGlobal : style.footerText } >
            {footerlinklist?.map((item, index) => {
              return (
                <Link target="_blank" key={index} to={item?.screen}>
                  {index !== 0 && "-"} {item?.title}
                </Link>
              );
            })}
          </div>
        </div>
      </Row>
    ); 
  }
);

export default memo(FooterLinks);
