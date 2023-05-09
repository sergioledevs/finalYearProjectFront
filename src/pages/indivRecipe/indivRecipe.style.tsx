import styled from "styled-components";
import { keyframes } from "styled-components";
export const BigDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    /* styles for tablet screens */
  }

  @media screen and (max-width: 480px) {
    /* styles for mobile screens */
  }
`;

export const DropdownMenu = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: ${(props) => (props.visible ? "0px" : "150px")};
  opacity: ${(props) => (props.visible ? "0" : "100")};
  transition: height 0.5s ease, opacity 0.5s ease;
  z-index: 998;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const FloatingText = styled.p`
  animation: ${floatAnimation} 2s ease-in-out infinite;
  z-index: 7;
  margin-top: 50px;
  cursor: pointer;
`;

export const RecipeTitle = styled.h1`

`;


export const Text = styled.div`

  height: ${(props) => (props.visible ? "0px" : "50px")};
  opacity: ${(props) => (props.visible ? "0%" : "100%")};
  transition: height 0.5s ease;
`;

export const RightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
