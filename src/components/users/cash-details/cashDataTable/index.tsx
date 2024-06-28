import { observer } from "mobx-react";
import { memo, useMemo } from "react";
import Table from "@components/common-components/table";
import { CAP_BALANCE, CAP_CREDIT, CAP_RS, CAP_WITHDRAW, DOUBLE_DASH } from "@utils/const";
import { numberWithCommas } from "@utils/common-functions";

export interface CommonInputProps {
    tableData?: any,
    loading?: boolean,
}

const CashDataTable = observer(({ tableData, ...props }) => {
  const columns = useMemo(
    () => [
      {
        title: `${CAP_CREDIT}`,
        render: (data) => (
          <p>
            {data?.credit ? `${numberWithCommas(data?.credit?.toFixed(0)||0)} ${CAP_RS}` : `${DOUBLE_DASH}`}
          </p>
        ),
      },
      // {
      //   title: `${CAP_BALANCE}`,
      //   render: (data) => (
      //     <p>
      //       {data?.balance !== undefined ? `${numberWithCommas(data?.balance?.toFixed(0) || 0)} ${CAP_RS}` : '0'}
      //     </p>
      //   ),
      // },

      {
        title: `${CAP_BALANCE}`,
        render: () => (
          <p>
            0 {CAP_RS}
          </p>
        ),
      },
      {
        title: `Max ${CAP_WITHDRAW}`,
        render: (data) => (
          <p>
            {data?.maxWithdraw ? `${numberWithCommas(data?.maxWithdraw?.toFixed(0)|| 0)} ${CAP_RS}` : `${DOUBLE_DASH}`}
          </p>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Table isLoading={props?.loading} checkPagination={false} dataSource={tableData} columns={columns} />
    </div>
  );
});

export default memo(CashDataTable);
