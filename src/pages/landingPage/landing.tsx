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
  Button,
} from "./landing.style";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";

import NavBar from "../../components/navBar/navBar";
import FeaturePage from "../../components/featuresSection/features";
import Footer from "../../components/footer/footer";
import { Arrow } from "../indivRecipe/indivRecipe.style";
import arrow from "../../media/downArrow.png";

function Landing() {
  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 200) {
      setScrollDirection("up");
    } else {
      setScrollDirection("down");
    }
  }, [scrollPosition]);

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get(
            "https://finalyearprojectapi.onrender.com/userData",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setHeight(response.data.data.height);
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      }
    }
    console.log(height);
    fetchData();
  }, []);

  const handleSub = () => {
    if (token !== null && height !== undefined) {
      navigate("/recipes");
    } else if (token !== null && height === undefined) {
      navigate("/home");
    } else {
      navigate("/home");
      alert(
        "You can use the app without logging in, but the information won't be saved"
      );
    }
  };

  const handleClick = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (scrollDirection === 'down') {
      scroll.scrollMore(1000, {
        duration: 1000,
        smooth: 'easeInOutQuart',
      });

      setTimeout(() => {
        setScrollDirection('up');
        setIsTransitioning(false);
      }, 1000);
    } else {
      scroll.scrollToTop({
        duration: 1000,
        smooth: 'easeInOutQuart',
      });

      setTimeout(() => {
        setScrollDirection('down');
        setIsTransitioning(false);
      }, 1000);
    }
  };
  return (
    <Container>
      <NavBar></NavBar>
      <BigDiv>
        <ContentWrapper style={{ flexDirection: "row" }}>
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
          <Button scrollDirection={scrollDirection} onClick={handleClick}>
            {scrollDirection === "down" ? (
              <Arrow src={arrow} />
            ) : (
              <Arrow
                style={{
                  transform: "rotate(180deg)",
                }}
                src={arrow}
              />
            )}
          </Button>
        </ContentWrapper>
      </BigDiv>
      <FeaturePage></FeaturePage>
      <Footer></Footer>
    </Container>
  );
}

export default Landing;
