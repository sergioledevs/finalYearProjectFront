import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BigDiv,
  Slogan,
  SloganDescription,
  GradientButton,
  Container,
  Content,
  Rectangle1,
  Rectangle2,
  Rectangle3,
  ContentWrapper,
} from "./landing.style";

import { useRef, useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../../components/navBar/navBar";
import FeaturePage from "../../components/featuresSection/features";
import Footer from "../../components/footer/footer";

function Landing() {

  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get("https://finalyearprojectapi.onrender.com/userData", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setHeight(response.data.data.height);
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      }
    }
    console.log(height)
    fetchData();
  }, []);

  const handleSub = () => {
    if (token !== null && height!==undefined) {
      navigate("/recipes");
      console.log("cond")
    } else {
      navigate("/home");
    }
  };

  return (
    <Container>
      <NavBar></NavBar>
      <BigDiv>
        <ContentWrapper style={{flexDirection:"row"}}>
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
        </ContentWrapper>
      </BigDiv>
      <FeaturePage></FeaturePage>
      <Footer></Footer>
    </Container>
  );
}

export default Landing;
