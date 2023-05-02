import React from "react";
import { useState } from "react";


import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
  export default RegistrationForm