import React from "react";
import {
  AboutUs,
  LeftWrapper,
  LogIn,
  Logo,
  Wrapper,
  LinkDiv,
} from "./navBar.style";

function NavBar(props) {
  return (
    <Wrapper>
      <LeftWrapper>
        <LinkDiv to={`/`}>
          <Logo>CUKFIT</Logo>
        </LinkDiv>
      <LinkDiv >
        <AboutUs>About us</AboutUs>
      </LinkDiv>
      </LeftWrapper>

      <LinkDiv to={`/logIn`}>
      <LogIn>LogIn</LogIn>
      </LinkDiv>

      <LinkDiv to={`/profile`}>
      <LogIn>Profile</LogIn>
      </LinkDiv>
    </Wrapper>
  );
}

export default NavBar;
