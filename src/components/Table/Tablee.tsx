import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { memo } from "react";
import useWindowSize from "@utils/hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserForDealerWithDepositedCash,
  fetchUserForDealerWithDepositedCredit,
} from "../../reduxStore/slices/adminSlice";
import { AppDispatch } from "reduxStore/store";
import TableComponent from "@components/dashboard/table/Table";

import { useStore } from "@stores/root-store";

interface RootState {
  adminSlice: {
    depositedCash: any;
    depositedCredit: any;
  };
}

interface Props {
  selectedDataType: string; // Define selectedDataType as a prop
}

const Tablee = observer(({ selectedDataType }: Props) => { // Receive selectedDataType as a prop
  const {
    user: { getUserInfo, loadSingleUser },
  } = useStore(null);

  const { width } = useWindowSize();

  const userInfo = getUserInfo;
  const userRole = userInfo ? userInfo.role : null;


  const dispatch = useDispatch<AppDispatch>();
  const { depositedCash, depositedCredit } = useSelector(
    (state: RootState) => state.adminSlice
  );

  const [state, setState] = useState({
    isTableVisible: false,
    pageNumber: 1,
    loading: false, // State for loading spinner
    selectedButtonName: "", // State to store the name of the selected button
  });

  // Data fetch
 

  // Cross icon
  const handleRemoveTable = () => {
    setState({ ...state, isTableVisible: false, pageNumber: 1 });
  };

  return (
    <>
      {(userRole === '0' || userRole === '5') ? ('') : (
        <div>
          <h1>{selectedDataType}</h1> {/* Dynamic heading */}
          {/* No need for buttons, display table data based on selectedDataType */}
          {state.loading ? ( // Show spinner if loading
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {selectedDataType === 'credit' && (
                <>
                  {depositedCredit.docs.length > 0 ? (
''
                  ) : (
                    <p>No Data Found for Credit</p>
                  )}
                </>
              )}
              {selectedDataType === 'cash' && (
                <>
                  {depositedCash.docs.length > 0 ? (
''
                  ) : (
                    <p>No data found for cash</p>
                  )}
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

export default memo(Tablee);
