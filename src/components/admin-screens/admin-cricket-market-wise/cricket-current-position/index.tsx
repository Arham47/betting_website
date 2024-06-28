/* eslint-disable eqeqeq */

import { observer } from "mobx-react";
import { memo, useMemo } from "react";
import Table from "@components/common-components/table";
import style from "./style.module.scss"
import { formatLargeNumber } from "@utils/common-functions";
import { marketNameArray } from "@utils/json-data";
import { Spin } from "antd";

export interface CommonInputProps {
    tableData?: any,
    loading?: boolean,
    title?: string,
    updateBetPlaceHoldHandler?:any,
    secondsValue?:any,
    loadingUpdateBetPlaceHold?:boolean

}

const CricketCurrentPosition = observer(({tableData, loadingUpdateBetPlaceHold, updateBetPlaceHoldHandler,secondsValue, ...props}) => {
  const columns =[
      {
        title: `SECONDS`,
        render: (_, data, ind) => <span className={style.yesNoValBoxes}> {data?.value || ''} </span>,
      },
      {
        title: `In-USE`,
        render: (_, data, ind) => <span className={style.yesNoBoxes} style={{background: data?.title === "YES" ? 'grey' : '', color: data?.title === "YES" ? '#ffffff' : '', cursor:data?.title === "YES" ? 'not-allowed' : ''}} onClick={() => {
          if(data?.title === "NO") updateBetPlaceHoldHandler(data?.value);
        }}> {loadingUpdateBetPlaceHold && data?.title === "NO" ? <span><Spin /></span> : data?.title || '-'}</span>
      },
    ]
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
      <Table 
      // rowClassName={rowClassName}
       loading={props?.loading} className={style.tableWrapperMain}  checkPagination={false} title={props?.title} dataSource={tableData} columns={columns} />
    </div>
  );
});

export default memo(CricketCurrentPosition);
