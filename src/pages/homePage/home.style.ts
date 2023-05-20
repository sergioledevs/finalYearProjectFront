import styled from "styled-components";
import InputGroup from "react-bootstrap/InputGroup";
import background from "../../media/figma_test.png";


import { Form } from "react-bootstrap";

export const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;
export const ChefIcon = styled.img`
  position: fixed;
  width: 30%;
  max-width: 500px;
  height: auto;
  left: 70%;
  top: 62%;
`;

export const RunnerIcon = styled.img`
  position: fixed;
  width: 30%;
  max-width: 500px;
  height: auto;
  left: 4%;
  top: 62%;
`;

export const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  border-radius: 20px;

  @media screen and (max-width: 998px) {
    width: 80%;
    padding: 10px;
  }
`;


export const WeightInputGroupTextLeft = styled(InputGroup.Text)`
  border-left: none;
  background-color: transparent;
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
`;

export const WeightInputGroupTextRight = styled(InputGroup.Text)`
  border-right: none;
  background-color: transparent;
`;

export const InputGroupCustom = styled(InputGroup)`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 3px gray;
  opacity: 0.75;
  border-color: black;


  &:focus-within {
  box-shadow: none;
  opacity:1;
  transition: box-shadow 0.3s ease-in-out;
  + ${WeightInputGroupTextRight} {
    border-color: black;
    transition: border-color 0.3s ease-in-out;
  }
  }
`;


export const InputFormControl = styled(Form.Control)`
  display: block;
  width: 287px;
  height: 54px;
  padding: 8px 16px;
  line-height: 25px;
  border-left: none;
  border-right: none;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: transparent;
  border-radius: 8px;

  color: #99a3ba;
  transition: border 0.3s ease-in-out;

  text-align: right;

  &::placeholder {
    border-color: green;
    border-left: none;
  }

  &:focus-within {
  box-shadow: none;
  border-color: black;

   
  + ${WeightInputGroupTextRight} {
    border-left-color: black;
    transition: border-color 0.3s ease-in-out;
  }
   + ${WeightInputGroupTextLeft} {
    transition: border-color 0.3s ease-in-out;
    border-color: black;
  }
}
`;

export const AgeFormControl = styled(Form.Control)`
  display: block;
  width: 287px;
  height: 54px;
  padding: 8px 16px;
  line-height: 25px;
  border-left: none;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: transparent;
  border-radius: 8px;

  color: #99a3ba;
  transition: border 0.3s ease-in-out;

  text-align: right;

  &::placeholder {
    border-color: green;
    border-left: none;
  }

  &:focus-within {
  box-shadow: none;
  border-color: black;

   + ${WeightInputGroupTextRight} {
    border-color: black;
    transition: border-color 0.3s ease-in-out;
  }

   + ${WeightInputGroupTextLeft} {
    transition: border-color 0.3s ease-in-out;
    border-color: black;
  }
}
`;


export const InputFormSelect = styled(Form.Select)`
  display: block;
  width: 287px;
  height: 54px;
  padding: 8px 16px;
  line-height: 25px;
  border-left: none;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: transparent;
  border-radius: 8px;
  -webkit-appearance: none;
  color: #99a3ba;
  transition: border 0.3s ease;


  border-radius: 8px;
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;

  &::placeholder {
    border-color: green;
    border-left: none;
  }

  &:focus-within {
  box-shadow: none;
  border-color: black;

  & + ${WeightInputGroupTextRight},
  & ~ ${WeightInputGroupTextRight} {
    border-left-color: black;
    transition: border-color 0.3s ease-in-out;
  }

  & + ${WeightInputGroupTextLeft},
  & ~ ${WeightInputGroupTextLeft} {
    transition: border-color 0.3s ease-in-out;
    border-color: black;
  }
}
`;




