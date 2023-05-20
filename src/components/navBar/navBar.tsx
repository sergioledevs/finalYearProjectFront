import React from "react";
import {
  AboutUs,
  LeftWrapper,
  LogIn,
  Logo,
  Wrapper,
  LinkDiv,
  RightWrapper,
  LogOut,
  Features,
  WeeklyPlan,
} from "./navBar.style";
import {useEffect} from "react"
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturePage from "../featuresSection/features";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Landing from "../../pages/landingPage/landing";

function NavBar(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [height, setHeight] = useState("");

  const token = localStorage.getItem("token");
  const navigate= useNavigate()


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
    fetchData();
  }, []);
  
  useEffect(() => {
    if (token !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [token]);

  function logout() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://finalyearprojectapi.onrender.com/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Clear token from client-side storage
        localStorage.removeItem("token");
        console.log(response.data.message);

        navigate("/");
        console.log("succesful logout");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <Wrapper>
      <LeftWrapper>
        <LinkDiv to={`/`}>
          <Logo>CUKFIT</Logo>
        </LinkDiv>
        <LinkDiv to={`/privacyPolicy`}>
          <Features>Privacy policy</Features>
        </LinkDiv>
        
        {height==="" || token===null || height===undefined ? (
        <div></div>
      ) : (
        <LeftWrapper>
        <LinkDiv to={`/recipes`}>
          <AboutUs>Recipes</AboutUs>
        </LinkDiv>
        <LinkDiv to={`/calendar`}>
          <WeeklyPlan>My weekly plan</WeeklyPlan>
        </LinkDiv>
        </LeftWrapper>
      )}
      </LeftWrapper>
      
      {isLogged === false ? (
        <LinkDiv to={`/logIn`}>
          <LogIn>LOG IN</LogIn>
        </LinkDiv>
      ) : (
        <RightWrapper>
          <LinkDiv onClick={() => logout()}><LogOut>LOG OUT</LogOut></LinkDiv>
          <LinkDiv to={`/profile`}>
            <LogIn>Profile</LogIn>
          </LinkDiv>
        </RightWrapper>
      )}
    </Wrapper>
  );
}

export default NavBar;
