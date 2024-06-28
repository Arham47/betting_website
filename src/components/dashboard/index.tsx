import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import StatusCard from "@components/common-components/status-card";
import { useStore } from "@stores/root-store";
import useWindowSize from "@utils/hooks/useWindowSize";
import { AiFillAlipaySquare, AiFillDollarCircle } from "react-icons/ai";
import { FaRegIdCard } from "react-icons/fa";
import { SportsHighlight } from "@components/SportsHighlight";
// import DepositCashTable from "./deposit-and-cash-table/DepositCashTable";

const Dashboard = observer(() => {
  const { width } = useWindowSize();
  const {
    user: { loadBetFunds, loadingBetsFunds, getBetFundsData },
  } = useStore(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardsData = [
    {
      icon: <FaRegIdCard />,
      label: "Credit",
      value: getBetFundsData?.credit || 0,
    },
    {
      icon: <AiFillAlipaySquare />,
      label: "Active Bet",
      value: getBetFundsData?.activeBets || 0,
    },
  ];

  const handleFunds = async () => {
    await loadBetFunds();
  };

  useEffect(() => {
    handleFunds();
  }, []);

  return (
    <div>
      <div className={style.dashboardPageContainer}>
        {loadingBetsFunds ? (
          <div>
            <Spin className={style.antIconClass} size="large" />{" "}
          </div>
        ) : (
          // <Row
          //   gutter={{ xs: 10, sm: 10, md: 10, lg: 10, xxl: 20 }}
          //   className={style.cardsContainer}
          // >
          //   {cardsData?.map((item, index) => (
          //     <Col
          //       md={12}
          //       lg={12}
          //       xl={(width < 1425 && 12) || 6}
          //       className={style.cardCol}
          //       key={index}
          //     >
          //       <StatusCard item={item} />
          //     </Col>
          //   ))}
          // </Row>
        <SportsHighlight />
        )}
      </div>
    </div>
  );
});

export default memo(Dashboard);
