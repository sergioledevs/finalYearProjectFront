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
  background-image: url(${background});
  background-size: 100% 100%;

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
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

export const InputGroupCustom = styled(InputGroup)`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 3px gray;
  &:focus {
    outline: none;
    border: black;
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
  &:focus {
    outline: none;
    border-color: #275efe;
  }
`;

export const InputFormControl = styled(Form.Control)`
  display: block;
  width: 100%;
  padding: 8px 16px;
  line-height: 25px;
  border-left: none;
  border-right: none;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: transparent;
  border-radius: 20px;
  -webkit-appearance: none;
  color: #99a3ba;
  transition: border 0.3s ease;

  &::placeholder {
    color: #cbd1dc;
    border-left: none;
    border-right: none;
  }

  &:focus-within {
    outline: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
    border:black;

    & ~ ${WeightInputGroupTextRight} {
      transition: background-color 0.3s ease-in-out;
      background-color: #5cb85c;
    }

    & ~ ${WeightInputGroupTextLeft} {
      transition: background-color 0.3s ease;
      background-color: green;
    }
 
  }
`;

export const FormField = styled(Form.Control)`
  display: block;
  width: 100%;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: #99a3ba;
  border: 1px solid #cdd9ed;
  background: #fff;
  transition: border 0.3s ease;

  &::placeholder {
    color: #cbd1dc;
  }

  &:focus {
    outline: none;
    border-color: #275efe;
  }
`;

export const FormGroup2 = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  & > span,
  ${FormField} {
    white-space: nowrap;
    display: block;

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    &:first-child {
      border-radius: 6px 0 0 6px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }

    &:not(:first-child) {
      margin-left: -1px;
    }
  }

  ${FormField} {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > span {
    text-align: center;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 25px;
    color: #99a3ba;
    background: #fff;
    border: 1px solid #cdd9ed;
    transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  }

  &:focus-within {
    & > span {
      color: #fff;
      background: #678efe;
      border-color: #275efe;
    }
  }
`;
