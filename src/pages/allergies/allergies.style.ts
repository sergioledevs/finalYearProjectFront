import styled from "styled-components";
import wave from "../../media/wave.svg";
import background from "../../media/figma_test.png";

export const Wrapper = styled.div`
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
    background-color: lightgreen;
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
  height: 100%;

  overflow: hidden;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const WrapperBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  background-image: url(${background});
  background-size: 100% 100%;

  background-repeat: no-repeat;
`;
