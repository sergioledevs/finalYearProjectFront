import styled, { keyframes } from "styled-components";


export const Container = styled.div`
scroll-behavior: smooth;
`;

export const Section = styled.section`

  

`;

export const Slogan = styled.h1`
  color: black;
  font-size: 65px;
  font-family: "InterBold", sans-serif;
  margin-top: 30px;
`;

export const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100vh;
 
  @media (max-width: 768px) {
    align-items: center;
    margin: 0 auto;
    width: 80%;
  }
`;

export const Rectangle1 = styled.div`
  position: absolute;
  width: 226px;
  height: 371px;
  left: 970px;
  top: 355px;

  background: url(image.png);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

export const Rectangle2 = styled.div`
  position: absolute;
  width: 222px;
  height: 371px;
  left: 1239px;
  top: 270px;

  background: url(image.png);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

export const Rectangle3 = styled.div`
  position: absolute;
  width: 222px;
  height: 371px;
  left: 1508px;
  top: 355px;

  background: url(image.png);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

export const GradientOverlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const SloganDescription = styled.h3`
  color: rgba(0, 0, 0, 0.55);
  font-size: 19px;
  font-family: "InterRegular", sans-serif;
  text-align: left;
  margin-bottom: 49px;
  margin-top: 49px;
  line-height: 150.52%;
  /* or 29px */

  letter-spacing: 0.01em;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  margin-left: 192px;
  /* Add your content styles here */

  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
    text-align: center;
  }
`;

export const GradientButton = styled.button`
  background: linear-gradient(191.9deg, #ffffff -136.1%, #fffffe 176.52%);
  border: 0.5px solid #4cef13;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 49px;
  width: 189px;
  height: 65px;
  color: #4fd60f;
  cursor: pointer;
  font-family: "InterBold", sans-serif;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
`;
