import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { memo } from "react";
import style from "../style.module.scss";
import useWindowSize from "@utils/hooks/useWindowSize";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import CustomButton from "@components/common-components/custom-button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserForDealerWithDepositedCash,
  fetchUserForDealerWithDepositedCredit,
} from "../../../reduxStore/slices/adminSlice";
import { AppDispatch } from "reduxStore/store";
import TableComponent from "../table/Table";

import { useStore } from "@stores/root-store";

interface RootState {
  adminSlice: {
    depositedCash: any;
    depositedCredit: any;
  };
}

const DepositCashTable = observer(() => {
  const {
    user: { getUserInfo, loadSingleUser },
  } = useStore(null);

  const { width } = useWindowSize();

  const userInfo = getUserInfo;
  const userRole = userInfo ? userInfo.role : null;

  // Fetch data whenever userRole changes

  const dispatch = useDispatch<AppDispatch>();
  const { depositedCash, depositedCredit } = useSelector(
    (state: RootState) => state.adminSlice
  );

  const [state, setState] = useState({
    isTableVisible: false,
    selectedTable: "",
    pageNumber: 1,
    loading: false, // State for loading spinner
    selectedButtonName: "", // State to store the name of the selected button
  });

  // Credit button
  

  // Cross icon
  const handleRemoveTable = () => {
    setState({ ...state, isTableVisible: false, selectedTable: "", pageNumber: 1 });
  };

  return (
    <>
      {(userRole === '0' || userRole === '5') ? ('') : (
        <div>

          {state.loading ? ( // Show spinner if loading
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {state.selectedTable === "credit" && (
                <>
     
     ''
                </>
              )}
            </>
          )}
        </div>
      )
      }
    </>
  );
});

export default memo(DepositCashTable);
