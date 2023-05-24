import styled from 'styled-components';
import { TextField } from '@mui/material';


export const CssTextField = styled(TextField)`
 margin-top: 30px !important;
`;

export const Wrapper= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width:100%;
`

export const LogInDiv= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 20%;
width:15%;
border-radius: 12px;
`

export const StyledForm= styled.form`
display: flex;
flex-direction: column;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Input = styled.input`
  margin-top: 5px;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  width: 50%;
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

export const RegisterButton = styled.button`
 margin-top: 50px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  border: 1px solid #87F484;
  background-color:white ;
  color: #4fd60f;
  font-size: 1rem;
  font-family: "InterRegular", sans-serif;
  opacity: .7;
  cursor: pointer;
  &:hover {
    background-color: #2e8b57;
    color:white;
    opacity: 1;
  }
`;



export{}