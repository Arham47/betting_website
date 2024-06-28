
import { observer } from "mobx-react";
import { memo, useMemo } from "react";
import Table from "@components/common-components/table";

export interface CommonInputProps {
    tableData?: any,
    loading?: boolean,
}

const MatchedBetsTable = observer(({tableData, ...props}) => {


  const columns = useMemo(
    () => [
      {
        title: `Runner`,
        render: (data) => <div>Runner</div>,
      },
      {
        title: `Price`,
        render: (data) => <div>Price</div>,
      },
      {
        title: `Size` ,
        render: (data) => <div>Size</div>,
      },
    ],
    []
  );

  return (
    <div>
      <Table loading={props?.loading} checkPagination={false} dataSource={tableData} columns={columns} />
    </div>
  );
});

export default memo(MatchedBetsTable);
