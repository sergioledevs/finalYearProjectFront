import { useState } from "react";
import RegistrationForm from "../register/register";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  Button,
  RegisterButton,
  BigDiv,
  LogInDiv,
  CssTextField,
} from "./logIn.style";
import NavBar from "../../components/navBar/navBar";
import { BackButton, StyledButton } from "../profile/profile.styles";
import { GradientButton } from "../landingPage/landing.style";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Loader from "../../components/loader/loader";



function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    event.preventDefault();
    try {
      // Send a POST request to the /login endpoint
      const response = await axios.post(
        "https://finalyearprojectapi.onrender.com/login",
        {
          email,
          password,
        }
      );
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("succesful login");
      setIsLoading(false)
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
      alert("Incorrect email or password");
    }
  };

  function logout() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://finalyearprojectapi.onrender.com/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Clear token from client-side storage
        localStorage.removeItem("token");
        console.log(response.data.message);

        navigate("/");
        console.log("succesful logout");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  if(isLoading){
    return (
      <div>
    <Loader></Loader>
    </div>
    )
  }else{
  return (
    <BigDiv>
      <NavBar></NavBar>
      <LogInDiv>
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
        </ThemeProvider>
          <Button type="submit">Log in</Button>
        </Form>
      </LogInDiv>
      <p style={{ marginTop: "30px" }}>Not have an account yet?</p>
      <RegisterButton
        style={{ marginTop: "0px" }}
        onClick={() => navigate("/register")}
      >
        {" "}
        Register
      </RegisterButton>
    </BigDiv>
  );
}
}

export default LoginButton;
