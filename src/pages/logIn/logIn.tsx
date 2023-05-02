import { useState } from "react";
import RegistrationForm from "../register/register";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function LoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate= useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the /login endpoint
      const response = await axios.post("http://localhost:9000/login", { email, password });
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      console.log("succesful login")
      navigate("/");
    } catch (error:any) {
      console.log(error.response.data)
      alert("An error occurred");
    }
  };

  function logout() {
    const token = localStorage.getItem('token');
    axios
      .post('http://localhost:9000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        // Clear token from client-side storage
        localStorage.removeItem('token');
        console.log(response.data.message);
        
      navigate("/");
      console.log("succesful logout")
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }


  return (
    <div>
    <RegistrationForm></RegistrationForm>
    <button onClick={() => logout()}>Logout</button>
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
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default LoginButton;
