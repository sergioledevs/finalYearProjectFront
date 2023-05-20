import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:none;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const Label = styled.label`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
    margin-top: 20px;
  padding: 5px 10px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #87F484;
  color: white;
  font-size: 1rem;
  font-family: "InterSemi", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #2e8b57;
  }
  
`;
