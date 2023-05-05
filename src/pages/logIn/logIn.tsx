import { useState } from "react";
import RegistrationForm from "../register/register";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Label, Input, Button, RegisterButton, BigDiv } from "./logIn.style";
import NavBar from "../../components/navBar/navBar";

function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the /login endpoint
      const response = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("succesful login");
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
      alert("An error occurred");
    }
  };

  function logout() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:9000/logout",
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
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Label>
        <Button type="submit">Login</Button>
        <p>Not have an account yet?</p>
        <RegisterButton onClick={() => navigate("/register")}> Register</RegisterButton>
      </Form>
    </BigDiv>
  );
}

export default LoginButton;
