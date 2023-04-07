import styled from "styled-components";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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

export const Div2 = styled.div`
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
  .selected {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px black;
    border-radius: 20px;
    flex-direction: column;

    width: 330px;
    height: 330px;
    margin: 50px;
    transition: box-shadow 0.2s;
    background-color: grey;

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
  .notVisible {
    opacity: 1; /* Initially hide the description */
  }

  .visible {
    /* Add a transition effect */
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

export const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export const RecipeTitle = styled.h2`
  color: black;
  margin-top: 2%;
  margin-left: 2%;
  font-size: 1.5em;
  font-family: "InterMedium", sans-serif;
`;

export const Ingredient = styled.p`
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2%;
  font-family: "InterRegular", sans-serif;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`   /*https://moderncss.dev/pure-css-custom-checkbox-style/*/
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 2em;
  height: 2em;
  border: 0.05em solid currentColor;
  transform: translateY(-0.075em);
  background-color: white;
  border-radius: 35px;
  margin-top: 20px;
  margin-left: 250px;

  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 1em;
    height: 1em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: green;
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export {};
