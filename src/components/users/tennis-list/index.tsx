/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import style from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import AllTennisTable from "./all-tennis-table";
import {
  CAP_TITLE,
  CAP_EVENTID,
  CAP_LIVE,
  CAP_START_DATE,
  CAP_SERIES_FULL_NAME,
  CAP_MATCH_FULL_NAME,
  INITIAL_PAGE_NUMBER
} from "@utils/const";
import {useStore} from "@stores/root-store";
import {
  formatLargeNumber,
  numberWithCommas,
} from "@utils/common-functions";

const TennisList = observer(() => {
  const navigate = useNavigate();
  const [isLoadBalanceShow, setIsLoadBalanceShow] = useState(true);
  const [searchUser, setSearchUser] = useState('')
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const {
    user: {
      getAllUsers,
    },
  } = useStore(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setIsLoadBalanceShow(true)
    let totalValueOfCredit, totalBalanceValue, totalClientPL, totalValueOFExposure, totalAvailBalance;
    if (getAllUsers?.length) {
      totalValueOfCredit = getAllUsers.reduce((credit, currentValue) => credit + currentValue.credit, 0);
      totalBalanceValue = getAllUsers?.filter((z) => z?.role != 0)?.reduce((balance, currentValue) => balance + Number(currentValue.balance?.toString()?.replaceAll('e-', '')), 0);
      totalClientPL = getAllUsers?.filter((z) => z?.role != 0)?.reduce((clientPL, currentValue) => clientPL + Number(currentValue.clientPL?.toString()?.replaceAll('e-', '')), 0);
      totalValueOFExposure = getAllUsers.reduce((exposure, currentValue) => exposure + Number(currentValue.exposure?.toString()?.replaceAll('e-', '')), 0);
      totalAvailBalance = getAllUsers.reduce((availableBalance, currentValue) => availableBalance + Number(currentValue.availableBalance?.toString()?.replaceAll('e-', '')), 0);
    }
  }, [getAllUsers])

  return (
    <div className={style.userListMainContainer}>
      <div className={style.userListContainer}>
        <div className={style.clientAndTableCardContainer}>
          <div className={style.allUserTablesIcons}>
            <AllTennisTable
              isLoadBalanceShow={isLoadBalanceShow}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(TennisList);
