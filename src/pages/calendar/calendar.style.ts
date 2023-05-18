import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  overflow: hidden;
`;


export const CalendarTable = styled.table`
  border-collapse: collapse;
  margin-top:100px;
  width: 65%;
  height: 50%;
  position: relative;
  border-radius: 12px;

  th,
  td {
    border: 1px solid gray;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #DAFACB;
    font-weight: bold;
  }

  td {
    height: 6rem;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  td.selected {
    background-color: #a7c7e7;
  }

  a {
    color: #333;
    text-decoration: none;
  }
`;