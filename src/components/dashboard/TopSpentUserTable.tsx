import { TopSpentData, TopSpentUserColumn } from '@interfaces';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styled from 'styled-components';
import { Pagination, SharedTable } from '../shared';
interface IProps {
  columns: ColumnsType<TopSpentUserColumn>;
  topSpentUsers: TopSpentData;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export const TopSpentUserTable = ({
  columns,
  topSpentUsers,
  currentPage,
  onPageChange,
}: IProps) => {
  return (
    <StyledTopSpentUserTable>
      <SharedTable columns={columns} dataSource={topSpentUsers.data} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={topSpentUsers.count}
        pageSize={topSpentUsers.limit}
        onPageChange={(page: number) => {
          onPageChange(page);
        }}
      />
    </StyledTopSpentUserTable>
  );
};
const StyledTopSpentUserTable = styled.div`
  .pagination-bar {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;
