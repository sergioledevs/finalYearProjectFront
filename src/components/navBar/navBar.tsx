import React from "react";
import { AboutUs, LeftWrapper, LogIn, Logo, Wrapper } from "./navBar.style";

function NavBar(props) {
  return (
    <Wrapper>
      <LeftWrapper>
        <Logo>CUKFIT</Logo>
        <AboutUs>About us</AboutUs>
      </LeftWrapper>
      <LogIn>LogIn</LogIn>
    </Wrapper>
  );
}

export default NavBar;
