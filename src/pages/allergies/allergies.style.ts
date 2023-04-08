import styled from "styled-components";


export const Wrapper = styled.div`

background-size: 150% auto;
background-position: right 70% top 69%;
background-repeat: no-repeat;
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px black;
    border-radius: 20px;

    width: 15vh;
    height: 15vh;
    margin: 30px;
    margin-top: 10px;
    margin-bottom: 30px;
    transition: box-shadow 0.2s;
    background-color: dodgerblue;
    color: white;

    &:hover {
      cursor: pointer;
      transition: box-shadow 0.2s;
      box-shadow: 0px 0px 10px 2px gray;
    }
  }

  .notSelected {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px black;
    border-radius: 20px;

    width: 15vh;
    height: 15vh;
    margin: 30px;
    margin-top: 10px;
    margin-bottom: 30px;
    transition: box-shadow 0.2s;
    background-color: aliceblue;

    &:hover {
      cursor: pointer;
      transition: box-shadow 0.2s;
      box-shadow: 0px 0px 10px 2px gray;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  overflow: hidden;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
