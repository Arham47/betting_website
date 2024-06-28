import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss"
import Table from "@components/common-components/table";

interface Props {
  columns?:any;
  tableData?:any;
  onChange?:any;
  dateSortOrder?:any;
}
const MatchesDetailTable: React.FC<Props> = observer(({dateSortOrder, onChange, ...props }) => {


  return (
    <div className={style.tableWrapper}>
      <Table checkPagination={false} className={(dateSortOrder === 'ascend') ? style.tableWrapperMainAscend : (dateSortOrder === 'descend') ? style.tableWrapperMainDescend : ''} onChange={onChange}  dataSource={props?.tableData} columns={props?.columns} />
    </div>
  );
});

export default memo(MatchesDetailTable);
 