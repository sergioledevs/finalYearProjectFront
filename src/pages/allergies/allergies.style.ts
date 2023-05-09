import styled from "styled-components";
import wave from "../../media/wave.svg";
import background from "../../media/figma_test.png";

export const Wrapper = styled.div`
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      180deg,
      rgba(140, 233, 96, 0.42) 0%,
      #87f484 100%
    );
    border-radius: 21px;

    width: 135px;
    height: 135px;
    margin: 40px;
    margin-top: 10px;
    margin-bottom: 50px;
    transition: box-shadow 0.2s;
    color: black;

    &:hover {
      cursor: pointer;
    }
  }

  .notSelected {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;

    width: 135px;
    height: 135px;
    margin: 40px;
    margin-top: 10px;
    margin-bottom: 50px;
    transition: box-shadow 0.2s;
    background: #dafacb;
    border: 1px solid rgba(0, 0, 0, 0.28);
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.25);
    border-radius: 21px;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 3px 24px rgba(0, 0, 0, 0.25);
      transition: box-shadow 0.2s;
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
    height: 60vh;
  }
`;


export const EatingIcon = styled.img`
position: fixed;
width: 321px;
height: 321px;
left: 73px;
top: 680px;
`;



export const SearchBar = styled.input`
  width: 532px;
  height: 54px;
  border-radius: 8px;
  border: 0.1px solid rgba(0, 0, 0, 0.28);
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  margin-bottom: 40px;

  &::placeholder{
    margin: 40px;
  }

  &:focus {
    border: none;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.2s ease-in-out, border 0.5s ease-in-out;
  }

  &:focus-within{
    border: none;
  }

  @media (max-width: 768px) {
  }
`;

export const AllergiesTitle = styled.h1`
margin-top: 80px;
  font-family: "InterBold", sans-serif;

 
`;

export const GoBackButton = styled.button`
  background: #ffffff;
  border: 0.5px solid rgba(8, 0, 61, 0.25);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 49px;
  line-height: 13px;
  /* identical to box height */
  width: 108px;
  height: 37px;
  text-align: center;
  font-size: 12px;
  color: rgba(8, 0, 61, 0.43);
  margin-top: 30px;
  cursor: pointer;
  font-family: "InterBold", sans-serif;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
`;

export const WrapperBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  background-repeat: no-repeat;
`;
