import { observer } from "mobx-react";
import { memo, useMemo } from "react";
import Table from "@components/common-components/table";
import { CAP_CREDIT, DOUBLE_DASH } from "@utils/const";
import { numberWithCommas } from "@utils/common-functions";
interface CommonInputProps {
    tableData?: any,
    loading?: boolean,
}

const CreditDataTable:React.FC<CommonInputProps> = observer(({tableData, ...props}) => {


  const columns = useMemo(
    () => [
      {
        title: `${CAP_CREDIT} limit`,
        render: (_,data) => <p>{`${data?.creditLimit ? `${ numberWithCommas(data?.creditLimit?.toFixed(0))} Rs.` : `${DOUBLE_DASH}`}`}</p>,
      },
      {
        title: `User ${CAP_CREDIT}`,
        render: (_,data) => <p>{`${data?.credit ? `${numberWithCommas(data?.credit?.toFixed(0))} Rs.` : `${DOUBLE_DASH}`}`}</p>,
      },
      {
        title: `User Available Balance`,
        render: (_,data) => <p>{`${data?.availableBalance ? `${numberWithCommas(data?.availableBalance?.toFixed(0))} Rs.`: `${DOUBLE_DASH}`}`}</p>,
      },
    ],
    []
  );

  return (
    <div>
      <Table checkPagination={false} loading={props?.loading} dataSource={tableData} columns={columns} />
    </div>
  );
});

export default memo(CreditDataTable);
