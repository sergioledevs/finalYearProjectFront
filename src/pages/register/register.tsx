import React from "react";
import { useState } from "react";
import { Label, Form, Input, Button, Wrapper } from "./register.styled";


import axios from "axios";
import NavBar from "../../components/navBar/navBar";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the /register endpoint
      const response = await axios.post("http://localhost:9000/register", { email, password, confirmPassword });
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
    } catch (error:any) {
      console.log(error.response.data)
      alert("An error occurred");
    }
  };

  return (
    <Wrapper>
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
      <Label>
        Confirm Password:
        <Input
          type="password"
          value={confirmPassword}
          placeholder="hello"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </Label>
      <Button type="submit">Register</Button>
    </Form>
    </Wrapper>
  );
}
  export default RegistrationForm