import styled from "styled-components";

export const FeatureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const FeatureImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: #87f484;
  border-radius: 50%;
  z-index: 1;
  margin-bottom: 42px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  margin-right: 200px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-family: "InterSemi", sans-serif;
  margin-bottom: 33px;
  font-size: 24px;
`;

export const FeatureDescription = styled.p`
opacity:.76;
font-size: 18px;
line-height: 29px;
`;

export const FeaturePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const FeaturePageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FeaturePageTitle = styled.h2`
  opacity: 1;
  margin-bottom: 90px;
  font-family: "InterBold", sans-serif;
  transition: opacity 0.3s ease-in-out;
  font-size: 35px;
`;
