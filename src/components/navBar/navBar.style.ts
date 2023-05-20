import styled from "styled-components";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  background-color: white;

  overflow: hidden;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 100%;

  overflow: hidden;
  z-index: 0;
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 40px;

  overflow: hidden;
  z-index: 0;
`;

export const LinkDiv = styled(Link)`
  text-decoration: none;
  color: grey;
  &:hover {
    color: black;
  }
`;

export const Logo = styled.h2`
  size: 100px;
  cursor: pointer;
  margin-left: 73px;
  margin-right: 100px;
  margin-bottom: 0;
  font-family: "InterExtraBold", sans-serif;
`;

export const AboutUs = styled.p`
  width: 135px;
  cursor: pointer;
  margin: 0;
  font-family: "InterRegular", sans-serif;
`;

export const WeeklyPlan = styled.p`
  size: 50px;
  cursor: pointer;
  margin: 0;

  font-family: "InterRegular", sans-serif;
`;

export const Features = styled.p`
  size: 70px;
  cursor: pointer;
  margin: 0;
  width:190px;
  font-family: "InterRegular", sans-serif;
`;

export const LogIn = styled.p`
  size: 80px;
  width: 85px;
  cursor: pointer;
  margin: 0;
  margin-right: 100px;

  font-family: "InterSemi", sans-serif;
`;

export const LogOut = styled.p`
  size: 80px;
  width: 85px;
  cursor: pointer;
  margin: 0;
  margin-right: 100px;

  font-family: "InterSemi", sans-serif;
`;
