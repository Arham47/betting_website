import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { Pagination, Table as AntdTable, Spin } from "antd";
import styled from "styled-components";
import { BaseApi } from "@api/baseApi";
import { AxiosResponse } from "axios";
import { usePrevious } from "@utils/hooks/usePrevious";
import { getAuthorizationHeader } from "@api/common-utils";
import { ColumnType, TableProps } from "antd/lib/table";
import { SkeletonHorizontalLoaderGray } from "../skeleton/horizontal-loader";
import { observer } from "mobx-react";
import { catchError } from "@utils/common-functions";
import style from "./style.module.scss";
import { LoadingOutlined } from '@ant-design/icons';

interface Props extends TableProps<any> {
  dataUrl?: string;
  isLoading?: boolean;
  className?: string;
  responseData?: any[];
  responseCountParam?: string;
  columns: ColumnType<any>[];
  checkPagination?: boolean;
  colSpan?: number;
  refreshTable?: boolean;
  resetTable?: boolean;
  queryParam?: any;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setResetTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalRecordRemaining?: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
}

interface TableResponse {
  results: any;
  responseData: any[];
  responseCountParam: number;
  count: number;
  isCancel?: boolean;
}

const Table = observer(
  forwardRef(
    (
      {
        dataUrl,
        className,
        responseData = [],
        setPageNumber,
        responseCountParam = "",
        refreshTable = false,
        columns,
        queryParam,
        resetTable,
        ...props
      }: Props,
      ref
    ) => {
      const defaultParams = {
        ...queryParam,
        numRecords: 10,
        page: 1,
      };

      const sortedColumns = columns.find((e) => e.defaultSortOrder);
      if (sortedColumns && sortedColumns["sortField"]) {
        const sortOrder =
          sortedColumns.defaultSortOrder === "descend" ? "-" : "";
        defaultParams["ordering"] = `${sortOrder}${sortedColumns["sortField"]}`;
      }

      const [dataSource, setDataSource] = useState<any>([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      const [loading, setLoading] = useState(props?.loading);
      const [total, setTotal] = useState(1);
      const [params, setParams] = useState(defaultParams);
      const baseApi = useRef(new BaseApi());
      const prevDataUrl = usePrevious(dataUrl);

      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      
      const generateLoadingColumns = () => {
        return columns.map((column) => {
          return {
            ...column,
            render: () => {
              return (
                <div style={{ width: column.width }}>
                  <SkeletonHorizontalLoaderGray
                    lightLoader
                    width={
                      (column.width as number) - (column.width as number) * 0.35
                    }
                    height="auto"
                    skeletonHeight="10px"
                    align={'left'}
                  />
                </div>
              );
            },
          };
        });
      };

      const setPage = (pageNumber) => {
        setParams({ ...defaultParams, ...queryParam, page: pageNumber });
        if (setPageNumber) setPageNumber(pageNumber);
      };

      useEffect(() => {
        if (refreshTable) {
          getTableData();
          props.setRefreshTable(false);
        }
      }, [refreshTable]);

      useEffect(() => {
        if (resetTable) {
          setPage(1);
          getTableData();
          props.setResetTable(false);
        }
      }, [resetTable]);

      useEffect(() => {
        setParams({
          ...defaultParams,
          ...queryParam,
        });
      }, [queryParam]);

      const getTableData = async () => {
        if (dataUrl) {
          try {
            setLoading(true);
            const { data }: AxiosResponse<TableResponse> =
              await baseApi.current.axios.get(dataUrl, {
                params: { ...params },
                headers: { Authorization: await getAuthorizationHeader() },
                cancelToken: baseApi.current.cancelToken,
              });
            if (data.isCancel) {
              return false;
            } else {
              setDataSource(
                responseData?.length > 0 ? responseData : data?.results?.docs
              );
              setTotal(responseCountParam || data.results?.total);
              props?.setTotalRecordRemaining &&
                props?.setTotalRecordRemaining(
                  (responseData?.length > 0 ? responseData : data.results?.docs)
                    .length % params?.numRecords
                );
              setLoading(false);
            }
          } catch (err) {
            catchError(err, "Common Table API Call Data");
            setLoading(false);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(true);
          setDataSource(responseData?.length > 0 ? responseData : []);
          setTotal(Number(responseCountParam));
          props?.setTotalRecordRemaining &&
            props?.setTotalRecordRemaining(
              (responseData?.length > 0 ? responseData : []).length %
                params?.numRecords
            );
          setLoading(false);
        }
      };

      const handlePaginationChange = (page, pageSize) => {
        if (setPageNumber) setPageNumber(page);
        setParams({ ...params, page, numRecords: pageSize });
      };

      const handleTableChange = () => {
        setParams({ ...params });
      };

      useEffect(() => {
        if (prevDataUrl !== dataUrl) {
          setParams({ ...params, page: 2 });
        }
        getTableData();
      }, [params, dataUrl]);

      useImperativeHandle(ref, () => ({
        reloadTable() {
          if (prevDataUrl !== dataUrl) {
            setParams({ ...params, page: 1 });
          }
          getTableData();
        },
        getResults() {
          if (dataSource?.length) {
            return dataSource;
          }
        },
      }));

      return (
        <Wrapper
          className={`${className} ${style.tableWrapper}`}
          isPagination={!dataSource.length}
        >
          <AntdTableStyled
            dataSource={dataSource}
            columns={loading ? generateLoadingColumns() : columns}
            // columns={columns}
            pagination={false}
            className={style.table}
            onChange={handleTableChange}
            colSpan={props?.colSpan}
            scroll={{ x: "auto" }}
            // loading={loading}
            // indicator={<Spin/>}
            {...props}
          ></AntdTableStyled>
          {props?.checkPagination === false ? (
            ""
          ) : (
            <PaginationStyled
              onChange={handlePaginationChange}
              total={total}
              pageSize={params["numRecords"]}
              current={params["page"]}
              className={style.paginationClass}
            />
          )}
        </Wrapper>
      );
    }
  )
);

export default Table;

interface PaginationPropsTypes {
  isPagination: any;
}

const Wrapper = styled.div<PaginationPropsTypes>`
  .ant-pagination {
    display: ${(props) => (props.isPagination ? "none" : "visible")};
  }

  .common-component-input {
    background-color: #fff !important;
    &::placeholder {
      background-color: #fff !important;
    }
  }
`;

const AntdTableStyled = styled(AntdTable)`
  .ant-table-column-title {
    font-weight: 600;
    font-size: 12px;
  }

  .ant-table-thead {
    background: #f7f7f7;
    // border-radius: 8px;
  }
  .ant-table-thead >tr>th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before{
    background:none;
  }

  .ant-table-container table > thead > tr > th:first-child {
    border-start-start-radius: 0px !important;
  }

  .ant-table-container table > thead > tr:last-child th:last-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .ant-table-cell{
    .ant-table-expanded-row-fixed{
      margin-top:0px;
    }
  }

  .ant-table-column-sorters {
    display: inline-flex !important;
    ::before {
      width: 0;
    }
  }
  // .ant-table-thead > tr > th,
  // .ant-table-tbody > tr > td,
  // .ant-table tfoot > tr > th,
  // .ant-table tfoot > tr > td {
  //   padding-top: 10px !important;
  //   padding-bottom: 10px !important;
  // }

  .ant-table-tbody > tr:last-child td {
    border-bottom: transparent !important;
    margin-right: 0 !important;
  }

  .ant-table-tbody > tr:first-child td {
    border-top: transparent !important;
  }
  .ant-table-container table > tbody > tr > td {
    height: 36px;
    padding: 0px 8px !important;
    border-bottom: 1px solid #f4f4f4;
    margin: 0 25px !important;
    text-align:center;
  }

  .ant-table-container table > tbody > tr:nth-child(2) td {
    padding-top: 30px;
    padding-bottom: 10px;
    margin-left: 0 !important;
    text-align:center;
  }

  .ant-table-container table > tbody > tr:nth-child(1) td {
    // border-bottom: transparent !important;
    text-align:center;

  }

  .ant-table-container table > tbody > tr td:first-child {
    margin: 0 5px;
    font-size: 12px !important;
    text-align:center;
  }

  .ant-table-column-sorter {
    margin-left: 5px;
  }
  tr {
    box-shadow: none;
    text-align:center;
  }
`;

const PaginationStyled = styled(Pagination)`
  margin: 12px 25px;
  text-align: right;
  margin-top: 10px;
  // border-top: 1px solid #e8e8e8 !important;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
  .ant-pagination-item {
    min-width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-item-active {
    height: 30px !important;
  }
  .ant-pagination-prev {
    width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-next {
    width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-disabled {
    min-width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-item-link span svg {
    display: flex;
    margin-bottom: 2px;
    align-items: center;
    justify-content: center;
  }
  .ant-pagination-prev {
    min-width: 25px !important;
    max-height: 25px !important;
  }
  .ant-pagination-next {
    min-width: 25px !important;
    max-height: 25px !important;
  }
  .ant-pagination-options {
    height: 25px;
  }
  .ant-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    margin-right: 15px;
  //   .ant-pagination-item a{
  //     border-color: red !important;
  //   }
  // }
  // .ant-pagination-item-active{
  //   border-color: red !important;
  // }

`;
