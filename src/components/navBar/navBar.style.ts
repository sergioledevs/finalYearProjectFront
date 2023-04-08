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
  z-index:0;
`;

export const Logo = styled.h2`
  size: 100px;
  cursor: pointer;
  margin-left:100px;
  margin-right:100px;
  margin-bottom: 0;
  font-family: "InterExtraBold", sans-serif;
`;

export const AboutUs = styled.p`
  size: 50px;
  cursor: pointer;
  margin:0;
  font-family: "InterSemi", sans-serif;
`;

export const LogIn = styled.p`
  size: 50px;
  cursor: pointer;
  margin-right:100px;
  font-family: "InterSemi", sans-serif;
`;
