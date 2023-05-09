import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BigDiv,
  Slogan,
  SloganDescription,
  GradientButton,
  Container,
  GradientOverlay,
  Content,
  Rectangle1,
  Rectangle2,
  Rectangle3,
} from "./landing.style";

import { useRef, useEffect } from "react";

import NavBar from "../../components/navBar/navBar";
import FeaturePage from "../../components/featuresSection/features";
import Footer from "../../components/footer/footer";

function Landing() {
  const navigate = useNavigate();
  const handleSub = () => {
    navigate("/home");
  };

  return (
    <Container>
      <NavBar></NavBar>
      <BigDiv>
        <Content>
          <Slogan>
            Your free online<br></br> nutritionist
          </Slogan>
          <SloganDescription>
            CUKFIT will adapt food recipes to your <br></br>
            specific requirements and goals, from gaining weight <br></br> to
            losing it, as well as staying healthy fitness goal
          </SloganDescription>
          <GradientButton onClick={handleSub}>Start cooking</GradientButton>
        </Content>
        <Rectangle1></Rectangle1>
        <Rectangle2></Rectangle2>
        <Rectangle3></Rectangle3>
      </BigDiv>
      <FeaturePage></FeaturePage>
      <Footer></Footer>
    </Container>
  );
}

export default Landing;
