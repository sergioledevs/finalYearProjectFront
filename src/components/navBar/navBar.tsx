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
} from "./navBar.style";
import {useEffect} from "react"
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [isLogged, setIsLogged] = useState(false);

  const token = localStorage.getItem("token");
  const navigate= useNavigate()
  
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
        "http://localhost:9000/logout",
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
        <LinkDiv>
          <Features>Features</Features>
        </LinkDiv>
        <LinkDiv>
          <AboutUs>About us</AboutUs>
        </LinkDiv>
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
