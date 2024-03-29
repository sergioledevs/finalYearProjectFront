import styled from "styled-components";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

export const BigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const BigDiv = styled.div`
  width: 33%;
  height: 100vh;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 1px;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  margin-top: 145px;
  font-family: "InterExtraBold", sans-serif;
  font-size: 22px;
`;

export const MealInfoHeader = styled.div`
  width: 100%;
  height: 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  font-family: "InterMedium", sans-serif;
  font-size: 15px;
  margin: 0;
`;

export const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px;
  }
`;

export const SmallDiv = styled.div`
margin-bottom: 200px;
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px black;
    border-radius: 20px;
    flex-direction: column;

    width: 330px;
    height: 330px;
    margin-top: 50px;
    transition: box-shadow 0.2s;
    background-color: grey;

    opacity: .65;

    &:hover {
      cursor: pointer;
      transition: box-shadow 0.2s;
      box-shadow: 0px 0px 10px 2px gray;
    }
  }

  .notSelected {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px black;
    border-radius: 20px;
    flex-direction: column;

    width: 330px;
    height: 330px;
    margin-top: 50px;
    transition: box-shadow 0.2s;
    background-color: aliceblue;

    &:hover {
      cursor: pointer;
      transition: box-shadow 0.2s;
      box-shadow: 0px 0px 10px 2px gray;
    }
  }
`;

export const RecipeCard = styled.div`
position: relative;
  .notVisible {
    opacity: 1; 
  }

  .visible {
    
  }
`;

export const LinkDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  &:hover {
    color: black;
  }
`;

export const LinkCalendar = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  &:hover {
    color: black;
  }
`;

export const CreateCalendarButton = styled.button`
  position: fixed;
  
  bottom: 120px;
  z-index: 2;
  width: 160px;
  height: 50px;
  margin: 0;

  background: linear-gradient(191.9deg, #ffffff -136.1%, #fffffe 176.52%);
  border: 0.5px solid #4cef13;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 49px;
  color: #4fd60f;
  cursor: pointer;
  font-family: "InterBold", sans-serif;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MealInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const MealInfoText = styled.p`
  margin: 0;
  opacity: 70%;
`;

export const ImageDiv = styled.div`
  height: 100%;
  width: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const RecipeTitle = styled.h2`
  color: black;
  margin-top: 2%;
  margin-left: 2%;
  font-size: 1.5em;
  font-family: "InterSemi", sans-serif;
`;

export const Ingredient = styled.p`
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2%;
  opacity: 70%;
  font-size: 0.9em;
  font-family: "InterMedium", sans-serif;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  /*https://moderncss.dev/pure-css-custom-checkbox-style/*/
  
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--form-background);
  margin: 0;

  position: absolute;
  z-index: 1;
  top: 0;

  font: inherit;
  color: currentColor;
  width: 2.2em;
  height: 2.2em;
  border: 0.05em solid currentColor;
  transform: translateY(-0.075em);
  background-color: white;
  border-radius: 35px;
  margin-top: 20px;
  margin-left: 250px;

  display: grid;
  place-content: center;

  &:hover{
    cursor: pointer;
  }

  &::before {
    content: "";
    width: 1.2em;
    height: 1.2em;
    clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%);
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: green;
  }

  &:checked::before {
    transform: scale(1.5);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const FloatingText = styled.p`
  position: fixed;
  top: ${(props) => (props.visible ? "-100%" : "0")};
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 30px;
  background-color: white;

  border-top: none;
  transition: all 0.3s ease;
  z-index: 7;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 45px;
  opacity: .7;
  box-shadow: 0px 0px 8px gray;

  &:hover{
    cursor: pointer;
    opacity: 1;
    transition: opacity .2s ease;
  }
`;

export const DropdownMenu = styled.div`
  position: fixed;
  top: ${(props) => (props.visible ? "0" : "-100%")};
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 150px;
  box-shadow: 0px 0px 8px gray;
  background-color: white;
  border-top: none;
  transition: all 0.3s ease;
  z-index: 998;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding-left: 15px;
  padding-top: 15px;
`;

export const Text = styled.div`
  position: fixed;
  top: ${(props) => (props.visible ? "160px" : "-30%")};
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  z-index: 998;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
`;

export {};
