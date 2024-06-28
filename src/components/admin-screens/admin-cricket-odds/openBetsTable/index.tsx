/* eslint-disable eqeqeq */

import { observer } from "mobx-react";
import { memo, useMemo } from "react";
import Table from "@components/common-components/table";
import style from "./style.module.scss"
import { formatLargeNumber } from "@utils/common-functions";
import { marketNameArray } from "@utils/json-data";
import { useStore } from "@stores/root-store";
import moment from "moment";

export interface CommonInputProps {
    tableData?: any,
    loading?: boolean,
    title?: string,
}

const OpenBetTable = observer(({tableData, ...props}) => {
  const { user : {
    getUserInfo
  }} = useStore(null);
  const tenBetsData = tableData?.reverse()?.slice(0,10);

  const getUserBetsLength = (bettor, marketId) => {
     return getUserInfo?.role == "0" ? 
      tenBetsData?.filter((i) => i?.bettor == bettor && i?.marketId == marketId && i?.type == 0 )?.length >=3  
        || tenBetsData?.filter((i) => i?.bettor == bettor && i?.marketId == marketId && i?.type == 0 )?.length >=3 
      : false
    }
    
  const columns = useMemo(
    () => [
      {
        title: `Runner`,
        render: (_, data) => <div className={`dynamicColorOnHover ${style.betForHeading}`} style={{color:getUserBetsLength(data?.bettor, data?.marketId) ? 'red' : ""}}>{data?.runnerId || '-'}<span>{marketNameArray?.find((item)=>item?.type==data?.subMarketId) ? ` (${marketNameArray?.find((item)=>item?.type==data?.subMarketId)?.name})` : ''}</span></div>,
      },
      {
        title: `Price`,
        render: (_, data) => <div className={`dynamicColorOnHover ${style.betForHeading}`} style={{color:getUserBetsLength(data?.bettor, data?.marketId) ? 'red' : ""}}>{data?.price|| '-'} <small style={{ whiteSpace: "nowrap"}}>({ data?.createdAt ? moment(data?.createdAt).format('hh:mm:ss A') : "--" })</small></div>,
      },
      {
        title: `Size` ,
        render: (_, data) => <div className={`dynamicColorOnHover ${style.betForHeading}`} style={{color:getUserBetsLength(data?.bettor, data?.marketId) ? 'red' : ""}}>{formatLargeNumber(data?.size)?.toString()?.replace('.0', '') || '-'}</div>,
      },
      {
        title: `Better`,
        render: (_, data) => <div className={`dynamicColorOnHover ${style.betForHeading}`} style={{color:getUserBetsLength(data?.bettor, data?.marketId) ? 'red' : ""}}>{data?.bettor || '-'}</div>,
      },
      {
        title: `Master` ,
        render: (_, data) => <div className={`dynamicColorOnHover ${style.betForHeading}`} style={{color:getUserBetsLength(data?.bettor, data?.marketId) ? 'red' : ""}}>{data?.master || '-'}</div>,
      },
    ],
    [tenBetsData]
  );
  const  rowClassName = (record, index) => {
    // console.warn('record', record)
    if (record.type===1) {
      if(record?.isfancyOrbookmaker && record?.fancyData){
        return style.BackRow
      }else{
        return style.redrow; 
      }
    }else {
      if(record?.isfancyOrbookmaker && record?.fancyData){
        return style.redrow;
      }else {
        return style.BackRow;
      }
    }
      };
  return (
    <div>
      <Table rowClassName={rowClassName} loading={props?.loading} className={style.tableWrapperMain}  checkPagination={false} title={props?.title} dataSource={tenBetsData} columns={columns} />
    </div>
  );
});

export default memo(OpenBetTable);
