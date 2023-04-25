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
} from "./landing.style";

import NavBar from "../../components/navBar/navBar";

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
          <Slogan>Gains are made in the kitchen</Slogan>
          <SloganDescription>
            We personalise your recipes according to your <br></br>
            fitness goal
          </SloganDescription>
          <GradientButton onClick={handleSub}>Start cooking</GradientButton>
        </Content>
        <GradientOverlay></GradientOverlay>
      </BigDiv>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>

      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
    </Container>
  );
}

export default Landing;
