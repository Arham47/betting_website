import React, { useState } from "react";
import { Pagination, Spin } from "antd";
import styled from "styled-components";
import "./TableComponent.scss";

interface CreditOrDebitTable {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  data: any[];
  fetchedData: (page: number) => void;
  totalItems: number; // New prop for total items
  recordPerPage: number;
}

const TableComponent: React.FC<CreditOrDebitTable> = ({
  data,
  pageNumber,
  setPageNumber,
  fetchedData,
  totalItems, // Receive total items as prop
  recordPerPage,
}) => {
  const recordsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const startingId = (pageNumber - 1) * recordPerPage + 1;

  const handlePaginationChange = (page: number) => {
    setPageNumber(page);
    fetchedData(page);
  };

  return (
    <div className="table-container">
      {loading && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Spin size="large" />
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Deposit Date</th>

                {/* <th>With Draws</th> */}
                <th>Credit</th>
                <th>Balance</th>
                {/* <th>Available Balance</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{startingId + index}</td>
                  <td>{item?.description}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>

                  {/* <td>{item?.maxWithdraw.toFixed(2)}</td> */}
                  <td>{item?.deposits.toFixed(2)}</td>
                  <td>{item?.balance.toFixed(2)}</td>
                  {/* <td>{item?.availableBalance.toFixed(2)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationStyled
            onChange={handlePaginationChange}
            total={totalItems} // Use totalItems prop for pagination
            pageSize={recordsPerPage}
            current={pageNumber}
          />
        </>
      )}
    </div>
  );
};

const PaginationStyled = styled(Pagination)`
  margin: 12px 25px;
  text-align: right;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
  .ant-pagination-item {
    min-width: 25px !important;
    height: 25px !important;
  }
`;

export default TableComponent;
