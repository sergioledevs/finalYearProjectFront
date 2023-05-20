import { useState } from "react";
import RegistrationForm from "../register/register";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Label, Input, Button, RegisterButton, BigDiv, LogInDiv } from "./logIn.style";
import NavBar from "../../components/navBar/navBar";
import { BackButton, StyledButton } from "../profile/profile.styles";
import { GradientButton } from "../landingPage/landing.style";

function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the /login endpoint
      const response = await axios.post("https://finalyearprojectapi.onrender.com/login", {
        email,
        password,
      });
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("succesful login");
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

  return (
    <BigDiv>
      <NavBar></NavBar>
      <LogInDiv>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Label>
        <Label>
          Password:
          <Input
          name="hello"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Label>
        <Button type="submit">Log in</Button>
        
      </Form>
      </LogInDiv>
      <p style={{marginTop:"30px"}}>Not have an account yet?</p>
        <RegisterButton style={{marginTop:"0px"}} onClick={() => navigate("/register")}> Register</RegisterButton>
    </BigDiv>
  );
}

export default LoginButton;
