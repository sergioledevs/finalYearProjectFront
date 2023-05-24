import React from "react";
import { useState } from "react";
import { Form, Wrapper, Button } from "./register.styled";
import { TextField } from "@mui/material";
import axios from "axios";
import NavBar from "../../components/navBar/navBar";
import { useNavigate } from "react-router-dom";
import { CssTextField } from "../logIn/logIn.style";
import { createTheme, ThemeProvider } from '@mui/material/styles'


function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#53ee60',
      },
      secondary: {
        main: '#020c06',
      },
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the /register endpoint
      const response = await axios.post(
        "https://finalyearprojectapi.onrender.com/register",
        { email, password, confirmPassword }
      );
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
      alert("An error occurred");
    }
  };

  return (
    <Wrapper>
      <NavBar></NavBar>
      <Form onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          color="secondary"
        />

        <CssTextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          color="secondary"
        />
        <CssTextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          color="secondary"
        />
        </ThemeProvider>
        <Button type="submit">Register</Button>
      </Form>
    </Wrapper>
  );
}
export default RegistrationForm;
