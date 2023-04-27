import styled from "styled-components";

export const CalendarTable = styled.table`
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  td {
    height: 6rem;
  }

  td.selected {
    background-color: #a7c7e7;
  }
`;