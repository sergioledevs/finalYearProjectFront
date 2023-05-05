import styled from 'styled-components';


export const BigDiv= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width:100%;
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
  margin-top: 10px;
  padding: 10px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
  }

  
`;

export const RegisterButton = styled.button`
  padding: 10px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export{}