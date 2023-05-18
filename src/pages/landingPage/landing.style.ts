import styled, { keyframes } from "styled-components";
import girlExercising from "../../media/girl_exercising.jpeg";
import nutritionist from "../../media/nutritionist.jpeg";
import cooking from "../../media/cooking.jpeg";

export const Container = styled.div`
  scroll-behavior: smooth;
`;

export const Section = styled.section``;

export const Slogan = styled.h1`
  color: black;
  font-size: 4.063em;
  font-family: "InterBold", sans-serif;
  margin-top: 30px;
`;

export const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    align-items: start;
    text-align: center;/* styles for tablet screens */
  }

  @media screen and (max-width: 480px) {
    /* styles for mobile screens */
  }
`;

export const Rectangle1 = styled.div`

  width: 226px;
  height: 371px;
  

  background-image: url(${girlExercising});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  margin-top: 30px;
  margin-right: 2.5%;

  @media (max-width: 1024px) {
    width: 200px;
    height: 330px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 250px;
 
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 170px;
  }
`;

export const Rectangle2 = styled.div`
  width: 222px;
  height: 371px;

  background-image: url(${nutritionist});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  margin-bottom: 30px;
  margin-right: 2.5%;

  @media (max-width: 1024px) {
    width: 200px;
    height: 330px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 250px;
 
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 170px;
  }
`;

export const Rectangle3 = styled.div`
width: 222px;
  height: 371px;
 

  background-image: url(${cooking});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  margin-top: 30px;

  @media (max-width: 1024px) {
    width: 200px;
    height: 330px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 250px;
 
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 170px;
  }
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
  z-index: 2;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  padding-left: -20%;

  /* Add your content styles here */

  @media (max-width: 768px) {
    padding-left: 48px;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding-left: 24px;
  }
`;

export const ContentWrapper = styled.div`

  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row !important;
  width: 100%;

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
