import { observer } from "mobx-react";
import { memo } from "react";
import style from "./style.module.scss";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { TfiAlignJustify } from "react-icons/tfi";
import { CommonSelect } from "@components/common-components/select";
import { optionMarketTypes } from "@components/users/json-data";
import { CAP_SEARCH, HASH_LINK, LOWER_ALL } from "@utils/const";
import { ColTextCheck } from "@components/common-components/export-common-components/table-columns-text-check";
import { numberWithCommas, sortCol } from "@utils/common-functions";
import { Table } from "antd";

interface Props {}
const OpenMarkets: React.FC<Props> = observer(({ ...props }) => {
  const columns = [
    {
      title: HASH_LINK,
      render: (text, data, index) => <p>{index + 1}</p>,
    },
    {
      title: "Sports id",
      dataIndex: "runnerName",
      sorter: (a, b) => sortCol(a, b, "runnerName"),
      render: ColTextCheck,
    },
    {
      title: 'Event Id',
      dataIndex: 'eventid',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: ColTextCheck,
    },
    {
      title: 'Market Name',
      dataIndex: 'marketname',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: ColTextCheck,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: ColTextCheck,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: ColTextCheck,
    },
    
  ];

  return (
    <div className={style.mainWrapper}>
      <TitleBarUpdated
        title={"Open Markets"}
        isIcon={true}
        icon={<TfiAlignJustify />}
      />
      <div style={{ display: "flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between"}}> 
      <div style={{minWidth: "150px",maxWidth: "150px",padding: "15px"}}>
        <CommonSelect
          className={style.commonSelectBox}
          data={optionMarketTypes}
          defaultValue={LOWER_ALL}
          onChange={(e) => {
            console.log("eeeee", e);
            //   setMarketId(e)
          }}
        />
        </div>
        <div className={style.entriesData}>
          <label>{CAP_SEARCH}: </label>
          <input
            // value={search}
            className={style.inputHeight}
            onChange={(e) => {
              // handleChange(e);
            }}
          />
        </div>
      
      </div>
      <Table
        className={style.tableStyle}
        // responseData={ getUserBets}
        // loading={isfirstLoading}
        columns={columns}
        // setPageNumber={setPageNumber}
        // queryParam={{ page: pageNumber, numRecords: entries }}
        // responseCountParam={getUserBetsTotal ? getUserBetsTotal.toString(): '0'}
        // rowClassName={rowClassName}
      />
    </div>
  );
});

export default memo(OpenMarkets);
