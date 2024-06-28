import {useEffect, useMemo } from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import style from "./style.module.scss";
import * as _ from "lodash";
import { useStore } from "@stores/root-store";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { AddBetsBtn } from "@components/users/json-data";
import HeaderButtons from "../common-components/header-buttons";
import { CAP_NET_EXPOSURE } from "../const";
import TitleBarUpdated from "../common-components/title-bar-updated";
export const CurrentPosition = observer(() => {
  const { id } = useParams();
  const {
    user: { getUserInfo},
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const headerButtonUserBets = useMemo(
    () => (
      <div className={style.betsBtnMainContainer}>
        <div className={style.betsBtnMain}>
          <Col xxl={16} xl={16} lg={14} md={12} sm={12} xs={24}>
            <HeaderButtons
              className={style.addBetsizeLoginBtn}
              btnList={AddBetsBtn}
              navigateId={id}
            />
          </Col>
          <Col xxl={8} xl={8} lg={10} md={12} sm={12} xs={24}>
            <h2 className={style.userName}> {getUserInfo?.userName} </h2>
          </Col>
        </div>
      </div>
    ),
    [getUserInfo]
  );
  const dummyArray = [
    {
      eventName: "8:30 AM Northern(Aus) 17 jul- R9 297mGrg",
      eventArray: [
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
        {
          name: "Kiwi collection",
          amount: 10000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
      ],
    },
    {
      eventName: "8:30 AM Northern(Aus) 17 jul- R9 297mGrg",
      eventArray: [
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: 11000,
        },
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
        {
          name: "Kiwi collection",
          amount: -1000,
          name2: "Shoe Shine jo",
          amount2: -1000,
        },
      ],
    },
  ];
  return (
    <Wrapper>
      <Row>{headerButtonUserBets}</Row>
      <TitleBarUpdated isButton={true} btnTitle={'Refresh'} clickHandler={()=>console.log('called')} title={CAP_NET_EXPOSURE}/>
      <div className={style.currentPositionTableWrapper}>
        <table style={{ width: "100%" }}>
          <thead>
            <th style={{ width: "25%" }}> Runners</th>
            <th style={{ width: "25%" }}> Stake</th>
            <th style={{ width: "25%" }}> Runners</th>
            <th style={{ width: "25%" }}> Stake</th>
          </thead>
          <tbody>
            {dummyArray?.map((item, index) => {
              return (
                <>
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "0px",
                        textAlign: "left",
                      }}
                    >
                    <TitleBarUpdated title={item?.eventName}/>  
                    </td>
                  </tr>
                  {item?.eventArray?.map((z, ind) => {
                    return (
                      <tr key={ind}>
                        <td style={{ width: "25%", textAlign: "center" }}>
                          {z?.name}
                        </td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "center",
                            color: z?.amount > 0 ? "green" : "red",
                          }}
                        >
                          {z?.amount}
                        </td>
                        <td style={{ width: "25%", textAlign: "center" }}>
                          {z?.name2}
                        </td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "center",
                            color: z?.amount2 > 0 ? "green" : "red",
                          }}
                        >
                          {z?.amount2}
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  padding: 10px;
  @media screen and (max-width:650px) {
    padding: 4px;
  }
`;
