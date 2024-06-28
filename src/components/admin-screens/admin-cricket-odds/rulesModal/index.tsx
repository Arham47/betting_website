import React, { memo, useMemo, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { observer } from "mobx-react";
import styled from "styled-components";
import useWindowSize from "@utils/hooks/useWindowSize";

interface ModalHandle {
  open?: boolean;
  setOpen?: any;
  handlelClick?: any;
  title?: string;
}
const RulesModal: React.FC<ModalHandle> = observer(
  ({ open, title, handlelClick, setOpen, ...props }) => {
    const [modalForm] = Form.useForm();
    const innerWidth = useWindowSize().width;
    const modalStyle = {
      top: 10,
    };

    const handleCancel = () => {
      setOpen(false);
    };

    const onFormSubmit = (e) => {
      // console.log(e);
    };

    return (
      <>
        <Modal
          open={open}
          title={title}
          closable={true}
          onCancel={handleCancel}
          footer={null}
          width={1000}
          style={innerWidth >= 650 ? {} : modalStyle}
        >
            <hr />
            <div>
                <h4>MARKET INFORMATION</h4>
                <p>For further information please see <RulesReg>Rules & Regs</RulesReg>.</p>
                <p>Who will win this match? At the start of scheduled play all unmatched bets will be cancelled and this market will be turned in-play. This market will not be actively managed therefore it is the responsibility of all customers to manage their own positions. If scores (including a derived target score using the Duckworth Lewis method) are deemed tied at the completion of both innings then all bets on the Match Odds market will be void. Please note there is a separate Tied Match market available for this game. For the avoidance of doubt, if scores are tied at the completion of both innings then any tie breaker that may be used to determine a winner including, but not limited to, bowl outs, Super Overs, one-over eliminators, losing fewer wickets, run rates, coin toss, higher group position does not count for the purposes of this market.</p>
                <p>Customers should be aware that:</p>
                <ul>
                    <li><h4>Transmissions described as “live” by some broadcasters may actually be delayed and that all in-play matches are not necessarily televised.</h4></li>
                    <li><h4>The extent of any such delay may vary between customers, depending on the set-up through which they are receiving pictures or data.</h4></li>
                </ul>
            </div>
        </Modal>
      </>
    );
  }
);

export default memo(RulesModal);

const RulesReg = styled.span`
color:#00b181;

`
