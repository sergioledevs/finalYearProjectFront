import styled from "styled-components";
import InputGroup from "react-bootstrap/InputGroup";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width:100%;
  height: 100%;

  overflow: hidden;

`;


export const BigDiv = styled.div`
  
  width:33%;
  height: 100vh;

overflow-y: scroll;
&::-webkit-scrollbar {
        width: 1px;
    }
`;

export const SmallDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



export const RecipeCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px black;
  border-radius: 20px;

  width: 55%;
  height: 420px;
  margin-top: 50px;
  transition: box-shadow 0.2s;

  &:hover {
    transition: box-shadow 0.2s;
    box-shadow: 0px 0px 10px 2px gray;
  }
`;

export const LinkDiv = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  &:hover {
    color: black;
  }
`;

export const Description = styled.div`
  height: 25%;
  width: 100%;
  background-color: #68e37f;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: height 0.5s;
  &:hover {
    transition: height 0.5s;
    height: 40%;
  }
`;

export const ImageDiv = styled.div`
  height: 75%;
  width: 100%;
`;

export {};
