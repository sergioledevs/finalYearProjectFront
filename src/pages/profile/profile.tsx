import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {

const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [levelOfActive, setLevelOfActive] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get("http://localhost:9000/userData", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmail(response.data.data.email)
          setHeight(response.data.data.height);
          setWeight(response.data.data.weight);
          setLevelOfActive(response.data.data.levelOfActive);
          setAge(response.data.data.age)
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      } 
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {email} </p>
      <p>Height: {height} cm</p>
      <p>Weight: {weight} kg</p>
      <p>Age: {age}</p>
      <p>Level of Activity: {levelOfActive}</p>
    </div>
  );
}

export default Profile;
