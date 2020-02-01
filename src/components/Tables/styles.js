import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  margin: 30px auto;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    border-top: none;
    & + tr {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
  td {
    padding: 10px;
  }
`;

export const TableData = styled.td`
  font-size: 13px;
  height: 100%;
  text-align: center;
  vertical-align: middle;
`;

export const TableHeader = styled.td`
  font-size: 13px;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  font-weight: 700;
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  button {
    outline: 0;
    border: 0;
    background: #7159c1;
    padding: 7px 7px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    &:hover {
      background: #483780;
    }
  }
  span {
    font-size: 11px;
    color: #666;
  }
`;

export const PaginationButton = styled.button`
  height: 35px;
  width: 100px;
  background: #4257d6;
  border: none;
  border-radius: 2px;
  color: #fff;
  margin-left: 50px;
  margin-right: 50px;
  :hover {
    background: #147d4e;
    cursor: pointer;
  }
`;

export const PaginationInfo = styled.text`
  font-size: 14px;
  color: #666;
`;

export const PaginationDiv = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-self: space-around;
`;
