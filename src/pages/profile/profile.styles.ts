import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

export const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const Label = styled.label`
  margin-right: 10px;
  font-size: 1rem;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  font-size: 1rem;
  width: 100%;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  font-size: 1rem;
  width: 100%;
`;

export const StyledButton = styled.button`
  margin-top: 20px;
  padding: 5px 10px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #2e8b57;
  }
`;

export const BackButton = styled.button`
margin-top: 50px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  border: 1px solid #4caf50;
  background-color:white ;
  color: #4caf50;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #2e8b57;
    color:white
  }
`;